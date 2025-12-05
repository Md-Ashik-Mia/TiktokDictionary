import { AiOutlineLike } from "react-icons/ai";
export const MostAgreed = () => {
  const items = [
    {
      label: "Vibe Check",
      badge: "Top Definition",
      accuracy: 91,
      description:
        "Assessing someone's energy, mood, or overall presence. Can also mean checking if a situation feels right.",
      votes: 2847,
    },
    {
      label: "Main Character",
      badge: "Highly Agreed",
      accuracy: 93,
      description:
        "Acting like you're the protagonist of your own life. Living boldly and confidently as if the world revolves around you.",
      votes: 2156,
    },
    {
      label: "Slay",
      badge: "Community Approved",
      accuracy: 87,
      description:
        "To do something exceptionally well or look amazing. Giving your absolute best.",
      votes: 1589,
    },
  ];

  return (
    <div className="min-w-6xl  ">
      <div className="">
        {/* Heading + description */}
        <h2 className="font-display font-bold text-4xl md:text-[3rem] text-brand-dark">
          Most Agreed Definitions
        </h2>

        <p className="text-sm text-slate-600 mt-1 mb-6">
          Definitions voted accurate by the community.
        </p>

        {/* Cards */}
        <div className="flex flex-col gap-5">
          {items.map((item) => (
            <article
              key={item.label}
              className="w-full rounded-2xl bg-white shadow-card px-6 py-5 border border-slate-200 flex flex-col md:flex-row justify-between gap-4"
            >
              {/* LEFT */}
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-2xl text-brand-dark">
                    {item.label}
                  </h3>
                  <span className="text-[12px] px-3 py-0.5 rounded-full bg-[#C5FFC9] text-[#29AA32] border
                  font-bold border-[#29AA32]">
                    {item.badge}
                  </span>
                </div>

                <p className="mt-2 text-[12px] text-slate-600 ">
                  {item.description}
                </p>

                <p className="mt-2 text-[12px] text-slate-600">
                  <AiOutlineLike className="inline mr-1" /> {item.votes.toLocaleString()} agreed
                </p>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col items-end min-w-[100px]">
                <span className="text-[11px] uppercase text-slate-500 tracking-wide">
                  accuracy
                </span>
                <span className="text-3xl font-bold text-brand-dark">
                  {item.accuracy}%
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
