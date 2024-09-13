import { Router } from "express";
import { AuthController } from "../controllers/auth.controllers";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

export default router;
