import { useSession, signIn, signOut } from 'next-auth/react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaSignOutAlt, FaSignInAlt, FaVolumeUp } from 'react-icons/fa';
import Image from 'next/image';
import styles from './Header.module.css'; // Import CSS Module

// Fungsi untuk melakukan text-to-speech
const handleTextToSpeech = (text) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID'; // Menentukan bahasa jika diperlukan
    utterance.voice = window.speechSynthesis.getVoices().find(voice => voice.name.includes('Google')) || null;
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Text-to-Speech tidak didukung di browser Anda.');
  }
};

// Fungsi untuk menghentikan text-to-speech
const stopTextToSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export default function Header() {
  const { data: session } = useSession();
  const isUser = session?.user;
  const isAdmin = isUser?.role === 'admin';
  const isGuest = !isUser;

  return (
    <header className={styles.header}>
      <Navbar expand="lg" className={styles.navbar}>
        <Container fluid>
          <Navbar.Brand href="#" className={styles.navbarBrand}>
            GSJA Mertiguna Sintang
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" aria-label="Toggle navigation" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '1000px' }} navbarScroll role="navigation">
              <Nav.Link
                href="/"
                onMouseEnter={() => handleTextToSpeech('Home')}
                onMouseLeave={() => stopTextToSpeech()}
                className={styles.navLink}
              >
                Home
                <FaVolumeUp className={styles.iconVolume} />
              </Nav.Link>
              <Nav.Link
                href="/renungan"
                onMouseEnter={() => handleTextToSpeech('Renungan')}
                onMouseLeave={() => stopTextToSpeech()}
                className={styles.navLink}
              >
                Renungan
                <FaVolumeUp className={styles.iconVolume} />
              </Nav.Link>
              <Nav.Link
                href="/jadwal"
                onMouseEnter={() => handleTextToSpeech('Jadwal Pelayanan')}
                onMouseLeave={() => stopTextToSpeech()}
                className={styles.navLink}
              >
                Jadwal Pelayanan
                <FaVolumeUp className={styles.iconVolume} />
              </Nav.Link>
              <Nav.Link
                href="/about"
                onMouseEnter={() => handleTextToSpeech('Tentang Kami')}
                onMouseLeave={() => stopTextToSpeech()}
                className={styles.navLink}
              >
                Tentang Kami
                <FaVolumeUp className={styles.iconVolume} />
              </Nav.Link>

              {/* Kondisi untuk menampilkan 'Layanan' dan 'Download' */}
              {isUser && !isAdmin && (
                <>
                  <NavDropdown 
                    title={<><span>Layanan</span> <FaVolumeUp className={styles.iconVolume} /></>}
                    id="nav-dropdown"
                    aria-haspopup="true"
                    onMouseEnter={() => handleTextToSpeech('Layanan')}
                    onMouseLeave={() => stopTextToSpeech()}
                    className={styles.navDropdownMenu}
                  >
                    <NavDropdown.Item 
                      href="/layanan/jemaat_baru"
                      onMouseEnter={() => handleTextToSpeech('Jemaat Baru')}
                      onMouseLeave={() => stopTextToSpeech()}
                      className={styles.navDropdownItem}
                    >
                      Jemaat Baru
                      <FaVolumeUp className={styles.iconVolume} />
                    </NavDropdown.Item>
                    <NavDropdown.Item 
                      href="/layanan/baptis"
                      onMouseEnter={() => handleTextToSpeech('Pembaptisan')}
                      onMouseLeave={() => stopTextToSpeech()}
                      className={styles.navDropdownItem}
                    >
                      Pembaptisan
                      <FaVolumeUp className={styles.iconVolume} />
                    </NavDropdown.Item>
                    <NavDropdown.Item 
                      href="/layanan/pernikahan"
                      onMouseEnter={() => handleTextToSpeech('Pernikahan')}
                      onMouseLeave={() => stopTextToSpeech()}
                      className={styles.navDropdownItem}
                    >
                      Pernikahan
                      <FaVolumeUp className={styles.iconVolume} />
                    </NavDropdown.Item>
                    <NavDropdown.Item 
                      href="/layanan/kematian"
                      onMouseEnter={() => handleTextToSpeech('Kematian')}
                      onMouseLeave={() => stopTextToSpeech()}
                      className={styles.navDropdownItem}
                    >
                      Kematian
                      <FaVolumeUp className={styles.iconVolume} />
                    </NavDropdown.Item>
                    <NavDropdown.Item 
                      href="/layanan/persembahan"
                      onMouseEnter={() => handleTextToSpeech('Persembahan')}
                      onMouseLeave={() => stopTextToSpeech()}
                      className={styles.navDropdownItem}
                    >
                      Persembahan
                      <FaVolumeUp className={styles.iconVolume} />
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link
                    href="/download"
                    onMouseEnter={() => handleTextToSpeech('Download Area')}
                    onMouseLeave={() => stopTextToSpeech()}
                    className={styles.navLink}
                  >
                    Download
                  </Nav.Link>
                </>
              )}
            </Nav>
            <Form className="d-flex me-3">
              <Form.Control
                type="search"
                placeholder="Search"
                className={styles.formControl}
                aria-label="Search"
                onMouseEnter={() => handleTextToSpeech('Search')}
                onMouseLeave={() => stopTextToSpeech()}
              />
              <Button
                style={{ padding: '5px', margin: '5px' }}
                variant="outline-primary"
                className={styles.btnOutlinePrimary}
                onMouseEnter={() => handleTextToSpeech('Search')}
                onMouseLeave={() => stopTextToSpeech()}
              >
                Search
              </Button>
            </Form>
            <Nav className="ms-auto">
              <NavDropdown
                title={
                  isGuest ? 'Account' : (
                    <Image
                      src={session?.user?.image || '/default-profile.png'}
                      alt={session?.user?.name ? `${session?.user?.name}'s profile picture` : 'Profile picture'}
                      width={30}
                      height={30}
                      className={styles.roundedCircle}
                    />
                  )
                }
                id="NavbarScrollingDropdown"
                className={styles.navDropdownMenu}
              >
                {isGuest ? (
                  <NavDropdown.Item onClick={() => signIn('google')} className={styles.navDropdownItem}>
                    <FaSignInAlt className="me-2" /> Login
                  </NavDropdown.Item>
                ) : (
                  <>
                    {isAdmin && (
                      <NavDropdown.Item href="/admin" className={styles.navDropdownItem}>
                        Dashboard
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Item onClick={() => signOut({ callbackUrl: '/' })} className={styles.navDropdownItem}>
                      <FaSignOutAlt className="me-2" /> Logout
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
