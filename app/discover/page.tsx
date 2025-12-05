"use client";

import { SubmitCTA } from "@/components/common/SubmitCTA";
import { Footer } from "@/components/layout/Footer";
import { AudioHashtagSection } from "./components/AudioHashtagSection";
import { ControversialSection } from "./components/ControversialSection";
import { FastestGrowingSection } from "./components/FastestGrowingSection";
import { FilterSection } from "./components/FilterSection";
import { HeroSection } from "./components/HeroSection";
import { MemeSection } from "./components/MemeSection";
import { SubcultureSection } from "./components/SubcultureSection";
import { TrendingSection } from "./components/TrendingSection";

export default function DiscoverPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <HeroSection />

      <div className="space-y-20 pb-20 mt-12 flex-1">
        <FilterSection />
        <TrendingSection />
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
