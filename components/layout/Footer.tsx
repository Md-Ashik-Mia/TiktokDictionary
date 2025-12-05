import Link from "next/link";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import { RxTwitterLogo } from "react-icons/rx";

export function Footer() {
  return (
    <footer className="bg-[#f5f8ff]">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Logo + tagline */}
        <div className="text-center mb-6">
          <h3 className="flex items-center justify-center gap-2 text-brand-dark font-semibold text-[18px]">
            📚 TikTokDictionary
          </h3>
          <p className="text-[13px] text-slate-600">
            Found a new term blowing up? Add it to the dictionary with your own definition.
          </p>
        </div>

        {/* Divider */}
        <hr className="border-slate-300 mb-6" />

        {/* Bottom row */}
        <div className="flex items-center justify-between text-sm text-slate-600">
          {/* Left: Copyright */}
          <p>© Copyright 2025. All Rights Reserved</p>

          {/* Right: Social icons */}
          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-400 hover:bg-slate-200 transition"
            >
              <FaTiktok size={18} />
            </Link>

            <Link
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-400 hover:bg-slate-200 transition"
            >
              <FaInstagram size={18} />
            </Link>

            <Link
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-400 hover:bg-slate-200 transition"
            >
              <RxTwitterLogo size={18} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
