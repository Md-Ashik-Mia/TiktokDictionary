// import Link from "next/link";
// import { Navbar } from "@/components/layout/Navbar";
// import { Footer } from "@/components/layout/Footer";
// import { TrendingSection } from "@/components/home/TrendingSection";
// import { Button } from "@/components/ui/Button";
// import { CiSearch } from "react-icons/ci";


// export default function HomePage() {
//   return (
//     <main className=" flex flex-col bg-[#f4f6fb]">
//       {/* HERO */}
//       <section className=" min-h-screen hero-gradient  pt-4 shadow-lg">
//         <Navbar />
//         <div className="h-[798px]  w-full flex flex-col justify-center items-center">
//           <h1 className=" font-display font-bold text-7xl md:text-[3rem] lg:text-[3.6rem] ">
//             Search Any <br className="hidden sm:block" />
//             <span className="">
//               Tiktok Word...
//             </span>
//           </h1>
//           <p className="mt-4 text-sm md:text-base text-brand-dark/80">
//             Type a trend, phrase, slang you saw online.
//           </p>
//           <div className="my-5  flex items-center justify-center">
//             <div className="flex w-full max-w-2xl items-center rounded-full bg-white px-5 py-3 shadow-card">
//               <input
//                 className="flex-1 w-3xl h-10 border-none bg-transparent text-sm outline-none placeholder:text-slate-400"
//                 placeholder="What does ‘delulu’ mean?"
//               />
//               <span className=""><CiSearch /></span>
//             </div>
//           </div>

//           <p className="mt-3 text-[11px] text-slate-600">
//             Press <span className="font-semibold">Enter</span> to search
//           </p>
//         </div>
//       </section>

//       <section className=" max-w-6xl mx-auto px-6 py-12">
//         <TrendingSection />
//       </section>

//       {/* MOST AGREED DEFINITIONS */}
//       <section className="max-w-6xl min-h-screen mx-auto px-6 py-12">
//         <h2 className="font-display text-3xl md:text-[2.6rem] text-brand-dark mb-2">
//           Most Agreed Definitions
//         </h2>
//         <p className="text-sm text-slate-600 mb-6">
//           Definitions voted accurate by the community.
//         </p>

//         <div className="flex flex-col gap-4">
//           {[
//             { label: "Vibe Check", badge: "Top Definition", accuracy: 91 },
//             { label: "Main Character", badge: "Highly Agreed", accuracy: 93 },
//             { label: "Slay", badge: "Community Approved", accuracy: 87 },
//           ].map((item) => (
//             <article
//               key={item.label}
//               className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl bg-white shadow-card py-4 px-6"
//             >
//               <div>
//                 <div className="flex items-center gap-3 mb-1">
//                   <h3 className="font-semibold text-lg text-brand-dark">
//                     {item.label}
//                   </h3>
//                   <span className="text-[11px] rounded-full bg-green-50 text-green-700 px-3 py-0.5 border border-green-100">
//                     {item.badge}
//                   </span>
//                 </div>
//                 <p className="text-xs text-slate-600">
//                   Assessing someone&apos;s energy, mood, or overall presence.
//                   Can also mean checking if a situation feels right.
//                 </p>
//                 <p className="mt-2 text-[11px] text-slate-500">
//                   👍 2,847 agreed
//                 </p>
//               </div>

//               <div className="flex flex-col items-end">
//                 <span className="text-xs uppercase tracking-wide text-slate-500">
//                   accuracy
//                 </span>
//                 <span className="text-3xl font-semibold text-brand-dark">
//                   {item.accuracy}%
//                 </span>
//               </div>
//             </article>
//           ))}
//         </div>
//       </section>

//       {/* FRESH SUBMISSIONS */}
//       <section className="min-h-screen max-w-6xl mx-auto px-6 py-12">
//         <h2 className="font-display text-3xl md:text-[2.6rem] text-brand-dark mb-2">
//           Fresh Submissions
//         </h2>
//         <p className="text-sm text-slate-600 mb-6">
//           Latest words discovered by users like you.
//         </p>

//         <div className="grid gap-5 md:grid-cols-2">
//           {["Cozy Games", "Roman Empire", "Gatekeep", "Beige Flag"].map(
//             (word, i) => (
//               <article
//                 key={word}
//                 className="rounded-2xl border border-slate-200 bg-white shadow-card p-5 flex flex-col gap-2"
//               >
//                 <div className="flex items-center gap-2 text-[11px]">
//                   <span className="px-2 py-0.5 rounded-full bg-blue-50 text-brand-dark border border-blue-100">
//                     NEW
//                   </span>
//                   <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
//                     {i % 2 === 0 ? "Gaming" : "TikTok Trends"}
//                   </span>
//                 </div>
//                 <h3 className="mt-2 font-semibold text-lg text-brand-dark">
//                   {word}
//                 </h3>
//                 <p className="text-xs text-slate-600">
//                   Low-stress video games focused on relaxation, creativity, and
//                   positive vibes…
//                 </p>
//                 <p className="mt-2 text-[11px] text-slate-500">
//                   ⏱ Submitted {i * 2 + 2} hours ago
//                 </p>
//               </article>
//             )
//           )}
//         </div>
//       </section>

//       {/* EXPLORE CATEGORIES */}
//       <section className="min-h-screen bg-[#e4f0ff] py-16 mt-6">
//         <div className="max-w-6xl mx-auto px-6">
//           <h2 className="font-display text-3xl md:text-[2.6rem] text-brand-dark mb-2">
//             Explore Categories
//           </h2>
//           <p className="text-sm text-slate-600 mb-8">
//             Definitions voted accurate by the community.
//           </p>

//           <div className="grid gap-4 md:grid-cols-4">
//             {[
//               ["Slang", "2.4k words"],
//               ["TikTok Trends", "1.8k words"],
//               ["Memes", "3.1k words"],
//               ["Audio Sounds", "956 words"],
//               ["Acronyms", "742 words"],
//               ["Subcultures", "687 words"],
//               ["Gaming", "892 words"],
//               ["Stan Culture", "1.5k words"],
//             ].map(([label, count]) => (
//               <button
//                 key={label}
//                 className="rounded-2xl bg-white border border-slate-200 shadow-card px-5 py-6 text-left hover:-translate-y-1 hover:shadow-lg interactive"
//               >
//                 <div className="font-semibold text-brand-dark">{label}</div>
//                 <div className="mt-1 text-xs text-slate-500">{count}</div>
//               </button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* WHY EXISTS */}
//       <section className=" min-h-screen max-w-6xl mx-auto px-6 py-16 space-y-10">
//         <div className="grid gap-10 md:grid-cols-[1.2fr,1fr] items-start">
//           <div>
//             <h2 className="font-display text-3xl md:text-[2.6rem] text-brand-dark mb-3">
//               Why TikTok Dictionary Exists
//             </h2>
//             <p className="text-sm text-slate-600 max-w-lg">
//               A community-powered dictionary tracking viral slang and new trends
//               across TikTok and online culture. No ads. No influencers. 100%
//               organic.
//             </p>
//           </div>

//           <div className="grid gap-4 sm:grid-cols-2">
//             <div className="rounded-2xl bg-white shadow-card px-5 py-6">
//               <div className="text-xs uppercase tracking-wide text-slate-500">
//                 Words Defined
//               </div>
//               <div className="mt-2 text-3xl font-semibold text-brand-dark">
//                 12k+
//               </div>
//             </div>
//             <div className="rounded-2xl bg-white shadow-card px-5 py-6">
//               <div className="text-xs uppercase tracking-wide text-slate-500">
//                 Community Votes
//               </div>
//               <div className="mt-2 text-3xl font-semibold text-brand-dark">
//                 48k+
//               </div>
//             </div>
//             <div className="rounded-2xl bg-white shadow-card px-5 py-6 col-span-full">
//               <div className="text-xs uppercase tracking-wide text-slate-500">
//                 Live
//               </div>
//               <div className="mt-2 text-2xl font-semibold text-brand-dark">
//                 Real-Time Updates
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* SUBMIT CTA */}
//       <section className=" min-h-screen bg-brand-dark text-white py-16 mt-6">
//         <div className="max-w-3xl mx-auto text-center px-6">
//           <h2 className="font-display text-3xl md:text-[2.4rem] mb-3">
//             Submit a Word
//           </h2>
//           <p className="text-sm text-blue-100 mb-6">
//             Saw a new TikTok word? Add it before it blows up.
//           </p>
//           <Link href="/submit">
//             <Button
//               variant="primary"
//               size="lg"
//               className="bg-white text-brand-dark"
//             >
//               Submit a New Word
//             </Button>
//           </Link>
//           <p className="mt-3 text-[11px] text-blue-100">
//             It only takes a minute to add a definition.
//           </p>
//         </div>
//       </section>

//       <Footer />
//     </main>
//   );
// }



import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { HeroSection } from "./components/HeroSection";
import { TrendingSection } from "./components/TrendingSection";
import { MostAgreed } from "./components//MostAgreed";
import { FreshSubmissions } from "./components/FreshSubmissions";
import { ExploreCategories } from "./components//ExploreCategories";
import { WhyExists } from "./components/WhyExists";
import { SubmitCTA } from "./components/SubmitCTA";

export default function HomePage() {
  return (
    <main className="flex  flex-col bg-[#f4f6fb]">
      <HeroSection />

      <section className="max-w-6xl min-h-screen mx-auto px-6 py-52">
        <TrendingSection />
      </section>

      <section className="max-w-6xl min-h-screen mx-auto px-6   ">
        <MostAgreed />
      </section>

      <section className="max-w-6xl min-h-screen mx-auto px-6 py-12">
        <FreshSubmissions />
      </section>

      <ExploreCategories />

      <section className="max-w-6xl min-h-screen mx-auto px-6 py-16 space-y-10">
        <WhyExists />
      </section>

      <SubmitCTA />

      <Footer />
    </main>
  );
}

