export const applyDiversityFilter = (safeCandidates, maxPerCategoryRatio = 0.35) => {
  const diverseList = [];
  const categoryCounts = {};
  const totalAllowed = safeCandidates.length;
  
  for (const candidate of safeCandidates) {
    const category = candidate.product.category || 'Unknown';
    const currentCount = categoryCounts[category] || 0;
    
    // Guardrail: Category diversity <= 35% (unless list is very small)
    if (totalAllowed > 10 && currentCount >= totalAllowed * maxPerCategoryRatio) {
      continue; // Skip this to enforce diversity
    }
    
    categoryCounts[category] = currentCount + 1;
    diverseList.push(candidate);
  }
  
  return diverseList;
};
