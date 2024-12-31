import express from "express";
import {
  login,
  register,
  logout,
  chat,
  getUser,
  createTask,
  getDayTask,
  deleteTask,
  updateTask,
} from "../controllers/controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/user", getUser);
router.post("/chat", chat);
router.post("/task/create", createTask);
router.post("/task/day", getDayTask);
router.delete("/task/:id", deleteTask);
router.put("/task/:id", updateTask);

export default router;
