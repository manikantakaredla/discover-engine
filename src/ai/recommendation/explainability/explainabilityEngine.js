export const generateReasoning = (candidate, intentContext) => {
  const { scoreBreakdown, product, sources } = candidate;
  
  if (sources.includes('intent')) {
    return `Because you are interested in ${intentContext.dominantCategory || product.category}`;
  }
  
  if (sources.includes('graph')) {
    return `Because you viewed similar items`;
  }
  
  if (sources.includes('trending')) {
    return `Trending right now`;
  }
  
  if (scoreBreakdown.exploration > 0) {
    return `A hidden gem we thought you'd like`;
  }
  
  return `Recommended for you`;
};
