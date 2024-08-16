import { getSession } from 'next-auth/react';
import mysql from 'mysql2/promise';
import path from 'path';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    const [rows] = await connection.execute(
      'SELECT file_path FROM document WHERE user_id = ?',
      [session.user.id]
    );

    // Log rows to check if data is correctly fetched
    console.log('Rows fetched from database:', rows);

    const fileData = rows.map(row => ({
      name: path.basename(row.file_path),
      path: `/uploads/${path.basename(row.file_path)}`,
    }));

    res.status(200).json(fileData);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await connection.end();
  }
}
