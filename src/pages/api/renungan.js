// src/pages/api/renungan.js
import { connectToDatabase } from '../../lib/db';

export default async function handler(req, res) {
  const connection = await connectToDatabase();

  if (req.method === 'POST') {
    const { category, text, date } = req.body;

    if (!category || !text || !date) {
      return res.status(400).json({ message: 'Data tidak lengkap' });
    }

    try {
      await connection.execute(
        'INSERT INTO renungan (category, text, date) VALUES (?, ?, ?)',
        [category, text, date]
      );
      return res.status(201).json({ message: 'Renungan berhasil ditambahkan' });
    } catch (error) {
      console.error('Error saat menambahkan renungan:', error);
      return res.status(500).json({ message: 'Gagal menambahkan renungan' });
    }
  } else if (req.method === 'GET') {
    try {
      const [rows] = await connection.execute('SELECT * FROM renungan ORDER BY date DESC');
      return res.status(200).json(rows);
    } catch (error) {
      console.error('Error saat mengambil renungan:', error);
      return res.status(500).json({ message: 'Gagal mengambil renungan' });
    }
  } else {
    return res.status(405).json({ message: 'Metode tidak diizinkan' });
  }
}
