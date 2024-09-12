import { Response, Request } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener los usuarios" });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.status(200).json({ user });
    } catch (error) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const user = await UserService.deleteUser(req.params.id);
      res.status(200).json({ user });
    } catch (error) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      res.status(200).json({ user });
    } catch (error) {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  }
}
