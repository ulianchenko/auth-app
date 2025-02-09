import { MongoClient } from 'mongodb';

export async function commectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://ulianchenko:a1b2c3d4e5@cluster0.nzybwy4.mongodb.net/dbAuthApp?retryWrites=true&w=majority'
  );

  return client;
}

