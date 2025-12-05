"use client";

import { useState } from "react";

const subcultureFilters = [
  "Gen Z",
  "Gaming",
  "AAVE",
  "Stan Culture",
  "Anime",
  "Fitness",
  "NSFW",
];

const subcultureWords = [
  { word: "Hard Carry", tag: "Gaming" },
  { word: "He’s so bookie", tag: "AAVE" },
  { word: "Simp Arc", tag: "Anime" },
  { word: "Main Character Energy", tag: "Gen Z" },
];

export const SubcultureSection = () => {
  const [subcultureFilter, setSubcultureFilter] = useState("Gen Z");

  return (
    <section className="max-w-6xl mx-auto px-6">
      <h2 className="font-display font-bold !text-5xl md:text-[2.2rem] text-[#00336E] mb-6">
        Subculture Words
      </h2>

      <div className="flex flex-wrap gap-2 mb-8">
        {subcultureFilters.map((item) => (
          <button
            key={item}
            onClick={() => setSubcultureFilter(item)}
            className={`px-5 py-2 rounded-full text-[16px] font-bold transition-all ${
              subcultureFilter === item
                ? "bg-[#00336E] text-white border border-[#00336E]"
                : "bg-slate-100 text-[#00336E] border border-transparent hover:bg-slate-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        {subcultureWords.map((item) => (
          <article
            key={item.word}
            className="rounded-[24px] border border-[#00336E] bg-white p-6 flex flex-col justify-between h-[140px] hover:shadow-md transition-all"
          >
            <h3 className="font-display font-bold text-2xl text-[#000000]">
              {item.word}
            </h3>
            <div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#00336E0D] text-[#769ECC] uppercase tracking-wide">
                {item.tag}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
