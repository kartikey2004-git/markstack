"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { UserMenu } from "@/components/shared/user-menu";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { PUBLIC_NAV_LINKS, NAVIGATION_CONFIG } from "@/config/navigation";
import { authClient } from "@/lib/auth-client";

export function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();
        setIsAuthenticated(!!session.data);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // Get public links
  const publicLinks = PUBLIC_NAV_LINKS.filter(
    (link) => link.title !== "My Blogs",
  );

  // Add "My Blogs" if authenticated
  const navLinks = isAuthenticated
    ? [
        ...publicLinks.slice(0, 3),
        NAVIGATION_CONFIG[1].items.find((item) => item.title === "My Blogs")!,
      ]
    : publicLinks.slice(0, 4);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] sm:w-[95%] max-w-7xl bg-card/95 backdrop-blur-lg border border-border rounded-md px-4 sm:px-6 py-3 flex justify-between items-center z-50 shadow-lg">
      <div className="flex items-center gap-4 sm:gap-8">
        <Link href="/" className="text-lg font-semibold text-foreground">
          MarkStack
        </Link>

        <nav className="hidden md:flex gap-6 text-sm">
          {navLinks.map((item, i) => (
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
