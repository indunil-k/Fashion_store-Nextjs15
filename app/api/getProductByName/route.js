import connectPromise from '../../../mongodb/config';
import Product from '../../../models/product';
import { NextResponse } from 'next/server';

export async function GET(request) {
  console.log("API Route Hit: GET /getProductByName");
  await connectPromise;

  try {
    // Extract the productName from the query parameters
    const { searchParams } = new URL(request.url);
    const productName = searchParams.get("productName");

    console.log("Searching for product with name:", productName);

    if (!productName) {
      return NextResponse.json(
        { error: "Product name is required" },
        { status: 400 }
      );
    }

    // Perform a case-insensitive search using a regular expression
    const product = await Product.findOne({
      name: { $regex: new RegExp(`^${productName}$`, "i") }, // Case-insensitive match
    });

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