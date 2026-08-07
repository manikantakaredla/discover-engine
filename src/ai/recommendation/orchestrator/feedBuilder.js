export const buildFeedSections = (intentContext, candidates) => {
  const sections = [];

  // Recommended For You
  sections.push({
    type: 'recommended',
    title: 'Recommended For You',
    products: candidates.recommended || []
  });

  // Complete The Look
  if (candidates.completeLook && candidates.completeLook.length > 0) {
    sections.push({
      type: 'completeLook',
      title: 'Complete The Look',
      products: candidates.completeLook
    });
  }

  // Frequently Bought Together
  if (candidates.frequentlyBought && candidates.frequentlyBought.length > 0) {
    sections.push({
      type: 'fbt',
      title: 'Frequently Bought Together',
      products: candidates.frequentlyBought
    });
  }

  // Trending
  sections.push({
    type: 'trending',
    title: 'Trending Right Now',
    products: candidates.trending || []
  });

  // Explore More (Discovery)
  sections.push({
    type: 'explore',
    title: 'Explore More',
    products: candidates.explore || []
  });

  // New Arrivals (Discovery)
  sections.push({
    type: 'newArrivals',
    title: 'New Arrivals',
    products: candidates.newArrivals || []
  });

  return sections;
};

export const formatFinalResponse = (intentDoc, sections, metrics) => {
  return {
    feedVersion: "1.0",
    generatedAt: new Date(),
    metrics: metrics || {
      latency: 0,
      cacheHit: false,
      candidateCount: 0,
      finalCount: 0
    },
    mission: intentDoc ? {
      primary: intentDoc.primaryIntent,
      context: intentDoc.intentContext,
      state: intentDoc.status
    } : null,
    sections: sections
  };
};
