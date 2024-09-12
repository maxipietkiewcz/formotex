import { Response, Request } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async login(req: Request, res: Response) {
    const { username, password, role } = req.body;
    try {
      const token = await AuthService.login(username, password, role);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(400).json({ error: "Credenciales incorrectas" });
    }
  }

  static async register(req: Request, res: Response) {
    const { username, password, role } = req.body;
    try {
      const newUser = await AuthService.register(username, password, role);
      return res.status(201).json({ user: newUser });
    } catch (error) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }
  }
}
