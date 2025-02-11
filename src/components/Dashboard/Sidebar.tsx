"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/add-blog", label: "Add Blog" },
  { href: "/dashboard/manage-blogs", label: "Manage Blogs" },
  { href: "/dashboard/add-projects", label: "Add Project" },
  { href: "/dashboard/manage-projects", label: "Manage Projects" },
  { href: "/dashboard/messages", label: "Messages" },
];

export default function Sidebar() {
  const pathname = usePathname(); 

  return (
    <aside className="w-64 dark:bg-gray-900 bg-gray-200 dark:text-white text-black h-screen p-4">
      <h2 className="text-xl font-bold mb-4 text-center">Admin Panel</h2>
      <nav className="flex flex-col gap-2 mt-10">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`p-2 rounded-md ${pathname === link.href ? "dark:bg-gray-700 bg-gray-300 text-blue-500 font-semibold" : "dark:hover:bg-gray-800 hover:bg-gray-300 hover:text-blue-500"}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
