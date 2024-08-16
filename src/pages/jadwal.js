import { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Jadwal() {
  const [jadwals, setJadwals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJadwals() {
      try {
        const response = await fetch('/api/jadwal');
        if (!response.ok) {
          throw new Error('Gagal memuat data');
        }
        const data = await response.json();
        setJadwals(data.jadwals);
      } catch (error) {
        console.error('Error saat memuat data:', error);
        setError('Terjadi kesalahan saat memuat data');
      }
    }

    fetchJadwals();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-2xl font-bold mb-6">Jadwal Pelayanan</h1>
        {error && <p className="text-red-500">{error}</p>}
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Kategori</th>
              <th className="py-2 px-4 border-b">Waktu</th>
              <th className="py-2 px-4 border-b">Tempat</th>
              <th className="py-2 px-4 border-b">Tanggal</th>
              <th className="py-2 px-4 border-b">MC</th>
              <th className="py-2 px-4 border-b">Firman Tuhan</th>
              <th className="py-2 px-4 border-b">Pemain Musik</th>
              <th className="py-2 px-4 border-b">Singer</th>
              <th className="py-2 px-4 border-b">Pembawa Persembahan</th>
            </tr>
          </thead>
          <tbody>
            {jadwals.length > 0 ? (
              jadwals.map((jadwal) => (
                <tr key={jadwal.id}>
                  <td className="py-2 px-4 border-b">{jadwal.category}</td>
                  <td className="py-2 px-4 border-b">{jadwal.time}</td>
                  <td className="py-2 px-4 border-b">{jadwal.location}</td>
                  <td className="py-2 px-4 border-b">{jadwal.date}</td>
                  <td className="py-2 px-4 border-b">{jadwal.mc}</td>
                  <td className="py-2 px-4 border-b">{jadwal.sermon}</td>
                  <td className="py-2 px-4 border-b">{jadwal.music}</td>
                  <td className="py-2 px-4 border-b">{jadwal.singer}</td>
                  <td className="py-2 px-4 border-b">{jadwal.offering}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-2 px-4 border-b text-center">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}
