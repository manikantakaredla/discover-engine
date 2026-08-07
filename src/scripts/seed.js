import mongoose from 'mongoose';
import Product from '../models/Product.model.js';
import { logger } from '../config/logger.js';

const SEED_PRODUCTS = [
  {
    "title": "Aero Stride Pack",
    "description": "High quality pack designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Stride",
    "category": "Running Shoes",
    "price": 161.69,
    "stock": 188,
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    "tags": [
      "running",
      "shoes",
      "fitness",
      "athletic",
      "marathon",
      "aero"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Hyper Velocity Socks",
    "description": "High quality socks designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Velocity",
    "category": "Activewear",
    "price": 68.92,
    "stock": 120,
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
    ],
    "tags": [
      "shirt",
      "workout",
      "gym",
      "tee",
      "hyper"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Smart Aura Monitor",
    "description": "High quality monitor designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aura",
    "category": "Activewear",
    "price": 132.01,
    "stock": 164,
    "images": [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
    ],
    "tags": [
      "compression",
      "tights",
      "recovery",
      "gym",
      "smart"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Elite Aqua Tee",
    "description": "High quality tee designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aqua",
    "category": "Accessories",
    "price": 31.48,
    "stock": 67,
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
    ],
    "tags": [
      "water",
      "bottle",
      "hydration",
      "accessories",
      "elite"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Performance Pulse Tee",
    "description": "High quality tee designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Pulse",
    "category": "Electronics",
    "price": 140.11,
    "stock": 139,
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
    ],
    "tags": [
      "watch",
      "fitness",
      "tracker",
      "gps",
      "electronics",
      "performance"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Dynamic Flex Flask",
    "description": "High quality flask designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Flex",
    "category": "Accessories",
    "price": 41.05,
    "stock": 67,
    "images": [
      "https://images.unsplash.com/photo-1598266663412-7bb88e634794?w=800&q=80"
    ],
    "tags": [
      "bands",
      "resistance",
      "gym",
      "home",
      "dynamic"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Performance Trek Tee",
    "description": "High quality tee designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Trek",
    "category": "Running Shoes",
    "price": 107.35,
    "stock": 198,
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80"
    ],
    "tags": [
      "trail",
      "hiking",
      "outdoor",
      "shoes",
      "performance"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Performance Active Band",
    "description": "High quality band designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Active",
    "category": "Accessories",
    "price": 76.82,
    "stock": 151,
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    "tags": [
      "bag",
      "duffel",
      "gym",
      "travel",
      "performance"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Dynamic Stride Socks",
    "description": "High quality socks designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Stride",
    "category": "Running Shoes",
    "price": 32.24,
    "stock": 176,
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    "tags": [
      "running",
      "shoes",
      "fitness",
      "athletic",
      "marathon",
      "dynamic"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Ultra Velocity Shorts",
    "description": "High quality shorts designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Velocity",
    "category": "Activewear",
    "price": 122.57,
    "stock": 44,
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
    ],
    "tags": [
      "shirt",
      "workout",
      "gym",
      "tee",
      "ultra"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Ultra Aura Pack",
    "description": "High quality pack designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aura",
    "category": "Activewear",
    "price": 159.7,
    "stock": 198,
    "images": [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
    ],
    "tags": [
      "compression",
      "tights",
      "recovery",
      "gym",
      "ultra"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Smart Aqua Tights",
    "description": "High quality tights designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aqua",
    "category": "Accessories",
    "price": 123.34,
    "stock": 125,
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
    ],
    "tags": [
      "water",
      "bottle",
      "hydration",
      "accessories",
      "smart"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Smart Pulse Band",
    "description": "High quality band designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Pulse",
    "category": "Electronics",
    "price": 150.95,
    "stock": 191,
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
    ],
    "tags": [
      "watch",
      "fitness",
      "tracker",
      "gps",
      "electronics",
      "smart"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Aero Flex Runner",
    "description": "High quality runner designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Flex",
    "category": "Accessories",
    "price": 101.72,
    "stock": 12,
    "images": [
      "https://images.unsplash.com/photo-1598266663412-7bb88e634794?w=800&q=80"
    ],
    "tags": [
      "bands",
      "resistance",
      "gym",
      "home",
      "aero"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Essential Trek Jacket",
    "description": "High quality jacket designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Trek",
    "category": "Running Shoes",
    "price": 111.2,
    "stock": 18,
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80"
    ],
    "tags": [
      "trail",
      "hiking",
      "outdoor",
      "shoes",
      "essential"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Aero Active Pack",
    "description": "High quality pack designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Active",
    "category": "Accessories",
    "price": 116.83,
    "stock": 106,
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    "tags": [
      "bag",
      "duffel",
      "gym",
      "travel",
      "aero"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Prime Stride Socks",
    "description": "High quality socks designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Stride",
    "category": "Running Shoes",
    "price": 168.86,
    "stock": 135,
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    "tags": [
      "running",
      "shoes",
      "fitness",
      "athletic",
      "marathon",
      "prime"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Prime Velocity Shorts",
    "description": "High quality shorts designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Velocity",
    "category": "Activewear",
    "price": 38.58,
    "stock": 155,
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
    ],
    "tags": [
      "shirt",
      "workout",
      "gym",
      "tee",
      "prime"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Dynamic Aura Pack",
    "description": "High quality pack designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aura",
    "category": "Activewear",
    "price": 83.95,
    "stock": 170,
    "images": [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
    ],
    "tags": [
      "compression",
      "tights",
      "recovery",
      "gym",
      "dynamic"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Performance Aqua Tee",
    "description": "High quality tee designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aqua",
    "category": "Accessories",
    "price": 116.33,
    "stock": 80,
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
    ],
    "tags": [
      "water",
      "bottle",
      "hydration",
      "accessories",
      "performance"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Pro Pulse Tee",
    "description": "High quality tee designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Pulse",
    "category": "Electronics",
    "price": 124.88,
    "stock": 57,
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
    ],
    "tags": [
      "watch",
      "fitness",
      "tracker",
      "gps",
      "electronics",
      "pro"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Smart Flex Monitor",
    "description": "High quality monitor designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Flex",
    "category": "Accessories",
    "price": 31.63,
    "stock": 65,
    "images": [
      "https://images.unsplash.com/photo-1598266663412-7bb88e634794?w=800&q=80"
    ],
    "tags": [
      "bands",
      "resistance",
      "gym",
      "home",
      "smart"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Prime Trek Pack",
    "description": "High quality pack designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Trek",
    "category": "Running Shoes",
    "price": 60.53,
    "stock": 50,
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80"
    ],
    "tags": [
      "trail",
      "hiking",
      "outdoor",
      "shoes",
      "prime"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Max Active Flask",
    "description": "High quality flask designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Active",
    "category": "Accessories",
    "price": 83.71,
    "stock": 13,
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    "tags": [
      "bag",
      "duffel",
      "gym",
      "travel",
      "max"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Max Stride Band",
    "description": "High quality band designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Stride",
    "category": "Running Shoes",
    "price": 57.02,
    "stock": 88,
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    "tags": [
      "running",
      "shoes",
      "fitness",
      "athletic",
      "marathon",
      "max"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Pro Velocity Shorts",
    "description": "High quality shorts designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Velocity",
    "category": "Activewear",
    "price": 130.52,
    "stock": 194,
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
    ],
    "tags": [
      "shirt",
      "workout",
      "gym",
      "tee",
      "pro"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Cloud Aura Flask",
    "description": "High quality flask designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aura",
    "category": "Activewear",
    "price": 149.63,
    "stock": 23,
    "images": [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
    ],
    "tags": [
      "compression",
      "tights",
      "recovery",
      "gym",
      "cloud"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Elite Aqua Band",
    "description": "High quality band designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aqua",
    "category": "Accessories",
    "price": 67.48,
    "stock": 81,
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
    ],
    "tags": [
      "water",
      "bottle",
      "hydration",
      "accessories",
      "elite"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Advanced Pulse Tights",
    "description": "High quality tights designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Pulse",
    "category": "Electronics",
    "price": 160.16,
    "stock": 198,
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
    ],
    "tags": [
      "watch",
      "fitness",
      "tracker",
      "gps",
      "electronics",
      "advanced"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Prime Flex Tights",
    "description": "High quality tights designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Flex",
    "category": "Accessories",
    "price": 105.06,
    "stock": 131,
    "images": [
      "https://images.unsplash.com/photo-1598266663412-7bb88e634794?w=800&q=80"
    ],
    "tags": [
      "bands",
      "resistance",
      "gym",
      "home",
      "prime"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Elite Trek Tee",
    "description": "High quality tee designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Trek",
    "category": "Running Shoes",
    "price": 118.79,
    "stock": 106,
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80"
    ],
    "tags": [
      "trail",
      "hiking",
      "outdoor",
      "shoes",
      "elite"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Aero Active Runner",
    "description": "High quality runner designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Active",
    "category": "Accessories",
    "price": 119.43,
    "stock": 43,
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    "tags": [
      "bag",
      "duffel",
      "gym",
      "travel",
      "aero"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Prime Stride Tights",
    "description": "High quality tights designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Stride",
    "category": "Running Shoes",
    "price": 115.39,
    "stock": 46,
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    "tags": [
      "running",
      "shoes",
      "fitness",
      "athletic",
      "marathon",
      "prime"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Smart Velocity Flask",
    "description": "High quality flask designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Velocity",
    "category": "Activewear",
    "price": 26.44,
    "stock": 52,
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
    ],
    "tags": [
      "shirt",
      "workout",
      "gym",
      "tee",
      "smart"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Max Aura Monitor",
    "description": "High quality monitor designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aura",
    "category": "Activewear",
    "price": 33.14,
    "stock": 136,
    "images": [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
    ],
    "tags": [
      "compression",
      "tights",
      "recovery",
      "gym",
      "max"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Dynamic Aqua Flask",
    "description": "High quality flask designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aqua",
    "category": "Accessories",
    "price": 52.65,
    "stock": 120,
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
    ],
    "tags": [
      "water",
      "bottle",
      "hydration",
      "accessories",
      "dynamic"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Performance Pulse Shorts",
    "description": "High quality shorts designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Pulse",
    "category": "Electronics",
    "price": 21.4,
    "stock": 154,
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
    ],
    "tags": [
      "watch",
      "fitness",
      "tracker",
      "gps",
      "electronics",
      "performance"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Ultra Flex Shorts",
    "description": "High quality shorts designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Flex",
    "category": "Accessories",
    "price": 20.27,
    "stock": 63,
    "images": [
      "https://images.unsplash.com/photo-1598266663412-7bb88e634794?w=800&q=80"
    ],
    "tags": [
      "bands",
      "resistance",
      "gym",
      "home",
      "ultra"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Hyper Trek Shorts",
    "description": "High quality shorts designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Trek",
    "category": "Running Shoes",
    "price": 138.75,
    "stock": 51,
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80"
    ],
    "tags": [
      "trail",
      "hiking",
      "outdoor",
      "shoes",
      "hyper"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Essential Active Shorts",
    "description": "High quality shorts designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Active",
    "category": "Accessories",
    "price": 76.38,
    "stock": 118,
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    "tags": [
      "bag",
      "duffel",
      "gym",
      "travel",
      "essential"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Elite Stride Band",
    "description": "High quality band designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Stride",
    "category": "Running Shoes",
    "price": 134.33,
    "stock": 138,
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    "tags": [
      "running",
      "shoes",
      "fitness",
      "athletic",
      "marathon",
      "elite"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Elite Velocity Tee",
    "description": "High quality tee designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Velocity",
    "category": "Activewear",
    "price": 110.73,
    "stock": 208,
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
    ],
    "tags": [
      "shirt",
      "workout",
      "gym",
      "tee",
      "elite"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Smart Aura Tights",
    "description": "High quality tights designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aura",
    "category": "Activewear",
    "price": 27.66,
    "stock": 207,
    "images": [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
    ],
    "tags": [
      "compression",
      "tights",
      "recovery",
      "gym",
      "smart"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Advanced Aqua Flask",
    "description": "High quality flask designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aqua",
    "category": "Accessories",
    "price": 84.69,
    "stock": 82,
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
    ],
    "tags": [
      "water",
      "bottle",
      "hydration",
      "accessories",
      "advanced"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Advanced Pulse Tights",
    "description": "High quality tights designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Pulse",
    "category": "Electronics",
    "price": 109,
    "stock": 63,
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
    ],
    "tags": [
      "watch",
      "fitness",
      "tracker",
      "gps",
      "electronics",
      "advanced"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Advanced Flex Tee",
    "description": "High quality tee designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Flex",
    "category": "Accessories",
    "price": 29.02,
    "stock": 164,
    "images": [
      "https://images.unsplash.com/photo-1598266663412-7bb88e634794?w=800&q=80"
    ],
    "tags": [
      "bands",
      "resistance",
      "gym",
      "home",
      "advanced"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Aero Trek Tights",
    "description": "High quality tights designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Trek",
    "category": "Running Shoes",
    "price": 139.48,
    "stock": 89,
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80"
    ],
    "tags": [
      "trail",
      "hiking",
      "outdoor",
      "shoes",
      "aero"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Advanced Active Tee",
    "description": "High quality tee designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Active",
    "category": "Accessories",
    "price": 35.99,
    "stock": 113,
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    "tags": [
      "bag",
      "duffel",
      "gym",
      "travel",
      "advanced"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Hyper Stride Band",
    "description": "High quality band designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Stride",
    "category": "Running Shoes",
    "price": 43.9,
    "stock": 150,
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    "tags": [
      "running",
      "shoes",
      "fitness",
      "athletic",
      "marathon",
      "hyper"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Max Velocity Flask",
    "description": "High quality flask designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Velocity",
    "category": "Activewear",
    "price": 21.25,
    "stock": 93,
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
    ],
    "tags": [
      "shirt",
      "workout",
      "gym",
      "tee",
      "max"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Performance Aura Band",
    "description": "High quality band designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aura",
    "category": "Activewear",
    "price": 145.16,
    "stock": 87,
    "images": [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
    ],
    "tags": [
      "compression",
      "tights",
      "recovery",
      "gym",
      "performance"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Elite Aqua Runner",
    "description": "High quality runner designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aqua",
    "category": "Accessories",
    "price": 159.3,
    "stock": 180,
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
    ],
    "tags": [
      "water",
      "bottle",
      "hydration",
      "accessories",
      "elite"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Performance Pulse Tights",
    "description": "High quality tights designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Pulse",
    "category": "Electronics",
    "price": 133.37,
    "stock": 28,
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
    ],
    "tags": [
      "watch",
      "fitness",
      "tracker",
      "gps",
      "electronics",
      "performance"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Max Flex Flask",
    "description": "High quality flask designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Flex",
    "category": "Accessories",
    "price": 126.5,
    "stock": 150,
    "images": [
      "https://images.unsplash.com/photo-1598266663412-7bb88e634794?w=800&q=80"
    ],
    "tags": [
      "bands",
      "resistance",
      "gym",
      "home",
      "max"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Smart Trek Jacket",
    "description": "High quality jacket designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Trek",
    "category": "Running Shoes",
    "price": 151.49,
    "stock": 194,
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80"
    ],
    "tags": [
      "trail",
      "hiking",
      "outdoor",
      "shoes",
      "smart"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Smart Active Socks",
    "description": "High quality socks designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Active",
    "category": "Accessories",
    "price": 159.97,
    "stock": 140,
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    "tags": [
      "bag",
      "duffel",
      "gym",
      "travel",
      "smart"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Max Stride Tee",
    "description": "High quality tee designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Stride",
    "category": "Running Shoes",
    "price": 36.71,
    "stock": 153,
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    "tags": [
      "running",
      "shoes",
      "fitness",
      "athletic",
      "marathon",
      "max"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Hyper Velocity Runner",
    "description": "High quality runner designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Velocity",
    "category": "Activewear",
    "price": 73.87,
    "stock": 100,
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
    ],
    "tags": [
      "shirt",
      "workout",
      "gym",
      "tee",
      "hyper"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Smart Aura Band",
    "description": "High quality band designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aura",
    "category": "Activewear",
    "price": 75.4,
    "stock": 116,
    "images": [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
    ],
    "tags": [
      "compression",
      "tights",
      "recovery",
      "gym",
      "smart"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Advanced Aqua Flask",
    "description": "High quality flask designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aqua",
    "category": "Accessories",
    "price": 78.3,
    "stock": 88,
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
    ],
    "tags": [
      "water",
      "bottle",
      "hydration",
      "accessories",
      "advanced"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
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
