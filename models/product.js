import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
  sale: { type: Boolean, default: true },
  description: { type: String, required: true }, // Optional description field
  tags: { type: [String], required: true } // Array of hashtags
});

// Reuse existing model if available, otherwise create a new one
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
