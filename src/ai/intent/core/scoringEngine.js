import { INTENT_TYPES } from '../../../../constants/intentTypes.js';

export const calculateScores = (evidenceList) => {
  const scores = {};
  
  evidenceList.forEach(evidence => {
    if (evidence.intent && evidence.intent !== INTENT_TYPES.UNKNOWN) {
      scores[evidence.intent] = (scores[evidence.intent] || 0) + evidence.score;
    }
  });

  // Sort intents by score descending
  const sortedIntents = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([name, rawScore]) => ({ name, rawScore }));

  return sortedIntents;
};
