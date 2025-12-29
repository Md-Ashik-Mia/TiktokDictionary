"use client";

import { SubmitCTA } from "@/components/common/SubmitCTA";
import { Footer } from "@/components/layout/Footer";
import { api } from "@/lib/https";
import { useEffect, useState } from "react";
import { AudioHashtagSection } from "./components/AudioHashtagSection";
import { ControversialSection } from "./components/ControversialSection";
import { FastestGrowingSection } from "./components/FastestGrowingSection";
import { FilterSection } from "./components/FilterSection";
import { HeroSection } from "./components/HeroSection";
import { MemeSection } from "./components/MemeSection";
import { SubcultureSection } from "./components/SubcultureSection";
import { TrendingSection } from "./components/TrendingSection";

type ApiCategory = {
  id: number;
  name: string;
  total_words?: number;
};

type AllCategoriesResponse = {
  count: number;
  categories: ApiCategory[];
};

type Timeframe = "today" | "week" | "month";

export default function DiscoverPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>("today");
  const [categories, setCategories] = useState<string[]>([]);
  // Default to Slang on initial visit.
  const [category, setCategory] = useState<string>("Slang");

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();

    async function loadCategories() {
      try {
        const res = await api.get<AllCategoriesResponse>(
          "dictionary/allcategories/",
          { signal: controller.signal }
        );
        const raw = res.data?.categories ?? [];

        // Deduplicate by case-insensitive name.
        const seen = new Set<string>();
        const names: string[] = [];
        for (const c of raw) {
          const name = typeof c?.name === "string" ? c.name.trim() : "";
          if (!name) continue;
          const key = name.toLowerCase();
          if (seen.has(key)) continue;
          seen.add(key);
          names.push(name);
        }

        if (!alive) return;
        setCategories(names);
        setCategory((prev) => {
          const prevKey = prev.trim().toLowerCase();
          if (prevKey && names.some((n) => n.toLowerCase() === prevKey)) return prev;

          // Prefer "Slang" if the backend provides it (any casing).
          const slang = names.find((n) => n.trim().toLowerCase() === "slang");
          return slang ?? names[0] ?? "";
        });
      } catch {
        if (!alive) return;
        setCategories([]);
        setCategory("Slang");
      }
    }

    loadCategories();
    return () => {
      alive = false;
      controller.abort();
    };
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <HeroSection />

      <div className="space-y-20 pb-20 mt-12 flex-1">
        <FilterSection
          timeframe={timeframe}
          onTimeframeChange={setTimeframe}
          category={category}
          onCategoryChange={setCategory}
          categories={categories}
        />
        <TrendingSection timeframe={timeframe} category={category} />
        <FastestGrowingSection />
        <ControversialSection />
        <MemeSection />
        <AudioHashtagSection />
        <SubcultureSection />
      </div>

      <SubmitCTA />
      <Footer />
    </main>
  );
}
