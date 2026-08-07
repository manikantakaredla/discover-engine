import express from 'express';
import { getCandidates, getHealth } from '../controllers/retrieval.controller.js';

const router = express.Router();

router.post('/candidates', getCandidates);
router.get('/health', getHealth);

export default router;
