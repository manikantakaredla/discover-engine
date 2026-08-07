import Product from '../../../models/Product.model.js';

export const searchVectorStore = async (queryEmbedding, rawQuery) => {
  // Hackathon MVP: Fallback to real MongoDB text/regex search instead of mock vectors
  if (rawQuery) {
    const products = await Product.find({
      $or: [
        { title: { $regex: rawQuery, $options: 'i' } },
        { description: { $regex: rawQuery, $options: 'i' } }
      ]
    }).limit(20);
    // Wrap in standard retrieval candidate format
    return products.map(p => ({ product: p, score: 0.9 }));
  }
  return [];
};
