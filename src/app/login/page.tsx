"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogIn } from 'lucide-react';
import { Github } from 'lucide-react';

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md p-8 shadow-lg bg-white dark:bg-gray-800 rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">Sign in to Your Account</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 my-3">Choose a method to continue</p>

        <div className="space-y-4">
          <Button
            onClick={() => signIn("google",{callbackUrl: "http://localhost:3000/dashboard"})}
            className="flex items-center justify-center w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white rounded-md p-3 shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            <LogIn className="mr-2 text-lg" />
            Continue with Google
          </Button>

          <Button
            onClick={() => signIn("github",{callbackUrl: "http://localhost:3000/dashboard"})}
            className="flex items-center justify-center w-full bg-gray-900 dark:bg-gray-700 text-white dark:text-white rounded-md p-3 shadow-sm hover:bg-gray-800 dark:hover:bg-gray-600 transition"
          >
            <Github className="mr-2 text-lg" />
            Continue with GitHub
          </Button>
        </div>
      </Card>
    </div>
  );
}
