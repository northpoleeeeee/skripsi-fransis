import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import { FaTrash } from 'react-icons/fa';
import styles from './User.module.css'; // Import CSS module

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('/api/users');
        if (Array.isArray(response.data)) {
          setUsers(response.data);
          setError(null);
        } else {
          console.error('Response data is not an array');
          setError('Data pengguna tidak valid.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Terjadi kesalahan saat mengambil data pengguna.');
      }
    }
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/users/${id}`);
        setUsers(users.filter(user => user.id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Terjadi kesalahan saat menghapus pengguna.');
      }
    }
  };

  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
      <div className={styles.contentArea}>
        <h1 className={styles.title}>Daftar Pengguna</h1>
        {error && <p>{error}</p>}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Image</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>
                    {user.image && <img src={user.image} alt={user.name} className={styles.userImage} />}
                  </td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleDelete(user.id)} className={styles.actionsButton}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
