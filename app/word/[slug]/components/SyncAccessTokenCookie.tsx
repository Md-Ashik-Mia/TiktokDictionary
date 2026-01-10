"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const parts = document.cookie.split(";").map((p) => p.trim());
  const hit = parts.find((p) => p.startsWith(`${name}=`));
  if (!hit) return null;
  return hit.slice(name.length + 1);
}

export default function SyncAccessTokenCookie() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const current = getCookie("accessToken");
    const encoded = encodeURIComponent(token);

    // If cookie already matches, don't refresh (prevents loops)
    if (current === encoded || current === token) return;

    document.cookie = `accessToken=${encoded}; Path=/; SameSite=Lax`;
    router.refresh();
  }, [router]);

  return null;
}
