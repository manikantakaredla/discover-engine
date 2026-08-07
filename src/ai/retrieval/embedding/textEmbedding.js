import { embeddingConfig } from '../config/embedding.config.js';

export const generateTextEmbedding = async (text) => {
  // STUB: Would call SentenceTransformers, HuggingFace, or OpenAI here
  // For the hackathon, we simulate returning a dense vector of the configured dimension
  return new Array(embeddingConfig.textDimension).fill(0).map(() => Math.random());
};
