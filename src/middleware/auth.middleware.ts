import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface RequestAutenticado extends Request {
  user: string | jwt.JwtPayload;
}

export function authMiddleware(
  req: RequestAutenticado,
  res: Response,
  next: NextFunction
) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Acceso Denegado" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Token Inválido" });
  }
}
