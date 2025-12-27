"use client";

import { api } from "@/lib/https";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";

type TrendingTab = "today" | "week" | "month";

type TrendingCard = {
  word: string;
  rank: number;
  category: string;
  definition: string;
  likes: number;
  period: TrendingTab;
};

type TrendingApiItem = {
  total_likes?: number;
  definitions?: Record<string, number>;
};

type TrendingApiResponse = Record<string, TrendingApiItem>;

function pickTopDefinition(definitions?: Record<string, number>) {
  const entries = Object.entries(definitions ?? {});
  if (entries.length === 0) return "";
  entries.sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0));
  return entries[0]?.[0] ?? "";
}

const TRENDING_FALLBACK_DATA: TrendingCard[] =[
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
    definition: "Point of view, used to frame a scenario.",
    likes: 1032,
    period: "today",
  },
  {
    word: "drip",
    rank: 32,
    category: "Fashion",
    definition: "Stylish outfit or appearance.",
    likes: 822,
    period: "week",
  },
  {
    word: "cap",
    rank: 33,
    category: "Slang",
    definition: "A lie or falsehood.",
    likes: 690,
    period: "week",
  },
  {
    word: "glow up",
    rank: 34,
    category: "Internet Culture",
    definition: "A transformation for the better.",
    likes: 905,
    period: "month",
  },
  {
    word: "red flag",
    rank: 35,
    category: "Dating",
    definition: "A warning sign in behavior.",
    likes: 864,
    period: "month",
  },
  {
    word: "green flag",
    rank: 36,
    category: "Dating",
    definition: "A positive sign in behavior.",
    likes: 798,
    period: "month",
  },
  {
    word: "periodt",
    rank: 37,
    category: "Slang",
    definition: "Emphasis that a statement is final.",
    likes: 979,
    period: "today",
  },
  {
    word: "bestie",
    rank: 38,
    category: "Slang",
    definition: "A close friend.",
    likes: 711,
    period: "week",
  },
  {
    word: "tea",
    rank: 39,
    category: "Slang",
    definition: "Gossip or juicy information.",
    likes: 1003,
    period: "today",
  },
  {
    word: "stan",
    rank: 40,
    category: "Internet Culture",
    definition: "An overzealous fan.",
    likes: 752,
    period: "month",
  },
  {
    word: "FYP",
    rank: 41,
    category: "TikTok",
    definition: "For You Page.",
    likes: 1122,
    period: "today",
  },
  {
    word: "mood",
    rank: 42,
    category: "Slang",
    definition: "Relatable feeling.",
    likes: 677,
    period: "week",
  },
  {
    word: "hits different",
    rank: 43,
    category: "Slang",
    definition: "Feels unique or more impactful.",
    likes: 890,
    period: "month",
  },
  {
    word: "cheugy",
    rank: 44,
    category: "Slang",
    definition: "Out of date or trying too hard.",
    likes: 540,
    period: "month",
  },
  {
    word: "shook",
    rank: 45,
    category: "Slang",
    definition: "Surprised or shocked.",
    likes: 966,
    period: "today",
  },
  {
    word: "flex",
    rank: 46,
    category: "Slang",
    definition: "To show off.",
    likes: 705,
    period: "week",
  },
  {
    word: "GOAT",
    rank: 47,
    category: "Internet Culture",
    definition: "Greatest of all time.",
    likes: 1204,
    period: "today",
  },
  {
    word: "W",
    rank: 48,
    category: "Slang",
    definition: "A win or success.",
    likes: 1135,
    period: "today",
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

export const TrendingSection = () => {
  const [activeTab, setActiveTab] = useState<TrendingTab>("today");
  const [remoteByTab, setRemoteByTab] = useState<
    Partial<Record<TrendingTab, TrendingCard[]>>
  >({});

  const tabs = [
    { key: "today" as const, label: "Today" },
    { key: "week" as const, label: "This Week" },
    { key: "month" as const, label: "This Month" },
  ];

  const fallbackByTab = useMemo(() => {
    return activeTab === "month"
      ? TRENDING_FALLBACK_DATA
      : TRENDING_FALLBACK_DATA.filter((item) => item.period === activeTab);
  }, [activeTab]);

  useEffect(() => {
    const day = activeTab === "today" ? "1" : activeTab === "week" ? "7" : "30";
    const controller = new AbortController();

    async function load() {
      try {
        const res = await api.post<TrendingApiResponse>(
          "dictionary/trendingwords/",
          { day },
          { signal: controller.signal }
        );

        const entries = Object.entries(res.data ?? {});
        const cards = entries
          .map(([word, data]) => {
            const likes = Number(data?.total_likes ?? 0);
            const definition = pickTopDefinition(data?.definitions);
            return {
              word,
              rank: 0,
              category: "Trending",
              definition,
              likes,
              period: activeTab,
            } satisfies TrendingCard;
          })
          .sort((a, b) => b.likes - a.likes)
          .map((item, idx) => ({ ...item, rank: idx + 1 }));

        setRemoteByTab((prev) => ({ ...prev, [activeTab]: cards }));
      } catch {
        if (controller.signal.aborted) return;
        setRemoteByTab((prev) => ({ ...prev, [activeTab]: prev[activeTab] ?? [] }));
      }
    }

    load();
    return () => controller.abort();
  }, [activeTab]);

  const filteredData =
    (remoteByTab[activeTab] && remoteByTab[activeTab]!.length > 0
      ? remoteByTab[activeTab]!
      : fallbackByTab) ?? [];

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
