import { INTENT_TYPES } from '../../../../constants/intentTypes.js';

// Simple keyword/category rules for this version of the architecture
const ruleMap = {
  [INTENT_TYPES.FITNESS_JOURNEY]: ['running', 'protein', 'bottle', 'watch', 'sports', 'gym'],
  [INTENT_TYPES.OFFICE_SETUP]: ['laptop', 'keyboard', 'monitor', 'chair', 'desk'],
  [INTENT_TYPES.GAMING_SETUP]: ['gaming', 'rgb', 'console', 'gpu', 'chair'],
  [INTENT_TYPES.WEDDING_PREPARATION]: ['wedding', 'dress', 'jewelry', 'heels', 'makeup']
};

export const applyRules = (productText, searchQueries) => {
  const text = `${productText} ${searchQueries}`.toLowerCase();
  
  for (const [intent, keywords] of Object.entries(ruleMap)) {
    if (keywords.some(kw => text.includes(kw))) {
      return intent;
    }
  }
  
  return INTENT_TYPES.UNKNOWN;
};
