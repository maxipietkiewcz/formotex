import User from "../models/user.model";

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
    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }

  static async deleteUser(userId: string) {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }
}
