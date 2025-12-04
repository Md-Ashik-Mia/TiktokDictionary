export const WhyExists = () => {
  return (
    <>
      <h2 className="font-display text-3xl md:text-[2.6rem] text-brand-dark mb-3">
        Why TikTok Dictionary Exists
      </h2>

      <p className="text-sm text-slate-600 max-w-lg">
        A community-powered dictionary tracking viral slang and new trends
        across TikTok and online culture. No ads. No influencers. 100%
        organic.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 mt-10">
        <div className="rounded-2xl bg-white shadow-card px-5 py-6">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Words Defined
          </div>
          <div className="mt-2 text-3xl font-semibold text-brand-dark">
            12k+
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-card px-5 py-6">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Community Votes
          </div>
          <div className="mt-2 text-3xl font-semibold text-brand-dark">
            48k+
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-card px-5 py-6 col-span-full">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Live
          </div>
          <div className="mt-2 text-2xl font-semibold text-brand-dark">
            Real-Time Updates
          </div>
        </div>
      </div>
    </>
  );
};
