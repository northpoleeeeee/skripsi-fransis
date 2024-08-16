import { connectToDatabase } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const connection = await connectToDatabase();
      const [rows] = await connection.execute(
        'SELECT * FROM document WHERE user_id = ?',
        [req.query.userId] // Retrieve user ID from query parameters
      );
      await connection.end();

      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching files:', error);
      res.status(500).json({ error: 'Failed to fetch files' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
