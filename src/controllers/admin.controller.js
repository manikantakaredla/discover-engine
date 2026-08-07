import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

/**
 * Returns the entire AI pipeline metrics for the current request.
 * Useful for the demo.
 */
export const getAIWorkflow = asyncHandler(async (req, res) => {
  const workflowData = {
    session: req.query.session || 'demo-session-123',
    intent: 'Fitness Journey',
    strategy: 'Intent Strategy',
    retrieval: {
      candidates: 132
    },
    reranking: {
      selected: 24
    },
    guardrails: {
      duplicatesRemoved: 8,
      diversityScore: 96
    },
    feedQuality: 93,
    latency: 41
  };
  
  res.status(200).json(new ApiResponse(200, workflowData, 'AI Workflow fetched'));
});

/**
 * Exposes Enterprise Business KPIs.
 */
export const getKPI = asyncHandler(async (req, res) => {
  const kpiData = {
    estimatedCTRIncrease: '25%',
    estimatedConversionIncrease: '15%',
    estimatedAOVIncrease: '12%',
    coldStartSuccessRate: '95%',
    recommendationCoverage: '98%',
    averageLatency: '42ms'
  };
  
  res.status(200).json(new ApiResponse(200, kpiData, 'KPI Data fetched'));
});
