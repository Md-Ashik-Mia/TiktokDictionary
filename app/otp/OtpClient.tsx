"use client";

import { Button } from "@/components/ui/Button";
import { api } from "@/lib/https";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

type VerifyOtpResponse = {
  message?: string;
};

export default function OtpClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailFromQuery = useMemo(
    () => searchParams.get("email") ?? "",
    [searchParams]
  );

  const [email, setEmail] = useState(emailFromQuery);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setInfo("");

    try {
      const response = await api.post("user_auth/verify-otp/", {
        email: email.trim(),
        otp: otp.trim(),
      });
      const data = (response?.data ?? null) as VerifyOtpResponse | null;
      setInfo(data?.message ?? "OTP verified successfully.");
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
          "OTP verification failed."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError("");
    setInfo("");

    try {
      const response = await api.post("user_auth/resend-otp/", {
        email: email.trim(),
      });
      const data = (response?.data ?? null) as { message?: string } | null;
      setInfo(data?.message ?? "OTP resent. Check your email.");
    } catch (err: unknown) {
      const maybeErr = err as {
        response?: { data?: { message?: string; error?: string } };
        message?: string;
      };
      setError(
        maybeErr.response?.data?.message ||
          maybeErr.response?.data?.error ||
          maybeErr.message ||
          "Failed to resend OTP."
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <main className="min-h-screen pt-20 sm:pt-24 pb-10 sm:pb-12 flex items-center justify-center px-4 sm:px-6 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-[#00336E] shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#00336E] mb-2">
            Verify OTP
          </h1>
          <p className="text-[#769ECC] font-medium text-base sm:text-lg">
            Enter the OTP sent to your email
          </p>
        </div>

        <form className="space-y-5 sm:space-y-6" onSubmit={handleVerify}>
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

          <Button
            className="w-full text-lg py-6 mt-4"
            size="lg"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </Button>

          <Button
            className="w-full text-lg py-6"
            size="lg"
            type="button"
            variant="outline"
            onClick={handleResend}
            disabled={isResending}
          >
            {isResending ? "Resending..." : "Resend OTP"}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          Already verified?{" "}
          <Link href="/login" className="text-[#00336E] font-bold hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
}
