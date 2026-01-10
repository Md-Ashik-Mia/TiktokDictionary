"use client";

import { api } from "@/lib/https";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

type ControversialCard = {
  word: string;
  reason: string;
  likes: number;
  dislikes: number;
  wordId?: number;
};

type ControversialApiDefinitionStats = {
  definition?: string;
  likes?: number;
  dislikes?: number;
};

type ControversialApiItem = {
  word?: string;
  word_id?: number;
  total_likes?: number | string;
  total_dislikes?: number | string;
  definitions?: ControversialApiDefinitionStats[];
  controversy_score?: number;
};

type ControversialApiResponse = ControversialApiItem[];

function toSafeCount(value: unknown): number {
  const n = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  return Number.isFinite(n) ? n : 0;
}

function wordToSlug(word: string) {
  const normalized = word.trim().replace(/\s+/g, "-");
  return encodeURIComponent(normalized);
}

export const ControversialSection = () => {
  const router = useRouter();
  const [items, setItems] = useState<ControversialCard[]>([]);

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();

    async function load() {
      try {
        const res = await api.post<ControversialApiResponse>(
          "dictionary/most-controversial/",
          { day: "1" },
          { signal: controller.signal }
        );

        const data = Array.isArray(res.data) ? res.data : [];
        const mapped: ControversialCard[] = data
          .map((payload) => {
            const word = typeof payload?.word === "string" ? payload.word.trim() : "";
            const wordId = typeof payload?.word_id === "number" ? payload.word_id : undefined;
            const topDef = Array.isArray(payload?.definitions) ? payload.definitions[0] : undefined;

            const totalLikes = toSafeCount(payload?.total_likes);
            const totalDislikes = toSafeCount(payload?.total_dislikes);
            const likes = typeof topDef?.likes === "number" ? topDef.likes : totalLikes;
            const dislikes = typeof topDef?.dislikes === "number" ? topDef.dislikes : totalDislikes;
            const reason =
              typeof topDef?.definition === "string" && topDef.definition.trim()
                ? topDef.definition.trim()
                : "Highly debated meaning";

            return { word, reason, likes, dislikes, wordId };
          })
          .filter((x) => x.word.length > 0);

        if (!alive) return;
        setItems(mapped);
      } catch {
        if (!alive) return;
        setItems([]);
      }
    }

    load();
    return () => {
      alive = false;
      controller.abort();
    };
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6">
      <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-[2.2rem] text-[#00336E] mb-8">
        Most Controversial
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <article
            key={item.word}
            className=" rounded-[24px] border border-[#00336E] bg-white p-6 hover:shadow-md transition-all cursor-pointer"
            role="link"
            tabIndex={0}
            onClick={() => {
              const trimmed = item.word.trim();
              if (!trimmed) return;
              const slug = wordToSlug(trimmed);
              router.push(
                `/word/${item.wordId}`
                // typeof item.wordId === "number"
                //   ? `/word/${slug}?id=${encodeURIComponent(String(item.wordId))}`
                //   : `/word/${slug}`
              );
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                const trimmed = item.word.trim();
                if (!trimmed) return;
                const slug = wordToSlug(trimmed);
                router.push(
                  typeof item.wordId === "number"
                    ? `/word/${slug}?id=${encodeURIComponent(String(item.wordId))}`
                    : `/word/${slug}`
                );
              }
            }}
          >
            <h3 className="font-display font-bold text-2xl text-[#000000] mb-2">
              {item.word}
            </h3>
            <p className="text-[16px] text-[#000000] mb-4">
              Reason: {item.reason}
            </p>
            <div className="flex items-center gap-6 text-sm font-bold text-[#000000]">
              <div className="flex items-center gap-1.5">
                <AiOutlineLike className="text-lg" /> {item.likes}
              </div>
              <div className="flex items-center gap-1.5">
                <AiOutlineDislike className="text-lg" /> {item.dislikes}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
