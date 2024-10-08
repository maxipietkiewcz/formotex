import { Router } from "express";
import { UserController } from "../controllers/user.controllers";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", UserController.getAllUsers);

router.get("/:id", UserController.getUserById);

router.put("/:id", UserController.updateUser);

router.delete("/:id", UserController.deleteUser);

export default router;
