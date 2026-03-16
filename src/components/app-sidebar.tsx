"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserMenu } from "@/components/shared/user-menu";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const navigation = [
  {
    title: "Workspace",
    items: [
      {
        title: "Editor",
        url: "/editor",
      },
      {
        title: "Blogs",
        url: "/dashboard/blogs",
      },
    ],
  },
  {
    title: "Productivity",
    items: [
      {
        title: "Canvases",
        url: "/canvases",
      },
      {
        title: "Todo Planner",
        url: "/todos",
      },
    ],
  },
];

interface AppSidebarProps {
  children: React.ReactNode;
}

export function AppSidebar({ children }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar variant="inset">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <Link href="/">
                    <span className="font-semibold">MarkStack</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent>
            {navigation.map((group) => (
              <SidebarGroup key={group.title}>
                <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => {
                      const isActive =
                        pathname === item.url ||
                        pathname.startsWith(`${item.url}/`);

                      return (
                        <SidebarMenuItem key={item.url}>
                          <SidebarMenuButton asChild isActive={isActive}>
                            <Link href={item.url}>
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          <SidebarFooter>
            <div className="flex items-center gap-2 p-1">
              <ThemeToggle />
              <UserMenu />
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b bg-background/85 backdrop-blur px-4">
            <SidebarTrigger />
            <div className="flex-1" />
          </header>

          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
