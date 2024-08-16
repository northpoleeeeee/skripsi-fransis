import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      });

      const [rows] = await connection.execute('SELECT * FROM jemaat');
      res.status(200).json(rows);

      await connection.end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch jemaat data' });
    }
  } else if (req.method === 'POST') {
    const { name, birthPlace, birthDate, address, phoneNumber, originalChurch, isNewMember } = req.body;

    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      });

      const query = `INSERT INTO jemaat (name, birthPlace, birthDate, address, phoneNumber, originalChurch, isNewMember) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      await connection.execute(query, [name, birthPlace, birthDate, address, phoneNumber, originalChurch, isNewMember]);

      res.status(200).json({ message: 'Data berhasil disimpan!' });
      await connection.end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan data' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
