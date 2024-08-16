// pages/admin/dashboard.js
import AdminSidebar from '@/components/AdminSidebar';
import AdminNavbar from '@/components/AdminNavbar';
import { getSession } from 'next-auth/react';
import styles from './AdminDashboard.module.css'; // Pastikan path sesuai

const AdminDashboard = () => (
  <>
    <AdminNavbar />
    <div className={styles.container}>
      <AdminSidebar />
      <div className={styles.mainContent}>
        <h5 className={styles.centeredText}>
          <img
            src="/images/hallo.png" //
            alt="Tangan Melambai"
            className={styles.waveImage}
          />
          Selamat Datang di Dashboard Admin :)
        </h5>
      </div>
    </div>
  </>
);

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: {} };
}

export default AdminDashboard;
