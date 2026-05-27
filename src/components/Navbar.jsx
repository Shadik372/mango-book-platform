"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
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
    <nav className="border-b border-border bg-surface px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-2xl text-primary">
            🥭 Mango Books
          </Link>
        </div>

        {/* Center: Links (Desktop) */}
        <ul className="hidden sm:flex gap-6 items-center">
          <li>
            <Link
              href="/"
              className={
                pathname === "/"
                  ? "text-primary font-semibold"
                  : "text-default-500 hover:text-primary transition-colors"
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/books"
              className={
                pathname === "/books"
                  ? "text-primary font-semibold"
                  : "text-default-500 hover:text-primary transition-colors"
              }
            >
              All Books
            </Link>
          </li>
        </ul>

        {/* Right Side: Auth / Profile */}
        <div className="flex items-center justify-end">
          {isPending ? (
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
          ) : session ? (
            <div className="flex items-center gap-4">
              <Link
                href="/profile"
                className="hidden sm:block text-sm font-medium text-default-600 hover:text-primary transition-colors"
              >
                Dashboard
              </Link>

              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  {/* Changed <button> to <div> to prevent nested HTML buttons */}
                  <div className="transition-transform outline-none cursor-pointer">
                    <Avatar
                      className="w-10 h-10 rounded-full border-2 border-primary bg-surface-secondary text-primary"
                      src={session.user.image}
                      name={session.user.name}
                    />
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  {/* Note: v3 Dropdowns require both 'key' and 'id' for items */}
                  <DropdownItem
                    key="profile"
                    id="profile"
                    textValue="Signed in as"
                    className="h-14 gap-2 opacity-100 cursor-default"
                  >
                    <p className="font-semibold text-xs text-default-500">
                      Signed in as
                    </p>
                    <p className="font-bold text-primary">
                      {session.user.email}
                    </p>
                  </DropdownItem>
                  <DropdownItem
                    key="dashboard"
                    id="dashboard"
                    href="/profile"
                    textValue="My Profile"
                    className="font-medium"
                  >
                    My Profile
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    id="logout"
                    textValue="Sign Out"
                    color="danger"
                    onPress={handleLogout}
                    className="font-semibold"
                  >
                    Sign Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="hidden sm:flex text-default-500 hover:text-primary font-medium transition-colors"
              >
                Login
              </Link>
              <Button
                onPress={() => router.push("/register")}
                color="primary"
                variant="flat"
                className="font-semibold"
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
