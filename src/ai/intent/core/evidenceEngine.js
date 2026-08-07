import { applyRules } from './ruleEngine.js';
import { applyTimeDecay } from './decayEngine.js';
import { intentWeights } from '../../../config/intentWeights.js';

export const generateEvidence = (signals) => {
  const evidence = [];

  const addEvidence = (source, items, weight, actionProp) => {
    const frequencyMap = {};
    items.forEach(item => {
      // Identity could be product title or search query
      const value = item.query || (item.product && item.product.title) || 'Unknown';
      const textToMatch = value + (item.product ? ` ${item.product.category} ${item.product.brand}` : '');
      const intent = applyRules(textToMatch, item.query || '');
      
      frequencyMap[value] = (frequencyMap[value] || 0) + 1;
      
      let baseScore = weight;
      if (frequencyMap[value] > 1) {
        if (source === 'Search') baseScore += intentWeights.REPEATED_SEARCH_BONUS;
        if (source === 'Cart') baseScore += intentWeights.REPEATED_CART_BONUS;
        if (source === 'Click') baseScore += intentWeights.REPEATED_CLICK_BONUS;
      }

      const finalScore = applyTimeDecay(baseScore, item.timestamp);
      
      evidence.push({
        source,
        value,
        intent,
        score: finalScore
      });
    });
  };

  addEvidence('Click', signals.clickSignals, intentWeights.CLICK);
  addEvidence('Search', signals.searchSignals, intentWeights.SEARCH);
  addEvidence('Wishlist', signals.wishlistSignals, intentWeights.WISHLIST);
  addEvidence('Cart', signals.cartSignals, intentWeights.CART);
  addEvidence('Purchase', signals.purchaseSignals, intentWeights.PURCHASE);

  return evidence;
};
