import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model";

export class AuthService {
  static async login(username: string, password: string) {
    const user = await User.findOne({ username });
    if (!user) throw new Error("Usuario no encontrado");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Credenciales incorrectas");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRATION || "1h",
    });

    return token;
  }

  static async register(username: string, password: string) {
    const existingUser = await User.findOne({ username });
    if (existingUser) throw new Error("El usuario ya existe");

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    return newUser;
  }
}
