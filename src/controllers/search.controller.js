import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Product from '../models/Product.model.js';
import SearchEvent from '../models/SearchEvent.model.js';

export const performSearch = asyncHandler(async (req, res) => {
  const { q, sessionId } = req.query;
  
  if (!q) {
    return res.status(400).json(new ApiResponse(400, [], 'Query is required'));
  }

  const startTime = Date.now();
  
  // Basic text search (Vector/Semantic search goes in AI module later)
  const results = await Product.find({
    $text: { $search: q },
    isDeleted: false
  }).limit(20);

  const searchTimeMs = Date.now() - startTime;

  // Track search event if sessionId is provided
  if (sessionId) {
    await SearchEvent.create({
      user: req.user ? req.user._id : null,
      session: sessionId,
      query: q,
      resultsReturned: results.length,
      searchTimeMs
    });
  }

  res.status(200).json(new ApiResponse(200, results, 'Search results fetched'));
});
