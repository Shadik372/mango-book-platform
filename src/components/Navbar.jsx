"use client";

import Link from "next/link";
import { Button } from "@heroui/react";

export default function Navbar() {
  // TODO: Replace this with actual Better Auth session state later
  const isLoggedIn = false;
  const userName = "Shadik"; 

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-divider bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="font-bold text-inherit text-xl flex items-center gap-2">
            🥭 Mango Books
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <ul className="hidden sm:flex items-center gap-6">
          <li>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/books" className="hover:text-primary transition-colors">
              All Books
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link href="/profile" className="hover:text-primary transition-colors">
                My Profile
              </Link>
            </li>
          )}
        </ul>

        {/* Right: Auth/User Actions */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">Hi, {userName}</span>
              <Button color="danger" variant="flat" as={Link} href="#">
                Logout
              </Button>
            </div>
          ) : (
            <Button as={Link} color="primary" href="/login" variant="flat">
              Login
            </Button>
          )}
        </div>
        
      </header>
    </nav>
  );
}