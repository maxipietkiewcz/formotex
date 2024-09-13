import { Response, Request } from "express";
import { EquipamentService } from "../services/equipament.service";

export class EquipamentController {
  static async getAllItems(req: Request, res: Response) {
    const items = await EquipamentService.getAllItems();
    if (!items) throw new Error("Artículos no encontrados");
    return res.status(200).json({ items });
  }

  static async getItemById(req: Request, res: Response) {
    const item = await EquipamentService.getItemById(req.params.id);
    if (!item) throw new Error("Artículo no encontrado");
    res.status(200).json({ item });
  }

  static async createItem(req: Request, res: Response) {
    const item = await EquipamentService.createItem(req.body);
    if (!item) throw new Error("Artículo no creado");
    res.status(200).json({ item });
  }

  static async updateItem(req: Request, res: Response) {
    const item = await EquipamentService.updateItem(req.params.id, req.body);
    if (!item) throw new Error("Artículo no actualizado");
    res.status(200).json({ item });
  }

  static async deleteItem(req: Request, res: Response) {
    const item = await EquipamentService.deleteItem(req.params.id);
    if (!item) throw new Error("Artículo no eliminado");
    res.status(200).json({ item });
  }
}
