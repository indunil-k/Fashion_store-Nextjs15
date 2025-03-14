import Image from "next/image";
import Link from "next/link";

export default function ItemCard({ product }) {
  return (
    <div className="relative p-[2px] group rounded-lg">
      {/* Thin red glow border effect */}
      <div className="absolute inset-0 rounded-lg z-[1] opacity-50 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-red-500 via-pink-600 to-red-500"></div>
      
      {/* Card content */}
      <div className="relative rounded-lg p-6 bg-gray-800 z-10">
        <div className="relative h-64">
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
        </div>
        <h3 className="mt-4 text-xl font-semibold">{product.name}</h3>
        <p className="text-gray-400 mt-2">${product.price.toFixed(2)}</p>
        <Link
          href={`/viewProduct/${product._id}`}
          className="mt-4 inline-block px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all"
        >
          View
        </Link>
      </div>
    </div>
  );
}