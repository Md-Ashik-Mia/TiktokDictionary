export const FreshSubmissions = () => {
  const words = ["Cozy Games", "Roman Empire", "Gatekeep", "Beige Flag"];

  return (
    <div className="min-w-6xl">
      <h2 className="font-display text-3xl md:text-[2.6rem] text-brand-dark mb-2">
        Fresh Submissions
      </h2>

      <p className="text-[18px] text-slate-600 mb-6">
        Latest words discovered by users like you.
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        {words.map((word, i) => (
          <article
            key={word}
            className="rounded-2xl border border-slate-200 bg-white shadow-card p-5 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2 text-[11px]">
              <span className="px-5 py-2 rounded-full bg-[#F2F4F7] text-brand-dark ">
                NEW
              </span>

              <span className="px-5 py-2 rounded-full bg-[#00336E] text-[#FFFFFF]">
                {i % 2 === 0 ? "Gaming" : "TikTok Trends"}
              </span>
            </div>

            <h3 className="mt-2 font-bold  text-lg text-brand-dark">
              {word}
            </h3>

            <p className="text-xs text-slate-600">
              Low-stress video games focused on relaxation, creativity…
            </p>

            <p className="mt-2 text-[11px] text-slate-500">
              ⏱ Submitted {i * 2 + 2} hours ago
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};
