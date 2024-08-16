import { useState } from "react";
import { useRouter } from 'next/router';
import { FaHome } from 'react-icons/fa';
import './notification.module.css'; // Tambahkan ini

export default function PendaftaranJemaatBaru() {
  const [isNewMember, setIsNewMember] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    birthPlace: "",
    birthDate: "",
    address: "",
    phoneNumber: "",
    originalChurch: "",
  });
  const [notification, setNotification] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    try {
      const response = await fetch('/api/jemaatBaru', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, isNewMember }),
      });

      if (response.ok) {
        setNotification(true);
        // Clear the form
        setFormData({
          name: "",
          birthPlace: "",
          birthDate: "",
          address: "",
          phoneNumber: "",
          originalChurch: "",
        });
        // Hide the notification after 3 seconds
        setTimeout(() => setNotification(false), 3000);
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Failed to save data', error);
    }
  };

  const closeNotification = () => {
    setNotification(false);
  };

  const navigateHome = () => {
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-20" style={{textAlign: 'justify'}}>
      <h1 className="text-4xl font-bold mb-6 text-center">Pendaftaran Jemaat Baru</h1>

      {notification && (
        <div className="notification">
          <p>Data berhasil disimpan!</p>
          <button
            onClick={closeNotification}
            className="mt-4 bg-blue-500 text-white rounded-full px-4 py-2"
          >
            Tutup
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-lg font-semibold mb-2">Nama Lengkap</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded" style={{margin:'10px'}}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="birthPlace" className="block text-lg font-semibold mb-2">Tempat Lahir</label>
          <input
            type="text"
            id="birthPlace"
            name="birthPlace"
            value={formData.birthPlace}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded" style={{margin:'10px'}}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="birthDate" className="block text-lg font-semibold mb-2">Tanggal Lahir</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded" style={{margin:'10px'}}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="address" className="block text-lg font-semibold mb-2">Alamat</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded" style={{margin:'10px'}}
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-lg font-semibold mb-2">No HP</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded" style={{margin:'10px'}}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Jenis Jemaat</label>
          <div className="flex items-center mb-2">
            <input style={{margin:'10px'}}
              type="radio"
              id="newMember"
              name="memberType"
              value="new"
              checked={isNewMember}
              onChange={() => setIsNewMember(true)}
              className="mr-2"
            />
            <label htmlFor="newMember" className="mr-4" style={{margin:'10px'}}>Jemaat Baru</label>
            <input
              type="radio"
              id="movedMember"
              name="memberType"
              value="moved"
              checked={!isNewMember}
              onChange={() => setIsNewMember(false)}
              className="mr-2"
            />
            <label htmlFor="movedMember" style={{margin:'10px'}}>Jemaat Pindahan</label>
          </div>
        </div>
        
        {!isNewMember && (
          <div className="mb-4" >
            <label htmlFor="originalChurch" className="block text-lg font-semibold mb-2" style={{margin:'10px'}}>Gereja Asal</label>
            <input
              type="text"
              id="originalChurch"
              name="originalChurch"
              value={formData.originalChurch}
              onChange={handleInputChange}
              className="block w-full p-1 border border-gray-300 rounded"
              placeholder="Nama Gereja Asal"
              required={!isNewMember}
            />
          </div>
        )}
        
        <div className="text-center">
          <button
            type="submit"
            className="text-white rounded-lg font-semibold px-1 py-2" style={{backgroundColor:'#3F83F8', borderRadius: '12px'}}
          >
            <strong>Simpan</strong>
          </button>
          <button
            type="button"
            onClick={navigateHome}
            className="mt-4 text-white rounded-lg font-semibold px-1 py-2 inline-flex items-center" style={{backgroundColor:'#3F83F8', borderRadius: '12px'}}
          >
            <FaHome className="mr-2" />
            Home
          </button>
        </div>
      </form>
    </div>
  );
}
