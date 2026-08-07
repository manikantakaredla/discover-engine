import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import * as recommendationService from '../services/recommendation/recommendation.service.js';

export const getHomeFeed = asyncHandler(async (req, res) => {
  const { sessionId } = req.query;
  const feed = await recommendationService.getHomeFeed(sessionId);
  
  res.status(200).json(new ApiResponse(200, feed, 'Home feed generated successfully'));
});

/**
 * Returns the decision trace for a specific recommendation ID.
 */
export const getTrace = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  // Mock decision trace for the demo
  const traceData = {
    id,
    decisionTrace: [
      "Intent Detected",
      "Strategy Selected",
      "Retrieved 132 Candidates",
      "Removed 8 Duplicates",
      "Applied Diversity Filter",
      "Generated Final Feed"
    ]
  };
  
  res.status(200).json(new ApiResponse(200, traceData, 'Decision trace fetched'));
});
