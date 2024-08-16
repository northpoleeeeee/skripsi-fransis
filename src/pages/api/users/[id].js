// pages/api/users/[id].js
import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;
  const db = await connectToDatabase();

  if (req.method === 'PUT') {
    const { email, name, image, role } = req.body;
    if (!email || !name || !role) {
      return res.status(400).json({ error: 'Email, name, and role are required' });
    }

    try {
      await db.query(
        'UPDATE users SET email = ?, name = ?, image = ?, role = ? WHERE id = ?',
        [email, name, image, role, id]
      );
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error updating user data:', error);
      res.status(500).json({ error: 'Error updating user data' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
