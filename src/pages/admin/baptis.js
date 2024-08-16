import { useState, useEffect } from 'react';
import styles from './dashboard.module.css'; // CSS untuk styling tabel
import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import { FaTrash, FaPrint } from 'react-icons/fa'; // Import ikon

const BaptisDashboard = () => {
  const [baptisData, setBaptisData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/baptis');
        if (response.ok) {
          const data = await response.json();
          setBaptisData(data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        const response = await fetch(`/api/baptis/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setBaptisData(baptisData.filter(item => item.id !== id));
        } else {
          console.error('Failed to delete data');
        }
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  const handlePrint = (item) => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h1>Data Baptis</h1>');
    
    printWindow.document.write(`<p>ID: ${item.id}</p>`);
    printWindow.document.write(`<p>Nama: ${item.name}</p>`);
    printWindow.document.write(`<p>Tempat Lahir: ${item.birthPlace}</p>`);
    printWindow.document.write(`<p>Tanggal Lahir: ${item.birthDate ? new Date(item.birthDate).toLocaleDateString('id-ID') : 'N/A'}</p>`);
    printWindow.document.write(`<p>Alamat: ${item.address}</p>`);
    printWindow.document.write(`<p>Nomor Telepon: ${item.phoneNumber}</p>`);
    printWindow.document.write(`<p>Gereja Tempat Baptis: ${item.baptizedChurch || 'N/A'}</p>`);
    printWindow.document.write(`<p>Alamat Gereja: ${item.baptizedChurchAddress || 'N/A'}</p>`);
    printWindow.document.write(`<p>Metode Baptis: ${item.baptisMethod || 'N/A'}</p>`);
    printWindow.document.write(`<p>Nama Ayah: ${item.fatherName || 'N/A'}</p>`);
    printWindow.document.write(`<p>Nama Ibu: ${item.motherName || 'N/A'}</p>`);
    printWindow.document.write(`<p>Anggota Baru: ${item.isNewMember ? 'Ya' : 'Tidak'}</p>`);
    printWindow.document.write(`<p>Sudah Dibaptis: ${item.isBaptized ? 'Ya' : 'Tidak'}</p>`);
    printWindow.document.write(`<p>Dibuat Pada: ${item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID') : 'N/A'}</p>`);
    
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <>
      <AdminNavbar />
      <div className={styles.container}>
        <AdminSidebar className={styles.sidebar} />
        <main className={styles.mainContent}>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">Tabel Baptis</h1>
          </div>

          <table className={`table-auto ${styles.tableAuto}`}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Tempat Lahir</th>
                <th>Tanggal Lahir</th>
                <th>Alamat</th>
                <th>Nomor Telepon</th>
                <th>Gereja Tempat Baptis</th>
                <th>Alamat Gereja</th>
                <th>Metode Baptis</th>
                <th>Nama Ayah</th>
                <th>Nama Ibu</th>
                <th>Anggota Baru</th>
                <th>Sudah Dibaptis</th>
                <th>Dibuat Pada</th>
                <th>Aksi</th> {/* Kolom aksi */}
              </tr>
            </thead>
            <tbody>
              {baptisData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.birthPlace}</td>
                  <td>{item.birthDate ? new Date(item.birthDate).toLocaleDateString('id-ID') : 'N/A'}</td>
                  <td>{item.address}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.baptizedChurch || 'N/A'}</td>
                  <td>{item.baptizedChurchAddress || 'N/A'}</td>
                  <td>{item.baptisMethod || 'N/A'}</td>
                  <td>{item.fatherName || 'N/A'}</td>
                  <td>{item.motherName || 'N/A'}</td>
                  <td>{item.isNewMember ? 'Ya' : 'Tidak'}</td>
                  <td>{item.isBaptized ? 'Ya' : 'Tidak'}</td>
                  <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID') : 'N/A'}</td>
                  <td className="flex space-x-4"> {/* Tambahkan aksi */}
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                    <button 
                      onClick={() => handlePrint(item)} 
                      className="text-blue-500"
                    >
                      <FaPrint />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
};

export default BaptisDashboard;
