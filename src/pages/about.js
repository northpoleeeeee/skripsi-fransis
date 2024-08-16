import { useState } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaVolumeUp, FaStop } from 'react-icons/fa';

// Fungsi untuk melakukan text-to-speech
const handleTextToSpeech = (text) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID'; // Menentukan bahasa jika diperlukan
    utterance.voice = window.speechSynthesis.getVoices().find(voice => voice.name.includes('Google')) || null;
    window.speechSynthesis.speak(utterance);
    return utterance; // Mengembalikan utterance untuk referensi
  } else {
    alert('Text-to-Speech tidak didukung di browser Anda.');
    return null;
  }
};

// Fungsi untuk menghentikan text-to-speech
const stopTextToSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export default function About() {
  const [utterance, setUtterance] = useState(null);

  const textToRead = `
    GSJA Mertiguna Sintang adalah bagian dari Gereja Sidang-Sidang Jemaat Allah (GSJA) yang berkomitmen untuk melayani masyarakat dengan kasih dan dedikasi. Kami berfokus pada pertumbuhan rohani, pelayanan sosial, dan pengajaran Alkitab.
    Dengan berbagai program ibadah, pelayanan, dan kegiatan komunitas, kami bertujuan untuk menjadi berkat bagi setiap anggota dan masyarakat sekitar. Kami mengundang Anda untuk bergabung dengan kami dalam pelayanan dan komunitas kami.
  `;

  const handleClick = () => {
    if (utterance) {
      stopTextToSpeech();
      setUtterance(null);
    } else {
      const newUtterance = handleTextToSpeech(textToRead);
      setUtterance(newUtterance);
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
        <div className="container mx-auto px-4 py-20 bg-white shadow-md rounded-lg relative">
          <h1 className="text-4xl font-bold mb-6 text-center">
            GSJA Mertiguna Sintang
          </h1>
          <div className="flex flex-wrap gap-8">
            <div className="w-full md:w-1/2">
              <p className="text-lg mb-4">
                GSJA Mertiguna Sintang adalah bagian dari Gereja Sidang-Sidang Jemaat Allah (GSJA) yang berkomitmen untuk melayani masyarakat dengan kasih dan dedikasi. Kami berfokus pada pertumbuhan rohani, pelayanan sosial, dan pengajaran Alkitab.
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-lg mb-4">
                Dengan berbagai program ibadah, pelayanan, dan kegiatan komunitas, kami bertujuan untuk menjadi berkat bagi setiap anggota dan masyarakat sekitar. Kami mengundang Anda untuk bergabung dengan kami dalam pelayanan dan komunitas kami.
              </p>
            </div>
          </div>
          <div className="text-center mt-6">
            <Link
              href="/"
              className="bg-blue-500 text-white rounded-full font-semibold px-4 py-2 inline-flex items-center gap-2"
            >
              Kembali ke Home
            </Link> 
          </div>

          {/* Kontainer untuk ikon TTS */}
          <div className="absolute top-1/2 right-4 flex flex-col gap-2" style={{ transform: 'translateY(-50%)' }}>
            <div className="flex items-center gap-2">
              <FaVolumeUp
                onClick={handleClick}
                className="text-blue-500 cursor-pointer"
                title={utterance ? "Klik untuk berhenti mendengarkan" : "Klik untuk mendengarkan semua teks"}
                style={{ fontSize: '2rem' }}
              />
              {utterance && (
                <FaStop
                  onClick={stopTextToSpeech}
                  className="text-red-500 cursor-pointer"
                  title="Klik untuk menghentikan pembacaan"
                  style={{ fontSize: '2rem' }}
                />
              )}
            </div>
            <div className="text-sm text-gray-500">
              {utterance ? "Klik ikon berhenti untuk menghentikan pembacaan" : "Klik ikon speaker untuk mendengarkan teks"}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
