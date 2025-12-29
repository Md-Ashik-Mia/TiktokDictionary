"use client";

import { api } from "@/lib/https";
import { useEffect, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

type ControversialCard = {
  word: string;
  reason: string;
  likes: number;
  dislikes: number;
};

type ControversialApiDefinitionStats = {
  likes: number;
  dislikes: number;
};

type ControversialApiItem = {
  total_likes?: number | string;
  total_dislikes?: number | string;
  _total_likes?: number | string;
  _total_dislikes?: number | string;
  definitions: Record<string, ControversialApiDefinitionStats>;
  controversy_score: number;
};

type ControversialApiResponse = Record<string, ControversialApiItem>;

function toSafeCount(value: unknown): number {
  const n = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  return Number.isFinite(n) ? n : 0;
}

export const ControversialSection = () => {
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

        const data = res.data ?? ({} as ControversialApiResponse);
        const mapped: ControversialCard[] = Object.entries(data)
          .map(([word, payload]) => {
            const firstDef = Object.keys(payload?.definitions ?? {})[0] ?? "";
            const defStats = firstDef ? payload?.definitions?.[firstDef] : undefined;
            const totalLikes = toSafeCount(payload?.total_likes ?? payload?._total_likes);
            const totalDislikes = toSafeCount(payload?.total_dislikes ?? payload?._total_dislikes);
            const likes =
              typeof defStats?.likes === "number"
                ? defStats.likes
                : totalLikes;
            const dislikes =
              typeof defStats?.dislikes === "number"
                ? defStats.dislikes
                : totalDislikes;
            return {
              word,
              reason: firstDef || "Highly debated meaning",
              likes,
              dislikes,
            };
          })
          .filter((x) => x.word.trim().length > 0);

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
            className=" rounded-[24px] border border-[#00336E] bg-white p-6 hover:shadow-md transition-all"
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
