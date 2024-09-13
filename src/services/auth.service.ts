import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model";

export class AuthService {
  static async login(username: string, password: string, role: string) {
    const user = await User.findOne({ username });
    if (!user) throw new Error("Usuario no encontrado");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Credenciales incorrectas");

    if (user.role !== role) throw new Error("Rol incorrecto");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_EXPIRATION || "1h",
      }
    );

    return token;
  }

  static async register(username: string, password: string, role: string) {
    const existingUser = await User.findOne({ username });
    if (existingUser) throw new Error("El usuario ya existe");

    const validRoles = ["user", "admin"];
    if (!validRoles.includes(role)) throw new Error("Rol no válido");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    return newUser;
  }
}
