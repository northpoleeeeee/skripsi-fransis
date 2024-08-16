import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import AdminNavbar from '@/components/AdminNavbar';
import AdminSidebar from '@/components/AdminSidebar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UploadPage() {
  const { data: session } = useSession();
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data || []); // Adjust according to your API response format
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUserChange = (e) => setSelectedUser(e.target.value);

  const handleUpload = async (e) => {
  e.preventDefault();
  if (!file || !selectedUser) {
    toast.error('Please select a file and a user.');
    return;
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('user', selectedUser);

  console.log('Uploading file:', file);
  console.log('Selected user:', selectedUser);

  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const result = await res.json();
    if (res.ok) {
      toast.success('File uploaded successfully!');
      setFile(null);
      setSelectedUser('');
      document.getElementById('fileInput').value = null;
    } else {
      toast.error(`Upload failed: ${result.error}`);
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    toast.error('Error uploading file. Please try again.');
  }
};


  if (session?.user.role !== 'admin') return <p>Access Denied</p>;

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <Container style={{ marginLeft: '250px', padding: '20px' }}>
        <h1>Upload Document</h1>
        <Form onSubmit={handleUpload}>
          <Form.Group controlId="formFile">
            <Form.Label>Choose PDF file</Form.Label>
            <Form.Control
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              id="fileInput" // Added id for resetting the input
            />
          </Form.Group>
          <Form.Group controlId="formUser">
            <Form.Label>Select User</Form.Label>
            <Form.Control
              as="select"
              onChange={handleUserChange}
              value={selectedUser}
            >
              <option value="">Select a user</option>
              {users.length > 0 && users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button type="submit">Upload</Button>
        </Form>
        <ToastContainer />
      </Container>
    </>
  );
}
