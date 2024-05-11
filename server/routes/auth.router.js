import express from "express";
const router = express.Router();
import {
  googleLogin,
  signUp,
  userLogin,
} from "../controllers/auth.controller.js";

router.post("/signup", signUp);

router.post("/login", userLogin);
router.post("/google", googleLogin);

export default router;
