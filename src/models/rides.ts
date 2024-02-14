import { Schema, model, Document } from 'mongoose';

interface IBid extends Document {
  fleetId: string;
  bidAmount: number;
}
export interface IRide extends Document {
  clientId: string;
  pickupLocation: string;
  dropoffLocation: string;
  proposedPrice: number;
  bids: IBid[];
  createdAt: Date;
}

const bidSchema = new Schema<IBid>({
  fleetId: {
    type: String,
    required: true,
  },
  bidAmount: {
    type: Number,
    required: true,
  },
});

const rideSchema = new Schema<IRide>({
  clientId: {
    type: String,
    required: true,
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  dropoffLocation: {
    type: String,
    required: true,
  },
  proposedPrice: {
    type: Number,
    required: true,
  },
  bids: [bidSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Rides = model<IRide>('rides', rideSchema);
