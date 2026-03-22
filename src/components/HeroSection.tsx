import { useState, useEffect, useCallback } from 'react';

// ── Data ──────────────────────────────────────────────────────
const projects: { name: string; desc: string; url: string; gh?: boolean }[] = [
  { name: 'capsule', desc: 'youtube → email courses', url: 'https://capsule.ohm.quest' },
  { name: 'studex', desc: 'edtech platform · india', url: 'https://studexa.ohm.quest' },
  { name: 'sheetsai', desc: 'ai for google sheets', url: 'https://github.com/howwohmm/sheetsai', gh: true },
  { name: 'sidequest-maxxer', desc: 'workspace tool', url: 'https://github.com/howwohmm/sidequest-maxxer', gh: true },
  { name: 'refresh', desc: 'chrome new tab', url: 'https://github.com/howwohmm/refresh-by-ohm', gh: true },
  { name: "paul graham's", desc: 'chrome quotes extension', url: 'https://github.com/howwohmm/contrarian-by-ohm', gh: true },
];

const links = [
  { name: 'twitter', url: 'https://x.com/ohmdreams' },
  { name: 'github', url: 'https://github.com/howwohmm' },
  { name: 'instagram', url: 'https://www.instagram.com/ohmdreams/' },
  { name: 'substack', url: 'https://substack.com/@ohmdreams' },
];

// ── Types ─────────────────────────────────────────────────────
interface NowPlaying {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumArt?: string;
}

// ── Styles ────────────────────────────────────────────────────
const label: React.CSSProperties = {
  fontSize: '11px',
  color: 'var(--text-dim)',
  letterSpacing: '0.05em',
  display: 'block',
};

const section = (extra?: React.CSSProperties): React.CSSProperties => ({
  flex: 1,
  borderBottom: '1px solid var(--border)',
  padding: '0 24px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '8px',
  ...extra,
});

const bioLink: React.CSSProperties = {
  color: 'inherit',
  textDecoration: 'underline',
  textDecorationColor: 'var(--text-ghost)',
  textUnderlineOffset: '2px',
};

const SPOTIFY_API = 'https://ohm-spotify-wheat.vercel.app/api/now-playing';

// ── Component ─────────────────────────────────────────────────
export const HeroSection = () => {
  const [time, setTime] = useState('--:--:--');
  const [np, setNp] = useState<NowPlaying>({ isPlaying: false });
  const [lastTrack, setLastTrack] = useState<Pick<NowPlaying, 'title' | 'artist' | 'albumArt'>>({});
  const [accentColor, setAccentColor] = useState('#c8c8c8');
  const [bioOpen, setBioOpen] = useState(false);
  const [visits, setVisits] = useState<number | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') return (localStorage.getItem('theme') as 'dark' | 'light') ?? 'dark';
    return 'dark';
  });

  // Theme effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Clock
  useEffect(() => {
    const tick = () => {
      const ist = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
      const h = String(ist.getUTCHours()).padStart(2, '0');
      const m = String(ist.getUTCMinutes()).padStart(2, '0');
      const s = String(ist.getUTCSeconds()).padStart(2, '0');
      setTime(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Daily visitor counter
  useEffect(() => {
    fetch('https://ohm-spotify-wheat.vercel.app/api/visit')
      .then(r => r.json())
      .then(d => setVisits(d.count))
      .catch(() => {});
  }, []);

  // Spotify poll
  const fetchNp = useCallback(async () => {
    try {
      const res = await fetch(SPOTIFY_API);
      if (!res.ok) return;
      const data = await res.json();
      setNp(data);
      if (data.isPlaying) setLastTrack({ title: data.title, artist: data.artist, albumArt: data.albumArt });
    } catch { /* silent */ }
  }, []);

  useEffect(() => {
    fetchNp();
    const id = setInterval(fetchNp, 5_000);
    return () => clearInterval(id);
  }, [fetchNp]);

  // Dominant hue extraction
  useEffect(() => {
    const art = np.albumArt ?? lastTrack.albumArt;
    if (!art) { setAccentColor(theme === 'dark' ? '#c8c8c8' : '#555'); return; }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 40; canvas.height = 40;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, 40, 40);
      const d = ctx.getImageData(0, 0, 40, 40).data;
      let r = 0, g = 0, b = 0;
      for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i+1]; b += d[i+2]; }
      const px = d.length / 4;
      r /= px * 255; g /= px * 255; b /= px * 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min;
      let h = 0;
      if (delta > 0.01) {
        if (max === r) h = ((g - b) / delta) % 6;
        else if (max === g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;
        h = Math.round(h * 60);
        if (h < 0) h += 360;
      }
      // Light mode: darker accent. Dark mode: lighter accent.
      setAccentColor(theme === 'dark' ? `hsl(${h}, 65%, 72%)` : `hsl(${h}, 55%, 38%)`);
    };
    img.onerror = () => setAccentColor(theme === 'dark' ? '#c8c8c8' : '#555');
    img.src = art;
  }, [np.albumArt, lastTrack.albumArt, theme]);

  const hasArt = !!(np.albumArt || lastTrack.albumArt);

  return (
    <div className="hero-grid">

      {/* ── Left: name (toggles bio) ── */}
      <div className="hero-name" style={{ position: 'relative' }} onClick={() => setBioOpen(false)}>

        {/* Closed — big centered name + hint */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px',
          opacity: bioOpen ? 0 : 1,
          transform: bioOpen ? 'translateY(-12px)' : 'translateY(0)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          pointerEvents: bioOpen ? 'none' : 'auto',
          cursor: 'pointer',
        }} onClick={(e) => { e.stopPropagation(); setBioOpen(true); }}>
          <h1 style={{ fontSize: 'clamp(72px, 13vw, 200px)', fontWeight: 300, letterSpacing: '-0.04em', color: 'var(--white)', lineHeight: 1, margin: 0 }}>
            ohm.
          </h1>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 300, margin: 0, letterSpacing: '0.02em' }}>
            tap to get to know me in one minute
          </p>
        </div>

        {/* Open — name slides up, bio appears */}
        <div style={{
          position: 'absolute', inset: 0,
          padding: 'clamp(28px, 4vw, 52px)',
          display: 'flex', flexDirection: 'column', gap: '18px',
          opacity: bioOpen ? 1 : 0,
          transform: bioOpen ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          pointerEvents: bioOpen ? 'auto' : 'none',
          overflowY: 'auto',
        }} onClick={(e) => e.stopPropagation()}>

          <h1
            style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', fontWeight: 300, letterSpacing: '-0.03em', color: 'var(--white)', lineHeight: 1, margin: 0, cursor: 'pointer', flexShrink: 0 }}
            onClick={() => setBioOpen(false)}
          >
            ohm.
          </h1>

          <div style={{ fontSize: '11px', color: 'var(--text-dim)', lineHeight: 1.8, fontWeight: 300, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ margin: 0 }}>21, awake and figuring it out.</p>
            <p style={{ margin: 0 }}>
              hi. i'm ohm. i build things that solve my problems and for the internet -- mostly because i got tired of waiting for them to exist.
            </p>
            <p style={{ margin: 0 }}>
              i spend my nights shipping small products that solve real problems, writing raw notes about money, work, things i know / i don't, adulting and the tools that keep me up full night -- i rarely post but i do --{' '}
              <a href="https://substack.com/@ohmdreams" target="_blank" rel="noopener noreferrer" style={bioLink}>here</a>.
            </p>
            <p style={{ margin: 0 }}>
              previously i worked with{' '}
              <a href="https://port.numberless.tech/" target="_blank" rel="noopener noreferrer" style={bioLink}>port, by numberless</a>
              {' '}on marketing, design, copy, and what not. now i'm slowly learning / helping founders and creators with landing pages, writing words that actually sound like them.
            </p>
            <p style={{ margin: 0 }}>
              i like minimal interfaces, tasteful designs, and music. i shoot photos, i think and freewrite every day for an hour and i write when i need to solve problems.
            </p>
            <p style={{ margin: 0 }}>
              this year you'll see me mostly on ad shoots -- helping my frens with shoot day ops, camera operations and making tasteful product videos.
            </p>
            <p style={{ margin: 0 }}>i'm also actively "vibe coding" // learning the terms -- claude code maxxer.</p>
            <p style={{ margin: 0 }}>
              videos i've contributed to:{' '}
              <a href="https://x.com/runable_hq/status/1986092697464234053" target="_blank" rel="noopener noreferrer" style={bioLink}>runable launch</a>
              {' · '}
              <a href="https://x.com/heettike/status/1947718407744590077" target="_blank" rel="noopener noreferrer" style={bioLink}>masti with heet</a>
              {' · '}
              <a href="https://x.com/dayadzn/status/2024136520781988322" target="_blank" rel="noopener noreferrer" style={bioLink}>mave health</a>
              {' · '}
              <a href="https://x.com/ycombinator/status/2026341356910624956" target="_blank" rel="noopener noreferrer" style={bioLink}>avalahalli forest</a>
            </p>
          </div>
        </div>
      </div>

      {/* ── Right: widgets ── */}
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

        {/* Clock + Spotify */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--border)' }}>

          {/* Clock + Weather */}
          <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px', borderRight: '1px solid var(--border)' }}>
            <span style={label}>bengaluru</span>
            <span style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 300, color: 'var(--white)', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
              {time}
            </span>
            {visits != null && (
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 300 }}>
                {visits} {visits === 1 ? 'visit' : 'visits'} today
              </span>
            )}
          </div>

          {/* Spotify */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            {hasArt && (
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${np.albumArt ?? lastTrack.albumArt})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                filter: 'blur(48px)', transform: 'scale(1.4)',
                opacity: np.isPlaying ? 0.28 : 0.12,
                transition: 'opacity 1.5s ease', zIndex: 0,
              }} />
            )}
            {hasArt && (
              <img src={np.albumArt ?? lastTrack.albumArt} alt="album art" style={{
                position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
                width: '72px', height: '72px', objectFit: 'cover', display: 'block',
                opacity: np.isPlaying ? 1 : 0.35, zIndex: 1,
              }} />
            )}
            <div style={{
              position: 'relative', zIndex: 1,
              paddingLeft: hasArt ? '100px' : '20px', paddingRight: '20px',
              height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={label}>listening</span>
                {np.isPlaying && <div className="eq-bars"><div className="eq-bar" /><div className="eq-bar" /><div className="eq-bar" /><div className="eq-bar" /><div className="eq-bar" /></div>}
              </div>
              {(np.isPlaying || lastTrack.title) ? (
                <>
                  <p style={{ fontSize: '14px', color: np.isPlaying ? accentColor : 'var(--text-muted)', fontWeight: 400, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textShadow: '0 1px 4px rgba(0,0,0,0.6)', transition: 'color 1s ease' }}>
                    {np.title ?? lastTrack.title}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 300, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {np.artist ?? lastTrack.artist}{!np.isPlaying && ' -- paused'}
                  </p>
                </>
              ) : (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 300, margin: 0 }}>not playing</p>
              )}
            </div>
          </div>
        </div>

        {/* Right now */}
        <div style={section()}>
          <span style={label}>right now</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px 20px' }}>
            {['ad shoots + camera ops', 'helping founders with anything and everything i know', 'claude code maxxing'].map(item => (
              <span key={item} style={{ fontSize: '14px', color: 'var(--text)', fontWeight: 300 }}>{item}</span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', borderBottom: '1px solid var(--border)' }}>
          <div style={{ padding: '0 24px', display: 'flex', alignItems: 'center', height: '32px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
            <span style={label}>things i built</span>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {projects.map(p => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="project-row"
                style={{ flex: 1, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <span className="project-name" style={{ fontSize: '15px', color: 'var(--text)', fontWeight: 400, letterSpacing: '-0.01em', transition: 'color 0.15s' }}>
                  {p.name}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {p.gh && <span style={{ fontSize: '10px', color: 'var(--text-ghost)', letterSpacing: '0.05em' }}>gh</span>}
                  <span style={{ fontSize: '13px', color: 'var(--text-dim)', fontWeight: 300 }}>{p.desc} ↗</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ flexShrink: 0, height: '40px', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>ohm.quest</span>
            <button
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              style={{
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                fontFamily: 'Manrope, sans-serif', fontSize: '11px', color: 'var(--text-ghost)',
                letterSpacing: '0.04em', transition: 'color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-ghost)')}
            >
              {theme === 'dark' ? 'light' : 'dark'}
            </button>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            {links.map(l => (
              <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 300, transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
              >
                {l.name}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
