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

  const trendingData =[
  {
    word: "delulu",
    rank: 1,
    category: "Slang",
    definition: "Short for delusional. Being confidently wrong about something.",
    likes: 912,
    period: "today",
  },
  {
    word: "rizz",
    rank: 2,
    category: "Slang",
    definition: "Charisma or charm, especially in flirting.",
    likes: 1321,
    period: "today",
  },
  {
    word: "gyat",
    rank: 3,
    category: "TikTok Trends",
    definition: "Expression of excitement or appreciation.",
    likes: 987,
    period: "today",
  },
  {
    word: "mid",
    rank: 4,
    category: "Slang",
    definition: "Average or disappointing.",
    likes: 643,
    period: "today",
  },
  {
    word: "sheesh",
    rank: 5,
    category: "TikTok Trends",
    definition: "Used to express hype or disbelief.",
    likes: 1104,
    period: "today",
  },
  {
    word: "sigma",
    rank: 6,
    category: "Memes",
    definition: "Independent person who doesn’t follow social norms.",
    likes: 781,
    period: "week",
  },
  {
    word: "bussin",
    rank: 7,
    category: "Slang",
    definition: "Really good or delicious.",
    likes: 699,
    period: "week",
  },
  {
    word: "no cap",
    rank: 8,
    category: "Slang",
    definition: "No lie, for real.",
    likes: 844,
    period: "week",
  },
  {
    word: "bet",
    rank: 9,
    category: "Slang",
    definition: "Okay, sure, agreed.",
    likes: 612,
    period: "week",
  },
  {
    word: "NPC",
    rank: 10,
    category: "Memes",
    definition: "Someone acting robotic or predictable.",
    likes: 903,
    period: "week",
  },
  {
    word: "main character",
    rank: 11,
    category: "Internet Culture",
    definition: "Living life like you’re the star of the show.",
    likes: 876,
    period: "month",
  },
  {
    word: "soft launch",
    rank: 12,
    category: "Social Media",
    definition: "Subtle announcement of a relationship or project.",
    likes: 542,
    period: "month",
  },
  {
    word: "hard launch",
    rank: 13,
    category: "Social Media",
    definition: "Public and clear announcement.",
    likes: 501,
    period: "month",
  },
  {
    word: "it’s giving",
    rank: 14,
    category: "Slang",
    definition: "Describes the vibe something gives off.",
    likes: 932,
    period: "today",
  },
  {
    word: "lowkey",
    rank: 15,
    category: "Slang",
    definition: "Quietly or secretly.",
    likes: 774,
    period: "week",
  },
  {
    word: "highkey",
    rank: 16,
    category: "Slang",
    definition: "Obviously or openly.",
    likes: 721,
    period: "week",
  },
  {
    word: "slay",
    rank: 17,
    category: "Slang",
    definition: "To do something extremely well.",
    likes: 1198,
    period: "today",
  },
  {
    word: "based",
    rank: 18,
    category: "Internet Culture",
    definition: "Unapologetically true to yourself.",
    likes: 846,
    period: "week",
  },
  {
    word: "ratio",
    rank: 19,
    category: "Social Media",
    definition: "When replies outperform the original post.",
    likes: 688,
    period: "week",
  },
  {
    word: "clout",
    rank: 20,
    category: "Social Media",
    definition: "Influence or popularity online.",
    likes: 754,
    period: "month",
  },
  {
    word: "sus",
    rank: 21,
    category: "Slang",
    definition: "Suspicious or questionable.",
    likes: 965,
    period: "today",
  },
  {
    word: "vibe check",
    rank: 22,
    category: "Memes",
    definition: "Assessing someone’s energy or mood.",
    likes: 803,
    period: "week",
  },
  {
    word: "ghosting",
    rank: 23,
    category: "Dating",
    definition: "Suddenly cutting off communication.",
    likes: 702,
    period: "month",
  },
  {
    word: "simp",
    rank: 24,
    category: "Memes",
    definition: "Doing too much for someone who doesn’t reciprocate.",
    likes: 899,
    period: "week",
  },
  {
    word: "canon event",
    rank: 25,
    category: "Memes",
    definition: "An unavoidable life moment that shapes you.",
    likes: 1043,
    period: "today",
  },
  {
    word: "grindset",
    rank: 26,
    category: "Internet Culture",
    definition: "Extreme focus on self-improvement or success.",
    likes: 634,
    period: "month",
  },
  {
    word: "unhinged",
    rank: 27,
    category: "Slang",
    definition: "Wild or chaotic behavior.",
    likes: 928,
    period: "today",
  },
  {
    word: "ate",
    rank: 28,
    category: "Slang",
    definition: "Did something perfectly.",
    likes: 1087,
    period: "today",
  },
  {
    word: "left on read",
    rank: 29,
    category: "Social Media",
    definition: "Message seen but not replied to.",
    likes: 611,
    period: "month",
  },
  {
    word: "core memory",
    rank: 30,
    category: "Internet Culture",
    definition: "A moment that stays with you forever.",
    likes: 855,
    period: "month",
  },
  {
    word: "POV",
    rank: 31,
    category: "TikTok Trends",
    definition: "Point of view content style.",
    likes: 1334,
    period: "today",
  },
  {
    word: "era",
    rank: 32,
    category: "Social Media",
    definition: "A phase or period in life.",
    likes: 972,
    period: "today",
  },
  {
    word: "cancelled",
    rank: 33,
    category: "Internet Culture",
    definition: "Facing backlash for actions or statements.",
    likes: 589,
    period: "month",
  },
  {
    word: "flex",
    rank: 34,
    category: "Slang",
    definition: "Showing off something.",
    likes: 743,
    period: "week",
  },
  {
    word: "glow up",
    rank: 35,
    category: "Slang",
    definition: "Major improvement in appearance or life.",
    likes: 1169,
    period: "month",
  },
  {
    word: "brainrot",
    rank: 36,
    category: "Memes",
    definition: "Overconsumption of repetitive content.",
    likes: 921,
    period: "today",
  },
  {
    word: "touch grass",
    rank: 37,
    category: "Memes",
    definition: "Go outside and disconnect from the internet.",
    likes: 884,
    period: "week",
  },
  {
    word: "real",
    rank: 38,
    category: "Slang",
    definition: "Relatable or true.",
    likes: 1021,
    period: "today",
  },
  {
    word: "manifest",
    rank: 39,
    category: "Internet Culture",
    definition: "Believing something into existence.",
    likes: 697,
    period: "month",
  },
  {
    word: "gatekeep",
    rank: 40,
    category: "Social Media",
    definition: "Keeping information exclusive.",
    likes: 623,
    period: "month",
  },
  {
    word: "bestie",
    rank: 41,
    category: "Slang",
    definition: "Close friend.",
    likes: 811,
    period: "week",
  },
  {
    word: "iykyk",
    rank: 42,
    category: "Slang",
    definition: "If you know, you know.",
    likes: 702,
    period: "week",
  },
  {
    word: "fr",
    rank: 43,
    category: "Slang",
    definition: "For real.",
    likes: 856,
    period: "today",
  },
  {
    word: "cringe",
    rank: 44,
    category: "Slang",
    definition: "Embarrassing or awkward.",
    likes: 933,
    period: "week",
  },
  {
    word: "vibes",
    rank: 45,
    category: "Internet Culture",
    definition: "General feeling or mood.",
    likes: 781,
    period: "month",
  },
  {
    word: "caught in 4k",
    rank: 46,
    category: "Memes",
    definition: "Caught with undeniable evidence.",
    likes: 674,
    period: "week",
  },
  {
    word: "drip",
    rank: 47,
    category: "Slang",
    definition: "Stylish outfit or appearance.",
    likes: 919,
    period: "today",
  },
  {
    word: "sending",
    rank: 48,
    category: "Slang",
    definition: "Something extremely funny.",
    likes: 566,
    period: "month",
  },
  {
    word: "energy",
    rank: 49,
    category: "Internet Culture",
    definition: "Someone’s overall vibe or presence.",
    likes: 731,
    period: "month",
  },
  {
    word: "say less",
    rank: 50,
    category: "Slang",
    definition: "Understood, no further explanation needed.",
    likes: 892,
    period: "week",
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
      <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredData.map((item) => (
          <article
            key={item.word}
            className="flex flex-col justify-between h-52 w-full rounded-2xl p-5 border border-[#00336E] bg-white shadow-sm hover:shadow-md transition-all"
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
