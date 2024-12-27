import express from "express";
import {
  login,
  register,
  logout,
  chat,
  getUser,
} from "../controllers/controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/user", getUser);
router.get("/chat", chat);

export default router;
