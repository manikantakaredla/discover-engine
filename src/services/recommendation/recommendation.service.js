import { orchestrateHomeFeed } from '../../ai/recommendation/orchestrator/feedOrchestrator.js';
import Intent from '../../models/Intent.model.js';
import Session from '../../models/Session.model.js';
import { ApiError } from '../../utils/ApiError.js';

export const getHomeFeed = async (sessionId) => {
  if (!sessionId) {
    // If no session, generate a purely trending/cold-start feed
    return await orchestrateHomeFeed(null, null);
  }

  const intentDoc = await Intent.findOne({ sessionId });
  const sessionDoc = await Session.findOne({ sessionId });
  
  return await orchestrateHomeFeed(intentDoc, sessionDoc);
};
