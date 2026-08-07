import { fetchGraphRelations } from '../providers/ruleProvider.js';

export const generateCompleteLook = async (intentContext, cartItemIds) => {
  if (!cartItemIds || cartItemIds.length === 0) return [];
  
  // CTL usually leverages graph relations like "accessories" or "matching outfits"
  const graphData = await fetchGraphRelations(cartItemIds);
  const lookItems = [];
  
  graphData.forEach(node => {
    // We assume similarProducts or a specific 'accessories' field contains CTL items
    // In this basic version, we just use similarProducts
    if (node.similarProducts) {
      lookItems.push(...node.similarProducts);
    }
  });

  // Deduplicate
  const unique = Array.from(new Set(lookItems.map(p => p._id.toString())))
    .map(id => lookItems.find(p => p._id.toString() === id));
    
  return unique.slice(0, 5); // Limit to 5 for a bundle UI
};
