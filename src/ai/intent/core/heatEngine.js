export const calculateHeat = (totalInteractions, sessionStartTime) => {
  const sessionDurationMinutes = (Date.now() - new Date(sessionStartTime).getTime()) / 60000;
  
  // Interactions per minute
  const velocity = sessionDurationMinutes > 0 ? (totalInteractions / sessionDurationMinutes) : totalInteractions;
  
  let intensity = 'Low';
  if (velocity > 5 || totalInteractions > 20) intensity = 'High';
  else if (velocity > 2 || totalInteractions > 5) intensity = 'Medium';
  
  const engagementScore = Math.min(Math.round(velocity * 10 + totalInteractions * 2), 100);

  return {
    intensity,
    engagementScore,
    totalInteractions
  };
};
