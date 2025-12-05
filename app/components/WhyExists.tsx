export const WhyExists = () => {
  return (
   <div className="lg:w-6xl pt-50">
    <div className=" flex justify-between items-center gap-11">

      {/* LEFT COLUMN */}
      <div>
        <h2 className="font-display font-bold text-3xl md:text-[2.6rem] text-brand-dark mb-3">
          Why TikTok <br /> Dictionary Exists
        </h2>

        <p className="text-[18px] text-[#00336E] max-w-md leading-relaxed">
          A community-powered dictionary tracking viral slang and new trends
          across TikTok and online culture. No ads. No influencers. 100% organic.
        </p>
      </div>

      {/* RIGHT COLUMN */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Words Defined */}
        <div className="rounded-xl bg-[#EFF6FE]  px-6 py-6">
          <div className="mt-2 text-5xl font-bold text-[#00336E]">
            12k+
          </div>
          <div className="text-[16px] text-[#00336E] ">
            Words Defined
          </div>

        </div>

        {/* Community Votes */}
        <div className="rounded-xl bg-[#EFF6FE]  px-6 py-6">
            <div className="mt-2 text-5xl font-bold text-[#00336E]">
            48k+
          </div>
          <div className=" text-[16px] text-[#00336E]    ">
            Community Votes
          </div>

        </div>

        {/* Live Updates (Full Width) */}
        <div className=" rounded-xl bg-[#EFF6FE]  px-6 py-6 col-span-full">
          <div className="text-5xl font-bold uppercase tracking-wide text-[#00336E]">
            Live
          </div>
          <div className="mt-2 text-[16px] text-[#00336E]">
            Real-Time Updates
          </div>
        </div>
      </div>
    </div>
   </div>
  );
};
