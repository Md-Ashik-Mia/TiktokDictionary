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
    <section className="min-h-screen bg-[#EFF6FE] py-25 mt-6">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-[2.6rem] text-brand-dark mb-2">
          Explore Categories
        </h2>

        <p className="text-[18px] text-[#00336E]  mb-8">
          Definitions voted accurate by the community.
        </p>

        <div className="grid gap-4 md:grid-cols-4">
          {categories.map(([label, count]) => (
            <button
              key={label}
              className="rounded-2xl bg-white border border-[#00336E] shadow-card px-5 py-6 text-left hover:-translate-y-1 hover:shadow-lg transition"
            >
              <div className="font-bold text-2xl text-[#00336E]">{label}</div>
              <div className="mt-1 text-[18px] text-[#00336E]">{count}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
