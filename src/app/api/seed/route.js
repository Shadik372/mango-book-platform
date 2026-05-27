import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import booksData from "@/data/books.json";

export async function GET() {
  try {
    // 1. Connect to the database
    const client = await clientPromise;
    const db = client.db("mango_books");
    const collection = db.collection("books");

    // 2. Optional: Clear out any existing books so we don't create duplicates
    // if you accidentally run this script twice.
    await collection.deleteMany({});

    // 3. Insert the entire JSON array into MongoDB
    const result = await collection.insertMany(booksData);

    return NextResponse.json({
      success: true,
      message: `Successfully inserted ${result.insertedCount} books into MongoDB!`,
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to seed database" },
      { status: 500 }
    );
  }
}