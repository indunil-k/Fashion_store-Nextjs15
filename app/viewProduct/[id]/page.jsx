import { notFound } from "next/navigation";

// Fetch product data from the API
const fetchProduct = async (id) => {
  try {
    console.log("Fetching product with ID:", id);

    // Fetch the product by ID
    const apiUrl = `http://localhost:3000/api/getProductById?id=${id}`;
    console.log("API URL:", apiUrl);

    const response = await fetch(apiUrl, {
      cache: "no-store", // Ensure fresh data
    });

    console.log("API Response Status:", response.status);

    if (!response.ok) {
      if (response.status === 404) {
        console.log("Product not found");
        return null;
      }
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    const product = await response.json();
    console.log("Product fetched:", product);
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export default async function ViewProduct({ params }) {
  console.log("Params:", params); // Log the params object

  // Fetch the product data
  const product = await fetchProduct(params.id);

  if (!product) {
    return notFound(); // Show 404 if product not found
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-gray-400 mt-2">${product.price.toFixed(2)}</p>
      <div className="mt-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>
      <p className="mt-4">{product.description}</p>
      <a
        href={product.link}
        className="mt-4 inline-block px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all"
      >
        Buy Now
      </a>
    </div>
  );
}