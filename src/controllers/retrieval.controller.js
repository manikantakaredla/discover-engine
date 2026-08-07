import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { executeRetrievalPipeline } from '../ai/retrieval/core/retrievalEngine.js';

export const getCandidates = asyncHandler(async (req, res) => {
  const { query } = req.body;
  // This is an internal pipeline API simulation
  const result = await executeRetrievalPipeline(query, null);
  res.status(200).json(new ApiResponse(200, result.candidates, 'Candidates retrieved'));
});

export const getHealth = asyncHandler(async (req, res) => {
  // Run a quick dummy retrieval to get health metrics
  const result = await executeRetrievalPipeline("health_check_ping", null);
  res.status(200).json(new ApiResponse(200, result.health, 'Retrieval health fetched'));
});
