import express from 'express';
import {
  startSession,
  trackView,
  trackClick,
  trackSearchEvent,
  trackWishlist,
  trackCart,
  trackPurchase,
  endSession
} from '../controllers/session.controller.js';

const router = express.Router();

router.post('/start', startSession);
router.post('/view', trackView);
router.post('/click', trackClick);
router.post('/search', trackSearchEvent);
router.post('/wishlist', trackWishlist);
router.post('/cart', trackCart);
router.post('/purchase', trackPurchase);
router.post('/end', endSession);

export default router;
