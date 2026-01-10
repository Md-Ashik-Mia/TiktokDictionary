"use client";
import { userApi } from "@/lib/https";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineDislike} from "react-icons/ai";
import { toast } from "react-toastify";


export default function Dislike({defId, status}: {defId: number, status: string}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const payload = {
    "defination":defId,
    "is_like":false,
    "is_dislike":true
    };

  const handleDislike = async() => {
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
      toast.success(status === "disliked" ? "Dislike removed" : "Disliked");

       // Re-fetch the word details page to update counts + status.
       router.refresh();

     } catch (error) {
        console.log("Error disliking the definition:", error);
        toast.error("Failed to dislike");
      } finally {
        setIsLoading(false);
     }
  };

  return (
    <div>
      <button
        onClick={handleDislike}
        disabled={isLoading}
        className={`${status==="anonymous"||status==="neutral"||status==="liked"?" ":"text-red-800"} ${
          isLoading ? "opacity-70" : ""
        }`}
      >
        <span className={isLoading ? "inline-block animate-bounce" : "inline-block transition-transform active:scale-110"}>
          <AiOutlineDislike />
        </span>
      </button>
    </div>
  )
}
