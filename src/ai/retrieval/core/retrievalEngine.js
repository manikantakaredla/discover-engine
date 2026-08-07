import { understandQuery } from './queryEngine.js';
import { searchVectorStore } from '../providers/retrievalProvider.js';
import { rerankCandidates } from './rerankingEngine.js';
import { generateHealthMetrics } from './retrievalHealth.js';

export const executeRetrievalPipeline = async (rawQuery, intentContext) => {
  const startTime = Date.now();
  let embeddingTime = 0;
  let vectorSearchTime = 0;
  let rerankingTime = 0;

  // 1. Query Understanding & Embedding
  const queryStart = Date.now();
  const queryContext = await understandQuery(rawQuery, intentContext);
  embeddingTime = Date.now() - queryStart;

  // 2. Vector Search (Two-Tower / FAISS)
  const searchStart = Date.now();
  const rawCandidates = await searchVectorStore(queryContext.queryEmbedding, rawQuery);
  vectorSearchTime = Date.now() - searchStart;

  // 3. Hybrid Re-Ranking
  const rerankStart = Date.now();
  const finalCandidates = rerankCandidates(rawCandidates, queryContext);
  rerankingTime = Date.now() - rerankStart;

  const latency = Date.now() - startTime;
  
  const health = generateHealthMetrics({
    latency,
    embeddingTime,
    vectorSearchTime,
    rerankingTime,
    cacheHit: false, // Mock
    provider: 'FAISS'
  });

  return {
    candidates: finalCandidates.map(c => c.product),
    health
  };
};
