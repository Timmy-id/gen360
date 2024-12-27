import { Schema, SchemaDefinition } from 'mongoose';

export const mergeSchemas = (
  base: SchemaDefinition,
  extension: SchemaDefinition,
): Schema => {
  return new Schema({ ...base, ...extension });
};

export const baseFields: SchemaDefinition = {
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};
