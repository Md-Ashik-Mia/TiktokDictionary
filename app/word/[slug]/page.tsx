"use client";

import { SubmitCTA } from "@/components/common/SubmitCTA";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { MdInfo } from "react-icons/md";

interface Props {
  params: { slug: string };
}

export default function WordDetailPage({ params }: Props) {
  const word = decodeURIComponent(params.slug);
  const [showModal, setShowModal] = useState(false);
  const [definition, setDefinition] = useState("");

  const mainDefinition =
    "The ability to charm or attract someone using confidence.";
  const example = "Bro pulled her in 2 mins — crazy rizz.";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (definition.trim()) {
      setShowModal(true);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#EFF6FE]">
      <section className="bg-[#EFF6FE] pb-10 pt-4">
        <Navbar />

        <div className="max-w-3xl mx-auto px-6 mt-12">
          <div className="rounded-[32px] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-12 py-10">
            <h1 className="font-display font-bold text-[2.5rem] text-[#00336E] mb-3">
              {word.charAt(0).toUpperCase() + word.slice(1)}
            </h1>
            <p className="text-sm text-[#00336E] mb-2 leading-relaxed">
              {mainDefinition}
            </p>
            <p className="text-sm text-[#00336E]/70 mb-6">
              Example: <span className="italic">&quot;{example}&quot;</span>
            </p>

            <div className="flex items-center gap-6 text-sm text-[#00336E] font-medium">
              <div className="flex items-center gap-2">
                <AiOutlineLike className="text-lg" /> 2,884
              </div>
              <div className="flex items-center gap-2">
                <AiOutlineDislike className="text-lg" /> 112
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-16 space-y-12">
        {/* Alternate definitions */}
        <div>
          <h2 className="font-display font-bold text-2xl text-[#00336E] mb-6">
            Alternate Definitions
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { def: "Game or charisma used to impress someone.", up: "1.3k", down: "90" },
              { def: "Smooth talking mentality.", up: "320", down: "40" },
              { def: "Flirty confidence energy.", up: "143", down: "15" },
            ].map((item, i) => (
              <article
                key={i}
                className="rounded-[20px] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-5 flex flex-col justify-between"
              >
                <p className="text-sm text-[#00336E] mb-4 leading-relaxed">&quot;{item.def}&quot;</p>
                <div className="flex items-center gap-4 text-sm font-medium text-[#00336E]">
                  <div className="flex items-center gap-1.5">
                    <AiOutlineLike className="text-base" /> {item.up}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <AiOutlineDislike className="text-base" /> {item.down}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Your meaning */}
        <div className="space-y-4">
          <h2 className="font-display font-bold text-2xl text-[#00336E]">
            Your meaning of this word:
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="rounded-[16px] border-2 border-[#00336E] bg-white p-4">
              <div className="flex items-start gap-3">
                <MdInfo className="text-[#00336E] text-xl mt-0.5 flex-shrink-0" />
                <textarea
                  value={definition}
                  onChange={(e) => setDefinition(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none resize-none text-[#00336E] placeholder:text-[#00336E]/40 min-h-[60px]"
                  placeholder="Text field"
                />
              </div>
            </div>
            <Button type="submit" className="bg-[#00336E] text-white rounded-full px-8 py-2.5 text-sm font-semibold hover:bg-[#00336E]/90">
              Submit
            </Button>
          </form>
        </div>

        {/* Related words */}
        <div>
          <h2 className="font-display font-bold text-2xl text-[#00336E] mb-6">
            Related Words
          </h2>
          <div className="flex flex-wrap gap-3">
            {["W Riz", "Skibidi", "Ohio Rizz", "Ohio Rizz"].map((r, i) => (
              <button
                key={`${r}-${i}`}
                className="rounded-[12px] bg-[#E8F2FF] px-6 py-3 text-sm text-[#00336E] font-medium hover:bg-[#00336E] hover:text-white transition-all"
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Word origin cards */}
        <div className="space-y-6">
          <h2 className="font-display font-bold text-2xl text-[#00336E]">
            Word Origin / First Use
          </h2>
          {[1, 2].map((i) => (
            <div
              key={i}
              className="rounded-[24px] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-6 grid gap-6 md:grid-cols-2"
            >
              <div className="bg-[#E8F2FF] rounded-[12px] p-4">
                <div className="text-xs text-[#00336E]/70 mb-2">
                  Submitted originally by:
                </div>
                <div className="font-semibold text-[#00336E] text-base">
                  @username
                </div>
              </div>
              <div className="bg-[#E8F2FF] rounded-[12px] p-4">
                <div className="text-xs text-[#00336E]/70 mb-2">
                  Date first submitted:
                </div>
                <div className="font-semibold text-[#00336E] text-base">
                  18 Jul 2025
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-start pt-2">
          <Button variant="outline" className="rounded-full px-8 py-2.5 border-2 border-[#00336E] text-[#00336E] text-sm font-semibold hover:bg-[#00336E] hover:text-white">
            Report
          </Button>
        </div>
      </section>

      <SubmitCTA />
      <Footer />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-[24px] p-8 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-[#00336E] hover:text-[#00336E]/70 text-2xl font-light"
            >
              ×
            </button>
            <h3 className="font-display font-bold text-xl text-[#00336E] mb-3 text-center">
              23 People Already Submitted This Word Today.
            </h3>
            <p className="text-sm text-[#00336E]/70 mb-6 text-center">
              Here are existing definitions — want to continue?
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => setShowModal(false)}
                className="bg-[#00336E] text-white rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-[#00336E]/90 flex items-center gap-2"
              >
                View Definitions →
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setDefinition("");
                }}
                className="border-2 border-[#00336E] text-[#00336E] rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-[#00336E] hover:text-white transition-all flex items-center gap-2"
              >
                Continue Anyway →
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
