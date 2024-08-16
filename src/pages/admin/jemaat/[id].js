// pages/api/jemaat/[id].js
import { connectToDatabase } from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const db = await connectToDatabase();
      await db.query('DELETE FROM jemaat WHERE id = ?', [id]);
      res.status(200).json({ message: 'Data berhasil dihapus.' });
    } catch (error) {
      console.error('Error deleting data:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat menghapus data.' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
