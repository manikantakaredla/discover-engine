import { intentConfig } from '../../../../config/intent.config.js';

export const applyTimeDecay = (score, timestamp) => {
  const now = Date.now();
  const eventTime = new Date(timestamp).getTime();
  const ageSeconds = (now - eventTime) / 1000;
  
  if (ageSeconds <= 0) return score;

  // Formula: Score * (0.5 ^ (age / halfLife))
  const decayFactor = Math.pow(0.5, ageSeconds / intentConfig.timeDecayHalfLifeSeconds);
  
  return score * decayFactor;
};
