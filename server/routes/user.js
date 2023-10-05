import { Router } from 'express';
import {
  followUser,
  getUserAndPosts,
  login,
  signup,
  updateUserData,
} from '../controllers/userController.js';

const router = Router();

router.get('/:username', getUserAndPosts);
router.patch('/:userId', updateUserData);
router.patch('/:userLogId/follow/:userId', followUser);
router.post('/login', login);
router.post('/signup', signup);

export default router;
