export default function ScoreRing({ score, size = 144, label }) {
  const r     = size * 0.4;
  const circ  = 2 * Math.PI * r;
  const dash  = (score / 100) * circ;
  const sw    = size * 0.072;
  const color = score >= 80 ? '#59a65d' : score >= 60 ? '#dba93a' : '#d95a4a';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg
          width={size}
          height={size}
          style={{ transform: 'rotate(-90deg)' }}
        >
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none"
            stroke="rgba(0,0,0,0.07)"
            strokeWidth={sw}
          />
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none"
            stroke={color}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circ}`}
            style={{ transition: 'stroke-dasharray 1.1s cubic-bezier(.4,0,.2,1)' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: size > 100 ? 30 : 17, fontWeight: 900, letterSpacing: '-1px' }}>
            {score}
          </span>
          <span style={{ fontSize: 11, color: 'var(--light)' }}>/ 100</span>
        </div>
      </div>
      {label && (
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--mid)', textTransform: 'capitalize' }}>
          {label}
        </span>
      )}
    </div>
  );
}
