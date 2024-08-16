import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Accordion from 'react-bootstrap/Accordion';
import { FaChevronDown, FaVolumeUp, FaStop } from 'react-icons/fa';
import styles from './renungan.module.css';

export default function Renungan() {
  const [renungan, setRenungan] = useState([]);
  const [currentUtterance, setCurrentUtterance] = useState(null);

  useEffect(() => {
    const fetchRenungan = async () => {
      try {
        const response = await fetch('/api/renungan');
        if (!response.ok) {
          throw new Error('Gagal memuat renungan');
        }
        const data = await response.json();
        setRenungan(data);
      } catch (error) {
        console.error('Error fetching renungan:', error);
      }
    };

    fetchRenungan();
  }, []);

  const handleSpeak = (text) => {
    // Stop any currently speaking utterance
    if (currentUtterance) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID'; // Set the language to Indonesian
    window.speechSynthesis.speak(utterance);
    setCurrentUtterance(utterance);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setCurrentUtterance(null);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1>Renungan Harian</h1>
        {renungan.length === 0 ? (
          <p>Tidak ada renungan untuk ditampilkan.</p>
        ) : (
          <Accordion>
            {renungan.map((item) => (
              <Accordion.Item eventKey={item.id.toString()} key={item.id} className={styles.renunganItem}>
                <Accordion.Header className={styles.header}>
                  <span className={styles.title}>
                    {item.category} - {new Date(item.date).toLocaleDateString()}
                  </span>
                  <FaChevronDown className={`${styles.arrow}`} />
                </Accordion.Header>
                <Accordion.Body className={styles.body}>
                  <p>{item.text}</p>
                  <div className={styles.buttons}>
                    <button
                      className={styles.speakButton}
                      onMouseEnter={() => handleSpeak(item.text)}
                      onClick={() => handleSpeak(item.text)}
                    >
                      <FaVolumeUp /> Baca
                    </button>
                    <button
                      className={styles.stopButton}
                      onMouseEnter={() => handleStop()}
                      onClick={() => handleStop()}
                    >
                      <FaStop /> Hentikan
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
      </div>
      <Footer />
    </>
  );
}
