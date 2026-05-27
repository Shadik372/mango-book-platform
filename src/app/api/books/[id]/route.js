import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ObjectId } from "mongodb"; // 1. We imported ObjectId here!

// 1. GET: Fetch a single book from MongoDB
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db("mango_books");

    // 2. THE FIX: Smart Query handles both simple strings and MongoDB ObjectIds
    let query = { id: id };
    if (id.length === 24) {
      query = { $or: [{ id: id }, { _id: new ObjectId(id) }] };
    }

    const book = await db.collection("books").findOne(query);
    if (!book) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json(book);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// 2. POST: Securely handle borrowing the book
export async function POST(request, { params }) {
  try {
    const { id } = await params;

    // A. Verify the user is actually logged in on the backend
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized! Please log in." }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("mango_books");

    // 3. THE FIX: Apply the exact same Smart Query here so the borrow function doesn't crash!
    let query = { id: id };
    if (id.length === 24) {
      query = { $or: [{ id: id }, { _id: new ObjectId(id) }] };
    }

    // B. Check if the book exists and is in stock
    const book = await db.collection("books").findOne(query);
    if (!book || book.available_quantity <= 0) {
      return NextResponse.json({ error: "Sorry, this book is currently out of stock." }, { status: 400 });
    }

    // C. Deduct 1 from the available quantity in MongoDB
    await db.collection("books").updateOne(
      query, // <- We use the smart query here to update the exact right book
      { $inc: { available_quantity: -1 } }
    );

    // D. Save a record of the transaction to the user's history
    await db.collection("borrows").insertOne({
      userId: session.user.id,
      userEmail: session.user.email,
      bookId: id,
      bookTitle: book.title,
      borrowedAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "Book borrowed successfully!" });
  } catch (err) {
    console.error("Borrow Error:", err);
    return NextResponse.json({ error: "Server error while borrowing." }, { status: 500 });
  }
}