import { queryVectorStore } from '../vector/vectorStore.js';

export const searchVectorStore = async (queryEmbedding) => {
  // This acts as a clean provider interface for the Retrieval Engine
  return await queryVectorStore(queryEmbedding);
};
