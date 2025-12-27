
"use client";

import { SubmitCTA } from "@/components/common/SubmitCTA";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { api } from "@/lib/https";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import {
  FiChevronRight,
  FiX,
} from "react-icons/fi";
import { MdInfo } from "react-icons/md";

type OriginItem = { by: string; date: string };
type AltDef = { text: string; likes: number; comments: number };

type ApiResponseItem = {
  id: number;
  is_like: boolean;
  is_dislike: boolean;
  user?: string | number;
  created_at?: string;
};

type ApiDefinition = {
  id: number;
  definition: string;
  example_sentence?: string;
  responses?: ApiResponseItem[];
  created_at?: string;
};

type ApiWord = {
  id: number;
  word: string;
  category?: { id: number; name: string };
  Source?: string;
  Category_yes?: boolean;
  total_likes?: number;
  total_dislikes?: number;
  duplicate_tag?: boolean;
  Alternate_spelllings?: string[];
  Alternate_spellings?: string[];
  Hashtags?: string[];
  definitions?: ApiDefinition[];
  definations?: ApiDefinition[];
  created_at?: string;
  first_user?: number | string;
  username?: string;
  total_submissions?: number;
};

type GetWordsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiWord[];
};

function unwrapWordResponse(data: unknown): ApiWord | null {
  if (!data || typeof data !== "object") return null;
  const maybe = data as Record<string, unknown>;
  const results = maybe.results;
  if (Array.isArray(results) && results.length > 0) {
    const first = results[0];
    if (first && typeof first === "object") return first as ApiWord;
  }
  return data as ApiWord;
}

function countLikesDislikes(def: ApiDefinition) {
  const responses = def.responses ?? [];
  let likes = 0;
  let dislikes = 0;
  for (const r of responses) {
    if (r.is_like) likes += 1;
    if (r.is_dislike) dislikes += 1;
  }
  return { likes, dislikes };
}

function formatShortDate(iso?: string) {
  if (!iso) return "18 Jul 2025";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "18 Jul 2025";
  return d.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

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
  const searchParams = useSearchParams();
  const word = useMemo(
    () => decodeURIComponent(params.slug || "word").replace(/-/g, " "),
    [params.slug]
  );
  const title = useMemo(() => titleCase(word), [word]);

  const [, setLoadingWord] = useState(true);
  const [wordData, setWordData] = useState<ApiWord | null>(null);

  const [meaning, setMeaning] = useState("");
  const [showDupModal, setShowDupModal] = useState(false);

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();

    async function fetchById(wordId: number) {
      const res = await api.post<unknown>(
        "dictionary/get-words/",
        { word_id: wordId },
        { signal: controller.signal }
      );
      return unwrapWordResponse(res.data);
    }

    async function resolveIdBySearch(search: string) {
      const res = await api.get<GetWordsResponse>("dictionary/get-words/", {
        params: { search },
        signal: controller.signal,
      });
      const results = res.data?.results ?? [];
      const exact = results.find(
        (r) => r.word?.trim().toLowerCase() === search.trim().toLowerCase()
      );
      return (exact ?? results[0])?.id;
    }

    async function load() {
      try {
        setLoadingWord(true);
        const idParam = searchParams?.get("id");
        const directId = idParam ? Number(idParam) : NaN;

        const wordId = Number.isFinite(directId)
          ? directId
          : await resolveIdBySearch(word);

        if (!wordId) {
          if (!alive) return;
          setWordData(null);
          return;
        }

        const data = await fetchById(wordId);
        if (!alive) return;
        setWordData(data);
      } catch {
        if (!alive) return;
        setWordData(null);
      } finally {
        if (alive) setLoadingWord(false);
      }
    }

    if (word.trim()) load();
    return () => {
      alive = false;
      controller.abort();
    };
  }, [word, searchParams]);

  const definitions = useMemo(() => {
    return wordData?.definitions ?? wordData?.definations ?? [];
  }, [wordData]);

  const mainDef = definitions[0];

  const firstExampleSentence = useMemo(() => {
    for (const d of definitions) {
      const ex = d?.example_sentence;
      if (typeof ex === "string" && ex.trim()) return ex.trim();
    }
    return "";
  }, [definitions]);

  const displayWord = wordData?.word || "Rizz";
  const displayDefinition =
    mainDef?.definition || "The ability to charm or attract someone using confidence.";
  const displayExample = firstExampleSentence
    ? `Example: “${firstExampleSentence}”`
    : `Example: “Bro pulled her in 2 mins — crazy ${title.toLowerCase()}.”`;

  const mainCounts = mainDef ? countLikesDislikes(mainDef) : null;
  const displayLikes = wordData?.total_likes ?? mainCounts?.likes ?? 9284;
  const displayDislikes = wordData?.total_dislikes ?? mainCounts?.dislikes ?? 112;

  const altDefs: AltDef[] = useMemo(() => {
    const fallback: AltDef[] = [
      {
        text: "Game or charisma used to impress someone.",
        likes: 1120,
        comments: 90,
      },
      { text: "Smooth talking mentality.", likes: 320, comments: 40 },
      { text: "Flirty confidence energy.", likes: 143, comments: 15 },
    ];

    const defs = definitions;
    if (defs.length === 0) return fallback;

    const mapped = defs.slice(0, 4).map((d) => {
      const { likes, dislikes } = countLikesDislikes(d);
      return { text: d.definition, likes, comments: dislikes };
    });

    return mapped;
  }, [definitions]);

  const origins: OriginItem[] = useMemo(() => {
    const apiUsername = wordData?.username;
    const firstUser = wordData?.first_user;
    const firstResponseUser = definitions?.[0]?.responses?.[0]?.user;

    const byRaw =
      apiUsername ??
      (firstUser != null ? firstUser : undefined) ??
      (firstResponseUser != null ? firstResponseUser : undefined) ??
      "@username";

    const by = typeof byRaw === "string" ? byRaw : String(byRaw);

    const date = formatShortDate(
      wordData?.created_at || definitions?.[0]?.responses?.[0]?.created_at
    );

    return [{ by, date }];
  }, [wordData, definitions]);

  const related = useMemo(() => {
    const fallback = ["W Rizz", "Skibidi", "Ohio Rizz", "Ohio Rizz"];
    const fromApi = (
      wordData?.Alternate_spelllings ?? wordData?.Alternate_spellings ?? []
    ).filter(Boolean);
    const out = fromApi.length > 0 ? fromApi.slice(0, 4) : fallback;
    while (out.length < 4) out.push(fallback[out.length]);
    return out;
  }, [wordData]);

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
              <h1 className="font-display text-7xl! md:text-5xl font-extrabold tracking-tight">
                {titleCase(displayWord)}
              </h1>
            </div>

            <p className="mt-3 text-lg text-[#00336E]">{displayDefinition}</p>
            <p className="mt-2 text-lg text-[#00336E]">{displayExample}</p>

            <div className="mt-4 flex items-center gap-5 text-[#000000]">
              <span className="inline-flex font-bold items-center gap-1 text-sm">
                <AiOutlineLike /> {displayLikes.toLocaleString()}
              </span>
              <span className="inline-flex font-bold items-center gap-1 text-sm">
                <AiOutlineDislike /> {displayDislikes.toLocaleString()}
              </span>
            </div>
          </div>
        </section>
      </div>
      <section className="max-w-6xl mx-auto px-6 py-10 space-y-10 ">
        {/* Alternate Definitions */}
        <div className="bg-white border border-x-0 border-b-0  border-t-gray-50 rounded-3xl shadow-[#00000026] shadow-xl p-6 md:p-8 ">
          <h2 className="font-display text-4xl! md:text-2xl font-bold mb-4">
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
            <h2 className="text-4xl! md:text-2xl font-bold">
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
          <h2 className="font-display text-4xl! md:text-2xl font-bold mb-4">Related Words</h2>
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
            <h2 className="font-display text-4xl! md:text-2xl font-bold mb-4">
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
