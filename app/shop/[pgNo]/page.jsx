import ItemCard from "@/components/ItemCard";
//import { useState } from "react";

const products = [
  {
    id: 1,
    name: "1 Pcs Full Coverage Longline Sports Bra",
    price: "Dhs. 22.00 AED",
    image: "/images/product1.jpg",
    link: "/products/1",
    sale: true,
  },
  {
    id: 2,
    name: "1 Pieces High Impact Zip Front Sports Bra",
    price: "Dhs. 24.00 AED",
    image: "/images/product2.jpg",
    link: "/products/2",
    sale: true,
  },
  {
    id: 3,
    name: "1 Pieces Padded Panties Butt Enhancer",
    price: "Dhs. 22.00 AED",
    image: "/images/product3.jpg",
    link: "/products/3",
    sale: false,
  },
  {
    id: 4,
    name: "1 Pieces Women's High Waisted Tummy Control Leggings",
    price: "Dhs. 22.00 AED",
    image: "/images/product4.jpg",
    link: "/products/4",
    sale: true,
  },
  // More products...
];

export default function ShopPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Filters and Sorting */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-gray-500">Filter: </span>
          <select className="ml-2 p-2 border rounded bg-gray-800 text-white">
            <option>Availability</option>
            <option>In Stock</option>
            <option>Out of Stock</option>
          </select>
          <select className="ml-2 p-2 border rounded bg-gray-800 text-white">
            <option>Price</option>
            <option>Low to High</option>
            <option>High to Low</option>
          </select>
        </div>
        <div>
          <span className="text-gray-500">Sort by: </span>
          <select className="ml-2 p-2 border rounded bg-gray-800 text-white">
            <option>Alphabetically, A-Z</option>
            <option>Alphabetically, Z-A</option>
            <option>Price, Low to High</option>
            <option>Price, High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ItemCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-4">
        <button className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600">&lt;</button>
        <button className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600">1</button>
        <button className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600">2</button>
        <button className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600">3</button>
        <button className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600">4</button>
        <button className="p-2 bg-gray-700 text-white rounded hover:bg-gray-600">&gt;</button>
      </div>
    </div>
  );
}
