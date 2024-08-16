import { useState } from "react";
import { useRouter } from 'next/router';
import { FaHome } from 'react-icons/fa';
import './notification.module.css'; // Pastikan file CSS ini ada

export default function PendaftaranBaptis() {
  const [isNewMember, setIsNewMember] = useState(true);
  const [isBaptized, setIsBaptized] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    birthPlace: "",
    birthDate: "",
    address: "",
    phoneNumber: "",
    baptizedChurch: "",
    baptizedChurchAddress: "",
    baptisMethod: "",
    fatherName: "",
    motherName: "",
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
      const response = await fetch('/api/baptis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...formData, 
          isNewMember: isNewMember ? 1 : 0, // Convert boolean to tinyint (1/0)
          isBaptized: isBaptized ? 1 : 0  // Convert boolean to tinyint (1/0)
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Data berhasil disimpan dengan ID:', data.id);
        setNotification(true);
        // Clear the form
        setFormData({
          name: "",
          birthPlace: "",
          birthDate: "",
          address: "",
          phoneNumber: "",
          baptizedChurch: "",
          baptizedChurchAddress: "",
          baptisMethod: "",
          fatherName: "",
          motherName: "",
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
    <div className="container mx-auto px-4 py-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-center">Pendaftaran Baptis</h1>
        <button
          onClick={navigateHome}
          className="text-blue-500"
          aria-label="Home"
        >
          <FaHome size={24} />
        </button>
      </div>

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
          <label htmlFor="name" className="block text-lg font-semibold mb-2">Nama Lengkap (Sesuai KTP/Akta Lahir)</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
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
            className="block w-full p-1 border border-gray-300 rounded"
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
            className="block w-full p-1 border border-gray-300 rounded"
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
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-lg font-semibold mb-2">Nomor Telepon</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Jenis Baptis</label>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="newMember"
              name="memberType"
              value="new"
              checked={isNewMember}
              onChange={() => setIsNewMember(true)}
              className="mr-2"
              required
            />
            <label htmlFor="newMember" className="mr-4">Baptis Dewasa</label>
            <input
              type="radio"
              id="movedMember"
              name="memberType"
              value="moved"
              checked={!isNewMember}
              onChange={() => setIsNewMember(false)}
              className="mr-2"
              required
            />
            <label htmlFor="movedMember">Baptis Anak</label>
          </div>
        </div>

        {!isNewMember && (
          <>
            <div className="mb-4">
              <label htmlFor="fatherName" className="block text-lg font-semibold mb-2">Nama Ayah (Sesuai KTP)</label>
              <input
                type="text"
                id="fatherName"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                className="block w-full p-1 border border-gray-300 rounded"
                placeholder="Nama Ayah"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="motherName" className="block text-lg font-semibold mb-2">Nama Ibu (Sesuai KTP)</label>
              <input
                type="text"
                id="motherName"
                name="motherName"
                value={formData.motherName}
                onChange={handleInputChange}
                className="block w-full p-1 border border-gray-300 rounded"
                placeholder="Nama Ibu"
                required
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">Sudah Pernah Dibaptis?</label>
          <div className="flex items-center mb-2">
            <input
              type="radio"
              id="baptizedYes"
              name="baptized"
              value="yes"
              checked={isBaptized}
              onChange={() => setIsBaptized(true)}
              className="mr-2"
              required
            />
            <label htmlFor="baptizedYes" className="mr-4">Ya</label>
            <input
              type="radio"
              id="baptizedNo"
              name="baptized"
              value="no"
              checked={!isBaptized}
              onChange={() => setIsBaptized(false)}
              className="mr-2"
              required
            />
            <label htmlFor="baptizedNo">Belum</label>
          </div>
        </div>

        {isBaptized && (
          <>
            <div className="mb-4">
              <label htmlFor="baptizedChurch" className="block text-lg font-semibold mb-2">Gereja Tempat Dibaptis</label>
              <input
                type="text"
                id="baptizedChurch"
                name="baptizedChurch"
                value={formData.baptizedChurch}
                onChange={handleInputChange}
                className="block w-full p-1 border border-gray-300 rounded"
                placeholder="Nama Gereja Tempat Dibaptis"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="baptizedChurchAddress" className="block text-lg font-semibold mb-2">Alamat Gereja</label>
              <input
                type="text"
                id="baptizedChurchAddress"
                name="baptizedChurchAddress"
                value={formData.baptizedChurchAddress}
                onChange={handleInputChange}
                className="block w-full p-1 border border-gray-300 rounded"
                placeholder="Alamat Gereja"
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">Cara Baptisan</label>
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  id="sprinkle"
                  name="baptisMethod"
                  value="sprinkle"
                  checked={formData.baptisMethod === 'sprinkle'}
                  onChange={handleInputChange}
                  className="mr-2"
                  required
                />
                <label htmlFor="sprinkle" className="mr-4">Percik</label>
                <input
                  type="radio"
                  id="dunk"
                  name="baptisMethod"
                  value="dunk"
                  checked={formData.baptisMethod === 'dunk'}
                  onChange={handleInputChange}
                  className="mr-2"
                  required
                />
                <label htmlFor="dunk">Selam</label>
              </div>
            </div>
          </>
        )}

        <div className="text-center">
          <button
            type="submit"
            className="text-white rounded-lg font-semibold px-1 py-2" style={{ backgroundColor: '#3F83F8', borderRadius: '12px' }}
          >
            <strong>Simpan</strong>
          </button>
        </div>
      </form>
    </div>
  );
}
