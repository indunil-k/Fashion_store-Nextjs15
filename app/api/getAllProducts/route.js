// app/api/getAllProducts/route.js
import connectPromise from '../../../mongodb/config';
import Product from '../../../models/product';
import { NextResponse } from 'next/server';

export async function GET() {
  console.log("API Route Hit: GET");
  await connectPromise;

  try {
    const products = await Product.find();
    console.log("Products found:", products);
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
