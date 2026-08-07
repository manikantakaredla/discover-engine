import express from 'express';
import { getUsers, updateUser, deleteUser } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { admin } from '../middleware/admin.middleware.js';

const router = express.Router();

// All routes here are protected and require admin role
router.use(protect, admin);

router.route('/')
  .get(getUsers);

router.route('/:id')
  .put(updateUser)
  .delete(deleteUser);

export default router;
