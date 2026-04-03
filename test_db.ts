import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('No URI');

async function main() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;
  const users = await db?.collection('users').find({}).toArray();
  console.log('Users count:', users?.length);
  users?.forEach(u => {
    console.log(u._id, u.email, u.role);
  });
  await mongoose.disconnect();
}
main().catch(console.error);
