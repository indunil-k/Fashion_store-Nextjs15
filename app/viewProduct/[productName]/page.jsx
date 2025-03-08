import { notFound } from "next/navigation";

// Fetch product data from the API
const fetchProduct = async (slug) => {
    try {
      // Convert the slug back to the product name
      const productName = slug.replace(/-/g, " ");
  
      console.log("Fetching product with name:", productName);
  
      // Fetch the product by name
      const apiUrl = `http://localhost:3000/api/getProductByName?productName=${encodeURIComponent(productName)}`;
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
  // Fetch the product data
  const product = await fetchProduct(params.productName);

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