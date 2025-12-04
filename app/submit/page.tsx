"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

type ModalState = "none" | "softDup" | "hardDup" | "success";

const SOFT_DUP_WORDS = ["delulu"];
const HARD_DUP_WORDS = ["rizz"];

export default function SubmitPage() {
  const [word, setWord] = useState("");
  const [modal, setModal] = useState<ModalState>("none");

  const resetForm = () => {
    setWord("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = word.trim().toLowerCase();
    if (!value) return;

    if (HARD_DUP_WORDS.includes(value)) {
      setModal("hardDup");
    } else if (SOFT_DUP_WORDS.includes(value)) {
      setModal("softDup");
    } else {
      setModal("success");
      resetForm();
    }
  };

  const handleContinueAnyway = () => {
    setModal("success");
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#f4f6fb]">
      <section className="hero-gradient pb-14 pt-4 rounded-b-[40px] shadow-lg">
        <Navbar />

        <div className="max-w-5xl mx-auto px-6 mt-10">
          <h1 className="font-display text-3xl md:text-[2.8rem] text-brand-dark mb-4">
            Submit a New Word
          </h1>
          <p className="text-sm text-brand-dark/80 mb-8 max-w-xl">
            Got a new slang, trend, or phrase? Add it to the dictionary.
          </p>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white shadow-card p-6 md:p-8 grid gap-5 md:grid-cols-2"
          >
            {/* Word */}
            <div>
              <label className="text-xs font-medium text-slate-700">
                Word
              </label>
              <input
                value={word}
                onChange={(e) => setWord(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-mid"
                placeholder="Enter the word or phrase (e.g. Delulu, NPC, ‘Rizz God’)"
              />
            </div>

            {/* Definition */}
            <div>
              <label className="text-xs font-medium text-slate-700">
                Definition
              </label>
              <textarea
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-mid min-h-[80px]"
                placeholder="Write the clearest, simplest definition."
              />
            </div>

            {/* Example sentence */}
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-slate-700">
                Example Sentence
              </label>
              <textarea
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-mid min-h-[70px]"
                placeholder="Use the word in a real sentence..."
              />
            </div>

            {/* Category + Where did you see it */}
            <div>
              <label className="text-xs font-medium text-slate-700">
                Category
              </label>
              <select className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-mid bg-white">
                <option>Slang</option>
                <option>TikTok Trends</option>
                <option>Memes</option>
                <option>Audio Sounds</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700">
                Where Did You See This Word? (Optional)
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-mid"
                placeholder="Paste TikTok link, username, or context."
              />
            </div>

            {/* NSFW toggle + alternate spellings */}
            <div>
              <label className="text-xs font-medium text-slate-700 flex items-center justify-between">
                NSFW
                <span className="text-[11px] text-slate-500">
                  Does this include mature content?
                </span>
              </label>
              <div className="mt-2 flex items-center gap-4 text-sm">
                <button
                  type="button"
                  className="px-4 py-1.5 rounded-full border border-slate-200 bg-slate-100 text-slate-600 text-xs"
                >
                  No
                </button>
                <button
                  type="button"
                  className="px-4 py-1.5 rounded-full border border-slate-200 bg-white text-slate-600 text-xs"
                >
                  Yes
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700">
                Alternate spellings
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-mid"
                placeholder="Add variations (e.g. ‘rizz’, ‘wrizz’, ‘rizzed’)"
              />
            </div>

            {/* Hashtags */}
            <div className="md:col-span-2">
              <label className="text-xs font-medium text-slate-700">
                Hashtags (optional)
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-mid"
                placeholder="#TikTokSlang #SideEye #MainCharacter"
              />
            </div>

            <div className="md:col-span-2 flex flex-col gap-2 pt-2">
              <Button type="submit" size="lg" className="self-start">
                Add Word
              </Button>
              <p className="text-[11px] text-slate-500">
                By submitting, you agree your entry may be reviewed or edited.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* bottom CTA + footer */}
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

      {/* MODALS */}
      {modal !== "none" && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          {/* soft duplicate */}
          {modal === "softDup" && (
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg text-brand-dark">
                  Looks like this word already exists.
                </h3>
                <button
                  className="text-slate-400 text-xl leading-none"
                  onClick={() => setModal("none")}
                >
                  ×
                </button>
              </div>

              <p className="text-xs text-slate-600">
                Want to add a new definition instead, or continue anyway?
              </p>

              <div className="flex flex-col gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setModal("hardDup")}
                >
                  View Existing Word
                </Button>
                <Button onClick={() => setModal("success")}>
                  Add New Definition
                </Button>
                <Button variant="ghost" onClick={handleContinueAnyway}>
                  Continue Anyway
                </Button>
              </div>
            </div>
          )}

          {/* hard duplicate */}
          {modal === "hardDup" && (
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg text-brand-dark flex items-center gap-2">
                  <span>⚠️</span> Duplicate Detected
                </h3>
                <button
                  className="text-slate-400 text-xl leading-none"
                  onClick={() => setModal("none")}
                >
                  ×
                </button>
              </div>

              <p className="text-xs text-slate-600">
                The ability to attract someone using confidence or smooth
                talking.
              </p>
              <p className="text-xs text-slate-500 italic">
                Example: Bro has insane rizz.
              </p>

              <div className="flex gap-3 mt-4 flex-col sm:flex-row">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setModal("none")}
                >
                  View Word
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => setModal("success")}
                >
                  Add New Definition
                </Button>
              </div>
            </div>
          )}

          {/* success */}
          {modal === "success" && (
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 space-y-4 text-center">
              <div className="flex justify-end">
                <button
                  className="text-slate-400 text-xl leading-none"
                  onClick={() => setModal("none")}
                >
                  ×
                </button>
              </div>

              <div className="-mt-6 mb-1 text-3xl">🎉</div>
              <h3 className="font-semibold text-lg text-brand-dark">
                Word Submitted!
              </h3>
              <p className="text-xs text-slate-600">
                Your definition will appear once reviewed. Thanks for
                contributing!
              </p>

              <div className="mt-4 flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    resetForm();
                    setModal("none");
                  }}
                >
                  Add Another Word →
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
