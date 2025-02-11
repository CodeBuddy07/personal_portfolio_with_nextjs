"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFoundPage() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Detect dark mode preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-7xl font-bold">404</h1>
      <p className="text-2xl mt-2">Oops! Page Not Found</p>
      <p className="text-gray-500 mt-2">The page you are looking for does not exist or has been moved.</p>
      
      <Link href="/">
        <button className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
          Go Back Home
        </button>
      </Link>

      <div className="absolute bottom-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} - Ruhul&apos;s Portfolio
      </div>
    </div>
  );
}
