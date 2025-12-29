"use client";

import { api } from "@/lib/https";
import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";

type TrendingTab = "today" | "week" | "month";

type TrendingApiDefinition = {
  definition_id?: number;
  definition?: string;
  likes?: number;
};

type TrendingApiWordItem = {
  word_id?: number;
  word?: string;
  category?: string;
  total_likes?: number;
  definitions?: TrendingApiDefinition[];
};

type TrendingApiResponse = TrendingApiWordItem[];

type TrendingCard = {
  wordId?: number;
  word: string;
  rank: number;
  category: string;
  definition: string;
  likes: number;
  period: TrendingTab;
};

function pickTopDefinition(defs?: TrendingApiDefinition[]) {
  const list = Array.isArray(defs) ? defs : [];
  const best = list
    .filter((d) => typeof d?.definition === "string" && d.definition.trim())
    .slice()
    .sort((a, b) => Number(b?.likes ?? 0) - Number(a?.likes ?? 0))[0];
  return (best?.definition ?? "").trim();
}

export const TrendingSection = () => {
  const [activeTab, setActiveTab] = useState<TrendingTab>("today");
  const [remoteByTab, setRemoteByTab] = useState<
    Partial<Record<TrendingTab, TrendingCard[]>>
  >({});
  const [loading, setLoading] = useState(false);

  const tabs = [
    { key: "today" as const, label: "Today" },
    { key: "week" as const, label: "This Week" },
    { key: "month" as const, label: "This Month" },
  ];

  useEffect(() => {
    const day = activeTab === "today" ? "1" : activeTab === "week" ? "7" : "30";
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      try {
        const res = await api.post<TrendingApiResponse>(
          "dictionary/trendingwords/",
          { day },
          { signal: controller.signal }
        );

        const list = Array.isArray(res.data) ? res.data : [];
        const cards = list
          .map((item) => {
            const likes = Number(item?.total_likes ?? 0);
            const definition = pickTopDefinition(item?.definitions);
            const word = String(item?.word ?? "").trim();
            const category = String(item?.category ?? "Trending").trim() || "Trending";
            return {
              wordId: typeof item?.word_id === "number" ? item.word_id : undefined,
              word,
              rank: 0,
              category,
              definition,
              likes,
              period: activeTab,
            } satisfies TrendingCard;
          })
          .filter((c) => c.word.length > 0)
          .sort((a, b) => b.likes - a.likes)
          .map((item, idx) => ({ ...item, rank: idx + 1 }));

        setRemoteByTab((prev) => ({ ...prev, [activeTab]: cards }));
      } catch {
        if (controller.signal.aborted) return;
        setRemoteByTab((prev) => ({ ...prev, [activeTab]: [] }));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [activeTab]);

  const filteredData = remoteByTab[activeTab] ?? [];

  return (
    <div className="w-full">
      {/* Heading + description (LEFT aligned) */}
      <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-[3.2rem] lg:text-6xl leading-none text-[#00336E]">
        Trending Right Now
      </h2>

      <p className="mt-2 font-sans text-lg text-[#00336E]">
        Choose the correct meaning and discover new words instantly.
      </p>

      {/* Tabs (LEFT aligned) */}
      <div className="mt-8 flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              activeTab === tab.key
                ? "bg-[#00336E] text-white shadow-md"
                : "bg-slate-100 text-[#00336E] hover:bg-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {loading && filteredData.length === 0
          ? Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="min-h-52 w-full rounded-2xl p-5 border border-[#00336E] bg-white shadow-sm animate-pulse"
              >
                <div className="h-6 w-2/3 bg-slate-200 rounded mb-3" />
                <div className="h-4 w-1/3 bg-slate-200 rounded mb-4" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-slate-200 rounded" />
                  <div className="h-4 w-5/6 bg-slate-200 rounded" />
                  <div className="h-4 w-2/3 bg-slate-200 rounded" />
                </div>
              </div>
            ))
          : null}

        {!loading && filteredData.length === 0 ? (
          <div className="text-sm text-slate-500">No trending words found.</div>
        ) : null}

        {filteredData.map((item) => (
          <article
            key={item.wordId != null ? String(item.wordId) : `${item.word}-${item.rank}`}
            className="flex flex-col justify-between min-h-52 w-full rounded-2xl p-5 border border-[#00336E] bg-white shadow-sm hover:shadow-md transition-all"
          >
            <div>
              {/* word + rank */}
              <header className="flex items-start justify-between mb-2">
                <h3 className="font-display text-2xl font-semibold text-[#000000] capitalize">
                  {item.word}
                </h3>
                <span className="text-2xl font-display font-bold text-[#000000]">
                  #{item.rank}
                </span>
              </header>

              {/* category pill */}
              <div className="mb-3">
                <span className="inline-block rounded-full px-3 py-1 bg-slate-100 text-xs font-medium text-[#769ECC]">
                  {item.category}
                </span>
              </div>

              {/* definition */}
              <p className="text-base text-[#00336E] line-clamp-3">
                {item.definition}
              </p>
            </div>

            {/* likes */}
            <footer className="font-bold flex items-center gap-1.5 text-[#000000] mt-auto pt-2">
              <AiOutlineLike className="text-lg" />
              <span className="text-base">
                {item.likes.toLocaleString()} agreed
              </span>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
};
