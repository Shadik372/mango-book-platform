"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import booksData from "@/data/books.json";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  const featuredBooks = booksData.slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 flex items-center justify-center overflow-hidden bg-white border-b border-gray-100">
        
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>

        <div className="z-10 text-center px-6 max-w-4xl mx-auto relative">
          
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
            Welcome to the Future of Reading
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-gray-900 tracking-tight leading-tight">
            Discover Your Next <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Great Adventure
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Explore a vast, digitized collection of gripping stories, technical guides, and scientific discoveries—all instantly accessible.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              onPress={() => router.push("/books")} 
              color="primary" 
              size="lg" 
              className="font-bold text-base px-8 py-6 rounded-full shadow-lg shadow-blue-500/30 hover:scale-105 transition-transform"
            >
              Browse Library
            </Button>
            <Button 
              onPress={() => router.push("/register")} 
              variant="bordered" 
              size="lg" 
              className="font-bold text-base px-8 py-6 rounded-full border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:scale-105 transition-transform bg-white"
            >
              Join for Free
            </Button>
          </div>

        </div>
      </section>

      <section className="bg-primary/10 py-3 overflow-hidden whitespace-nowrap border-y border-primary/20">
        <div className="inline-block animate-marquee font-medium text-primary">
          <span className="mx-4">New Arrivals: The Quantum Age is now available!</span>
          <span className="mx-4">|</span>
          <span className="mx-4">Special Discount on Memberships - Get 20% off today!</span>
          <span className="mx-4">|</span>
          <span className="mx-4">Borrow up to 5 books at a time with premium.</span>
        </div>
      </section>

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