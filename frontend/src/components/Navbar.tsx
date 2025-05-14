import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setAuthenticated(!!token);
    };

    checkAuth();
    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
    router.push('/login');
    setAuthenticated(false);
    window.dispatchEvent(new Event('authChange'));
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-4">
          <Link href="/" className="hover:text-gray-300">
            🏠 Home
          </Link>
          {authenticated ? (
            <>
              <Link href="/dashboard" className="hover:text-gray-300">
                📋 My Bounties
              </Link>
              <Link href="/bounties/create" className="hover:text-gray-300">
                ➕ Post Bounty
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300">
                🔐 Login
              </Link>
              <Link href="/register" className="hover:text-gray-300">
                📝 Register
              </Link>
            </>
          )}
        </div>
        {authenticated && (
          <button
            onClick={handleLogout}
            className=" hover:bg-red-600 text-white px-4 py-2 rounded transition"
          >
            🚪 Logout
          </button>
        )}
      </div>
    </nav>
  );
}