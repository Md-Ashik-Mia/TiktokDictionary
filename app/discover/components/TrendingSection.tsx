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

const fallbackTrending: TrendingCard[] = [
  {
    word: "Rizz",
    badge: "Trending Today",
    stat: (
      <>
        <LuHandshake /> 92%
      </>
    ),
    description: "Confidence-based attraction skill.",
    isHot: true,
  },
  {
    word: "Delulu",
    badge: "Trending Today",
    stat: "88% agree",
    description: "Being intentionally delusional.",
    isHot: true,
  },
  {
    word: "NPC Walk",
    badge: "Viral Audio",
    stat: "81% agree",
    description: "Walking like a game NPC.",
    isHot: false,
  },
  {
    word: "Beige Flag",
    badge: "Trending Today",
    stat: "75% agree",
    description: "A trait that is neither good nor bad, just odd.",
    isHot: true,
  },
  {
    word: "Girl Dinner",
    badge: "Viral Trend",
    stat: "95% agree",
    description: "A meal consisting of random snacks.",
    isHot: true,
  },
  {
    word: "Canon Event",
    badge: "Viral Concept",
    stat: "89% agree",
    description: "An unavoidable event that shapes character.",
    isHot: false,
  },
];

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
  const [items, setItems] = useState<TrendingCard[]>(fallbackTrending);

  const getVisibleItems = <T,>(items: T[], startIndex: number, count: number) => {
    return new Array(count)
      .fill(0)
      .map((_, i) => items[(startIndex + i) % items.length]);
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
        if (!category.trim()) {
          if (!alive) return;
          setItems(fallbackTrending);
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
        setItems(mapped.length > 0 ? mapped : fallbackTrending);
        setTrendingIndex(0);
      } catch {
        if (!alive) return;
        setItems(fallbackTrending);
        setTrendingIndex(0);
      }
    }

    load();
    return () => {
      alive = false;
      controller.abort();
    };
  }, [timeframe, category, badge]);

  return (
    <section className="max-w-6xl mx-auto px-6 mt-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-[2.2rem] text-[#00336E]">
          Trending Words
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => prevSlide(setTrendingIndex, items.length)}
            className="text-[#00336E] hover:text-[#00336E]/80 transition"
          >
            <IoIosArrowDropleft size={40} />
          </button>
          <button
            onClick={() => nextSlide(setTrendingIndex, items.length)}
            className="text-[#00336E] hover:text-[#00336E]/80 transition"
          >
            <IoIosArrowDropright size={40} />
          </button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {getVisibleItems(items, trendingIndex, 3).map((item, i) => (
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
