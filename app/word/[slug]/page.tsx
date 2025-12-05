
"use client";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import React, { useMemo, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { MdInfo } from "react-icons/md";
import {
  FiChevronRight,
  FiExternalLink,
  FiFlag,
  FiMessageSquare,
  FiThumbsUp,
  FiX,
} from "react-icons/fi";
import { SubmitCTA } from "@/components/common/SubmitCTA";

type OriginItem = { by: string; date: string };
type AltDef = { text: string; likes: number; comments: number };

const titleCase = (s: string) =>
  s
    .split(/[-_]/)
    .map((p) => (p ? p.charAt(0).toUpperCase() + p.slice(1) : ""))
    .join(" ");

export default function WordDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const word = useMemo(
    () => decodeURIComponent(params.slug || "word").replace(/-/g, " "),
    [params.slug]
  );
  const title = useMemo(() => titleCase(word), [word]);

  const [meaning, setMeaning] = useState("");
  const [showDupModal, setShowDupModal] = useState(false);

  const altDefs: AltDef[] = [
    {
      text: "Game or charisma used to impress someone.",
      likes: 1120,
      comments: 90,
    },
    { text: "Smooth talking mentality.", likes: 320, comments: 40 },
    { text: "Flirty confidence energy.", likes: 143, comments: 15 },
  ];

  const origins: OriginItem[] = [
    { by: "@username", date: "18 Jul 2025" },
    { by: "@username", date: "18 Jul 2025" },
  ];

  const related = ["W Rizz", "Skibidi", "Ohio Rizz", "Ohio Rizz"];

  const handleMeaningSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meaning.trim()) return;
    setShowDupModal(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-white text-[#0f2d5c]">
      {/* Hero background split */}
      <div className="relative">
        <div className="bg-[#e9f2ff] pb-80 pt-6">
          <Navbar />
        </div>
        <div
          className="absolute inset-x-0 top-[90%] bottom-0 bg-white"
          aria-hidden
        />
        <section className="relative max-w-6xl mx-auto px-6 -mt-24 ">
          <div className="bg-white rounded-3xl shadow-md shadow-[#00000026]  p-6 md:p-8">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h1 className="font-display !text-7xl md:text-5xl font-extrabold tracking-tight">
                {/* {title} */}Rizz
              </h1>
            </div>

            <p className="mt-3 text-lg text-[#00336E]">
              The ability to charm or attract someone using confidence.
            </p>
            <p className="mt-2 text-lg text-[#00336E]">
              Example: “Bro pulled her in 2 mins — crazy {title.toLowerCase()}.”
            </p>

            <div className="mt-4 flex items-center gap-5 text-[#000000]">
              <span className="inline-flex font-bold items-center gap-1 text-sm">
                <AiOutlineLike /> 9,284
              </span>
              <span className="inline-flex font-bold items-center gap-1 text-sm">
                <AiOutlineDislike /> 112
              </span>
            </div>
          </div>
        </section>
      </div>
      <section className="max-w-6xl mx-auto px-6 py-10 space-y-10 ">
        {/* Alternate Definitions */}
        <div className="bg-white border border-x-0 border-b-0  border-t-gray-50 rounded-3xl shadow-[#00000026] shadow-xl p-6 md:p-8 ">
          <h2 className="font-display !text-4xl md:text-2xl font-bold mb-4">
            Alternate Definitions
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {altDefs.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl  bg-[#00336E0D] py-8 pl-2 flex flex-col justify-between"
              >
                <p className="text-lg text-[#123a7a] leading-relaxed">
                  {`"` + item.text + `"`}
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-[#0f2d5c]">
                  <span className="inline-flex text-sm font-bold items-center gap-1">
                    <AiOutlineLike /> {item.likes}
                  </span>
                  <span className="inline-flex text-sm font-bold items-center gap-1">
                    <AiOutlineDislike /> {item.comments}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleMeaningSubmit}
            className="bg-white mt-8  rounded-3xl   space-y-4"
          >
            <h2 className="!text-4xl md:text-2xl font-bold">
              Your meaning of this word:
            </h2>
            <div className="border border-[#00336E] flex items-center px-3 py-5 rounded-md bg-[#fdfefe] focus-within:ring-2 focus-within:ring-[#0f2d5c]">
              <span className="text-xs text-[#123a7a]">
                <MdInfo className="text-[#0f2d5c] text-lg mt-0.5 " />
              </span>
              <input
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                className="flex-1 bg-transparent outline-none px-3 text-sm text-[#0f2d5c]"
                placeholder="Text field"
              />
            </div>
            <button
              type="submit"
              className="h-10 px-5 rounded-full bg-[#0f2d5c] text-white text-sm font-semibold hover:bg-[#0d264d] transition inline-flex items-center justify-center"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Your meaning form */}

        {/* Related Words */}
        <div className="bg-white border border-x-0 border-b-0  border-t-gray-50 rounded-3xl shadow-[#00000026] shadow-xl  p-6 md:p-8 ">
          <h2 className="font-display !text-4xl md:text-2xl font-bold mb-4">Related Words</h2>
          <div className="flex justify-around gap-6 ">
            {related.map((r, idx) => (
              <span
                key={idx}
                className="px-4 py-5 w-1/4  rounded-xl bg-[#f3f7ff]  text-[18px] text-[#0f2d5c]"
              >
                {r}
              </span>
            ))}
          </div>
        </div>

        {/* Word Origin / First Use */}
        {origins.map((o, idx) => (
          <div
            key={idx}
            className="bg-white border border-x-0 border-b-0  border-t-gray-50 rounded-3xl shadow-[#00000026] shadow-xl p-6 md:p-8"
          >
            <h2 className="font-display !text-4xl md:text-2xl font-bold mb-4">
              Word Origin / First Use
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#00336E0D]  rounded-xl p-4 text-sm text-[#0f2d5c]">
                <div className="text-[18px] text-[#00336E] mb-1">
                  Submitted originally by:
                </div>
                <div className="font-bold text-2xl text-[#00336E]">{o.by}</div>
              </div>
              <div className="bg-[#00336E0D]  rounded-xl p-4 text-sm text-[#0f2d5c]">
                <div className="text-[18px] text-[#00336E] mb-1">
                  Date first submitted:
                </div>
                <div className="font-bold text-2xl text-[#00336E]">{o.date}</div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-start">
          <button className="px-15 py-2 rounded-full border border-[#0f2d5c] text-[#0f2d5c] text-lg font-semibold bg-white hover:bg-[#0f2d5c] hover:text-white transition inline-flex items-center gap-2">
            Report
          </button>
        </div>
      </section>
      <SubmitCTA />
      <Footer />

      {showDupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-[#dfe9ff] max-w-md w-full p-6 relative text-center">
            <button
              className="absolute top-3 right-3 text-[#123a7a] hover:text-black"
              onClick={() => setShowDupModal(false)}
              aria-label="Close"
            >
              <FiX />
            </button>
            <h3 className="text-lg md:text-xl font-bold text-[#0f2d5c]">
              23 People Already Submitted This Word Today.
            </h3>
            <p className="mt-2 text-sm text-[#4a628a]">
              Here are existing definitions — want to continue?
            </p>
            <div className="mt-4 flex gap-3 flex-wrap justify-center">
              <button className="px-4 py-2 rounded-full border border-[#0f2d5c] text-[#0f2d5c] text-sm font-semibold inline-flex items-center gap-2 hover:bg-[#f3f7ff] transition">
                View Definitions <FiChevronRight />
              </button>
              <button
                onClick={() => setShowDupModal(false)}
                className="px-4 py-2 rounded-full bg-[#0f2d5c] text-white text-sm font-semibold inline-flex items-center gap-2 hover:bg-[#0d264d] transition"
              >
                Continue Anyway <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
