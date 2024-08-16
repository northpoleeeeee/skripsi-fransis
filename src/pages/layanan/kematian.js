import { useState } from "react";
import { useRouter } from 'next/router';
import { FaHome } from 'react-icons/fa';
import './notification.module.css'; // Pastikan file CSS ini ada

export default function LayananKematian() {
  const [formData, setFormData] = useState({
    name: "",
    birthPlace: "",
    birthDate: "",
    gender: "",
    dayOfDeath: "",
    dateOfDeath: "",
    placeOfDeath: "",
    isAtHomeOrFuneralHome: "",
    funeralHomeAddress: "",
    ibadahTutupPeti: {
      day: "",
      date: "",
      time: ""
    },
    pemakaman: {
      day: "",
      date: "",
      time: ""
    },
    ibadahPenghiburan: {
      day: "",
      date: "",
      time: ""
    },
    reporter: {
      name: "",
      address: "",
      phoneNumber: ""
    }
  });

  const [notification, setNotification] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [key, subKey] = name.split('.');
    
    if (subKey) {
      setFormData(prevData => ({
        ...prevData,
        [key]: {
          ...prevData[key],
          [subKey]: value
        }
      }));
    } else {
      setFormData({ ...formData, [key]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    try {
      const response = await fetch('/api/kematian', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setNotification(true);
        // Clear the form
        setFormData({
          name: "",
          birthPlace: "",
          birthDate: "",
          gender: "",
          dayOfDeath: "",
          dateOfDeath: "",
          placeOfDeath: "",
          isAtHomeOrFuneralHome: "",
          funeralHomeAddress: "",
          ibadahTutupPeti: {
            day: "",
            date: "",
            time: ""
          },
          pemakaman: {
            day: "",
            date: "",
            time: ""
          },
          ibadahPenghiburan: {
            day: "",
            date: "",
            time: ""
          },
          reporter: {
            name: "",
            address: "",
            phoneNumber: ""
          }
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
    <div className="container mx-auto px-4 py-20" style={{ textAlign: 'justify' }}>
      <h1 className="text-4xl font-bold mb-6 text-center">Layanan Kematian</h1>

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
          <h2 className="text-2xl font-bold mb-4">Telah Meninggal Dunia</h2>
          <label htmlFor="name" className="block text-lg font-semibold mb-2">Nama Lengkap</label>
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
          <label htmlFor="gender" className="block text-lg font-semibold mb-2">Jenis Kelamin</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="laki-laki">Laki-laki</option>
            <option value="perempuan">Perempuan</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="dayOfDeath" className="block text-lg font-semibold mb-2">Pada Hari</label>
          <input
            type="text"
            id="dayOfDeath"
            name="dayOfDeath"
            value={formData.dayOfDeath}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dateOfDeath" className="block text-lg font-semibold mb-2">Tanggal</label>
          <input
            type="date"
            id="dateOfDeath"
            name="dateOfDeath"
            value={formData.dateOfDeath}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="placeOfDeath" className="block text-lg font-semibold mb-2">Tempat Meninggal</label>
          <input
            type="text"
            id="placeOfDeath"
            name="placeOfDeath"
            value={formData.placeOfDeath}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="isAtHomeOrFuneralHome" className="block text-lg font-semibold mb-2">Disemayamkan di</label>
          <select
            id="isAtHomeOrFuneralHome"
            name="isAtHomeOrFuneralHome"
            value={formData.isAtHomeOrFuneralHome}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          >
            <option value="">Pilih</option>
            <option value="home">Rumah</option>
            <option value="funeralHome">Rumah Duka</option>
          </select>
        </div>

        {formData.isAtHomeOrFuneralHome === "funeralHome" && (
          <div className="mb-4">
            <label htmlFor="funeralHomeAddress" className="block text-lg font-semibold mb-2">Alamat Rumah Duka</label>
            <input
              type="text"
              id="funeralHomeAddress"
              name="funeralHomeAddress"
              value={formData.funeralHomeAddress}
              onChange={handleInputChange}
              className="block w-full p-1 border border-gray-300 rounded"
            />
          </div>
        )}

        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-4">Menurut Rencana Akan Diadakan</h2>
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Ibadah Tutup Peti</h3>
            <label htmlFor="ibadahTutupPeti.day" className="block text-lg font-semibold mb-2">Hari</label>
            <input
              type="text"
              id="ibadahTutupPeti.day"
              name="ibadahTutupPeti.day"
              value={formData.ibadahTutupPeti.day}
              onChange={handleInputChange}
              className="block w-full p-1 border border-gray-300 rounded"
            />

            <label htmlFor="ibadahTutupPeti.date" className="block text-lg font-semibold mb-2">Tanggal</label>
            <input
              type="date"
              id="ibadahTutupPeti.date"
              name="ibadahTutupPeti.date"
              value={formData.ibadahTutupPeti.date}
              onChange={handleInputChange}
              className="block w-full p-1 border border-gray-300 rounded"
            />

            <label htmlFor="ibadahTutupPeti.time" className="block text-lg font-semibold mb-2">Jam</label>
            <input
              type="time"
              id="ibadahTutupPeti.time"
              name="ibadahTutupPeti.time"
              value={formData.ibadahTutupPeti.time}
              onChange={handleInputChange}
              className="block w-full p-1 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Pemakaman</h3>
            <label htmlFor="pemakaman.day" className="block text-lg font-semibold mb-2">Hari</label>
            <input
              type="text"
              id="pemakaman.day"
              name="pemakaman.day"
              value={formData.pemakaman.day}
              onChange={handleInputChange}
              className="block w-full p-1 border border-gray-300 rounded"
            />

            <label htmlFor="pemakaman.date" className="block text-lg font-semibold mb-2">Tanggal</label>
            <input
              type="date"
              id="pemakaman.date"
              name="pemakaman.date"
              value={formData.pemakaman.date}
              onChange={handleInputChange}
              className="block w-full p-1 border border-gray-300 rounded"
            />

            <label htmlFor="pemakaman.time" className="block text-lg font-semibold mb-2">Jam</label>
            <input
              type="time"
              id="pemakaman.time"
              name="pemakaman.time"
              value={formData.pemakaman.time}
              onChange={handleInputChange}
              className="block w-full p-1 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Ibadah Penghiburan</h3>
            <label htmlFor="ibadahPenghiburan.day" className="block text-lg font-semibold mb-2">Hari</label>
            <input
              type="text"
              id="ibadahPenghiburan.day"
              name="ibadahPenghiburan.day"
              value={formData.ibadahPenghiburan.day}
              onChange={handleInputChange}
              className="block w-full p-1 border border-gray-300 rounded"
            />

            <label htmlFor="ibadahPenghiburan.date" className="block text-lg font-semibold mb-2">Tanggal</label>
            <input
              type="date"
              id="ibadahPenghiburan.date"
              name="ibadahPenghiburan.date"
              value={formData.ibadahPenghiburan.date}
              onChange={handleInputChange}
              className="block w-full p-1 border border-gray-300 rounded"
            />

            <label htmlFor="ibadahPenghiburan.time" className="block text-lg font-semibold mb-2">Jam</label>
            <input
              type="time"
              id="ibadahPenghiburan.time"
              name="ibadahPenghiburan.time"
              value={formData.ibadahPenghiburan.time}
              onChange={handleInputChange}
              className="block w-full p-1 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Yang Melaporkan (Keluarga)</h3>
            <label htmlFor="reporter.name" className="block text-lg font-semibold mb-2">Nama</label>
            <input
              type="text"
              id="reporter.name"
              name="reporter.name"
              value={formData.reporter.name}
              onChange={handleInputChange}
              className="block w-full p-1 border border-gray-300 rounded"
              required
            />

            <label htmlFor="reporter.address" className="block text-lg font-semibold mb-2">Alamat</label>
            <input
              type="text"
              id="reporter.address"
              name="reporter.address"
              value={formData.reporter.address}
              onChange={handleInputChange}
              className="block w-full p-1 border border-gray-300 rounded"
              required
            />

            <label htmlFor="reporter.phoneNumber" className="block text-lg font-semibold mb-2">Telepon</label>
            <input
              type="text"
              id="reporter.phoneNumber"
              name="reporter.phoneNumber"
              value={formData.reporter.phoneNumber}
              onChange={handleInputChange}
              className="block w-full p-1 border border-gray-300 rounded"
              required
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="text-white rounded-lg font-semibold px-4 py-2"
            style={{ backgroundColor: '#3F83F8', borderRadius: '12px' }}
          >
            <strong>Simpan</strong>
          </button>
          <button
            type="button"
            onClick={navigateHome}
            className="mt-4 text-white rounded-lg font-semibold px-4 py-2 inline-flex items-center"
            style={{ backgroundColor: '#3F83F8', borderRadius: '12px' }}
          >
            <FaHome className="mr-2" />
            Home
          </button>
        </div>
      </form>
    </div>
  );
}
