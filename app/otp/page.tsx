import { Suspense } from "react";
import OtpClient from "./OtpClient";

export default function OtpPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 bg-slate-50" />
      }
    >
      <OtpClient />
    </Suspense>
  );
}
