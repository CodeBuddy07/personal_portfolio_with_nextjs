'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="dark:bg-black/40 border-t border-border mt-10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
        

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ruhul Amin. All rights reserved.
        </p>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="https://github.com/your-github" target="_blank" className="hover:text-primary transition">
            <Github className="w-5 h-5" />
          </Link>
          <Link href="https://linkedin.com/in/your-linkedin" target="_blank" className="hover:text-primary transition">
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link href="https://twitter.com/your-twitter" target="_blank" className="hover:text-primary transition">
            <Twitter className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </footer>
  );
}
