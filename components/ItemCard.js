import Image from "next/image";
import Link from "next/link";

export default function ItemCard({ product }) {
  return (
    <div className="border border-gray-700 rounded-lg p-6 bg-gray-800 hover:bg-gray-750 transition-all">
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
        href={`/viewProduct/${product._id}`} // Use product._id for the dynamic route
        className="mt-4 inline-block px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all"
      >
        View
      </Link>
    </div>
  );
}