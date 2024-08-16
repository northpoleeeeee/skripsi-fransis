// pages/api/admin/another-route.js
import { requireAdmin } from '../../../middleware';
import { connectToDatabase } from '../../../lib/db';

async function anotherHandler(req, res) {
  if (req.method === 'GET') {
    try {
      const db = await connectToDatabase();
      // Example query - replace with your actual logic
      const [rows] = await db.query('SELECT * FROM another_table');
      res.status(200).json(rows);
    } catch (error) {
      res.status(500).json({ error: 'Database query failed' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default requireAdmin(anotherHandler);
