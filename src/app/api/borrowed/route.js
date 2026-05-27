import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("mango_books");

    const borrowedBooks = await db.collection("borrows").aggregate([
      { $match: { userId: userId } },
      { $sort: { borrowedAt: -1 } },
      {
        $lookup: {
          from: "books",
          localField: "bookId",
          foreignField: "id",
          as: "bookDetails"
        }
      },
      { $unwind: "$bookDetails" }
    ]).toArray();

    return NextResponse.json(borrowedBooks);
  } catch (err) {
    console.error("Dashboard Fetch Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}