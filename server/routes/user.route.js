import express from "express";
const router = express.Router();
import { testApi } from "../controllers/user.controller.js";

router.get("/test", testApi);

export default router;
