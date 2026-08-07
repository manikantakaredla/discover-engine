import { fetchGraphRelations } from '../providers/ruleProvider.js';

export const generateFrequentlyBought = async (cartItemIds) => {
  if (!cartItemIds || cartItemIds.length === 0) return [];
  
  const graphData = await fetchGraphRelations(cartItemIds);
  const fbtItems = [];
  
  graphData.forEach(node => {
    if (node.frequentlyBoughtTogether) {
      fbtItems.push(...node.frequentlyBoughtTogether);
    }
  });

  const unique = Array.from(new Set(fbtItems.map(p => p._id.toString())))
    .map(id => fbtItems.find(p => p._id.toString() === id));
    
  return unique.slice(0, 5);
};
