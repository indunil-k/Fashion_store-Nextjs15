import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

// Options for mongoose.connect (these can be customized as needed)
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let connectPromise;

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable to preserve the connection across hot reloads
  if (!global._mongooseConnectPromise) {
    global._mongooseConnectPromise = mongoose.connect(uri, options);
  }
  connectPromise = global._mongooseConnectPromise;
} else {
  // In production, create a new connection instance
  connectPromise = mongoose.connect(uri, options);
}

connectPromise
  .then(() => {
    console.log("Successfully connected to MongoDB with Mongoose");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB with Mongoose", error);
  });

export default connectPromise;
