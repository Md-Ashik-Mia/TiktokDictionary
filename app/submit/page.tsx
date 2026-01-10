// "use client";

// import React, { useState } from "react";
// import { Navbar } from "@/components/layout/Navbar";
// import { Footer } from "@/components/layout/Footer";
// import { Button } from "@/components/ui/Button";
// import { FiChevronDown } from "react-icons/fi";

// type ModalState = "none" | "softDup" | "hardDup" | "success";

// const SOFT_DUP_WORDS: string[] = [];
// const HARD_DUP_WORDS: string[] = [];

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
//                   placeholder="Enter the word or phrase"
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
//                   placeholder="Use the word in a real sentence"
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
//                   placeholder="Add variations (optional)"
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
//                 Example: Use the word in a sentence.
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
import { api, userApi } from "@/lib/https";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { MdArrowOutward, MdCelebration } from "react-icons/md";

type ModalState = "none" | "softDup" | "hardDup" | "success";

type SubmitWordResponse = {
  message?: string;
  duplicate_tag?: boolean;
  dictionary_id?: number;
  error?: string;
  word_id?: number;
  definition?: { definition?: string; example_sentence?: string };
  definition_id?: number;
  user_likes?: number;
};

type ApiResponseItem = {
  is_like: boolean;
  is_dislike: boolean;
};

type ApiDefinition = {
  id: number;
  definition: string;
  example_sentence?: string;
  responses?: ApiResponseItem[];
};

type ApiWord = {
  id: number;
  word: string;
  definitions?: ApiDefinition[];
  definations?: ApiDefinition[];
};

type GetWordsResponse = {
  results: ApiWord[];
};

type ExistingDefinitionDetails = {
  wordId: number;
  word: string;
  definition: string;
  exampleSentence: string;
  likes: number;
  dislikes: number;
};

type ApiCategory = {
  id: number;
  name: string;
  total_words?: number;
};

type AllCategoriesResponse = {
  count: number;
  categories: ApiCategory[];
};

// shared pill style for all single-line fields
const singleLineField =
  "border border-[#00336E] rounded-[24px] px-5 h-[56px] bg-white flex items-center";

export default function SubmitPage() {
  const router = useRouter();

  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [exampleSentence, setExampleSentence] = useState("");
  const [categoryName, setCategoryName] = useState("Slang");
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [source, setSource] = useState("");
  const [alternateSpellingsRaw, setAlternateSpellingsRaw] = useState("");
  const [hashtagsRaw, setHashtagsRaw] = useState("");

  const [modal, setModal] = useState<ModalState>("none");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddingDefinition, setIsAddingDefinition] = useState(false);
  const [lastResponse, setLastResponse] = useState<SubmitWordResponse | null>(
    null
  );
  const [existingWordId, setExistingWordId] = useState<number | null>(null);
  const [existingDetails, setExistingDetails] = useState<ExistingDefinitionDetails | null>(null);

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

        const seen = new Set<string>();
        const unique: ApiCategory[] = [];
        for (const c of raw) {
          const name = typeof c?.name === "string" ? c.name.trim() : "";
          if (!name) continue;
          const key = name.toLowerCase();
          if (seen.has(key)) continue;
          seen.add(key);
          unique.push({ id: c.id, name, total_words: c.total_words });
        }

        if (!alive) return;
        setCategories(unique);
        setCategoryName((prev) => {
          const prevKey = prev.trim().toLowerCase();
          if (prevKey && unique.some((c) => c.name.toLowerCase() === prevKey)) return prev;

          const slang = unique.find((c) => c.name.trim().toLowerCase() === "slang")?.name;
          return slang ?? unique[0]?.name ?? prev;
        });
      } catch {
        if (!alive) return;
        setCategories([]);
      }
    }

    loadCategories();
    return () => {
      alive = false;
      controller.abort();
    };
  }, []);

  const resetForm = () => {
    setWord("");
    setDefinition("");
    setExampleSentence("");
    setCategoryName("Slang");
    setSource("");
    setAlternateSpellingsRaw("");
    setHashtagsRaw("");
  };

  const parseList = (raw: string) =>
    raw
      .split(/[\n,]/g)
      .map((s) => s.trim())
      .filter(Boolean);

  const slugifyWord = (w: string) =>
    encodeURIComponent(w.trim().toLowerCase().replace(/\s+/g, "-"));

  const isMeaningAlreadyExistsError = (msg?: string) =>
    typeof msg === "string" && /meaning/i.test(msg) && /exist/i.test(msg);

  const isWordExistsDefinitionMismatchError = (msg?: string) =>
    typeof msg === "string" && /word\s+exists/i.test(msg) && /definition/i.test(msg);

  const countLikesDislikes = (def: ApiDefinition) => {
    const responses = def.responses ?? [];
    let likes = 0;
    let dislikes = 0;
    for (const r of responses) {
      if (r.is_like) likes += 1;
      if (r.is_dislike) dislikes += 1;
    }
    return { likes, dislikes };
  };

  const unwrapWordResponse = (data: unknown): ApiWord | null => {
    if (!data || typeof data !== "object") return null;
    const maybe = data as Record<string, unknown>;
    const results = maybe.results;
    if (Array.isArray(results) && results.length > 0) {
      const first = results[0];
      if (first && typeof first === "object") return first as ApiWord;
    }
    return data as ApiWord;
  };

  const fetchExistingDefinitionDetails = async (definitionId: number) => {
    const search = word.trim();
    if (!search) return;
    try {
      const res = await api.get<GetWordsResponse>("dictionary/get-words/", {
        params: { search },
      });
      const results = res.data?.results ?? [];
      const exact = results.find(
        (r) => r.word?.trim().toLowerCase() === search.toLowerCase()
      );
      const wordId = (exact ?? results[0])?.id;
      if (!wordId) return;

      const fullRes = await api.post<unknown>("dictionary/get-words/", {
        word_id: wordId,
      });
      const fullWord = unwrapWordResponse(fullRes.data);
      if (!fullWord) return;

      const defs = fullWord.definitions ?? fullWord.definations ?? [];
      const match = defs.find((d) => d.id === definitionId) ?? defs[0];
      if (!match) return;

      const counts = countLikesDislikes(match);
      setExistingDetails({
        wordId: fullWord.id,
        word: fullWord.word,
        definition: match.definition,
        exampleSentence: match.example_sentence ?? "",
        likes: counts.likes,
        dislikes: counts.dislikes,
      });
      setExistingWordId(fullWord.id);
    } catch {
      // best-effort; keep modal functional even if this fails
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const wordValue = word.trim();
    const defValue = definition.trim();

    if (!wordValue || !defValue) return;
    if (isSubmitting) return;

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/login");
        return;
      }
    }

    const selectedCategoryId =
      categories.find(
        (c) => c.name.trim().toLowerCase() === categoryName.trim().toLowerCase()
      )?.id ?? categories[0]?.id;

    if (typeof selectedCategoryId !== "number") return;

    const payload = {
      dictionary: {
        word: wordValue,
        Category: selectedCategoryId,
        Source: source.trim(),
        Alternate_spelllings: parseList(alternateSpellingsRaw),
        Hashtags: parseList(hashtagsRaw),
      },
      definition: {
        definition: defValue,
        example_sentence: exampleSentence.trim(),
      },
    };

    setIsSubmitting(true);
    try {
      const response = await userApi.post("dictionary/submit-word/", payload);
      const data = (response?.data ?? null) as SubmitWordResponse | null;
      setLastResponse(data);

      // Scenario 2 (older API behavior): 201 + duplicate_tag=true
      if (data?.duplicate_tag) {
        const id = data.dictionary_id ?? data.word_id ?? null;
        setExistingWordId(typeof id === "number" ? id : null);
        setModal("softDup");
        return;
      }

      setModal("success");
      resetForm();
    } catch (err: unknown) {
      const maybeErr = err as {
        response?: { status?: number; data?: unknown };
      };
      const status = maybeErr.response?.status;
      const data = (maybeErr.response?.data ?? null) as SubmitWordResponse | null;
      setLastResponse(data);

      // Scenario 2 (new API behavior): error + word_id
      if (status === 400 && isWordExistsDefinitionMismatchError(data?.error)) {
        const id = data?.word_id ?? data?.dictionary_id ?? null;
        setExistingWordId(typeof id === "number" ? id : null);
        setModal("softDup");
        return;
      }

      // Scenario 3: meaning already exists (same definition)
      if (status === 400 && isMeaningAlreadyExistsError(data?.error)) {
        const defId = data?.definition_id;
        setExistingDetails(null);
        if (typeof defId === "number") {
          void fetchExistingDefinitionDetails(defId);
        }
        setModal("hardDup");
        return;
      }

      if (status === 409) {
        setModal("hardDup");
        return;
      }
      console.error("Submit word failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddNewDefinition = async () => {
    if (isAddingDefinition) return;
    const wordId =
      existingWordId ?? lastResponse?.word_id ?? lastResponse?.dictionary_id ?? null;
    if (typeof wordId !== "number") return;

    const defText =
      lastResponse?.definition?.definition?.trim() || definition.trim();
    const exText =
      lastResponse?.definition?.example_sentence?.trim() ||
      exampleSentence.trim();
    if (!defText) return;

    setIsAddingDefinition(true);
    try {
      await userApi.post("dictionary/definations/", {
        word: wordId,
        definition: defText,
        example_sentence: exText,
      });
      setModal("success");
      resetForm();
    } catch (err) {
      console.error("Add definition failed", err);
    } finally {
      setIsAddingDefinition(false);
    }
  };

  return (
    <main className="flex flex-col bg-[#f4f6fb]">
      {/* HERO + BG UNDER NAVBAR */}
      <section
        className="pb-20 pt-24 sm:pt-28"
        style={{
          background:
            "linear-gradient(to bottom, #dceaff 0%, #eaf1ff 50%, #ffffff 50%)",
        }}
      >
        <Navbar />

        <div className="max-w-5xl mx-auto px-6 mt-10 sm:mt-16">
          {/* centered title like Figma */}
          <div className="text-center mb-10">
            <h1 className="font-display font-bold text-3xl sm:text-[2.6rem] md:text-[3rem] text-[#00336E]">
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
              <div className="absolute -top-3 left-6 bg-white px-2 text-[11px] font-semibold text-[#000000]">
                Word
              </div>
              <div className={singleLineField}>
                <input
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#9D9D9D]"
                  placeholder="Enter the word or phrase"
                />
              </div>
            </div>

            {/* DEFINITION (single-line pill like Figma) */}
            <div className="relative">
              <div className="absolute -top-3 left-6 bg-white px-2 text-[11px] font-semibold text-[#000000]">
                <span>Defination</span>
                <span className="font-normal text-[#9D9D9D]">
                  (Helps us verify and track trend origin)
                </span>
              </div>
              <div className={singleLineField}>
                <input
                  value={definition}
                  onChange={(e) => setDefinition(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#9D9D9D]"
                  placeholder="Write the clearest, simplest definition. Avoid long explanations."
                />
              </div>
            </div>
            {/* EXAMPLE SENTENCE – same height as other fields */}
            <div className="relative md:col-span-2">
              <div className="absolute -top-3 left-6 bg-white px-2  text-[11px] font-semibold text-[#000000]">
                Example Sentence
              </div>
              <div className={singleLineField}>
                <textarea
                  value={exampleSentence}
                  onChange={(e) => setExampleSentence(e.target.value)}
                  className="w-full h-full pt-4 bg-transparent text-sm outline-none placeholder:text-[#9D9D9D] resize-none"
                  placeholder="Use the word in a real sentence"
                  rows={1}
                />
              </div>
            </div>

            {/* CATEGORY SELECT – legend style like Figma */}
            <div className="relative">
              {/* label sitting on the top border */}
              <span className="pointer-events-none absolute -top-2 left-7 bg-white px-1.5 text-[13px] font-semibold text-[#000000]">
                Category
              </span>

              <div className="h-[58px] rounded-[18px] border border-[#00336E] bg-white flex items-center px-6">
                <select
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full bg-white text-sm outline-none appearance-none pr-6 text-[#00336E] placeholder:text-[#9D9D9D] border-none"
                >
                  {categories.length === 0 ? (
                    <option value={categoryName} style={{ color: "#00336E", backgroundColor: "#ffffff" }}>
                      Loading categories...
                    </option>
                  ) : (
                    categories.map((c) => (
                      <option
                        key={c.id}
                        value={c.name}
                        style={{ color: "#00336E", backgroundColor: "#ffffff" }}
                      >
                        {c.name}
                      </option>
                    ))
                  )}
                </select>

                {/* small chevron icon on the right */}
                <FiChevronDown className="ml-2 text-[#00336E] text-[14px]" />
              </div>
            </div>

            {/* WHERE DID YOU SEE THIS WORD */}
            <div className="relative">
              <div className="absolute -top-3 left-6 bg-white px-2 text-[11px] font-semibold text-[#000000]">
                Where Did You See This Word?{" "}
                <span className="font-normal text-[#9D9D9D]">(Optional)</span>
              </div>
              <div className={singleLineField}>
                <input
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#9D9D9D]"
                  placeholder="Paste TikTok link (optional) (Helps us verify and track trend origin)"
                />
              </div>
            </div>

            {/* ALTERNATE SPELLINGS */}
            <div className="relative md:col-span-2">
              <div className="absolute -top-3 left-6 bg-white px-2 text-[11px] font-semibold text-[#000000]">
                Alternate Spellings
              </div>
              <div className={singleLineField}>
                <input
                  value={alternateSpellingsRaw}
                  onChange={(e) => setAlternateSpellingsRaw(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#9D9D9D]"
                  placeholder="Add variations (optional)"
                />
              </div>
            </div>

            {/* HASHTAGS */}
            <div className="relative md:col-span-2">
              <div className="absolute -top-3 left-6 bg-white px-2 text-[11px] font-semibold text-[#000000]">
                Hashtags (Optional)
              </div>
              <div className={singleLineField}>
                <input
                  value={hashtagsRaw}
                  onChange={(e) => setHashtagsRaw(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#9D9D9D]"
                  placeholder="Add relevant hashtags (e.g. #TikTokSlang #GenAlpha)"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="md:col-span-2 flex flex-col gap-2 pt-2">
              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto self-stretch md:self-start"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Add Word ↗"}
              </Button>
              <p className="text-[11px] text-[#9D9D9D]">
                By submitting, you agree your entry may be reviewed or edited.
              </p>
            </div>
          </form>
        </div>
      </section>
      <SubmitCTA />
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
                  onClick={() => {
                    const slug = slugifyWord(word);
                    const id = existingWordId ?? lastResponse?.word_id ?? lastResponse?.dictionary_id;
                    if (slug && typeof id === "number") router.push(`/word/${slug}?id=${id}`);
                    else if (slug) router.push(`/word/${slug}`);
                    setModal("none");
                  }}
                  className="w-full border border-[#00336E] text-[#00336E] rounded-full py-3.5 px-6 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#f0f5ff] transition-colors"
                >
                  View Existing Word <MdArrowOutward className="text-lg" />
                </button>

                <button
                  onClick={handleAddNewDefinition}
                  disabled={isAddingDefinition}
                  className="w-full border border-[#00336E] text-[#00336E] rounded-full py-3.5 px-6 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#f0f5ff] transition-colors"
                >
                  {isAddingDefinition ? "Adding..." : "Add New Definition"}{" "}
                  <MdArrowOutward className="text-lg" />
                </button>

                <button
                  onClick={handleAddNewDefinition}
                  disabled={isAddingDefinition}
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
                  {existingDetails?.definition ||
                    lastResponse?.error ||
                    lastResponse?.message ||
                    "Meaning of this definition already exists."}
                </p>

                <div className="mt-4">
                  <h4 className="font-bold text-[#00336E] text-sm">Example:</h4>
                  <p className="text-[#00336E] text-sm">
                    {existingDetails?.exampleSentence || "—"}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-6 mt-4 text-[#00336E] font-semibold text-sm">
                  <div className="flex items-center gap-1.5">
                    <AiOutlineLike className="text-lg" />
                    {existingDetails ? existingDetails.likes.toLocaleString() : "—"}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <AiOutlineDislike className="text-lg" />
                    {existingDetails
                      ? existingDetails.dislikes.toLocaleString()
                      : "—"}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    const slug = slugifyWord(word);
                    const id = existingWordId ?? lastResponse?.word_id ?? lastResponse?.dictionary_id;
                    if (slug && typeof id === "number") router.push(`/word/${slug}?id=${id}`);
                    else if (slug) router.push(`/word/${slug}`);
                    setModal("none");
                  }}
                  className="flex-1 border border-[#00336E] text-[#00336E] rounded-full py-3 px-4 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#f0f5ff] transition-colors"
                >
                  View Word <MdArrowOutward className="text-lg" />
                </button>
                <button
                  onClick={handleAddNewDefinition}
                  disabled={isAddingDefinition}
                  className="flex-1 border border-[#00336E] text-[#00336E] rounded-full py-3 px-4 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#f0f5ff] transition-colors"
                >
                  {isAddingDefinition ? "Adding..." : "Add New Definition"}{" "}
                  <MdArrowOutward className="text-lg" />
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
