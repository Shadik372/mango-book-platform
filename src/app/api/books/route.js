import { NextResponse } from "next/server";
import clientPromise from "@/lib/db"; 
import booksData from "@/data/books.json"; 

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mango_books");
    const collection = db.collection("books");

    let books = await collection.find({}).toArray();

    if (books.length === 0) {
      console.log("Database empty! Seeding books from JSON...");
      await collection.insertMany(booksData);
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