import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AuthButton() {
    const session = await getServerSession(authOptions);

    return (
        <Link href={session ? "/dashboard" : "/login"}>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg  transition">
                {session ? "Dashboard" : "Login"}
            </Button>
        </Link>
    );
}
