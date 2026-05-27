"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";

export default function AppNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  
  const { data: session, isPending } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
    router.push("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm relative">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl text-gray-900 tracking-tight flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
            <span className="text-2xl">🥭</span> Mango Books
          </Link>
        </div>

        {/* Desktop Main Links */}
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

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="w-8 h-8 rounded-full border-2 border-gray-100 border-t-blue-600 animate-spin"></div>
          ) : session ? (
            
            /* Desktop User Profile (Hidden on Mobile) */
            <div className="relative group hidden sm:block">
              <div className="flex items-center cursor-pointer py-2">
                <img
                  src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}&background=random`}
                  alt={session.user.name}
                  className="w-10 h-10 rounded-full border border-gray-200 object-cover shadow-sm group-hover:ring-2 ring-blue-500/30 transition-all"
                />
              </div>

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
            /* Desktop Login Buttons (Hidden on Mobile) */
            <div className="hidden sm:flex items-center gap-5">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
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

          {/* Mobile Hamburger Toggle Button */}
          <button 
            className="sm:hidden p-2 -mr-2 text-gray-500 hover:text-gray-900 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Slide-Down Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg px-6 py-5 flex flex-col gap-4 z-50">
          <Link 
            href="/" 
            className={`text-base font-medium ${pathname === "/" ? "text-blue-600" : "text-gray-700"}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/books" 
            className={`text-base font-medium ${pathname === "/books" ? "text-blue-600" : "text-gray-700"}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            All Books
          </Link>
          
          <hr className="border-gray-100 my-1" />
          
          {session ? (
            <>
              {/* Mobile User Tag */}
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}&background=random`}
                  alt={session.user.name}
                  className="w-10 h-10 rounded-full border border-gray-200 object-cover"
                />
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-gray-900 truncate">{session.user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                </div>
              </div>

              <Link 
                href="/profile" 
                className="text-base font-medium text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="text-left text-base font-medium text-red-600"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3 mt-1">
              <Link 
                href="/login" 
                className="text-base font-medium text-gray-700 text-center py-2.5 rounded-xl border border-gray-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Button
                onPress={() => {
                  setIsMobileMenuOpen(false);
                  router.push("/register");
                }}
                color="primary"
                className="w-full font-medium rounded-xl py-6 shadow-sm"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}