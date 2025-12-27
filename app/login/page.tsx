"use client";

import { Button } from "@/components/ui/Button";
import { api } from "@/lib/https";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await api.post("user_auth/login/", { email, password });
      const res = response.data;

      // Store tokens and user info
      localStorage.setItem("accessToken", res.access);
      if (res.refresh) localStorage.setItem("refreshToken", res.refresh);
      localStorage.setItem("user", JSON.stringify({
        id: res.id,
        username: res.username
      }));

      // Trigger a storage event so other components (like Navbar) update immediately
      window.dispatchEvent(new Event("storage"));

      // Force a hard refresh or use router.refresh() to update server components if needed, or just redirect
      router.push("/");
      router.refresh();

    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#00336E] shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-[#00336E] mb-2">Welcome Back</h1>
          <p className="text-[#769ECC] font-medium text-lg">
            Log in to continue your streak
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
              {error}
            </div>
          )}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@example.com"
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-[#00336E] focus:ring-1 focus:ring-[#00336E] outline-none transition-all placeholder:text-slate-400 text-[#00336E] font-medium"
            />
          </div>

          <Button
            className="w-full text-lg py-6 mt-4"
            size="lg"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
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
