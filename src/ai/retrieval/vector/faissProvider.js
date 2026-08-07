import Product from '../../../../models/Product.model.js';
import { retrievalConfig } from '../config/retrieval.config.js';

export const searchFaissMock = async (queryVector) => {
  // STUB: Since we don't have python/FAISS running in this node environment,
  // we mock a vector search by returning a random subset of products and assigning mock similarity scores.
  
  const allProducts = await Product.find({ isDeleted: false }).limit(100);
  
  // Shuffle and take topK
  const shuffled = allProducts.sort(() => 0.5 - Math.random());
  const topKProducts = shuffled.slice(0, retrievalConfig.topK);

  return topKProducts.map(product => ({
    product,
    similarityScore: 0.5 + (Math.random() * 0.5) // Score between 0.5 and 1.0
  }));
};
