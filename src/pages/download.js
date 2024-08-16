import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Container from 'react-bootstrap/Container';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


export default function DownloadPage() {
  const { data: session } = useSession();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!session) return;

    const fetchFiles = async () => {
      try {
        const res = await fetch(`/api/files?userId=${session.user.id}`);
        const data = await res.json();
        setFiles(data || []);
      } catch (error) {
        console.error('Error fetching files:', error);
        toast.error('Gagal mengambil data file. Silakan coba lagi.');
      }
    };

    fetchFiles();
  }, [session]);

  return (
    <>
      <Header />
      <Container style={{ padding: '20px' }}>
        <h1>Unduh Dokumen</h1>
        {files.length > 0 ? (
          <ul>
            {files.map(file => (
              <li key={file.id}>
                <a href={`public/uploads${file.file_path}`} download>
                  {file.file_path.split('/').pop()} {/* Extract file name from path */}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>Tidak ada dokumen untuk diunduh.</p>
        )}
        <ToastContainer />
      </Container>
      <Footer />
    </>
  );
}
