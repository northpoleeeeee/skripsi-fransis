// pages/login.js
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function Login() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      // Redirect if already logged in
      window.location.href = '/';
    }
  }, [session]);

  return (
    <div className="container mx-auto px-4 py-20 flex items-center justify-center h-screen">
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <button
          onClick={() => signIn('google')}
          className="text-white rounded-full px-4 py-2 w-full text-center" style={{background:"black"}}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}
