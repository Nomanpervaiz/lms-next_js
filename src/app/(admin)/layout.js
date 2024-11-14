
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar"
import "../globals.css";


export const metadata = {
  title: "LMS | ",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  if (session?.user?.role !== "admin") redirect("/")

  return (
    <html lang="en">
      <body>
        
      <SidebarProvider>
        
      <AppSidebar />
      <main className="w-dvw">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
      </body>
    </html>
  );
}