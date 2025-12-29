"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";

import { api } from "@/lib/https";

type WordDefinition = {
  id: number;
  definition: string;
  example_sentence?: string;
  responses?: Array<{ is_like: boolean; is_dislike: boolean }>;
};

type WordResult = {
  id: number;
  word: string;
  category?: { id: number; name: string };
  total_likes?: number;
  total_dislikes?: number;
  definitions?: WordDefinition[];
};

type GetWordsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: WordResult[];
};

function wordToSlug(word: string) {
  const normalized = word.trim().replace(/\s+/g, "-");
  return encodeURIComponent(normalized);
}

function dedupeByWord(results: WordResult[]) {
  const seen = new Set<string>();
  const out: WordResult[] = [];
  for (const item of results) {
    const key = item.word?.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

function prioritizeExactMatch(results: WordResult[], search: string) {
  const q = search.trim().toLowerCase();
  if (!q) return results;
  const exactIndex = results.findIndex(
    (r) => r.word?.trim().toLowerCase() === q
  );
  if (exactIndex <= 0) return results;
  const exact = results[exactIndex];
  return [exact, ...results.slice(0, exactIndex), ...results.slice(exactIndex + 1)];
}

function pickBestResult(results: WordResult[], search: string) {
  const q = search.trim().toLowerCase();
  if (!q) return results[0];
  return (
    results.find((r) => r.word?.trim().toLowerCase() === q) ?? results[0]
  );
}

export function WordSearch({ placeholder }: { placeholder?: string }) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const enterSearchInFlightRef = useRef(false);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [results, setResults] = useState<WordResult[]>([]);

  const trimmed = useMemo(() => query.trim(), [query]);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      const el = containerRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }

    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  useEffect(() => {
    if (!trimmed) {
      setResults([]);
      setLoading(false);
      setActiveIndex(-1);
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        setLoading(true);
        const res = await api.get<GetWordsResponse>("dictionary/get-words/", {
          params: { search: trimmed },
          signal: controller.signal,
        });

        const list = prioritizeExactMatch(
          dedupeByWord(res.data?.results ?? []),
          trimmed
        ).slice(0, 8);
        setResults(list);
        setOpen(true);
        setActiveIndex(-1);
      } catch {
        if (controller.signal.aborted) return;
        setResults([]);
        setOpen(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 250);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [trimmed]);

  function navigateToWord(word: string, id?: number) {
    if (!word?.trim()) return;
    setOpen(false);
    setActiveIndex(-1);
    const slug = wordToSlug(word);
    router.push(
      id ? `/word/${slug}?word_id=${encodeURIComponent(String(id))}` : `/word/${slug}`
    );
  }

  async function searchOnce(search: string) {
    const res = await api.get<GetWordsResponse>("dictionary/get-words/", {
      params: { search },
    });
    const list = dedupeByWord(res.data?.results ?? []);
    return prioritizeExactMatch(list, search);
  }

  async function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();

      const chosen =
        activeIndex >= 0
          ? results[activeIndex]
          : pickBestResult(results, trimmed);
      if (chosen?.word) {
        navigateToWord(chosen.word, chosen.id);
        return;
      }

      if (!trimmed || enterSearchInFlightRef.current) return;
      enterSearchInFlightRef.current = true;

      try {
        setLoading(true);
        const list = (await searchOnce(trimmed)).slice(0, 8);
        setResults(list);
        setOpen(true);
        setActiveIndex(-1);

        const best = pickBestResult(list, trimmed);
        if (best?.word) navigateToWord(best.word, best.id);
      } catch {
        setResults([]);
        setOpen(true);
      } finally {
        setLoading(false);
        enterSearchInFlightRef.current = false;
      }
    }
  }

  const showDropdown = open && (loading || results.length > 0 || !!trimmed);

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      <div className="flex w-full items-center rounded-full bg-white px-5 py-3 shadow-card">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (trimmed) setOpen(true);
          }}
          onKeyDown={onKeyDown}
          className="flex-1 min-w-0 h-10 border-none bg-transparent text-sm outline-none placeholder:text-slate-400"
          placeholder={placeholder ?? "Search for a word"}
          role="combobox"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
          aria-controls="word-search-listbox"
        />
        <CiSearch className="text-xl text-slate-500" />
      </div>

      {showDropdown && (
        <div
          className="absolute left-0 right-0 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card"
          role="listbox"
          id="word-search-listbox"
        >
          {loading && (
            <div className="px-4 py-3 text-sm text-slate-500">Searching…</div>
          )}

          {!loading && results.length === 0 && trimmed && (
            <div className="px-4 py-3 text-sm text-slate-500">
              No matches found.
            </div>
          )}

          {!loading &&
            results.map((item, idx) => {
              const preview = item.definitions?.[0]?.definition;
              const selected = idx === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => navigateToWord(item.word, item.id)}
                  className={
                    "w-full text-left px-4 py-3 transition " +
                    (selected ? "bg-slate-50" : "bg-white hover:bg-slate-50")
                  }
                  role="option"
                  aria-selected={selected}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-slate-900">
                      {item.word}
                    </div>
                    {item.category?.name && (
                      <span className="text-xs text-slate-500">
                        {item.category.name}
                      </span>
                    )}
                  </div>
                  {preview && (
                    <div className="mt-1 line-clamp-1 text-xs text-slate-500">
                      {preview}
                    </div>
                  )}
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
}
