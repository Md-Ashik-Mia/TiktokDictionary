import { Navbar } from "@/components/layout/Navbar";

export const HeroSection = () => {
  return (
    <section className="bg-[#EFF6FE] pb-16 pt-4 ">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 mt-30 mb-8">
        <div className="text-center mb-12">
          <h1 className="font-display font-bold !text-7xl md:text-[3.5rem] text-[#00336E] leading-tight">
            Discover New Words
          </h1>
          <p className="mt-3 font-sans text-lg md:text-base text-[#00336E]/80 max-w-xl mx-auto">
            Explore the latest slang, trends, and creator-made language—updated
            daily.
          </p>
        </div>
      </div>
    </section>
  );
};
