import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeFile, analyzeText } from '../lib/api';

export default function Upload() {
  const navigate    = useNavigate();
  const fileRef     = useRef();
  const [text, setText]           = useState('');
  const [jd, setJd]               = useState('');
  const [file, setFile]           = useState(null);
  const [dragOver, setDragOver]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  const handleFile = useCallback((f) => {
    if (!f) return;
    setFile(f);
    // Also read as text so user can see/edit it
    const reader = new FileReader();
    reader.onload = (e) => setText(e.target.result);
    reader.readAsText(f);
  }, []);

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleAnalyze = async () => {
    if (!text.trim() && !file) return;
    setError('');
    setLoading(true);
    try {
      let result;
      if (file) {
        result = await analyzeFile(file, jd);
      } else {
        result = await analyzeText(text, jd);
      }
      navigate('/results', { state: { analysis: result } });
    } catch (err) {
      console.error(err);
      setError('Analysis failed. Please check your API connection and try again.');
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="page" style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 18,
    }}>
      <div className="spinner" />
      <p style={{ color: 'var(--mid)', fontSize: 15 }}>Analyzing your resume with AI…</p>
      <p style={{ color: 'var(--light)', fontSize: 13 }}>This usually takes under 30 seconds</p>
    </div>
  );

  return (
    <div className="page" style={{
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '36px 24px',
    }}>
      <div className="card" style={{ maxWidth: 640, width: '100%', padding: '44px' }}>

        <h2 style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 34, fontWeight: 400,
          textAlign: 'center', marginBottom: 7,
        }}>
          Upload Your Resume
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--mid)', fontSize: 14, marginBottom: 30 }}>
          Paste your resume text or drop a file — we'll handle the rest
        </p>

        {/* Drop zone */}
        <div
          onClick={() => fileRef.current.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          style={{
            border: `2px dashed ${dragOver ? 'var(--accent)' : 'rgba(85,148,204,.3)'}`,
            borderRadius: 18,
            padding: '34px 20px',
            textAlign: 'center',
            cursor: 'pointer',
            background: dragOver ? 'rgba(85,148,204,.07)' : 'rgba(255,255,255,.32)',
            transition: 'all .2s',
            marginBottom: 18,
          }}
        >
          <div style={{
            width: 52, height: 52, borderRadius: 16,
            background: 'rgba(85,148,204,.13)',
            margin: '0 auto 12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5594cc" strokeWidth="2.2" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>
            {file ? `✓ ${file.name}` : 'Drop your resume here'}
          </p>
          <small style={{ color: 'var(--light)', fontSize: 12 }}>
            Click to browse · PDF and TXT supported
          </small>
          <input
            type="file"
            ref={fileRef}
            accept=".pdf,.txt"
            style={{ display: 'none' }}
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>

        {/* Divider */}
        <div style={{ position: 'relative', textAlign: 'center', margin: '16px 0' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'rgba(0,0,0,.08)' }} />
          <span style={{
            position: 'relative',
            background: 'rgba(232,244,251,.9)',
            padding: '0 14px',
            fontSize: 12, color: 'var(--light)',
          }}>
            or paste your resume text
          </span>
        </div>

        <textarea
          value={text}
          onChange={(e) => { setText(e.target.value); setFile(null); }}
          placeholder="Paste your full resume here…"
          style={{ height: 170, marginBottom: 16 }}
        />

        <label style={{
          fontSize: 11, fontWeight: 700, color: 'var(--mid)',
          display: 'block', marginBottom: 7,
          textTransform: 'uppercase', letterSpacing: '.05em',
        }}>
          Job Description{' '}
          <span style={{ fontWeight: 400, textTransform: 'none', color: 'var(--light)' }}>
            (optional — for better matching)
          </span>
        </label>
        <textarea
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          placeholder="Paste the job description to match your resume against…"
          style={{ height: 90, marginBottom: 20 }}
        />

        {error && (
          <div style={{
            background: 'rgba(217,90,74,.1)', border: '1px solid rgba(217,90,74,.3)',
            borderRadius: 12, padding: '12px 16px',
            fontSize: 13, color: '#b84a38', marginBottom: 16,
          }}>
            {error}
          </div>
        )}

        <button
          className="btn-p"
          onClick={handleAnalyze}
          disabled={!text.trim() && !file}
          style={{ width: '100%', padding: 16, fontSize: 15, borderRadius: 14 }}
        >
          Analyze Resume →
        </button>
      </div>
    </div>
  );
}
