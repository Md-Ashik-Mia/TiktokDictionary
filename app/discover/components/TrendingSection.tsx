"use client";

import { api } from "@/lib/https";
import { useEffect, useMemo, useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { LuHandshake } from "react-icons/lu";

type Timeframe = "today" | "week" | "month";

type TrendingApiItem = {
  total_likes: number;
  definitions: Record<string, number>;
};

type TrendingApiResponse = Record<string, TrendingApiItem>;

type TrendingCard = {
  word: string;
  badge: string;
  stat: React.ReactNode;
  description: string;
  isHot: boolean;
};

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
  const [trendingIndex, setTrendingIndex] = useState(0);
  const [items, setItems] = useState<TrendingCard[]>([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();

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

        const data = res.data ?? ({} as TrendingApiResponse);
        const mapped: TrendingCard[] = Object.entries(data)
          .map(([word, payload], idx) => {
            const firstDef = Object.keys(payload?.definitions ?? {})[0] ?? "";
            return {
              word,
              badge,
              stat: (
                <>
                  <LuHandshake /> {payload?.total_likes ?? 0}
                </>
              ),
              description: firstDef,
              isHot: idx < 3,
            };
          })
          .filter((x) => x.word.trim().length > 0);

        if (!alive) return;
        setItems(mapped);
        setTrendingIndex(0);
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
  }, [timeframe, category, badge]);

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
