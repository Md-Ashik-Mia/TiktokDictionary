"use client";

import { Navbar } from "@/components/layout/Navbar";
import { CiSearch } from "react-icons/ci";

export const HeroSection = () => {
  return (
    <section className="min-h-screen hero-gradient pt-4 shadow-lg">
      <Navbar />

      <div className="h-[798px] w-full flex flex-col justify-center items-center">
        <h1 className="font-display font-bold !text-7xl md:text-[3rem]  text-brand-dark text-center">
          Search Any <br className="hidden sm:block" />
          <span>Tiktok Word...</span>
        </h1>

        <p className="mt-4 text-lg md:text-base text-brand-dark/80">
          Type a trend, phrase, slang you saw online.
        </p>

        <div className="my-5 flex items-center justify-center">
          <div className="flex w-full max-w-2xl items-center rounded-full bg-white px-5 py-3 shadow-card">
            <input
              className="flex-1 w-3xl h-10 border-none bg-transparent text-sm outline-none placeholder:text-slate-400"
              placeholder="What does ‘delulu’ mean?"
            />
            <CiSearch className="text-xl text-slate-500" />
          </div>
        </div>
        <p className="mt-3 text-[14px] text-slate-600">
          Press <span className="font-semibold">Enter</span> to search
        </p>
      </div>
    </section>
  );
};
