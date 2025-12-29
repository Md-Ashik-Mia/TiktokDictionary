"use client";

import { api } from "@/lib/https";
import { useEffect, useMemo, useState } from "react";

type ApiCategory = {
  id: number;
  name: string;
  total_words?: number;
};

type AllCategoriesResponse = {
  count: number;
  categories: ApiCategory[];
};

function formatCountWords(total?: number) {
  if (typeof total !== "number" || !Number.isFinite(total)) return "";
  return `${total.toLocaleString()} words`;
}

export const ExploreCategories = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ApiCategory[]>([]);

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      try {
        const res = await api.get<AllCategoriesResponse>("dictionary/allcategories/", {
          signal: controller.signal,
        });

        const raw = res.data?.categories ?? [];
        const seen = new Set<string>();
        const cleaned: ApiCategory[] = [];
        for (const c of raw) {
          const name = typeof c?.name === "string" ? c.name.trim() : "";
          if (!name) continue;
          const key = name.toLowerCase();
          if (seen.has(key)) continue;
          seen.add(key);
          cleaned.push({ ...c, name });
        }

        if (!alive) return;
        setCategories(cleaned);
      } catch {
        if (!alive) return;
        setCategories([]);
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

  const display = useMemo(() => categories.slice(0, 8), [categories]);

  return (
    <section className="min-h-screen bg-[#EFF6FE] py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-6 mt-10 sm:mt-20">
        <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-[3.2rem] lg:text-6xl leading-none text-[#00336E]">
          Explore Categories
        </h2>

        <p className="my-4 font-sans text-base sm:text-lg text-[#00336E]">
          Definitions voted accurate by the community.
        </p>

        <div className="grid gap-4 md:grid-cols-4">
          {loading && display.length === 0
            ? Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-white/60 border border-[#00336E] shadow-card px-5 py-6 animate-pulse"
                >
                  <div className="h-6 w-2/3 bg-slate-200 rounded mx-auto" />
                  <div className="mt-3 h-5 w-1/2 bg-slate-200 rounded mx-auto" />
                </div>
              ))
            : null}

          {!loading && display.length === 0 ? (
            <div className="text-sm text-slate-500">No categories found.</div>
          ) : null}

          {display.map((c) => {
            const count = formatCountWords(c.total_words);
            return (
              <button
                key={c.id}
                className="rounded-2xl bg-transparent border border-[#00336E] shadow-card px-5 py-6 text-left hover:-translate-y-1 hover:shadow-lg transition"
                type="button"
              >
                <p className="font-bold text-xl sm:text-2xl text-[#00336E] text-center">{c.name}</p>
                {count ? (
                  <p className="mt-1 text-base sm:text-[18px] text-[#00336E] text-center">{count}</p>
                ) : (
                  <p className="mt-1 text-base sm:text-[18px] text-[#00336E]/60 text-center">Word count unavailable</p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
