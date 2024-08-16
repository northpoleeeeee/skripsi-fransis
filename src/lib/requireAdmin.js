// lib/requireAdmin.js
import { getSession } from 'next-auth/react';

export function requireAdmin(handler) {
  return async (req, res) => {
    try {
      const session = await getSession({ req });

      console.log('Session in requireAdmin:', session); // Logging for debugging
      
      if (!session || session.user.role !== 'admin') {
        // Log unauthorized access attempt for debugging
        console.warn(`Unauthorized access attempt. IP: ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
        return res.status(403).json({ message: 'Access denied' });
      }

      // Continue to the API route handler if authorized
      return handler(req, res);
    } catch (error) {
      // Handle and log any errors that occur
      console.error('Error in requireAdmin:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
}
