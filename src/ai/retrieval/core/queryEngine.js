import { expandQuery } from '../semantic/queryExpansion.js';
import { generateTextEmbedding } from '../embedding/textEmbedding.js';

export const understandQuery = async (rawQuery, intentContext) => {
  // 1. Basic Cleaning
  const cleanQuery = rawQuery.trim().toLowerCase();

  // 2. Query Expansion (Semantic substitution)
  const expandedTerms = expandQuery(cleanQuery);

  // 3. Generate Embedding for the expanded query
  const fullQueryText = `${cleanQuery} ${expandedTerms.join(' ')}`;
  const queryEmbedding = await generateTextEmbedding(fullQueryText);

  return {
    originalQuery: rawQuery,
    expandedTerms,
    queryEmbedding,
    intentContext // Passed down for reranking
  };
};
