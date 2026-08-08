import Product from '../../models/Product.model.js';
import { extractSearchIntent } from '../gemini.service.js';
import { logger } from '../../config/logger.js';

/**
 * Perform a semantic-like search using Gemini to understand intent,
 * and MongoDB standard queries to fetch products.
 * 
 * @param {string} rawQuery The original user search string.
 * @returns {Promise<Object>} An object containing the extracted query intent and found products.
 */
export const searchProducts = async (rawQuery) => {
  if (!rawQuery || typeof rawQuery !== 'string') {
    throw new Error('Invalid search query');
  }

  // 1. Extract semantic intent via Gemini
  const intent = await extractSearchIntent(rawQuery);
  logger.info(`Extracted Intent for "${rawQuery}": ${JSON.stringify(intent)}`);

  // 2. Build MongoDB query
  const queryFilter = {};

  // If a specific category was identified (and it's not 'Any'), filter by it.
  // Assuming intent.category might be slightly off, we use a regex.
  if (intent.category && intent.category !== 'Any') {
    queryFilter.category = { $regex: new RegExp(intent.category, 'i') };
  }

  // Ensure brands is an array
  const brandsArr = Array.isArray(intent.brands) ? intent.brands : (typeof intent.brands === 'string' && intent.brands.trim() !== '' ? [intent.brands] : []);
  if (brandsArr.length > 0) {
    queryFilter.brand = { $in: brandsArr.map(b => new RegExp(`^${b}$`, 'i')) };
  }

  // Ensure tags is an array
  const tagsArr = Array.isArray(intent.tags) ? intent.tags : (typeof intent.tags === 'string' && intent.tags.trim() !== '' ? [intent.tags] : []);
  if (tagsArr.length > 0) {
    const tagRegexes = tagsArr.map(t => new RegExp(t, 'i'));
    queryFilter.$or = [
      { tags: { $in: tagRegexes } },
      { title: { $in: tagRegexes } },
      { description: { $in: tagRegexes } }
    ];
  }

  // If we couldn't extract any specific filters, fallback to a basic text search
  if (Object.keys(queryFilter).length === 0) {
    queryFilter.$or = [
      { title: { $regex: new RegExp(rawQuery, 'i') } },
      { description: { $regex: new RegExp(rawQuery, 'i') } },
      { tags: { $regex: new RegExp(rawQuery, 'i') } }
    ];
  }

  // Handle Price Range roughly
  if (intent.priceRange && typeof intent.priceRange === 'string') {
    const range = intent.priceRange.toLowerCase();
    if (range === 'low') {
      queryFilter.price = { ...queryFilter.price, $lte: 50 };
    } else if (range === 'medium') {
      queryFilter.price = { ...queryFilter.price, $gt: 50, $lte: 150 };
    } else if (range === 'high') {
      queryFilter.price = { ...queryFilter.price, $gt: 150 };
    }
  }

  // 3. Execute Mongo Query
  let products = await Product.find(queryFilter)
    .sort({ rating: -1, reviewCount: -1 })
    .limit(20)
    .lean();

  // 4. Fallback if results are too narrow (to ensure UI doesn't look empty for the demo)
  if (products.length < 8) {
    logger.info(`Narrow results (${products.length}). Applying broader fallback search...`);
    const broadFilter = {
      $or: [
        { title: { $regex: new RegExp(rawQuery.split(' ')[0], 'i') } },
        { description: { $regex: new RegExp(rawQuery.split(' ')[0], 'i') } },
        { tags: { $regex: new RegExp(rawQuery.split(' ')[0], 'i') } },
        { category: { $regex: new RegExp(rawQuery.split(' ')[0], 'i') } }
      ]
    };
    
    // Combine existing products with new broader products (avoid duplicates)
    const broaderProducts = await Product.find(broadFilter)
      .sort({ rating: -1 })
      .limit(20 - products.length)
      .lean();
      
    const existingIds = new Set(products.map(p => p._id.toString()));
    const uniqueNewProducts = broaderProducts.filter(p => !existingIds.has(p._id.toString()));
    
    products = [...products, ...uniqueNewProducts];
  }

  return {
    query: intent,
    products
  };
};
