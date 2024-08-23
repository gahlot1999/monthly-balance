import mongoose from 'mongoose';

export default async function dbConnection() {
  const DB_URI = process.env.DB_URI.replace(
    '<DB_NAME>',
    process.env.DB_NAME,
  ).replace('<DB_PASSWORD>', process.env.DB_PASSWORD);

  await mongoose.connect(DB_URI);
}
