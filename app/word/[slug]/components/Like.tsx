"use client";
import { userApi } from "@/lib/https";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { toast } from "react-toastify";

export default function Like({defId, status}: {defId: number, status: string}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const payload = {
    "defination":defId,
    "is_like":true,
    "is_dislike":false
    };

  const handleLike = async() => {
     try {
       const token = localStorage.getItem("accessToken");
       if (!token) {
        toast.info("Login to react");
        router.push("/login");
        return;
       }

       if (!defId) return;

       setIsLoading(true);
       await userApi.post('user-response/responses/', payload);
      toast.success(status === "liked" ? "Like removed" : "Liked");

       // Re-fetch the word details page to update counts + status.
       router.refresh();

     } catch (error) {
        console.log("Error liking the definition:", error);
        toast.error("Failed to like");
      } finally {
        setIsLoading(false);
     }


  };

  // console.log("Like component status:", status);
  return (
    <div>
      <button
        onClick={handleLike}
        disabled={isLoading}
        className={`${status==="anonymous"||status==="neutral"||status==="disliked"?" ":"text-green-800"} ${
          isLoading ? "opacity-70" : ""
        }`}
      >
        <span className={isLoading ? "inline-block animate-bounce" : "inline-block transition-transform active:scale-110"}>
          <AiOutlineLike />
        </span>
      </button>
    </div>
  )
}
