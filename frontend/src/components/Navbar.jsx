import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../lib/firebase';

export default function Navbar() {
  const { user } = useAuth();
  const navigate  = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <div className="logo-dot" />
        Aurae
      </Link>

      <div className="nav-links">
        <Link to="/"        className="nav-link">Home</Link>
        <Link to="/pricing" className="nav-link">Pricing</Link>

        {user ? (
          <>
            <Link to="/upload" className="nav-link">Dashboard</Link>
            <button
              className="btn-s"
              onClick={handleLogout}
              style={{ padding: '9px 20px', fontSize: 13 }}
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link to="/auth" className="nav-link">Sign In</Link>
            <Link
              to="/upload"
              className="btn-p"
              style={{ padding: '9px 22px', fontSize: 13 }}
            >
              Try Free
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
