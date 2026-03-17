"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "@/components/shared/user-menu";
import { AppContainer } from "@/components/layout/app-container";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";
import { PUBLIC_NAV_LINKS } from "@/config/navigation";

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
            {PUBLIC_NAV_LINKS.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-all duration-200 ease-in-out",
                  pathname === item.url
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                )}
              >
                {item.title}
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
