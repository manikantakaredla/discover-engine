import { generateMultimodalEmbedding } from '../embedding/multimodalEmbedding.js';
import { generateTextEmbedding } from '../embedding/textEmbedding.js';

export const generateProductEmbedding = async (product) => {
  // Encode product attributes
  const textContext = `${product.title} ${product.description} ${product.brand} ${product.category}`;
  
  if (product.images && product.images.length > 0) {
    return await generateMultimodalEmbedding(textContext, product.images[0]);
  }
  
  return await generateTextEmbedding(textContext);
};
