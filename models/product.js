import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // Main image
  otherImages: { type: [String], default: [] }, // Array of other image URLs
  link: { type: String, required: true },
  sale: { type: Boolean, default: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
});

// Reuse existing model if available, otherwise create a new one
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product; 