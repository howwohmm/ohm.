import { useState, useEffect, useCallback } from 'react';

// ── Data ──────────────────────────────────────────────────────
const projects: { name: string; desc: string; url: string; live: boolean }[] = [
  { name: 'capsule', desc: 'youtube → email courses', url: 'https://capsule.ohm.quest', live: true },
  { name: 'studex', desc: 'edtech platform · india', url: 'https://studex.ohm.quest', live: true },
  { name: 'refresh', desc: 'ai-powered new tab', url: '', live: false },
  { name: 'contrarian', desc: 'pg quotes chrome extension', url: '', live: false },
  { name: 'row0', desc: 'ai for spreadsheets', url: '', live: false },
  { name: 'oss-ghost', desc: 'autonomous foss contributor', url: '', live: false },
];

const links = [
  { name: 'twitter', url: 'https://x.com/ohmdreams' },
  { name: 'github', url: 'https://github.com/howwohmm' },
  { name: 'instagram', url: 'https://www.instagram.com/ohmdreams/' },
  { name: 'substack', url: 'https://substack.com/@ohmdreams' },
];

// ── Quotes (from contrarian) ─────────────────────────────────
const quotes = [
  { text: "It's better to make a few people really happy than to make a lot of people semi-happy.", source: "Startups in 13 Sentences", url: "http://www.paulgraham.com/13sentences.html" },
  { text: "Merely measuring something has an uncanny tendency to improve it.", source: "Startups in 13 Sentences", url: "http://www.paulgraham.com/13sentences.html" },
  { text: "You can get surprisingly far by just not giving up.", source: "Startups in 13 Sentences", url: "http://www.paulgraham.com/13sentences.html" },
  { text: "If people don't think you're weird, you're living badly.", source: "The Acceleration of Addictiveness", url: "http://www.paulgraham.com/addiction.html" },
  { text: "We'll increasingly be defined by what we say no to.", source: "The Acceleration of Addictiveness", url: "http://www.paulgraham.com/addiction.html" },
  { text: "There's a kind of excited curiosity that's both the engine and the rudder of great work.", source: "How to Do Great Work", url: "http://www.paulgraham.com/greatwork.html" },
  { text: "What are you excessively curious about — curious to a degree that would bore most other people? That's what you're looking for.", source: "How to Do Great Work", url: "http://www.paulgraham.com/greatwork.html" },
  { text: "Interest will drive you to work harder than mere diligence ever could.", source: "How to Do Great Work", url: "http://www.paulgraham.com/greatwork.html" },
  { text: "The trouble with planning is that it only works for achievements you can describe in advance.", source: "How to Do Great Work", url: "http://www.paulgraham.com/greatwork.html" },
  { text: "People who do great things don't get a lot done every day. They get something done, rather than nothing.", source: "How to Do Great Work", url: "http://www.paulgraham.com/greatwork.html" },
  { text: "If you don't try to be the best, you won't even be good.", source: "How to Do Great Work", url: "http://www.paulgraham.com/greatwork.html" },
  { text: "Good ideas have to seem bad to most people, or someone would have already explored them.", source: "How to Do Great Work", url: "http://www.paulgraham.com/greatwork.html" },
  { text: "Morale compounds via work: high morale helps you do good work, which increases your morale and helps you do even better work.", source: "How to Do Great Work", url: "http://www.paulgraham.com/greatwork.html" },
  { text: "Curiosity is the best guide. Your curiosity never lies, and it knows more than you do about what's worth paying attention to.", source: "How to Do Great Work", url: "http://www.paulgraham.com/greatwork.html" },
  { text: "Nine times out of ten, sitting around strategizing is just a form of procrastination.", source: "Superlinear Returns", url: "http://www.paulgraham.com/superlinear.html" },
  { text: "Whenever how well you do depends on how well you've done, you'll get exponential growth.", source: "Superlinear Returns", url: "http://www.paulgraham.com/superlinear.html" },
  { text: "If you're not learning, you're probably not on a path that leads to superlinear returns.", source: "Superlinear Returns", url: "http://www.paulgraham.com/superlinear.html" },
  { text: "Ambition tends to make you climb existing peaks, but if you stick close enough to an interesting enough question, it may grow into a mountain beneath you.", source: "Superlinear Returns", url: "http://www.paulgraham.com/superlinear.html" },
  { text: "If I had to put the recipe for genius into one sentence: to have a disinterested obsession with something that matters.", source: "The Bus Ticket Theory of Genius", url: "http://www.paulgraham.com/genius.html" },
  { text: "The paths that lead to new ideas tend to look unpromising. If they looked promising, other people would already have explored them.", source: "The Bus Ticket Theory of Genius", url: "http://www.paulgraham.com/genius.html" },
  { text: "Instead of gritting your teeth and pursuing what all your peers agree is the most promising line of research, maybe you should try doing something just for fun.", source: "The Bus Ticket Theory of Genius", url: "http://www.paulgraham.com/genius.html" },
  { text: "People can never have a fruitful argument about something that's part of their identity.", source: "Keep Your Identity Small", url: "http://www.paulgraham.com/identity.html" },
  { text: "The more labels you have for yourself, the dumber they make you.", source: "Keep Your Identity Small", url: "http://www.paulgraham.com/identity.html" },
  { text: "A single meeting can blow a whole afternoon, by breaking it into two pieces each too small to do anything hard in.", source: "Maker's Schedule, Manager's Schedule", url: "http://www.paulgraham.com/makersschedule.html" },
  { text: "Startups take off because the founders make them take off.", source: "Do Things that Don't Scale", url: "http://www.paulgraham.com/ds.html" },
  { text: "I have never once seen a startup lured down a blind alley by trying too hard to make their initial users happy.", source: "Do Things that Don't Scale", url: "http://www.paulgraham.com/ds.html" },
  { text: "Perfectionism is often an excuse for procrastination.", source: "Do Things that Don't Scale", url: "http://www.paulgraham.com/ds.html" },
  { text: "Relentlessly prune bullshit, don't wait to do things that matter, and savor the time you have.", source: "Life is Short", url: "http://www.paulgraham.com/vb.html" },
  { text: "Don't wait before climbing that mountain or writing that book or visiting your mother. You don't need to be constantly reminding yourself why you shouldn't wait. Just don't wait.", source: "Life is Short", url: "http://www.paulgraham.com/vb.html" },
  { text: "You take things for granted, and then they're gone.", source: "Life is Short", url: "http://www.paulgraham.com/vb.html" },
  { text: "The question is not how to avoid procrastination, but how to procrastinate well.", source: "Good and Bad Procrastination", url: "http://www.paulgraham.com/procrastination.html" },
  { text: "Unless you're working on the biggest things you could be working on, you're type-B procrastinating, no matter how much you're getting done.", source: "Good and Bad Procrastination", url: "http://www.paulgraham.com/procrastination.html" },
  { text: "The way to 'solve' procrastination is to let delight pull you instead of making a to-do list push you.", source: "Good and Bad Procrastination", url: "http://www.paulgraham.com/procrastination.html" },
  { text: "What one thinks about in the shower in the morning is more important than I'd thought.", source: "The Top Idea in Your Mind", url: "http://www.paulgraham.com/top.html" },
  { text: "Simple writing keeps you honest.", source: "Write Simply", url: "http://www.paulgraham.com/simply.html" },
  { text: "Style is doing things in a distinctive way without trying to. Trying to is affectation.", source: "How to Do Great Work", url: "http://www.paulgraham.com/greatwork.html" },
  { text: "Nerds have a kind of innocent boldness that's exactly what you need in doing great work.", source: "How to Do Great Work", url: "http://www.paulgraham.com/greatwork.html" },
  { text: "One of the biggest things holding people back from doing great work is the fear of making something lame.", source: "Early Work", url: "http://www.paulgraham.com/early.html" },
  { text: "Being slightly overconfident armors you against both other people's skepticism and your own.", source: "Early Work", url: "http://www.paulgraham.com/early.html" },
  { text: "Determination is effectively the product of will and discipline.", source: "The Anatomy of Determination", url: "http://www.paulgraham.com/determination.html" },
  { text: "When you take ambitious people and put them together with other ambitious people, they bloom like dying plants given water.", source: "The Anatomy of Determination", url: "http://www.paulgraham.com/determination.html" },
];

// seeded daily quote — same quote all day, rotates at midnight IST
const getDailyQuote = () => {
  const ist = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
  const daysSinceEpoch = Math.floor(ist.getTime() / 86400000);
  return quotes[daysSinceEpoch % quotes.length];
};

// ── Types ─────────────────────────────────────────────────────
interface NowPlaying {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumArt?: string;
}

interface Status {
  active: boolean;
  text?: string;
  emoji?: string;
  ago?: number; // minutes
}

interface GithubActivity {
  hasActivity: boolean;
  repo?: string;
  action?: string;
  ago?: number; // minutes
}

interface GithubStreak {
  streak: number;
  commitsToday: number;
  hasActivity: boolean;
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

const API_BASE = 'https://ohm-spotify-wheat.vercel.app/api';

const formatAgo = (mins: number): string => {
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const h = Math.floor(mins / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
};

// ── Component ─────────────────────────────────────────────────
export const HeroSection = () => {
  const [time, setTime] = useState('--:--:--');
  const [np, setNp] = useState<NowPlaying>({ isPlaying: false });
  const [lastTrack, setLastTrack] = useState<Pick<NowPlaying, 'title' | 'artist' | 'albumArt'>>({});
  const [accentColor, setAccentColor] = useState('#c8c8c8');
  const [bioOpen, setBioOpen] = useState(false);
  const [visits, setVisits] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>({ active: false });
  const [ghActivity, setGhActivity] = useState<GithubActivity>({ hasActivity: false });
  const [ghStreak, setGhStreak] = useState<GithubStreak>({ streak: 0, commitsToday: 0, hasActivity: false });
  const dailyQuote = getDailyQuote();
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
    fetch(`${API_BASE}/visit`)
      .then(r => r.json())
      .then(d => setVisits(d.count))
      .catch(() => {});
  }, []);

  // Status + GitHub activity + streak
  useEffect(() => {
    const fetchStatus = () => fetch(`${API_BASE}/status`).then(r => r.json()).then(setStatus).catch(() => {});
    const fetchGh = () => fetch(`${API_BASE}/github-activity`).then(r => r.json()).then(setGhActivity).catch(() => {});
    const fetchStreak = () => fetch(`${API_BASE}/github-streak`).then(r => r.json()).then(setGhStreak).catch(() => {});
    fetchStatus();
    fetchGh();
    fetchStreak();
    const s1 = setInterval(fetchStatus, 30_000);
    const s2 = setInterval(fetchGh, 60_000);
    const s3 = setInterval(fetchStreak, 300_000); // 5 min
    return () => { clearInterval(s1); clearInterval(s2); clearInterval(s3); };
  }, []);

  // Spotify poll
  const fetchNp = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/now-playing`);
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
              <a href="https://x.com/thatssodhawal/status/2016556159126441990" target="_blank" rel="noopener noreferrer" style={bioLink}>mave health</a>
              {' · '}
              <a href="https://x.com/ycombinator/status/2026341356910624956" target="_blank" rel="noopener noreferrer" style={bioLink}>avalahalli forest</a>
              {' · '}
              <a href="https://x.com/dayadzn/status/2024136520781988322" target="_blank" rel="noopener noreferrer" style={bioLink}>my hollywood debut</a>
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
                position: 'absolute', inset: '-50%',
                backgroundImage: `url(${np.albumArt ?? lastTrack.albumArt})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                filter: 'blur(60px) saturate(1.6)',
                opacity: np.isPlaying ? (theme === 'dark' ? 0.45 : 0.2) : (theme === 'dark' ? 0.15 : 0.06),
                transition: 'opacity 2s ease', zIndex: 0,
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
                  <p style={{ fontSize: '14px', color: np.isPlaying ? accentColor : 'var(--text-muted)', fontWeight: 400, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textShadow: theme === 'dark' ? '0 1px 4px rgba(0,0,0,0.6)' : 'none', transition: 'color 1s ease' }}>
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

        {/* Status */}
        <div style={section()}>
          <span style={label}>status</span>
          {status.active ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '14px', color: 'var(--white)', fontWeight: 400 }}>
                {status.emoji && `${status.emoji} `}{status.text}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 300 }}>
                {formatAgo(status.ago ?? 0)}
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px 20px' }}>
              {['ad shoots + camera ops', 'helping founders ship', 'claude code maxxing'].map(item => (
                <span key={item} style={{ fontSize: '14px', color: 'var(--text)', fontWeight: 300 }}>{item}</span>
              ))}
            </div>
          )}
          {ghActivity.hasActivity && (
            <a
              href={`https://github.com/${ghActivity.repo?.includes('/') ? ghActivity.repo : `howwohmm/${ghActivity.repo}`}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 300, transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-dim)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {ghActivity.action ?? 'pushed to'} {ghActivity.repo} · {formatAgo(ghActivity.ago ?? 0)}
            </a>
          )}
        </div>

        {/* Quote + Streak */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--border)' }}>

          {/* Daily quote */}
          <a href={dailyQuote.url} target="_blank" rel="noopener noreferrer" style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px', borderRight: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}>
            <p style={{ fontSize: '13px', color: 'var(--text)', fontWeight: 300, margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              "{dailyQuote.text}"
            </p>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 300 }}>
              — pg, {dailyQuote.source} ↗
            </span>
          </a>

          {/* Streak + commits */}
          <div style={{ padding: '0 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
            <span style={label}>github</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 300, color: 'var(--white)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
                {ghStreak.streak}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-dim)', fontWeight: 300 }}>
                day streak
              </span>
            </div>
            {ghStreak.commitsToday > 0 && (
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 300 }}>
                {ghStreak.commitsToday} {ghStreak.commitsToday === 1 ? 'commit' : 'commits'} today
              </span>
            )}
          </div>
        </div>

        {/* Projects */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', borderBottom: '1px solid var(--border)' }}>
          <div style={{ padding: '0 24px', display: 'flex', alignItems: 'center', height: '32px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
            <span style={label}>things i built</span>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {projects.map(p => {
              const Row = p.live ? 'a' : 'div';
              const rowProps = p.live
                ? { href: p.url, target: '_blank' as const, rel: 'noopener noreferrer' }
                : {};
              return (
                <Row key={p.name} {...rowProps} className="project-row"
                  style={{ flex: 1, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: p.live ? 'pointer' : 'default' }}
                >
                  <span className="project-name" style={{ fontSize: '15px', color: 'var(--text)', fontWeight: 400, letterSpacing: '-0.01em', transition: 'color 0.15s' }}>
                    {p.name}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {p.live ? (
                      <span style={{ fontSize: '13px', color: 'var(--text-dim)', fontWeight: 300 }}>{p.desc} ↗</span>
                    ) : (
                      <>
                        <span style={{ fontSize: '13px', color: 'var(--text-dim)', fontWeight: 300 }}>{p.desc}</span>
                        <span style={{ fontSize: '10px', color: 'var(--text-ghost)', letterSpacing: '0.04em', opacity: 0.6 }}>building</span>
                      </>
                    )}
                  </div>
                </Row>
              );
            })}
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
