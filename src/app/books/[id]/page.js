"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import booksData from "@/data/books.json";

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  
  // Fetch the current user's session
  const { data: session, isPending } = useSession();
  const [isBorrowing, setIsBorrowing] = useState(false);

  // Find the specific book from your local JSON based on the URL parameter
  const book = booksData.find((b) => b.id === params.id);

  // PROTECTION LOGIC: Redirect to login if the user is not authenticated
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Show a custom loading spinner while Better Auth verifies the user's cookie
  if (isPending) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-default-500">Verifying access...</p>
      </div>
    );
  }

  // Prevent the page from flashing for a split second before the redirect happens
  if (!session) return null; 

  // Handle if someone types an invalid book ID in the URL (like /books/999)
  if (!book) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Book Not Found</h1>
        <Button as={Link} href="/books" variant="flat">Return to Library</Button>
      </div>
    );
  }

  const handleBorrow = () => {
    setIsBorrowing(true);
    // Simulate a tiny delay for realism, then show success
    setTimeout(() => {
      setIsBorrowing(false);
      alert(`Success! You have borrowed ${book.title}.`);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 w-full">
      <Link href="/books" className="text-primary hover:underline mb-8 inline-block font-semibold">
        &larr; Back to All Books
      </Link>

      <div className="bg-surface rounded-3xl border border-border overflow-hidden shadow-lg flex flex-col md:flex-row">
        {/* Left Side: Book Image */}
        <div className="w-full md:w-2/5 h-96 md:h-auto overflow-hidden bg-surface-secondary">
          <img 
            src={book.image_url} 
            alt={book.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Book Details */}
        <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              {book.category}
            </span>
            <span className="text-sm bg-surface-secondary px-3 py-1 rounded-full text-default-600 border border-border">
              {book.available_quantity} copies left
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-default-500 mb-6">By {book.author}</p>
          
          <div className="h-px w-full bg-border mb-6"></div>

          <h3 className="text-lg font-bold mb-2">Description</h3>
          <p className="text-default-600 leading-relaxed mb-8 flex-grow">
            {book.description}
          </p>

          {/* Borrow Action Panel */}
          <div className="bg-surface-secondary p-6 rounded-2xl border border-border flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
            <div>
              <p className="font-semibold">Want to read this?</p>
              <p className="text-sm text-default-500">You can borrow up to 3 books at a time.</p>
            </div>
            
            <Button 
              color="primary" 
              className="w-full sm:w-auto font-bold px-8 py-6 shadow-md"
              onClick={handleBorrow}
              isLoading={isBorrowing}
              isDisabled={book.available_quantity === 0}
            >
              {book.available_quantity === 0 ? "Out of Stock" : "Borrow Book"}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}