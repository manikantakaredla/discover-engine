import { performSemanticSearch } from './retrieval/semantic/semanticSearch.js';
import { executeRetrievalPipeline } from './retrieval/core/retrievalEngine.js';
// other engines would be imported here

export const routeQuery = async (queryType, payload, intentContext) => {
  // AI Router determines the execution path
  switch (queryType) {
    case 'SEMANTIC':
      return await performSemanticSearch(payload.query, intentContext);
      
    case 'VECTOR':
      // Raw vector search bypassing expansion
      return await executeRetrievalPipeline(payload.query, intentContext);
      
    case 'HYBRID':
      // Semantic + Intent + Popularity + Graph (Default pipeline handles this via Hybrid Reranker)
      return await executeRetrievalPipeline(payload.query, intentContext);
      
    case 'IMAGE':
      // Stub for Multimodal Image Search
      return { candidates: [], health: { provider: 'CLIP_STUB' } };
      
    case 'RULE':
      // Fallback for simple exact keyword matches
      return { candidates: [], health: { provider: 'MONGO_TEXT' } };
      
    case 'LLM':
      throw new Error("LLM processing not active for this module.");
      
    default:
      return await performSemanticSearch(payload.query, intentContext);
  }
};
