"use client";

import { api } from "@/lib/https";
import { useEffect, useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

type MemeCard = {
  word: string;
  tag: string;
};

type MemeApiDefinition = {
  definition_id?: number;
  definition?: string;
  likes?: number;
};

type MemeApiItem = {
  word?: string;
  category?: string;
  total_likes?: number | string;
  definition?: MemeApiDefinition[] | MemeApiDefinition;
  definitions?: MemeApiDefinition[];
};

type MemeApiResponse = MemeApiItem[];

function toSafeCount(value: unknown): number {
  const n = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  return Number.isFinite(n) ? n : 0;
}

export const MemeSection = () => {
  const [memeIndex, setMemeIndex] = useState(0);
  const [items, setItems] = useState<MemeCard[]>([]);

  const getVisibleItems = <T,>(items: T[], startIndex: number, count: number) => {
    if (items.length === 0) return [];
    if (items.length <= count) return items;
    return new Array(count).fill(0).map((_, i) => items[(startIndex + i) % items.length]);
  };

  const nextSlide = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    length: number
  ) => {
    setter((prev) => (prev + 1) % length);
  };

  const prevSlide = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    length: number
  ) => {
    setter((prev) => (prev - 1 + length) % length);
  };

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();

    async function load() {
      try {
        let data: MemeApiResponse | null = null;
        try {
          // Prefer GET with day param (matches your Postman screenshot); fall back to POST.
          const res = await api.get<MemeApiResponse>("dictionary/meme-of-weekend/", {
            signal: controller.signal,
            params: { day: 1 },
          });
          data = res.data ?? null;
        } catch {
          const res = await api.post<MemeApiResponse>(
            "dictionary/meme-of-weekend/",
            { day: 1 },
            { signal: controller.signal }
          );
          data = res.data ?? null;
        }

        const list = Array.isArray(data) ? data : [];

        const mapped: MemeCard[] = list
          .map((payload) => {
            const word = typeof payload?.word === "string" ? payload.word.trim() : "";
            const category = typeof payload?.category === "string" ? payload.category.trim() : "";
            const likes = toSafeCount(payload?.total_likes);
            const tag = (category || "Meme").toUpperCase();

            // If backend doesn't provide a category, keep a meaningful fallback.
            const safeTag = tag === "MEME" && likes > 0 ? "MEME" : tag;
            return { word, tag: safeTag };
          })
          .filter((x) => x.word.trim().length > 0);

        if (!alive) return;
        setItems(mapped);
        setMemeIndex(0);
      } catch {
        if (!alive) return;
        setItems([]);
        setMemeIndex(0);
      }
    }

    load();
    return () => {
      alive = false;
      controller.abort();
    };
  }, []);

  const canSlide = items.length > 1;
  const visible = getVisibleItems(items, memeIndex, 3);

  return (
    <section className="bg-[#EFF6FE] py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-[3.2rem] leading-none text-[#00336E]">
            Meme Words Of The Week
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => (canSlide ? prevSlide(setMemeIndex, items.length) : undefined)}
              disabled={!canSlide}
              aria-label="Previous"
              className="text-[#00336E] hover:text-[#00336E]/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IoIosArrowDropleft size={40} />
            </button>
            <button
              onClick={() => (canSlide ? nextSlide(setMemeIndex, items.length) : undefined)}
              disabled={!canSlide}
              aria-label="Next"
              className="text-[#00336E] hover:text-[#00336E]/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IoIosArrowDropright size={40} />
            </button>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {visible.map((item, i) => (
            <article
              key={`${item.word}-${i}`}
              className="rounded-[18px] border border-[#00336E] bg-transparent p-6 flex flex-col justify-between min-h-[108px]"
            >
              <h3 className="font-display font-bold text-2xl text-[#000000] leading-tight">
                {item.word}
              </h3>

              <div className="mt-4">
                <span className="inline-flex items-center rounded-full bg-[#E8EDF3] px-4 py-1.5 text-[12px] font-bold text-[#000000] uppercase tracking-wide">
                  {item.tag}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
