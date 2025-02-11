import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="text-center py-20">
            <h2 className="text-3xl font-bold">404 - Project Not Found</h2>
            <Link href="/">
                <Button variant="outline" className="mt-4">Go Back</Button>
            </Link>
        </div>
    );
}
