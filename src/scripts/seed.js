import mongoose from 'mongoose';
import Product from '../models/Product.model.js';
import { logger } from '../config/logger.js';

const SEED_PRODUCTS = [
  {
    "title": "Hyper Stride Band",
    "description": "High quality band designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Stride",
    "category": "Running Shoes",
    "price": 138.17,
    "stock": 124,
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
    "title": "Advanced Velocity Band",
    "description": "High quality band designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Velocity",
    "category": "Activewear",
    "price": 127.66,
    "stock": 143,
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
    ],
    "tags": [
      "shirt",
      "workout",
      "gym",
      "tee",
      "advanced"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Advanced Aura Tights",
    "description": "High quality tights designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aura",
    "category": "Activewear",
    "price": 146.03,
    "stock": 75,
    "images": [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
    ],
    "tags": [
      "compression",
      "tights",
      "recovery",
      "gym",
      "advanced"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Elite Aqua Shorts",
    "description": "High quality shorts designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aqua",
    "category": "Accessories",
    "price": 83.1,
    "stock": 66,
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
    "title": "Aero Pulse Tights",
    "description": "High quality tights designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Pulse",
    "category": "Electronics",
    "price": 126.7,
    "stock": 94,
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
    ],
    "tags": [
      "watch",
      "fitness",
      "tracker",
      "gps",
      "electronics",
      "aero"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Dynamic Flex Tights",
    "description": "High quality tights designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Flex",
    "category": "Accessories",
    "price": 137.22,
    "stock": 28,
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
    "title": "Advanced Trek Runner",
    "description": "High quality runner designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Trek",
    "category": "Running Shoes",
    "price": 143.93,
    "stock": 171,
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80"
    ],
    "tags": [
      "trail",
      "hiking",
      "outdoor",
      "shoes",
      "advanced"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Dynamic Active Marathon Kicks",
    "description": "High quality marathon kicks designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Active",
    "category": "Accessories",
    "price": 125.03,
    "stock": 104,
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    "tags": [
      "bag",
      "duffel",
      "gym",
      "travel",
      "dynamic"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Ultra Stride Tights",
    "description": "High quality tights designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Stride",
    "category": "Running Shoes",
    "price": 40.31,
    "stock": 158,
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    "tags": [
      "running",
      "shoes",
      "fitness",
      "athletic",
      "marathon",
      "ultra"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Elite Velocity Trail Shoes",
    "description": "High quality trail shoes designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Velocity",
    "category": "Activewear",
    "price": 84.23,
    "stock": 74,
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
    "title": "Elite Aura Tee",
    "description": "High quality tee designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aura",
    "category": "Activewear",
    "price": 24.35,
    "stock": 183,
    "images": [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
    ],
    "tags": [
      "compression",
      "tights",
      "recovery",
      "gym",
      "elite"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Prime Aqua Marathon Kicks",
    "description": "High quality marathon kicks designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aqua",
    "category": "Accessories",
    "price": 118.49,
    "stock": 25,
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
    ],
    "tags": [
      "water",
      "bottle",
      "hydration",
      "accessories",
      "prime"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Smart Pulse Tights",
    "description": "High quality tights designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Pulse",
    "category": "Electronics",
    "price": 63.3,
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
      "smart"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Elite Flex Flask",
    "description": "High quality flask designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Flex",
    "category": "Accessories",
    "price": 55.65,
    "stock": 141,
    "images": [
      "https://images.unsplash.com/photo-1598266663412-7bb88e634794?w=800&q=80"
    ],
    "tags": [
      "bands",
      "resistance",
      "gym",
      "home",
      "elite"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Aero Trek Pack",
    "description": "High quality pack designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Trek",
    "category": "Running Shoes",
    "price": 133.41,
    "stock": 52,
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
    "title": "Essential Active Shorts",
    "description": "High quality shorts designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Active",
    "category": "Accessories",
    "price": 142.73,
    "stock": 139,
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
    "title": "Advanced Stride Running Shoes",
    "description": "High quality running shoes designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Stride",
    "category": "Running Shoes",
    "price": 27.06,
    "stock": 192,
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    "tags": [
      "running",
      "shoes",
      "fitness",
      "athletic",
      "marathon",
      "advanced"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Smart Velocity Pack",
    "description": "High quality pack designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Velocity",
    "category": "Activewear",
    "price": 118.57,
    "stock": 196,
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
    "title": "Pro Aura Trail Shoes",
    "description": "High quality trail shoes designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aura",
    "category": "Activewear",
    "price": 131.18,
    "stock": 85,
    "images": [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
    ],
    "tags": [
      "compression",
      "tights",
      "recovery",
      "gym",
      "pro"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Max Aqua Pack",
    "description": "High quality pack designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aqua",
    "category": "Accessories",
    "price": 120.79,
    "stock": 40,
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
    ],
    "tags": [
      "water",
      "bottle",
      "hydration",
      "accessories",
      "max"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Advanced Pulse Marathon Kicks",
    "description": "High quality marathon kicks designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Pulse",
    "category": "Electronics",
    "price": 26.35,
    "stock": 97,
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
    "title": "Smart Flex Tee",
    "description": "High quality tee designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Flex",
    "category": "Accessories",
    "price": 167.29,
    "stock": 134,
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
    "title": "Hyper Trek Trail Shoes",
    "description": "High quality trail shoes designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Trek",
    "category": "Running Shoes",
    "price": 60.53,
    "stock": 143,
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
    "title": "Cloud Active Shorts",
    "description": "High quality shorts designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Active",
    "category": "Accessories",
    "price": 126.25,
    "stock": 25,
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    "tags": [
      "bag",
      "duffel",
      "gym",
      "travel",
      "cloud"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Pro Stride Band",
    "description": "High quality band designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Stride",
    "category": "Running Shoes",
    "price": 98.9,
    "stock": 114,
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    "tags": [
      "running",
      "shoes",
      "fitness",
      "athletic",
      "marathon",
      "pro"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Hyper Velocity Marathon Kicks",
    "description": "High quality marathon kicks designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Velocity",
    "category": "Activewear",
    "price": 60,
    "stock": 187,
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
    "title": "Performance Aura Shorts",
    "description": "High quality shorts designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aura",
    "category": "Activewear",
    "price": 91.55,
    "stock": 52,
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
    "title": "Cloud Aqua Tights",
    "description": "High quality tights designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aqua",
    "category": "Accessories",
    "price": 75.64,
    "stock": 56,
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
    ],
    "tags": [
      "water",
      "bottle",
      "hydration",
      "accessories",
      "cloud"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Hyper Pulse Trail Shoes",
    "description": "High quality trail shoes designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Pulse",
    "category": "Electronics",
    "price": 56.57,
    "stock": 20,
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
    ],
    "tags": [
      "watch",
      "fitness",
      "tracker",
      "gps",
      "electronics",
      "hyper"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Essential Flex Shorts",
    "description": "High quality shorts designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Flex",
    "category": "Accessories",
    "price": 20.79,
    "stock": 83,
    "images": [
      "https://images.unsplash.com/photo-1598266663412-7bb88e634794?w=800&q=80"
    ],
    "tags": [
      "bands",
      "resistance",
      "gym",
      "home",
      "essential"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Essential Trek Band",
    "description": "High quality band designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Trek",
    "category": "Running Shoes",
    "price": 98.46,
    "stock": 180,
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
    "title": "Dynamic Active Shorts",
    "description": "High quality shorts designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Active",
    "category": "Accessories",
    "price": 150.21,
    "stock": 131,
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    "tags": [
      "bag",
      "duffel",
      "gym",
      "travel",
      "dynamic"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Advanced Stride Tights",
    "description": "High quality tights designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Stride",
    "category": "Running Shoes",
    "price": 122.45,
    "stock": 113,
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    "tags": [
      "running",
      "shoes",
      "fitness",
      "athletic",
      "marathon",
      "advanced"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Cloud Velocity Tee",
    "description": "High quality tee designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Velocity",
    "category": "Activewear",
    "price": 53.93,
    "stock": 178,
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
    ],
    "tags": [
      "shirt",
      "workout",
      "gym",
      "tee",
      "cloud"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Ultra Aura Band",
    "description": "High quality band designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aura",
    "category": "Activewear",
    "price": 97.14,
    "stock": 30,
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
    "title": "Prime Aqua Socks",
    "description": "High quality socks designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aqua",
    "category": "Accessories",
    "price": 101.69,
    "stock": 95,
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
    ],
    "tags": [
      "water",
      "bottle",
      "hydration",
      "accessories",
      "prime"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Prime Pulse Monitor",
    "description": "High quality monitor designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Pulse",
    "category": "Electronics",
    "price": 38.79,
    "stock": 64,
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
    ],
    "tags": [
      "watch",
      "fitness",
      "tracker",
      "gps",
      "electronics",
      "prime"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Essential Flex Flask",
    "description": "High quality flask designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Flex",
    "category": "Accessories",
    "price": 126.24,
    "stock": 188,
    "images": [
      "https://images.unsplash.com/photo-1598266663412-7bb88e634794?w=800&q=80"
    ],
    "tags": [
      "bands",
      "resistance",
      "gym",
      "home",
      "essential"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Essential Trek Flask",
    "description": "High quality flask designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Trek",
    "category": "Running Shoes",
    "price": 164.94,
    "stock": 90,
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
    "title": "Dynamic Active Monitor",
    "description": "High quality monitor designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Active",
    "category": "Accessories",
    "price": 32.31,
    "stock": 76,
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    "tags": [
      "bag",
      "duffel",
      "gym",
      "travel",
      "dynamic"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Pro Stride Pack",
    "description": "High quality pack designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Stride",
    "category": "Running Shoes",
    "price": 54.47,
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
      "pro"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Prime Velocity Pack",
    "description": "High quality pack designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Velocity",
    "category": "Activewear",
    "price": 133.94,
    "stock": 60,
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
    "title": "Aero Aura Socks",
    "description": "High quality socks designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aura",
    "category": "Activewear",
    "price": 25.65,
    "stock": 108,
    "images": [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
    ],
    "tags": [
      "compression",
      "tights",
      "recovery",
      "gym",
      "aero"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Dynamic Aqua Pack",
    "description": "High quality pack designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aqua",
    "category": "Accessories",
    "price": 52.39,
    "stock": 74,
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
    "title": "Hyper Pulse Flask",
    "description": "High quality flask designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Pulse",
    "category": "Electronics",
    "price": 136.51,
    "stock": 194,
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
    ],
    "tags": [
      "watch",
      "fitness",
      "tracker",
      "gps",
      "electronics",
      "hyper"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Ultra Flex Socks",
    "description": "High quality socks designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Flex",
    "category": "Accessories",
    "price": 87.98,
    "stock": 178,
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
    "title": "Advanced Trek Jacket",
    "description": "High quality jacket designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Trek",
    "category": "Running Shoes",
    "price": 124.92,
    "stock": 176,
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80"
    ],
    "tags": [
      "trail",
      "hiking",
      "outdoor",
      "shoes",
      "advanced"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Prime Active Band",
    "description": "High quality band designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Active",
    "category": "Accessories",
    "price": 79.87,
    "stock": 132,
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    "tags": [
      "bag",
      "duffel",
      "gym",
      "travel",
      "prime"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Aero Stride Running Shoes",
    "description": "High quality running shoes designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Stride",
    "category": "Running Shoes",
    "price": 139.78,
    "stock": 18,
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
    "title": "Hyper Velocity Running Shoes",
    "description": "High quality running shoes designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Velocity",
    "category": "Activewear",
    "price": 98.23,
    "stock": 209,
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
    "title": "Hyper Aura Shorts",
    "description": "High quality shorts designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aura",
    "category": "Activewear",
    "price": 89.81,
    "stock": 109,
    "images": [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
    ],
    "tags": [
      "compression",
      "tights",
      "recovery",
      "gym",
      "hyper"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Essential Aqua Trail Shoes",
    "description": "High quality trail shoes designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aqua",
    "category": "Accessories",
    "price": 63.65,
    "stock": 42,
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
    ],
    "tags": [
      "water",
      "bottle",
      "hydration",
      "accessories",
      "essential"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Essential Pulse Trail Shoes",
    "description": "High quality trail shoes designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Pulse",
    "category": "Electronics",
    "price": 137.34,
    "stock": 155,
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
    ],
    "tags": [
      "watch",
      "fitness",
      "tracker",
      "gps",
      "electronics",
      "essential"
    ],
    "attributes": {
      "color": "Black",
      "size": "M"
    }
  },
  {
    "title": "Advanced Flex Running Shoes",
    "description": "High quality running shoes designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Flex",
    "category": "Accessories",
    "price": 161.24,
    "stock": 131,
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
    "title": "Prime Trek Runner",
    "description": "High quality runner designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Trek",
    "category": "Running Shoes",
    "price": 65.51,
    "stock": 70,
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
    "title": "Max Active Socks",
    "description": "High quality socks designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Active",
    "category": "Accessories",
    "price": 90.88,
    "stock": 191,
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
    "title": "Aero Stride Band",
    "description": "High quality band designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Stride",
    "category": "Running Shoes",
    "price": 117.67,
    "stock": 141,
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
    "title": "Hyper Velocity Tee",
    "description": "High quality tee designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Velocity",
    "category": "Activewear",
    "price": 100.41,
    "stock": 147,
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
    "title": "Dynamic Aura Flask",
    "description": "High quality flask designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aura",
    "category": "Activewear",
    "price": 55.3,
    "stock": 99,
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
    "title": "Aero Aqua Tights",
    "description": "High quality tights designed for maximum performance and durability. Built with advanced materials.",
    "brand": "Aqua",
    "category": "Accessories",
    "price": 65.89,
    "stock": 16,
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
    ],
    "tags": [
      "water",
      "bottle",
      "hydration",
      "accessories",
      "aero"
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
