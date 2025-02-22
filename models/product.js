import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
  sale: { type: Boolean, default: true }
});

// Reuse existing model if available, otherwise create a new one
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
