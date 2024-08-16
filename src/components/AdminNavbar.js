import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { FaBell, FaEnvelope, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function AdminNavbar() {
  const { data: session } = useSession();

  return (
    <Navbar expand="lg" className="bg-custom text-white border-bottom border-gray-700 mb-3">
      <Container fluid>
        {/* Navbar Brand */}
        <Navbar.Brand href="#" className="text-white">
          GSJA Mertiguna
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar" aria-label="Toggle navigation" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          role="dialog"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="d-flex justify-content-end align-items-center w-100">
              {/* Form Pencarian */}
              <Form className="d-flex me-3">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-light">Search</Button>
              </Form>

              {/* Notifikasi */}
              <Nav className="me-3" aria-live="polite">
                <Nav.Link href="#">
                  <FaBell className="text-white" size={20} />
                </Nav.Link>
                <Nav.Link href="#">
                  <FaEnvelope className="text-white" size={20} />
                </Nav.Link>
              </Nav>

              {/* Dropdown Akun */}
              <Nav>
                <NavDropdown
                  title={
                    session ? (
                      <div className="d-flex align-items-center">
                        <Image
                          src={session.user.image || '/default-profile.png'}
                          alt={session.user.name ? `${session.user.name}'s profile` : 'Profile image'}
                          width={30}
                          height={30}
                          className="rounded-circle"
                        />
                        <span className="ml-2 text-white">{session.user.name}</span>
                      </div>
                    ) : (
                      <span>Account</span>
                    )
                  }
                  id="offcanvasNavbarDropdown"
                  className="text-white"
                >
                  {session ? (
                    <>
                      <NavDropdown.Item as={Link} href="/">
                        Home
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        as="button"
                        className="text-danger"
                        onClick={() => signOut({ callbackUrl: '/' })}
                      >
                        <FaSignOutAlt className="mr-2" /> Logout
                      </NavDropdown.Item>
                    </>
                  ) : (
                    <NavDropdown.Item as={Link} href="/api/auth/signin">
                      <div className="d-flex align-items-center text-primary">
                        <FaSignInAlt className="mr-2" /> Login
                      </div>
                    </NavDropdown.Item>
                  )}
                </NavDropdown>
              </Nav>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
