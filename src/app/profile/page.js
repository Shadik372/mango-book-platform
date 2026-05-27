"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Avatar } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();

  // Fetch the current user's session from Better Auth
  const { data: session, isPending } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // PROTECTION LOGIC: Redirect to login if not authenticated
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Show spinner while checking auth state
  if (isPending) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-default-500">Loading profile...</p>
      </div>
    );
  }

  // Prevent UI flashing before redirect
  if (!session) return null;

  // Extract the user object from the secure session
  const user = session.user;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      // Better Auth destroys the secure cookie, now we kick them back to login
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 w-full flex flex-col gap-8">
      <h1 className="text-3xl font-bold">My Profile</h1>

      {/* 1. User Information Card */}
      <div className="bg-surface rounded-3xl border border-border p-8 shadow-lg flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="flex-shrink-0">
          <div className="flex-shrink-0">
          <img 
            src={user.image || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
            alt={user.name} 
            className="w-32 h-32 rounded-full border-4 border-primary object-cover bg-surface-secondary" 
          />
        </div>
        </div>

        <div className="flex-grow flex flex-col gap-2 text-center md:text-left">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-default-500 text-lg mb-2">{user.email}</p>
          <div className="inline-block px-3 py-1 bg-success/10 text-success rounded-full text-sm font-semibold w-max mx-auto md:mx-0">
            Active Member
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            {/* The Update Button is now correctly placed inside the UI! */}
            <Button
              onPress={() => router.push("/profile/update")}
              color="primary"
              variant="flat"
              className="font-semibold px-8"
            >
              Update Information
            </Button>

            <Button
              color="danger"
              variant="flat"
              onPress={handleLogout}
              className="font-semibold px-8"
              isLoading={isLoggingOut}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Borrowed Books Placeholder */}
      <div className="bg-surface rounded-3xl border border-border p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">My Borrowed Books</h2>
        <div className="flex flex-col items-center justify-center py-12 bg-surface-secondary rounded-2xl border border-border border-dashed">
          <div className="text-4xl mb-4">📚</div>
          <p className="text-default-600 mb-4 font-medium">
            You haven't borrowed any books yet.
          </p>
          <Button
            color="primary"
            variant="flat"
            onPress={() => router.push("/books")}
          >
            Browse Library
          </Button>
        </div>
      </div>
    </div>
  );
}