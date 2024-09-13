import equipmentModel from "../models/equipment.model";

export class EquipamentService {
  static async createItem(data: {
    name: string;
    location: string;
    status: string;
    type: string;
    dateAdquisition: Date;
  }) {
    const newItem = new equipmentModel(data);
    await newItem.save();
    return newItem;
  }

  static async getAllItems() {
    return await equipmentModel.find();
  }

  static async getItemById(itemId: string) {
    const item = await equipmentModel.findById(itemId);
    if (!item) throw new Error("Artículo no encontrado");
    return item;
  }

  static async updateItem(
    itemId: string,
    updates: Partial<typeof equipmentModel>
  ) {
    const item = await equipmentModel.findByIdAndUpdate(itemId, updates, {
      new: true,
    });
    if (!item) throw new Error("Artículo no encontrado");
    return item;
  }

  static async deleteItem(itemId: string) {
    const item = await equipmentModel.findByIdAndDelete(itemId);
    if (!item) throw new Error("Artículo no encontrado");
    return item;
  }
}
