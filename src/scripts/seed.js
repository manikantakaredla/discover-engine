import mongoose from 'mongoose';
import Product from '../models/Product.model.js';
import { logger } from '../config/logger.js';

const SEED_PRODUCTS = [
  {
    "title": "Modern Trek Sneakers",
    "description": "High quality sneakers designed for maximum performance, style, and durability. Built with cotton materials. Perfect for your lifestyle.",
    "brand": "Trek",
    "category": "Running Shoes",
    "price": 30.72,
    "stock": 84,
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    "tags": [
      "athletic",
      "trail",
      "outdoor",
      "modern"
    ],
    "attributes": {
      "color": "Black",
      "style": "Sporty",
      "material": "Cotton",
      "size": "10"
    },
    "rating": 3.7,
    "reviewCount": 378
  },
  {
    "title": "Sleek Aqua Runner",
    "description": "High quality runner designed for maximum performance, style, and durability. Built with metal materials. Perfect for your lifestyle.",
    "brand": "Aqua",
    "category": "Running Shoes",
    "price": 103.5,
    "stock": 48,
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80"
    ],
    "tags": [
      "sneakers",
      "trail",
      "running",
      "sleek"
    ],
    "attributes": {
      "color": "Blue",
      "style": "Casual",
      "material": "Metal",
      "size": "9"
    },
    "rating": 3.8,
    "reviewCount": 466
  },
  {
    "title": "Prime Flex Trail Shoes",
    "description": "High quality trail shoes designed for maximum performance, style, and durability. Built with wood materials. Perfect for your lifestyle.",
    "brand": "Flex",
    "category": "Running Shoes",
    "price": 137.47,
    "stock": 149,
    "images": [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80"
    ],
    "tags": [
      "running",
      "shoes",
      "fitness",
      "athletic",
      "prime"
    ],
    "attributes": {
      "color": "Red",
      "style": "Sporty",
      "material": "Wood",
      "size": "9"
    },
    "rating": 3.2,
    "reviewCount": 203
  },
  {
    "title": "Modern Nexus Sneakers",
    "description": "High quality sneakers designed for maximum performance, style, and durability. Built with glass materials. Perfect for your lifestyle.",
    "brand": "Nexus",
    "category": "Running Shoes",
    "price": 173.05,
    "stock": 57,
    "images": [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80"
    ],
    "tags": [
      "running",
      "shoes",
      "sneakers",
      "modern"
    ],
    "attributes": {
      "color": "Blue",
      "style": "Modern",
      "material": "Glass",
      "size": "10"
    },
    "rating": 3.9,
    "reviewCount": 429
  },
  {
    "title": "Smart Apex Runner",
    "description": "High quality runner designed for maximum performance, style, and durability. Built with leather materials. Perfect for your lifestyle.",
    "brand": "Apex",
    "category": "Running Shoes",
    "price": 167.52,
    "stock": 77,
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    "tags": [
      "sport",
      "outdoor",
      "marathon",
      "running",
      "sneakers",
      "smart"
    ],
    "attributes": {
      "color": "Blue",
      "style": "Classic",
      "material": "Leather",
      "size": "L"
    },
    "rating": 4.3,
    "reviewCount": 428
  },
  {
    "title": "Vintage Apex Runner",
    "description": "High quality runner designed for maximum performance, style, and durability. Built with glass materials. Perfect for your lifestyle.",
    "brand": "Apex",
    "category": "Running Shoes",
    "price": 103.55,
    "stock": 81,
    "images": [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80"
    ],
    "tags": [
      "sport",
      "outdoor",
      "shoes",
      "fitness",
      "sneakers",
      "vintage"
    ],
    "attributes": {
      "color": "Blue",
      "style": "Sporty",
      "material": "Glass",
      "size": "M"
    },
    "rating": 4.3,
    "reviewCount": 41
  },
  {
    "title": "Hyper Apex Trainers",
    "description": "High quality trainers designed for maximum performance, style, and durability. Built with cotton materials. Perfect for your lifestyle.",
    "brand": "Apex",
    "category": "Running Shoes",
    "price": 113.75,
    "stock": 144,
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80"
    ],
    "tags": [
      "sneakers",
      "shoes",
      "athletic",
      "sport",
      "hyper"
    ],
    "attributes": {
      "color": "Blue",
      "style": "Casual",
      "material": "Cotton",
      "size": "11"
    },
    "rating": 4,
    "reviewCount": 468
  },
  {
    "title": "Vintage Apex Kicks",
    "description": "High quality kicks designed for maximum performance, style, and durability. Built with wood materials. Perfect for your lifestyle.",
    "brand": "Apex",
    "category": "Running Shoes",
    "price": 103.16,
    "stock": 134,
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80"
    ],
    "tags": [
      "trail",
      "shoes",
      "running",
      "outdoor",
      "sneakers",
      "vintage"
    ],
    "attributes": {
      "color": "Green",
      "style": "Sporty",
      "material": "Wood",
      "size": "S"
    },
    "rating": 3.7,
    "reviewCount": 89
  },
  {
    "title": "Sleek Terra Marathon Kicks",
    "description": "High quality marathon kicks designed for maximum performance, style, and durability. Built with plastic materials. Perfect for your lifestyle.",
    "brand": "Terra",
    "category": "Running Shoes",
    "price": 81.91,
    "stock": 64,
    "images": [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80"
    ],
    "tags": [
      "marathon",
      "sport",
      "outdoor",
      "sleek"
    ],
    "attributes": {
      "color": "Blue",
      "style": "Modern",
      "material": "Plastic",
      "size": "8"
    },
    "rating": 4.9,
    "reviewCount": 163
  },
  {
    "title": "Classic Aura Runner",
    "description": "High quality runner designed for maximum performance, style, and durability. Built with leather materials. Perfect for your lifestyle.",
    "brand": "Aura",
    "category": "Running Shoes",
    "price": 166.31,
    "stock": 62,
    "images": [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80"
    ],
    "tags": [
      "outdoor",
      "running",
      "sneakers",
      "athletic",
      "marathon",
      "classic"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Modern",
      "material": "Leather",
      "size": "L"
    },
    "rating": 4.3,
    "reviewCount": 165
  },
  {
    "title": "Modern Velocity Racers",
    "description": "High quality racers designed for maximum performance, style, and durability. Built with cotton materials. Perfect for your lifestyle.",
    "brand": "Velocity",
    "category": "Running Shoes",
    "price": 31.37,
    "stock": 28,
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    "tags": [
      "sneakers",
      "athletic",
      "fitness",
      "modern"
    ],
    "attributes": {
      "color": "White",
      "style": "Classic",
      "material": "Cotton",
      "size": "9"
    },
    "rating": 3.6,
    "reviewCount": 93
  },
  {
    "title": "Smart Trek Trail Shoes",
    "description": "High quality trail shoes designed for maximum performance, style, and durability. Built with cotton materials. Perfect for your lifestyle.",
    "brand": "Trek",
    "category": "Running Shoes",
    "price": 106.94,
    "stock": 44,
    "images": [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80"
    ],
    "tags": [
      "running",
      "shoes",
      "fitness",
      "marathon",
      "sport",
      "smart"
    ],
    "attributes": {
      "color": "Black",
      "style": "Classic",
      "material": "Cotton",
      "size": "10"
    },
    "rating": 4.5,
    "reviewCount": 472
  },
  {
    "title": "Classic Terra Racers",
    "description": "High quality racers designed for maximum performance, style, and durability. Built with metal materials. Perfect for your lifestyle.",
    "brand": "Terra",
    "category": "Running Shoes",
    "price": 78.38,
    "stock": 89,
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    ],
    "tags": [
      "fitness",
      "marathon",
      "outdoor",
      "shoes",
      "classic"
    ],
    "attributes": {
      "color": "Blue",
      "style": "Modern",
      "material": "Metal",
      "size": "8"
    },
    "rating": 5,
    "reviewCount": 362
  },
  {
    "title": "Rugged Active Kicks",
    "description": "High quality kicks designed for maximum performance, style, and durability. Built with metal materials. Perfect for your lifestyle.",
    "brand": "Active",
    "category": "Running Shoes",
    "price": 47.71,
    "stock": 51,
    "images": [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80"
    ],
    "tags": [
      "running",
      "outdoor",
      "shoes",
      "rugged"
    ],
    "attributes": {
      "color": "Green",
      "style": "Casual",
      "material": "Metal",
      "size": "XL"
    },
    "rating": 4.5,
    "reviewCount": 502
  },
  {
    "title": "Premium Trek Runner",
    "description": "High quality runner designed for maximum performance, style, and durability. Built with glass materials. Perfect for your lifestyle.",
    "brand": "Trek",
    "category": "Running Shoes",
    "price": 124.43,
    "stock": 46,
    "images": [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80"
    ],
    "tags": [
      "athletic",
      "marathon",
      "sneakers",
      "premium"
    ],
    "attributes": {
      "color": "Green",
      "style": "Modern",
      "material": "Glass",
      "size": "S"
    },
    "rating": 3.1,
    "reviewCount": 263
  },
  {
    "title": "Cloud Terra Shorts",
    "description": "High quality shorts designed for maximum performance, style, and durability. Built with glass materials. Perfect for your lifestyle.",
    "brand": "Terra",
    "category": "Apparel",
    "price": 123.05,
    "stock": 201,
    "images": [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
    ],
    "tags": [
      "shirt",
      "tee",
      "fashion",
      "cloud"
    ],
    "attributes": {
      "color": "Red",
      "style": "Minimalist",
      "material": "Glass",
      "size": "10"
    },
    "rating": 4,
    "reviewCount": 148
  },
  {
    "title": "Prime Active Beanie",
    "description": "High quality beanie designed for maximum performance, style, and durability. Built with cotton materials. Perfect for your lifestyle.",
    "brand": "Active",
    "category": "Apparel",
    "price": 33.36,
    "stock": 190,
    "images": [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80"
    ],
    "tags": [
      "workout",
      "recovery",
      "shirt",
      "prime"
    ],
    "attributes": {
      "color": "White",
      "style": "Casual",
      "material": "Cotton",
      "size": "11"
    },
    "rating": 4.5,
    "reviewCount": 43
  },
  {
    "title": "Hyper Velocity Vest",
    "description": "High quality vest designed for maximum performance, style, and durability. Built with plastic materials. Perfect for your lifestyle.",
    "brand": "Velocity",
    "category": "Apparel",
    "price": 195.81,
    "stock": 200,
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
    ],
    "tags": [
      "style",
      "tights",
      "shirt",
      "hyper"
    ],
    "attributes": {
      "color": "Green",
      "style": "Classic",
      "material": "Plastic",
      "size": "M"
    },
    "rating": 4.1,
    "reviewCount": 386
  },
  {
    "title": "Cloud Zenith Beanie",
    "description": "High quality beanie designed for maximum performance, style, and durability. Built with plastic materials. Perfect for your lifestyle.",
    "brand": "Zenith",
    "category": "Apparel",
    "price": 148.25,
    "stock": 198,
    "images": [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
    ],
    "tags": [
      "tee",
      "tights",
      "shirt",
      "cloud"
    ],
    "attributes": {
      "color": "Black",
      "style": "Modern",
      "material": "Plastic",
      "size": "M"
    },
    "rating": 4,
    "reviewCount": 376
  },
  {
    "title": "Pro Flex Tee",
    "description": "High quality tee designed for maximum performance, style, and durability. Built with plastic materials. Perfect for your lifestyle.",
    "brand": "Flex",
    "category": "Apparel",
    "price": 184.9,
    "stock": 172,
    "images": [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80"
    ],
    "tags": [
      "shirt",
      "clothing",
      "fashion",
      "pro"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Minimalist",
      "material": "Plastic",
      "size": "11"
    },
    "rating": 3.6,
    "reviewCount": 184
  },
  {
    "title": "Essential Nova Vest",
    "description": "High quality vest designed for maximum performance, style, and durability. Built with plastic materials. Perfect for your lifestyle.",
    "brand": "Nova",
    "category": "Apparel",
    "price": 175.45,
    "stock": 176,
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
    ],
    "tags": [
      "tights",
      "recovery",
      "shirt",
      "style",
      "essential"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Minimalist",
      "material": "Plastic",
      "size": "10"
    },
    "rating": 4.9,
    "reviewCount": 130
  },
  {
    "title": "Premium Eco Beanie",
    "description": "High quality beanie designed for maximum performance, style, and durability. Built with glass materials. Perfect for your lifestyle.",
    "brand": "Eco",
    "category": "Apparel",
    "price": 174.49,
    "stock": 45,
    "images": [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80"
    ],
    "tags": [
      "tee",
      "compression",
      "tights",
      "style",
      "workout",
      "premium"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Casual",
      "material": "Glass",
      "size": "11"
    },
    "rating": 3.1,
    "reviewCount": 412
  },
  {
    "title": "Ergonomic Aqua Shorts",
    "description": "High quality shorts designed for maximum performance, style, and durability. Built with metal materials. Perfect for your lifestyle.",
    "brand": "Aqua",
    "category": "Apparel",
    "price": 77.16,
    "stock": 117,
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
    ],
    "tags": [
      "clothing",
      "tee",
      "gym",
      "style",
      "ergonomic"
    ],
    "attributes": {
      "color": "Red",
      "style": "Modern",
      "material": "Metal",
      "size": "S"
    },
    "rating": 3.2,
    "reviewCount": 341
  },
  {
    "title": "Smart Stride Jacket",
    "description": "High quality jacket designed for maximum performance, style, and durability. Built with synthetic materials. Perfect for your lifestyle.",
    "brand": "Stride",
    "category": "Apparel",
    "price": 91.98,
    "stock": 116,
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
    ],
    "tags": [
      "tee",
      "gym",
      "workout",
      "clothing",
      "tights",
      "smart"
    ],
    "attributes": {
      "color": "Blue",
      "style": "Sporty",
      "material": "Synthetic",
      "size": "XL"
    },
    "rating": 3.1,
    "reviewCount": 498
  },
  {
    "title": "Minimalist Aqua Tights",
    "description": "High quality tights designed for maximum performance, style, and durability. Built with plastic materials. Perfect for your lifestyle.",
    "brand": "Aqua",
    "category": "Apparel",
    "price": 37.06,
    "stock": 20,
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
    ],
    "tags": [
      "tee",
      "clothing",
      "gym",
      "fashion",
      "minimalist"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Casual",
      "material": "Plastic",
      "size": "8"
    },
    "rating": 4.9,
    "reviewCount": 95
  },
  {
    "title": "Sleek Trek Tee",
    "description": "High quality tee designed for maximum performance, style, and durability. Built with cotton materials. Perfect for your lifestyle.",
    "brand": "Trek",
    "category": "Apparel",
    "price": 131.99,
    "stock": 41,
    "images": [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80"
    ],
    "tags": [
      "shirt",
      "workout",
      "clothing",
      "recovery",
      "sleek"
    ],
    "attributes": {
      "color": "Red",
      "style": "Classic",
      "material": "Cotton",
      "size": "XL"
    },
    "rating": 4,
    "reviewCount": 145
  },
  {
    "title": "Max Flex Beanie",
    "description": "High quality beanie designed for maximum performance, style, and durability. Built with leather materials. Perfect for your lifestyle.",
    "brand": "Flex",
    "category": "Apparel",
    "price": 151.36,
    "stock": 39,
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
    ],
    "tags": [
      "shirt",
      "workout",
      "compression",
      "gym",
      "max"
    ],
    "attributes": {
      "color": "White",
      "style": "Minimalist",
      "material": "Leather",
      "size": "11"
    },
    "rating": 4.9,
    "reviewCount": 368
  },
  {
    "title": "Vintage Apex Pants",
    "description": "High quality pants designed for maximum performance, style, and durability. Built with wood materials. Perfect for your lifestyle.",
    "brand": "Apex",
    "category": "Apparel",
    "price": 74.55,
    "stock": 81,
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
    ],
    "tags": [
      "compression",
      "clothing",
      "tee",
      "vintage"
    ],
    "attributes": {
      "color": "Green",
      "style": "Minimalist",
      "material": "Wood",
      "size": "XL"
    },
    "rating": 4.4,
    "reviewCount": 464
  },
  {
    "title": "Cloud Nexus Shorts",
    "description": "High quality shorts designed for maximum performance, style, and durability. Built with cotton materials. Perfect for your lifestyle.",
    "brand": "Nexus",
    "category": "Apparel",
    "price": 199.19,
    "stock": 151,
    "images": [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
    ],
    "tags": [
      "shirt",
      "workout",
      "tights",
      "style",
      "gym",
      "cloud"
    ],
    "attributes": {
      "color": "Red",
      "style": "Minimalist",
      "material": "Cotton",
      "size": "11"
    },
    "rating": 4.6,
    "reviewCount": 329
  },
  {
    "title": "Aero Apex Pants",
    "description": "High quality pants designed for maximum performance, style, and durability. Built with synthetic materials. Perfect for your lifestyle.",
    "brand": "Apex",
    "category": "Apparel",
    "price": 101.75,
    "stock": 28,
    "images": [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"
    ],
    "tags": [
      "tee",
      "gym",
      "workout",
      "clothing",
      "shirt",
      "aero"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Modern",
      "material": "Synthetic",
      "size": "S"
    },
    "rating": 4.1,
    "reviewCount": 488
  },
  {
    "title": "Sleek Velocity Hat",
    "description": "High quality hat designed for maximum performance, style, and durability. Built with glass materials. Perfect for your lifestyle.",
    "brand": "Velocity",
    "category": "Accessories",
    "price": 173.75,
    "stock": 80,
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    "tags": [
      "travel",
      "water",
      "hydration",
      "duffel",
      "bands",
      "sleek"
    ],
    "attributes": {
      "color": "White",
      "style": "Modern",
      "material": "Glass"
    },
    "rating": 3.4,
    "reviewCount": 469
  },
  {
    "title": "Rugged Aqua Hat",
    "description": "High quality hat designed for maximum performance, style, and durability. Built with wood materials. Perfect for your lifestyle.",
    "brand": "Aqua",
    "category": "Accessories",
    "price": 198.68,
    "stock": 180,
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
    ],
    "tags": [
      "water",
      "hydration",
      "bag",
      "resistance",
      "rugged"
    ],
    "attributes": {
      "color": "Black",
      "style": "Minimalist",
      "material": "Wood"
    },
    "rating": 4.7,
    "reviewCount": 16
  },
  {
    "title": "Pro Zenith Hat",
    "description": "High quality hat designed for maximum performance, style, and durability. Built with wood materials. Perfect for your lifestyle.",
    "brand": "Zenith",
    "category": "Accessories",
    "price": 46.25,
    "stock": 95,
    "images": [
      "https://images.unsplash.com/photo-1598266663412-7bb88e634794?w=800&q=80"
    ],
    "tags": [
      "water",
      "duffel",
      "travel",
      "pro"
    ],
    "attributes": {
      "color": "Black",
      "style": "Sporty",
      "material": "Wood"
    },
    "rating": 4.1,
    "reviewCount": 493
  },
  {
    "title": "Minimalist Terra Hat",
    "description": "High quality hat designed for maximum performance, style, and durability. Built with metal materials. Perfect for your lifestyle.",
    "brand": "Terra",
    "category": "Accessories",
    "price": 48.11,
    "stock": 181,
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    "tags": [
      "resistance",
      "bottle",
      "everyday",
      "minimalist"
    ],
    "attributes": {
      "color": "Black",
      "style": "Casual",
      "material": "Metal"
    },
    "rating": 4.2,
    "reviewCount": 463
  },
  {
    "title": "Prime Velocity Hat",
    "description": "High quality hat designed for maximum performance, style, and durability. Built with glass materials. Perfect for your lifestyle.",
    "brand": "Velocity",
    "category": "Accessories",
    "price": 195.73,
    "stock": 88,
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    "tags": [
      "everyday",
      "water",
      "duffel",
      "gear",
      "prime"
    ],
    "attributes": {
      "color": "Green",
      "style": "Modern",
      "material": "Glass"
    },
    "rating": 5,
    "reviewCount": 350
  },
  {
    "title": "Advanced Nexus Sunglasses",
    "description": "High quality sunglasses designed for maximum performance, style, and durability. Built with cotton materials. Perfect for your lifestyle.",
    "brand": "Nexus",
    "category": "Accessories",
    "price": 75.53,
    "stock": 39,
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    "tags": [
      "hydration",
      "bands",
      "travel",
      "water",
      "advanced"
    ],
    "attributes": {
      "color": "Blue",
      "style": "Casual",
      "material": "Cotton"
    },
    "rating": 4.9,
    "reviewCount": 114
  },
  {
    "title": "Cloud Lumina Pack",
    "description": "High quality pack designed for maximum performance, style, and durability. Built with metal materials. Perfect for your lifestyle.",
    "brand": "Lumina",
    "category": "Accessories",
    "price": 93.7,
    "stock": 141,
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    "tags": [
      "bag",
      "everyday",
      "duffel",
      "cloud"
    ],
    "attributes": {
      "color": "White",
      "style": "Sporty",
      "material": "Metal"
    },
    "rating": 3.4,
    "reviewCount": 155
  },
  {
    "title": "Elite Nexus Pack",
    "description": "High quality pack designed for maximum performance, style, and durability. Built with wood materials. Perfect for your lifestyle.",
    "brand": "Nexus",
    "category": "Accessories",
    "price": 191.03,
    "stock": 94,
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    "tags": [
      "duffel",
      "bag",
      "hydration",
      "everyday",
      "travel",
      "elite"
    ],
    "attributes": {
      "color": "White",
      "style": "Classic",
      "material": "Wood"
    },
    "rating": 4.7,
    "reviewCount": 443
  },
  {
    "title": "Rugged Pulse Flask",
    "description": "High quality flask designed for maximum performance, style, and durability. Built with wood materials. Perfect for your lifestyle.",
    "brand": "Pulse",
    "category": "Accessories",
    "price": 22.91,
    "stock": 125,
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
    ],
    "tags": [
      "bands",
      "bag",
      "duffel",
      "resistance",
      "water",
      "rugged"
    ],
    "attributes": {
      "color": "Black",
      "style": "Sporty",
      "material": "Wood"
    },
    "rating": 5,
    "reviewCount": 203
  },
  {
    "title": "Classic Apex Belt",
    "description": "High quality belt designed for maximum performance, style, and durability. Built with glass materials. Perfect for your lifestyle.",
    "brand": "Apex",
    "category": "Accessories",
    "price": 23.15,
    "stock": 36,
    "images": [
      "https://images.unsplash.com/photo-1598266663412-7bb88e634794?w=800&q=80"
    ],
    "tags": [
      "water",
      "duffel",
      "bag",
      "classic"
    ],
    "attributes": {
      "color": "White",
      "style": "Minimalist",
      "material": "Glass"
    },
    "rating": 3,
    "reviewCount": 463
  },
  {
    "title": "Rugged Aura Belt",
    "description": "High quality belt designed for maximum performance, style, and durability. Built with synthetic materials. Perfect for your lifestyle.",
    "brand": "Aura",
    "category": "Accessories",
    "price": 59.48,
    "stock": 82,
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    "tags": [
      "bands",
      "bag",
      "duffel",
      "rugged"
    ],
    "attributes": {
      "color": "White",
      "style": "Minimalist",
      "material": "Synthetic"
    },
    "rating": 3.3,
    "reviewCount": 133
  },
  {
    "title": "Pro Aqua Pack",
    "description": "High quality pack designed for maximum performance, style, and durability. Built with synthetic materials. Perfect for your lifestyle.",
    "brand": "Aqua",
    "category": "Accessories",
    "price": 99.54,
    "stock": 108,
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    "tags": [
      "resistance",
      "bag",
      "bands",
      "duffel",
      "hydration",
      "pro"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Casual",
      "material": "Synthetic"
    },
    "rating": 3.7,
    "reviewCount": 410
  },
  {
    "title": "Cloud Terra Belt",
    "description": "High quality belt designed for maximum performance, style, and durability. Built with leather materials. Perfect for your lifestyle.",
    "brand": "Terra",
    "category": "Accessories",
    "price": 27.44,
    "stock": 149,
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
    ],
    "tags": [
      "everyday",
      "gear",
      "water",
      "travel",
      "duffel",
      "cloud"
    ],
    "attributes": {
      "color": "Red",
      "style": "Minimalist",
      "material": "Leather"
    },
    "rating": 4.1,
    "reviewCount": 284
  },
  {
    "title": "Prime Terra Flask",
    "description": "High quality flask designed for maximum performance, style, and durability. Built with glass materials. Perfect for your lifestyle.",
    "brand": "Terra",
    "category": "Accessories",
    "price": 41.1,
    "stock": 47,
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    ],
    "tags": [
      "duffel",
      "hydration",
      "everyday",
      "prime"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Casual",
      "material": "Glass"
    },
    "rating": 3.7,
    "reviewCount": 33
  },
  {
    "title": "Ultra Terra Hat",
    "description": "High quality hat designed for maximum performance, style, and durability. Built with cotton materials. Perfect for your lifestyle.",
    "brand": "Terra",
    "category": "Accessories",
    "price": 87.72,
    "stock": 159,
    "images": [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"
    ],
    "tags": [
      "travel",
      "gear",
      "bands",
      "ultra"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Modern",
      "material": "Cotton"
    },
    "rating": 4.6,
    "reviewCount": 174
  },
  {
    "title": "Pro Terra Charger",
    "description": "High quality charger designed for maximum performance, style, and durability. Built with plastic materials. Perfect for your lifestyle.",
    "brand": "Terra",
    "category": "Electronics",
    "price": 48.81,
    "stock": 50,
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80"
    ],
    "tags": [
      "wireless",
      "watch",
      "gps",
      "smart",
      "pro"
    ],
    "attributes": {
      "color": "Black",
      "style": "Classic",
      "material": "Plastic",
      "compatibleWith": "PC"
    },
    "rating": 4.2,
    "reviewCount": 336
  },
  {
    "title": "Ergonomic Terra Camera",
    "description": "High quality camera designed for maximum performance, style, and durability. Built with synthetic materials. Perfect for your lifestyle.",
    "brand": "Terra",
    "category": "Electronics",
    "price": 57.75,
    "stock": 197,
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
    ],
    "tags": [
      "gadget",
      "gps",
      "device",
      "smart",
      "tracker",
      "ergonomic"
    ],
    "attributes": {
      "color": "Blue",
      "style": "Casual",
      "material": "Synthetic",
      "compatibleWith": "PC"
    },
    "rating": 4.8,
    "reviewCount": 49
  },
  {
    "title": "Classic Nexus Headphones",
    "description": "High quality headphones designed for maximum performance, style, and durability. Built with leather materials. Perfect for your lifestyle.",
    "brand": "Nexus",
    "category": "Electronics",
    "price": 147.98,
    "stock": 179,
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
    ],
    "tags": [
      "gps",
      "tracker",
      "wireless",
      "tech",
      "classic"
    ],
    "attributes": {
      "color": "Green",
      "style": "Minimalist",
      "material": "Leather",
      "compatibleWith": "iOS"
    },
    "rating": 4.6,
    "reviewCount": 471
  },
  {
    "title": "Advanced Aura Headphones",
    "description": "High quality headphones designed for maximum performance, style, and durability. Built with synthetic materials. Perfect for your lifestyle.",
    "brand": "Aura",
    "category": "Electronics",
    "price": 47.25,
    "stock": 88,
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80"
    ],
    "tags": [
      "watch",
      "fitness",
      "wireless",
      "advanced"
    ],
    "attributes": {
      "color": "Red",
      "style": "Minimalist",
      "material": "Synthetic",
      "compatibleWith": "PC"
    },
    "rating": 4.9,
    "reviewCount": 110
  },
  {
    "title": "Smart Nexus Tracker",
    "description": "High quality tracker designed for maximum performance, style, and durability. Built with leather materials. Perfect for your lifestyle.",
    "brand": "Nexus",
    "category": "Electronics",
    "price": 109.46,
    "stock": 37,
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80"
    ],
    "tags": [
      "watch",
      "audio",
      "fitness",
      "gadget",
      "smart"
    ],
    "attributes": {
      "color": "Black",
      "style": "Modern",
      "material": "Leather",
      "compatibleWith": "Universal"
    },
    "rating": 4.1,
    "reviewCount": 320
  },
  {
    "title": "Modern Lumina Speaker",
    "description": "High quality speaker designed for maximum performance, style, and durability. Built with wood materials. Perfect for your lifestyle.",
    "brand": "Lumina",
    "category": "Electronics",
    "price": 39.31,
    "stock": 89,
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80"
    ],
    "tags": [
      "smart",
      "tracker",
      "tech",
      "modern"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Classic",
      "material": "Wood",
      "compatibleWith": "PC"
    },
    "rating": 4.9,
    "reviewCount": 112
  },
  {
    "title": "Premium Zenith Watch",
    "description": "High quality watch designed for maximum performance, style, and durability. Built with metal materials. Perfect for your lifestyle.",
    "brand": "Zenith",
    "category": "Electronics",
    "price": 101.33,
    "stock": 208,
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80"
    ],
    "tags": [
      "watch",
      "audio",
      "fitness",
      "device",
      "premium"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Sporty",
      "material": "Metal",
      "compatibleWith": "iOS"
    },
    "rating": 3.5,
    "reviewCount": 336
  },
  {
    "title": "Modern Stride Camera",
    "description": "High quality camera designed for maximum performance, style, and durability. Built with plastic materials. Perfect for your lifestyle.",
    "brand": "Stride",
    "category": "Electronics",
    "price": 31.62,
    "stock": 136,
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80"
    ],
    "tags": [
      "audio",
      "gps",
      "gadget",
      "smart",
      "modern"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Modern",
      "material": "Plastic",
      "compatibleWith": "Mac"
    },
    "rating": 4.2,
    "reviewCount": 31
  },
  {
    "title": "Hyper Nexus Earbuds",
    "description": "High quality earbuds designed for maximum performance, style, and durability. Built with wood materials. Perfect for your lifestyle.",
    "brand": "Nexus",
    "category": "Electronics",
    "price": 60.28,
    "stock": 121,
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80"
    ],
    "tags": [
      "gps",
      "fitness",
      "watch",
      "tech",
      "smart",
      "hyper"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Casual",
      "material": "Wood",
      "compatibleWith": "PC"
    },
    "rating": 3.3,
    "reviewCount": 491
  },
  {
    "title": "Smart Nexus Charger",
    "description": "High quality charger designed for maximum performance, style, and durability. Built with cotton materials. Perfect for your lifestyle.",
    "brand": "Nexus",
    "category": "Electronics",
    "price": 176.33,
    "stock": 90,
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
    ],
    "tags": [
      "gps",
      "tracker",
      "gadget",
      "smart"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Modern",
      "material": "Cotton",
      "compatibleWith": "Android"
    },
    "rating": 3.1,
    "reviewCount": 62
  },
  {
    "title": "Advanced Terra Speaker",
    "description": "High quality speaker designed for maximum performance, style, and durability. Built with cotton materials. Perfect for your lifestyle.",
    "brand": "Terra",
    "category": "Electronics",
    "price": 181.12,
    "stock": 75,
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
    ],
    "tags": [
      "smart",
      "wireless",
      "tech",
      "fitness",
      "gps",
      "advanced"
    ],
    "attributes": {
      "color": "Green",
      "style": "Minimalist",
      "material": "Cotton",
      "compatibleWith": "Android"
    },
    "rating": 4.3,
    "reviewCount": 177
  },
  {
    "title": "Max Stride Watch",
    "description": "High quality watch designed for maximum performance, style, and durability. Built with cotton materials. Perfect for your lifestyle.",
    "brand": "Stride",
    "category": "Electronics",
    "price": 43.64,
    "stock": 81,
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
    ],
    "tags": [
      "watch",
      "device",
      "fitness",
      "gps",
      "max"
    ],
    "attributes": {
      "color": "White",
      "style": "Classic",
      "material": "Cotton",
      "compatibleWith": "Android"
    },
    "rating": 4.1,
    "reviewCount": 183
  },
  {
    "title": "Elite Flex Charger",
    "description": "High quality charger designed for maximum performance, style, and durability. Built with synthetic materials. Perfect for your lifestyle.",
    "brand": "Flex",
    "category": "Electronics",
    "price": 151.88,
    "stock": 98,
    "images": [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80"
    ],
    "tags": [
      "tracker",
      "fitness",
      "tech",
      "gps",
      "wireless",
      "elite"
    ],
    "attributes": {
      "color": "Blue",
      "style": "Sporty",
      "material": "Synthetic",
      "compatibleWith": "iOS"
    },
    "rating": 4.2,
    "reviewCount": 368
  },
  {
    "title": "Modern Eco Tablet",
    "description": "High quality tablet designed for maximum performance, style, and durability. Built with metal materials. Perfect for your lifestyle.",
    "brand": "Eco",
    "category": "Electronics",
    "price": 37.78,
    "stock": 122,
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
    ],
    "tags": [
      "audio",
      "watch",
      "device",
      "fitness",
      "modern"
    ],
    "attributes": {
      "color": "White",
      "style": "Classic",
      "material": "Metal",
      "compatibleWith": "iOS"
    },
    "rating": 4.7,
    "reviewCount": 86
  },
  {
    "title": "Classic Aura Earbuds",
    "description": "High quality earbuds designed for maximum performance, style, and durability. Built with cotton materials. Perfect for your lifestyle.",
    "brand": "Aura",
    "category": "Electronics",
    "price": 155.89,
    "stock": 192,
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
    ],
    "tags": [
      "watch",
      "fitness",
      "tracker",
      "gps",
      "audio",
      "classic"
    ],
    "attributes": {
      "color": "White",
      "style": "Casual",
      "material": "Cotton",
      "compatibleWith": "Android"
    },
    "rating": 3,
    "reviewCount": 493
  },
  {
    "title": "Classic Apex Clock",
    "description": "High quality clock designed for maximum performance, style, and durability. Built with plastic materials. Perfect for your lifestyle.",
    "brand": "Apex",
    "category": "Home & Living",
    "price": 35.81,
    "stock": 24,
    "images": [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80"
    ],
    "tags": [
      "modern",
      "decor",
      "living",
      "interior",
      "classic"
    ],
    "attributes": {
      "color": "Red",
      "style": "Modern",
      "material": "Plastic"
    },
    "rating": 4.8,
    "reviewCount": 450
  },
  {
    "title": "Max Eco Cushion",
    "description": "High quality cushion designed for maximum performance, style, and durability. Built with cotton materials. Perfect for your lifestyle.",
    "brand": "Eco",
    "category": "Home & Living",
    "price": 136.75,
    "stock": 119,
    "images": [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80"
    ],
    "tags": [
      "furniture",
      "cozy",
      "living",
      "design",
      "interior",
      "max"
    ],
    "attributes": {
      "color": "Black",
      "style": "Classic",
      "material": "Cotton"
    },
    "rating": 3.8,
    "reviewCount": 129
  },
  {
    "title": "Ergonomic Zenith Rug",
    "description": "High quality rug designed for maximum performance, style, and durability. Built with wood materials. Perfect for your lifestyle.",
    "brand": "Zenith",
    "category": "Home & Living",
    "price": 164.81,
    "stock": 92,
    "images": [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80"
    ],
    "tags": [
      "cozy",
      "furniture",
      "decor",
      "art",
      "interior",
      "ergonomic"
    ],
    "attributes": {
      "color": "Red",
      "style": "Minimalist",
      "material": "Wood"
    },
    "rating": 3.9,
    "reviewCount": 163
  },
  {
    "title": "Classic Eco Lamp",
    "description": "High quality lamp designed for maximum performance, style, and durability. Built with cotton materials. Perfect for your lifestyle.",
    "brand": "Eco",
    "category": "Home & Living",
    "price": 88.32,
    "stock": 180,
    "images": [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80"
    ],
    "tags": [
      "living",
      "decor",
      "bedroom",
      "interior",
      "design",
      "classic"
    ],
    "attributes": {
      "color": "Red",
      "style": "Modern",
      "material": "Cotton"
    },
    "rating": 3.5,
    "reviewCount": 316
  },
  {
    "title": "Ultra Velocity Lamp",
    "description": "High quality lamp designed for maximum performance, style, and durability. Built with metal materials. Perfect for your lifestyle.",
    "brand": "Velocity",
    "category": "Home & Living",
    "price": 137.29,
    "stock": 37,
    "images": [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80"
    ],
    "tags": [
      "modern",
      "decor",
      "interior",
      "design",
      "living",
      "ultra"
    ],
    "attributes": {
      "color": "Red",
      "style": "Minimalist",
      "material": "Metal"
    },
    "rating": 3.6,
    "reviewCount": 443
  },
  {
    "title": "Cloud Trek Rug",
    "description": "High quality rug designed for maximum performance, style, and durability. Built with glass materials. Perfect for your lifestyle.",
    "brand": "Trek",
    "category": "Home & Living",
    "price": 36.17,
    "stock": 138,
    "images": [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80"
    ],
    "tags": [
      "lighting",
      "cozy",
      "design",
      "interior",
      "bedroom",
      "cloud"
    ],
    "attributes": {
      "color": "Blue",
      "style": "Sporty",
      "material": "Glass"
    },
    "rating": 4.5,
    "reviewCount": 384
  },
  {
    "title": "Essential Terra Cushion",
    "description": "High quality cushion designed for maximum performance, style, and durability. Built with plastic materials. Perfect for your lifestyle.",
    "brand": "Terra",
    "category": "Home & Living",
    "price": 101.6,
    "stock": 73,
    "images": [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80"
    ],
    "tags": [
      "living",
      "interior",
      "bedroom",
      "essential"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Sporty",
      "material": "Plastic"
    },
    "rating": 3.9,
    "reviewCount": 329
  },
  {
    "title": "Classic Velocity Lamp",
    "description": "High quality lamp designed for maximum performance, style, and durability. Built with synthetic materials. Perfect for your lifestyle.",
    "brand": "Velocity",
    "category": "Home & Living",
    "price": 154.06,
    "stock": 93,
    "images": [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80"
    ],
    "tags": [
      "decor",
      "living",
      "cozy",
      "art",
      "classic"
    ],
    "attributes": {
      "color": "Green",
      "style": "Classic",
      "material": "Synthetic"
    },
    "rating": 4.6,
    "reviewCount": 413
  },
  {
    "title": "Rugged Pulse Candle",
    "description": "High quality candle designed for maximum performance, style, and durability. Built with synthetic materials. Perfect for your lifestyle.",
    "brand": "Pulse",
    "category": "Home & Living",
    "price": 113.21,
    "stock": 125,
    "images": [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80"
    ],
    "tags": [
      "art",
      "bedroom",
      "living",
      "modern",
      "rugged"
    ],
    "attributes": {
      "color": "White",
      "style": "Casual",
      "material": "Synthetic"
    },
    "rating": 3,
    "reviewCount": 157
  },
  {
    "title": "Dynamic Active Mirror",
    "description": "High quality mirror designed for maximum performance, style, and durability. Built with synthetic materials. Perfect for your lifestyle.",
    "brand": "Active",
    "category": "Home & Living",
    "price": 118.77,
    "stock": 200,
    "images": [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80"
    ],
    "tags": [
      "interior",
      "decor",
      "cozy",
      "dynamic"
    ],
    "attributes": {
      "color": "White",
      "style": "Classic",
      "material": "Synthetic"
    },
    "rating": 3.6,
    "reviewCount": 393
  },
  {
    "title": "Ergonomic Eco Rug",
    "description": "High quality rug designed for maximum performance, style, and durability. Built with cotton materials. Perfect for your lifestyle.",
    "brand": "Eco",
    "category": "Home & Living",
    "price": 97.62,
    "stock": 120,
    "images": [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80"
    ],
    "tags": [
      "living",
      "interior",
      "cozy",
      "lighting",
      "decor",
      "ergonomic"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Casual",
      "material": "Cotton"
    },
    "rating": 4.8,
    "reviewCount": 311
  },
  {
    "title": "Dynamic Apex Cushion",
    "description": "High quality cushion designed for maximum performance, style, and durability. Built with synthetic materials. Perfect for your lifestyle.",
    "brand": "Apex",
    "category": "Home & Living",
    "price": 39.79,
    "stock": 11,
    "images": [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80"
    ],
    "tags": [
      "furniture",
      "cozy",
      "art",
      "lighting",
      "living",
      "dynamic"
    ],
    "attributes": {
      "color": "Black",
      "style": "Classic",
      "material": "Synthetic"
    },
    "rating": 3.3,
    "reviewCount": 44
  },
  {
    "title": "Advanced Zenith Candle",
    "description": "High quality candle designed for maximum performance, style, and durability. Built with wood materials. Perfect for your lifestyle.",
    "brand": "Zenith",
    "category": "Home & Living",
    "price": 158.02,
    "stock": 49,
    "images": [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80"
    ],
    "tags": [
      "bedroom",
      "design",
      "modern",
      "advanced"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Sporty",
      "material": "Wood"
    },
    "rating": 3,
    "reviewCount": 10
  },
  {
    "title": "Prime Terra Blanket",
    "description": "High quality blanket designed for maximum performance, style, and durability. Built with metal materials. Perfect for your lifestyle.",
    "brand": "Terra",
    "category": "Home & Living",
    "price": 44.63,
    "stock": 174,
    "images": [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80"
    ],
    "tags": [
      "furniture",
      "decor",
      "interior",
      "prime"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Sporty",
      "material": "Metal"
    },
    "rating": 4.1,
    "reviewCount": 262
  },
  {
    "title": "Rugged Terra Rug",
    "description": "High quality rug designed for maximum performance, style, and durability. Built with wood materials. Perfect for your lifestyle.",
    "brand": "Terra",
    "category": "Home & Living",
    "price": 65.67,
    "stock": 157,
    "images": [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80"
    ],
    "tags": [
      "bedroom",
      "decor",
      "design",
      "interior",
      "rugged"
    ],
    "attributes": {
      "color": "Green",
      "style": "Casual",
      "material": "Wood"
    },
    "rating": 3.5,
    "reviewCount": 84
  },
  {
    "title": "Dynamic Eco Serum",
    "description": "High quality serum designed for maximum performance, style, and durability. Built with metal materials. Perfect for your lifestyle.",
    "brand": "Eco",
    "category": "Beauty & Personal Care",
    "price": 23.56,
    "stock": 145,
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80"
    ],
    "tags": [
      "wellness",
      "skincare",
      "organic",
      "glow",
      "face",
      "dynamic"
    ],
    "attributes": {
      "color": "White",
      "style": "Classic",
      "material": "Metal"
    },
    "rating": 4.8,
    "reviewCount": 391
  },
  {
    "title": "Ultra Stride Cream",
    "description": "High quality cream designed for maximum performance, style, and durability. Built with wood materials. Perfect for your lifestyle.",
    "brand": "Stride",
    "category": "Beauty & Personal Care",
    "price": 195.04,
    "stock": 84,
    "images": [
      "https://images.unsplash.com/photo-1596462502278-27bf85033e54?w=800&q=80"
    ],
    "tags": [
      "glow",
      "face",
      "wellness",
      "health",
      "ultra"
    ],
    "attributes": {
      "color": "White",
      "style": "Classic",
      "material": "Wood"
    },
    "rating": 4.8,
    "reviewCount": 391
  },
  {
    "title": "Aero Lumina Serum",
    "description": "High quality serum designed for maximum performance, style, and durability. Built with leather materials. Perfect for your lifestyle.",
    "brand": "Lumina",
    "category": "Beauty & Personal Care",
    "price": 148.5,
    "stock": 16,
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80"
    ],
    "tags": [
      "health",
      "beauty",
      "natural",
      "face",
      "aero"
    ],
    "attributes": {
      "color": "Green",
      "style": "Minimalist",
      "material": "Leather"
    },
    "rating": 3.1,
    "reviewCount": 346
  },
  {
    "title": "Advanced Nova Scrub",
    "description": "High quality scrub designed for maximum performance, style, and durability. Built with metal materials. Perfect for your lifestyle.",
    "brand": "Nova",
    "category": "Beauty & Personal Care",
    "price": 45.08,
    "stock": 172,
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80"
    ],
    "tags": [
      "organic",
      "natural",
      "glow",
      "wellness",
      "advanced"
    ],
    "attributes": {
      "color": "Red",
      "style": "Casual",
      "material": "Metal"
    },
    "rating": 3.4,
    "reviewCount": 282
  },
  {
    "title": "Rugged Zenith Lotion",
    "description": "High quality lotion designed for maximum performance, style, and durability. Built with cotton materials. Perfect for your lifestyle.",
    "brand": "Zenith",
    "category": "Beauty & Personal Care",
    "price": 153.68,
    "stock": 200,
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80"
    ],
    "tags": [
      "spa",
      "wellness",
      "natural",
      "face",
      "organic",
      "rugged"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Classic",
      "material": "Cotton"
    },
    "rating": 3.5,
    "reviewCount": 475
  },
  {
    "title": "Smart Eco Cleanser",
    "description": "High quality cleanser designed for maximum performance, style, and durability. Built with plastic materials. Perfect for your lifestyle.",
    "brand": "Eco",
    "category": "Beauty & Personal Care",
    "price": 137.43,
    "stock": 171,
    "images": [
      "https://images.unsplash.com/photo-1596462502278-27bf85033e54?w=800&q=80"
    ],
    "tags": [
      "skincare",
      "glow",
      "beauty",
      "body",
      "face",
      "smart"
    ],
    "attributes": {
      "color": "Black",
      "style": "Casual",
      "material": "Plastic"
    },
    "rating": 4,
    "reviewCount": 464
  },
  {
    "title": "Hyper Lumina Scrub",
    "description": "High quality scrub designed for maximum performance, style, and durability. Built with synthetic materials. Perfect for your lifestyle.",
    "brand": "Lumina",
    "category": "Beauty & Personal Care",
    "price": 187.01,
    "stock": 195,
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80"
    ],
    "tags": [
      "natural",
      "glow",
      "wellness",
      "hyper"
    ],
    "attributes": {
      "color": "Green",
      "style": "Classic",
      "material": "Synthetic"
    },
    "rating": 3.2,
    "reviewCount": 168
  },
  {
    "title": "Elite Aura Serum",
    "description": "High quality serum designed for maximum performance, style, and durability. Built with wood materials. Perfect for your lifestyle.",
    "brand": "Aura",
    "category": "Beauty & Personal Care",
    "price": 184.54,
    "stock": 112,
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80"
    ],
    "tags": [
      "spa",
      "beauty",
      "glow",
      "skincare",
      "elite"
    ],
    "attributes": {
      "color": "Red",
      "style": "Sporty",
      "material": "Wood"
    },
    "rating": 5,
    "reviewCount": 291
  },
  {
    "title": "Aero Velocity Serum",
    "description": "High quality serum designed for maximum performance, style, and durability. Built with leather materials. Perfect for your lifestyle.",
    "brand": "Velocity",
    "category": "Beauty & Personal Care",
    "price": 103.24,
    "stock": 102,
    "images": [
      "https://images.unsplash.com/photo-1596462502278-27bf85033e54?w=800&q=80"
    ],
    "tags": [
      "natural",
      "health",
      "organic",
      "aero"
    ],
    "attributes": {
      "color": "Red",
      "style": "Modern",
      "material": "Leather"
    },
    "rating": 4.9,
    "reviewCount": 484
  },
  {
    "title": "Ergonomic Velocity Oil",
    "description": "High quality oil designed for maximum performance, style, and durability. Built with synthetic materials. Perfect for your lifestyle.",
    "brand": "Velocity",
    "category": "Beauty & Personal Care",
    "price": 59.98,
    "stock": 205,
    "images": [
      "https://images.unsplash.com/photo-1596462502278-27bf85033e54?w=800&q=80"
    ],
    "tags": [
      "body",
      "skincare",
      "beauty",
      "ergonomic"
    ],
    "attributes": {
      "color": "Blue",
      "style": "Sporty",
      "material": "Synthetic"
    },
    "rating": 3.2,
    "reviewCount": 414
  },
  {
    "title": "Ultra Trek Mask",
    "description": "High quality mask designed for maximum performance, style, and durability. Built with cotton materials. Perfect for your lifestyle.",
    "brand": "Trek",
    "category": "Beauty & Personal Care",
    "price": 58.44,
    "stock": 160,
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80"
    ],
    "tags": [
      "skincare",
      "beauty",
      "health",
      "wellness",
      "spa",
      "ultra"
    ],
    "attributes": {
      "color": "Blue",
      "style": "Casual",
      "material": "Cotton"
    },
    "rating": 3.5,
    "reviewCount": 105
  },
  {
    "title": "Modern Lumina Serum",
    "description": "High quality serum designed for maximum performance, style, and durability. Built with metal materials. Perfect for your lifestyle.",
    "brand": "Lumina",
    "category": "Beauty & Personal Care",
    "price": 61.35,
    "stock": 153,
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80"
    ],
    "tags": [
      "skincare",
      "organic",
      "beauty",
      "modern"
    ],
    "attributes": {
      "color": "Green",
      "style": "Sporty",
      "material": "Metal"
    },
    "rating": 3.2,
    "reviewCount": 375
  },
  {
    "title": "Ultra Eco Balm",
    "description": "High quality balm designed for maximum performance, style, and durability. Built with synthetic materials. Perfect for your lifestyle.",
    "brand": "Eco",
    "category": "Beauty & Personal Care",
    "price": 47.51,
    "stock": 16,
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80"
    ],
    "tags": [
      "skincare",
      "spa",
      "face",
      "ultra"
    ],
    "attributes": {
      "color": "White",
      "style": "Sporty",
      "material": "Synthetic"
    },
    "rating": 3.2,
    "reviewCount": 208
  },
  {
    "title": "Rugged Active Oil",
    "description": "High quality oil designed for maximum performance, style, and durability. Built with metal materials. Perfect for your lifestyle.",
    "brand": "Active",
    "category": "Beauty & Personal Care",
    "price": 113.08,
    "stock": 124,
    "images": [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80"
    ],
    "tags": [
      "spa",
      "organic",
      "beauty",
      "glow",
      "body",
      "rugged"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Modern",
      "material": "Metal"
    },
    "rating": 4.8,
    "reviewCount": 417
  },
  {
    "title": "Ultra Lumina Scrub",
    "description": "High quality scrub designed for maximum performance, style, and durability. Built with leather materials. Perfect for your lifestyle.",
    "brand": "Lumina",
    "category": "Beauty & Personal Care",
    "price": 162,
    "stock": 56,
    "images": [
      "https://images.unsplash.com/photo-1596462502278-27bf85033e54?w=800&q=80"
    ],
    "tags": [
      "natural",
      "skincare",
      "face",
      "ultra"
    ],
    "attributes": {
      "color": "Black",
      "style": "Sporty",
      "material": "Leather"
    },
    "rating": 3.9,
    "reviewCount": 78
  },
  {
    "title": "Sleek Lumina Plate",
    "description": "High quality plate designed for maximum performance, style, and durability. Built with plastic materials. Perfect for your lifestyle.",
    "brand": "Lumina",
    "category": "Kitchen & Dining",
    "price": 44.4,
    "stock": 183,
    "images": [
      "https://images.unsplash.com/photo-1556910103-1c02745a872f?w=800&q=80"
    ],
    "tags": [
      "dining",
      "tools",
      "culinary",
      "sleek"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Modern",
      "material": "Plastic"
    },
    "rating": 3.4,
    "reviewCount": 56
  },
  {
    "title": "Ergonomic Apex Blender",
    "description": "High quality blender designed for maximum performance, style, and durability. Built with glass materials. Perfect for your lifestyle.",
    "brand": "Apex",
    "category": "Kitchen & Dining",
    "price": 182.88,
    "stock": 134,
    "images": [
      "https://images.unsplash.com/photo-1556910103-1c02745a872f?w=800&q=80"
    ],
    "tags": [
      "dining",
      "chef",
      "entertaining",
      "ergonomic"
    ],
    "attributes": {
      "color": "Blue",
      "style": "Minimalist",
      "material": "Glass"
    },
    "rating": 3.7,
    "reviewCount": 290
  },
  {
    "title": "Modern Terra Blender",
    "description": "High quality blender designed for maximum performance, style, and durability. Built with wood materials. Perfect for your lifestyle.",
    "brand": "Terra",
    "category": "Kitchen & Dining",
    "price": 30.03,
    "stock": 161,
    "images": [
      "https://images.unsplash.com/photo-1581622558667-3419a8dc5f83?w=800&q=80"
    ],
    "tags": [
      "culinary",
      "dining",
      "kitchenware",
      "tools",
      "baking",
      "modern"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Modern",
      "material": "Wood"
    },
    "rating": 4.2,
    "reviewCount": 196
  },
  {
    "title": "Sleek Aqua Bowl",
    "description": "High quality bowl designed for maximum performance, style, and durability. Built with plastic materials. Perfect for your lifestyle.",
    "brand": "Aqua",
    "category": "Kitchen & Dining",
    "price": 133.9,
    "stock": 180,
    "images": [
      "https://images.unsplash.com/photo-1556910103-1c02745a872f?w=800&q=80"
    ],
    "tags": [
      "chef",
      "cooking",
      "baking",
      "entertaining",
      "culinary",
      "sleek"
    ],
    "attributes": {
      "color": "Blue",
      "style": "Sporty",
      "material": "Plastic"
    },
    "rating": 3.8,
    "reviewCount": 30
  },
  {
    "title": "Pro Eco Knife",
    "description": "High quality knife designed for maximum performance, style, and durability. Built with wood materials. Perfect for your lifestyle.",
    "brand": "Eco",
    "category": "Kitchen & Dining",
    "price": 177.69,
    "stock": 51,
    "images": [
      "https://images.unsplash.com/photo-1556910103-1c02745a872f?w=800&q=80"
    ],
    "tags": [
      "entertaining",
      "home",
      "baking",
      "kitchenware",
      "food",
      "pro"
    ],
    "attributes": {
      "color": "Red",
      "style": "Minimalist",
      "material": "Wood"
    },
    "rating": 3.6,
    "reviewCount": 186
  },
  {
    "title": "Vintage Eco Mug",
    "description": "High quality mug designed for maximum performance, style, and durability. Built with metal materials. Perfect for your lifestyle.",
    "brand": "Eco",
    "category": "Kitchen & Dining",
    "price": 155.48,
    "stock": 161,
    "images": [
      "https://images.unsplash.com/photo-1581622558667-3419a8dc5f83?w=800&q=80"
    ],
    "tags": [
      "kitchenware",
      "dining",
      "entertaining",
      "culinary",
      "cooking",
      "vintage"
    ],
    "attributes": {
      "color": "Red",
      "style": "Sporty",
      "material": "Metal"
    },
    "rating": 3.9,
    "reviewCount": 143
  },
  {
    "title": "Advanced Nova Knife",
    "description": "High quality knife designed for maximum performance, style, and durability. Built with glass materials. Perfect for your lifestyle.",
    "brand": "Nova",
    "category": "Kitchen & Dining",
    "price": 122.71,
    "stock": 198,
    "images": [
      "https://images.unsplash.com/photo-1581622558667-3419a8dc5f83?w=800&q=80"
    ],
    "tags": [
      "cooking",
      "baking",
      "food",
      "advanced"
    ],
    "attributes": {
      "color": "Green",
      "style": "Modern",
      "material": "Glass"
    },
    "rating": 4,
    "reviewCount": 478
  },
  {
    "title": "Aero Eco Pan",
    "description": "High quality pan designed for maximum performance, style, and durability. Built with wood materials. Perfect for your lifestyle.",
    "brand": "Eco",
    "category": "Kitchen & Dining",
    "price": 124.83,
    "stock": 140,
    "images": [
      "https://images.unsplash.com/photo-1581622558667-3419a8dc5f83?w=800&q=80"
    ],
    "tags": [
      "food",
      "kitchenware",
      "chef",
      "entertaining",
      "aero"
    ],
    "attributes": {
      "color": "Green",
      "style": "Modern",
      "material": "Wood"
    },
    "rating": 3.8,
    "reviewCount": 362
  },
  {
    "title": "Aero Velocity Cutlery",
    "description": "High quality cutlery designed for maximum performance, style, and durability. Built with metal materials. Perfect for your lifestyle.",
    "brand": "Velocity",
    "category": "Kitchen & Dining",
    "price": 162.85,
    "stock": 138,
    "images": [
      "https://images.unsplash.com/photo-1581622558667-3419a8dc5f83?w=800&q=80"
    ],
    "tags": [
      "baking",
      "chef",
      "kitchenware",
      "culinary",
      "aero"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Casual",
      "material": "Metal"
    },
    "rating": 3.9,
    "reviewCount": 156
  },
  {
    "title": "Aero Terra Glass",
    "description": "High quality glass designed for maximum performance, style, and durability. Built with glass materials. Perfect for your lifestyle.",
    "brand": "Terra",
    "category": "Kitchen & Dining",
    "price": 185.31,
    "stock": 50,
    "images": [
      "https://images.unsplash.com/photo-1556910103-1c02745a872f?w=800&q=80"
    ],
    "tags": [
      "cooking",
      "chef",
      "culinary",
      "aero"
    ],
    "attributes": {
      "color": "Red",
      "style": "Classic",
      "material": "Glass"
    },
    "rating": 3.1,
    "reviewCount": 412
  },
  {
    "title": "Premium Zenith Plate",
    "description": "High quality plate designed for maximum performance, style, and durability. Built with leather materials. Perfect for your lifestyle.",
    "brand": "Zenith",
    "category": "Kitchen & Dining",
    "price": 57.29,
    "stock": 170,
    "images": [
      "https://images.unsplash.com/photo-1556910103-1c02745a872f?w=800&q=80"
    ],
    "tags": [
      "home",
      "tools",
      "chef",
      "cooking",
      "entertaining",
      "premium"
    ],
    "attributes": {
      "color": "Black",
      "style": "Classic",
      "material": "Leather"
    },
    "rating": 4.6,
    "reviewCount": 27
  },
  {
    "title": "Elite Aura Mug",
    "description": "High quality mug designed for maximum performance, style, and durability. Built with plastic materials. Perfect for your lifestyle.",
    "brand": "Aura",
    "category": "Kitchen & Dining",
    "price": 25.61,
    "stock": 111,
    "images": [
      "https://images.unsplash.com/photo-1581622558667-3419a8dc5f83?w=800&q=80"
    ],
    "tags": [
      "food",
      "dining",
      "tools",
      "culinary",
      "kitchenware",
      "elite"
    ],
    "attributes": {
      "color": "Grey",
      "style": "Classic",
      "material": "Plastic"
    },
    "rating": 3.3,
    "reviewCount": 430
  },
  {
    "title": "Sleek Lumina Plate",
    "description": "High quality plate designed for maximum performance, style, and durability. Built with metal materials. Perfect for your lifestyle.",
    "brand": "Lumina",
    "category": "Kitchen & Dining",
    "price": 113.61,
    "stock": 192,
    "images": [
      "https://images.unsplash.com/photo-1556910103-1c02745a872f?w=800&q=80"
    ],
    "tags": [
      "home",
      "culinary",
      "chef",
      "entertaining",
      "tools",
      "sleek"
    ],
    "attributes": {
      "color": "Blue",
      "style": "Modern",
      "material": "Metal"
    },
    "rating": 4.4,
    "reviewCount": 52
  },
  {
    "title": "Prime Apex Mug",
    "description": "High quality mug designed for maximum performance, style, and durability. Built with wood materials. Perfect for your lifestyle.",
    "brand": "Apex",
    "category": "Kitchen & Dining",
    "price": 183.48,
    "stock": 42,
    "images": [
      "https://images.unsplash.com/photo-1581622558667-3419a8dc5f83?w=800&q=80"
    ],
    "tags": [
      "chef",
      "cooking",
      "culinary",
      "entertaining",
      "prime"
    ],
    "attributes": {
      "color": "Red",
      "style": "Classic",
      "material": "Wood"
    },
    "rating": 4.2,
    "reviewCount": 103
  },
  {
    "title": "Minimalist Active Blender",
    "description": "High quality blender designed for maximum performance, style, and durability. Built with metal materials. Perfect for your lifestyle.",
    "brand": "Active",
    "category": "Kitchen & Dining",
    "price": 156.03,
    "stock": 27,
    "images": [
      "https://images.unsplash.com/photo-1556910103-1c02745a872f?w=800&q=80"
    ],
    "tags": [
      "kitchenware",
      "dining",
      "home",
      "cooking",
      "chef",
      "minimalist"
    ],
    "attributes": {
      "color": "Black",
      "style": "Modern",
      "material": "Metal"
    },
    "rating": 4.1,
    "reviewCount": 94
  },
  {
    "title": "Elite Terra Mat",
    "description": "High quality mat designed for maximum performance, style, and durability. Built with wood materials. Perfect for your lifestyle.",
    "brand": "Terra",
    "category": "Outdoor & Camping",
    "price": 198.08,
    "stock": 68,
    "images": [
      "https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=800&q=80"
    ],
    "tags": [
      "hiking",
      "camping",
      "gear",
      "elite"
    ],
    "attributes": {
      "color": "Blue",
      "style": "Modern",
      "material": "Wood"
    },
    "rating": 4.5,
    "reviewCount": 371
  },
  {
    "title": "Premium Apex Hammock",
    "description": "High quality hammock designed for maximum performance, style, and durability. Built with plastic materials. Perfect for your lifestyle.",
    "brand": "Apex",
    "category": "Outdoor & Camping",
    "price": 41.4,
    "stock": 51,
    "images": [
      "https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=800&q=80"
    ],
    "tags": [
      "hiking",
      "mountain",
      "camping",
      "premium"
    ],
    "attributes": {
      "color": "Red",
      "style": "Modern",
      "material": "Plastic"
    },
    "rating": 3.5,
    "reviewCount": 71
  },
  {
    "title": "Dynamic Apex Lantern",
    "description": "High quality lantern designed for maximum performance, style, and durability. Built with glass materials. Perfect for your lifestyle.",
    "brand": "Apex",
    "category": "Outdoor & Camping",
    "price": 88.9,
    "stock": 105,
    "images": [
      "https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=800&q=80"
    ],
    "tags": [
      "adventure",
      "outdoor",
      "camping",
      "dynamic"
    ],
    "attributes": {
      "color": "White",
      "style": "Sporty",
      "material": "Glass"
    },
    "rating": 4.3,
    "reviewCount": 90
  },
  {
    "title": "Vintage Flex Sleeping Bag",
    "description": "High quality sleeping bag designed for maximum performance, style, and durability. Built with leather materials. Perfect for your lifestyle.",
    "brand": "Flex",
    "category": "Outdoor & Camping",
    "price": 65.7,
    "stock": 10,
    "images": [
      "https://images.unsplash.com/photo-1504280741562-fd080b4ea5fa?w=800&q=80"
    ],
    "tags": [
      "adventure",
      "nature",
      "camping",
      "hiking",
      "survival",
      "vintage"
    ],
    "attributes": {
      "color": "White",
      "style": "Modern",
      "material": "Leather"
    },
    "rating": 3.3,
    "reviewCount": 301
  },
  {
    "title": "Modern Pulse Tent",
    "description": "High quality tent designed for maximum performance, style, and durability. Built with metal materials. Perfect for your lifestyle.",
    "brand": "Pulse",
    "category": "Outdoor & Camping",
    "price": 27.73,
    "stock": 30,
    "images": [
      "https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=800&q=80"
    ],
    "tags": [
      "survival",
      "hiking",
      "adventure",
      "modern"
    ],
    "attributes": {
      "color": "Black",
      "style": "Minimalist",
      "material": "Metal"
    },
    "rating": 3.7,
    "reviewCount": 418
  },
  {
    "title": "Rugged Terra Hammock",
    "description": "High quality hammock designed for maximum performance, style, and durability. Built with wood materials. Perfect for your lifestyle.",
    "brand": "Terra",
    "category": "Outdoor & Camping",
    "price": 174.85,
    "stock": 131,
    "images": [
      "https://images.unsplash.com/photo-1504280741562-fd080b4ea5fa?w=800&q=80"
    ],
    "tags": [
      "nature",
      "hiking",
      "mountain",
      "adventure",
      "explore",
      "rugged"
    ],
    "attributes": {
      "color": "Blue",
      "style": "Minimalist",
      "material": "Wood"
    },
    "rating": 3.3,
    "reviewCount": 436
  },
  {
    "title": "Advanced Pulse Stove",
    "description": "High quality stove designed for maximum performance, style, and durability. Built with glass materials. Perfect for your lifestyle.",
    "brand": "Pulse",
    "category": "Outdoor & Camping",
    "price": 162.11,
    "stock": 92,
    "images": [
      "https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=800&q=80"
    ],
    "tags": [
      "wild",
      "mountain",
      "outdoor",
      "adventure",
      "advanced"
    ],
    "attributes": {
      "color": "Black",
      "style": "Modern",
      "material": "Glass"
    },
    "rating": 3.3,
    "reviewCount": 149
  },
  {
    "title": "Max Nova Tent",
    "description": "High quality tent designed for maximum performance, style, and durability. Built with glass materials. Perfect for your lifestyle.",
    "brand": "Nova",
    "category": "Outdoor & Camping",
    "price": 87.06,
    "stock": 110,
    "images": [
      "https://images.unsplash.com/photo-1504280741562-fd080b4ea5fa?w=800&q=80"
    ],
    "tags": [
      "mountain",
      "hiking",
      "explore",
      "max"
    ],
    "attributes": {
      "color": "White",
      "style": "Sporty",
      "material": "Glass"
    },
    "rating": 4.6,
    "reviewCount": 347
  },
  {
    "title": "Hyper Zenith Compass",
    "description": "High quality compass designed for maximum performance, style, and durability. Built with cotton materials. Perfect for your lifestyle.",
    "brand": "Zenith",
    "category": "Outdoor & Camping",
    "price": 155.22,
    "stock": 14,
    "images": [
      "https://images.unsplash.com/photo-1504280741562-fd080b4ea5fa?w=800&q=80"
    ],
    "tags": [
      "gear",
      "camping",
      "hiking",
      "hyper"
    ],
    "attributes": {
      "color": "Blue",
      "style": "Casual",
      "material": "Cotton"
    },
    "rating": 3.4,
    "reviewCount": 413
  },
  {
    "title": "Ultra Stride Sleeping Bag",
    "description": "High quality sleeping bag designed for maximum performance, style, and durability. Built with leather materials. Perfect for your lifestyle.",
    "brand": "Stride",
    "category": "Outdoor & Camping",
    "price": 92.65,
    "stock": 102,
    "images": [
      "https://images.unsplash.com/photo-1504280741562-fd080b4ea5fa?w=800&q=80"
    ],
    "tags": [
      "hiking",
      "mountain",
      "gear",
      "wild",
      "ultra"
    ],
    "attributes": {
      "color": "White",
      "style": "Minimalist",
      "material": "Leather"
    },
    "rating": 3.5,
    "reviewCount": 343
  },
  {
    "title": "Ergonomic Apex Stove",
    "description": "High quality stove designed for maximum performance, style, and durability. Built with glass materials. Perfect for your lifestyle.",
    "brand": "Apex",
    "category": "Outdoor & Camping",
    "price": 70.61,
    "stock": 22,
    "images": [
      "https://images.unsplash.com/photo-1504280741562-fd080b4ea5fa?w=800&q=80"
    ],
    "tags": [
      "survival",
      "camping",
      "gear",
      "hiking",
      "ergonomic"
    ],
    "attributes": {
      "color": "Red",
      "style": "Classic",
      "material": "Glass"
    },
    "rating": 3,
    "reviewCount": 397
  },
  {
    "title": "Ergonomic Apex Hammock",
    "description": "High quality hammock designed for maximum performance, style, and durability. Built with synthetic materials. Perfect for your lifestyle.",
    "brand": "Apex",
    "category": "Outdoor & Camping",
    "price": 139.84,
    "stock": 171,
    "images": [
      "https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=800&q=80"
    ],
    "tags": [
      "camping",
      "mountain",
      "nature",
      "ergonomic"
    ],
    "attributes": {
      "color": "Green",
      "style": "Modern",
      "material": "Synthetic"
    },
    "rating": 4.2,
    "reviewCount": 430
  },
  {
    "title": "Smart Trek Hammock",
    "description": "High quality hammock designed for maximum performance, style, and durability. Built with glass materials. Perfect for your lifestyle.",
    "brand": "Trek",
    "category": "Outdoor & Camping",
    "price": 92.57,
    "stock": 84,
    "images": [
      "https://images.unsplash.com/photo-1504280741562-fd080b4ea5fa?w=800&q=80"
    ],
    "tags": [
      "wild",
      "survival",
      "camping",
      "smart"
    ],
    "attributes": {
      "color": "Red",
      "style": "Sporty",
      "material": "Glass"
    },
    "rating": 3.3,
    "reviewCount": 213
  },
  {
    "title": "Dynamic Velocity Sleeping Bag",
    "description": "High quality sleeping bag designed for maximum performance, style, and durability. Built with leather materials. Perfect for your lifestyle.",
    "brand": "Velocity",
    "category": "Outdoor & Camping",
    "price": 112.76,
    "stock": 127,
    "images": [
      "https://images.unsplash.com/photo-1504280741562-fd080b4ea5fa?w=800&q=80"
    ],
    "tags": [
      "nature",
      "hiking",
      "wild",
      "dynamic"
    ],
    "attributes": {
      "color": "Green",
      "style": "Modern",
      "material": "Leather"
    },
    "rating": 3.6,
    "reviewCount": 183
  },
  {
    "title": "Modern Nexus Lantern",
    "description": "High quality lantern designed for maximum performance, style, and durability. Built with metal materials. Perfect for your lifestyle.",
    "brand": "Nexus",
    "category": "Outdoor & Camping",
    "price": 54.75,
    "stock": 88,
    "images": [
      "https://images.unsplash.com/photo-1504280741562-fd080b4ea5fa?w=800&q=80"
    ],
    "tags": [
      "wild",
      "camping",
      "mountain",
      "hiking",
      "modern"
    ],
    "attributes": {
      "color": "Red",
      "style": "Sporty",
      "material": "Metal"
    },
    "rating": 4.6,
    "reviewCount": 155
  }
];

export const seedDatabase = async () => {
  try {
    const count = await Product.countDocuments();
    // We want to force a re-seed of the new 120 products, so we wipe existing ones.
    logger.info('Wiping existing products to re-seed with 120 diverse products...');
    await Product.deleteMany({});
    
    await Product.insertMany(SEED_PRODUCTS);
    logger.info(`Successfully seeded ${SEED_PRODUCTS.length} products.`);
  } catch (error) {
    logger.error('Error seeding database:', error);
  }
};
