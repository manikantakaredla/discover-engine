export const buildTimeline = (existingTimeline = [], newPrimaryIntent, newConfidence, reason) => {
  const lastEntry = existingTimeline[existingTimeline.length - 1];
  
  if (!lastEntry || lastEntry.intent !== newPrimaryIntent || Math.abs(lastEntry.confidence - newConfidence) > 10) {
    existingTimeline.push({
      intent: newPrimaryIntent,
      confidence: newConfidence,
      timestamp: new Date(),
      reason: reason || 'Confidence shifted or intent changed'
    });
  }
  
  return existingTimeline;
};
