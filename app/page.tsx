import { Footer } from "@/components/layout/Footer";

import { SubmitCTA } from "../components/common/SubmitCTA";
import { HeroSection } from "./components/HeroSection";
import { TrendingSection } from "./components/TrendingSection";

export default function HomePage() {
  return (
    <main className="flex  flex-col bg-white">
      <HeroSection />
      <section className="max-w-6xl min-h-screen mx-auto px-6 py-52">
        <TrendingSection />
      </section>

      {/* <div className="bg-[#EFF6FE]">
        <section className="max-w-6xl min-h-screen mx-auto mt-30 bg-[#EFF6FE]  ">
        <MostAgreed />
      </section>
      </div>

      <section className="max-w-6xl min-h-screen mx-auto px-6 py-12 mt-50">
        <FreshSubmissions />
      </section>
      <ExploreCategories />
      <section className="max-w-6xl min-h-screen mx-auto ">
        <WhyExists />
      </section> */}
      <SubmitCTA />

      <Footer />
    </main>
  );
}

