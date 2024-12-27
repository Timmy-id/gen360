import { Document } from 'mongoose';
import { IBase } from '../../shared';

export interface IHr extends Document, IBase {
  firstName: string;
  lastName: string;
}
