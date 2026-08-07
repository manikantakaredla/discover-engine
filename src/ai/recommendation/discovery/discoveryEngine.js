export const generateExplorationMix = (diverseCandidates) => {
  // 15% Explore New / Hidden Gems
  const explore = [];
  const hiddenGems = [];
  const recommended = [];
  
  for (const candidate of diverseCandidates) {
    // If it has high exploration score, push to explore
    if (candidate.scoreBreakdown.exploration > 10) {
      if (candidate.product.rating > 4.7 && candidate.product.stock < 50) {
        hiddenGems.push(candidate);
      } else {
        explore.push(candidate);
      }
    } else {
      recommended.push(candidate);
    }
  }
  
  return {
    recommended: recommended.map(c => c.product),
    explore: explore.map(c => c.product),
    hiddenGems: hiddenGems.map(c => c.product)
  };
};
