"use client";

import { useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const trendingWords = [
  {
    word: "Rizz",
    badge: "Trending Today",
    stat: "92% agree",
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

export const TrendingSection = () => {
  const [trendingIndex, setTrendingIndex] = useState(0);

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

  return (
    <section className="max-w-6xl mx-auto px-6 mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-bold text-2xl md:text-[2.2rem] text-[#00336E]">
          Trending Words
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => prevSlide(setTrendingIndex, trendingWords.length)}
            className="text-[#00336E] hover:text-[#00336E]/80 transition"
          >
            <IoIosArrowDropleft size={40} />
          </button>
          <button
            onClick={() => nextSlide(setTrendingIndex, trendingWords.length)}
            className="text-[#00336E] hover:text-[#00336E]/80 transition"
          >
            <IoIosArrowDropright size={40} />
          </button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {getVisibleItems(trendingWords, trendingIndex, 3).map((item, i) => (
          <article
            key={`${item.word}-${i}`}
            className="group rounded-[24px] border border-[#00336E] bg-white p-6 flex flex-col gap-3 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-display font-bold text-xl text-[#00336E]">
                {item.word}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] font-semibold">
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 flex items-center gap-1">
                {item.stat}
              </span>
              {item.isHot ? (
                <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 flex items-center gap-1">
                  🔥 {item.badge}
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                  🔥 {item.badge}
                </span>
              )}
            </div>

            <p className="text-sm text-[#00336E]/80 leading-relaxed mt-1">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
