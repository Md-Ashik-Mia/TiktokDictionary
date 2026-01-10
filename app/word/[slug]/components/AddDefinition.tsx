"use client";

import { userApi } from "@/lib/https";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { TbInfoOctagonFilled } from "react-icons/tb";


export default function AddDefinition({ wordId }: { wordId: number }) {
  const router = useRouter();
  const [definition, setDefinition] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    const trimmed = definition.trim();
    if (!trimmed) {
      toast.info("Write a meaning first");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.info("Please login to submit a meaning");
      router.push("/login");
      return;
    }

    try {
      setIsSubmitting(true);
      await userApi.post("dictionary/definations/", {
        word: wordId,
        definition: trimmed,
      });
      toast.success("Meaning submitted");
      setDefinition("");
      router.refresh();
    } catch (e: unknown) {
      const err = e as { response?: { data?: { message?: string } }; message?: string };
      toast.error(err?.response?.data?.message ?? err?.message ?? "Failed to submit meaning");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-2xl sm:text-3xl font-bold">Your meaning of this word:</h2>

      <div className="border border-[#00336E] flex items-center px-3 py-5 rounded-md bg-[#fdfefe]">
        <span className="text-lg text-[#0f2d5c]"><TbInfoOctagonFilled /></span>
        <input
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
          placeholder="Write your meaning"
          className="flex-1 bg-transparent outline-none px-3 text-sm text-[#0f2d5c]"
          disabled={isSubmitting}
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`h-10 px-5 rounded-full bg-[#0f2d5c] text-white text-sm font-semibold transition ${
          isSubmitting ? "opacity-80 cursor-not-allowed" : "hover:bg-[#0d264d]"
        }`}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
