"use client";

import { api } from "@/lib/https";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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

const TRENDING_CACHE_TTL_MS = 5 * 60 * 1000;
const trendingCache = new Map<TrendingTab, { ts: number; cards: TrendingCard[] }>();

function pickTopDefinition(defs?: TrendingApiDefinition[]) {
  const list = Array.isArray(defs) ? defs : [];
  const best = list
    .filter((d) => typeof d?.definition === "string" && d.definition.trim())
    .slice()
    .sort((a, b) => Number(b?.likes ?? 0) - Number(a?.likes ?? 0))[0];
  return (best?.definition ?? "").trim();
}

function wordToSlug(word: string) {
  const normalized = word.trim().replace(/\s+/g, "-");
  return encodeURIComponent(normalized);
}

export const TrendingSection = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TrendingTab>("today");
  const [cards, setCards] = useState<TrendingCard[]>([]);
  const [loading, setLoading] = useState(false);
  const requestIdRef = useRef(0);

  function isFresh(tab: TrendingTab) {
    const cached = trendingCache.get(tab);
    if (!cached) return false;
    return Date.now() - cached.ts < TRENDING_CACHE_TTL_MS;
  }

  async function fetchTrending(tab: TrendingTab, signal?: AbortSignal) {
    const cached = trendingCache.get(tab);
    if (cached && Date.now() - cached.ts < TRENDING_CACHE_TTL_MS) {
      return cached.cards;
    }

    const day = tab === "today" ? "1" : tab === "week" ? "7" : "30";
    const res = await api.post<TrendingApiResponse>(
      "dictionary/trendingwords/",
      { day },
      signal ? { signal } : undefined
    );

    const list = Array.isArray(res.data) ? res.data : [];
    const nextCards = list
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
          period: tab,
        } satisfies TrendingCard;
      })
      .filter((c) => c.word.length > 0)
      .sort((a, b) => b.likes - a.likes)
      .map((item, idx) => ({ ...item, rank: idx + 1 }));

    trendingCache.set(tab, { ts: Date.now(), cards: nextCards });
    return nextCards;
  }

  function prefetchOtherTabs(current: TrendingTab) {
    const others: TrendingTab[] = ["today", "week", "month"].filter(
      (t): t is TrendingTab => t !== current
    );

    // Prefetch only if missing/stale; do not touch UI loading state.
    others.forEach((t) => {
      if (isFresh(t)) return;
      fetchTrending(t).catch(() => {
        // ignore
      });
    });
  }

  function navigateToWord(word: string, wordId?: number) {
    // const trimmed = word.trim();
    // if (!trimmed) return;
    // const slug = wordToSlug(trimmed);
    // router.push(
    //   typeof wordId === "number"
    //     ? `/word/${slug}?id=${encodeURIComponent(String(wordId))}`
    //     : `/word/${slug}`
    // );

    router.push(`/word/${wordId}`)

  }

  const tabs = [
    { key: "today" as const, label: "Today" },
    { key: "week" as const, label: "This Week" },
    { key: "month" as const, label: "This Month" },
  ];

  useEffect(() => {
    const controller = new AbortController();
    const requestId = ++requestIdRef.current;

    const cached = trendingCache.get(activeTab);
    if (cached && Date.now() - cached.ts < TRENDING_CACHE_TTL_MS) {
      setCards(cached.cards);
      setLoading(false);
      // Still prefetch others to keep navigation snappy.
      prefetchOtherTabs(activeTab);
      return;
    }

    async function load() {
      setLoading(true);
      // No caching: clear old tab results immediately.
      setCards([]);
      try {
        const nextCards = await fetchTrending(activeTab, controller.signal);

        // Prevent late responses from overwriting the current tab.
        if (controller.signal.aborted) return;
        if (requestId !== requestIdRef.current) return;
        setCards(nextCards);

        prefetchOtherTabs(activeTab);
      } catch {
        if (controller.signal.aborted) return;
        if (requestId !== requestIdRef.current) return;
        setCards([]);
      } finally {
        if (controller.signal.aborted) return;
        if (requestId !== requestIdRef.current) return;
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [activeTab]);

  const filteredData = cards;

  return (
    <div className="w-full">
      {/* Heading + description (LEFT aligned) */}
      <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-[3.2rem] lg:text-6xl leading-none text-[#00336E]">
        Trending Right Now
      </h2>

      <p className="mt-2 font-sans text-base sm:text-lg text-[#00336E]">
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
            className="flex flex-col justify-between min-h-52 w-full rounded-2xl p-5 border border-[#00336E] bg-white shadow-sm hover:shadow-md transition-all cursor-pointer"
            role="link"
            tabIndex={0}
            onClick={() => navigateToWord(item.word, item.wordId)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigateToWord(item.word, item.wordId);
              }
            }}
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
