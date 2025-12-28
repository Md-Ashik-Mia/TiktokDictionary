"use client";

import { Button } from "@/components/ui/Button";
import { api } from "@/lib/https";
import { useEffect, useState } from "react";

type HashtagTrendItem = {
  hashtag: string;
  uses_this_week: number;
  growth_percent: number;
  label: string;
};

export const AudioHashtagSection = () => {
  const [items, setItems] = useState<{ title: string; subtitle: string }[]>([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();

    async function load() {
      try {
        const res = await api.post<HashtagTrendItem[]>(
          "dictionary/hashtag-trends/",
          { day: 7 },
          { signal: controller.signal }
        );

        const mapped = (res.data ?? [])
          .map((x) => {
            const hashtag = typeof x?.hashtag === "string" ? x.hashtag.trim() : "";
            if (!hashtag) return null;
            const uses = typeof x?.uses_this_week === "number" ? x.uses_this_week : 0;
            const growth = typeof x?.growth_percent === "number" ? x.growth_percent : 0;
            const label = typeof x?.label === "string" ? x.label.trim() : "";

            return {
              title: label
                ? `${hashtag} — ${label}`
                : `${hashtag} — ${uses.toLocaleString()} uses this week`,
              subtitle: `${uses.toLocaleString()} uses this week — ${growth > 0 ? "+" : ""}${growth}%`,
            };
          })
          .filter((v): v is { title: string; subtitle: string } => v !== null);

        if (!alive) return;
        setItems(mapped);
        setExpanded(false);
      } catch {
        if (!alive) return;
        setItems([]);
        setExpanded(false);
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
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display font-bold text-5xl! md:text-[2.2rem] text-[#00336E]">
          Audio / Hashtag Trends
        </h2>
        {!expanded && items.length > 2 ? (
          <Button
            variant="primary"
            size="sm"
            className="rounded-full px-6 py-3.5"
            onClick={() => setExpanded(true)}
          >
            View More →
          </Button>
        ) : null}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {(expanded ? items : items.slice(0, 2)).map((item, i) => (
          <article
            key={i}
            className="rounded-[24px] text-2xl border border-[#000000] bg-white p-8 flex flex-col justify-center gap-1 hover:shadow-md transition-all"
          >
            <h3 className="font-display font-bold text-2xl text-[#000000]">
              {item.title}
            </h3>
            <p className="font-display font-bold text-2xl text-[#000000]">
              {item.subtitle}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
