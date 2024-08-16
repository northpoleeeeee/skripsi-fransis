// pages/logout.js
import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page after signing out
    signOut({ callbackUrl: '/' });
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg">Logging out...</p>
    </div>
  );
}

