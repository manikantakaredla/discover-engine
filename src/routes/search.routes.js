import express from 'express';
import {
  semanticSearch,
  vectorSearch,
  hybridSearch,
  imageSearch,
  searchProductsController
} from '../controllers/search.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

const optionalProtect = (req, res, next) => {
  if (req.headers.authorization || (req.cookies && req.cookies.jwt)) {
    return protect(req, res, next);
  }
  next();
};

router.get('/', optionalProtect, searchProductsController);
router.post('/semantic', optionalProtect, semanticSearch);
router.post('/vector', optionalProtect, vectorSearch);
router.post('/hybrid', optionalProtect, hybridSearch);
router.post('/image', optionalProtect, imageSearch);

export default router;
