import connectPromise from '../../../mongodb/config';
import Product from '../../../models/product';
import { NextResponse } from 'next/server';

export async function GET(request) {
  console.log("API Route Hit: GET /getProductById");
  await connectPromise;

  try {
    // Extract the product ID from the query parameters
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("id");

    console.log("Searching for product with ID:", productId);

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    console.log("Product found:", product);
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}