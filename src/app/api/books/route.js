import { NextResponse } from "next/server";
import clientPromise from "@/lib/db"; 
import booksData from "@/data/books.json"; // We will use this to auto-seed!

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mango_books");
    const collection = db.collection("books");

    // 1. Ask MongoDB for all the books
    let books = await collection.find({}).toArray();

    // 2. THE MAGIC: If the database is empty, auto-seed it with your JSON file!
    if (books.length === 0) {
      console.log("Database empty! Seeding books from JSON...");
      await collection.insertMany(booksData);
      // Fetch them again now that they are saved in the database
      books = await collection.find({}).toArray();
    }

    // 3. Send the database books back to the frontend
    return NextResponse.json(books);
    
  } catch (error) {
    console.error("Database connection failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch books from database" }, 
      { status: 500 }
    );
  }
}