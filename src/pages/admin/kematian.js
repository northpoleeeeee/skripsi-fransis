import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import { useEffect, useState } from 'react';
import { FaTrash, FaPrint } from 'react-icons/fa';
import styles from './kematian.module.css'; // Import CSS module

export default function TabelKematian() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/kematian');
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        const response = await fetch(`/api/kematian/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setData(data.filter(item => item.id !== id));
        } else {
          console.error('Failed to delete data');
        }
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h1>Tabel Kematian</h1>');
    printWindow.document.write('<table border="1" style="width: 100%; border-collapse: collapse;">');
    printWindow.document.write('<thead><tr>');
    printWindow.document.write('<th>Nama</th>');
    printWindow.document.write('<th>Tempat Lahir</th>');
    printWindow.document.write('<th>Tanggal Lahir</th>');
    printWindow.document.write('<th>Jenis Kelamin</th>');
    printWindow.document.write('<th>Hari Meninggal</th>');
    printWindow.document.write('<th>Tanggal Meninggal</th>');
    printWindow.document.write('<th>Tempat Meninggal</th>');
    printWindow.document.write('<th>Ditempatkan</th>');
    printWindow.document.write('<th>Alamat Rumah Duka</th>');
    printWindow.document.write('<th>Ibadah Tutup Peti</th>');
    printWindow.document.write('<th>Pemakaman</th>');
    printWindow.document.write('<th>Ibadah Penghiburan</th>');
    printWindow.document.write('<th>Pelapor</th>');
    printWindow.document.write('</tr></thead>');
    printWindow.document.write('<tbody>');

    data.forEach(item => {
      printWindow.document.write('<tr>');
      printWindow.document.write(`<td>${item.name}</td>`);
      printWindow.document.write(`<td>${item.birthPlace}</td>`);
      printWindow.document.write(`<td>${new Date(item.birthDate).toLocaleDateString()}</td>`);
      printWindow.document.write(`<td>${item.gender}</td>`);
      printWindow.document.write(`<td>${item.dayOfDeath}</td>`);
      printWindow.document.write(`<td>${new Date(item.dateOfDeath).toLocaleDateString()}</td>`);
      printWindow.document.write(`<td>${item.placeOfDeath}</td>`);
      printWindow.document.write(`<td>${item.isAtHomeOrFuneralHome === 'home' ? 'Rumah' : 'Rumah Duka'}</td>`);
      printWindow.document.write(`<td>${item.funeralHomeAddress}</td>`);
      printWindow.document.write(`<td>${item.ibadahTutupPeti_day}, ${new Date(item.ibadahTutupPeti_date).toLocaleDateString()}, ${item.ibadahTutupPeti_time}</td>`);
      printWindow.document.write(`<td>${item.pemakaman_day}, ${new Date(item.pemakaman_date).toLocaleDateString()}, ${item.pemakaman_time}</td>`);
      printWindow.document.write(`<td>${item.ibadahPenghiburan_day}, ${new Date(item.ibadahPenghiburan_date).toLocaleDateString()}, ${item.ibadahPenghiburan_time}</td>`);
      printWindow.document.write(`<td>${item.reporter_name}, ${item.reporter_address}, ${item.reporter_phoneNumber}</td>`);
      printWindow.document.write('</tr>');
    });

    printWindow.document.write('</tbody></table>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <div className={styles.container}>
        <h1 className="text-3xl font-bold mb-6">Tabel Kematian</h1>
        <table className={`${styles.table} min-w-full bg-white rounded-lg shadow-md`}>
          <thead>
            <tr>
              <th className={`${styles.th} py-2 px-4`}>Nama</th>
              <th className={`${styles.th} py-2 px-4`}>Tempat Lahir</th>
              <th className={`${styles.th} py-2 px-4`}>Tanggal Lahir</th>
              <th className={`${styles.th} py-2 px-4`}>Jenis Kelamin</th>
              <th className={`${styles.th} py-2 px-4`}>Hari Meninggal</th>
              <th className={`${styles.th} py-2 px-4`}>Tanggal Meninggal</th>
              <th className={`${styles.th} py-2 px-4`}>Tempat Meninggal</th>
              <th className={`${styles.th} py-2 px-4`}>Ditempatkan</th>
              <th className={`${styles.th} py-2 px-4`}>Alamat Rumah Duka</th>
              <th className={`${styles.th} py-2 px-4`}>Ibadah Tutup Peti</th>
              <th className={`${styles.th} py-2 px-4`}>Pemakaman</th>
              <th className={`${styles.th} py-2 px-4`}>Ibadah Penghiburan</th>
              <th className={`${styles.th} py-2 px-4`}>Pelapor</th>
              <th className={`${styles.th} py-2 px-4`}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className={`${styles.td} py-2 px-4`}>{item.name}</td>
                <td className={`${styles.td} py-2 px-4`}>{item.birthPlace}</td>
                <td className={`${styles.td} py-2 px-4`}>{new Date(item.birthDate).toLocaleDateString()}</td>
                <td className={`${styles.td} py-2 px-4`}>{item.gender}</td>
                <td className={`${styles.td} py-2 px-4`}>{item.dayOfDeath}</td>
                <td className={`${styles.td} py-2 px-4`}>{new Date(item.dateOfDeath).toLocaleDateString()}</td>
                <td className={`${styles.td} py-2 px-4`}>{item.placeOfDeath}</td>
                <td className={`${styles.td} py-2 px-4`}>{item.isAtHomeOrFuneralHome === 'home' ? 'Rumah' : 'Rumah Duka'}</td>
                <td className={`${styles.td} py-2 px-4`}>{item.funeralHomeAddress}</td>
                <td className={`${styles.td} py-2 px-4`}>
                  {item.ibadahTutupPeti_day}, {new Date(item.ibadahTutupPeti_date).toLocaleDateString()}, {item.ibadahTutupPeti_time}
                </td>
                <td className={`${styles.td} py-2 px-4`}>
                  {item.pemakaman_day}, {new Date(item.pemakaman_date).toLocaleDateString()}, {item.pemakaman_time}
                </td>
                <td className={`${styles.td} py-2 px-4`}>
                  {item.ibadahPenghiburan_day}, {new Date(item.ibadahPenghiburan_date).toLocaleDateString()}, {item.ibadahPenghiburan_time}
                </td>
                <td className={`${styles.td} py-2 px-4`}>
                  {item.reporter_name}, {item.reporter_address}, {item.reporter_phoneNumber}
                </td>
                <td className={`${styles.td} py-2 px-4`}>
                  <div className={styles['action-buttons']}>
                    <button onClick={() => handleDelete(item.id)} className={styles['action-button']}>
                      <FaTrash />
                    </button>
                    <button onClick={handlePrint} className={styles['action-button']}>
                      <FaPrint />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
