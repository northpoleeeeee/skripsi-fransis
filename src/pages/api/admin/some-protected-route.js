// pages/api/admin/some-protected-route.js
import { requireAdmin } from '../../../lib/requireAdmin';

const handler = async (req, res) => {
  // Logika handler untuk rute API yang dilindungi
  res.status(200).json({ message: 'You are an admin!' });
};

export default requireAdmin(handler);
