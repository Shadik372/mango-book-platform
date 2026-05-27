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

    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized! Please log in." }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("mango_books");

    const currentBorrowsCount = await db.collection("borrows").countDocuments({
      userId: session.user.id
    });

    if (currentBorrowsCount >= 3) {
      return NextResponse.json({ error: "Limit reached! You cannot borrow more than 3 books at a time." }, { status: 400 });
    }

    let query = { id: id };
    if (id.length === 24) {
      query = { $or: [{ id: id }, { _id: new ObjectId(id) }] };
    }

    const book = await db.collection("books").findOne(query);
    if (!book || book.available_quantity <= 0) {
      return NextResponse.json({ error: "Sorry, this book is currently out of stock." }, { status: 400 });
    }

    const actualBookId = book.id || id;

    const alreadyBorrowed = await db.collection("borrows").findOne({
      userId: session.user.id,
      bookId: actualBookId
    });

    if (alreadyBorrowed) {
      return NextResponse.json({ error: "You have already borrowed this book!" }, { status: 400 });
    }

    // C. Deduct 1 from the available quantity in MongoDB
    await db.collection("books").updateOne(
      query,
      { $inc: { available_quantity: -1 } }
    );

    // D. Save a record of the transaction to the user's history
    await db.collection("borrows").insertOne({
      userId: session.user.id,
      userEmail: session.user.email,
      bookId: actualBookId, 
      bookTitle: book.title,
      borrowedAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "Book borrowed successfully!" });
  } catch (err) {
    console.error("Borrow Error:", err);
    return NextResponse.json({ error: "Server error while borrowing." }, { status: 500 });
  }
}