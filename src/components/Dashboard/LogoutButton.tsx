"use client"; // This is a Client Component ✅

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <Button variant="outline" onClick={() => signOut()}>
      <LogOut className="text-black dark:text-white" size={20} />
    </Button>
  );
};

export default LogoutButton;
