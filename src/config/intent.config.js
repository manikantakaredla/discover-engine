export const intentConfig = {
  // Time in minutes before an intent state decays to a lower confidence
  decayTimeMinutes: 30,
  
  // The threshold score required to transition from "Emerging" to "Detected"
  detectionThreshold: 40,
  
  // The threshold score required to transition from "Detected" to "Confirmed"
  confirmationThreshold: 75,
  
  // Minimum confidence to consider an intent valid
  minimumConfidence: 15,
  
  // Maximum number of secondary intents to track and expose to Recommendation Engine
  maxSecondaryIntents: 3,

  // Half-life for time decay scoring (in seconds)
  // E.g., if 600 (10 mins), an event 10 mins ago loses half its weight.
  timeDecayHalfLifeSeconds: 600,
};
