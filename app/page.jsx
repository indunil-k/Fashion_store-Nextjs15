"use client";  // Add this at the top

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ItemCard from "../components/ItemCard"; // Import the ItemCard component

//const API = (path) => `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`;

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("./api/getAllProducts");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="/hero.png"
          alt="Hero Banner"
          fill
          style={{ objectFit: "cover" }}
          className="absolute inset-0 opacity-70"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-6">Discover Elegance & Comfort</h1>
          <Link
            href="/shop/1"
            className="mt-4 px-8 py-3 bg-pink-600 text-white rounded-lg text-lg font-semibold hover:bg-pink-700 transition-all"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Welcome text */}
      <div className="py-16 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Store</h2>
        <p className="text-gray-400">
          Explore our wide range of products and find the perfect items for you.
        </p>
      </div>

      {/* Featured Products */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product) => (
              <ItemCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">Loading products...</p>
        )}
      </section>

      {/* View All Button */}
      <section>
        <div className="text-center mt-12">
          <Link
            href="/shop/1"
            className="inline-block px-8 py-3 bg-pink-600 text-white rounded-lg text-lg font-semibold hover:bg-pink-700 transition-all"
          >
            View All
          </Link>
        </div>
      </section>
      
      <br />

      {/* Subscribe Section */}
      <section className="py-16 bg-gray-800 text-center">
        <h2 className="text-3xl font-bold mb-6">Subscribe to Our E-mails</h2>
        <p className="text-gray-400 mb-8">Get exclusive updates and offers straight to your inbox.</p>
        <div className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 border border-gray-700 rounded-l-lg bg-gray-900 text-white focus:outline-none focus:border-pink-600"
          />
          <button className="px-6 py-3 bg-pink-600 text-white rounded-r-lg hover:bg-pink-700 transition-all">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}