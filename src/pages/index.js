// pages/index.js
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import ContactModal from '@/components/ContactModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';

export default function Home() {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between mt-20">
        {/* Bagian teks */}
        <div className="w-full md:w-1/2 text-left md:text-left mb-8 md:mb-0">
          <h1 className="text-3xl font-bold mb-6">Selamat Datang</h1>
          <p className="text-lg mb-8">
            <strong>Yohanes 8:12</strong>
          </p>
          <p className="text-lg mb-4">
            Maka Yesus berkata pula kepada orang banyak, kata-Nya: "Akulah terang dunia;
            barangsiapa mengikuti Aku, ia tidak akan berjalan dalam kegelapan, melainkan ia akan mempunyai terang hidup."
          </p>
          {/* Render berdasarkan status sesi */}
          {session && session.user.role === 'admin' && (
            <p className="mt-4 text-lg">Welcome, Admin!</p>
          )}
          {session && session.user.role === 'user' && (
            <p className="mt-4 text-lg">Welcome back, {session.user.name}!</p>
          )}
          {!session && (
            <p className="mt-4 text-lg">
              Welcome, guest! Silahkan <Link href="/api/auth/signin">sign in</Link> untuk dapat mengakses layanan gereja.
            </p>
          )}
          {/* Tombol Contact Us selalu ditampilkan */}
          <Button
            style={{ backgroundColor: '#f04747', borderColor: '#f04747' }}
            className="text-white mt-4"
            onClick={handleShow}
          >
            Contact Us
          </Button>
        </div>
        {/* Bagian gambar */}
        <div className="w-full md:w-1/2 text-center">
          <Image
            src="/images/familyy.png"
            alt="FAMILY"
            height={500}
            width={500}
            className="mx-auto"
          />
        </div>
      </div>
      <Footer />
      {/* Modal Pop-Up */}
      <ContactModal showModal={showModal} handleClose={handleClose} />
    </>
  );
}
