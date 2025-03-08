import Image from "next/image";
import Link from "next/link";

// Helper function to create a URL-friendly slug
const createSlug = (name) => {
  return name
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Remove consecutive hyphens
};

export default function ItemCard({ product }) {
  // Create a slug from the product name
  const slug = createSlug(product.name);

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
        href={`/viewProduct/${slug}`} // Dynamic route using the slug
        className="mt-4 inline-block px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all"
      >
        Buy Now
      </Link>
    </div>
  );
}