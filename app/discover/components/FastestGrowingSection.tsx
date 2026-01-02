"use client";

import { api } from "@/lib/https";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

type FastestGrowingItem = {
  word: string;
  change: string;
  tag: string;
  wordId?: number;
};

type FastestGrowingApiItem = {
  word?: string;
  word_id?: number;
  current_likes?: number;
  previous_likes?: number;
  category?: string;
  growth_rate?: number;
};

type FastestGrowingApiResponse = FastestGrowingApiItem[];

function formatGrowthRate(value: number): string {
  if (Number.isNaN(value)) return "0%";
  const rounded = Math.round(value);
  return rounded > 0 ? `+${rounded}%` : `${rounded}%`;
}

function wordToSlug(word: string) {
  const normalized = word.trim().replace(/\s+/g, "-");
  return encodeURIComponent(normalized);
}

export const FastestGrowingSection = () => {
  const router = useRouter();
  const [fastestIndex, setFastestIndex] = useState(0);
  const [items, setItems] = useState<FastestGrowingItem[]>([]);

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

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();

    async function loadFastestGrowing() {
      try {
        const res = await api.post<FastestGrowingApiResponse>(
          "dictionary/fastestgrowingwords/",
          { day: 1 },
          { signal: controller.signal }
        );

        const data = Array.isArray(res.data) ? res.data : [];
        const mapped = data
          .map((meta) => {
            const word = typeof meta?.word === "string" ? meta.word.trim() : "";
            const wordId = typeof meta?.word_id === "number" ? meta.word_id : undefined;
            const category = typeof meta?.category === "string" ? meta.category.trim() : "";
            const growthRate = typeof meta?.growth_rate === "number" ? meta.growth_rate : 0;
            return {
              word,
              change: formatGrowthRate(growthRate),
              tag: category || "—",
              wordId,
              growthRate,
            };
          })
          .filter((x) => Boolean(x.word))
          .sort((a, b) => (b.growthRate ?? 0) - (a.growthRate ?? 0))
          .map((item) => ({ word: item.word, change: item.change, tag: item.tag, wordId: item.wordId }));

        if (!alive) return;
        setItems(mapped);
        setFastestIndex(0);
      } catch {
        if (!alive) return;
        setItems([]);
        setFastestIndex(0);
      }
    }

    loadFastestGrowing();
    return () => {
      alive = false;
      controller.abort();
    };
  }, []);

  const canSlide = items.length > 1;

  function navigateToWord(word: string, wordId?: number) {
    const trimmed = word.trim();
    if (!trimmed) return;
    const slug = wordToSlug(trimmed);
    router.push(
      typeof wordId === "number"
        ? `/word/${slug}?id=${encodeURIComponent(String(wordId))}`
        : `/word/${slug}`
    );
  }

  return (
    <section className="bg-[#EFF6FE] py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-[2.2rem] text-[#00336E]">
            Fastest Growing Words
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => (canSlide ? prevSlide(setFastestIndex, items.length) : undefined)}
              disabled={!canSlide}
              className="text-[#00336E] hover:text-[#00336E]/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IoIosArrowDropleft size={40} />
            </button>
            <button
              onClick={() => (canSlide ? nextSlide(setFastestIndex, items.length) : undefined)}
              disabled={!canSlide}
              className="text-[#00336E] hover:text-[#00336E]/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IoIosArrowDropright size={40} />
            </button>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {items.length === 0
            ? null
            : getVisibleItems(items, fastestIndex, Math.min(3, items.length)).map((item, i) => (
            <article
              key={`${item.word}-${i}`}
              className="rounded-[24px] border border-[#00336E] bg-white p-6 flex flex-col justify-between hover:shadow-md transition-all cursor-pointer"
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
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display font-bold text-2xl text-[#000000]">
                  {item.word}
                </h3>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-bold font-display px-3 py-2 rounded-xl bg-[#00336E1A] text-[#000000] flex items-center gap-1">
                  <HiArrowTrendingUp className="text-sm" /> {item.change}
                </span>
                <span className="font-bold font-display px-3 py-2 rounded-xl bg-[#00336E1A] text-[#000000]  text-[12px]  uppercase tracking-wide">
                  {item.tag}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
