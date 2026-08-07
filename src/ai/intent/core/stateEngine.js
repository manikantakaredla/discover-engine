import { INTENT_LIFECYCLE } from '../../../../constants/intentTypes.js';
import { intentConfig } from '../../../../config/intent.config.js';

export const determineState = (confidence, totalSignalsCount) => {
  if (totalSignalsCount === 0) return INTENT_LIFECYCLE.UNKNOWN;
  if (confidence >= intentConfig.confirmationThreshold) return INTENT_LIFECYCLE.DOMINANT;
  if (confidence >= intentConfig.detectionThreshold) return INTENT_LIFECYCLE.CONFIRMED;
  if (confidence >= intentConfig.minimumConfidence) return INTENT_LIFECYCLE.DETECTED;
  return INTENT_LIFECYCLE.EMERGING;
};
