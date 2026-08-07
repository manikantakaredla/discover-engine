import express from 'express';
import { getHomeFeed, getTrace } from '../controllers/recommendation.controller.js';

const router = express.Router();

// The primary feed endpoint
router.get('/home', getHomeFeed);

// Additional specific endpoints can be mapped here later (e.g. /trending, /new, /explain/:id)
// as required by the frontend, though /home orchestrates all of them into one payload.

// AI Decision Trace for a specific recommendation ID
router.get('/trace/:id', getTrace);

export default router;
