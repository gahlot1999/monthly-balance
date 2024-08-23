import 'dotenv/config';
import app from './app.js';
import mongoose from 'mongoose';
import dbConnection from './helpers/dbConnection.js';

const PORT = process.env.PORT;

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💣 Shutting down...');
  console.error(err.name, err.message);
  console.log('Server is shutting down...');
  process.exit(1);
});

dbConnection();

mongoose.connection.once('open', () => {
  console.log('-----Connected to MongoDB-----');
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💣 Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    console.log('Server is shutting down...');
    process.exit(1);
  });
});
