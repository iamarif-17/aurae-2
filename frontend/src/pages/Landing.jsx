import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5594cc" strokeWidth="2.2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    bg: '#dff0f8',
    title: 'ATS Score',
    desc: 'See exactly how applicant tracking systems rank your resume against any job posting.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#59a65d" strokeWidth="2.2" strokeLinecap="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    bg: '#dff5e0',
    title: 'Keyword Analysis',
    desc: 'Discover missing keywords that recruiters in your field actively search for.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c09028" strokeWidth="2.2" strokeLinecap="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    bg: '#f5efd0',
    title: 'AI Suggestions',
    desc: 'Get personalized, actionable improvements powered by Claude AI in seconds.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9060c8" strokeWidth="2.2" strokeLinecap="round">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    bg: '#eddff5',
    title: 'Section Scoring',
    desc: 'Pinpoint exactly which sections — skills, experience, education — need work.',
  },
];

const stats = [
  ['50K+', 'Resumes Analyzed'],
  ['94%',  'ATS Pass Rate'],
  ['3×',   'More Interviews'],
  ['<30s', 'Analysis Time'],
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="page" style={{ paddingBottom: 80 }}>
      {/* ── Hero ── */}
      <section style={{ textAlign: 'center', padding: '72px 40px 52px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(255,255,255,.72)',
          border: '1px solid rgba(255,255,255,.95)',
          borderRadius: 100, padding: '6px 18px',
          fontSize: 13, fontWeight: 600, color: 'var(--accent)',
          marginBottom: 22,
        }}>
          ✦ AI-Powered Resume Analysis
        </div>

        <h1 style={{
          fontFamily: "'DM Serif Display', Georgia, serif",
          fontSize: 'clamp(44px, 7vw, 78px)',
          fontWeight: 400, lineHeight: 1.05,
          letterSpacing: '-1px', marginBottom: 22, color: 'var(--dark)',
        }}>
          Your resume,<br />
          <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>reimagined.</em>
        </h1>

        <p style={{
          fontSize: 18, color: 'var(--mid)', maxWidth: 450,
          margin: '0 auto 36px', lineHeight: 1.72,
        }}>
          Upload your resume and get instant AI feedback on ATS score,
          keyword gaps, and actionable improvements.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            className="btn-p"
            onClick={() => navigate('/upload')}
            style={{ fontSize: 15, padding: '14px 38px' }}
          >
            Analyze My Resume →
          </button>
          <button
            className="btn-s"
            onClick={() => navigate('/pricing')}
            style={{ fontSize: 15, padding: '14px 38px' }}
          >
            View Pricing
          </button>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{
        display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center',
        padding: '0 40px 52px', maxWidth: 1080, margin: '0 auto',
      }}>
        {features.map((f) => (
          <div key={f.title} className="card" style={{ flex: '1 1 210px', maxWidth: 248, padding: '26px' }}>
            <div style={{
              width: 46, height: 46, borderRadius: 14,
              background: f.bg, display: 'flex', alignItems: 'center',
              justifyContent: 'center', marginBottom: 14,
            }}>
              {f.icon}
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 7 }}>{f.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--mid)', lineHeight: 1.62 }}>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* ── Stats ── */}
      <section className="card" style={{
        maxWidth: 840, margin: '0 auto 64px',
        padding: '28px 44px',
        display: 'flex', justifyContent: 'space-around',
        flexWrap: 'wrap', gap: 20,
      }}>
        {stats.map(([val, lbl]) => (
          <div key={lbl} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: "'DM Serif Display', Georgia, serif",
              fontSize: 36, fontWeight: 400,
              letterSpacing: '-1px', lineHeight: 1,
              color: 'var(--dark)',
            }}>
              {val}
            </div>
            <div style={{ fontSize: 12, color: 'var(--light)', marginTop: 4 }}>{lbl}</div>
          </div>
        ))}
      </section>

      {/* ── CTA Banner ── */}
      <section style={{
        maxWidth: 780, margin: '0 auto',
        padding: '0 40px',
      }}>
        <div className="card" style={{
          padding: '44px 48px',
          textAlign: 'center',
          background: 'rgba(26,37,53,0.92)',
          border: '1px solid rgba(255,255,255,.12)',
        }}>
          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 400, color: '#fff', marginBottom: 12,
          }}>
            Ready to land more interviews?
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,.6)', marginBottom: 28 }}>
            Join 50,000+ job seekers who improved their resume with Aurae.
          </p>
          <button
            className="btn-p"
            onClick={() => navigate('/upload')}
            style={{ background: '#fff', color: 'var(--dark)', fontSize: 15, padding: '14px 36px' }}
          >
            Get Started Free →
          </button>
        </div>
      </section>
    </div>
  );
}
