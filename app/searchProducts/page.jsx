"use client"; // Mark this as a Client Component

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";

const API = (path) => `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`;

// Main component for search results
function SearchResults() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  // Fetch search results from the API
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
        console.log("API Response:", data); // Log the API response
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
      <br />
      <br />
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

// Wrapper component with Suspense boundary
export default function SearchProductsPage() {
  return (
    <Suspense fallback={<div className="text-center text-gray-400">Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}