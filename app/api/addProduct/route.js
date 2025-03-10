import connectPromise from '../../../mongodb/config';
import Product from '../../../models/product';
import { NextResponse } from 'next/server';

export async function POST(req) {
  console.log("API Route Hit: POST /addProduct");
  await connectPromise;

  try {
    const body = await req.json();
    const { name, price, image, otherImages, link, sale, description, tags } = body;

    if (!name || !price) {
      return NextResponse.json({ error: "Name and price are required" }, { status: 400 });
    }

    const newProduct = new Product({ 
      id: Date.now(),  // Generate a unique ID
      name, 
      price, 
      image, 
      otherImages, // Add otherImages field
      link, 
      sale, 
      description, 
      tags 
    });

    const savedProduct = await newProduct.save();
    console.log("Product added:", {
      id: newProduct.id,
      name: newProduct.name,
      price: newProduct.price,
      image: newProduct.image,
      otherImages: newProduct.otherImages, // Log otherImages
      link: newProduct.link,
      sale: newProduct.sale,
      description: newProduct.description,
      tags: newProduct.tags
    });

    return NextResponse.json(savedProduct, { status: 201 });

  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}