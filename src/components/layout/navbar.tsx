"use client";

import Link from "next/link";
import { UserMenu } from "@/components/shared/user-menu";

export function Navbar() {
  return (
    <nav className="border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold">
              MarkStack
            </Link>
            <div className="hidden md:flex space-x-6">
              <Link href="/blogs" className="text-gray-600 hover:text-gray-900">
                Blogs
              </Link>
            
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
