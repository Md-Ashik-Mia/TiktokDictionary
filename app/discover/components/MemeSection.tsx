"use client";

import { useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const memeWords = [
  { word: "It’s Corn!", tag: "Meme Audio" },
  { word: "She ate & left no crumbs", tag: "Reaction" },
  { word: "Bombastic Side Eye", tag: "Audio Trend" },
  { word: "Ohio", tag: "Location Meme" },
  { word: "Grimace Shake", tag: "Viral Trend" },
  { word: "Smurf Cat", tag: "Character" },
];

export const MemeSection = () => {
  const [memeIndex, setMemeIndex] = useState(0);

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
          <h2 className="font-display font-bold !text-5xl md:text-[2.2rem] text-[#00336E]">
            Meme Words Of The Week
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => prevSlide(setMemeIndex, memeWords.length)}
              className="text-[#00336E] hover:text-[#00336E]/80 transition"
            >
              <IoIosArrowDropleft size={40} />
            </button>
            <button
              onClick={() => nextSlide(setMemeIndex, memeWords.length)}
              className="text-[#00336E] hover:text-[#00336E]/80 transition"
            >
              <IoIosArrowDropright size={40} />
            </button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {getVisibleItems(memeWords, memeIndex, 3).map((item, i) => (
            <article
              key={`${item.word}-${i}`}
              className="rounded-[24px] border border-[#00336E] bg-white p-6 flex flex-col justify-between hover:shadow-md transition-all"
            >
              <h3 className="font-display font-bold text-2xl text-[#000000]">
                {item.word}
              </h3>
              <div>
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
