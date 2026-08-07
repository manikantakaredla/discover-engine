export const mergeCandidates = (intentCandidates, graphCandidates, trendingCandidates) => {
  const merged = new Map();

  const add = (items, source, baseScore) => {
    if (!items) return;
    items.forEach((item, index) => {
      const id = item._id.toString();
      if (!merged.has(id)) {
        merged.set(id, { product: item, sources: [source], score: baseScore - (index * 0.5) }); // Position penalty
      } else {
        const existing = merged.get(id);
        existing.sources.push(source);
        existing.score += (baseScore - (index * 0.5)) * 1.5; // Bonus for appearing in multiple sources
      }
    });
  };

  // Assign base source weights
  add(intentCandidates, 'intent', 40);
  add(graphCandidates, 'graph', 30);
  add(trendingCandidates, 'trending', 15);

  return Array.from(merged.values());
};
