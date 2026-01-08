
"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  username: string;
  id: number;
}

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = () => {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          setUser(JSON.parse(userStr));
        } catch (e) {
          console.error("Failed to parse user data", e);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("storage"));
    router.refresh();
  };

  return (
    <header className="fixed top-0 left-1/2 z-50 w-full max-w-7xl -translate-x-1/2 backdrop-blur-md px-4 sm:px-6 md:px-10 py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
      <Link href="/" className="text-xl sm:text-2xl font-semibold text-black text-center sm:text-left">
        <span className="text-white ">TikTok</span>Dictionary
      </Link>

      <nav className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-6 text-sm sm:text-base">
        <Link href="/">Home</Link>
        <Link href="/discover">Discover</Link>
        <Link href="/submit">Submit</Link>

      </nav>

      {user ? (
        <div className="flex items-center justify-center sm:justify-end gap-3 sm:gap-4">
          <span className="font-semibold text-slate-800 capitalize truncate max-w-[140px] sm:max-w-[220px]">{user.username}</span>
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="text-sm font-sans border border-slate-300 bg-transparent !text-red-600 hover:bg-slate-100 hover:!text-red-700"
          >
            Logout
          </Button>
        </div>
      ) : (
        <Link href="/login" className="flex justify-center sm:justify-end">
          <Button className="rounded-full text-base sm:text-lg font-sans">
            Login
          </Button>
        </Link>
      )}
    </header>
  );
}
