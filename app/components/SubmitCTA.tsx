import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const SubmitCTA = () => {
  return (
    <section className="min-h-screen bg-brand-dark text-white py-16 mt-6">
      <div className="max-w-3xl mx-auto text-center px-6">
        <h2 className="font-display text-3xl md:text-[2.4rem] mb-3">
          Submit a Word
        </h2>

        <p className="text-sm text-blue-100 mb-6">
          Saw a new TikTok word? Add it before it blows up.
        </p>

        <Link href="/submit">
          <Button
            variant="primary"
            size="lg"
            className="bg-white text-brand-dark"
          >
            Submit a New Word
          </Button>
        </Link>

        <p className="mt-3 text-[11px] text-blue-100">
          It only takes a minute to add a definition.
        </p>
      </div>
    </section>
  );
};
