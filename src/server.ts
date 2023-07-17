import mongoose from 'mongoose';
import { errorlogger, logger } from './shared/logger';
import config from './config';
import { Server } from 'http';
import app from './app';

let server: Server;

process.on('uncaughtException', err => {
  // eslint-disable-next-line no-console
  errorlogger.error(err);
  process.exit(1);
});

const connectDb = async () => {
  try {
    await mongoose.set('strictQuery', false);
    await mongoose.connect(
      config.db_url as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions,
    );
    logger.info('DB Connected');
    app.listen(config.port, () => {
      logger.info(`Server is running at http://localhost:${config.port}`);
    });
  } catch (error) {
    errorlogger.error('Error connecting to the database:', error);
  }

  process.on('unhandledRejection', err => {
    // eslint-disable-next-line no-console
    console.log(
      'Unhandeled rejection is detected, we are closing our server....',
    );
    if (server) {
      server.close(() => {
        errorlogger.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};

connectDb();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
