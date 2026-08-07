export const generateHealthMetrics = (metrics) => {
  return {
    latency: metrics.latency || 0,
    embeddingTime: metrics.embeddingTime || 0,
    vectorSearchTime: metrics.vectorSearchTime || 0,
    rerankingTime: metrics.rerankingTime || 0,
    cacheHit: metrics.cacheHit || false,
    provider: metrics.provider || 'FAISS'
  };
};
