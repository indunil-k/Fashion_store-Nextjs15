import ProductGrid from "@/components/ProductGrid";

// Fetch all products from the API
const fetchProducts = async () => {
  try {
    console.log("Fetching all products");

    // Use an environment variable for the base URL
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/getAllProducts`;
    console.log("API URL:", apiUrl);

    const response = await fetch(apiUrl, {
      cache: "no-store", // Ensure fresh data
    });

    console.log("API Response Status:", response.status);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const products = await response.json();
    console.log("Products fetched:", products);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return empty array on error to avoid breaking the page
  }
};

export default async function ShopPage() {
  // Fetch the products data server-side
  const products = await fetchProducts();

  return (
    <div className="bg-gray-900 text-white">
      {products.length === 0 ? (
        <p className="text-center text-gray-400">No products available</p>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}

//comment