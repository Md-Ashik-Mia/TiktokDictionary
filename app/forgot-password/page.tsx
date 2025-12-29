"use client";

import { Button } from "@/components/ui/Button";
import { api } from "@/lib/https";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setInfo("");

    try {
      const response = await api.post("user_auth/forget-password/", {
        email: email.trim(),
      });
      const data = (response?.data ?? null) as { message?: string } | null;
      setInfo(data?.message ?? "Password reset OTP sent to email.");
      router.push(`/reset-password?email=${encodeURIComponent(email.trim())}`);
    } catch (err: unknown) {
      const maybeErr = err as {
        response?: { data?: { message?: string; error?: string } };
        message?: string;
      };
      setError(
        maybeErr.response?.data?.message ||
          maybeErr.response?.data?.error ||
          maybeErr.message ||
          "Failed to send reset OTP."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-20 sm:pt-24 pb-10 sm:pb-12 flex items-center justify-center px-4 sm:px-6 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-[#00336E] shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#00336E] mb-2">
            Forgot Password
          </h1>
          <p className="text-[#769ECC] font-medium text-base sm:text-lg">
            We’ll send an OTP to your email
          </p>
        </div>

        <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
              {error}
            </div>
          )}
          {info && (
            <div className="p-3 text-sm text-green-700 bg-green-50 rounded-lg">
              {info}
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
              className="w-full px-4 sm:px-5 py-3 rounded-xl border border-slate-200 focus:border-[#00336E] focus:ring-1 focus:ring-[#00336E] outline-none transition-all placeholder:text-slate-400 text-[#00336E] font-medium"
            />
          </div>

          <Button
            className="w-full text-lg py-6 mt-4"
            size="lg"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send OTP"}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          Back to{" "}
          <Link href="/login" className="text-[#00336E] font-bold hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
}
