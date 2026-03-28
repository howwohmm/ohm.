import { Link } from 'react-router-dom';

const tools = [
  {
    slug: 'og-image',
    name: 'og image generator',
    desc: 'generate open graph images for your site or project. no signup, no watermark.',
    tag: 'design',
  },
];

const s = {
  page: {
    minHeight: '100svh',
    background: '#262626',
    fontFamily: 'Manrope, system-ui, sans-serif',
    color: '#f0ede8',
    padding: '64px 40px',
  } as React.CSSProperties,
  back: {
    fontSize: '12px',
    color: '#555',
    textDecoration: 'none',
    letterSpacing: '0.02em',
    display: 'inline-block',
    marginBottom: '48px',
  } as React.CSSProperties,
  heading: {
    fontSize: 'clamp(32px, 5vw, 56px)',
    fontWeight: 300,
    letterSpacing: '-0.03em',
    margin: '0 0 8px',
    color: '#f0ede8',
  } as React.CSSProperties,
  sub: {
    fontSize: '14px',
    color: '#666',
    fontWeight: 300,
    margin: '0 0 56px',
  } as React.CSSProperties,
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1px',
    background: '#333',
    border: '1px solid #333',
    maxWidth: '900px',
  } as React.CSSProperties,
  card: {
    background: '#262626',
    padding: '28px',
    textDecoration: 'none',
    display: 'block',
    transition: 'background 0.15s',
  } as React.CSSProperties,
  tag: {
    fontSize: '10px',
    color: '#555',
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    marginBottom: '12px',
  },
  cardName: {
    fontSize: '16px',
    fontWeight: 400,
    color: '#f0ede8',
    marginBottom: '8px',
    letterSpacing: '-0.01em',
  },
  cardDesc: {
    fontSize: '12px',
    color: '#666',
    fontWeight: 300,
    lineHeight: 1.6,
    margin: 0,
  },
};

export const ToolsIndex = () => (
  <div style={s.page}>
    <Link to="/" style={s.back}>← ohm.</Link>
    <h1 style={s.heading}>tools</h1>
    <p style={s.sub}>free tools by om mishra — built because i needed them</p>
    <div style={s.grid}>
      {tools.map(tool => (
        <Link
          key={tool.slug}
          to={`/tools/${tool.slug}`}
          style={s.card}
          onMouseEnter={e => (e.currentTarget.style.background = '#2e2e2e')}
          onMouseLeave={e => (e.currentTarget.style.background = '#262626')}
        >
          <div style={s.tag}>{tool.tag}</div>
          <div style={s.cardName}>{tool.name}</div>
          <p style={s.cardDesc}>{tool.desc}</p>
        </Link>
      ))}
    </div>
  </div>
);

export default ToolsIndex;
