import { executeRetrievalPipeline } from '../core/retrievalEngine.js';

export const performSemanticSearch = async (query, intentContext) => {
  // Semantic search is a wrapper over the full vector retrieval pipeline
  return await executeRetrievalPipeline(query, intentContext);
};
