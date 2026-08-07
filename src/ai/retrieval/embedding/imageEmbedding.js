import { embeddingConfig } from '../config/embedding.config.js';

export const generateImageEmbedding = async (imageUrl) => {
  // STUB: Would call CLIP or similar vision model here
  return new Array(embeddingConfig.imageDimension).fill(0).map(() => Math.random());
};
