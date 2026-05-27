import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import booksData from "@/data/books.json";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("mango_books");
    const collection = db.collection("books");

    await collection.deleteMany({});

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