import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import * as recommendationService from '../services/recommendation/recommendation.service.js';

export const getHomeFeed = asyncHandler(async (req, res) => {
  const { sessionId } = req.query;
  const feed = await recommendationService.getHomeFeed(sessionId);
  
  res.status(200).json(new ApiResponse(200, feed, 'Home feed generated successfully'));
});
