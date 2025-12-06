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
        <h2 className="font-display font-bold lg:text-6xl md:text-[3.2rem] leading-none text-[#00336E]">
          Most Agreed Definitions
        </h2>

        <p className="my-4 font-sans text-lg text-[#00336E]">
          Definitions voted accurate by the community.
        </p>

        {/* Cards */}
        <div className="flex flex-col gap-5">
          {items.map((item) => (
            <article
              key={item.label}
              className="w-full rounded-2xl bg-white shadow-card px-6 py-5 border border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4"
            >
              {/* LEFT */}
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-2xl text-[#00336E]">
                    {item.label}
                  </h3>
                  <span className="text-[12px] px-3 py-0.5 rounded-full bg-[#C5FFC9] text-[#29AA32] border
                  font-bold border-[#29AA32]">
                    {item.badge}
                  </span>
                </div>

                <p className="mt-2 text-[18px] text-[#00336E]">
                  {item.description}
                </p>

                <p className="mt-2 text-[16px] text-[#000000] font-bold">
                  <AiOutlineLike className="inline mr-1" /> {item.votes.toLocaleString()} agreed
                </p>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col  min-w-[128px] min-h-[104px] bg-[#F2F4F7] p-6 rounded-lg">

                <span className="font-display text-4xl font-bold text-[#00336E]">
                  {item.accuracy}%
                </span>
                <span className="text-[12px]  text-center  tracking-wide">
                  accuracy
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
