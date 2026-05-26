"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@heroui/react";
import booksData from "@/data/books.json";

export default function AllBooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Extract unique categories for the sidebar, plus an "All" option
  const categories = ["All", "Story", "Tech", "Science"];

  // Filter the books based on search query AND selected category
  const filteredBooks = booksData.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8 w-full">
      
      {/* 1. Category Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-surface rounded-2xl p-6 border border-border sticky top-24">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <ul className="flex flex-col gap-2">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === category 
                      ? "bg-accent text-white font-semibold" 
                      : "hover:bg-surface-secondary text-default-600"
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-grow flex flex-col gap-6">
        
        {/* Search Bar */}
        <div className="bg-surface rounded-2xl p-4 border border-border">
          <Input
            type="text"
            placeholder="Search books by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            // Replaced size and classNames with standard Tailwind styling
            className="w-full p-2 text-lg rounded-xl bg-surface-secondary hover:bg-surface-tertiary transition-colors"
          />
        </div>

        {/* 3. Book Cards Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div key={book.id} className="bg-surface rounded-2xl overflow-hidden border border-border flex flex-col hover:shadow-xl transition-shadow">
                <div className="h-56 overflow-hidden">
                  <img src={book.image_url} alt={book.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-accent font-bold uppercase tracking-wider">{book.category}</span>
                    <span className="text-xs bg-surface-secondary px-2 py-1 rounded-full text-default-500">
                      {book.available_quantity} left
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 line-clamp-2">{book.title}</h3>
                  
                  <div className="mt-auto pt-4">
                    {/* Used standard v3 variant */}
                    <Button as={Link} href={`/books/${book.id}`} variant="secondary" className="w-full">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-surface rounded-2xl border border-border">
            <h3 className="text-2xl font-bold mb-2">No books found</h3>
            <p className="text-default-500">Try adjusting your search or category filter.</p>
            <Button 
              className="mt-6" 
              variant="tertiary"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

    </div>
  );
}