export const calculateConfidence = (sortedScoredIntents, evidenceList) => {
  const totalScore = sortedScoredIntents.reduce((acc, curr) => acc + curr.rawScore, 0);
  
  if (totalScore === 0) return { intents: [], breakdown: {} };

  const intentsWithConfidence = sortedScoredIntents.map(intent => ({
    name: intent.name,
    confidence: Math.round((intent.rawScore / totalScore) * 100)
  }));

  // Calculate Breakdown for primary intent
  const primaryIntentName = intentsWithConfidence.length > 0 ? intentsWithConfidence[0].name : null;
  const breakdown = { overall: intentsWithConfidence.length > 0 ? intentsWithConfidence[0].confidence : 0, click: 0, search: 0, wishlist: 0, cart: 0, purchase: 0 };
  
  if (primaryIntentName) {
    const primaryEvidence = evidenceList.filter(e => e.intent === primaryIntentName);
    const primaryTotalScore = primaryEvidence.reduce((acc, e) => acc + e.score, 0);

    if (primaryTotalScore > 0) {
      breakdown.click = Math.round((primaryEvidence.filter(e => e.source === 'Click').reduce((acc, e) => acc + e.score, 0) / primaryTotalScore) * breakdown.overall);
      breakdown.search = Math.round((primaryEvidence.filter(e => e.source === 'Search').reduce((acc, e) => acc + e.score, 0) / primaryTotalScore) * breakdown.overall);
      breakdown.wishlist = Math.round((primaryEvidence.filter(e => e.source === 'Wishlist').reduce((acc, e) => acc + e.score, 0) / primaryTotalScore) * breakdown.overall);
      breakdown.cart = Math.round((primaryEvidence.filter(e => e.source === 'Cart').reduce((acc, e) => acc + e.score, 0) / primaryTotalScore) * breakdown.overall);
      breakdown.purchase = Math.round((primaryEvidence.filter(e => e.source === 'Purchase').reduce((acc, e) => acc + e.score, 0) / primaryTotalScore) * breakdown.overall);
    }
  }

  return {
    intents: intentsWithConfidence,
    breakdown
  };
};
