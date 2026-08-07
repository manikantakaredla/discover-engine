import { body } from 'express-validator';

export const productValidator = [
  body('title').trim().notEmpty().withMessage('Product title is required'),
  body('description').trim().notEmpty().withMessage('Product description is required'),
  body('brand').trim().notEmpty().withMessage('Brand is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
  body('discount').optional().isFloat({ min: 0, max: 100 }).withMessage('Discount must be between 0 and 100'),
];
