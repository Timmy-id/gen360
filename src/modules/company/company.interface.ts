import { Document } from 'mongoose';
import { IBase } from '../../shared';

export interface ICompany extends Document, IBase {
  companyName: string;
  cacRegNo: number;
  numEmployees: number;
}
