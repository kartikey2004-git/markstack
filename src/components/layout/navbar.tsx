"use client";

import Link from "next/link";
import { UserMenu } from "@/components/shared/user-menu";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { PUBLIC_NAV_LINKS } from "@/config/navigation";

export function Navbar() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl bg-card/95 backdrop-blur-lg border border-border rounded-md px-6 py-3 flex justify-between items-center z-50 shadow-lg">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-lg font-semibold text-foreground">
          MarkStack
        </Link>

        <nav className="hidden md:flex gap-6 text-sm">
          {PUBLIC_NAV_LINKS.slice(0, 4).map((item, i) => (
            <Link
              key={item.url}
              href={item.url}
              className={`transition ${
                i === 0
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
