"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";

export default function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  // Fetch the session state
  const { data: session, isPending } = useSession();

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-3 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Minimalist Brand */}
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl text-gray-900 tracking-tight flex items-center gap-2">
            <span className="text-2xl">🥭</span> Mango Books
          </Link>
        </div>

        {/* Center: Clean Navigation Links */}
        <ul className="hidden sm:flex gap-8 items-center">
          <li>
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === "/" ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/books"
              className={`text-sm font-medium transition-colors ${
                pathname === "/books" ? "text-blue-600" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              All Books
            </Link>
          </li>
        </ul>

        {/* Right Side: Ultra-Minimal Profile Area */}
        <div className="flex items-center justify-end min-w-[120px]">
          {isPending ? (
            <div className="w-8 h-8 rounded-full border-2 border-gray-100 border-t-blue-600 animate-spin"></div>
          ) : session ? (
            
            /* Pure Tailwind Hover Dropdown (No Provider Needed!) */
            <div className="relative group">
              
              {/* The Trigger: Just the Profile Picture */}
              <div className="flex items-center cursor-pointer py-2">
                <img
                  src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}&background=random`}
                  alt={session.user.name}
                  className="w-10 h-10 rounded-full border border-gray-200 object-cover shadow-sm group-hover:ring-2 ring-blue-500/30 transition-all"
                />
              </div>

              {/* The Floating Menu */}
              <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden transform origin-top-right group-hover:scale-100 scale-95">
                <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100">
                  <p className="text-xs text-gray-500">Signed in as</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {session.user.email}
                  </p>
                </div>
                <div className="p-1">
                  <Link
                    href="/profile"
                    className="block px-3 py-2 text-sm text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-3 py-2 text-sm text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>

          ) : (
            <div className="flex items-center gap-5">
              <Link
                href="/login"
                className="hidden sm:block text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Login
              </Link>
              <Button
                onPress={() => router.push("/register")}
                color="primary"
                size="sm"
                className="font-medium rounded-full px-5 shadow-sm"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}