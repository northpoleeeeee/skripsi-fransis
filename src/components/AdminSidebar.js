import Link from 'next/link';
import { FaUser, FaHome, FaBook, FaHeart, FaLifeRing, FaGift, FaFile, FaCalendar, FaBible, FaHouseUser } from 'react-icons/fa';

export default function AdminSidebar() {
    const menuItems = [
        { href: '/admin', label: 'Home', icon: <FaHouseUser /> },
        { href: '/admin/users', label: 'Tabel User', icon: <FaUser /> },
        { href: '/admin/jemaat', label: 'Tabel Jemaat', icon: <FaHome /> },
        { href: '/admin/baptis', label: 'Tabel Baptis', icon: <FaBook /> },
        { href: '/admin/pernikahan', label: 'Tabel Pernikahan', icon: <FaHeart /> },
        { href: '/admin/kematian', label: 'Tabel Kematian', icon: <FaLifeRing /> },
        { href: '/admin/keuangan', label: 'Tabel Keuangan', icon: <FaGift /> },
        { href: '/admin/upload', label: 'Tabel Dokumen', icon: <FaFile /> },
        { href: '/admin/jadwal', label: 'Tabel Jadwal', icon: <FaCalendar /> },
        { href: '/admin/renungan', label: 'Tabel Renungan', icon: <FaBible /> },
    ];

    return (
        <div className="sidebar">
            {/* Logo dan Teks */}
            <div className="logo-container">
                <img src="/images/gsja.png" alt="Logo" className="logo" />
                <h1 className="sidebar-title">GJSA Mertiguna</h1>
            </div>
            <hr className="separator" />
            {/* Menu Items */}
            {menuItems.map((item, index) => (
                <Link href={item.href} key={index} passHref>
                    <div className="menu-item">
                        <div className="menu-item-content">
                            <span className="menu-item-icon">{item.icon}</span>
                            <span className="menu-item-label">{item.label}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
