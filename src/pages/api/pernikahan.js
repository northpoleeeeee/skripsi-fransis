// pages/api/pernikahan.js
import mysql from 'mysql2/promise';

// Konfigurasi koneksi ke database
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
};

// Handler untuk permintaan GET dan POST
export default async function handler(req, res) {
    const { method } = req;

    try {
        // Membuat koneksi ke database
        const connection = await mysql.createConnection(dbConfig);

        if (method === 'GET') {
            // Mengambil data dari tabel pernikahan
            const [rows] = await connection.execute('SELECT * FROM pernikahan');
            res.status(200).json(rows);

        } else if (method === 'POST') {
            // Menyimpan data ke tabel pernikahan
            const {
                namePria, birthPlacePria, birthDatePria, addressPria,
                pekerjaanPria, kewarganegaraanPria, phoneNumberPria,
                baptisPria, tempatBaptisPria, tanggalBaptisPria, pendetaBaptisPria,
                fatherNamePria, agamaAyahPria, motherNamePria, agamaIbuPria,
                nameWanita, birthPlaceWanita, birthDateWanita, addressWanita,
                pekerjaanWanita, kewarganegaraanWanita, phoneNumberWanita,
                baptisWanita, tempatBaptisWanita, tanggalBaptisWanita, pendetaBaptisWanita,
                fatherNameWanita, agamaAyahWanita, motherNameWanita, agamaIbuWanita,
                konselor, tanggalKonseling, tanggalPemberkatan, tempatPemberkatan, pendetaPemberkatan
            } = req.body;

            const [result] = await connection.execute(
                'INSERT INTO pernikahan (namePria, birthPlacePria, birthDatePria, addressPria, pekerjaanPria, kewarganegaraanPria, phoneNumberPria, baptisPria, tempatBaptisPria, tanggalBaptisPria, pendetaBaptisPria, fatherNamePria, agamaAyahPria, motherNamePria, agamaIbuPria, nameWanita, birthPlaceWanita, birthDateWanita, addressWanita, pekerjaanWanita, kewarganegaraanWanita, phoneNumberWanita, baptisWanita, tempatBaptisWanita, tanggalBaptisWanita, pendetaBaptisWanita, fatherNameWanita, agamaAyahWanita, motherNameWanita, agamaIbuWanita, konselor, tanggalKonseling, tanggalPemberkatan, tempatPemberkatan, pendetaPemberkatan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    namePria, birthPlacePria, birthDatePria, addressPria,
                    pekerjaanPria, kewarganegaraanPria, phoneNumberPria,
                    baptisPria, tempatBaptisPria, tanggalBaptisPria, pendetaBaptisPria,
                    fatherNamePria, agamaAyahPria, motherNamePria, agamaIbuPria,
                    nameWanita, birthPlaceWanita, birthDateWanita, addressWanita,
                    pekerjaanWanita, kewarganegaraanWanita, phoneNumberWanita,
                    baptisWanita, tempatBaptisWanita, tanggalBaptisWanita, pendetaBaptisWanita,
                    fatherNameWanita, agamaAyahWanita, motherNameWanita, agamaIbuWanita,
                    konselor, tanggalKonseling, tanggalPemberkatan, tempatPemberkatan, pendetaPemberkatan
                ]
            );

            res.status(200).json({ id: result.insertId });

        } else {
            // Menangani metode HTTP yang tidak diizinkan
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        // Menutup koneksi ke database
        if (connection) {
            await connection.end();
        }
    }
}
