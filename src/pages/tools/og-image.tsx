import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PRESETS = [
  { label: 'dark', bg: '#262626', text: '#f0ede8', sub: '#888' },
  { label: 'black', bg: '#0a0a0a', text: '#ffffff', sub: '#666' },
  { label: 'white', bg: '#ffffff', text: '#111111', sub: '#666' },
  { label: 'navy', bg: '#0f172a', text: '#f8fafc', sub: '#94a3b8' },
];

const s = {
  page: {
    minHeight: '100svh',
    background: '#262626',
    fontFamily: 'Manrope, system-ui, sans-serif',
    color: '#f0ede8',
    padding: '48px 40px',
  } as React.CSSProperties,
  back: {
    fontSize: '12px',
    color: '#555',
    textDecoration: 'none',
    letterSpacing: '0.02em',
    display: 'inline-block',
    marginBottom: '40px',
  } as React.CSSProperties,
  heading: {
    fontSize: 'clamp(24px, 4vw, 42px)',
    fontWeight: 300,
    letterSpacing: '-0.03em',
    margin: '0 0 6px',
  } as React.CSSProperties,
  sub: {
    fontSize: '13px',
    color: '#666',
    margin: '0 0 40px',
    fontWeight: 300,
  } as React.CSSProperties,
  layout: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.4fr',
    gap: '40px',
    alignItems: 'start',
    maxWidth: '1000px',
  } as React.CSSProperties,
  label: {
    fontSize: '11px',
    color: '#555',
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    display: 'block',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    background: '#1e1e1e',
    border: '1px solid #333',
    borderRadius: '4px',
    color: '#f0ede8',
    fontSize: '13px',
    padding: '10px 12px',
    fontFamily: 'Manrope, system-ui, sans-serif',
    fontWeight: 300,
    outline: 'none',
    boxSizing: 'border-box' as const,
    marginBottom: '20px',
  } as React.CSSProperties,
  presets: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
    flexWrap: 'wrap' as const,
  },
  presetBtn: (active: boolean, bg: string) => ({
    padding: '6px 14px',
    border: `1px solid ${active ? '#f0ede8' : '#333'}`,
    borderRadius: '3px',
    background: bg,
    color: active ? '#f0ede8' : '#666',
    fontSize: '11px',
    cursor: 'pointer',
    fontFamily: 'Manrope, system-ui, sans-serif',
    letterSpacing: '0.04em',
  } as React.CSSProperties),
  downloadBtn: {
    marginTop: '20px',
    padding: '10px 24px',
    background: '#f0ede8',
    color: '#262626',
    border: 'none',
    borderRadius: '4px',
    fontSize: '12px',
    fontFamily: 'Manrope, system-ui, sans-serif',
    fontWeight: 400,
    cursor: 'pointer',
    letterSpacing: '0.02em',
    width: '100%',
  } as React.CSSProperties,
  preview: {
    border: '1px solid #333',
    borderRadius: '6px',
    overflow: 'hidden',
    position: 'sticky' as const,
    top: '24px',
  },
  previewLabel: {
    fontSize: '10px',
    color: '#444',
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    padding: '8px 12px',
    borderBottom: '1px solid #2e2e2e',
  },
  attribution: {
    fontSize: '11px',
    color: '#444',
    marginTop: '32px',
    fontWeight: 300,
  } as React.CSSProperties,
};

export const OgImageTool = () => {
  const [title, setTitle] = useState('my project');
  const [tagline, setTagline] = useState('a short description of what it does');
  const [url, setUrl] = useState('yoursite.com');
  const [preset, setPreset] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  const p = PRESETS[preset];

  const svgContent = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${p.bg}"/>
  <text x="80" y="270" font-family="system-ui, sans-serif" font-weight="300" font-size="68" fill="${p.text}" letter-spacing="-1">${title}</text>
  <text x="80" y="340" font-family="system-ui, sans-serif" font-weight="300" font-size="26" fill="${p.sub}">${tagline}</text>
  <text x="80" y="540" font-family="system-ui, sans-serif" font-weight="300" font-size="20" fill="${p.sub}">${url}</text>
</svg>`;

  const downloadSVG = () => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `og-${title.toLowerCase().replace(/\s+/g, '-')}.svg`;
    a.click();
  };

  const downloadPNG = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url_ = URL.createObjectURL(blob);
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = `og-${title.toLowerCase().replace(/\s+/g, '-')}.png`;
      a.click();
      URL.revokeObjectURL(url_);
    };
    img.src = url_;
  };

  return (
    <div style={s.page}>
      <Link to="/tools" style={s.back}>← tools</Link>
      <h1 style={s.heading}>og image generator</h1>
      <p style={s.sub}>free, no signup. generates 1200×630 svg + png.</p>

      <div style={s.layout}>
        {/* Controls */}
        <div>
          <label style={s.label}>title</label>
          <input
            style={s.input}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="your project name"
          />

          <label style={s.label}>tagline</label>
          <input
            style={s.input}
            value={tagline}
            onChange={e => setTagline(e.target.value)}
            placeholder="what does it do?"
          />

          <label style={s.label}>url</label>
          <input
            style={s.input}
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="yoursite.com"
          />

          <label style={s.label}>theme</label>
          <div style={s.presets}>
            {PRESETS.map((pr, i) => (
              <button
                key={pr.label}
                style={s.presetBtn(preset === i, pr.bg)}
                onClick={() => setPreset(i)}
              >
                {pr.label}
              </button>
            ))}
          </div>

          <button style={s.downloadBtn} onClick={downloadPNG}>
            download png
          </button>
          <button
            style={{ ...s.downloadBtn, marginTop: '8px', background: 'transparent', border: '1px solid #333', color: '#888' }}
            onClick={downloadSVG}
          >
            download svg
          </button>

          <p style={s.attribution}>
            built by <a href="https://ohm.quest" style={{ color: '#555', textDecoration: 'none' }}>om mishra</a>
          </p>
        </div>

        {/* Preview */}
        <div style={s.preview}>
          <div style={s.previewLabel}>preview — 1200×630</div>
          <svg
            viewBox="0 0 1200 630"
            style={{ width: '100%', display: 'block' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="1200" height="630" fill={p.bg} />
            <text x="80" y="270" fontFamily="system-ui, sans-serif" fontWeight={300} fontSize={68} fill={p.text} letterSpacing="-1">{title}</text>
            <text x="80" y="340" fontFamily="system-ui, sans-serif" fontWeight={300} fontSize={26} fill={p.sub}>{tagline}</text>
            <text x="80" y="540" fontFamily="system-ui, sans-serif" fontWeight={300} fontSize={20} fill={p.sub}>{url}</text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default OgImageTool;
