import { SchemaDefinition, model } from 'mongoose';
import { mergeSchemas, baseFields } from '../../shared';
import { ICompany } from './company.interface';

const companyFields: SchemaDefinition = {
  companyName: { type: String, required: true },
  cacRegNo: { type: Number, required: true },
  numEmployees: { type: Number, default: 0 },
};

const CompanySchema = mergeSchemas(baseFields, companyFields);

export const Company = model<ICompany>('Company', CompanySchema);
