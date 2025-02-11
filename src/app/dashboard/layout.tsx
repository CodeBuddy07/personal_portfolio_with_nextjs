import "@/app/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";
import { TopBar } from "@/components/Dashboard/Topbar";
import Sidebar from "@/components/Dashboard/Sidebar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "sonner";



export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);


  if (!session) {
    redirect("/login");
  }

  return (
    <html lang="en">
      <body className="flex">

        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
        <Sidebar />
        <div className="flex-1">
          <TopBar />
          <main className="p-4">{children}</main>
          <Toaster/>
        </div>
      </ThemeProvider>

    </body>
    </html >
  );
}
