
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
    <header className="flex items-center justify-between px-6 md:px-10 py-6 max-w-7xl  fixed left-[50%] translate-x-[-50%] w-full z-50  backdrop-blur-md  ">
      <Link href="/" className="text-2xl font-semibold text-black">
        <span className="text-white ">TikTok</span>Dictionary
      </Link>
      <div className="flex justify-around gap-9">
        <Link href="/discover">Discover</Link>
        <Link href="/word/rizz">Word Details</Link>
        <Link href="/submit">Submit</Link>
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-800 capitalize">{user.username}</span>
          <Button
            onClick={handleLogout}
            className="rounded-full text-sm font-sans bg-transparent text-slate-600 border border-slate-300 hover:bg-slate-100"
          >
            Logout
          </Button>
        </div>
      ) : (
        <Link href="/login">
          <Button className="rounded-full text-lg font-sans">
            Login
          </Button>
        </Link>
      )}
    </header>
  );
}
