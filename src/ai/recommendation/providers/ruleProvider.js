import Product from '../../../../models/Product.model.js';
import ProductGraph from '../../../../models/ProductGraph.model.js';

export const fetchByIntentRules = async (intentName, categories, brands, limit = 20) => {
  // Mocking rule-based logic for DB querying
  const query = {};
  if (categories && categories.length > 0) query.category = { $in: categories };
  if (brands && brands.length > 0) query.brand = { $in: brands };

  // Fallback if no specific categories/brands found in intent context
  if (Object.keys(query).length === 0) {
    return await Product.find({ isDeleted: false }).limit(limit);
  }

  query.isDeleted = false;
  return await Product.find(query).limit(limit);
};

export const fetchGraphRelations = async (productIds) => {
  return await ProductGraph.find({ product: { $in: productIds } })
    .populate('similarProducts frequentlyBoughtTogether');
};

export const fetchTrending = async (limit = 10) => {
  // Simple trending logic (would use real analytics metrics in production)
  return await Product.find({ isDeleted: false }).sort({ rating: -1, stock: -1 }).limit(limit);
};

export const fetchNewArrivals = async (limit = 10) => {
  return await Product.find({ isDeleted: false }).sort({ createdAt: -1 }).limit(limit);
};
