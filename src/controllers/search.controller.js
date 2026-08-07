import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { routeQuery } from '../ai/aiRouter.js';
import Intent from '../models/Intent.model.js';
import SearchEvent from '../models/SearchEvent.model.js';

const trackSearch = async (req, query, resultsLength, searchTimeMs) => {
  if (req.body.sessionId) {
    await SearchEvent.create({
      user: req.user ? req.user._id : null,
      session: req.body.sessionId,
      query,
      resultsReturned: resultsLength,
      searchTimeMs
    });
  }
};

export const semanticSearch = asyncHandler(async (req, res) => {
  const { query, sessionId } = req.body;
  const intentDoc = sessionId ? await Intent.findOne({ sessionId }) : null;
  const intentContext = intentDoc ? intentDoc.intentContext : null;
  
  const startTime = Date.now();
  const result = await routeQuery('SEMANTIC', { query }, intentContext);
  
  await trackSearch(req, query, result.candidates.length, Date.now() - startTime);

  res.status(200).json(new ApiResponse(200, result, 'Semantic search successful'));
});

export const vectorSearch = asyncHandler(async (req, res) => {
  const { query, sessionId } = req.body;
  const intentDoc = sessionId ? await Intent.findOne({ sessionId }) : null;
  
  const result = await routeQuery('VECTOR', { query }, intentDoc?.intentContext);
  res.status(200).json(new ApiResponse(200, result, 'Vector search successful'));
});

export const hybridSearch = asyncHandler(async (req, res) => {
  const { query, sessionId } = req.body;
  const intentDoc = sessionId ? await Intent.findOne({ sessionId }) : null;
  
  const result = await routeQuery('HYBRID', { query }, intentDoc?.intentContext);
  res.status(200).json(new ApiResponse(200, result, 'Hybrid search successful'));
});

export const imageSearch = asyncHandler(async (req, res) => {
  // Placeholder for image URL or Base64 upload
  const { imageUrl } = req.body;
  const result = await routeQuery('IMAGE', { imageUrl }, null);
  res.status(200).json(new ApiResponse(200, result, 'Image search successful'));
});
