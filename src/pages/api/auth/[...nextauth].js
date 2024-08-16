import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDatabase } from '../../../lib/db'; // Sesuaikan dengan path Anda

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      try {
        const pool = await connectToDatabase();
        const [rows] = await pool.query('SELECT role FROM users WHERE email = ?', [session.user.email]);

        console.log('Session query result:', rows); // Logging for debugging
        session.user.role = rows[0]?.role || 'user'; // Default role if not found
        return session;
      } catch (error) {
        console.error('Error in session callback:', error);
        return session;
      }
    },
    async signIn({ user, account, profile, email, credentials }) {
      try {
        const pool = await connectToDatabase();
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [user.email]);

        if (rows.length === 0) {
          await pool.query('INSERT INTO users (email, name, image, role) VALUES (?, ?, ?, ?)', [
            user.email,
            user.name,
            user.image,
            'user',
          ]);
        }

        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
  },
  pages: {
    error: '/auth/error', // Tentukan halaman error kustom
  },
});
