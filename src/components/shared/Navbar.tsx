"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./ModeToggler";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const { data: session } = useSession(); 

  return (
    <nav className="bg-slate-100 shadow-md sticky top-0 dark:bg-black/60 backdrop-blur-sm z-50 dark:shadow-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary">
          <Image src={"/logo.png"} alt="Logo" width={30} height={30} />
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={pathName === "/" ? "text-blue-500 transition" : "text-muted-foreground hover:text-blue-500 transition"}
          >
            Home
          </Link>
          <Link
            href="/blogs"
            className={pathName === "/blogs" ? "text-blue-500 transition" : "text-muted-foreground hover:text-blue-500 transition"}
          >
            Blogs
          </Link>
          <Link
            href="/contact"
            className={pathName === "/contact" ? "text-blue-500 transition" : "text-muted-foreground hover:text-blue-500 transition"}
          >
            Contact
          </Link>


          <Link href={session ? "/dashboard" : "/login"}>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
              {session ? "Dashboard" : "Login"}
            </Button>
          </Link>

          <ModeToggle />
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? (
            <X className="w-6 h-6 text-primary" />
          ) : (
            <Menu className="w-6 h-6 text-primary" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-t border-border py-4 px-6 space-y-4">
          <Link href="/" className="block text-muted-foreground hover:text-primary transition">
            Home
          </Link>
          <Link href="/blogs" className="block text-muted-foreground hover:text-primary transition">
            Blogs
          </Link>
          <Link href="/contact" className="block text-muted-foreground hover:text-primary transition">
            Contact
          </Link>

          <Link href={session ? "/dashboard" : "/login"}>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
              {session ? "Dashboard" : "Login"}
            </Button>
          </Link>

          <ModeToggle />
        </div>
      )}
    </nav>
  );
}
