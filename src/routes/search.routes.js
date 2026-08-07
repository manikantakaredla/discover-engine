import express from 'express';
import { performSearch } from '../controllers/search.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Optional authentication to track user's searches, but allows guests too
const optionalProtect = (req, res, next) => {
  if (req.headers.authorization || (req.cookies && req.cookies.jwt)) {
    return protect(req, res, next);
  }
  next();
};

router.get('/', optionalProtect, performSearch);

export default router;
