import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import productRoutes from './product.routes.js';
import sessionRoutes from './session.routes.js';
import wishlistRoutes from './wishlist.routes.js';
import cartRoutes from './cart.routes.js';
import orderRoutes from './order.routes.js';
import searchRoutes from './search.routes.js';
import intentRoutes from './intent.routes.js';
import recommendationRoutes from './recommendation.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/session', sessionRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/search', searchRoutes);
router.use('/intent', intentRoutes);
router.use('/recommendations', recommendationRoutes);

// We will add analytics routes here later

export default router;
