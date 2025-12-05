// "use client";

// import React, { useState } from "react";
// import { Navbar } from "@/components/layout/Navbar";
// import { Footer } from "@/components/layout/Footer";
// import { Button } from "@/components/ui/Button";
// import { FiChevronDown } from "react-icons/fi";

// type ModalState = "none" | "softDup" | "hardDup" | "success";

// const SOFT_DUP_WORDS = ["delulu"];
// const HARD_DUP_WORDS = ["rizz"];

// export default function SubmitPage() {
//   const [word, setWord] = useState("");
//   const [modal, setModal] = useState<ModalState>("none");
//   const [isNsfw, setIsNsfw] = useState(false);

//   const resetForm = () => setWord("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const value = word.trim().toLowerCase();
//     if (!value) return;

//     if (HARD_DUP_WORDS.includes(value)) {
//       setModal("hardDup");
//     } else if (SOFT_DUP_WORDS.includes(value)) {
//       setModal("softDup");
//     } else {
//       setModal("success");
//       resetForm();
//     }
//   };

//   const handleContinueAnyway = () => {
//     setModal("success");
//   };

//   return (
//     <main className="flex flex-col bg-[#f4f6fb]">
//       {/* HERO + BG UNDER NAVBAR */}
//       <section
//         className="pb-20 pt-4 rounded-b-[40px] shadow-lg"
//         style={{
//           background:
//             "linear-gradient(to bottom, #dceaff 0%, #eaf1ff 50%, #ffffff 50%)",
//         }}
//       >
//         <Navbar />

//         <div className="max-w-5xl mx-auto px-6 mt-50">
//           {/* Centered title like Figma */}
//           <div className="text-center mb-10">
//             <h1 className="font-display font-bold text-[2.6rem] md:text-[3rem] text-[#00336E]">
//               Submit a New Word
//             </h1>
//             <p className="mt-2 text-sm text-[#00336E]">
//               Got a new slang, trend, or phrase? Add it to the dictionary.
//             </p>
//           </div>

//           {/* MAIN CARD */}
//           <form
//             onSubmit={handleSubmit}
//             className="
//               bg-white rounded-[40px] border border-[#d2e1ff]
//               shadow-md p-6 md:p-8
//               grid gap-6 md:grid-cols-2
//             "
//           >
//             {/* WORD */}
//             <div className="relative">
//               <div className="absolute -top-3 left-6 bg-white px-2 text-[11px] font-semibold text-[#00336E]">
//                 Word
//               </div>
//               <div className="border border-[#00336E] rounded-2xl px-4 py-3 bg-white">
//                 <input
//                   value={word}
//                   onChange={(e) => setWord(e.target.value)}
//                   className="w-full bg-transparent text-sm outline-none placeholder:text-[#9FB0D0]"
//                   placeholder="Enter the word or phrase (e.g. ‘Delulu’, ‘NPC’, ‘Rizz God’)"
//                 />
//               </div>
//             </div>

//             {/* DEFINITION */}
//             <div className="relative">
//               <div className="absolute -top-3 left-6 bg-white px-2 text-[11px] font-semibold text-[#00336E]">
//                 Definition{" "}
//                 <span className="font-normal text-[#5874a8]">
//                   (Helps us verify and track trend origin)
//                 </span>
//               </div>
//               <div className="border border-[#00336E] rounded-2xl px-4 py-3 bg-white">
//                 <textarea
//                   className="w-full bg-transparent text-sm outline-none placeholder:text-[#9FB0D0] min-h-[70px] resize-none"
//                   placeholder="Write the clearest, simplest definition. Avoid long explanations."
//                 />
//               </div>
//             </div>

//             {/* EXAMPLE SENTENCE */}
//             <div className="relative md:col-span-2">
//               <div className="absolute -top-3 left-6 bg-white px-2 text-[11px] font-semibold text-[#00336E]">
//                 Example Sentence
//               </div>
//               <div className="border border-[#00336E] rounded-2xl px-4 py-3 bg-white">
//                 <textarea
//                   className="w-full bg-transparent text-sm outline-none placeholder:text-[#9FB0D0] min-h-[70px] resize-none"
//                   placeholder="Use the word in a real sentence (e.g. “He’s got insane rizz.”)"
//                 />
//               </div>
//             </div>

//             {/* CATEGORY */}
//             <div className="relative">
//               <div className="absolute -top-3 left-6 bg-white px-2 text-[11px] font-semibold text-[#00336E]">
//                 Category
//               </div>
//               <div className="border border-[#00336E] rounded-2xl px-4 py-3 bg-white relative">
//                 <select
//                   className="w-full bg-transparent text-sm outline-none appearance-none pr-8"
//                   defaultValue="Slang"
//                 >
//                   <option>Slang</option>
//                   <option>TikTok Trends</option>
//                   <option>Memes</option>
//                   <option>Audio Sounds</option>
//                 </select>
//                 {/* dropdown icon like Figma */}
//                 <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00336E]" />
//               </div>
//             </div>

//             {/* WHERE DID YOU SEE THIS WORD */}
//             <div className="relative">
//               <div className="absolute -top-3 left-6 bg-white px-2 text-[11px] font-semibold text-[#00336E]">
//                 Where Did You See This Word?{" "}
//                 <span className="font-normal text-[#5874a8]">(Optional)</span>
//               </div>
//               <div className="border border-[#00336E] rounded-2xl px-4 py-3 bg-white">
//                 <input
//                   className="w-full bg-transparent text-sm outline-none placeholder:text-[#9FB0D0]"
//                   placeholder="Paste TikTok link (optional) (Helps us verify and track trend origin)"
//                 />
//               </div>
//             </div>

//             {/* NSFW / CATEGORY TOGGLE ROW */}
//             <div className="relative">
//               <div className="absolute -top-3 left-6 bg-white px-2 text-[11px] font-semibold text-[#00336E]">
//                 Category
//               </div>
//               <div className="border border-[#00336E] rounded-2xl px-4 py-3 bg-white flex items-center justify-between">
//                 <span className="text-sm text-[#00336E]">NSFW</span>
//                 <div className="flex items-center gap-3 text-[12px] text-[#00336E]">
//                   <span className={!isNsfw ? "font-semibold" : "opacity-70"}>
//                     No
//                   </span>
//                   <button
//                     type="button"
//                     onClick={() => setIsNsfw((v) => !v)}
//                     className={`relative w-12 h-6 rounded-full transition-colors ${
//                       isNsfw ? "bg-[#00336E]" : "bg-[#d3e4ff]"
//                     }`}
//                   >
//                     <span
//                       className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
//                         isNsfw ? "translate-x-5" : ""
//                       }`}
//                     />
//                   </button>
//                   <span className={isNsfw ? "font-semibold" : "opacity-70"}>
//                     Yes
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* ALTERNATE SPELLINGS */}
//             <div className="relative">
//               <div className="absolute -top-3 left-6 bg-white px-2 text-[11px] font-semibold text-[#00336E]">
//                 Alternate Spellings
//               </div>
//               <div className="border border-[#00336E] rounded-2xl px-4 py-3 bg-white">
//                 <input
//                   className="w-full bg-transparent text-sm outline-none placeholder:text-[#9FB0D0]"
//                   placeholder="Add variations (e.g. ‘rizz’, ‘wrizz’, ‘rizzed’)"
//                 />
//               </div>
//             </div>

//             {/* HASHTAGS */}
//             <div className="relative md:col-span-2">
//               <div className="absolute -top-3 left-6 bg-white px-2 text-[11px] font-semibold text-[#00336E]">
//                 Hashtags (Optional)
//               </div>
//               <div className="border border-[#00336E] rounded-2xl px-4 py-3 bg-white">
//                 <input
//                   className="w-full bg-transparent text-sm outline-none placeholder:text-[#9FB0D0]"
//                   placeholder="Add relevant hashtags (e.g. #TikTokSlang #GenAlpha)"
//                 />
//               </div>
//             </div>

//             {/* SUBMIT BUTTON */}
//             <div className="md:col-span-2 flex flex-col gap-2 pt-2">
//               <Button type="submit" size="lg" className="self-start">
//                 Add Word ↗
//               </Button>
//               <p className="text-[11px] text-slate-500">
//                 By submitting, you agree your entry may be reviewed or edited.
//               </p>
//             </div>
//           </form>
//         </div>
//       </section>

//       <Footer />

//       {/* MODALS (unchanged behaviour, just reused) */}
//       {modal !== "none" && (
//         <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
//           {/* soft duplicate */}
//           {modal === "softDup" && (
//             <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 space-y-4">
//               <div className="flex justify-between items-start">
//                 <h3 className="font-semibold text-lg text-brand-dark">
//                   Looks like this word already exists.
//                 </h3>
//                 <button
//                   className="text-slate-400 text-xl leading-none"
//                   onClick={() => setModal("none")}
//                 >
//                   ×
//                 </button>
//               </div>

//               <p className="text-xs text-slate-600">
//                 Want to add a new definition instead, or continue anyway?
//               </p>

//               <div className="flex flex-col gap-2 mt-4">
//                 <Button variant="outline" onClick={() => setModal("hardDup")}>
//                   View Existing Word
//                 </Button>
//                 <Button onClick={() => setModal("success")}>
//                   Add New Definition
//                 </Button>
//                 <Button variant="ghost" onClick={handleContinueAnyway}>
//                   Continue Anyway
//                 </Button>
//               </div>
//             </div>
//           )}

//           {/* hard duplicate */}
//           {modal === "hardDup" && (
//             <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 space-y-4">
//               <div className="flex justify-between items-start">
//                 <h3 className="font-semibold text-lg text-brand-dark flex items-center gap-2">
//                   <span>⚠️</span> Duplicate Detected
//                 </h3>
//                 <button
//                   className="text-slate-400 text-xl leading-none"
//                   onClick={() => setModal("none")}
//                 >
//                   ×
//                 </button>
//               </div>

//               <p className="text-xs text-slate-600">
//                 The ability to attract someone using confidence or smooth
//                 talking.
//               </p>
//               <p className="text-xs text-slate-500 italic">
//                 Example: Bro has insane rizz.
//               </p>

//               <div className="flex gap-3 mt-4 flex-col sm:flex-row">
//                 <Button
//                   variant="outline"
//                   className="flex-1"
//                   onClick={() => setModal("none")}
//                 >
//                   View Word
//                 </Button>
//                 <Button className="flex-1" onClick={() => setModal("success")}>
//                   Add New Definition
//                 </Button>
//               </div>
//             </div>
//           )}

//           {/* success */}
//           {modal === "success" && (
//             <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 space-y-4 text-center">
//               <div className="flex justify-end">
//                 <button
//                   className="text-slate-400 text-xl leading-none"
//                   onClick={() => setModal("none")}
//                 >
//                   ×
//                 </button>
//               </div>

//               <div className="-mt-6 mb-1 text-3xl">🎉</div>
//               <h3 className="font-semibold text-lg text-brand-dark">
//                 Word Submitted!
//               </h3>
//               <p className="text-xs text-slate-600">
//                 Your definition will appear once reviewed. Thanks for
//                 contributing!
//               </p>

//               <div className="mt-4 flex justify-center">
//                 <Button
//                   variant="outline"
//                   onClick={() => {
//                     resetForm();
//                     setModal("none");
//                   }}
//                 >
//                   Add Another Word →
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </main>
//   );
// }

"use client";

import { SubmitCTA } from "@/components/common/SubmitCTA";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { MdArrowOutward, MdCelebration } from "react-icons/md";

type ModalState = "none" | "softDup" | "hardDup" | "success";

const SOFT_DUP_WORDS = ["delulu"];
const HARD_DUP_WORDS = ["rizz"];

// shared pill style for all single-line fields
const singleLineField =
  "border border-[#00336E] rounded-[24px] px-5 h-[56px] bg-white flex items-center";

export default function SubmitPage() {
  const [word, setWord] = useState("");
  const [modal, setModal] = useState<ModalState>("none");
  const [isNsfw, setIsNsfw] = useState(false);

  const resetForm = () => setWord("");

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

  const handleContinueAnyway = () => setModal("success");

  return (
    <main className="flex flex-col bg-[#f4f6fb]">
      {/* HERO + BG UNDER NAVBAR */}
      <section
        className="pb-20 pt-4  "
        style={{
          background:
            "linear-gradient(to bottom, #dceaff 0%, #eaf1ff 50%, #ffffff 50%)",
        }}
      >
        <Navbar />

        <div className="max-w-5xl mx-auto px-6 mt-50">
          {/* centered title like Figma */}
          <div className="text-center mb-10">
            <h1 className="font-display font-bold text-[2.6rem] md:text-[3rem] text-[#00336E]">
              Submit a New Word
            </h1>
            <p className="mt-2 text-sm text-[#00336E]">
              Got a new slang, trend, or phrase? Add it to the dictionary.
            </p>
          </div>

          {/* MAIN CARD */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[40px] border border-[#d2e1ff] shadow-md p-6 md:p-8 grid gap-6 md:grid-cols-2"
          >
            {/* WORD */}
            <div className="relative">
              <div className="absolute -top-3 left-6 bg-white px-2 text-[11px] font-semibold text-[#00336E]">
                Word
              </div>
              <div className={singleLineField}>
                <input
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#9FB0D0]"
                  placeholder="Enter the word or phrase (e.g. ‘Delulu’, ‘NPC’, ‘Rizz God’)"
                />
              </div>
            </div>

            {/* DEFINITION (single-line pill like Figma) */}
            <div className="relative">
              <div className="absolute -top-3 left-6 bg-white px-2 text-[11px] font-semibold text-[#00336E]">
                Definition{" "}
                <span className="font-normal text-[#5874a8]">
                  (Helps us verify and track trend origin)
                </span>
              </div>
              <div className={singleLineField}>
                <input
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#9FB0D0]"
                  placeholder="Write the clearest, simplest definition. Avoid long explanations."
                />
              </div>
            </div>
            {/* EXAMPLE SENTENCE – same height as other fields */}
            <div className="relative md:col-span-2">
              <div className="absolute -top-3 left-6 bg-white px-2 text-[11px] font-semibold text-[#00336E]">
                Example Sentence
              </div>
              <div className={singleLineField}>
                <textarea
                  className="w-full h-full bg-transparent text-sm outline-none placeholder:text-[#9FB0D0] resize-none"
                  placeholder="Use the word in a real sentence (e.g. “He’s got insane rizz.”)"
                  rows={1}
                />
              </div>
            </div>

            {/* CATEGORY SELECT – legend style like Figma */}
            <div className="relative">
              {/* label sitting on the top border */}
              <span className="pointer-events-none absolute -top-2 left-7 bg-white px-1.5 text-[13px] font-semibold text-[#00336E]">
                Category
              </span>

              <div className="h-[58px] rounded-[18px] border border-[#00336E] bg-white flex items-center px-6">
                <select
                  defaultValue="Slang"
                  className="w-full bg-transparent text-sm outline-none appearance-none pr-6 text-[#00336E] placeholder:text-[#9FB0D0] border-none"
                >
                  <option>Slang</option>
                  <option>TikTok Trends</option>
                  <option>Memes</option>
                  <option>Audio Sounds</option>
                </select>

                {/* small chevron icon on the right */}
                <FiChevronDown className="ml-2 text-[#00336E] text-[14px]" />
              </div>
            </div>

            {/* WHERE DID YOU SEE THIS WORD */}
            <div className="relative">
              <div className="absolute -top-3 left-6 bg-white px-2 text-[11px] font-semibold text-[#00336E]">
                Where Did You See This Word?{" "}
                <span className="font-normal text-[#5874a8]">(Optional)</span>
              </div>
              <div className={singleLineField}>
                <input
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#9FB0D0]"
                  placeholder="Paste TikTok link (optional) (Helps us verify and track trend origin)"
                />
              </div>
            </div>

            {/* CATEGORY / NSFW TOGGLE – same pill height */}
            <div className="relative">
              {/* <div className="absolute -top-3 left-6 bg-white px-2 text-[11px] font-semibold text-[#00336E]">
                Category
              </div> */}
              <div className={`${singleLineField} justify-between`}>
                <span className="text-sm text-[#00336E]">Category</span>
                <div className="flex items-center gap-3 text-[12px] text-[#00336E]">
                  <span className={!isNsfw ? "font-semibold" : "opacity-70"}>
                    No
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsNsfw((v) => !v)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      isNsfw ? "bg-[#00336E]" : "bg-[#d3e4ff]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                        isNsfw ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                  <span className={isNsfw ? "font-semibold" : "opacity-70"}>
                    Yes
                  </span>
                </div>
              </div>
            </div>

            {/* ALTERNATE SPELLINGS */}
            <div className="relative">
              <div className="absolute -top-3 left-6 bg-white px-2 text-[11px] font-semibold text-[#00336E]">
                Alternate Spellings
              </div>
              <div className={singleLineField}>
                <input
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#9FB0D0]"
                  placeholder="Add variations (e.g. ‘rizz’, ‘wrizz’, ‘rizzed’)"
                />
              </div>
            </div>

            {/* HASHTAGS */}
            <div className="relative md:col-span-2">
              <div className="absolute -top-3 left-6 bg-white px-2 text-[11px] font-semibold text-[#00336E]">
                Hashtags (Optional)
              </div>
              <div className={singleLineField}>
                <input
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#9FB0D0]"
                  placeholder="Add relevant hashtags (e.g. #TikTokSlang #GenAlpha)"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="md:col-span-2 flex flex-col gap-2 pt-2">
              <Button type="submit" size="lg" className="self-start">
                Add Word ↗
              </Button>
              <p className="text-[11px] text-slate-500">
                By submitting, you agree your entry may be reviewed or edited.
              </p>
            </div>
          </form>
        </div>
      </section>
      <SubmitCTA />
  <div className="">
        <button className="pl-9" onClick={() => setModal("success")}>
        sucess
      </button>
      <button className="pl-9" onClick={() => setModal("hardDup")}>
        harddup
      </button>
      <button className="pl-9" onClick={() => setModal("softDup")}>
       softdup
      </button>
  </div>
      <Footer />

      {/* MODALS (same logic as before) */}
      {modal !== "none" && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          {modal === "softDup" && (
            <div className="bg-white rounded-[32px] shadow-2xl max-w-md w-full mx-4 p-8 relative">
              <button
                className="absolute top-6 right-6 text-slate-800 text-2xl leading-none hover:opacity-70"
                onClick={() => setModal("none")}
              >
                ×
              </button>

              <div className="text-center mt-2 mb-8">
                <h3 className="font-display font-bold text-2xl text-[#00336E] leading-tight">
                  Looks like this word already exists. Want to add a new
                  definition instead?
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setModal("hardDup")}
                  className="w-full border border-[#00336E] text-[#00336E] rounded-full py-3.5 px-6 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#f0f5ff] transition-colors"
                >
                  View Existing Word <MdArrowOutward className="text-lg" />
                </button>

                <button
                  onClick={() => setModal("success")}
                  className="w-full border border-[#00336E] text-[#00336E] rounded-full py-3.5 px-6 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#f0f5ff] transition-colors"
                >
                  Add New Definition <MdArrowOutward className="text-lg" />
                </button>

                <button
                  onClick={handleContinueAnyway}
                  className="w-full border border-[#00336E] text-[#00336E] rounded-full py-3.5 px-6 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#f0f5ff] transition-colors"
                >
                  Continue Anyway <MdArrowOutward className="text-lg" />
                </button>
              </div>
            </div>
          )}

          {modal === "hardDup" && (
            <div className="bg-white rounded-[32px] shadow-2xl max-w-md w-full mx-4 p-8 relative">
              <button
                className="absolute top-6 right-6 text-slate-800 text-2xl leading-none hover:opacity-70"
                onClick={() => setModal("none")}
              >
                ×
              </button>

              <div className="text-center mt-2 mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-2xl">⚠️</span>
                  <h3 className="font-display font-bold text-2xl text-[#00336E]">
                    Duplicate Detected
                  </h3>
                </div>
                <p className="text-[#00336E] text-sm leading-relaxed px-4">
                  The ability to attract someone using confidence or smooth
                  talking.
                </p>

                <div className="mt-4">
                  <h4 className="font-bold text-[#00336E] text-sm">Example:</h4>
                  <p className="text-[#00336E] text-sm">Bro has insane rizz.</p>
                </div>

                <div className="flex items-center justify-center gap-6 mt-4 text-[#00336E] font-semibold text-sm">
                   <div className="flex items-center gap-1.5">
                      <AiOutlineLike className="text-lg" /> 3.2k
                   </div>
                   <div className="flex items-center gap-1.5">
                      <AiOutlineDislike className="text-lg" /> 210
                   </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setModal("none")}
                  className="flex-1 border border-[#00336E] text-[#00336E] rounded-full py-3 px-4 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#f0f5ff] transition-colors"
                >
                  View Word <MdArrowOutward className="text-lg" />
                </button>
                <button
                  onClick={() => setModal("success")}
                  className="flex-1 border border-[#00336E] text-[#00336E] rounded-full py-3 px-4 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#f0f5ff] transition-colors"
                >
                  Add New Definition <MdArrowOutward className="text-lg" />
                </button>
              </div>
            </div>
          )}

          {modal === "success" && (
            <div className="bg-white rounded-[32px] shadow-2xl max-w-md w-full mx-4 p-8 relative text-center">
              <button
                className="absolute top-6 right-6 text-slate-800 text-2xl leading-none hover:opacity-70"
                onClick={() => setModal("none")}
              >
                ×
              </button>

              <div className="flex justify-center mb-4">
                 <MdCelebration className="text-6xl text-[#00336E]" />
              </div>

              <h3 className="font-display font-bold text-2xl text-[#00336E] mb-2">
                Word Submitted!
              </h3>
              <p className="text-[#00336E] text-xs px-8 leading-relaxed">
                Your definition will appear once reviewed. Thanks for
                contributing!
              </p>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => {
                    resetForm();
                    setModal("none");
                  }}
                  className="border border-[#00336E] text-[#00336E] rounded-full py-3 px-8 text-sm font-semibold flex items-center gap-2 hover:bg-[#f0f5ff] transition-colors"
                >
                  Add Another Word <MdArrowOutward className="text-lg" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
