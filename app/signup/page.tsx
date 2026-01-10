// "use client";

// import { Button } from "@/components/ui/Button";
// import { api } from "@/lib/https";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function SignupPage() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       await api.post("user_auth/register/", formData);
//       router.push("/");
//       router.refresh();
//     } catch (err: unknown) {
//       const maybeErr = err as {
//         response?: { data?: { message?: string; error?: string } };
//         message?: string;
//       };
//       setError(
//         maybeErr.response?.data?.message ||
//           maybeErr.response?.data?.error ||
//           maybeErr.message ||
//           "Signup failed. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <main className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 bg-slate-50">
//       <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#00336E] shadow-lg hover:shadow-xl transition-all duration-300">
//         <div className="text-center mb-8">
//           <h1 className="text-4xl font-display font-bold text-[#00336E] mb-2">Create Account</h1>
//           <p className="text-[#769ECC] font-medium text-lg">
//             Join the community today
//           </p>
//         </div>

//         <form className="space-y-5" onSubmit={handleSubmit}>
//           {error && (
//             <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
//               {error}
//             </div>
//           )}
//           <div className="space-y-2">
//             <label
//               htmlFor="username"
//               className="block text-sm font-bold text-[#00336E] ml-1"
//             >
//               Username
//             </label>
//             <input
//               id="username"
//               type="text"
//               value={formData.username}
//               onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//               placeholder="Username"
//               required
//               className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-[#00336E] focus:ring-1 focus:ring-[#00336E] outline-none transition-all placeholder:text-slate-400 text-[#00336E] font-medium"
//             />
//           </div>

//           <div className="space-y-2">
//             <label
//               htmlFor="password"
//               className="block text-sm font-bold text-[#00336E] ml-1"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//               placeholder="••••••••"
//               required
//               className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:border-[#00336E] focus:ring-1 focus:ring-[#00336E] outline-none transition-all placeholder:text-slate-400 text-[#00336E] font-medium"
//             />
//           </div>

//           <Button
//             className="w-full text-lg py-6 mt-4"
//             size="lg"
//             type="submit"
//             disabled={isLoading}
//           >
//             {isLoading ? "Creating Account..." : "Sign Up"}
//           </Button>
//         </form>

//         <div className="mt-8 text-center text-sm font-medium text-slate-500">
//           Already have an account?{" "}
//           <Link href="/login" className="text-[#00336E] font-bold hover:underline">
//             Log In
//           </Link>
//         </div>
//       </div>
//     </main>
//   );
// }
"use client";

import { Button } from "@/components/ui/Button";
import { api } from "@/lib/https";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/* ----------------- Turnstile typing ----------------- */
type TurnstileRenderOptions = {
  sitekey: string;
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

type TurnstileApi = {
  render: (container: string | HTMLElement, options: TurnstileRenderOptions) => string;
  remove: (widgetId: string) => void;
  reset?: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const saveSession = (res: {
    access?: string;
    refresh?: string;
    id?: number;
    username?: string;
  }) => {
    if (res.access) {
      localStorage.setItem("accessToken", res.access);
      document.cookie = `accessToken=${encodeURIComponent(res.access)}; Path=/; SameSite=Lax`;
    }
    if (res.refresh) localStorage.setItem("refreshToken", res.refresh);
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: res.id,
        username: res.username,
      })
    );
    // Notify listeners like Navbar that auth changed immediately.
    window.dispatchEvent(new Event("storage"));
  };

  /* ---------- CAPTCHA STATE ---------- */
  const [isHuman, setIsHuman] = useState(false);
  const [captchaLoaded, setCaptchaLoaded] = useState(false);

  /* ---------- Load Turnstile Script ---------- */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.onload = () => setCaptchaLoaded(true);
    document.body.appendChild(script);
  }, []);

  /* ---------- Render Turnstile ---------- */
  useEffect(() => {
    if (!captchaLoaded || !window.turnstile) return;

    const widgetId = window.turnstile.render("#cf-turnstile", {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
      callback: () => setIsHuman(true),
      "expired-callback": () => setIsHuman(false),
      "error-callback": () => setIsHuman(false),
    });

    return () => {
      if (window.turnstile && widgetId) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [captchaLoaded]);

  /* ---------- Submit ---------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isHuman) {
      setError("Please verify that you are human.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await api.post("user_auth/register/", formData);

      const loginResponse = await api.post("user_auth/login/", formData);
      const res = loginResponse.data;
      saveSession(res);

      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      const maybeErr = err as {
        response?: { data?: { message?: string; error?: string } };
        message?: string;
      };
      setError(
        maybeErr.response?.data?.message ||
          maybeErr.response?.data?.error ||
          maybeErr.message ||
          "Signup or auto-login failed. Please try again."
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
            Create Account
          </h1>
          <p className="text-[#769ECC] font-medium text-base sm:text-lg">
            Join the community today
          </p>
        </div>

        <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-bold text-[#00336E] ml-1">
              Username
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
              className="w-full px-4 sm:px-5 py-3 rounded-xl border border-slate-200 focus:border-[#00336E] focus:ring-1 focus:ring-[#00336E] outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-[#00336E] ml-1">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="w-full px-4 sm:px-5 py-3 rounded-xl border border-slate-200 focus:border-[#00336E] focus:ring-1 focus:ring-[#00336E] outline-none"
            />
          </div>

          {/* ---------- CAPTCHA ---------- */}
          <div className="flex justify-center pt-2 overflow-x-auto">
            <div id="cf-turnstile" className="min-w-[300px]" />
          </div>

          <Button
            className="w-full text-base sm:text-lg py-5 sm:py-6 mt-4"
            size="lg"
            type="submit"
            disabled={isLoading || !isHuman}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[#00336E] font-bold hover:underline"
          >
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
}
