export const ExploreCategories = () => {
  const categories = [
    ["Slang", "2.4k words"],
    ["TikTok Trends", "1.8k words"],
    ["Memes", "3.1k words"],
    ["Audio Sounds", "956 words"],
    ["Acronyms", "742 words"],
    ["Subcultures", "687 words"],
    ["Gaming", "892 words"],
    ["Stan Culture", "1.5k words"],
  ];

  return (
    <section className="min-h-screen bg-[#EFF6FE] py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-6 mt-10 sm:mt-20">
        <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-[3.2rem] lg:text-6xl leading-none text-[#00336E]">
          Explore Categories
        </h2>

        <p className="my-4 font-sans text-base sm:text-lg text-[#00336E]">
          Definitions voted accurate by the community.
        </p>

        <div className="grid gap-4 md:grid-cols-4">
          {categories.map(([label, count]) => (
            <button
              key={label}
              className="rounded-2xl bg-transparent border border-[#00336E] shadow-card px-5 py-6 text-left hover:-translate-y-1 hover:shadow-lg transition"
            >
              <p className="font-bold text-2xl text-[#00336E] text-center">{label}</p>
              <p className="mt-1 text-[18px] text-[#00336E] text-center">{count}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
