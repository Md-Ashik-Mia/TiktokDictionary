"use client";

import { api } from "@/lib/https";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { LuHandshake } from "react-icons/lu";

type Timeframe = "today" | "week" | "month";

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
  badge: string;
  stat: React.ReactNode;
  description: string;
  isHot: boolean;
};

const DISCOVER_TRENDING_CACHE_TTL_MS = 5 * 60 * 1000;
const discoverTrendingCache = new Map<
  string,
  { ts: number; items: TrendingCard[] }
>();

function pickTopDefinition(defs?: TrendingApiDefinition[]) {
  const list = Array.isArray(defs) ? defs : [];
  const best = list
    .filter((d) => typeof d?.definition === "string" && d.definition.trim())
    .slice()
    .sort((a, b) => Number(b?.likes ?? 0) - Number(a?.likes ?? 0))[0];
  return (best?.definition ?? "").trim();
}

function timeframeToDay(tf: Timeframe) {
  if (tf === "today") return "1";
  if (tf === "week") return "7";
  return "30";
}

function timeframeToBadge(tf: Timeframe) {
  if (tf === "today") return "Trending Today";
  if (tf === "week") return "Trending This Week";
  return "Trending This Month";
}

function categoryToApi(category: string) {
  const normalized = category.trim().toLowerCase().replace(/\s+/g, "_");
  if (!normalized) return "";
  if (normalized.endsWith("ies") && normalized.length > 3) {
    return `${normalized.slice(0, -3)}y`;
  }
  if (normalized.endsWith("s") && !normalized.endsWith("ss") && normalized.length > 1) {
    return normalized.slice(0, -1);
  }
  return normalized;
}

export const TrendingSection = ({
  timeframe,
  category,
}: {
  timeframe: Timeframe;
  category: string;
}) => {
  const router = useRouter();
  const [trendingIndex, setTrendingIndex] = useState(0);
  const [items, setItems] = useState<TrendingCard[]>([]);
  const [loading, setLoading] = useState(false);

  function navigateToWord(word: string, wordId?: number) {
    const trimmed = word.trim();
    if (!trimmed) return;
    router.push(
      `/word/${wordId}`
      // typeof wordId === "number"
      //   ? `/word/${slug}?id=${encodeURIComponent(String(wordId))}`
      //   : `/word/${slug}`
    );
  }

  const getVisibleItems = <T,>(items: T[], startIndex: number, count: number) => {
    if (items.length === 0) return [];
    if (items.length <= count) return items;
    return new Array(count).fill(0).map((_, i) => items[(startIndex + i) % items.length]);
  };

  const nextSlide = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    length: number
  ) => {
    setter((prev) => (prev + 1) % length);
  };

  const prevSlide = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    length: number
  ) => {
    setter((prev) => (prev - 1 + length) % length);
  };

  const badge = useMemo(() => timeframeToBadge(timeframe), [timeframe]);

  const cacheKey = useMemo(() => {
    const cat = categoryToApi(category);
    return `${timeframeToDay(timeframe)}|${cat}`;
  }, [timeframe, category]);

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();

    const cached = discoverTrendingCache.get(cacheKey);
    if (cached && Date.now() - cached.ts < DISCOVER_TRENDING_CACHE_TTL_MS) {
      setItems(cached.items);
      setTrendingIndex(0);
      setLoading(false);
      return () => {
        alive = false;
        controller.abort();
      };
    }

    async function load() {
      try {
        setLoading(true);
        if (!category.trim()) {
          if (!alive) return;
          setItems([]);
          setTrendingIndex(0);
          return;
        }

        const res = await api.post<TrendingApiResponse>(
          "dictionary/trendingwords/",
          {
            day: timeframeToDay(timeframe),
            category: categoryToApi(category),
          },
          { signal: controller.signal }
        );

        const list = Array.isArray(res.data) ? res.data : [];
        const sorted = list
          .map((item) => ({
            wordId: typeof item?.word_id === "number" ? item.word_id : undefined,
            word: String(item?.word ?? "").trim(),
            totalLikes: Number(item?.total_likes ?? 0),
            definition: pickTopDefinition(item?.definitions),
          }))
          .filter((x) => x.word.length > 0)
          .sort((a, b) => b.totalLikes - a.totalLikes);

        // Backend sometimes returns duplicates; keep the highest-like entry per word_id (or per word if id missing).
        const seen = new Set<string>();
        const unique = sorted.filter((x) => {
          const key = x.wordId != null ? `id:${x.wordId}` : `word:${x.word.toLowerCase()}`;
          if (seen.has(key)) return false;
          seen.add(key);
          return true;
        });

        const mapped: TrendingCard[] = unique
          .map((x, idx) => {
            return {
              wordId: x.wordId,
              word: x.word,
              badge,
              stat: (
                <>
                  <LuHandshake /> {x.totalLikes}
                </>
              ),
              description: x.definition,
              isHot: idx < 3,
            };
          })
          .filter((x) => x.word.trim().length > 0);

        if (!alive) return;
        setItems(mapped);
        setTrendingIndex(0);

        discoverTrendingCache.set(cacheKey, { ts: Date.now(), items: mapped });
      } catch {
        if (!alive) return;
        setItems([]);
        setTrendingIndex(0);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
      controller.abort();
    };
  }, [timeframe, category, badge, cacheKey]);

  const canSlide = items.length > 3;
  const visible = getVisibleItems(items, trendingIndex, 3);

  return (
    <section className="max-w-6xl mx-auto px-6 mt-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-[2.2rem] text-[#00336E]">
          Trending Words
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => (canSlide ? prevSlide(setTrendingIndex, items.length) : undefined)}
            disabled={!canSlide}
            className="text-[#00336E] hover:text-[#00336E]/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoIosArrowDropleft size={40} />
          </button>
          <button
            onClick={() => (canSlide ? nextSlide(setTrendingIndex, items.length) : undefined)}
            disabled={!canSlide}
            className="text-[#00336E] hover:text-[#00336E]/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoIosArrowDropright size={40} />
          </button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {loading
          ? Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-[24px] border border-[#00336E] bg-white p-6 flex flex-col gap-3 animate-pulse"
              >
                <div className="h-6 w-2/3 bg-slate-200 rounded" />
                <div className="h-4 w-1/2 bg-slate-200 rounded" />
                <div className="h-4 w-full bg-slate-200 rounded" />
                <div className="h-4 w-5/6 bg-slate-200 rounded" />
              </div>
            ))
          : null}

        {!loading && visible.length === 0 ? (
          <div className="text-sm text-slate-500">No trending words found.</div>
        ) : null}

        {visible.map((item, i) => (
          <article
            key={`${item.word}-${i}`}
            className="group rounded-[24px] border border-[#00336E] bg-white p-6 flex flex-col gap-3 hover:shadow-lg transition-all duration-300 cursor-pointer"
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
            <div className="flex items-start justify-between">
              <h3 className="font-display font-bold text-2xl text-[#000000]">
                {item.word}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 text-[12px] font-semibold">
              <span className="font-bold font-display px-3 py-2 rounded-xl bg-[#00336E1A] text-[#000000] flex items-center gap-1">
                {item.stat}
              </span>
              {item.isHot ? (
                <span className="font-bold font-display px-3 py-2 rounded-xl bg-[#00336E1A] text-[#000000] flex items-center gap-1">
                  🔥 {item.badge}
                </span>
              ) : (
                <span className="font-bold font-display px-3 py-2 rounded-xl bg-[#00336E1A] text-[#000000]">
                  🔥 {item.badge}
                </span>
              )}
            </div>

            <p className="text-[16px] text-[#000000] leading-relaxed mt-1">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
