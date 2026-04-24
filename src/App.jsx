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
import { supabase, hasSupabaseConfig } from './supabaseClient';

import Login from './components/Login';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Results from './components/Results';
import History from './components/History';
import Settings from './components/Settings';
import About from './components/About';
import NotificationManager from './components/NotificationManager';

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
    <div ref={ref} className="user-menu-container" style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(o => !o)}
        className="user-menu-btn"
        style={{
          background: 'none',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: '0.4rem 0.75rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          whiteSpace: 'nowrap'
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
          fontSize: '0.75rem',
          flexShrink: 0
        }}>
          {initials}
        </div>

        <span className="user-name-text" style={{ fontSize: '0.85rem' }}>{name}</span>

        <ChevronDown size={14} className="user-menu-chevron" />
      </button>

      {open && (
        <div className="user-menu-dropdown" style={{
          position: 'absolute',
          right: 0,
          top: 'calc(100% + 8px)',
          background: 'var(--color-bg-2)',
          border: '1px solid var(--color-border)',
          borderRadius: '10px',
          padding: '0.5rem',
          minWidth: 200,
          zIndex: 100,
          boxShadow: 'var(--shadow-glass)'
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
            className="dropdown-item"
            style={{ width: '100%', padding: '0.6rem 0.75rem', textAlign: 'left', background: 'none', border: 'none', color: 'var(--color-text)', cursor: 'pointer', borderRadius: 'var(--radius-sm)' }}
          >
            <User size={14} /> Settings
          </button>

          <button
            onClick={handleSignOut}
            className="dropdown-item"
            style={{ width: '100%', padding: '0.6rem 0.75rem', textAlign: 'left', color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', borderRadius: 'var(--radius-sm)' }}
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
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState('');

  if (location.pathname === '/') return null;

  const isUnverified = user && hasSupabaseConfig && !user.email_confirmed_at;

  const handleResend = async () => {
    setResending(true);
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: user.email,
    });
    setResending(false);
    setResendMsg(error ? 'Error sending email' : 'Verification email sent!');
    setTimeout(() => setResendMsg(''), 4000);
  };

  return (
    <>
      {isUnverified && (
        <div style={{
          background: 'rgba(245, 158, 11, 0.15)',
          borderBottom: '1px solid rgba(245, 158, 11, 0.3)',
          padding: '0.6rem 1rem',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: '#F59E0B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <span>Please verify your email to enable all features.</span>
          <button 
            onClick={handleResend} 
            disabled={resending}
            style={{ 
              background: 'var(--color-accent)', 
              color: 'white', 
              border: 'none', 
              padding: '0.2rem 0.6rem', 
              borderRadius: '4px', 
              fontSize: '0.75rem', 
              cursor: 'pointer' 
            }}
          >
            {resending ? 'Sending...' : 'Resend Email'}
          </button>
          {resendMsg && <span style={{ fontSize: '0.75rem' }}>{resendMsg}</span>}
        </div>
      )}
      <nav className="navbar">
        <div className="navbar-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '1200px', margin: '0 auto', gap: '1rem' }}>
          <NavLink to="/home" className="brand">
            <Leaf size={22} style={{ flexShrink: 0 }} /> 
            <span className="brand-name">NutriPhase</span>
          </NavLink>

          <div className="nav-links-wrapper" style={{ flex: 1, display: 'flex', justifyContent: 'center', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <div className="nav-links" style={{ display: 'flex', gap: '4px', padding: '4px' }}>
              {NAV_ITEMS.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="nav-link"
                  style={({ isActive }) => ({
                    padding: '6px 12px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    transition: '0.2s',
                    background: isActive
                      ? 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))'
                      : 'transparent',
                    color: isActive ? '#fff' : 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                    whiteSpace: 'nowrap'
                  })}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          {user && (
            <div className="navbar-user" style={{ flexShrink: 0 }}>
              <UserMenu />
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

/* ───────────────── App Shell ───────────────── */
function AppShell() {
  return (
    <>
      <Navbar />
      <NotificationManager />

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