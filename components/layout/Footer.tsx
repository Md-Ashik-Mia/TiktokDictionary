import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#f5f8ff] mt-20">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-xs text-slate-500">
        <p>© Copyright 2025. All Rights Reserved</p>

        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
          <span>🧠 TikTokDictionary</span>
          <span className="sm:border-l sm:border-slate-300 sm:pl-4">
            Found a new term blowing up? Add it to the dictionary with your own
            definition.
          </span>
        </div>

        <div className="flex items-center gap-3 text-slate-600">
          <Link href="#" className="hover:text-brand-dark interactive">
            TikTok
          </Link>
          <Link href="#" className="hover:text-brand-dark interactive">
            Instagram
          </Link>
          <Link href="#" className="hover:text-brand-dark interactive">
            X
          </Link>
        </div>
      </div>
    </footer>
  );
}
