import { Button } from "@/components/ui/Button";

const audioHashtags = [
  {
    title: "#delulu — 88k uses this week",
    subtitle: "\"Bombastic side eye\" audio — +540%",
  },
  {
    title: "#girldinner — trending",
    subtitle: "#NPC — resurging",
  },
];

export const AudioHashtagSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display font-bold !text-5xl md:text-[2.2rem] text-[#00336E]">
          Audio / Hashtag Trends
        </h2>
        <Button variant="primary" size="sm" className="rounded-full px-6 py-3.5">
          View More →
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {audioHashtags.map((item, i) => (
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
