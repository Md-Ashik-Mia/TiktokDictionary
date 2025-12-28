import { Suspense } from "react";
import ResetPasswordClient from "./ResetPasswordClient";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 bg-slate-50" />
      }
    >
      <ResetPasswordClient />
    </Suspense>
  );
}
