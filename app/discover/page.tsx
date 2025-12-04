"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

type Timeframe = "today" | "week" | "month";

const trendingWords = [
  {
    word: "Rizz",
    badge: "Trending Today",
    stat: "92% agree",
    description: "Confidence-based attraction skill.",
  },
  {
    word: "Delulu",
    badge: "Trending Today",
    stat: "88% agree",
    description: "Being intentionally delusional.",
  },
  {
    word: "NPC Walk",
    badge: "Viral Audio",
    stat: "81% agree",
    description: "Walking like a game NPC.",
  },
];

const fastestGrowing = [
  { word: "Gyatt’d", change: "+460%", tag: "Slang" },
  { word: "Corecore", change: "+220%", tag: "Aesthetic" },
  { word: "Rage Baiting", change: "+190%", tag: "Creator Culture" },
];

const controversial = [
  {
    word: "NPC Streamer",
    reason: "Highly debated meaning",
    up: "51%",
    down: "49%",
  },
  {
    word: "Quiet Luxury",
    reason: "Conflicting interpretations",
    up: "54%",
    down: "46%",
  },
];

const memeWords = [
  { word: "It’s Corn!", tag: "Meme Audio" },
  { word: "She ate & left no crumbs", tag: "Reaction" },
  { word: "Bombastic Side Eye", tag: "Audio Trend" },
];

const audioHashtags = [
  {
    text: "#delulu — 88k uses this week\n“Bombastic side eye” audio — +540%",
  },
  {
    text: "#girldinner — trending\n#NPC — resurging",
  },
];

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

export default function DiscoverPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>("today");
  const [filter, setFilter] = useState("Slang");
  const [subcultureFilter, setSubcultureFilter] = useState("Gen Z");

  return (
    <main className="min-h-screen flex flex-col bg-[#f4f6fb]">
      {/* HERO / CONTROLS */}
      <section className="hero-gradient pb-12 pt-4 rounded-b-[40px] shadow-lg">
        <Navbar />

        <div className="max-w-6xl mx-auto px-6 mt-10 mb-4">
          <h1 className="font-display text-3xl md:text-[3rem] text-brand-dark text-center mb-3">
            Discover New Words
          </h1>
          <p className="text-sm text-brand-dark/80 text-center max-w-xl mx-auto mb-8">
            Explore the latest slang, trends, and creator-made language—updated
            daily.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-600">Sort by:</label>
              <div className="rounded-2xl bg-white shadow-card border border-slate-200 px-4 py-2 flex items-center justify-between">
                <select
                  value={timeframe}
                  onChange={(e) =>
                    setTimeframe(e.target.value as Timeframe)
                  }
                  className="bg-transparent text-sm outline-none flex-1 cursor-pointer"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
                <span className="text-xs text-slate-400">▼</span>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-600">Filter by:</label>
              <div className="rounded-2xl bg-white shadow-card border border-slate-200 px-4 py-2 flex items-center justify-between">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-transparent text-sm outline-none flex-1 cursor-pointer"
                >
                  <option>Slang</option>
                  <option>TikTok Trends</option>
                  <option>Memes</option>
                  <option>Audio</option>
                  <option>Acronyms</option>
                </select>
                <span className="text-xs text-slate-400">▼</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Trending Words */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl md:text-[2.4rem] text-brand-dark">
              Trending Words
            </h2>
            <div className="hidden sm:flex items-center gap-2">
              <button className="w-8 h-8 rounded-full border border-slate-300 bg-white text-xs">
                ←
              </button>
              <button className="w-8 h-8 rounded-full border border-slate-300 bg-white text-xs">
                →
              </button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {trendingWords.map((item) => (
              <article
                key={item.word}
                className="rounded-2xl border border-slate-200 bg-white shadow-card px-5 py-4 text-sm flex flex-col gap-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-brand-dark">
                    {item.word}
                  </h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-brand-dark/80">
                    {item.stat}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="px-2 py-0.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Fastest Growing */}
        <div className="bg-[#e4f0ff] -mx-6 px-6 py-10 rounded-[32px]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl md:text-[2.4rem] text-brand-dark">
                Fastest Growing Words
              </h2>
              <div className="hidden sm:flex items-center gap-2">
                <button className="w-8 h-8 rounded-full border border-slate-300 bg-white text-xs">
                  ←
                </button>
                <button className="w-8 h-8 rounded-full border border-slate-300 bg-white text-xs">
                  →
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {fastestGrowing.map((item) => (
                <article
                  key={item.word}
                  className="rounded-2xl border border-slate-200 bg-white shadow-card px-5 py-4 text-sm flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-brand-dark">
                      {item.word}
                    </h3>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-green-50 border border-green-100 text-emerald-600">
                      {item.change}
                    </span>
                  </div>
                  <span className="inline-flex mt-1 text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {item.tag}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Most Controversial */}
        <div>
          <h2 className="font-display text-2xl md:text-[2.4rem] text-brand-dark mb-4">
            Most Controversial
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {controversial.map((item) => (
              <article
                key={item.word}
                className="rounded-2xl border border-slate-200 bg-white shadow-card px-5 py-4 text-sm flex flex-col gap-2"
              >
                <h3 className="font-semibold text-brand-dark">
                  {item.word}
                </h3>
                <p className="text-xs text-slate-600">
                  Reason: {item.reason}
                </p>
                <div className="mt-2 text-[11px] text-slate-500 flex gap-4">
                  <span>👍 {item.up}</span>
                  <span>👎 {item.down}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Meme Words of the Week */}
        <div className="bg-[#e4f0ff] -mx-6 px-6 py-10 rounded-[32px]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl md:text-[2.4rem] text-brand-dark">
                Meme Words Of The Week
              </h2>
              <div className="hidden sm:flex items-center gap-2">
                <button className="w-8 h-8 rounded-full border border-slate-300 bg-white text-xs">
                  ←
                </button>
                <button className="w-8 h-8 rounded-full border border-slate-300 bg-white text-xs">
                  →
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {memeWords.map((item) => (
                <article
                  key={item.word}
                  className="rounded-2xl border border-slate-200 bg-white shadow-card px-5 py-4 text-sm flex flex-col gap-2"
                >
                  <h3 className="font-semibold text-brand-dark">
                    {item.word}
                  </h3>
                  <span className="inline-flex mt-1 text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {item.tag}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Audio / Hashtag Trends */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl md:text-[2.4rem] text-brand-dark">
              Audio / Hashtag Trends
            </h2>
            <Button variant="outline" size="sm">
              View More →
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {audioHashtags.map((item, i) => (
              <article
                key={i}
                className="rounded-2xl border border-slate-200 bg-white shadow-card px-5 py-4 text-sm whitespace-pre-line"
              >
                {item.text}
              </article>
            ))}
          </div>
        </div>

        {/* Subculture Words */}
        <div>
          <h2 className="font-display text-2xl md:text-[2.4rem] text-brand-dark mb-4">
            Subculture Words
          </h2>

          <div className="flex flex-wrap gap-2 mb-5 text-xs">
            {subcultureFilters.map((item) => (
              <button
                key={item}
                onClick={() => setSubcultureFilter(item)}
                className={`px-4 py-1.5 rounded-full border text-xs interactive ${
                  subcultureFilter === item
                    ? "bg-brand-dark text-white border-brand-dark"
                    : "bg-white text-brand-dark border-slate-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {subcultureWords.map((item) => (
              <article
                key={item.word}
                className="rounded-2xl border border-slate-200 bg-white shadow-card px-4 py-4 text-sm flex flex-col gap-2"
              >
                <h3 className="font-semibold text-brand-dark">
                  {item.word}
                </h3>
                <span className="inline-flex text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {item.tag}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Submit CTA + footer */}
      <section className="bg-brand-dark text-white py-16 mt-6">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="font-display text-3xl md:text-[2.4rem] mb-3">
            Submit a Word
          </h2>
          <p className="text-sm text-blue-100 mb-6">
            Saw a new TikTok word? Add it before it blows up.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="bg-white text-brand-dark"
          >
            Submit a New Word
          </Button>
          <p className="mt-3 text-[11px] text-blue-100">
            It only takes a minute to add a definition.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
