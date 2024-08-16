// components/Footer.js
import { FaCopyright } from 'react-icons/fa'; // Import ikon hak cipta dari react-icons
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css'; 

export default function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '1rem 0' }} aria-label="Footer">
      <Card>
        <Card.Header>God Bless You</Card.Header>
        <Card.Body>
          <Card.Text>
            <FaCopyright /> 2024 GSJA Mertiguna Sintang
          </Card.Text>
        </Card.Body>
      </Card>
    </footer>
  );
}
