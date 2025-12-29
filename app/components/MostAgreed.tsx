"use client";

import { api } from "@/lib/https";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";

type TrendingApiDefinition = {
  definition?: string;
  is_primary?: boolean;
};

type TrendingApiWordData = {
  total_likes?: number;
  definitions?: TrendingApiDefinition[];
};

type TrendingApiResponse = Record<string, TrendingApiWordData>;

type Item = {
  label: string;
  badge: string;
  description: string;
  votes: number;
};

function pickTopDefinition(defs?: TrendingApiDefinition[]) {
  const list = Array.isArray(defs) ? defs : [];
  const primary = list.find((d) => d?.is_primary && typeof d.definition === "string");
  if (primary?.definition?.trim()) return primary.definition.trim();
  const first = list.find((d) => typeof d?.definition === "string" && d.definition.trim());
  return first?.definition?.trim() ?? "";
}

export const MostAgreed = () => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      try {
        const res = await api.post<TrendingApiResponse>(
          "dictionary/trendingwords/",
          { day: "30" },
          { signal: controller.signal }
        );

        const cards = Object.entries(res.data ?? {})
          .map(([word, data]) => {
            const votes = Number(data?.total_likes ?? 0);
            const description = pickTopDefinition(data?.definitions);
            return {
              label: word,
              badge: "Trending",
              description,
              votes,
            } satisfies Item;
          })
          .filter((x) => x.label.trim().length > 0)
          .sort((a, b) => b.votes - a.votes)
          .slice(0, 3);

        setItems(cards);
      } catch {
        if (controller.signal.aborted) return;
        setItems([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  const showEmpty = !loading && items.length === 0;
  const showSkeleton = loading && items.length === 0;

  return (
    <div className="w-full">
      <div className="">
        {/* Heading + description */}
        <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-[3.2rem] lg:text-6xl leading-none text-[#00336E]">
          Most Agreed Definitions
        </h2>

        <p className="my-4 font-sans text-base sm:text-lg text-[#00336E]">
          Definitions voted accurate by the community.
        </p>

        {/* Cards */}
        <div className="flex flex-col gap-5">
          {showSkeleton
            ? Array.from({ length: 3 }).map((_, idx) => (
                <article
                  key={idx}
                  className="w-full rounded-2xl bg-white shadow-card px-6 py-5 border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 animate-pulse"
                >
                  <div className="w-full max-w-2xl">
                    <div className="h-7 w-1/2 bg-slate-200 rounded" />
                    <div className="mt-3 h-5 w-full bg-slate-200 rounded" />
                    <div className="mt-2 h-5 w-5/6 bg-slate-200 rounded" />
                    <div className="mt-3 h-5 w-1/3 bg-slate-200 rounded" />
                  </div>
                  <div className="flex flex-col min-w-32 min-h-[104px] bg-[#F2F4F7] p-6 rounded-lg">
                    <div className="h-10 w-20 bg-slate-200 rounded" />
                    <div className="mt-2 h-4 w-20 bg-slate-200 rounded" />
                  </div>
                </article>
              ))
            : null}

          {showEmpty ? (
            <div className="text-sm text-slate-500">No agreed definitions found.</div>
          ) : null}

          {items.map((item) => (
            <article
              key={item.label}
              className="w-full rounded-2xl bg-white shadow-card px-6 py-5 border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4"
            >
              {/* LEFT */}
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-2xl text-[#00336E]">
                    {item.label}
                  </h3>
                  <span className="text-[12px] px-3 py-0.5 rounded-full bg-[#C5FFC9] text-[#29AA32] border
                  font-bold border-[#29AA32]">
                    {item.badge}
                  </span>
                </div>

                <p className="mt-2 text-[18px] text-[#00336E]">
                  {item.description || "No definition available yet."}
                </p>

                <p className="mt-2 text-[16px] text-[#000000] font-bold">
                  <AiOutlineLike className="inline mr-1" /> {item.votes.toLocaleString()} agreed
                </p>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col min-w-32 min-h-[104px] bg-[#F2F4F7] p-6 rounded-lg">
                <span className="font-display text-2xl font-bold text-[#00336E]">
                  {item.votes.toLocaleString()}
                </span>
                <span className="text-[12px] text-center tracking-wide">agreed</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
