import express from 'express';
import { getHomeFeed } from '../controllers/recommendation.controller.js';

const router = express.Router();

// The primary feed endpoint
router.get('/home', getHomeFeed);

// Additional specific endpoints can be mapped here later (e.g. /trending, /new, /explain/:id)
// as required by the frontend, though /home orchestrates all of them into one payload.

export default router;
