export const calculateTransition = (previousIntentName, previousConfidence, currentIntentName, currentConfidence, evidenceList) => {
  if (!previousIntentName || previousIntentName === 'Unknown') return null;
  
  if (previousIntentName !== currentIntentName) {
    return {
      previousIntent: previousIntentName,
      currentIntent: currentIntentName,
      confidenceShift: currentConfidence - previousConfidence, // could be negative or positive depending on context, usually doesn't matter for diff intents
      transitionReason: evidenceList.slice(-2).map(e => `${e.source}: ${e.value}`) // Last two evidence pieces caused the shift
    };
  }
  return null;
};
