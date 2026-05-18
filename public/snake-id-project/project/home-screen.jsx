// HomeScreen.jsx — the first screen for Snake-ID.
// Field-naturalist + modern camera UI. Mobile-first inside iOS frame.

const C = {
  cream: '#140A24', // deep night-purple (page bg)
  surface: '#241636', // card surface
  paper: '#2A1A40', // secondary card
  ink: '#F1EBFF', // primary text (lavender-white)
  ink2: '#B8AAD8', // secondary text
  ink3: '#7E7298', // tertiary text
  hair: 'rgba(240,234,255,0.10)',
  hairSoft: 'rgba(240,234,255,0.05)',
  moss: '#7E5BC4', // primary (vivid purple)
  moss2: '#A38BD8', // primary-soft (lavender)
  rust: '#F25D5D',
  gold: '#E5C46A'
};

const F = {
  ui: "'Geist', system-ui, -apple-system, sans-serif",
  disp: "'Instrument Serif', 'Times New Roman', serif",
  mono: "'JetBrains Mono', ui-monospace, monospace"
};

// ───────── tiny SVG icons ─────────
const Icon = {
  scope: (s = 18, c = 'currentColor') =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="1.4" fill={c} />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </svg>,

  snake: (s = 28, c = 'currentColor') =>
  <svg width={s} height={s} viewBox="0 0 32 32" fill="none" stroke={c}
       strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {/* Wide flat head / cobra hood — bun shape on top */}
      <path d="M16 4 C 9 4, 4 7.5, 4 11.5 C 4 14, 6 15.5, 8.5 15.4
               C 11 15.2, 13 14.8, 16 14.8 C 19 14.8, 21 15.2, 23.5 15.4
               C 26 15.5, 28 14, 28 11.5 C 28 7.5, 23 4, 16 4 Z"/>
      {/* Two fangs hanging from inside the mouth */}
      <path d="M12.4 15 L 12.8 19.5 L 13.6 15 Z" fill={c}/>
      <path d="M19.6 15 L 19.2 19.5 L 18.4 15 Z" fill={c}/>
      {/* Angry eyebrows */}
      <path d="M7.5 7.5 L 12 9.5"/>
      <path d="M24.5 7.5 L 20 9.5"/>
      {/* Eyes */}
      <ellipse cx="11" cy="11" rx="1.5" ry="1.15"/>
      <ellipse cx="21" cy="11" rx="1.5" ry="1.15"/>
      {/* Forked tongue */}
      <path d="M16 15 L 16 22.5"/>
      <path d="M16 22.5 L 14.3 25.8"/>
      <path d="M16 22.5 L 17.7 25.8"/>













    
    </svg>,

  bolt: (s = 14, c = 'currentColor') =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>,

  pin: (s = 12, c = 'currentColor') =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8">
      <path d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12z" /><circle cx="12" cy="9" r="2.4" />
    </svg>,

  gear: (s = 18, c = 'currentColor') =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>,

  phone: (s = 14, c = 'currentColor') =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.3 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .7-.3 1l-2.2 2.2z" />
    </svg>,

  cam: (s = 22, c = 'currentColor') =>
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8">
      <path d="M3 8h3l2-2.5h8L18 8h3v11H3z" /><circle cx="12" cy="13.5" r="3.5" />
    </svg>,

  home: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7"><path d="M3 10l9-7 9 7v11h-6v-7H9v7H3z" /></svg>,
  book: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7"><path d="M4 4h7a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H4zM20 4h-7a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h8z" /></svg>,
  map: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14" /></svg>,
  user: (c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4.5 5-6 8-6s6.5 1.5 8 6" /></svg>
};

// ───────── pieces ─────────
function DangerPill({ level }) {
  const d = DANGER[level];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 8px 3px 6px', borderRadius: 999,
      background: d.bg, color: d.tone,
      fontFamily: F.mono, fontSize: 10, fontWeight: 600,
      letterSpacing: 0.4, textTransform: 'uppercase'
    }}>
      <span style={{ width: 14, height: 14, borderRadius: 999, background: d.tone, color: d.bg,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700 }}>{level}</span>
      {d.short}
    </span>);

}

function SwatchDot({ colors = ['#333', '#777', '#bbb'], size = 44 }) {
  // three-stripe diagonal swatch — stands in for a thumbnail of the snake
  return (
    <div style={{
      width: size, height: size, borderRadius: 12, overflow: 'hidden',
      position: 'relative', flexShrink: 0,
      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)'
    }}>
      <div style={{ position: 'absolute', inset: 0, background: colors[0] }} />
      <div style={{ position: 'absolute', inset: 0,
        background: `linear-gradient(135deg, transparent 33%, ${colors[1]} 33% 66%, ${colors[2]} 66%)` }} />
    </div>);

}

function TopBar({ city }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '6px 20px 14px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10, background: C.moss,
          display: 'grid', placeItems: 'center', color: '#FFFFFF',
          fontFamily: F.disp, fontSize: 20, lineHeight: 1, fontStyle: 'italic'
        }}>S</div>
        <div style={{ lineHeight: 1.05 }}>
          <div style={{ fontFamily: F.ui, fontSize: 15, fontWeight: 600, color: C.ink, letterSpacing: -0.2 }}>
            Snake<span style={{ color: C.ink3 }}>·</span>ID
          </div>
          <div style={{ fontFamily: F.mono, fontSize: 9.5, color: C.ink3, letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 }}>
            Field assistant · TH
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '6px 10px', borderRadius: 999,
          background: C.surface, border: `1px solid ${C.hair}`,
          fontFamily: F.mono, fontSize: 10.5, color: C.ink2, letterSpacing: 0.4
        }}>
          {Icon.pin(11, C.moss2)} {city}
        </div>
        <button style={{
          width: 34, height: 34, borderRadius: 10, border: `1px solid ${C.hair}`,
          background: C.surface, color: C.ink2, display: 'grid', placeItems: 'center', cursor: 'pointer'
        }} aria-label="Settings">{Icon.gear(16, C.ink2)}</button>
      </div>
    </div>);

}

function Viewfinder({ scanning, onSnap }) {
  return (
    <div style={{
      margin: '0 16px',
      borderRadius: 22,
      overflow: 'hidden',
      position: 'relative',
      aspectRatio: '4 / 5',
      background: `
        radial-gradient(120% 80% at 50% 30%, #2E1C52 0%, #170A2E 60%, #08031A 100%)
      `,
      boxShadow: '0 18px 40px -20px rgba(50,20,90,0.6), inset 0 0 0 1px rgba(190,160,240,0.10)'
    }}>
      {/* faint texture — violet weave */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.20,
        backgroundImage:
        'repeating-linear-gradient(115deg, rgba(200,170,240,0.20) 0 2px, transparent 2px 9px), ' +
        'repeating-linear-gradient(35deg, rgba(120,80,180,0.22) 0 1px, transparent 1px 7px)',
        mixBlendMode: 'screen'
      }} />
      {/* vignette */}
      <div style={{ position: 'absolute', inset: 0,
        background: 'radial-gradient(120% 80% at 50% 60%, transparent 50%, rgba(8,3,26,0.6) 100%)' }} />

      {/* corner brackets */}
      {[
      { t: 18, l: 18, r: 'auto', b: 'auto', rot: 0 },
      { t: 18, r: 18, l: 'auto', b: 'auto', rot: 90 },
      { b: 18, r: 18, l: 'auto', t: 'auto', rot: 180 },
      { b: 18, l: 18, r: 'auto', t: 'auto', rot: 270 }].
      map((p, i) =>
      <div key={i} style={{
        position: 'absolute', top: p.t, left: p.l, right: p.r, bottom: p.b,
        width: 26, height: 26,
        borderTop: '2px solid rgba(255,255,255,0.85)',
        borderLeft: '2px solid rgba(255,255,255,0.85)',
        transform: `rotate(${p.rot}deg)`
      }} />
      )}

      {/* scan line */}
      <div className="sid-scan" style={{
        position: 'absolute', left: 6, right: 6, height: 2, borderRadius: 2,
        background: 'linear-gradient(90deg, transparent, rgba(190,150,240,0.9), transparent)',
        boxShadow: '0 0 16px 2px rgba(170,120,230,0.6)',
        top: scanning ? '50%' : 0,
        animation: scanning ? 'sid-scan-fast 1.1s linear infinite' : 'sid-scan-slow 4.5s ease-in-out infinite'
      }} />

      {/* center reticle + instructional text */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 14, color: 'rgba(241,235,255,0.92)',
        padding: 24, textAlign: 'center'
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: 999,
          border: '1.5px dashed rgba(200,170,240,0.55)',
          display: 'grid', placeItems: 'center'
        }}>
          {Icon.snake(48, 'rgba(241,235,255,0.95)')}
        </div>
        <div style={{ fontFamily: F.disp, fontStyle: 'italic', fontSize: 26, lineHeight: 1.1, color: '#F1EBFF' }}>
          {scanning ? 'Reading the scales…' : 'Point camera at any animal'}
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 10.5, letterSpacing: 1.4, textTransform: 'uppercase',
          color: 'rgba(200,180,240,0.65)' }}>
          {scanning ? 'Analyzing · ML on-device' : 'Snake → full profile · Other → just the name'}
        </div>
      </div>

      {/* top-left mode chip */}
      <div style={{
        position: 'absolute', top: 14, left: 14,
        padding: '5px 9px', borderRadius: 999,
        background: 'rgba(40,20,70,0.55)', border: '1px solid rgba(200,170,240,0.22)',
        backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
        fontFamily: F.mono, fontSize: 9.5, letterSpacing: 1, textTransform: 'uppercase',
        color: '#EAD9FF', display: 'inline-flex', alignItems: 'center', gap: 5
      }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: '#C9A7F5', boxShadow: '0 0 8px #C9A7F5' }} />
        Live · Auto-focus
      </div>

      {/* top-right hint */}
      <div style={{
        position: 'absolute', top: 14, right: 14,
        padding: '5px 9px', borderRadius: 999,
        background: 'rgba(40,20,70,0.45)',
        fontFamily: F.mono, fontSize: 9.5, color: 'rgba(234,217,255,0.75)', letterSpacing: 0.8
      }}>3 m · 1/250s</div>
    </div>);

}

function PrimaryCTA({ label, sub, onClick, scanning }) {
  return (
    <button onClick={onClick} disabled={scanning} style={{
      margin: '18px 16px 0', width: 'calc(100% - 32px)',
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 18px',
      background: scanning ?
      'linear-gradient(180deg, #2A1547, #170828)' :
      `linear-gradient(180deg, ${C.moss} 0%, #3A1F62 60%, #170828 100%)`,
      color: '#FFFFFF',
      border: 'none', borderRadius: 18, cursor: scanning ? 'wait' : 'pointer',
      boxShadow: scanning ? 'none' : '0 18px 32px -14px rgba(40,10,80,0.85), 0 4px 10px -4px rgba(0,0,0,0.6), inset 0 1px 0 rgba(200,170,240,0.25), inset 0 -1px 0 rgba(0,0,0,0.4)',
      transition: 'transform 120ms ease, background 200ms ease',
      textAlign: 'left'
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: 'rgba(255,255,255,0.15)', color: '#FFFFFF',
        display: 'grid', placeItems: 'center', flexShrink: 0,
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.18)'
      }}>{Icon.cam(22, '#FFFFFF')}</div>
      <div style={{ flex: 1, lineHeight: 1.15 }}>
        <div style={{ fontFamily: F.ui, fontSize: 19, fontWeight: 600, letterSpacing: -0.3, color: "rgb(255, 255, 255)" }}>
          {scanning ? 'Identifying…' : label}
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 10.5, color: 'rgba(255,255,255,0.78)',
          letterSpacing: 0.6, marginTop: 3, textTransform: 'uppercase' }}>
          {scanning ? 'Hold the device steady' : sub}
        </div>
      </div>
      <div style={{ fontFamily: F.mono, fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: 1 }}>
        TAP →
      </div>
    </button>);

}

function StatRow() {
  const Stat = ({ n, label, mono }) =>
  <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: 7 }}>
      <div style={{ fontFamily: F.disp, fontStyle: 'italic', fontSize: 22, color: C.ink, lineHeight: 1 }}>{n}</div>
      <div style={{ fontFamily: F.mono, fontSize: 9.5, color: C.ink3, letterSpacing: 1, textTransform: 'uppercase' }}>{label}</div>
    </div>;

  return (
    <div style={{
      margin: '14px 16px 0', padding: '12px 14px',
      borderRadius: 14, background: C.surface,
      border: `1px solid ${C.hair}`,
      display: 'flex', alignItems: 'center', gap: 12
    }}>
      <Stat n="324" label="Scans" />
      <div style={{ width: 1, height: 22, background: C.hair }} />
      <Stat n="12" label="Snakes" />
      <div style={{ width: 1, height: 22, background: C.hair }} />
      <Stat n="5/5" label="Deadly seen" />
    </div>);

}

function RecentRow({ entry }) {
  if (entry.kind === 'snake') {
    const s = SNAKES.find((x) => x.id === entry.ref);
    if (!s) return null;
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
        borderRadius: 14, background: C.surface, border: `1px solid ${C.hair}` }}>
        <SwatchDot colors={s.swatch} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: F.ui, fontSize: 14, fontWeight: 600, color: C.ink, letterSpacing: -0.2 }}>{s.en}</span>
            <DangerPill level={s.danger} />
          </div>
          <div style={{ fontFamily: F.ui, fontSize: 11.5, color: C.ink3, marginTop: 2,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {s.th} · {entry.where}
          </div>
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 9.5, color: C.ink3, letterSpacing: 0.6, textAlign: 'right', flexShrink: 0 }}>
          {entry.when}
        </div>
      </div>);

  }
  const o = OTHERS.find((x) => x.id === entry.ref);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
      borderRadius: 14, background: C.surface, border: `1px solid ${C.hair}` }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: C.paper,
        display: 'grid', placeItems: 'center', flexShrink: 0,
        fontFamily: F.disp, fontSize: 22, color: C.moss }}>{o.emoji}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: F.ui, fontSize: 14, fontWeight: 600, color: C.ink }}>{o.label}</div>
        <div style={{ fontFamily: F.mono, fontSize: 10, color: C.ink3, letterSpacing: 0.6, textTransform: 'uppercase', marginTop: 3 }}>
          Not a snake · No profile
        </div>
      </div>
      <div style={{ fontFamily: F.mono, fontSize: 9.5, color: C.ink3, letterSpacing: 0.6, flexShrink: 0 }}>
        {entry.when}
      </div>
    </div>);

}

function RecentList() {
  return (
    <div style={{ margin: '20px 16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ fontFamily: F.disp, fontStyle: 'italic', fontSize: 22, color: C.ink, letterSpacing: -0.2 }}>
          Recent finds
        </div>
        <button style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: F.mono, fontSize: 10, color: C.moss2, letterSpacing: 0.8, textTransform: 'uppercase'
        }}>See all →</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {RECENT.map((e, i) => <RecentRow key={i} entry={e} />)}
      </div>
    </div>);

}

function EmergencyStrip() {
  return (
    <a href="tel:1669" style={{
      margin: '18px 16px 0', display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 14px', borderRadius: 14,
      background: 'linear-gradient(180deg, #8C2A1B, #6E1D12)',
      color: '#F6E8D6', textDecoration: 'none',
      boxShadow: '0 12px 24px -16px rgba(140,42,27,0.7)'
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.12)',
        display: 'grid', placeItems: 'center', flexShrink: 0
      }}>{Icon.phone(16, '#F6E8D6')}</div>
      <div style={{ flex: 1, lineHeight: 1.15 }}>
        <div style={{ fontFamily: F.ui, fontSize: 14, fontWeight: 600 }}>Snakebite emergency?</div>
        <div style={{ fontFamily: F.mono, fontSize: 10.5, color: 'rgba(246,232,214,0.75)', letterSpacing: 0.6, marginTop: 3, textTransform: 'uppercase' }}>
          Tap to call 1669 · Thai ambulance
        </div>
      </div>
      <div style={{ fontFamily: F.disp, fontStyle: 'italic', fontSize: 24, letterSpacing: 1, marginRight: 4 }}>1669</div>
    </a>);

}

function BottomNav({ active = 'home' }) {
  const Tab = ({ id, label, icon }) => {
    const on = id === active;
    const c = on ? C.ink : C.ink3;
    return (
      <button style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px 0'
      }}>
        {icon(c)}
        <span style={{
          fontFamily: F.mono, fontSize: 9.5, letterSpacing: 0.8, textTransform: 'uppercase', color: c,
          fontWeight: on ? 600 : 400
        }}>{label}</span>
      </button>);

  };
  return (
    <div style={{
      marginTop: 18, padding: '8px 8px 4px',
      borderTop: `1px solid ${C.hair}`, background: C.cream,
      display: 'flex', alignItems: 'stretch'
    }}>
      <Tab id="home" label="Home" icon={Icon.home} />
      <Tab id="library" label="Library" icon={Icon.book} />
      <Tab id="map" label="Map" icon={Icon.map} />
      <Tab id="profile" label="Profile" icon={Icon.user} />
    </div>);

}

// ───────── result peek (slides up after scan) ─────────
function ResultPeek({ result, onClose }) {
  if (!result) return null;
  const isSnake = result.kind === 'snake';
  const s = isSnake ? SNAKES.find((x) => x.id === result.ref) : null;
  const o = !isSnake ? OTHERS.find((x) => x.id === result.ref) : null;

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 30,
      background: 'rgba(10,15,10,0.45)',
      display: 'flex', alignItems: 'flex-end',
      animation: 'sid-fade-in 200ms ease'
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: C.cream, width: '100%',
        borderTopLeftRadius: 26, borderTopRightRadius: 26,
        padding: '14px 0 22px',
        boxShadow: '0 -20px 40px -10px rgba(0,0,0,0.25)',
        animation: 'sid-rise 280ms cubic-bezier(.2,.9,.25,1)',
        maxHeight: '78%', overflow: 'auto'
      }}>
        {/* grabber */}
        <div style={{ width: 38, height: 4, borderRadius: 4, background: C.hair,
          margin: '0 auto 12px' }} />

        {isSnake ?
        <div style={{ padding: '0 18px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <SwatchDot colors={s.swatch} size={58} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: F.mono, fontSize: 10, color: C.ink3, letterSpacing: 1, textTransform: 'uppercase' }}>
                  Identified · 94% confidence
                </div>
                <div style={{ fontFamily: F.disp, fontStyle: 'italic', fontSize: 28, lineHeight: 1.05, color: C.ink, marginTop: 2 }}>
                  {s.en}
                </div>
                <div style={{ fontFamily: F.ui, fontSize: 13, color: C.ink2, marginTop: 2 }}>
                  {s.th} · <span style={{ fontStyle: 'italic', color: C.ink3 }}>{s.sci}</span>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              <DangerPill level={s.danger} />
              <Chip>{s.family}</Chip>
              <Chip>{s.venom}</Chip>
              <Chip>{s.size}</Chip>
            </div>

            <Section title="ID cues">
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
                {s.id_cues.map((c, i) =>
              <li key={i} style={{ display: 'flex', gap: 8, fontFamily: F.ui, fontSize: 13, color: C.ink, lineHeight: 1.35 }}>
                    <span style={{
                  flexShrink: 0, marginTop: 6, width: 6, height: 6, borderRadius: 999,
                  background: DANGER[s.danger].tone
                }} />{c}
                  </li>
              )}
              </ul>
            </Section>
            <Section title="Habitat">{s.habitat}</Section>
            <Section title="How to handle">{s.handle}</Section>
            <Section title="First aid" emphasis={s.danger >= 4}>{s.firstaid}</Section>

            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button onClick={onClose} style={btnGhost}>Dismiss</button>
              <button style={btnPrimary}>Full profile →</button>
            </div>
          </div> :

        <div style={{ padding: '0 18px', textAlign: 'center' }}>
            <div style={{ width: 88, height: 88, borderRadius: 24, background: C.paper, margin: '0 auto',
            display: 'grid', placeItems: 'center', fontFamily: F.disp, fontSize: 46, color: C.moss }}>
              {o.emoji}
            </div>
            <div style={{ fontFamily: F.mono, fontSize: 10, color: C.ink3, letterSpacing: 1, textTransform: 'uppercase', marginTop: 12 }}>
              Identified · Not a snake
            </div>
            <div style={{ fontFamily: F.disp, fontStyle: 'italic', fontSize: 40, color: C.ink, marginTop: 2, lineHeight: 1 }}>
              {o.label}
            </div>
            <div style={{ fontFamily: F.ui, fontSize: 13, color: C.ink3, marginTop: 10, maxWidth: 280, marginInline: 'auto', lineHeight: 1.4 }}>
              Snake-ID only stores full profiles for snakes. Other animals are just labelled.
            </div>
            <button onClick={onClose} style={{ ...btnPrimary, marginTop: 18, width: '100%' }}>Got it</button>
          </div>
        }
      </div>
    </div>);

}

function Chip({ children }) {
  return (
    <span style={{
      padding: '3px 8px', borderRadius: 999, background: C.surface, border: `1px solid ${C.hair}`,
      fontFamily: F.mono, fontSize: 10, color: C.ink2, letterSpacing: 0.4
    }}>{children}</span>);

}

function Section({ title, children, emphasis }) {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontFamily: F.mono, fontSize: 9.5, color: C.ink3, letterSpacing: 1.2,
        textTransform: 'uppercase', marginBottom: 6 }}>{title}</div>
      <div style={{
        fontFamily: F.ui, fontSize: 13.5, color: emphasis ? '#6E1D12' : C.ink, lineHeight: 1.45,
        padding: emphasis ? '10px 12px' : 0,
        background: emphasis ? 'rgba(140,42,27,0.08)' : 'transparent',
        border: emphasis ? '1px solid rgba(140,42,27,0.25)' : 'none',
        borderRadius: emphasis ? 12 : 0,
        fontWeight: emphasis ? 500 : 400
      }}>{children}</div>
    </div>);

}

const btnPrimary = {
  flex: 1, padding: '12px 14px', borderRadius: 12, border: 'none', cursor: 'pointer',
  background: C.moss, color: '#FFFFFF', fontFamily: F.ui, fontSize: 14, fontWeight: 600, letterSpacing: -0.1,
  boxShadow: '0 8px 18px -10px rgba(74,43,122,0.6)'
};
const btnGhost = {
  flex: 1, padding: '12px 14px', borderRadius: 12, cursor: 'pointer',
  background: 'transparent', color: C.ink, border: `1px solid ${C.hair}`,
  fontFamily: F.ui, fontSize: 14, fontWeight: 500
};

// ───────── HomeScreen ─────────
function HomeScreen({ tweaks, setTweak }) {
  const [scanning, setScanning] = React.useState(false);
  const [result, setResult] = React.useState(null);

  const trigger = () => {
    if (scanning) return;
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setScanning(false);
      // pick a result based on tweak preview
      const preset = tweaks.previewResult;
      let r;
      if (preset === 'pit-viper') r = { kind: 'snake', ref: 'white-lipped-pit-viper' };else
      if (preset === 'krait') r = { kind: 'snake', ref: 'malayan-krait' };else
      if (preset === 'racer') r = { kind: 'snake', ref: 'red-tailed-racer' };else
      if (preset === 'dog') r = { kind: 'other', ref: 'dog' };else
      if (preset === 'human') r = { kind: 'other', ref: 'human' };else
      r = { kind: 'snake', ref: 'white-lipped-pit-viper' };
      setResult(r);
    }, 1500);
  };

  const ctaLabel = tweaks.ctaLabel || 'Identify';
  const ctaSub = 'Tap to scan animal';

  return (
    <div data-screen-label="01 Home" style={{
      background: C.cream, color: C.ink, minHeight: '100%',
      fontFamily: F.ui, position: 'relative',
      paddingTop: 54 // clear iOS status bar (dynamic island + clock)
    }}>
      <TopBar city={tweaks.city || 'Bangkok'} />
      <Viewfinder scanning={scanning} onSnap={trigger} />
      <PrimaryCTA label={ctaLabel} sub={ctaSub} onClick={trigger} scanning={scanning} />
      <StatRow />
      <RecentList />
      <EmergencyStrip />
      <BottomNav active="home" />

      <ResultPeek result={result} onClose={() => setResult(null)} />
    </div>);

}

Object.assign(window, { HomeScreen });