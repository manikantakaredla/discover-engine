export const determineStrategy = (intentDoc, sessionDoc) => {
  if (!intentDoc || intentDoc.status === 'Unknown') {
    if (!sessionDoc || sessionDoc.sessionHeat.totalInteractions === 0) {
      return 'COLD_START_STRATEGY'; // Brand new user, no intent
    }
    return 'TRENDING_STRATEGY'; // Some interactions, but no clear intent yet
  }
  
  if (intentDoc.status === 'Confirmed' || intentDoc.status === 'Dominant') {
    return 'INTENT_STRATEGY'; // Strong intent detected
  }

  return 'PERSONALIZED_STRATEGY'; // Emerging intent or mixed signals, balance between intent and history
};
