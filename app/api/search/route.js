import { NextResponse } from "next/server";
import Product from "../../../models/product"; // Adjusted path to match getAllProducts
import connectPromise from "../../../mongodb/config"; // Adjusted path to match getAllProducts

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Search query is required" },
      { status: 400 }
    );
  }

  try {
    await connectPromise; // Connect to MongoDB

    // Search for products by name or tags
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, // Case-insensitive search by name
        { tags: { $regex: query, $options: "i" } }, // Case-insensitive search by tags
      ],
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 }
    );
  }
}