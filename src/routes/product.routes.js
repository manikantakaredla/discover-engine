import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { admin } from '../middleware/admin.middleware.js';
import { validateRequest } from '../middleware/validate.middleware.js';
import { productValidator } from '../validators/product.validator.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, admin, productValidator, validateRequest, createProduct);

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
