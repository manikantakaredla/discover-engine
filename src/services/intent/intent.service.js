import { detectIntent } from '../../ai/intent/intentIntelligenceEngine.js';
import Intent from '../../models/Intent.model.js';
import { ApiError } from '../../utils/ApiError.js';

export const processIntentDetection = async (sessionId) => {
  if (!sessionId) throw new ApiError(400, 'Session ID is required');
  
  // This invokes the full Intent Intelligence Engine pipeline
  return await detectIntent(sessionId);
};

export const fetchCurrentIntent = async (sessionId) => {
  const intent = await Intent.findOne({ sessionId });
  if (!intent) throw new ApiError(404, 'No intent context found for this session');
  return intent;
};
