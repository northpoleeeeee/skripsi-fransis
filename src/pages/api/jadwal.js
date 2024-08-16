import { connectToDatabase } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const connection = await connectToDatabase();
      const [rows] = await connection.query('SELECT * FROM jadwal');
      res.status(200).json({ jadwals: rows });
    } catch (error) {
      res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data' });
    } finally {
      if (connection) connection.end(); // Tutup koneksi setelah selesai
    }
  } else if (req.method === 'POST') {
    const { category, time, location, date, mc, sermon, music, singer, offering } = req.body;
    try {
      const connection = await connectToDatabase();
      const [result] = await connection.query(
        'INSERT INTO jadwal (category, time, location, date, mc, sermon, music, singer, offering) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [category, time, location, date, mc, sermon, music, singer, offering]
      );
      res.status(201).json({ message: 'Data berhasil ditambahkan', data: result });
    } catch (error) {
      res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan data' });
    } finally {
      if (connection) connection.end(); // Tutup koneksi setelah selesai
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
