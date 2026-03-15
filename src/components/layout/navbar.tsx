"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "@/components/shared/user-menu";
import { AppContainer } from "@/components/layout/app-container";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/editor", label: "Editor" },
  { href: "/canvases", label: "My Canvases" },
  { href: "/todos", label: "Todo Planner" },
  { href: "/canvas/new", label: "New Canvas" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <AppContainer className="flex h-14 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-6">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            MarkStack
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-all duration-200 ease-in-out",
                  pathname === item.href
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          <UserMenu />
        </div>
      </AppContainer>
    </nav>
  );
}
