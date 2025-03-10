"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";

export default function AddProduct() {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "", // Main image URL
    otherImages: [], // Array of other image URLs
    link: "",
    sale: false,
    description: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingOtherImages, setUploadingOtherImages] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : name === "tags" ? value.split(",").map(tag => tag.trim()) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/addProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        throw new Error("Failed to add product");
      }
      router.push("/admin");
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center py-16">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Add New Product</h2>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Main Product Image</label>
          <CldUploadWidget
            uploadPreset="my_upload_preset" // Replace with your upload preset
            onSuccess={(result) => {
              setProduct({ ...product, image: result.info.secure_url }); // Store main image URL
              setUploading(false);
            }}
            onUpload={() => setUploading(true)} // Show uploading state
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
              >
                Upload Main Image
              </button>
            )}
          </CldUploadWidget>
          {uploading && <p className="text-yellow-400 mt-2">Uploading...</p>}
          {product.image && (
            <img src={product.image} alt="Main Product" className="mt-3 w-32 rounded-lg" />
          )}
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Other Product Images</label>
          <CldUploadWidget
            uploadPreset="my_upload_preset" // Replace with your upload preset
            onSuccess={(result) => {
              setProduct((prev) => ({
                ...prev,
                otherImages: [...prev.otherImages, result.info.secure_url], // Add new image URL to array
              }));
              setUploadingOtherImages(false);
            }}
            onUpload={() => setUploadingOtherImages(true)} // Show uploading state
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
              >
                Upload Additional Image
              </button>
            )}
          </CldUploadWidget>
          {uploadingOtherImages && <p className="text-yellow-400 mt-2">Uploading...</p>}
          {product.otherImages.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {product.otherImages.map((image, index) => (
                <img key={index} src={image} alt={`Other Product ${index + 1}`} className="w-32 rounded-lg" />
              ))}
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Product Link</label>
          <input
            type="text"
            name="link"
            value={product.link}
            onChange={handleChange}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">On Sale</label>
          <input
            type="checkbox"
            name="sale"
            checked={product.sale}
            onChange={handleChange}
            className="h-6 w-6 bg-gray-800 border-gray-600 rounded-lg"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            value={product.tags}
            onChange={handleChange}
            className="w-full p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
            placeholder="e.g., gaming, wireless, RGB"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-8 py-3 bg-pink-600 text-white rounded-lg"
            disabled={loading || uploading || uploadingOtherImages}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}