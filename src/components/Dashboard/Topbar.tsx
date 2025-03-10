

import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import LogoutButton from "./LogoutButton";
import { ModeToggle } from "../shared/ModeToggler";
import { Button } from "@/components/ui/button"; 



export const TopBar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex justify-between items-center dark:bg-gray-900 bg-gray-200 dark:text-white text-black p-4 ">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline" className="dark:text-white text-black border-white">
            &larr; Go Home
          </Button>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {session?.user && (
          <>
            <Image
              src={session?.user?.image || "/default-avatar.png"}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span>{session.user.name}</span>
          </>
        )}
        <LogoutButton />
        <ModeToggle />
      </div>
    </header>
  );
};
