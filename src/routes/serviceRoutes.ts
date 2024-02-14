import express from 'express';
import {
  getAllRides,
  createRide,
  getAllBidsOnRide,
  createBidOnRide,
} from '../controllers/rides';
import { validateSchema } from '../middleware/validator';
import Joi from 'joi';

const rideSchema = Joi.object({
  clientId: Joi.string().required(),
  pickupLocation: Joi.string().required(),
  dropoffLocation: Joi.string().required(),
  proposedPrice: Joi.number().required(),
});

const bidSchema = Joi.object({
  fleetId: Joi.string().required(),
  bidAmount: Joi.number().required(),
});
const serviceRoutes = express.Router();

serviceRoutes
  .route('/rides')
  .get(getAllRides)
  .post(validateSchema(rideSchema), createRide);
serviceRoutes
  .route('/rides/:id/bids')
  .get(getAllBidsOnRide)
  .post(validateSchema(bidSchema), createBidOnRide);

export { serviceRoutes };
