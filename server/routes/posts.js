import { Router } from 'express';
import {
  createPost,
  updateComment,
  deletePost,
  getPosts,
  updatePost,
  likePost,
  commentPost,
  likeComment,
  getPostsBySearch,
  getPostsByUsername,
  deleteComment,
  getPostsById,
  getFollowPosts,
} from '../controllers/postsController.js';

import auth from '../middleware/auth.js';

const router = Router();

// Posts

router.get('/', getFollowPosts);
router.get('/explore', getPosts);
router.get('/search', getPostsBySearch);
router.get('/user/:username', getPostsByUsername);
router.get('/:postId', getPostsById);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

//Comments

router.post('/:postId/commentPost', auth, commentPost);
router.patch('/:postId/commentPost/:commentId', auth, updateComment);
router.delete('/:postId/commentPost/:commentId', auth, deleteComment);

router.patch('/:postId/commentPost/:commentId/likePost', auth, likeComment);

export default router;
