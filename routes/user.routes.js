import { Router } from "express";

import {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", fetchUsers);
router.get("/:id", fetchUser);
router.post("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
