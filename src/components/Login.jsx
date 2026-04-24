import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Leaf, Mail, Lock, User, Eye, EyeOff, ArrowRight, Info } from 'lucide-react';
import { hasSupabaseConfig, supabase } from '../supabaseClient';

export default function Login() {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: err } = mode === 'signin'
      ? await signIn(email, password)
      : await signUp(email, password, name);

    setLoading(false);

    if (err) {
      setLoading(false);
      setError(err.message || 'Something went wrong. Please try again.');
    } else {
      // Check if it was a signup with Supabase (real auth)
      if (mode === 'signup' && hasSupabaseConfig) {
        setError('Verification email sent! Please check your inbox before signing in.');
        setLoading(false);
        setMode('signin');
        return;
      }

      try {
        if (hasSupabaseConfig) {
          // ✅ Get logged-in user
          const { data: { user } } = await supabase.auth.getUser();

          if (user) {
            // ✅ Check if already exists
            const { data: existing } = await supabase
              .from('users')
              .select('*')
              .eq('email', user.email);

            // ✅ Insert if new user
            if (!existing || existing.length === 0) {
              await supabase.from('users').insert([
                {
                  email: user.email,
                  name: user.user_metadata?.name || user.email.split('@')[0]
                }
              ]);
            }
          }
        }
        
        // Only navigate if we're not waiting for email verification
        if (mode === 'signin' || !hasSupabaseConfig) {
          navigate('/home');
        }
      } catch (e) {
        console.error("DB ERROR:", e);
        navigate('/home');
      }

      setLoading(false);
      navigate('/home');
    }
  };

  return (
    <div className="login-wrapper" style={{
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'row',
      alignItems: 'stretch',
      margin: '-2rem -1rem', // Adjust for container padding
      flexWrap: 'wrap'
    }}>
      {/* ── Left panel: branding ── */}
      <div className="login-brand-panel" style={{
        flex: '1 1 400px', 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 'clamp(2rem, 5vw, 4rem)',
        background: 'linear-gradient(160deg, rgba(16,185,129,0.2) 0%, rgba(99,102,241,0.15) 100%)',
        borderRight: '1px solid var(--color-border)',
        position: 'relative', 
        overflow: 'hidden',
        minHeight: '400px'
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(16,185,129,0.2) 0%,transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(99,102,241,0.2) 0%,transparent 70%)' }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: '100%', maxWidth: '400px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ width: 60, height: 60, borderRadius: '16px', background: 'linear-gradient(135deg,var(--color-primary),var(--color-secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf size={32} color="white" />
            </div>
          </div>
          <h1 className="gradient-text" style={{ fontSize: 'clamp(2rem, 8vw, 2.8rem)', marginBottom: '0.75rem' }}>NutriPhase</h1>
          <p className="text-muted" style={{ fontSize: '1rem', lineHeight: 1.6, maxWidth: '320px', margin: '0 auto 2rem' }}>
            Your personal health & nutrition assistant — meals perfectly timed to your body's phases.
          </p>

          {/* Feature bullets - Hide on very small mobile if needed, or stack nicely */}
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              '🩸 Menstrual cycle-aware meal plans',
              '🌿 Veg / Non-Veg / Vegan support',
              '⚠️ Automatic allergen filtering',
              '📅 Full day + 7-day unique meal plans',
            ].map(f => (
              <div key={f} className="flex items-center gap-3 text-left" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{f.split(' ')[0]}</span>
                <span className="text-sm" style={{ color: 'var(--color-text)' }}>{f.slice(f.indexOf(' ') + 1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel: form ── */}
      <div className="login-form-panel" style={{ flex: '1 1 420px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(2rem, 5vw, 3rem) 1.5rem' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>

          {/* Demo mode banner */}
          {!hasSupabaseConfig && (
            <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem', marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <Info size={16} style={{ color: '#F59E0B', flexShrink: 0, marginTop: '2px' }} />
              <p className="text-sm" style={{ margin: 0, color: '#F59E0B' }}>
                <strong>Demo Mode</strong> — Supabase not configured. Any email/password works. Set up <code>.env</code> for real auth.
              </p>
            </div>
          )}

          {/* Toggle tabs */}
          <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)', padding: '4px', marginBottom: '2rem', border: '1px solid var(--color-border)' }}>
            {['signin', 'signup'].map(m => (
              <button key={m} type="button"
                onClick={() => { setMode(m); setError(''); }}
                style={{
                  flex: 1, padding: '0.65rem', border: 'none', borderRadius: 'calc(var(--radius-md) - 4px)',
                  fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s',
                  background: mode === m ? 'linear-gradient(135deg,var(--color-primary),var(--color-primary-dark))' : 'transparent',
                  color: mode === m ? 'white' : 'var(--color-text-muted)',
                }}>
                {m === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <h2 style={{ marginBottom: '0.5rem' }}>
            {mode === 'signin' ? 'Welcome back!' : 'Create your account'}
          </h2>
          <p className="text-muted text-sm mb-6">
            {mode === 'signin'
              ? 'Sign in to access your personalised meal plans.'
              : 'Join NutriPhase and start your nutrition journey.'}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name (signup only) */}
            {mode === 'signup' && (
              <div>
                <label className="form-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-faint)' }} />
                  <input id="auth-name" type="text" className="form-input" required
                    value={name} onChange={e => setName(e.target.value)}
                    placeholder="Your name"
                    style={{ paddingLeft: '2.75rem' }} />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-faint)' }} />
                <input id="auth-email" type="email" className="form-input" required
                  value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{ paddingLeft: '2.75rem' }} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-faint)' }} />
                <input id="auth-password" type={showPwd ? 'text' : 'password'} className="form-input" required
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'Min. 6 characters' : 'Your password'}
                  minLength={mode === 'signup' ? 6 : undefined}
                  style={{ paddingLeft: '2.75rem', paddingRight: '3rem' }} />
                <button type="button"
                  onClick={() => setShowPwd(p => !p)}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-faint)', padding: 0 }}>
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', color: '#EF4444', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}

            {/* Submit */}
            <button id="auth-submit" type="submit" className="btn btn-primary w-full"
              style={{ padding: '1rem', fontSize: '1rem', marginTop: '0.5rem' }}
              disabled={loading}>
              {loading
                ? <><span className="spinner" /> {mode === 'signin' ? 'Signing in...' : 'Creating account...'}</>
                : <>{mode === 'signin' ? 'Sign In' : 'Create Account'} <ArrowRight size={18} /></>
              }
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); }}
              style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 600, cursor: 'pointer', fontSize: 'inherit' }}>
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
