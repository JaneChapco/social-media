import { Router } from "express";

import {
  fetchComments,
  fetchComment,
  createComment,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = Router();

router.get("/", fetchComments);
router.get("/:id", fetchComment);
router.post("/", createComment);
router.delete("/:id", deleteComment);

export default router;
