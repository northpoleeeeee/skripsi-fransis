import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,  // Ganti dengan password Anda
    database: process.env.DB_NAME,  // Ganti dengan nama database Anda
    port: process.env.DB_PORT,
  });

  try {
    if (req.method === 'POST') {
      const {
        name,
        birthPlace,
        birthDate,
        gender,
        dayOfDeath,
        dateOfDeath,
        placeOfDeath,
        isAtHomeOrFuneralHome,
        funeralHomeAddress,
        ibadahTutupPeti,
        pemakaman,
        ibadahPenghiburan,
        reporter
      } = req.body;

      const [result] = await connection.execute(`
        INSERT INTO kematian (
          name, birthPlace, birthDate, gender, dayOfDeath, dateOfDeath, placeOfDeath,
          isAtHomeOrFuneralHome, funeralHomeAddress,
          ibadahTutupPeti_day, ibadahTutupPeti_date, ibadahTutupPeti_time,
          pemakaman_day, pemakaman_date, pemakaman_time,
          ibadahPenghiburan_day, ibadahPenghiburan_date, ibadahPenghiburan_time,
          reporter_name, reporter_address, reporter_phoneNumber
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        name, birthPlace, birthDate, gender, dayOfDeath, dateOfDeath, placeOfDeath,
        isAtHomeOrFuneralHome, funeralHomeAddress,
        ibadahTutupPeti.day, ibadahTutupPeti.date, ibadahTutupPeti.time,
        pemakaman.day, pemakaman.date, pemakaman.time,
        ibadahPenghiburan.day, ibadahPenghiburan.date, ibadahPenghiburan.time,
        reporter.name, reporter.address, reporter.phoneNumber
      ]);

      res.status(200).json({ message: 'Data berhasil disimpan!', result });
    } else if (req.method === 'GET') {
      const [rows] = await connection.execute('SELECT * FROM kematian');
      res.status(200).json(rows);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Terjadi kesalahan.' });
  } finally {
    await connection.end();
  }
}
