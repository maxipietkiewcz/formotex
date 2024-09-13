import User from "../models/user.model";
import * as bcrypt from "bcryptjs";

export class UserService {
  static async getAllUsers() {
    return await User.find();
  }

  static async getUserById(userId: string) {
    const user = await User.findById(userId);
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }

  static async updateUser(userId: string, userData: any) {
    const user = await User.findByIdAndUpdate(userId, userData);
    if (!user) throw new Error("Usuario no encontrado");

    const { password } = user.toObject();
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
    }

    return user;
  }

  static async deleteUser(userId: string) {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }
}
