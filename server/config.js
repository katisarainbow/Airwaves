import dotenv from 'dotenv';
dotenv.config();

export const CONNECTION_URL =
  process.env.CONNECTION_URL || 'mongodb+srv://katsita123:123123kat@cluster0.s7gpy1o.mongodb.net/?retryWrites=true&w=majority';
export const PORT = process.env.PORT || 5000;