"use client";

import { api } from "@/lib/https";
import { useEffect, useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

type MemeCard = {
  word: string;
  tag: string;
};

type MemeApiItem = {
  total_likes?: number | string;
  ddefinition?: Record<string, number | string>;
  definition?: Record<string, number | string>;
};

type MemeApiResponse = Record<string, MemeApiItem>;

function toSafeCount(value: unknown): number {
  const n = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  return Number.isFinite(n) ? n : 0;
}

export const MemeSection = () => {
  const [memeIndex, setMemeIndex] = useState(0);
  const [items, setItems] = useState<MemeCard[]>([]);

  const getVisibleItems = <T,>(items: T[], startIndex: number, count: number) => {
    return new Array(count)
      .fill(0)
      .map((_, i) => items[(startIndex + i) % items.length]);
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
          const res = await api.post<MemeApiResponse>(
            "dictionary/meme-of-weekend/",
            { day: 1 },
            { signal: controller.signal }
          );
          data = res.data ?? null;
        } catch {
          const res = await api.get<MemeApiResponse>("dictionary/meme-of-weekend/", {
            signal: controller.signal,
            params: { day: 1 },
          });
          data = res.data ?? null;
        }

        const mapped: MemeCard[] = Object.entries(data ?? {})
          .map(([word, payload]) => {
            const likes = toSafeCount(payload?.total_likes);
            const tag = likes > 0 ? `${likes} likes` : "Meme";
            return { word, tag };
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

  return (
    <section className="bg-[#EFF6FE] py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display font-bold text-5xl! md:text-[2.2rem] text-[#00336E]">
            Meme Words Of The Week
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => (canSlide ? prevSlide(setMemeIndex, items.length) : undefined)}
              disabled={!canSlide}
              className="text-[#00336E] hover:text-[#00336E]/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IoIosArrowDropleft size={40} />
            </button>
            <button
              onClick={() => (canSlide ? nextSlide(setMemeIndex, items.length) : undefined)}
              disabled={!canSlide}
              className="text-[#00336E] hover:text-[#00336E]/80 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IoIosArrowDropright size={40} />
            </button>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {items.length === 0
            ? null
            : getVisibleItems(items, memeIndex, Math.min(3, items.length)).map((item, i) => (
            <article
              key={`${item.word}-${i}`}
              className="rounded-[24px] border border-[#00336E] bg-white p-6 flex flex-col justify-between hover:shadow-md transition-all"
            >
              <h3 className="font-display font-bold text-2xl text-[#000000]">
                {item.word}
              </h3>
              <div>
                <span className="font-bold font-display px-3 py-2 rounded-xl bg-[#00336E1A] text-[#000000]  text-[12px]  uppercase tracking-wide">
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
