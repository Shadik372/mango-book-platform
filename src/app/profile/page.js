"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  // State for your new live database books!
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isPending && !session) router.push("/login");
  }, [session, isPending, router]);

  // LIVE FETCH: Grab the user's specific borrowed books
  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/borrowed?userId=${session.user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setBorrowedBooks(data);
          setIsLoadingBooks(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoadingBooks(false);
        });
    }
  }, [session]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      setIsLoggingOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-default-500">Loading profile...</p>
      </div>
    );
  }

  if (!session) return null;
  const user = session.user;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 w-full flex flex-col gap-8">
      <h1 className="text-3xl font-bold">My Profile</h1>

      {/* 1. User Information Card */}
      <div className="bg-surface rounded-3xl border border-border p-8 shadow-lg flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="flex-shrink-0">
          <img 
            src={user.image || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
            alt={user.name} 
            className="w-32 h-32 rounded-full border-4 border-primary object-cover bg-surface-secondary" 
          />
        </div>

        <div className="flex-grow flex flex-col gap-2 text-center md:text-left">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-default-500 text-lg mb-2">{user.email}</p>
          <div className="inline-block px-3 py-1 bg-success/10 text-success rounded-full text-sm font-semibold w-max mx-auto md:mx-0">
            Active Member
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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

      {/* 2. LIVE Borrowed Books Area */}
      <div className="bg-surface rounded-3xl border border-border p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">My Borrowed Books</h2>
        
        {isLoadingBooks ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : borrowedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {borrowedBooks.map((record) => {
              const book = record.bookDetails; // The rich data from our database Join
              return (
                <div key={record._id} className="bg-surface-secondary border border-border rounded-xl p-4 flex gap-4 items-center hover:shadow-md transition-shadow">
                  <img src={book.image_url} alt={record.bookTitle} className="w-16 h-24 object-cover rounded-md shadow-sm" />
                  <div>
                    <span className="text-[10px] bg-accent/10 text-accent font-bold uppercase px-2 py-1 rounded-full mb-1 inline-block">
                      {book.category}
                    </span>
                    <h4 className="font-bold text-lg line-clamp-1">{record.bookTitle}</h4>
                    <p className="text-xs text-default-500 mt-1">
                      Borrowed: {new Date(record.borrowedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}