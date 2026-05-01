import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ScoreRing from '../components/ScoreRing';

export default function Results() {
  const { state }  = useLocation();
  const navigate   = useNavigate();
  const analysis   = state?.analysis;

  useEffect(() => {
    if (!analysis) navigate('/upload', { replace: true });
  }, [analysis, navigate]);

  if (!analysis) return null;

  const { overallScore, atsScore, sections, strengths, improvements, keywords, summary } = analysis;

  const scoreColor = (s) =>
    s >= 80 ? 'var(--green)' : s >= 60 ? 'var(--amber)' : 'var(--red)';

  return (
    <div className="page" style={{ padding: '44px 36px 72px', maxWidth: 960, margin: '0 auto' }}>

      <h2 style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize: 'clamp(32px, 5vw, 46px)',
        fontWeight: 400, textAlign: 'center', marginBottom: 8,
      }}>
        Your Analysis
      </h2>
      <p style={{
        textAlign: 'center', color: 'var(--mid)', fontSize: 14,
        maxWidth: 580, margin: '0 auto 36px', lineHeight: 1.7,
      }}>
        {summary}
      </p>

      {/* ── Score rings ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
        {[
          { label: 'Overall Score', score: overallScore },
          { label: 'ATS Score',     score: atsScore },
        ].map(({ label, score }) => (
          <div key={label} className="card" style={{ padding: '32px 24px', textAlign: 'center' }}>
            <p style={{
              fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '.1em', color: 'var(--light)', marginBottom: 14,
            }}>
              {label}
            </p>
            <ScoreRing score={score} size={144} />
          </div>
        ))}
      </div>

      {/* ── Section breakdown ── */}
      <div className="card" style={{ marginBottom: 18 }}>
        <div style={{ padding: '22px 26px 12px' }}>
          <h3 style={{ fontSize: 15, fontWeight: 700 }}>Section Breakdown</h3>
        </div>
        <div style={{
          display: 'flex', gap: 16, justifyContent: 'space-around',
          padding: '16px 28px 28px', flexWrap: 'wrap',
        }}>
          {Object.entries(sections).map(([key, val]) => (
            <div key={key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
              <ScoreRing score={val} size={76} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--mid)', textTransform: 'capitalize' }}>
                {key}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Strengths & Improvements ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 18 }}>
        <div className="card" style={{ padding: 26 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: 'var(--green)' }}>
            ✓ Strengths
          </h3>
          {strengths.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 11 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--sage)', marginTop: 5, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: 'var(--mid)', lineHeight: 1.55 }}>{s}</span>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: 26 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: 'var(--amber)' }}>
            ⚡ Improvements
          </h3>
          {improvements.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 11 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--amber)', marginTop: 5, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: 'var(--mid)', lineHeight: 1.55 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Keywords ── */}
      <div className="card" style={{ padding: 26, marginBottom: 32 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>🔑 Keywords Found</h3>
        <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
          {keywords.map((kw, i) => (
            <span key={i} style={{
              background: 'rgba(85,148,204,.11)',
              border: '1px solid rgba(85,148,204,.25)',
              borderRadius: 100, padding: '5px 16px',
              fontSize: 12, fontWeight: 700, color: 'var(--accent)',
            }}>
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* ── Actions ── */}
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center' }}>
        <button className="btn-s" onClick={() => navigate('/upload')}>
          ← Analyze Another
        </button>
        <button className="btn-p" onClick={() => navigate('/pricing')}>
          Upgrade for More →
        </button>
      </div>
    </div>
  );
}
