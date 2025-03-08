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
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Product Container */}
      <div className="max-w-7xl mx-auto">
        {/* Product Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          {product.sale ? (
            <span className="inline-block mt-2 px-4 py-1 bg-pink-600 text-white text-sm font-semibold rounded-full">
              On Sale
            </span>
          ) : (
            <span className="inline-block mt-2 px-4 py-1 bg-red-600 text-white text-sm font-semibold rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="mb-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Other Images Grid */}
            {product.otherImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {product.otherImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg shadow-lg"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Price */}
            <p className="text-3xl font-bold text-pink-600">
              ${product.price.toFixed(2)}
            </p>

            {/* Description */}
            <div className="prose prose-invert">
              <p>{product.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800 text-sm text-gray-300 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Buy Now Button */}
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full md:w-auto px-8 py-3 bg-pink-600 text-white text-lg font-semibold rounded-lg hover:bg-pink-700 transition-all text-center"
            >
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}    //when double click the images, each image should be previewed.. can u understand what i am saying?