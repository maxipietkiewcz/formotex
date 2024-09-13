import { Router } from "express";
import { EquipamentController } from "../controllers/equipament.controllers";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", EquipamentController.getAllItems);
router.get("/:id", EquipamentController.getItemById);
router.post("/", EquipamentController.createItem);
router.put("/:id", EquipamentController.updateItem);
router.delete("/:id", EquipamentController.deleteItem);

export default router;
