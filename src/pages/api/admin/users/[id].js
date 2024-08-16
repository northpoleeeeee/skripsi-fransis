import { connectToDatabase } from '@/lib/db'; // Adjust the import based on your project structure

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query; // Extract the user ID from the query parameters

  if (method === 'DELETE') {
    try {
      const db = await connectToDatabase();
      const result = await db.query('DELETE FROM users WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
