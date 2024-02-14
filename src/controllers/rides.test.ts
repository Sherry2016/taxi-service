import request from 'supertest';
import { app } from '../app';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Rides } from '../models/rides';
import { rides } from '../tests/fixtures';

describe('Rides controller', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  beforeEach(async () => {
    await Rides.insertMany(rides);
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });
  it('should return all rides', async () => {
    const res = await request(app).get('/api/rides');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(rides.length);
  });

  it('should return all bids on a ride', async () => {
    const allRides = await request(app).get('/api/rides');
    const selectedRide = allRides.body[0];
    const res = await request(app).get(`/api/rides/${selectedRide._id}/bids`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(rides[0].bids.length);
  });

  it('should create a new ride', async () => {
    const newRideData = {
      clientId: 'client5',
      pickupLocation: 'Location A',
      dropoffLocation: 'Location B',
      proposedPrice: 100,
    };
    const res = await request(app).post('/api/rides').send(newRideData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  it('should create a bid on a ride', async () => {
    const allRides = await request(app).get('/api/rides');
    const selectedRide = allRides.body[3];
    const bidData = { fleetId: 'fleet2', bidAmount: 50 };
    const res = await request(app)
      .post(`/api/rides/${selectedRide._id}/bids`)
      .send(bidData);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({});
  });
});
