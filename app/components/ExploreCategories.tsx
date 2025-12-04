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
    <section className="min-h-screen bg-[#e4f0ff] py-16 mt-6">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-[2.6rem] text-brand-dark mb-2">
          Explore Categories
        </h2>

        <p className="text-sm text-slate-600 mb-8">
          Definitions voted accurate by the community.
        </p>

        <div className="grid gap-4 md:grid-cols-4">
          {categories.map(([label, count]) => (
            <button
              key={label}
              className="rounded-2xl bg-white border border-slate-200 shadow-card px-5 py-6 text-left hover:-translate-y-1 hover:shadow-lg transition"
            >
              <div className="font-semibold text-brand-dark">{label}</div>
              <div className="mt-1 text-xs text-slate-500">{count}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
