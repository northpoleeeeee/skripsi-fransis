// pages/api/upload.js
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '../../lib/db';
import { join } from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const form = new formidable.IncomingForm({
    uploadDir: join(process.cwd(), 'public', 'uploads'),
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing the file:', err);
      return res.status(500).json({ error: 'Error uploading file' });
    }

    try {
      const connection = await connectToDatabase();
      
      // Ensure file path is correctly defined
      const filePath = files.file[0]?.filepath?.replace('public', '') || '';
      console.log('File Path:', filePath); // Debug output
      await connection.execute(
        'INSERT INTO document (user_id, file_path) VALUES (?, ?)',
        [fields.user[0], filePath] // Ensure user ID is correctly passed
      );
      await connection.end();

      res.status(200).json({ message: 'File uploaded successfully!' });
    } catch (error) {
      console.error('Error saving file to database:', error);
      res.status(500).json({ error: 'Failed to save file' });
    }
  });
}
