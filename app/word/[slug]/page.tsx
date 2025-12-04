import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

interface Props {
  params: { slug: string };
}

export default function WordDetailPage({ params }: Props) {
  const word = decodeURIComponent(params.slug);
  const mainDefinition =
    "The ability to charm or attract someone using confidence.";
  const example = "Bro pulled her in 2 mins — crazy rizz.";

  return (
    <main className="min-h-screen flex flex-col bg-[#f4f6fb]">
      <section className="hero-gradient pb-10 pt-4 rounded-b-[40px] shadow-lg">
        <Navbar />

        <div className="max-w-5xl mx-auto px-6 mt-8">
          <div className="rounded-2xl bg-white shadow-card px-8 py-8">
            <h1 className="font-display text-3xl md:text-[2.8rem] text-brand-dark mb-2">
              {word.charAt(0).toUpperCase() + word.slice(1)}
            </h1>
            <p className="text-sm text-slate-700 max-w-2xl mb-2">
              {mainDefinition}
            </p>
            <p className="text-xs text-slate-500">
              Example: <span className="italic">{example}</span>
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-500">
              <span>👍 2,904</span>
              <span>💬 112</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        {/* Alternate definitions */}
        <div>
          <h2 className="font-display text-2xl text-brand-dark mb-4">
            Alternate Definitions
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Game or charisma used to impress someone.",
              "Smooth talking mentality.",
              "Flirty confidence energy.",
            ].map((def, i) => (
              <article
                key={i}
                className="rounded-2xl bg-white border border-slate-200 shadow-card p-4 text-xs text-slate-700 flex flex-col justify-between"
              >
                <p>{def}</p>
                <p className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>👍 {i === 0 ? "1.2k" : i === 1 ? "320" : "143"}</span>
                  <span>👎 {i === 0 ? "90" : i === 1 ? "40" : "15"}</span>
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Your meaning */}
        <div className="space-y-3">
          <h2 className="font-display text-2xl text-brand-dark">
            Your meaning of this word:
          </h2>
          <textarea
            className="w-full rounded-2xl border border-slate-200 bg-white shadow-card px-4 py-3 text-sm min-h-[120px] outline-none focus:ring-2 focus:ring-brand-mid"
            placeholder="Type your definition here..."
          />
          <Button className="mt-1">Submit</Button>
        </div>

        {/* Related words */}
        <div>
          <h2 className="font-display text-2xl text-brand-dark mb-3">
            Related Words
          </h2>
          <div className="flex flex-wrap gap-3">
            {["W Rizz", "Skibidi", "Ohio Rizz", "Ohio Rizz"].map((r) => (
              <button
                key={r}
                className="rounded-full bg-white border border-slate-200 px-4 py-2 text-xs text-brand-dark hover:bg-slate-50 interactive"
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Word origin cards */}
        <div className="space-y-4">
          <h2 className="font-display text-2xl text-brand-dark">
            Word Origin / First Use
          </h2>
          {[1, 2].map((i) => (
            <div
              key={i}
              className="rounded-2xl bg-white border border-slate-200 shadow-card p-5 grid gap-4 md:grid-cols-2 text-sm"
            >
              <div>
                <div className="text-xs text-slate-500 mb-1">
                  Submitted originally by:
                </div>
                <div className="font-semibold text-brand-dark">@username</div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">
                  Date first submitted:
                </div>
                <div className="font-semibold text-brand-dark">
                  18 Jul 2025
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4">
          <Button variant="outline" size="sm">
            Report
          </Button>
        </div>
      </section>

      <section className="bg-brand-dark text-white py-16 mt-6">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="font-display text-3xl md:text-[2.4rem] mb-3">
            Submit a Word
          </h2>
          <p className="text-sm text-blue-100 mb-6">
            Saw a new TikTok word? Add it before it blows up.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="bg-white text-brand-dark"
          >
            Submit a New Word
          </Button>
          <p className="mt-3 text-[11px] text-blue-100">
            It only takes a minute to add a definition.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
