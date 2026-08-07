export const rankCandidates = (mergedCandidates, intentContext) => {
  return mergedCandidates.map(candidate => {
    const { product, sources, score: baseScore } = candidate;
    
    let intentScore = sources.includes('intent') ? 40 : 0;
    let graphScore = sources.includes('graph') ? 20 : 0;
    let trendScore = sources.includes('trending') ? 10 : 0;
    let similarityScore = 0;
    let explorationScore = 0;

    // Context Matching (Brand/Category)
    if (intentContext) {
      if (product.category === intentContext.dominantCategory) similarityScore += 10;
      if (product.brand === intentContext.dominantBrand) similarityScore += 5;
    }

    // Exploration boost for newer or highly rated but under-viewed products
    if (!sources.includes('intent') && product.rating > 4.5) {
      explorationScore += 15;
    }

    const finalScore = intentScore + graphScore + trendScore + similarityScore + explorationScore + baseScore;

    return {
      product,
      scoreBreakdown: {
        intent: intentScore,
        graph: graphScore,
        similarity: similarityScore,
        trend: trendScore,
        exploration: explorationScore,
        base: baseScore,
        total: finalScore
      }
    };
  }).sort((a, b) => b.scoreBreakdown.total - a.scoreBreakdown.total);
};
