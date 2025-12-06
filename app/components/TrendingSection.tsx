"use client";

import { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";

export const TrendingSection = () => {
  const [activeTab, setActiveTab] = useState<"today" | "week" | "month">(
    "today"
  );

  const tabs = [
    { key: "today" as const, label: "Today" },
    { key: "week" as const, label: "This Week" },
    { key: "month" as const, label: "This Month" },
  ];

  const trendingData = [
    {
      word: "delulu",
      rank: 1,
      category: "Slang",
      definition:
        "Short for delusional. Being confidently wrong about something, especially in dating.",
      likes: 847,
      period: "today",
    },
    {
      word: "rizz",
      rank: 2,
      category: "Slang",
      definition:
        "Charisma or charm, especially when flirting. Having game.",
      likes: 1203,
      period: "today",
    },
    {
      word: "gyat",
      rank: 3,
      category: "TikTok Trends",
      definition:
        "Expression of excitement or appreciation, often used when seeing something attractive.",
      likes: 956,
      period: "today",
    },
    {
      word: "sigma",
      rank: 4,
      category: "Memes",
      definition:
        "Independent, self-reliant person who doesn't follow the crowd.",
      likes: 742,
      period: "week",
    },
    {
      word: "bussin",
      rank: 5,
      category: "Slang",
      definition:
        "Really good, amazing, excellent. Usually used for food.",
      likes: 689,
      period: "week",
    },
    {
      word: "no cap",
      rank: 6,
      category: "Slang",
      definition:
        "No lie, for real, seriously. Used to emphasize truth.",
      likes: 823,
      period: "month",
    },
  ];

  const filteredData =
    activeTab === "month"
      ? trendingData
      : trendingData.filter((item) => item.period === activeTab);

  return (
    <div className="w-full">
      {/* Heading + description (LEFT aligned) */}
      <h2 className="font-display font-bold lg:text-6xl md:text-[3.2rem] leading-none text-[#00336E]">
        Trending Right Now
      </h2>

      <p className="mt-2 font-sans text-lg text-[#00336E]">
        Choose the correct meaning and discover new words instantly.
      </p>

      {/* Tabs (LEFT aligned) */}
      <div className="mt-8 flex gap-3">
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
      <div className="mt-10 grid gap-6 md:grid-cols-3 place-items-start">
        {filteredData.map((item) => (
          <article
            key={item.word}
            className=" h-44 rounded-2xl p-2 border border-[#00336E] bg-white  shadow-sm hover:shadow-md transition-all"
          >
            {/* word + rank */}
            <header className=" flex items-start justify-between mb-1.5">
              <h3 className="font-display lg:text-2xl font-semibold text-[#000000] capitalize">
                {item.word}
              </h3>
              <span className="text-2xl font-display font-bold text-[#000000]">
                #{item.rank}
              </span>
            </header>

            {/* category pill */}
            <span className="inline-block mb-1.5 rounded-full  px-2 py-0.5  bg-slate-100  text-[12px] font-medium text-[#769ECC]">
              {item.category}
            </span>

            {/* definition */}
            <p className=" text-[16px]  text-[#00336E]">
              {item.definition}
            </p>

            {/* likes */}
            <footer className=" font-bold flex items-center gap-1 text-[#000000]">
              <AiOutlineLike className="text-[16px] font-bold " />
              <span className="text-[16px] font-bold">
                {item.likes.toLocaleString()} agreed
              </span>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
};
