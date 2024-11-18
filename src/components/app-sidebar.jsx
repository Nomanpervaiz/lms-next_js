import {  FilePlus, GraduationCap, LayoutDashboard, Package, Search, SearchCheck, Settings, User, UserCheck } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Course",
    url: "/courses",
    icon: GraduationCap,
  },
  {
    title: "Batch",
    url: "/batches",
    icon: Package,
  },
  {
    title: "Admission",
    url: "/addmissions",
    icon: FilePlus,
  },
  {
    title: "Student",
    url: "/students",
    icon: User,
  },
  {
    title: "Trainer",
    url: "/trainers",
    icon: UserCheck,
  },
]

export function AppSidebar() {
  return (
    <Sidebar >
      <SidebarContent className="text-white bg-black/[0.89]">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300">Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link className="my-2" href={`/admin${item.url}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
