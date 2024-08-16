import { connectToDatabase } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let connection;
    try {
      // Menghubungkan ke database
      connection = await connectToDatabase();
      
      // Menjalankan query untuk mendapatkan data pengguna
      const [rows] = await connection.query('SELECT id, name, email, image, role FROM users');
      
      // Mengembalikan data dalam format JSON
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data pengguna.' });
    } finally {
      // Pastikan koneksi ditutup
      if (connection) {
        await connection.end();
      }
    }
  } else {
    // Mengatur header untuk metode yang diizinkan
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
