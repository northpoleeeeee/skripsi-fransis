import { useState, useEffect } from 'react';
import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import { FaPrint, FaTrash } from 'react-icons/fa';

export default function JemaatPage() {
  const [jemaatData, setJemaatData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Jumlah item per halaman

  useEffect(() => {
    const fetchJemaatData = async () => {
      try {
        const response = await fetch('/api/jemaat');
        const data = await response.json();
        setJemaatData(data);
      } catch (error) {
        console.error('Failed to fetch jemaat data:', error);
      }
    };

    fetchJemaatData();
  }, []);

  // Menghitung indeks data untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jemaatData.slice(indexOfFirstItem, indexOfLastItem);

  // Menghitung jumlah halaman
  const totalPages = Math.ceil(jemaatData.length / itemsPerPage);

  // Fungsi cetak
  const handlePrint = (jemaatId) => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h1>Data Jemaat</h1>');

    const jemaat = jemaatData.find(jemaat => jemaat.id === jemaatId);
    
    if (jemaat) {
      printWindow.document.write(`<p>Nama: ${jemaat.name}</p>`);
      printWindow.document.write(`<p>Tempat Lahir: ${jemaat.birthPlace}</p>`);
      printWindow.document.write(`<p>Tanggal Lahir: ${jemaat.birthDate ? new Date(jemaat.birthDate).toLocaleDateString('id-ID') : 'N/A'}</p>`);
      printWindow.document.write(`<p>Alamat: ${jemaat.address}</p>`);
      printWindow.document.write(`<p>No HP: ${jemaat.phoneNumber}</p>`);
    } else {
      printWindow.document.write('<p>Data tidak ditemukan.</p>');
    }

    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  // Fungsi hapus
  const handleDelete = async (jemaatId) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        const response = await fetch(`/api/jemaat/${jemaatId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Hapus item dari state
          setJemaatData(prevData => prevData.filter(jemaat => jemaat.id !== jemaatId));
          alert('Data berhasil dihapus.');
        } else {
          console.error('Gagal menghapus data:', await response.text());
          alert('Gagal menghapus data.');
        }
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
        alert('Terjadi kesalahan saat menghapus data.');
      }
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="flex h-screen">
        <AdminSidebar />
        <div className="main-content flex-1 overflow-y-auto p-6">
          <h1 className="text-4xl font-bold mb-6">Data Jemaat</h1>
          <div className="table-container">
            <table className="table min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tempat Lahir</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Lahir</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No HP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((jemaat) => (
                  <tr key={jemaat.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{jemaat.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{jemaat.birthPlace}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{jemaat.birthDate ? new Date(jemaat.birthDate).toLocaleDateString('id-ID') : 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{jemaat.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{jemaat.phoneNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                      <button onClick={() => handlePrint(jemaat.id)} className="text-blue-500 hover:text-blue-700">
                        <FaPrint />
                      </button>
                      <button onClick={() => handleDelete(jemaat.id)} className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="pagination mt-4 flex justify-between items-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="text-gray-500 hover:text-gray-700"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="text-gray-500 hover:text-gray-700"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
