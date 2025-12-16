"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#00336E] shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-[#00336E] mb-2">Create Account</h1>
          <p className="text-[#769ECC] font-medium text-lg">
            Join the community today
          </p>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-bold text-[#00336E] ml-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="CoolUser123"
              className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-[#00336E] focus:ring-1 focus:ring-[#00336E] outline-none transition-all placeholder:text-slate-400 text-[#00336E] font-medium"
            />
          </div>

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
            <label
              htmlFor="password"
              className="block text-sm font-bold text-[#00336E] ml-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-[#00336E] focus:ring-1 focus:ring-[#00336E] outline-none transition-all placeholder:text-slate-400 text-[#00336E] font-medium"
            />
          </div>

          <Button className="w-full text-lg py-6 mt-4" size="lg">
            Sign Up
          </Button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="text-[#00336E] font-bold hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
}
