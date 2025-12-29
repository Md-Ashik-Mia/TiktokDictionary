"use client";

import { api } from "@/lib/https";
import { useEffect, useMemo, useState } from "react";

const subcultureFilters: string[] = [];
const subcultureWords: Array<{ word: string; tag: string }> = [];

type HashtagsResponse = {
  hashtags: string[];
};

type SubcultureWord = {
  id: number;
  word: string;
  category?: { id: number; name: string };
  Hashtags?: string[];
  definitions?: Array<{ id: number; definition: string }>;
};

type SubcultureWordsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: SubcultureWord[];
};

function toRequestHashtag(raw: string) {
  return raw.trim().replace(/^#/, "").toLowerCase();
}

function toDisplayTag(raw: string) {
  const cleaned = raw.trim().replace(/^#/, "");
  if (!cleaned) return raw;
  const spaced = cleaned.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
  // Preserve all-caps / numeric tags as-is.
  if (/^[0-9]+$/.test(spaced) || /^[A-Z0-9\s]+$/.test(spaced)) return spaced;
  return spaced
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w))
    .join(" ");
}

export const SubcultureSection = () => {
  const [tags, setTags] = useState<string[]>(subcultureFilters);
  const [subcultureFilter, setSubcultureFilter] = useState("");
  const [words, setWords] = useState(subcultureWords);

  const selectedTagRaw = useMemo(() => {
    // Find matching raw tag by display label.
    const desired = subcultureFilter.trim().toLowerCase();
    return (
      tags.find((t) => toDisplayTag(t).toLowerCase() === desired) ??
      tags[0] ??
      subcultureFilter
    );
  }, [subcultureFilter, tags]);

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();

    async function loadTags() {
      try {
        // Backend example uses GET; support POST fallback just in case.
        let res: { data: HashtagsResponse };
        try {
          res = await api.get<HashtagsResponse>("dictionary/hashtags/", {
            signal: controller.signal,
            params: { day: 1 },
          });
        } catch {
          res = await api.post<HashtagsResponse>(
            "dictionary/hashtags/",
            { day: 1 },
            { signal: controller.signal }
          );
        }

        const raw = res.data?.hashtags ?? [];
        const cleaned = raw
          .map((t) => (typeof t === "string" ? t.trim() : ""))
          .filter((t) => t.length > 0);

        if (!alive) return;
        setTags(cleaned);
        setSubcultureFilter((prev) => {
          const prevKey = prev.trim().toLowerCase();
          const exists = cleaned.some((t) => toDisplayTag(t).toLowerCase() === prevKey);
          return exists ? prev : toDisplayTag(cleaned[0] ?? "");
        });
      } catch {
        if (!alive) return;
        setTags([]);
        setSubcultureFilter("");
      }
    }

    loadTags();
    return () => {
      alive = false;
      controller.abort();
    };
  }, []);

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();

    async function loadWords() {
      try {
        const hashtag = toRequestHashtag(selectedTagRaw);
        if (!hashtag) return;

        const res = await api.post<SubcultureWordsResponse>(
          "dictionary/subculture-words/",
          { hashtag },
          { signal: controller.signal }
        );

        const mapped = (res.data?.results ?? [])
          .map((w) => {
            const label = toDisplayTag(selectedTagRaw);
            const tag = w?.category?.name ? toDisplayTag(w.category.name) : label;
            return {
              word: w.word,
              tag,
            };
          })
          .filter((x) => x.word.trim().length > 0);

        if (!alive) return;
        setWords(mapped);
      } catch {
        if (!alive) return;
        setWords([]);
      }
    }

    loadWords();
    return () => {
      alive = false;
      controller.abort();
    };
  }, [selectedTagRaw]);

  return (
    <section className="max-w-6xl mx-auto px-6">
      <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-[2.2rem] text-[#00336E] mb-6">
        Subculture Words
      </h2>

      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((raw) => {
          const item = toDisplayTag(raw);
          return (
          <button
            key={raw}
            onClick={() => setSubcultureFilter(item)}
            className={`px-5 py-2 rounded-full text-[16px] font-bold transition-all ${
              subcultureFilter === item
                ? "bg-[#00336E] text-white border border-[#00336E]"
                : "bg-slate-100 text-[#00336E] border border-transparent hover:bg-slate-200"
            }`}
          >
            {item}
          </button>
          );
        })}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {words.map((item) => (
          <article
            key={item.word}
            className="rounded-[24px] border border-[#00336E] bg-white p-6 flex flex-col justify-between min-h-[140px] hover:shadow-md transition-all"
          >
            <h3 className="font-display font-bold text-2xl text-[#000000]">
              {item.word}
            </h3>
            <div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#00336E0D] text-[#769ECC] uppercase tracking-wide">
                {item.tag}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
