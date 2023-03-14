import { Router } from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
  likePost,
  commentPost,
  getPostsLength,
} from "../controllers/postsController.js";

import auth from "../middleware/auth.js";

const router = Router();

// Posts

router.get("/", getPosts);
router.get("/", getPostsLength);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.get("/:id", getPost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

export default router;
