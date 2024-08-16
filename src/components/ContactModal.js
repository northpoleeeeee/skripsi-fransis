// components/ContactModal.js
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ContactModal({ showModal, handleClose }) {
  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Hubungi Kami</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Jika Anda memiliki pertanyaan atau ingin menghubungi kami, silakan klik tombol di bawah ini:</p>
        <a
          href="https://wa.me/+6289653792251"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-success"
        >
          Chat with us on WhatsApp
        </a>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
