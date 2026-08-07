import express from 'express';
import { getAIWorkflow, getKPI } from '../controllers/admin.controller.js';

const router = express.Router();

// Enterprise admin routes
router.get('/ai-workflow', getAIWorkflow);
router.get('/kpi', getKPI);

export default router;
