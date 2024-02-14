export const rides = [
  {
    clientId: 'client1',
    pickupLocation: '123 Main St',
    dropoffLocation: '456 Elm St',
    proposedPrice: 20,
    bids: [
      {
        fleetId: 'fleet1',
        bidAmount: 18,
      },
      {
        fleetId: 'fleet2',
        bidAmount: 22,
      },
    ],
  },
  {
    clientId: 'client2',
    pickupLocation: '789 Oak St',
    dropoffLocation: '101 Pine St',
    proposedPrice: 25,
    bids: [
      {
        fleetId: 'fleet1',
        bidAmount: 23,
      },
      {
        fleetId: 'fleet2',
        bidAmount: 26,
      },
      {
        fleetId: 'fleet4',
        bidAmount: 25,
      },
    ],
  },
  {
    clientId: 'client3',
    pickupLocation: '456 Elm St',
    dropoffLocation: '789 Oak St',
    proposedPrice: 18,
    bids: [],
  },
  {
    clientId: 'client4',
    pickupLocation: '101 Pine St',
    dropoffLocation: '123 Main St',
    proposedPrice: 30,
    bids: [],
  },
];
