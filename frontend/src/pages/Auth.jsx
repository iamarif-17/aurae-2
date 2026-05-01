import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle, signInEmail, signUpEmail } from '../lib/firebase';

export default function Auth() {
  const navigate         = useNavigate();
  const [mode, setMode]  = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail]= useState('');
  const [pw, setPw]      = useState('');
  const [error, setError]= useState('');
  const [busy, setBusy]  = useState(false);

  const go = () => navigate('/upload');

  const handleGoogle = async () => {
    setBusy(true); setError('');
    try { await signInWithGoogle(); go(); }
    catch (e) { setError(e.message); }
    finally { setBusy(false); }
  };

  const handleEmail = async () => {
    if (!email || !pw) return setError('Please fill in all fields.');
    setBusy(true); setError('');
    try {
      mode === 'signin'
        ? await signInEmail(email, pw)
        : await signUpEmail(email, pw);
      go();
    } catch (e) { setError(e.message); }
    finally { setBusy(false); }
  };

  return (
    <div className="page" style={{
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '40px 24px',
    }}>
      <div className="card" style={{ maxWidth: 420, width: '100%', padding: '40px 36px' }}>
        <h2 style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 30, fontWeight: 400,
          textAlign: 'center', marginBottom: 6,
        }}>
          {mode === 'signin' ? 'Welcome back' : 'Create account'}
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--mid)', fontSize: 13, marginBottom: 28 }}>
          {mode === 'signin'
            ? 'Sign in to access your resume analyses'
            : 'Start analyzing your resume for free'}
        </p>

        {/* Google */}
        <button
          onClick={handleGoogle}
          disabled={busy}
          style={{
            width: '100%', padding: 13,
            borderRadius: 12, border: '1.5px solid rgba(26,37,53,.18)',
            background: '#fff', cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            marginBottom: 20,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 33 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.1-2.7-.4-4z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.5 18.9 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.3C29.6 35.5 26.9 36 24 36c-5.2 0-9.7-3-11.3-7.5L6 33.2C9.4 39.5 16.2 44 24 44z"/>
            <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.2-2.3 4.1-4.2 5.5l.1-.1 6.2 5.3C36.9 39.5 44 34 44 24c0-1.3-.1-2.7-.4-4z"/>
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div style={{ position: 'relative', textAlign: 'center', margin: '0 0 20px' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(0,0,0,.08)' }} />
          <span style={{ position: 'relative', background: 'rgba(232,244,251,.9)', padding: '0 12px', fontSize: 12, color: 'var(--light)' }}>
            or continue with email
          </span>
        </div>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          style={{ marginBottom: 16 }}
        />

        {error && (
          <div style={{
            background: 'rgba(217,90,74,.09)', border: '1px solid rgba(217,90,74,.28)',
            borderRadius: 10, padding: '10px 14px',
            fontSize: 13, color: '#b84a38', marginBottom: 14,
          }}>
            {error}
          </div>
        )}

        <button
          className="btn-p"
          onClick={handleEmail}
          disabled={busy}
          style={{ width: '100%', padding: 14, fontSize: 15, borderRadius: 12 }}
        >
          {mode === 'signin' ? 'Sign In' : 'Create Account'}
        </button>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--mid)', marginTop: 20 }}>
          {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); }}
            style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}
          >
            {mode === 'signin' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}
