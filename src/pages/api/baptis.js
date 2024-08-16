import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const connectionConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gsja-fransis'
  };

  if (req.method === 'POST') {
    // Handle POST request: Insert new data into the database
    const {
      name,
      birthPlace,
      birthDate,
      address,
      phoneNumber,
      baptizedChurch,
      baptizedChurchAddress,
      baptisMethod,
      fatherName,
      motherName,
      isNewMember,
      isBaptized
    } = req.body;

    try {
      const connection = await mysql.createConnection(connectionConfig);
      const [result] = await connection.execute(
        `INSERT INTO baptis (
          name, 
          birthPlace, 
          birthDate, 
          address, 
          phoneNumber, 
          baptizedChurch, 
          baptizedChurchAddress, 
          baptisMethod, 
          fatherName, 
          motherName, 
          isNewMember, 
          isBaptized
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          name,
          birthPlace,
          birthDate,
          address,
          phoneNumber,
          baptizedChurch || null,
          baptizedChurchAddress || null,
          baptisMethod || null,
          fatherName || null,
          motherName || null,
          isNewMember,
          isBaptized
        ]
      );

      await connection.end();
      res.status(200).json({ id: result.insertId });
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ message: 'Failed to save data' });
    }

  } else if (req.method === 'GET') {
    // Handle GET request: Fetch data from the database
    try {
      const connection = await mysql.createConnection(connectionConfig);
      const [rows] = await connection.execute('SELECT * FROM baptis');
      await connection.end();
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Failed to fetch data' });
    }

  } else {
    // Handle unsupported methods
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
