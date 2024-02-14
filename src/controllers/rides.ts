import { Rides } from '../models/rides';
import { Request, Response } from 'express';
import { asyncWrapper } from '../utils/asyncWrapper';
export const getAllRides = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const allRides = await Rides.find().select(
      '_id pickupLocation dropoffLocation proposedPrice createdAt',
    );
    res.status(200).json(allRides);
  },
);

export const getAllBidsOnRide = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const selectedRide = await Rides.findById(req.params.id, 'bids');
    if (selectedRide) {
      res.status(200).json(selectedRide.bids);
    } else {
      res.status(404).json({ error: 'The ride is not found' });
    }
  },
);

export const createRide = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const createdRide = await Rides.create({
      clientId: req.body.clientId,
      pickupLocation: req.body.pickupLocation,
      dropoffLocation: req.body.dropoffLocation,
      proposedPrice: req.body.proposedPrice,
    });
    res.status(201).json({
      _id: createdRide._id,
    });
  },
);

export const createBidOnRide = asyncWrapper(
  async (req: Request, res: Response): Promise<void> => {
    const updatedRideWithBid = await Rides.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          bids: { fleetId: req.body.fleetId, bidAmount: req.body.bidAmount },
        },
      },
      { new: true },
    );
    if (updatedRideWithBid?._id) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ error: 'The ride is not found to place the bid' });
    }
  },
);
