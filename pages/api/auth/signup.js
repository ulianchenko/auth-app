import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

function handler(req, res) {
  const data = req.body;

  const { email, password } = data;

  if (!email || !email.includes('@') || !password || password.trim().length < 7) {
    res.status(422).json({message: 'Invalid input - password also be at least 7 characters long.'});
    return;
  }
  const client = await connectToDatabase();

  const db = client.db();

  const hashedPassword = hashPassword(password);

  const result = await db.collection('users').insertOne({
    email: email,
    password: hashedPassword
  });

  res.status(201).json({ message: 'Created client!' })
}

export default handler;