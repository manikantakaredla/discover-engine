import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import * as intentService from '../services/intent/intent.service.js';

export const triggerDetection = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;
  const intentData = await intentService.processIntentDetection(sessionId);
  res.status(200).json(new ApiResponse(200, intentData, 'Intent detection completed successfully'));
});

export const getCurrentIntent = asyncHandler(async (req, res) => {
  const { sessionId } = req.query;
  const intentData = await intentService.fetchCurrentIntent(sessionId);
  res.status(200).json(new ApiResponse(200, intentData.primaryIntent, 'Current intent fetched'));
});

export const getEvidence = asyncHandler(async (req, res) => {
  const { sessionId } = req.query;
  const intentData = await intentService.fetchCurrentIntent(sessionId);
  res.status(200).json(new ApiResponse(200, intentData.intentEvidence, 'Intent evidence fetched'));
});

export const getSignals = asyncHandler(async (req, res) => {
  const { sessionId } = req.query;
  const intentData = await intentService.fetchCurrentIntent(sessionId);
  res.status(200).json(new ApiResponse(200, intentData.signals, 'Intent signals fetched'));
});

export const getHealth = asyncHandler(async (req, res) => {
  const { sessionId } = req.query;
  const intentData = await intentService.fetchCurrentIntent(sessionId);
  res.status(200).json(new ApiResponse(200, intentData.intentHealth, 'Intent health fetched'));
});

export const getContext = asyncHandler(async (req, res) => {
  const { sessionId } = req.query;
  const intentData = await intentService.fetchCurrentIntent(sessionId);
  res.status(200).json(new ApiResponse(200, intentData.intentContext, 'Intent context fetched'));
});

export const getTopIntents = asyncHandler(async (req, res) => {
  const { sessionId } = req.query;
  const intentData = await intentService.fetchCurrentIntent(sessionId);
  const topIntents = [intentData.primaryIntent, ...intentData.secondaryIntents];
  res.status(200).json(new ApiResponse(200, topIntents, 'Top intents fetched'));
});

export const getState = asyncHandler(async (req, res) => {
  const { sessionId } = req.query;
  const intentData = await intentService.fetchCurrentIntent(sessionId);
  res.status(200).json(new ApiResponse(200, { status: intentData.status, lifecycle: intentData.status }, 'Intent state fetched'));
});

export const getTimeline = asyncHandler(async (req, res) => {
  const { sessionId } = req.query;
  const intentData = await intentService.fetchCurrentIntent(sessionId);
  res.status(200).json(new ApiResponse(200, intentData.intentTimeline, 'Intent timeline fetched'));
});

export const getHistory = asyncHandler(async (req, res) => {
  const { sessionId } = req.query;
  // History is similar to timeline but could span multiple sessions in a real system.
  // Using timeline here for this session's history.
  const intentData = await intentService.fetchCurrentIntent(sessionId);
  res.status(200).json(new ApiResponse(200, intentData.intentTimeline, 'Intent history fetched'));
});
