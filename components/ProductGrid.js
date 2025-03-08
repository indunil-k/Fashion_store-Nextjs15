"use client"; // Add this at the top for client-side interactivity

import { useState } from "react";
import ItemCard from "@/components/ItemCard";

export default function ProductGrid({ products }) {
  const [filters, setFilters] = useState({
    availability: "all",
    price: "all",
  });
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Number of products per page

  // Apply filters and sorting
  const filteredProducts = products.filter((product) => {
    if (filters.availability === "in-stock" && !product.sale) return false;
    if (filters.availability === "out-of-stock" && product.sale) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low-to-high") return a.price - b.price;
    if (sortBy === "price-high-to-low") return b.price - a.price;
    if (sortBy === "name-a-z") return a.name.localeCompare(b.name);
    if (sortBy === "name-z-a") return b.name.localeCompare(a.name);
    return 0;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Filters and Sorting */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-gray-500">Filter: </span>
          <select
            className="ml-2 p-2 border rounded bg-gray-800 text-white"
            onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
          >
            <option value="all">All</option>
            <option value="in-stock">In Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
        <div>
          <span className="text-gray-500">Sort by: </span>
          <select
            className="ml-2 p-2 border rounded bg-gray-800 text-white"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-low-to-high">Price, Low to High</option>
            <option value="price-high-to-low">Price, High to Low</option>
            <option value="name-a-z">Alphabetically, A-Z</option>
            <option value="name-z-a">Alphabetically, Z-A</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <ItemCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: Math.ceil(sortedProducts.length / productsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            className={`p-2 bg-gray-700 text-white rounded hover:bg-gray-600 ${
              currentPage === i + 1 ? "bg-gray-600" : ""
            }`}
            onClick={() => paginate(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(sortedProducts.length / productsPerPage)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}