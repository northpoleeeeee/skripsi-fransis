import React, { useState, useEffect } from 'react';
import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import styles from './Addkeuangan.module.css';

export default function AddKeuangan() {
  const [bulan, setBulan] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [kategori, setKategori] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [adaPengeluaran, setAdaPengeluaran] = useState('Tidak');
  const [jumlahPengeluaran, setJumlahPengeluaran] = useState('');
  const [keteranganPengeluaran, setKeteranganPengeluaran] = useState('');
  const [total, setTotal] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hitung total jika jumlah dan jumlahPengeluaran tersedia
    if (jumlah && !isNaN(jumlah)) {
      const totalAmount = adaPengeluaran === 'Ya'
        ? jumlah - (jumlahPengeluaran || 0)
        : jumlah;
      setTotal(totalAmount);
    } else {
      setTotal('');
    }
  }, [jumlah, jumlahPengeluaran, adaPengeluaran]);

  // Fungsi untuk memformat angka menjadi format ribuan Rupiah
  const formatRupiah = (angka) => {
    if (!angka) return '';
    return `Rp ${Number(angka).toLocaleString('id-ID')}`;
  };

  // Fungsi untuk mengubah format input menjadi angka
  const unformatRupiah = (input) => {
    return Number(input.replace(/[^0-9]/g, ''));
  };

  const handleJumlahChange = (e) => {
    const value = unformatRupiah(e.target.value);
    setJumlah(value || '0');
  };

  const handleJumlahPengeluaranChange = (e) => {
    const value = unformatRupiah(e.target.value);
    setJumlahPengeluaran(value || '0');
  };

  const validateData = () => {
    return bulan && tanggal && kategori && jumlah && adaPengeluaran && (adaPengeluaran !== 'Ya' || jumlahPengeluaran !== undefined);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateData()) {
      setError('Data tidak lengkap');
      return;
    }

    const data = { bulan, tanggal, kategori, keterangan, jumlah, adaPengeluaran, jumlahPengeluaran, keteranganPengeluaran, total };

    try {
      const response = await fetch('/api/keuangan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Gagal menambahkan data keuangan');
      }

      alert('Data keuangan berhasil ditambahkan');
      setBulan('');
      setTanggal('');
      setKategori('');
      setKeterangan('');
      setJumlah('');
      setAdaPengeluaran('Tidak');
      setJumlahPengeluaran('');
      setKeteranganPengeluaran('');
      setTotal('');
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className={styles.pageContainer}>
        <AdminSidebar className={styles.sidebar} />
        <div className={styles.content}>
          <section className={styles.container}>
            <h1 className={styles.heading}>Tambah Data Keuangan</h1>

            <div className={styles.formGroup}>
              <label>Bulan:</label>
              <select
                value={bulan}
                onChange={(e) => setBulan(e.target.value)}
                required
              >
                <option value="">Pilih Bulan</option>
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

            {bulan && (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label>Tanggal:</label>
                  <input
                    type="date"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Kategori:</label>
                  <select
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="Ibadah Umum">Ibadah Umum</option>
                    <option value="Ibadah KKA">Ibadah KKA</option>
                    <option value="Ibadah Youth">Ibadah Youth</option>
                    <option value="Ibadah Sekolah Minggu">Ibadah Sekolah Minggu</option>
                    <option value="Ibadah Natal">Ibadah Natal</option>
                    <option value="Ibadah Paskah">Ibadah Paskah</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                {kategori === 'Lainnya' && (
                  <div className={styles.formGroup}>
                    <label>Keterangan:</label>
                    <input
                      type="text"
                      value={keterangan}
                      onChange={(e) => setKeterangan(e.target.value)}
                      placeholder="Keterangan tambahan"
                    />
                  </div>
                )}

                <div className={styles.formGroup}>
                  <label>Jumlah:</label>
                  <input
                    type="text"
                    value={formatRupiah(jumlah)}
                    onChange={handleJumlahChange}
                    placeholder="Jumlah dalam Rupiah"
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Apakah ada pengeluaran?</label>
                  <select
                    value={adaPengeluaran}
                    onChange={(e) => setAdaPengeluaran(e.target.value)}
                  >
                    <option value="Tidak">Tidak</option>
                    <option value="Ya">Ya</option>
                  </select>
                </div>

                {adaPengeluaran === 'Ya' && (
                  <>
                    <div className={styles.formGroup}>
                      <label>Jumlah Pengeluaran:</label>
                      <input
                        type="text"
                        value={formatRupiah(jumlahPengeluaran)}
                        onChange={handleJumlahPengeluaranChange}
                        placeholder="Jumlah Pengeluaran"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label>Keterangan Pengeluaran:</label>
                      <textarea
                        value={keteranganPengeluaran}
                        onChange={(e) => setKeteranganPengeluaran(e.target.value)}
                        placeholder="Keterangan Pengeluaran"
                      />
                    </div>
                  </>
                )}

                <div className={styles.formGroup}>
                  <label>Total:</label>
                  <input
                    type="text"
                    value={formatRupiah(total)}
                    readOnly
                    placeholder="Total"
                  />
                </div>

                <button type="submit" className={styles.submitButton}>Simpan</button>
                {error && <p className={styles.error}>{error}</p>}
              </form>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
