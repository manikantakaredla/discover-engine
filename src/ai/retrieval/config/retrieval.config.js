export const retrievalConfig = {
  // Number of top candidates to retrieve from Vector search before reranking
  topK: 50,
  
  // Maximum number of final candidates to return
  finalCandidateCount: 20,
  
  // Similarity threshold for semantic matches (e.g. cosine similarity > 0.75)
  similarityThreshold: 0.75,
  
  // TTL for cached retrieval results in seconds
  cacheTTLSeconds: 300,

  // Weights for Hybrid Re-Ranking
  weights: {
    intentMatch: 0.3,
    semanticSimilarity: 0.4,
    productGraph: 0.1,
    popularity: 0.1,
    freshness: 0.1
  }
};
