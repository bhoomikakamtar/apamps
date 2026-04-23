import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  NavLink,
  useLocation,
  useNavigate
} from 'react-router-dom';

import { AuthProvider, useAuth } from './contexts/AuthContext';

import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Results from './components/Results';
import History from './components/History';
import Settings from './components/Settings';
import About from './components/About';

import { Leaf, LogOut, User, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

/* ───────────────── Protected Route ───────────────── */
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}>
        <span className="spinner" style={{ width: 40, height: 40, borderWidth: 3 }} />
      </div>
    );
  }

  return user ? children : <Navigate to="/" replace />;
}

/* ───────────────── Public Route ───────────────── */
function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? <Navigate to="/home" replace /> : children;
}

/* ───────────────── User Menu ───────────────── */
function UserMenu() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const name =
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'User';

  const email = user?.email || '';
  const initials = name.slice(0, 2).toUpperCase();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: 'none',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: '0.4rem 0.75rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        <div style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 700,
          fontSize: '0.75rem'
        }}>
          {initials}
        </div>

        <span style={{ fontSize: '0.85rem' }}>{name}</span>

        <ChevronDown size={14} />
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: 'calc(100% + 8px)',
          background: 'var(--color-bg-2)',
          border: '1px solid var(--color-border)',
          borderRadius: '10px',
          padding: '0.5rem',
          minWidth: 200,
          zIndex: 100
        }}>
          <div style={{ padding: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ fontWeight: 600 }}>{name}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{email}</div>
          </div>

          <button
            onClick={() => {
              navigate('/settings');
              setOpen(false);
            }}
            style={{ width: '100%', padding: '0.5rem', textAlign: 'left' }}
          >
            <User size={14} /> Settings
          </button>

          <button
            onClick={handleSignOut}
            style={{ width: '100%', padding: '0.5rem', textAlign: 'left', color: 'red' }}
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

/* ───────────────── Navbar ───────────────── */
const NAV_ITEMS = [
  { to: '/home', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/history', label: 'History' },
  { to: '/about', label: 'About' }
];
function Navbar() {
  const { user } = useAuth();
  const location = useLocation();

  if (location.pathname === '/') return null;

  return (
    <nav className="navbar">
      <NavLink to="/home" className="brand">
        <Leaf size={22} /> NutriPhase
      </NavLink>

      <div className="nav-links" style={{ display: 'flex', gap: '10px' }}>
        {NAV_ITEMS.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              padding: '8px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 500,
              transition: '0.2s',
              background: isActive
                ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))'
                : 'transparent',
              color: isActive ? '#fff' : 'var(--color-text)',
              border: '1px solid var(--color-border)'
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      {user && <UserMenu />}
    </nav>
  );
}

/* ───────────────── App Shell ───────────────── */
function AppShell() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />

        {/* Protected */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

/* ───────────────── Main App ───────────────── */
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppShell />
      </Router>
    </AuthProvider>
  );
}