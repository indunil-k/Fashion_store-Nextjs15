import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Adjust the import path to your product model file
import Product from '../models/product.js';

// MongoDB Atlas connection string from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Sample product data with 24 products (all images set to "#")
const productData = [
  { id: 1, name: "Classic White T-Shirt", price: "29.99", image: "/placeholder.png", link: "#", sale: true },
  { id: 2, name: "Denim Jeans", price: "79.99", image: "/placeholder.png", link: "#", sale: false },
  { id: 3, name: "Running Shoes", price: "119.99", image: "/placeholder.png", link: "#", sale: true },
  { id: 4, name: "Leather Backpack", price: "89.99", image: "/placeholder.png", link: "#", sale: false },
  { id: 5, name: "Slim Fit Chinos", price: "49.99", image: "/placeholder.png", link: "#", sale: false },
  { id: 6, name: "Casual Hoodie", price: "39.99", image: "/placeholder.png", link: "#", sale: true },
  { id: 7, name: "Summer Dress", price: "59.99", image: "/placeholder.png", link: "#", sale: false },
  { id: 8, name: "Sporty Sneakers", price: "89.99", image: "/placeholder.png", link: "#", sale: true },
  { id: 9, name: "Elegant Blazer", price: "129.99", image: "/placeholder.png", link: "#", sale: false },
  { id: 10, name: "Basic Crewneck Sweater", price: "34.99", image: "/placeholder.png", link: "#", sale: true },
  { id: 11, name: "Casual Shorts", price: "29.99", image: "/placeholder.png", link: "#", sale: false },
  { id: 12, name: "Leather Belt", price: "24.99", image: "/placeholder.png", link: "#", sale: false },
  { id: 13, name: "Patterned Socks (Pack of 5)", price: "14.99", image: "/placeholder.png", link: "#", sale: true },
  { id: 14, name: "Formal Oxford Shirt", price: "44.99", image: "/placeholder.png", link: "#", sale: false },
  { id: 15, name: "Casual Cap", price: "19.99", image: "/placeholder.png", link: "#", sale: true },
  { id: 16, name: "Wool Scarf", price: "24.99", image: "/placeholder.png", link: "#", sale: false },
  { id: 17, name: "Denim Jacket", price: "79.99", image: "/placeholder.png", link: "#", sale: true },
  { id: 18, name: "Athletic Track Pants", price: "39.99", image: "/placeholder.png", link: "#", sale: false },
  { id: 19, name: "V-Neck Sweater", price: "49.99", image: "/placeholder.png", link: "#", sale: true },
  { id: 20, name: "Slim Fit Suit", price: "199.99", image: "/placeholder.png", link: "#", sale: false },
  { id: 21, name: "Casual Denim Skirt", price: "39.99", image: "/placeholder.png", link: "#", sale: true },
  { id: 22, name: "Button-Up Linen Shirt", price: "44.99", image: "/placeholder.png", link: "#", sale: false },
  { id: 23, name: "Striped Polo Shirt", price: "34.99", image: "/placeholder.png", link: "#", sale: true },
  { id: 24, name: "Casual Slip-On Loafers", price: "59.99", image: "/placeholder.png", link: "#", sale: false },
];


// Function to seed the database
async function seedDatabase() {
  try {
    // Connect to MongoDB using the connection string from .env.local
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const insertedProducts = await Product.insertMany(productData);
    console.log(`Seeded ${insertedProducts.length} products successfully`);

    // Verify the insertion by fetching all products from the DB
    const productsInDB = await Product.find({});
    console.log('Products in database:', productsInDB);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seeding function
seedDatabase();
