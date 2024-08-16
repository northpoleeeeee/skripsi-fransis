import { useState } from "react";
import { useRouter } from 'next/router';
import { FaHome } from 'react-icons/fa';
import './notification.module.css'; // Pastikan file CSS ini ada

export default function PendaftaranNikah() {
  const [formData, setFormData] = useState({
    namePria: "",
    birthPlacePria: "",
    birthDatePria: "",
    addressPria: "",
    pekerjaanPria: "",
    kewarganegaraanPria: "",
    phoneNumberPria: "",
    baptisPria: "Belum",
    tempatBaptisPria: "",
    tanggalBaptisPria: "",
    pendetaBaptisPria: "",
    fatherNamePria: "",
    agamaAyahPria: "",
    motherNamePria: "",
    agamaIbuPria: "",
    nameWanita: "",
    birthPlaceWanita: "",
    birthDateWanita: "",
    addressWanita: "",
    pekerjaanWanita: "",
    kewarganegaraanWanita: "",
    phoneNumberWanita: "",
    baptisWanita: "Belum",
    tempatBaptisWanita: "",
    tanggalBaptisWanita: "",
    pendetaBaptisWanita: "",
    fatherNameWanita: "",
    agamaAyahWanita: "",
    motherNameWanita: "",
    agamaIbuWanita: "",
    konselor: "",
    tanggalKonseling: "",
    tanggalPemberkatan: "",
    tempatPemberkatan: "",
    pendetaPemberkatan: "",
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
      const response = await fetch('/api/pernikahan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Data berhasil disimpan dengan ID:', data.id);
        setNotification(true);
        setTimeout(() => setNotification(false), 3000);
      } else {
        console.error('Failed to save data', response.statusText);
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
        <h1 className="text-4xl font-bold text-center">Formulir Pendaftaran Pernikahan</h1>
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

      <form onSubmit={handleSubmit} className="bg-blue-100 p-6 shadow-md rounded-lg">
        {/* Bagian Calon Mempelai Pria */}
        <h2 className="text-2xl font-bold mb-4">1. Calon Mempelai Pria</h2>
        <div className="mb-4">
          <label htmlFor="namePria" className="block text-lg font-semibold mb-2">a. Nama Lengkap</label>
          <input
            type="text"
            id="namePria"
            name="namePria"
            value={formData.namePria}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="birthPlacePria" className="block text-lg font-semibold mb-2">b. Tempat dan Tanggal Lahir</label>
          <input
            type="text"
            id="birthPlacePria"
            name="birthPlacePria"
            value={formData.birthPlacePria}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
          <input
            type="date"
            id="birthDatePria"
            name="birthDatePria"
            value={formData.birthDatePria}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="addressPria" className="block text-lg font-semibold mb-2">c. Alamat Lengkap</label>
          <input
            type="text"
            id="addressPria"
            name="addressPria"
            value={formData.addressPria}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pekerjaanPria" className="block text-lg font-semibold mb-2">d. Pekerjaan</label>
          <input
            type="text"
            id="pekerjaanPria"
            name="pekerjaanPria"
            value={formData.pekerjaanPria}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="kewarganegaraanPria" className="block text-lg font-semibold mb-2">e. Kewarganegaraan</label>
          <input
            type="text"
            id="kewarganegaraanPria"
            name="kewarganegaraanPria"
            value={formData.kewarganegaraanPria}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumberPria" className="block text-lg font-semibold mb-2">f. No. Telepon / HP</label>
          <input
            type="text"
            id="phoneNumberPria"
            name="phoneNumberPria"
            value={formData.phoneNumberPria}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Sudah Dibaptis? */}
        <div className="mb-4">
          <label htmlFor="baptisPria" className="block text-lg font-semibold mb-2">g. Sudah Dibaptis?</label>
          <select
            id="baptisPria"
            name="baptisPria"
            value={formData.baptisPria}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          >
            <option value="Belum">Belum</option>
            <option value="Sudah">Sudah</option>
          </select>
        </div>

        {formData.baptisPria === "Sudah" && (
          <>
            <div className="mb-4">
              <label htmlFor="tempatBaptisPria" className="block text-lg font-semibold mb-2">Tempat Baptis</label>
              <input
                type="text"
                id="tempatBaptisPria"
                name="tempatBaptisPria"
                value={formData.tempatBaptisPria}
                onChange={handleInputChange}
                className="block w-full p-1 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tanggalBaptisPria" className="block text-lg font-semibold mb-2">Tanggal Baptis</label>
              <input
                type="date"
                id="tanggalBaptisPria"
                name="tanggalBaptisPria"
                value={formData.tanggalBaptisPria}
                onChange={handleInputChange}
                className="block w-full p-1 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="pendetaBaptisPria" className="block text-lg font-semibold mb-2">Pendeta yang Membaptis</label>
              <input
                type="text"
                id="pendetaBaptisPria"
                name="pendetaBaptisPria"
                value={formData.pendetaBaptisPria}
                onChange={handleInputChange}
                className="block w-full p-1 border border-gray-300 rounded"
                required
              />
            </div>
          </>
        )}

        {/* Orang Tua Mempelai Pria */}
        <div className="mb-4">
          <label htmlFor="fatherNamePria" className="block text-lg font-semibold mb-2">h. Nama Ayah</label>
          <input
            type="text"
            id="fatherNamePria"
            name="fatherNamePria"
            value={formData.fatherNamePria}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="agamaAyahPria" className="block text-lg font-semibold mb-2">i. Agama Ayah</label>
          <input
            type="text"
            id="agamaAyahPria"
            name="agamaAyahPria"
            value={formData.agamaAyahPria}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="motherNamePria" className="block text-lg font-semibold mb-2">j. Nama Ibu</label>
          <input
            type="text"
            id="motherNamePria"
            name="motherNamePria"
            value={formData.motherNamePria}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="agamaIbuPria" className="block text-lg font-semibold mb-2">k. Agama Ibu</label>
          <input
            type="text"
            id="agamaIbuPria"
            name="agamaIbuPria"
            value={formData.agamaIbuPria}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Bagian Calon Mempelai Wanita */}
        <h2 className="text-2xl font-bold mb-4">2. Calon Mempelai Wanita</h2>
        <div className="mb-4">
          <label htmlFor="nameWanita" className="block text-lg font-semibold mb-2">a. Nama Lengkap</label>
          <input
            type="text"
            id="nameWanita"
            name="nameWanita"
            value={formData.nameWanita}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="birthPlaceWanita" className="block text-lg font-semibold mb-2">b. Tempat dan Tanggal Lahir</label>
          <input
            type="text"
            id="birthPlaceWanita"
            name="birthPlaceWanita"
            value={formData.birthPlaceWanita}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
          <input
            type="date"
            id="birthDateWanita"
            name="birthDateWanita"
            value={formData.birthDateWanita}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="addressWanita" className="block text-lg font-semibold mb-2">c. Alamat Lengkap</label>
          <input
            type="text"
            id="addressWanita"
            name="addressWanita"
            value={formData.addressWanita}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pekerjaanWanita" className="block text-lg font-semibold mb-2">d. Pekerjaan</label>
          <input
            type="text"
            id="pekerjaanWanita"
            name="pekerjaanWanita"
            value={formData.pekerjaanWanita}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="kewarganegaraanWanita" className="block text-lg font-semibold mb-2">e. Kewarganegaraan</label>
          <input
            type="text"
            id="kewarganegaraanWanita"
            name="kewarganegaraanWanita"
            value={formData.kewarganegaraanWanita}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumberWanita" className="block text-lg font-semibold mb-2">f. No. Telepon / HP</label>
          <input
            type="text"
            id="phoneNumberWanita"
            name="phoneNumberWanita"
            value={formData.phoneNumberWanita}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Sudah Dibaptis? */}
        <div className="mb-4">
          <label htmlFor="baptisWanita" className="block text-lg font-semibold mb-2">g. Sudah Dibaptis?</label>
          <select
            id="baptisWanita"
            name="baptisWanita"
            value={formData.baptisWanita}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          >
            <option value="Belum">Belum</option>
            <option value="Sudah">Sudah</option>
          </select>
        </div>

        {formData.baptisWanita === "Sudah" && (
          <>
            <div className="mb-4">
              <label htmlFor="tempatBaptisWanita" className="block text-lg font-semibold mb-2">Tempat Baptis</label>
              <input
                type="text"
                id="tempatBaptisWanita"
                name="tempatBaptisWanita"
                value={formData.tempatBaptisWanita}
                onChange={handleInputChange}
                className="block w-full p-1 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tanggalBaptisWanita" className="block text-lg font-semibold mb-2">Tanggal Baptis</label>
              <input
                type="date"
                id="tanggalBaptisWanita"
                name="tanggalBaptisWanita"
                value={formData.tanggalBaptisWanita}
                onChange={handleInputChange}
                className="block w-full p-1 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="pendetaBaptisWanita" className="block text-lg font-semibold mb-2">Pendeta yang Membaptis</label>
              <input
                type="text"
                id="pendetaBaptisWanita"
                name="pendetaBaptisWanita"
                value={formData.pendetaBaptisWanita}
                onChange={handleInputChange}
                className="block w-full p-1 border border-gray-300 rounded"
                required
              />
            </div>
          </>
        )}

        {/* Orang Tua Mempelai Wanita */}
        <div className="mb-4">
          <label htmlFor="fatherNameWanita" className="block text-lg font-semibold mb-2">h. Nama Ayah</label>
          <input
            type="text"
            id="fatherNameWanita"
            name="fatherNameWanita"
            value={formData.fatherNameWanita}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="agamaAyahWanita" className="block text-lg font-semibold mb-2">i. Agama Ayah</label>
          <input
            type="text"
            id="agamaAyahWanita"
            name="agamaAyahWanita"
            value={formData.agamaAyahWanita}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="motherNameWanita" className="block text-lg font-semibold mb-2">j. Nama Ibu</label>
          <input
            type="text"
            id="motherNameWanita"
            name="motherNameWanita"
            value={formData.motherNameWanita}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="agamaIbuWanita" className="block text-lg font-semibold mb-2">k. Agama Ibu</label>
          <input
            type="text"
            id="agamaIbuWanita"
            name="agamaIbuWanita"
            value={formData.agamaIbuWanita}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Konseling dan Pemberkatan */}
        <h2 className="text-2xl font-bold mb-4">3. Konseling dan Pemberkatan</h2>
        <div className="mb-4">
          <label htmlFor="konselor" className="block text-lg font-semibold mb-2">a. Konselor</label>
          <input
            type="text"
            id="konselor"
            name="konselor"
            value={formData.konselor}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tanggalKonseling" className="block text-lg font-semibold mb-2">b. Tanggal Konseling</label>
          <input
            type="date"
            id="tanggalKonseling"
            name="tanggalKonseling"
            value={formData.tanggalKonseling}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tanggalPemberkatan" className="block text-lg font-semibold mb-2">c. Tanggal Pemberkatan</label>
          <input
            type="date"
            id="tanggalPemberkatan"
            name="tanggalPemberkatan"
            value={formData.tanggalPemberkatan}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tempatPemberkatan" className="block text-lg font-semibold mb-2">d. Tempat Pemberkatan</label>
          <input
            type="text"
            id="tempatPemberkatan"
            name="tempatPemberkatan"
            value={formData.tempatPemberkatan}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pendetaPemberkatan" className="block text-lg font-semibold mb-2">e. Pendeta yang Memberkati</label>
          <input
            type="text"
            id="pendetaPemberkatan"
            name="pendetaPemberkatan"
            value={formData.pendetaPemberkatan}
            onChange={handleInputChange}
            className="block w-full p-1 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Tombol Submit */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-black font-bold py-2 px-4 rounded"
          >
            Kirim Formulir
          </button>
        </div>
      </form>
    </div>
  );
}
