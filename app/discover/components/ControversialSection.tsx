import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

const controversial = [
  {
    word: "NPC Streamer",
    reason: "Highly debated meaning",
    up: "51%",
    down: "49%",
  },
  {
    word: "Quiet Luxury",
    reason: "Conflicting interpretations",
    up: "54%",
    down: "46%",
  },
];

export const ControversialSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-6">
      <h2 className="font-display font-bold text-2xl md:text-[2.2rem] text-[#00336E] mb-8">
        Most Controversial
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {controversial.map((item) => (
          <article
            key={item.word}
            className="rounded-[24px] border border-[#00336E] bg-white p-6 hover:shadow-md transition-all"
          >
            <h3 className="font-display font-bold text-xl text-[#00336E] mb-2">
              {item.word}
            </h3>
            <p className="text-sm text-[#00336E]/70 mb-4">
              Reason: {item.reason}
            </p>
            <div className="flex items-center gap-6 text-sm font-semibold text-[#00336E]">
              <div className="flex items-center gap-1.5">
                <AiOutlineLike className="text-lg" /> {item.up}
              </div>
              <div className="flex items-center gap-1.5">
                <AiOutlineDislike className="text-lg" /> {item.down}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
