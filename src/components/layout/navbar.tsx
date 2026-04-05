"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { UserMenu } from "@/components/shared/user-menu";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { PUBLIC_NAV_LINKS, NAVIGATION_CONFIG } from "@/config/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <>
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

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <nav className="fixed left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-card border border-border rounded-md p-4 shadow-lg">
            <div className="flex flex-col gap-3">
              {navLinks.map((item, i) => (
                <Link
                  key={item.url}
                  href={item.url}
                  className={`px-3 py-2 rounded-md text-sm transition ${
                    i === 0
                      ? "text-foreground font-semibold bg-muted"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
