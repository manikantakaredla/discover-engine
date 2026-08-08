import app from '../src/app.js';
import mongoose from 'mongoose';
import { connectDB } from '../src/config/database.js';

// Vercel serverless function entrypoint
let isConnected = false;

export default async function handler(req, res) {
  // Ensure database is connected before handling the request
  if (!isConnected && mongoose.connection.readyState !== 1) {
    await connectDB();
    isConnected = true;
  }
  
  // Forward the request to the Express app
  return app(req, res);
}
