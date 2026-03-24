const projects = [
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
  { name: 'farcaster', url: 'https://warpcast.com/ohm' },
  { name: 'blog', url: 'https://blogv2-henna.vercel.app/' },
];

export const ProjectsSection = () => (
  <div>
    {/* Projects */}
    <div style={{
      maxWidth: '760px',
      margin: '0 auto',
      padding: 'clamp(48px, 8vh, 80px) clamp(24px, 5vw, 60px)',
    }}>
      <p style={{ fontSize: '10px', color: 'var(--text-ghost)', letterSpacing: '0.06em', marginBottom: 'clamp(28px, 5vh, 44px)', margin: '0 0 clamp(28px, 5vh, 44px)' }}>
        things i built
      </p>
      <div style={{ borderTop: '1px solid var(--border)' }}>
        {projects.map(p => {
          const Row = p.live ? 'a' : 'div';
          const rowProps = p.live
            ? { href: p.url, target: '_blank', rel: 'noopener noreferrer' }
            : {};
          return (
            <Row
              key={p.name}
              {...rowProps}
              className="project-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: p.live ? 'pointer' : 'default',
              }}
            >
              <span className="project-name" style={{ fontSize: 'clamp(14px, 1.8vw, 16px)', fontWeight: 400, color: 'var(--text-dim)', letterSpacing: '-0.01em', transition: 'color 0.15s' }}>
                {p.name}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-ghost)', fontWeight: 300 }}>
                  {p.desc}
                </span>
                {p.live ? (
                  <span style={{ fontSize: '13px', color: 'var(--text-ghost)' }}>↗</span>
                ) : (
                  <span style={{ fontSize: '10px', color: 'var(--text-ghost)', letterSpacing: '0.04em', opacity: 0.6 }}>building</span>
                )}
              </div>
            </Row>
          );
        })}
      </div>
    </div>

    {/* Footer */}
    <div style={{
      borderTop: '1px solid var(--border)',
      padding: 'clamp(24px, 4vh, 36px) clamp(24px, 5vw, 60px)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '12px',
      maxWidth: '760px',
      margin: '0 auto',
    }}>
      <span style={{ fontSize: '12px', color: 'var(--text-ghost)' }}>ohm.quest</span>
      <div style={{ display: 'flex', gap: 'clamp(16px, 3vw, 28px)', flexWrap: 'wrap' }}>
        {links.map(l => (
          <a
            key={l.name}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '12px', color: 'var(--text-ghost)', fontWeight: 300, transition: 'color 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-dim)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-ghost)')}
          >
            {l.name}
          </a>
        ))}
      </div>
    </div>
  </div>
);
