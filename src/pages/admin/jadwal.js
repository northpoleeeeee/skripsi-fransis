import { useState } from 'react';
import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import styles from './jadwal.module.css'; // Import CSS module

const categories = [
  "Ibadah Umum",
  "Ibadah Sekolah Minggu",
  "Ibadah KKA",
  "Ibadah Doa dan Puasa",
  "Ibadah Youth",
  "Ibadah Natal",
  "Ibadah Paskah",
  "Lainnya",
];

export default function InputJadwal() {
  const [category, setCategory] = useState(categories[0]);
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [mc, setMc] = useState('');
  const [sermon, setSermon] = useState('');
  const [music, setMusic] = useState('');
  const [singer, setSinger] = useState('');
  const [offering, setOffering] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Data to be sent
    const data = {
      category,
      time,
      location,
      date,
      mc,
      sermon,
      music,
      singer,
      offering,
    };

    console.log('Data yang akan dikirim:', data); // Log for debugging

    try {
      const response = await fetch('/api/jadwal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json(); // Read the response body once

      console.log('Respons dari server:', result); // Log for debugging

      if (!response.ok) {
        throw new Error(result.message || 'Gagal menambahkan data');
      }

      alert('Data berhasil ditambahkan');

      // Reset form after successful submission
      setCategory(categories[0]);
      setTime('');
      setLocation('');
      setDate('');
      setMc('');
      setSermon('');
      setMusic('');
      setSinger('');
      setOffering('');
      setError(null); // Clear error if successful

    } catch (error) {
      console.error('Error saat mengirim data:', error); // Log for debugging
      setError(error.message); // Set error message from the server
    }
  };

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>Input Data Jadwal</h1>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input fields */}
            <div className={styles.formGroup}>
              <label htmlFor="category" className={styles.label}>Kategori Ibadah</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={styles.input}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="time" className={styles.label}>Waktu Ibadah</label>
              <input
                id="time"
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="location" className={styles.label}>Tempat Ibadah</label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="date" className={styles.label}>Hari/Tanggal</label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="mc" className={styles.label}>MC</label>
              <input
                id="mc"
                type="text"
                value={mc}
                onChange={(e) => setMc(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="sermon" className={styles.label}>Firman Tuhan</label>
              <input
                id="sermon"
                type="text"
                value={sermon}
                onChange={(e) => setSermon(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="music" className={styles.label}>Pemain Musik</label>
              <input
                id="music"
                type="text"
                value={music}
                onChange={(e) => setMusic(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="singer" className={styles.label}>Singer</label>
              <input
                id="singer"
                type="text"
                value={singer}
                onChange={(e) => setSinger(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="offering" className={styles.label}>Pembawa Persembahan</label>
              <input
                id="offering"
                type="text"
                value={offering}
                onChange={(e) => setOffering(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <button type="submit" className={styles.button}>Simpan</button>
          </form>
        </div>
      </div>
    </>
  );
}
