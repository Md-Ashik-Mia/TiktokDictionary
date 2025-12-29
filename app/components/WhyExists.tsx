export const WhyExists = () => {
  return (
   <div className="max-w-6xl mx-auto px-6 pt-24 sm:pt-40 lg:pt-60">
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">

      {/* LEFT COLUMN */}
      <div className="w-full lg:w-1/2">
        <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-[3.2rem] lg:text-6xl leading-none text-[#00336E] mb-3">
          Why TikTok <br /> Dictionary Exists
        </h2>

        <p className="my-4 font-sans text-base sm:text-lg text-[#00336E] ">
          A community-powered dictionary tracking viral slang and new trends
          across TikTok and online culture. No ads. No influencers. 100% organic.
        </p>
      </div>

      {/* RIGHT COLUMN */}
      <div className="grid gap-4 sm:grid-cols-2 w-full lg:w-1/2">
        {/* Words Defined */}
        <div className="p-4 rounded-xl bg-[#EFF6FE]   ">
          <div className="mt-2 text-3xl sm:text-4xl md:text-[56px] font-bold text-[#00336E]">
            12k+
          </div>
          <div className="text-[16px] text-[#00336E] ">
            Words Defined
          </div>

        </div>

        {/* Community Votes */}
        <div className="p-4 rounded-xl bg-[#EFF6FE]">
            <div className="text-3xl sm:text-4xl md:text-[56px] font-bold text-[#00336E]">
            48k+
          </div>
          <div className=" text-[16px] text-[#00336E]">
            Community Votes
          </div>

        </div>

        {/* Live Updates (Full Width) */}
        <div className=" rounded-xl bg-[#EFF6FE] p-6  col-span-full">
          <div className="text-3xl sm:text-4xl md:text-[56px] font-bold  text-[#00336E]">
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
