// app/search-products/SearchComponent.js
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";

const API = (path) => `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`;

export default function SearchComponent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const res = await fetch(API(`/search?query=${encodeURIComponent(query)}`));
        if (!res.ok) throw new Error("Failed to fetch search results");

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Search error:", error);
        setError("Failed to load search results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading search results...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p className="text-center text-gray-400">No results found.</p>
      )}
    </div>
  );
}