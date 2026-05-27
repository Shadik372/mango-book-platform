"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { useSession, signOut } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);

  const [returningId, setReturningId] = useState(null);

  const handleReturn = async (bookId) => {
    setReturningId(bookId);
    try {
      const res = await fetch(`/api/return?bookId=${bookId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBorrowedBooks((prev) => prev.filter((record) => record.bookDetails.id !== bookId && record.bookId !== bookId));
      } else {
        alert("Failed to return book.");
      }
    } catch (err) {
      alert("Network error occurred.");
    } finally {
      setReturningId(null);
    }
  };

  useEffect(() => {
    if (!isPending && !session) router.push("/login");
  }, [session, isPending, router]);

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
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Loading profile...</p>
      </div>
    );
  }

  if (!session) return null;
  const user = session.user;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 w-full flex flex-col gap-8">
      
      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center relative overflow-hidden">
        
        {/* Subtle background glow effect */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

        {/* Profile Avatar with Status Dot */}
        <div className="flex-shrink-0 relative">
          <img 
            src={user.image || `https://ui-avatars.com/api/?name=${user.name}&background=random`} 
            alt={user.name} 
            className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover shadow-md border-4 border-white outline outline-1 outline-gray-100" 
          />
          <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full" title="Online"></div>
        </div>

        {/* User Details */}
        <div className="flex-grow flex flex-col gap-1 text-center md:text-left z-10">
          
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{user.name}</h2>
            <span className="inline-flex px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-bold uppercase tracking-wider w-max mx-auto md:mx-0 shadow-sm">
              Active Member
            </span>
          </div>
          
          <p className="text-gray-500 text-lg mb-5">{user.email}</p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Button
              onPress={() => router.push("/profile/update")}
              className="bg-blue-600 text-white font-medium px-6 py-2.5 rounded-xl shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors"
            >
              Update Information
            </Button>
            <Button
              onPress={handleLogout}
              isLoading={isLoggingOut}
              className="bg-red-50 text-red-600 font-medium px-6 py-2.5 rounded-xl border border-red-100 hover:bg-red-100 transition-colors"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 tracking-tight">My Borrowed Books</h2>
        
        {isLoadingBooks ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : borrowedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {borrowedBooks.map((record) => {
              const book = record.bookDetails; 
              return (
                <div key={record._id} className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-5 items-center hover:shadow-md hover:border-blue-100 transition-all group">
                  
                  <img 
                    src={book.image_url} 
                    alt={record.bookTitle} 
                    className="w-20 h-28 object-cover rounded-lg shadow-sm cursor-pointer" 
                    onClick={() => router.push(`/books/${book.id}`)}
                  />
                  
                  <div className="flex flex-col flex-grow">
                    <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-100 font-bold uppercase px-2 py-1 rounded-full mb-2 inline-block w-max">
                      {book.category}
                    </span>
                    
                    <h4 
                      className="font-bold text-lg text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors cursor-pointer"
                      onClick={() => router.push(`/books/${book.id}`)}
                    >
                      {record.bookTitle}
                    </h4>
                    
                    <p className="text-xs text-gray-500 mt-1 mb-3">
                      Borrowed: <span className="font-medium text-gray-700">{new Date(record.borrowedAt).toLocaleDateString()}</span>
                    </p>
                    
                    <Button
                      size="sm"
                      className="w-max bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors shadow-sm text-xs font-semibold px-3"
                      isLoading={returningId === (book.id || record.bookId)}
                      onPress={() => handleReturn(book.id || record.bookId)}
                    >
                      Return Book
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
            <div className="text-5xl mb-4 opacity-80">📚</div>
            <p className="text-gray-500 mb-6 font-medium text-lg">
              You haven't borrowed any books yet.
            </p>
            <Button
              onPress={() => router.push("/books")}
              className="bg-white text-gray-900 border border-gray-200 font-medium px-6 py-2 rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
            >
              Browse Library
            </Button>
          </div>
        )}
      </div>
      
    </div>
  );
}