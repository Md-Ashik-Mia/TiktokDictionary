"use client";

import { api } from "@/lib/https";
import { useEffect, useMemo, useState } from "react";
import { LuClock4 } from "react-icons/lu";

type ApiDefinition = {
  id: number;
  definition: string;
};

type ApiWord = {
  id: number;
  word: string;
  category?: { id: number; name: string };
  definitions?: ApiDefinition[];
  definations?: ApiDefinition[];
  created_at?: string;
};

type GetWordsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiWord[];
};

function pickDefinition(w: ApiWord) {
  const defs = w.definitions ?? w.definations ?? [];
  const first = defs.find((d) => typeof d?.definition === "string" && d.definition.trim());
  return first?.definition?.trim() ?? "";
}

function formatRelative(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const diffMs = Date.now() - d.getTime();
  if (diffMs < 0) return "";
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export const FreshSubmissions = () => {
  const [loading, setLoading] = useState(false);
  const [words, setWords] = useState<ApiWord[]>([]);

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      try {
        const res = await api.get<GetWordsResponse>("dictionary/get-words/", {
          params: { ordering: "-created_at", page_size: 4 },
          signal: controller.signal,
        });

        const results = res.data?.results ?? [];
        const cleaned = results.filter(
          (w) => typeof w?.id === "number" && typeof w?.word === "string" && w.word.trim()
        );
        if (!alive) return;
        setWords(cleaned.slice(0, 4));
      } catch {
        if (!alive) return;
        setWords([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
      controller.abort();
    };
  }, []);

  const cards = useMemo(() => words.map((w) => ({
    ...w,
    categoryName: w.category?.name?.trim() ?? "",
    definition: pickDefinition(w),
    submittedAgo: formatRelative(w.created_at),
  })), [words]);

  return (
    <div className="w-full">
      <h2 className="font-display font-bold lg:text-6xl md:text-[3.2rem] leading-none text-[#00336E]">
        Fresh Submissions
      </h2>

      <p className="my-4 font-sans text-lg text-[#00336E]">
        Latest words discovered by users like you.
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        {loading && cards.length === 0
          ? Array.from({ length: 4 }).map((_, idx) => (
              <article
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white shadow-card p-5 flex flex-col gap-3 animate-pulse"
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-20 bg-slate-200 rounded-full" />
                  <div className="h-8 w-28 bg-slate-200 rounded-full" />
                </div>
                <div className="h-7 w-2/3 bg-slate-200 rounded" />
                <div className="h-5 w-full bg-slate-200 rounded" />
                <div className="h-5 w-5/6 bg-slate-200 rounded" />
                <div className="h-4 w-1/2 bg-slate-200 rounded" />
              </article>
            ))
          : null}

        {!loading && cards.length === 0 ? (
          <div className="text-sm text-slate-500">No submissions found.</div>
        ) : null}

        {cards.map((w) => (
          <article
            key={w.id}
            className="rounded-2xl border border-slate-200 bg-white shadow-card p-5 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 text-[12px] flex-wrap">
              <span className="px-5 py-2 rounded-full bg-[#F2F4F7] text-[#769ECC] font-bold">
                NEW
              </span>

              {w.categoryName ? (
                <span className="px-5 py-2 rounded-full bg-[#00336E] text-[#FFFFFF]">
                  {w.categoryName}
                </span>
              ) : null}
            </div>

            <h3 className="mt-2 font-bold text-2xl text-[#00336E]">{w.word}</h3>

            {w.definition ? (
              <p className="text-lg text-[#00336E]">{w.definition}</p>
            ) : (
              <p className="text-lg text-[#00336E]/60">No definition yet.</p>
            )}

            {w.submittedAgo ? (
              <div className="mt-2 text-[12px] text-[#000000] flex items-center gap-1 font-bold">
                <LuClock4 /> <span>Submitted {w.submittedAgo}</span>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
};
