import { Router } from "express";

import {
  fetchPosts,
  fetchPost,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

const router = Router();

router.get("/", fetchPosts);
router.get("/:id", fetchPost);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
