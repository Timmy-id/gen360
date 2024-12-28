import mongoose, { Schema, model } from 'mongoose';
import { IHRInvite } from './invite.interface';

const HRInviteSchema: Schema = new Schema(
  {
    hrEmails: [
      {
        email: { type: String, required: true, unique: true },
        status: {
          type: String,
          enum: ['Pending', 'Accepted'],
          default: 'Pending',
        },
      },
    ],
    numOfHRs: { type: Number, required: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
  },
  { timestamps: true },
);

export const HRInvite = model<IHRInvite>('HRInvite', HRInviteSchema);
