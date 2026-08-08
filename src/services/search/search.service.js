import Product from '../../models/Product.model.js';
import { extractSearchIntent, generateEmbedding } from '../gemini.service.js';
import { logger } from '../../config/logger.js';

const cosineSimilarity = (vecA, vecB) => {
  if (!vecA || !vecB || !vecA.length || !vecB.length || vecA.length !== vecB.length) return 0;
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};

/**
 * Perform a true semantic search using Gemini text embeddings.
 * 
 * @param {string} rawQuery The original user search string.
 * @returns {Promise<Object>} An object containing the extracted query intent and found products.
 */
export const searchProducts = async (rawQuery) => {
  if (!rawQuery || typeof rawQuery !== 'string') {
    throw new Error('Invalid search query');
  }

  logger.info(`Performing vector search for query: "${rawQuery}"`);

  // 1. Fetch user query embedding & structured intent in parallel
  const [queryEmbedding, intent] = await Promise.all([
    generateEmbedding(rawQuery),
    extractSearchIntent(rawQuery)
  ]);

  if (!queryEmbedding || queryEmbedding.length === 0) {
    logger.warn('Failed to generate embedding for query. Falling back to empty search.');
    return { query: intent, products: [] };
  }

  // 2. Fetch all active products (MVP approach for semantic search without Atlas Vector Index)
  // In a real production app with millions of items, you MUST use MongoDB Atlas Vector Search ($vectorSearch).
  const allProducts = await Product.find({ status: 'active', isDeleted: false }).lean();
  
  if (allProducts.length > 0) {
    logger.info(`Query embedding length: ${queryEmbedding.length}, First product embedding length: ${allProducts[0].embedding ? allProducts[0].embedding.length : 'none'}`);
  }

  // 3. Compute cosine similarity between query and every product
  const scoredProducts = allProducts.map(product => {
    let score = 0;
    if (product.embedding && product.embedding.length > 0) {
      score = cosineSimilarity(queryEmbedding, product.embedding);
    }
    return { ...product, score };
  });

  // 4. Sort by highest similarity
  scoredProducts.sort((a, b) => b.score - a.score);

  // 5. Filter out completely irrelevant results (score threshold) 
  // and take top 20
  const topProducts = scoredProducts
    .filter(p => p.score > 0.3) // threshold to ensure quality matches
    .slice(0, 20);

  logger.info(`Found ${topProducts.length} semantic matches for "${rawQuery}" (highest score: ${topProducts.length > 0 ? topProducts[0].score : 0})`);

  // Clean up the response (remove the heavy embedding array)
  const cleanProducts = topProducts.map(p => {
    const { embedding, score, ...clean } = p;
    return clean;
  });

  return {
    query: intent, // We still return the extracted intent for UI context / KPI tracking
    products: cleanProducts
  };
};
