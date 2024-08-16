import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Image from 'next/image'; // Untuk menampilkan gambar QRIS
import styles from './persembahan.module.css'; // Import CSS module untuk styling

export default function Persembahan() {
  const [showQris, setShowQris] = useState(false);
  const [keuanganData, setKeuanganData] = useState([]);
  const [selectedBulan, setSelectedBulan] = useState(''); // State untuk bulan yang dipilih

  // Fungsi untuk memformat angka menjadi format Rupiah
  const formatRupiah = (angka) => {
    if (!angka) return '';
    return `Rp ${Number(angka).toLocaleString('id-ID')}`;
  };

  // Fungsi untuk memformat tanggal menjadi format YYYY-MM-DD
  const formatTanggal = (tanggal) => {
    if (!tanggal) return '';
    return new Date(tanggal).toISOString().split('T')[0];
  };

  // Fungsi untuk handle klik tombol "Show QRIS"
  const handleShowQris = () => {
    setShowQris(!showQris);
  };

  // Fungsi untuk handle perubahan bulan
  const handleBulanChange = (e) => {
    setSelectedBulan(e.target.value);
  };

  // Fetch data keuangan dari API
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/keuangan'); // Pastikan endpoint ini sesuai dengan yang ada di API Anda
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setKeuanganData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  // Filter data berdasarkan bulan yang dipilih
  const filteredData = keuanganData.filter((item) => 
    selectedBulan ? item.bulan === selectedBulan : true
  );

  // Hitung total keseluruhan
  const totalKeseluruhan = filteredData.reduce((total, item) => total + (parseFloat(item.total) || 0), 0);

  return (
    <>
      <Header />
      <section className={styles.container}>
        <div className={styles.rekeningContainer}>
          <h2>No Account Dana</h2>
          <p> 085750089862 a.n. GSJA Mertiguna Sintang</p>
          <button onClick={handleShowQris} className={styles.qrisButton}>
            {showQris ? 'Hide QRIS' : 'Show QRIS'}
          </button>
          {showQris && (
            <div className={styles.qrisImage}>
              <Image
                src="/images/dana.jpeg" // Path ke gambar dana Frans
                alt="QRIS BCA"
                width={200}
                height={200}
              />
            </div>
          )}
        </div>

        <h2>Tabel Keuangan</h2>

        {/* Dropdown untuk memilih bulan */}
        <div className={styles.bulanFilter}>
          <label htmlFor="bulan">Pilih Bulan:</label>
          <select id="bulan" value={selectedBulan} onChange={handleBulanChange}>
            <option value="">Semua Bulan</option>
            {/* Daftar bulan bisa disesuaikan atau diambil dari data */}
            <option value="Januari">Januari</option>
            <option value="Februari">Februari</option>
            <option value="Maret">Maret</option>
            <option value="April">April</option>
            <option value="Mei">Mei</option>
            <option value="Juni">Juni</option>
            <option value="Juli">Juli</option>
            <option value="Agustus">Agustus</option>
            <option value="September">September</option>
            <option value="Oktober">Oktober</option>
            <option value="November">November</option>
            <option value="Desember">Desember</option>
          </select>
        </div>

        <table className={styles.keuanganTable}>
          <thead>
            <tr>
              <th>Bulan</th>
              <th>Tanggal</th>
              <th>Kategori</th>
              <th>Jumlah</th>
              <th>Ada Pengeluaran</th>
              <th>Jumlah Pengeluaran</th>
              <th>Keterangan Pengeluaran</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.bulan}</td>
                <td>{formatTanggal(item.tanggal)}</td>
                <td>{item.kategori}</td>
                <td>{formatRupiah(item.jumlah)}</td>
                <td>{item.ada_pengeluaran}</td>
                <td>{formatRupiah(item.jumlah_pengeluaran)}</td>
                <td>{item.keterangan_pengeluaran}</td>
                <td>{formatRupiah(item.total)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="7" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total Akhir:</td>
              <td style={{ fontWeight: 'bold' }}>{formatRupiah(totalKeseluruhan)}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <Footer />
    </>
  );
}
