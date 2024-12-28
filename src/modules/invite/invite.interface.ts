import mongoose, { Document } from 'mongoose';

export interface IHRInvite extends Document {
  hrEmails: { email: string; status: 'Pending' | 'Accepted' }[];
  numOfHRs: number;
  sender: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
