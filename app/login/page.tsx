"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#00336E] shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-[#00336E] mb-2">Welcome Back</h1>
          <p className="text-[#769ECC] font-medium text-lg">
            Log in to continue your streak
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-bold text-[#00336E] ml-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="hello@example.com"
              className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-[#00336E] focus:ring-1 focus:ring-[#00336E] outline-none transition-all placeholder:text-slate-400 text-[#00336E] font-medium"
            />
          </div>

          <div className="space-y-2">
             <div className="flex justify-between items-center ml-1">
              <label
                htmlFor="password"
                className="block text-sm font-bold text-[#00336E]"
              >
                Password
              </label>
              <Link
                href="#"
                className="text-xs font-bold text-[#769ECC] hover:text-[#00336E] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-[#00336E] focus:ring-1 focus:ring-[#00336E] outline-none transition-all placeholder:text-slate-400 text-[#00336E] font-medium"
            />
          </div>

          <Button className="w-full text-lg py-6 mt-4" size="lg">
            Log In
          </Button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[#00336E] font-bold hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
