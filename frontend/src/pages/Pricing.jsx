import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: '/month',
    dot: '#dff5e0',
    features: [
      '10 analyses / month',
      'Basic ATS score',
      'Section breakdown',
      'Email support',
    ],
    cta: 'Get Started',
    ctaStyle: 'btn-s',
    action: 'upload',
  },
  {
    name: 'Pro',
    price: '₹499',
    period: '/month',
    dot: '#dceef8',
    popular: true,
    features: [
      'Unlimited analyses',
      'Advanced ATS scoring',
      'Job description matching',
      'Keyword optimization',
      'Priority support',
      'Resume templates',
    ],
    cta: 'Start Free Trial',
    ctaStyle: 'btn-p',
    action: 'signup',
  },
  {
    name: 'Team',
    price: '₹1,999',
    period: '/month',
    dot: '#f5efd0',
    features: [
      'Everything in Pro',
      '10 team members',
      'Bulk resume analysis',
      'Analytics dashboard',
      'API access',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    ctaStyle: 'btn-s',
    action: 'contact',
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  const handleAction = (plan) => {
    if (plan.action === 'contact') {
      window.open("mailto:arifalipstr1916@gmail.com?subject=Team Plan Inquiry", '_blank');
    } else if (plan.action === 'signup') {
      localStorage.setItem('aurae_selected_plan', plan.name);
      toast.success(`${plan.name} plan selected! Redirecting...`, { position: 'bottom-center' });
      setTimeout(() => navigate('/auth'), 1500);
    } else if (plan.action === 'upload') {
      localStorage.setItem('aurae_selected_plan', plan.name);
      toast.success(`${plan.name} plan activated! Redirecting...`, { position: 'bottom-center' });
      setTimeout(() => navigate('/upload'), 1500);
    }
  };

  return (
    <div className="page" style={{ padding: '56px 36px 72px', maxWidth: 1040, margin: '0 auto' }}>
      <Toaster />
      <h2 style={{
        fontFamily: "'DM Serif Display', Georgia, serif",
        fontSize: 'clamp(40px, 6vw, 56px)',
        fontWeight: 400, textAlign: 'center', marginBottom: 8,
      }}>
        Simple Pricing
      </h2>
      <p style={{ textAlign: 'center', color: 'var(--mid)', fontSize: 15, marginBottom: 52 }}>
        Start free. Upgrade when you're ready.
      </p>

      <div style={{
        display: 'flex', gap: 22, justifyContent: 'center', flexWrap: 'wrap',
      }}>
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="card"
            style={{
              flex: '1 1 250px', maxWidth: 292,
              padding: '34px 28px',
              position: 'relative',
              border: plan.popular
                ? '2px solid rgba(85,148,204,.5)'
                : '1px solid var(--border)',
            }}
          >
            {plan.popular && (
              <div style={{
                position: 'absolute', top: -13, left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--dark)', color: '#fff',
                borderRadius: 100, padding: '4px 17px',
                fontSize: 11, fontWeight: 800,
                whiteSpace: 'nowrap', letterSpacing: '.02em',
              }}>
                Most Popular
              </div>
            )}

            <div style={{
              width: 42, height: 42, borderRadius: 13,
              background: plan.dot, marginBottom: 18,
            }} />

            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 3 }}>{plan.name}</div>

            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 2,
              margin: '11px 0 22px',
            }}>
              <span style={{
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: 40, fontWeight: 400, letterSpacing: '-1.5px',
              }}>
                {plan.price}
              </span>
              <span style={{ fontSize: 13, color: 'var(--light)' }}>{plan.period}</span>
            </div>

            {plan.features.map((f) => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 11 }}>
                <span style={{ color: 'var(--green)', fontSize: 14, fontWeight: 800, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 13, color: 'var(--mid)' }}>{f}</span>
              </div>
            ))}

            <button
              className={plan.ctaStyle}
              onClick={() => handleAction(plan)}
              style={{
                width: '100%', marginTop: 22,
                padding: 13, borderRadius: 12,
                fontSize: 14, textAlign: 'center', cursor: 'pointer',
                ...(plan.ctaStyle === 'btn-s'
                  ? { background: 'transparent', border: '1.5px solid rgba(26,37,53,.22)', borderRadius: 12 }
                  : {}),
              }}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 52 }}>
        <p style={{ color: 'var(--mid)', fontSize: 14 }}>
          Questions? Check our{' '}
          <a href="#" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>FAQ</a>
          {' '}or{' '}
          <a href="mailto:arifalipstr1916@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
            email us
          </a>.
        </p>
      </div>
    </div>
  );
}