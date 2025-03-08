"use client"; // Add this at the top for client-side interactivity

import { useEffect, useState } from "react";
import ProductGrid from "@/components/ProductGrid";

const API = (path) => `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`;

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API("/getAllProducts"));
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-900 text-white">
      {loading ? (
        <p className="text-center text-gray-400">Loading products...</p>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}