import "@/app/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";
import { TopBar } from "@/components/Dashboard/Topbar";
import Sidebar from "@/components/Dashboard/Sidebar";
import AuthProvider from "@/providers/SessionProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  
  if (!session) {
    redirect("/login");
  }

  return (
    <html lang="en">
      <body className="flex">
        <AuthProvider>
          <ThemeProvider>
            <Sidebar /> 
            <div className="flex-1">
              <TopBar />
              <main className="p-4">{children}</main>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
