"use client";

import { useState } from "react";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const fastestGrowing = [
  { word: "Gyatt’d", change: "+640%", tag: "Slang" },
  { word: "Corecore", change: "+220%", tag: "Aesthetic" },
  { word: "Rage Baiting", change: "+190%", tag: "Creator Culture" },
  { word: "Skibidi", change: "+150%", tag: "Meme" },
  { word: "Fanum Tax", change: "+120%", tag: "Streamer" },
  { word: "Mewing", change: "+110%", tag: "Fitness" },
];

export const FastestGrowingSection = () => {
  const [fastestIndex, setFastestIndex] = useState(0);

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
    <section className="bg-[#EFF6FE] py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display font-bold text-2xl md:text-[2.2rem] text-[#00336E]">
            Fastest Growing Words
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => prevSlide(setFastestIndex, fastestGrowing.length)}
              className="text-[#00336E] hover:text-[#00336E]/80 transition"
            >
              <IoIosArrowDropleft size={40} />
            </button>
            <button
              onClick={() => nextSlide(setFastestIndex, fastestGrowing.length)}
              className="text-[#00336E] hover:text-[#00336E]/80 transition"
            >
              <IoIosArrowDropright size={40} />
            </button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {getVisibleItems(fastestGrowing, fastestIndex, 3).map((item, i) => (
            <article
              key={`${item.word}-${i}`}
              className="rounded-[24px] border border-[#00336E] bg-white p-6 flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display font-bold text-xl text-[#00336E]">
                  {item.word}
                </h3>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#dcfce7] text-[#166534] border border-[#bbf7d0] flex items-center gap-1">
                  <HiArrowTrendingUp className="text-sm" /> {item.change}
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wide">
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
