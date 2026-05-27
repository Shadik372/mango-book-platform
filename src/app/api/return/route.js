import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get("bookId");

    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("mango_books");

    const deleteResult = await db.collection("borrows").deleteOne({
      userId: session.user.id,
      bookId: bookId
    });

    if (deleteResult.deletedCount === 0) {
      return NextResponse.json({ error: "Borrow record not found" }, { status: 404 });
    }

    let query = { id: bookId };
    if (bookId.length === 24) {
      const { ObjectId } = require('mongodb');
      query = { $or: [{ id: bookId }, { _id: new ObjectId(bookId) }] };
    }

    await db.collection("books").updateOne(
      query,
      { $inc: { available_quantity: 1 } }
    );

    return NextResponse.json({ success: true, message: "Book returned successfully!" });
  } catch (err) {
    console.error("Return Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}