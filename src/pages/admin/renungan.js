import { useState } from 'react';
import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import styles from './renunganForm.module.css';

export default function AddRenungan() {
  const [category, setCategory] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { category, text, date };

    console.log('Data yang dikirim:', data);

    try {
      const response = await fetch('/api/renungan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log('Hasil respons:', result);

      if (!response.ok) {
        throw new Error(result.message || 'Gagal menambahkan renungan');
      }

      alert('Renungan berhasil ditambahkan');
      setCategory('');
      setText('');
      setDate('');
      setError(null);
    } catch (error) {
      console.error('Error saat mengirim data:', error);
      setError(error.message);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className={styles.container}>
        <AdminSidebar />
        <div className={styles.formContainer}>
          <h2>Tambah Renungan</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Kategori:</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Teks:</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Tanggal:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button type="submit" className={styles.submitButton}>Tambah Renungan</button>
            {error && <p className={styles.error}>{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
}
