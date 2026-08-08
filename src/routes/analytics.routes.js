import express from 'express';
import * as analyticsController from '../controllers/analytics.controller.js';

const router = express.Router();

router.post('/track', analyticsController.trackEvent);
router.get('/kpi', analyticsController.getKpiDashboard);
router.get('/admin', analyticsController.getAdminDashboard);

export default router;
