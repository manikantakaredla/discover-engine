import express from 'express';
import {
  triggerDetection,
  getCurrentIntent,
  getEvidence,
  getSignals,
  getHealth,
  getContext,
  getTopIntents,
  getState,
  getTimeline,
  getHistory
} from '../controllers/intent.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Intent APIs might be called by the frontend or internal microservices
router.post('/detect', triggerDetection);

router.get('/current', getCurrentIntent);
router.get('/evidence', getEvidence);
router.get('/signals', getSignals);
router.get('/health', getHealth);
router.get('/context', getContext);
router.get('/top', getTopIntents);
router.get('/state', getState);
router.get('/timeline', getTimeline);
router.get('/history', getHistory);

export default router;
