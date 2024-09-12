import User from "../models/user.model";
import * as bcrypt from "bcryptjs";

interface UserUpdate {
  password?: string;
  // Otras propiedades que quieras incluir
}

export class UserService {
  static async getAllUsers() {
    return await User.find();
  }

  static async getUserById(userId: string) {
    const user = await User.findById(userId);
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }

  static async updateUser(userId: string, updates: Partial<typeof User>) {
    // Obtener el usuario existente
    const user = await User.findById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    if (updates.password) {
      const isSamePassword = await bcrypt.compare(
        updates.password,
        user.get("password")
      );
      if (!isSamePassword) {
        updates.password = await bcrypt.hash(updates.password, 10);
      }
    } else {
      // Mantener la contraseña existente si no se envía una nueva contraseña
      updates.password = user.get("password");
    }

    // Actualizar el usuario con los cambios (incluida la contraseña si fue actualizada)
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    return updatedUser;
  }

  static async deleteUser(userId: string) {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }
}
