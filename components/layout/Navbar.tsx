import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <header className="flex items-center justify-between px-6 md:px-10 py-6 max-w-7xl  fixed left-[50%] translate-x-[-50%] w-full z-50  backdrop-blur-md  ">
      <Link href="/" className="text-2xl font-semibold text-black">
        <span className="text-white ">TikTok</span>Dictionary
      </Link>
      <Button className="rounded-full text-lg font-sans">
        Login
      </Button>
    </header>
  );
}
