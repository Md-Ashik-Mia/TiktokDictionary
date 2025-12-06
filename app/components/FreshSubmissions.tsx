import { LuClock4 } from "react-icons/lu";

export const FreshSubmissions = () => {
  const words = ["Cozy Games", "Roman Empire", "Gatekeep", "Beige Flag"];

  return (
    <div className="min-w-6xl">
      <h2 className="font-display font-bold lg:text-6xl md:text-[3.2rem] leading-none text-[#00336E]">
        Fresh Submissions
      </h2>

      <p className="my-4 font-sans text-lg text-[#00336E]">
        Latest words discovered by users like you.
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        {words.map((word, i) => (
          <article
            key={word}
            className="rounded-2xl border border-slate-200 bg-white shadow-card p-5 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 text-[12px]">
              <span className="px-5 py-2 rounded-full bg-[#F2F4F7] text-[#769ECC] font-bold ">
                NEW
              </span>

              <span className="px-5 py-2 rounded-full bg-[#00336E] text-[#FFFFFF]">
                {i % 2 === 0 ? "Gaming" : "TikTok Trends"}
              </span>
            </div>

            <h3 className="mt-2 font-bold  text-2xl text-[#00336E]">
              {word}
            </h3>

            <p className="text-lg text-[#00336E]">
              Low-stress video games focused on relaxation, creativity…
            </p>

            <div className="mt-2 text-[12px] text-[#000000] flex items-center gap-1 font-bold">
              <LuClock4 /><span className="">Submitted {i * 2 + 2} hours ago</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
