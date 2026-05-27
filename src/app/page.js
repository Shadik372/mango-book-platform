"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import booksData from "@/data/books.json";
import { useRouter } from "next/navigation";

export default function Home() {
  // Initialize the Next.js router
  const router = useRouter();
  
  // Fetch top 4 books for the Featured section
  const featuredBooks = booksData.slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      
      {/* 1. Banner Section */}
      <section className="relative h-[500px] flex items-center justify-center bg-gradient-to-r from-primary-900 to-content1 overflow-hidden">
        <div className="z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Find Your Next Read
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Explore a vast collection of stories, technical guides, and scientific discoveries.
          </p>
          {/* FIX 1: Updated to use router.push */}
          <Button 
            onPress={() => router.push("/books")} 
            color="primary" 
            size="lg" 
            className="font-semibold shadow-lg"
          >
            Browse Now
          </Button>
        </div>
        {/* Decorative background overlay */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>
      </section>

      {/* 2. Marquee Section */}
      <section className="bg-primary/10 py-3 overflow-hidden whitespace-nowrap border-y border-primary/20">
        <div className="inline-block animate-marquee font-medium text-primary">
          <span className="mx-4">🚀 New Arrivals: The Quantum Age is now available!</span>
          <span className="mx-4">|</span>
          <span className="mx-4">✨ Special Discount on Memberships - Get 20% off today!</span>
          <span className="mx-4">|</span>
          <span className="mx-4">📚 Borrow up to 5 books at a time with premium.</span>
        </div>
      </section>

      {/* 3. Featured Books Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 w-full">
        <h2 className="text-3xl font-bold mb-10 text-center">Featured Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <div key={book.id} className="bg-content1 rounded-2xl overflow-hidden border border-divider flex flex-col hover:shadow-xl transition-shadow">
              <div className="h-48 overflow-hidden">
                <img src={book.image_url} alt={book.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="text-xs text-primary font-bold uppercase tracking-wider mb-2">{book.category}</div>
                <h3 className="text-lg font-bold mb-1 line-clamp-1">{book.title}</h3>
                <p className="text-sm text-default-500 mb-4">{book.author}</p>
                <div className="mt-auto pt-4">
                  {/* FIX 2: Updated to use router.push */}
                  <Button 
                    onPress={() => router.push(`/books/${book.id}`)} 
                    color="default" 
                    variant="flat" 
                    className="w-full"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Extra Section 1: Why Choose Us */}
      <section className="bg-content2 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Mango Books?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-2">Read Anywhere</h3>
              <p className="text-default-500">Access your borrowed books on any device, anywhere in the world.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Instant Borrowing</h3>
              <p className="text-default-500">No waiting in lines. Borrow digital copies instantly with one click.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-2">Secure Platform</h3>
              <p className="text-default-500">Your data and reading history are fully encrypted and protected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Extra Section 2: Newsletter */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-default-500 mb-8">Subscribe to our newsletter for the latest book releases and tech articles.</p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto" action="#">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-grow px-4 py-2 rounded-lg bg-content1 border border-divider focus:outline-none focus:border-primary"
            required
          />
          <Button type="submit" color="primary">Subscribe</Button>
        </form>
      </section>

    </div>
  );
}