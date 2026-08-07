import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Session from '../models/Session.model.js';
import ClickEvent from '../models/ClickEvent.model.js';
import { v4 as uuidv4 } from 'uuid';

export const startSession = asyncHandler(async (req, res) => {
  const sessionId = req.body.sessionId || uuidv4();
  
  const session = await Session.create({
    sessionId,
    user: req.user ? req.user._id : null,
    device: req.body.device,
    browser: req.body.browser,
    ip: req.ip,
  });

  res.status(201).json(new ApiResponse(201, { sessionId: session.sessionId }, 'Session started'));
});

const trackEvent = async (action, req, res) => {
  const { sessionId, productId, source } = req.body;

  const event = await ClickEvent.create({
    user: req.user ? req.user._id : null,
    session: sessionId,
    product: productId,
    action,
    source,
  });

  res.status(201).json(new ApiResponse(201, event, `${action} event tracked`));
};

export const trackView = asyncHandler((req, res) => trackEvent('view', req, res));
export const trackClick = asyncHandler((req, res) => trackEvent('click', req, res));
export const trackWishlist = asyncHandler((req, res) => trackEvent('wishlist', req, res));
export const trackCart = asyncHandler((req, res) => trackEvent('cart', req, res));
export const trackPurchase = asyncHandler((req, res) => trackEvent('purchase', req, res));

export const trackSearchEvent = asyncHandler(async (req, res) => {
  // Normally goes to SearchEvent, handled here for simplicity of session tracking APIs
  res.status(200).json(new ApiResponse(200, {}, 'Search event tracked'));
});

export const endSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;
  
  const session = await Session.findOne({ sessionId });
  if (session) {
    session.endTime = new Date();
    session.duration = (session.endTime - session.startTime) / 1000;
    session.isActive = false;
    await session.save();
  }

  res.status(200).json(new ApiResponse(200, {}, 'Session ended'));
});
