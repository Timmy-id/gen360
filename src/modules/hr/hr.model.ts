import { SchemaDefinition, model } from 'mongoose';
import { mergeSchemas, baseFields } from '../../shared';
import { IHr } from './hr.interface';

const hrFields: SchemaDefinition = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
};

const HrSchema = mergeSchemas(baseFields, hrFields);

export const Hr = model<IHr>('Hr', HrSchema);
