import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";

export const SubmitCTA = () => {
  return (
    <section className="bg-brand-dark text-white py-20 ">
      <div className="max-w-3xl mx-auto text-center px-6">

        <h2 className="font-display text-4xl md:text-[2.8rem] font-bold mb-3">
          Submit a Word
        </h2>

        <p className="text-sm text-blue-100 mb-8">
          Saw a new TikTok word? Add it before it blows up.
        </p>

        <Link href="/submit">
          <button
            className="
              inline-flex items-center gap-2
              bg-white !text-[#00336E] font-semibold
              px-8 py-3 rounded-full shadow-md
              hover:bg-blue-50 transition
            "
          >
            <CiCirclePlus className="text-[#00336E] text-xl" />
            Submit a New Word
          </button>
        </Link>

        <p className="mt-4 text-[12px] text-blue-100">
          It only takes a minute to add a definition.
        </p>

      </div>
    </section>
  );
};
