// pages/api/keuangan.js
import { connectToDatabase } from '../../lib/db';

export default async function handler(req, res) {
  const connection = await connectToDatabase();

  if (req.method === 'POST') {
    const {
      bulan,
      tanggal,
      kategori,
      keterangan,
      jumlah,
      adaPengeluaran,
      jumlahPengeluaran,
      keteranganPengeluaran,
      total,
    } = req.body;

    // Validasi data
    if (!bulan || !tanggal || !kategori || !jumlah || !adaPengeluaran || (adaPengeluaran === 'Ya' && jumlahPengeluaran === undefined)) {
      return res.status(400).json({ message: 'Data tidak lengkap' });
    }

    try {
      await connection.execute(
        `INSERT INTO keuangan (bulan, tanggal, kategori, keterangan, jumlah, ada_pengeluaran, jumlah_pengeluaran, keterangan_pengeluaran, total)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          bulan,
          tanggal,
          kategori,
          keterangan || null,
          jumlah,
          adaPengeluaran,
          jumlahPengeluaran || 0,
          keteranganPengeluaran || null,
          total,
        ]
      );
      return res.status(201).json({ message: 'Data keuangan berhasil ditambahkan' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  } else if (req.method === 'GET') {
    try {
      const [rows] = await connection.execute('SELECT * FROM keuangan');
      return res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
  } else {
    return res.status(405).json({ message: 'Metode tidak diizinkan' });
  }
}
