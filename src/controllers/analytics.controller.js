import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import * as analyticsService from '../services/analytics/analytics.service.js';

export const trackEvent = asyncHandler(async (req, res) => {
  const { eventType, productId, metadata } = req.body;
  const sessionId = req.headers['x-session-id'] || 'anonymous-session';
  
  if (!eventType) {
    return res.status(400).json(new ApiResponse(400, null, 'eventType is required'));
  }

  const event = await analyticsService.trackEvent({
    sessionId,
    eventType,
    productId,
    metadata
  });

  return res.status(201).json(new ApiResponse(201, event, 'Event tracked successfully'));
});

export const getKpiDashboard = asyncHandler(async (req, res) => {
  const metrics = await analyticsService.getKpiMetrics();
  return res.status(200).json(new ApiResponse(200, metrics, 'KPI metrics retrieved successfully'));
});

export const getAdminDashboard = asyncHandler(async (req, res) => {
  const adminData = await analyticsService.getAdminMetrics();
  return res.status(200).json(new ApiResponse(200, adminData, 'Admin metrics retrieved successfully'));
});
