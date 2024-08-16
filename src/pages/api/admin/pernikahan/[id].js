import { connectToDatabase } from '@/lib/db'; // Adjust the import path based on your project structure

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query; // Get the ID from the query parameters

  if (method === 'DELETE') {
    try {
      const db = await connectToDatabase();
      const result = await db.query('DELETE FROM pernikahan WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Data not found' });
      }

      return res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
      console.error('Error deleting data:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
