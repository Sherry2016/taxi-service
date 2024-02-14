import { connect, disconnect } from 'mongoose';
import { app } from './app';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 3000;
const DB_HOST =
  process.env.NODE_ENV === 'production' ? process.env.DB_HOST : 'localhost';

const DATABASE_URL = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;

connect(DATABASE_URL)
  .then(() => {
    const server = app.listen(port, () =>
      console.log(
        `Connected to MongoDB successfully. App running on port ${port}...`,
      ),
    );
    const gracefullyShutDown = () => {
      server.close(async (err: Error | undefined) => {
        err && console.error(err);
        try {
          await disconnect();
          process.exit(err ? 1 : 0);
        } catch (_) {
          process.exit(1);
        }
      });
    };

    process.on('unhandledRejection', (e) => {
      console.error('unhandledRejection', e);
      gracefullyShutDown();
    });
    process.on('uncaughtException', (e) => {
      console.error('uncaughtException', e);
      gracefullyShutDown();
    });

    process.once('SIGINT', () => gracefullyShutDown());
    process.once('SIGTERM', () => gracefullyShutDown());
  })
  .catch((err) => {
    console.log('Failed to connect to DB', err);
    process.exit(1);
  });
