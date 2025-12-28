"use client";

import { Button } from "@/components/ui/Button";
import { api } from "@/lib/https";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function ResetPasswordClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailFromQuery = useMemo(
    () => searchParams.get("email") ?? "",
    [searchParams]
  );

  const [email, setEmail] = useState(emailFromQuery);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setInfo("");

    try {
      const response = await api.post("user_auth/reset-password/", {
        email: email.trim(),
        otp: otp.trim(),
        new_password: newPassword,
      });
      const data = (response?.data ?? null) as { message?: string } | null;
      setInfo(data?.message ?? "Password reset successfully.");
      router.push("/login");
    } catch (err: unknown) {
      const maybeErr = err as {
        response?: { data?: { message?: string; error?: string } };
        message?: string;
      };
      setError(
        maybeErr.response?.data?.message ||
          maybeErr.response?.data?.error ||
          maybeErr.message ||
          "Password reset failed."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#00336E] shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-[#00336E] mb-2">
            Reset Password
          </h1>
          <p className="text-[#769ECC] font-medium text-lg">
            Enter OTP and your new password
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
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
              className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-[#00336E] focus:ring-1 focus:ring-[#00336E] outline-none transition-all placeholder:text-slate-400 text-[#00336E] font-medium"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="otp"
              className="block text-sm font-bold text-[#00336E] ml-1"
            >
              OTP
            </label>
            <input
              id="otp"
              type="text"
              inputMode="numeric"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="1234"
              required
              className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-[#00336E] focus:ring-1 focus:ring-[#00336E] outline-none transition-all placeholder:text-slate-400 text-[#00336E] font-medium"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="new_password"
              className="block text-sm font-bold text-[#00336E] ml-1"
            >
              New Password
            </label>
            <input
              id="new_password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
            {isLoading ? "Resetting..." : "Reset Password"}
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
