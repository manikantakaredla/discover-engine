export const buildContext = (evidenceList, signals) => {
  // Compute dominant categories, brands based on products in signals
  const categories = {};
  const brands = {};
  
  const products = [
    ...signals.clickSignals.map(s => s.product),
    ...signals.wishlistSignals.map(s => s.product),
    ...signals.cartSignals.map(s => s.product),
    ...signals.purchaseSignals.map(s => s.product)
  ].filter(Boolean);

  products.forEach(p => {
    if (p.category) categories[p.category] = (categories[p.category] || 0) + 1;
    if (p.brand) brands[p.brand] = (brands[p.brand] || 0) + 1;
  });

  const dominantCategory = Object.keys(categories).sort((a,b) => categories[b] - categories[a])[0] || 'Unknown';
  const dominantBrand = Object.keys(brands).sort((a,b) => brands[b] - brands[a])[0] || 'Unknown';
  
  const searches = signals.searchSignals.map(s => s.query);
  const dominantSearch = searches.length > 0 ? searches[searches.length - 1] : 'None';

  let sessionStage = 'Exploration';
  if (signals.purchaseSignals.length > 0) sessionStage = 'Post Purchase';
  else if (signals.cartSignals.length > 0) sessionStage = 'Buying';
  else if (signals.wishlistSignals.length > 0) sessionStage = 'Evaluating';
  else if (signals.searchSignals.length > 0) sessionStage = 'Comparing';

  return {
    dominantCategory,
    dominantBrand,
    dominantSearch,
    dominantPriceRange: 'Varies', // simplified for now
    sessionStage
  };
};
