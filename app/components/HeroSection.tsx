"use client";

import { WordSearch } from "@/components/common/WordSearch";
import { Navbar } from "@/components/layout/Navbar";

export const HeroSection = () => {
  return (
    <section className="min-h-screen hero-gradient pt-24 sm:pt-28 shadow-lg flex flex-col">
      <Navbar />

      <div className="flex-1 w-full flex flex-col justify-center items-center px-6 py-10">
        <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-[3rem] text-brand-dark text-center">
          Search Any <br className="hidden sm:block" />
          <span>Tiktok Word...</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg md:text-base text-brand-dark/80 text-center">
          Type a trend, phrase, slang you saw online.
        </p>

        <div className="my-5 flex items-center justify-center w-full">
          <WordSearch placeholder="Search for a word" />
        </div>
        <p className="mt-3 text-[14px] text-slate-600">
          Press <span className="font-semibold">Enter</span> to search
        </p>
      </div>
    </section>
  );
};
