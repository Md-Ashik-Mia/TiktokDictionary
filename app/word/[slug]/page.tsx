
"use client";

import { SubmitCTA } from "@/components/common/SubmitCTA";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { api, userApi } from "@/lib/https";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import {
  FiChevronRight,
  FiX,
} from "react-icons/fi";
import { MdInfo } from "react-icons/md";

type OriginItem = { by: string; date: string };
type AltDef = {
  id: number;
  text: string;
  likes: number;
  dislikes: number;
  isLikedByMe: boolean;
  isDislikedByMe: boolean;
};

type ApiResponseItem = {
  id: number;
  is_like: boolean;
  is_dislike: boolean;
  user?: string | number;
  created_at?: string;
};

type UserReaction = {
  responseId?: number;
  is_like: boolean;
  is_dislike: boolean;
};

type UserResponseRecord = {
  id: number;
  is_like: boolean;
  is_dislike: boolean;
  comments_text?: string;
  created_at?: string;
  definition: number;
  word?: number;
  user?: number | string;
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

type CreateDefinitionResponse = {
  id: number;
  definition: string;
  example_sentence: string | null;
  word: number;
  word_name: string;
  user: string | number | null;
  count_user: number;
  created_at: string;
};

function isApiWord(value: unknown): value is ApiWord {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "number" &&
    typeof v.word === "string" &&
    v.word.trim().length > 0
  );
}

function unwrapWordResponse(data: unknown): ApiWord | null {
  if (!data || typeof data !== "object") return null;
  const maybe = data as Record<string, unknown>;
  const results = maybe.results;
  if (Array.isArray(results) && results.length > 0) {
    const first = results[0];
    if (isApiWord(first)) return first;
  }
  return isApiWord(data) ? data : null;
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

function getStoredUserId(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { id?: unknown };
    const id = typeof parsed?.id === "number" ? parsed.id : Number(parsed?.id);
    return Number.isFinite(id) ? id : null;
  } catch {
    return null;
  }
}

function isSameUser(a: string | number | undefined, userId: number | null) {
  if (userId == null) return false;
  if (typeof a === "number") return a === userId;
  if (typeof a === "string") return a === String(userId);
  return false;
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

  const [isLoadingWord, setIsLoadingWord] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [wordData, setWordData] = useState<ApiWord | null>(null);

  const [myReactions, setMyReactions] = useState<Record<number, UserReaction>>({});
  const myUserId = useMemo(() => getStoredUserId(), []);

  const [meaning, setMeaning] = useState("");
  const [meaningError, setMeaningError] = useState("");
  const [isSubmittingMeaning, setIsSubmittingMeaning] = useState(false);
  const [submittedMeaning, setSubmittedMeaning] = useState<CreateDefinitionResponse | null>(null);
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
        setIsLoadingWord(true);
        setNotFound(false);
        const idParam = searchParams?.get("id");
        const directId = idParam ? Number(idParam) : NaN;

        const wordId = Number.isFinite(directId)
          ? directId
          : await resolveIdBySearch(word);

        if (!wordId) {
          if (!alive) return;
          setWordData(null);
          setNotFound(true);
          return;
        }

        const data = await fetchById(wordId);
        if (!alive) return;
        setWordData(data);
        setNotFound(!data);
      } catch {
        if (!alive) return;
        setWordData(null);
        setNotFound(true);
      } finally {
        if (alive) setIsLoadingWord(false);
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
  const mainDefId = mainDef?.id;

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

  const mainLikedByMe = mainDefId ? myReactions[mainDefId]?.is_like === true : false;
  const mainDislikedByMe = mainDefId ? myReactions[mainDefId]?.is_dislike === true : false;

  const altDefs: AltDef[] = useMemo(() => {
    const fallback: AltDef[] = [
      {
        id: -1,
        text: "Game or charisma used to impress someone.",
        likes: 1120,
        dislikes: 90,
        isLikedByMe: false,
        isDislikedByMe: false,
      },
      {
        id: -2,
        text: "Smooth talking mentality.",
        likes: 320,
        dislikes: 40,
        isLikedByMe: false,
        isDislikedByMe: false,
      },
      {
        id: -3,
        text: "Flirty confidence energy.",
        likes: 143,
        dislikes: 15,
        isLikedByMe: false,
        isDislikedByMe: false,
      },
    ];

    const defs = definitions;
    if (defs.length === 0) return fallback;

    return defs.slice(0, 4).map((d) => {
      const { likes, dislikes } = countLikesDislikes(d);
      const mine = myReactions[d.id];
      return {
        id: d.id,
        text: d.definition,
        likes,
        dislikes,
        isLikedByMe: mine?.is_like === true,
        isDislikedByMe: mine?.is_dislike === true,
      };
    });
  }, [definitions, myReactions]);

  // Load my existing reactions (so buttons show active state)
  useEffect(() => {
    let alive = true;
    const controller = new AbortController();

    async function loadMyReactions() {
      if (!myUserId) return;
      const ids = new Set(definitions.map((d) => d.id));
      if (ids.size === 0) return;

      try {
        const res = await userApi.get<UserResponseRecord[]>("user-response/responses/", {
          signal: controller.signal,
        });
        const list = Array.isArray(res.data) ? res.data : [];

        const byDef: Record<number, UserReaction> = {};
        for (const r of list) {
          if (!r || typeof r.definition !== "number") continue;
          if (!ids.has(r.definition)) continue;
          if (!isSameUser(r.user, myUserId)) continue;

          const prev = byDef[r.definition];
          const prevTime = prev?.responseId ? 1 : 0;
          const nextTime = r.created_at ? Date.parse(r.created_at) : 0;
          // Prefer the most recent record if available.
          if (!prev || nextTime >= prevTime) {
            byDef[r.definition] = {
              responseId: r.id,
              is_like: !!r.is_like,
              is_dislike: !!r.is_dislike,
            };
          }
        }

        if (!alive) return;
        setMyReactions(byDef);
      } catch {
        // Keep empty reactions on error.
      }
    }

    loadMyReactions();
    return () => {
      alive = false;
      controller.abort();
    };
  }, [definitions, myUserId]);

  async function upsertReaction(definitionId: number, next: UserReaction) {
    const payload = {
      definition: definitionId,
      is_like: next.is_like,
      is_dislike: next.is_dislike,
      "comments_text": "",
    };

    // Prefer PATCH if we know an existing response id; fall back to POST.
    if (next.responseId) {
      try {
        await userApi.patch(`user-response/responses/${next.responseId}/`, payload);
        return;
      } catch {
        // fall through
      }
    }

    await userApi.post("user-response/responses/", payload);
  }

  function applyOptimisticReaction(definitionId: number, next: UserReaction) {
    setMyReactions((prev) => ({
      ...prev,
      [definitionId]: next,
    }));

    setWordData((prev) => {
      if (!prev) return prev;
      const defs = (prev.definitions ?? prev.definations ?? []).map((d) => {
        if (d.id !== definitionId) return d;
        const responses = Array.isArray(d.responses) ? [...d.responses] : [];
        const idx = responses.findIndex((r) => isSameUser(r.user, myUserId));
        if (idx >= 0) {
          responses[idx] = {
            ...responses[idx],
            is_like: next.is_like,
            is_dislike: next.is_dislike,
          };
        } else {
          responses.push({
            id: next.responseId ?? -Date.now(),
            is_like: next.is_like,
            is_dislike: next.is_dislike,
            user: myUserId ?? "me",
          });
        }
        return { ...d, responses };
      });

      // Keep top-level totals in sync if they exist and we're reacting on the main definition.
      if (mainDefId && definitionId === mainDefId) {
        const updatedMain = defs.find((d) => d.id === mainDefId);
        const counts = updatedMain ? countLikesDislikes(updatedMain) : null;
        return {
          ...prev,
          definitions: prev.definitions ? defs : prev.definitions,
          definations: prev.definations ? defs : prev.definations,
          total_likes: counts ? counts.likes : prev.total_likes,
          total_dislikes: counts ? counts.dislikes : prev.total_dislikes,
        };
      }

      return {
        ...prev,
        definitions: prev.definitions ? defs : prev.definitions,
        definations: prev.definations ? defs : prev.definations,
      };
    });
  }

  async function handleReactionClick(definitionId: number, kind: "like" | "dislike") {
    if (!myUserId) {
      // Not logged in; userApi will redirect on 401.
      window.location.href = "/login";
      return;
    }

    const current = myReactions[definitionId];
    const togglingOff =
      (kind === "like" && current?.is_like) || (kind === "dislike" && current?.is_dislike);

    const next: UserReaction = {
      responseId: current?.responseId,
      is_like: togglingOff ? false : kind === "like",
      is_dislike: togglingOff ? false : kind === "dislike",
    };

    applyOptimisticReaction(definitionId, next);
    try {
      await upsertReaction(definitionId, next);
    } catch {
      // Revert on failure.
      applyOptimisticReaction(definitionId, current ?? { is_like: false, is_dislike: false });
    }
  }

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

  const handleMeaningSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = meaning.trim();
    if (!trimmed) return;
    setMeaningError("");

    const wordId = wordData?.id;
    if (!wordId) {
      setMeaningError("Word details not loaded yet.");
      return;
    }

    setIsSubmittingMeaning(true);
    try {
      const res = await userApi.post<CreateDefinitionResponse>(
        "dictionary/definations/",
        {
          word: wordId,
          definition: trimmed,
          example_sentence: null,
        }
      );

      setSubmittedMeaning(res.data);
      setShowDupModal(true);
      setMeaning("");

      // Refresh definitions so the new one appears immediately.
      const refreshed = await api.post<unknown>("dictionary/get-words/", {
        word_id: wordId,
      });
      setWordData(unwrapWordResponse(refreshed.data));
    } catch (err: unknown) {
      const maybeErr = err as {
        response?: { data?: { message?: string; error?: string } };
        message?: string;
      };
      setMeaningError(
        maybeErr.response?.data?.message ||
          maybeErr.response?.data?.error ||
          maybeErr.message ||
          "Failed to submit definition."
      );
    } finally {
      setIsSubmittingMeaning(false);
    }
  };

  const modalCountUser = submittedMeaning?.count_user ?? 0;

  return (
    <main className="min-h-screen flex flex-col bg-white text-[#0f2d5c]">
      {/* Hero background split */}
      <div className="relative">
        <div className="bg-[#e9f2ff] pb-80 pt-24 sm:pt-28">
          <Navbar />
        </div>
        <div
          className="absolute inset-x-0 top-[90%] bottom-0 bg-white"
          aria-hidden
        />
        <section className="relative max-w-6xl mx-auto px-6 -mt-24 ">
          {!isLoadingWord && notFound ? (
            <div className="bg-white rounded-3xl shadow-md shadow-[#00000026] p-8 md:p-10 text-center">
              <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f2d5c]">
                {title}
              </h1>
              <p className="mt-4 text-lg text-[#00336E]">
                This word is not present in the dictionary.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-md shadow-[#00000026]  p-6 md:p-8">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <h1 className="font-display text-4xl sm:text-5xl md:text-5xl font-extrabold tracking-tight">
                  {titleCase(displayWord)}
                </h1>
              </div>

              <p className="mt-3 text-lg text-[#00336E]">{displayDefinition}</p>
              <p className="mt-2 text-lg text-[#00336E]">{displayExample}</p>

              <div className="mt-4 flex items-center gap-5 text-[#000000]">
                <button
                  type="button"
                  onClick={() => (mainDefId ? handleReactionClick(mainDefId, "like") : undefined)}
                  className={`inline-flex font-bold items-center gap-1 text-sm ${
                    mainLikedByMe ? "text-[#00336E]" : "text-[#000000]"
                  }`}
                >
                  <AiOutlineLike /> {displayLikes.toLocaleString()}
                </button>
                <button
                  type="button"
                  onClick={() => (mainDefId ? handleReactionClick(mainDefId, "dislike") : undefined)}
                  className={`inline-flex font-bold items-center gap-1 text-sm ${
                    mainDislikedByMe ? "text-[#00336E]" : "text-[#000000]"
                  }`}
                >
                  <AiOutlineDislike /> {displayDislikes.toLocaleString()}
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
      {!isLoadingWord && notFound ? null : (
      <section className="max-w-6xl mx-auto px-6 py-10 space-y-10 ">
        {/* Alternate Definitions */}
        <div id="definitions" className="bg-white border border-x-0 border-b-0  border-t-gray-50 rounded-3xl shadow-[#00000026] shadow-xl p-6 md:p-8 ">
          <h2 className="font-display text-2xl sm:text-3xl md:text-2xl font-bold mb-4">
            Alternate Definitions
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {altDefs.map((item) => (
              <div
                key={item.id}
                className="rounded-xl  bg-[#00336E0D] py-8 pl-2 flex flex-col justify-between"
              >
                <p className="text-lg text-[#123a7a] leading-relaxed">
                  {`"` + item.text + `"`}
                </p>
                <div className="mt-3 flex items-center gap-4 text-xs text-[#0f2d5c]">
                  <button
                    type="button"
                    onClick={() => (item.id > 0 ? handleReactionClick(item.id, "like") : undefined)}
                    className={`inline-flex text-sm font-bold items-center gap-1 ${
                      item.isLikedByMe ? "text-[#00336E]" : "text-[#0f2d5c]"
                    }`}
                  >
                    <AiOutlineLike /> {item.likes}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      item.id > 0 ? handleReactionClick(item.id, "dislike") : undefined
                    }
                    className={`inline-flex text-sm font-bold items-center gap-1 ${
                      item.isDislikedByMe ? "text-[#00336E]" : "text-[#0f2d5c]"
                    }`}
                  >
                    <AiOutlineDislike /> {item.dislikes}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleMeaningSubmit}
            className="bg-white mt-8  rounded-3xl   space-y-4"
          >
            <h2 className="text-2xl sm:text-3xl md:text-2xl font-bold">
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
            {meaningError ? (
              <p className="text-sm text-red-600">{meaningError}</p>
            ) : null}
            <button
              type="submit"
              disabled={isSubmittingMeaning}
              className="h-10 px-5 rounded-full bg-[#0f2d5c] text-white text-sm font-semibold hover:bg-[#0d264d] transition inline-flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmittingMeaning ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>

        {/* Your meaning form */}

        {/* Related Words */}
        <div className="bg-white border border-x-0 border-b-0  border-t-gray-50 rounded-3xl shadow-[#00000026] shadow-xl  p-6 md:p-8 ">
          <h2 className="font-display text-2xl sm:text-3xl md:text-2xl font-bold mb-4">Related Words</h2>
          <div className="flex flex-wrap gap-3 sm:gap-6">
            {related.map((r, idx) => (
              <span
                key={idx}
                className="px-4 py-4 w-full sm:w-[48%] md:w-1/4 rounded-xl bg-[#f3f7ff] text-base sm:text-[18px] text-[#0f2d5c]"
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
            <h2 className="font-display text-2xl sm:text-3xl md:text-2xl font-bold mb-4">
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
      </section>
      )}
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
              {modalCountUser} People Already Submitted This Word Today.
            </h3>
            <p className="mt-2 text-sm text-[#4a628a]">
              Here are existing definitions — want to continue?
            </p>
            <div className="mt-4 flex gap-3 flex-wrap justify-center">
              <button
                onClick={() => {
                  setShowDupModal(false);
                  const el = document.getElementById("definitions");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="px-4 py-2 rounded-full border border-[#0f2d5c] text-[#0f2d5c] text-sm font-semibold inline-flex items-center gap-2 hover:bg-[#f3f7ff] transition"
              >
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
