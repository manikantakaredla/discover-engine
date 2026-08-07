import { retrievalConfig } from '../config/retrieval.config.js';

export const rerankCandidates = (candidates, queryContext) => {
  const { intentContext, queryEmbedding } = queryContext;
  
  const ranked = candidates.map(candidate => {
    let score = 0;
    
    // 1. Semantic Similarity (Mocking cosine similarity extracted from FAISS)
    const semanticSimilarity = candidate.similarityScore || 0.5;
    score += semanticSimilarity * retrievalConfig.weights.semanticSimilarity;

    // 2. Intent Match
    let intentMatch = 0;
    if (intentContext) {
      if (candidate.product.category === intentContext.dominantCategory) intentMatch += 0.5;
      if (candidate.product.brand === intentContext.dominantBrand) intentMatch += 0.5;
    }
    score += intentMatch * retrievalConfig.weights.intentMatch;

    // 3. Popularity
    const popularity = candidate.product.rating ? (candidate.product.rating / 5) : 0;
    score += popularity * retrievalConfig.weights.popularity;

    // 4. Freshness (Mocking freshness based on creation date)
    const freshness = 1.0; // Assume fresh for mock
    score += freshness * retrievalConfig.weights.freshness;

    // 5. Product Graph (Assume connected items get a boost)
    const graphBoost = candidate.isGraphConnected ? 1.0 : 0;
    score += graphBoost * retrievalConfig.weights.productGraph;

    return {
      ...candidate,
      finalScore: score
    };
  });

  // Sort descending by finalScore
  ranked.sort((a, b) => b.finalScore - a.finalScore);
  
  return ranked.slice(0, retrievalConfig.finalCandidateCount);
};
