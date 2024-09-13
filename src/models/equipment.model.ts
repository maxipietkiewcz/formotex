import mongoose, { Schema, Document } from "mongoose";

export interface IEquipment extends Document {
  name: string;
  type: string;
  status: string;
  location: string;
  dateAdquisition: Date;
}

const equipmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  dateAdquisition: {
    type: Date,
    required: true,
  },
});

export default mongoose.model<IEquipment>("Equipment", equipmentSchema);
