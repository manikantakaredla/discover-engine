import mongoose from 'mongoose';
import Product from '../models/Product.model.js';
import { logger } from '../config/logger.js';

const SEED_PRODUCTS = [
  {
    title: "Cloud-Step Pro Running Shoes",
    description: "Engineered for maximum energy return and supreme comfort. Perfect for your marathon training and daily fitness journey.",
    brand: "Stride",
    category: "Running Shoes",
    price: 165.00,
    stock: 120,
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"],
    tags: ["running", "shoes", "fitness", "athletic", "marathon"],
    attributes: { color: "Crimson Red", size: "US 10" }
  },
  {
    title: "Aero Glide Marathon Runners",
    description: "Ultra-lightweight racing shoes built for speed and endurance.",
    brand: "Velocity",
    category: "Running Shoes",
    price: 145.00,
    stock: 85,
    images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80"],
    tags: ["running", "speed", "marathon", "shoes"],
    attributes: { color: "Onyx Black", size: "US 9" }
  },
  {
    title: "Pro Compression Tights",
    description: "High-performance compression wear for optimal muscle recovery.",
    brand: "Aura",
    category: "Activewear",
    price: 89.00,
    stock: 200,
    images: ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"],
    tags: ["compression", "tights", "recovery", "gym"],
    attributes: { color: "Navy Blue", size: "M" }
  },
  {
    title: "Ultra-Light Workout Tee",
    description: "Moisture-wicking activewear shirt for high-intensity training.",
    brand: "Velocity",
    category: "Activewear",
    price: 45.00,
    stock: 300,
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"],
    tags: ["shirt", "workout", "gym", "tee"],
    attributes: { color: "Glacier White", size: "L" }
  },
  {
    title: "Hydration Flask 32oz",
    description: "Insulated stainless steel water bottle keeps drinks cold for 24 hours.",
    brand: "Aqua",
    category: "Accessories",
    price: 35.00,
    stock: 150,
    images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"],
    tags: ["water", "bottle", "hydration", "accessories"],
    attributes: { color: "Matte Black", size: "32oz" }
  },
  {
    title: "Smart Fitness Watch",
    description: "Advanced health tracking, heart rate monitoring, and GPS.",
    brand: "Pulse",
    category: "Electronics",
    price: 199.00,
    stock: 50,
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"],
    tags: ["watch", "fitness", "tracker", "gps", "electronics"],
    attributes: { color: "Silver", size: "One Size" }
  }
];

export const seedDatabase = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      logger.info('Database is empty. Seeding mock products...');
      await Product.insertMany(SEED_PRODUCTS);
      logger.info(`Successfully seeded ${SEED_PRODUCTS.length} products.`);
    } else {
      logger.info(`Database already contains ${count} products. Skipping seed.`);
    }
  } catch (error) {
    logger.error(`Error seeding database: ${error.message}`);
  }
};
