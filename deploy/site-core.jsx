// FG Designs — site (parte 1): helpers + Nav responsiva com scroll-spy + Hero
const FG = window.FGDesignsCosmosDesignSystem_29e3f7;
const D  = window.FG_DATA;

const LOGO         = 'assets/fg-logo-white.svg';
const LOGO_STELLAR = 'assets/fg-logo-stellar.svg';
const NAV_H = 66;

/* ---------- Lucide icon helper ---------- */
const WHATSAPP_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z';
function Icon({ name, size = 18, color = 'currentColor', style = {} }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) return;
    if (name === 'WhatsApp') {
      const NS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('width', size); svg.setAttribute('height', size);
      svg.setAttribute('fill', 'currentColor');
      svg.style.color = color; svg.style.display = 'block';
      const p = document.createElementNS(NS, 'path');
      p.setAttribute('d', WHATSAPP_PATH);
      svg.appendChild(p);
      ref.current.innerHTML = '';
      ref.current.appendChild(svg);
      return;
    }
    if (window.lucide && ref.current) {
      ref.current.innerHTML = '';
      const svg = window.lucide.createElement(window.lucide.icons[name] || window.lucide.icons.Circle);
      svg.setAttribute('width', size); svg.setAttribute('height', size);
      svg.style.color = color; svg.style.display = 'block';
      ref.current.appendChild(svg);
    }
  }, [name, size, color]);
  return <span ref={ref} style={{ display: 'inline-flex', width: size, height: size, ...style }} />;
}

/* ---------- media query hook ---------- */
function useMediaQuery(q) {
  const [m, setM] = React.useState(() => window.matchMedia(q).matches);
  React.useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    on(); mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [q]);
  return m;
}

/* ---------- scroll-spy: which section is active ---------- */
function useActiveSection(ids) {
  const [active, setActive] = React.useState(ids[0]);
  React.useEffect(() => {
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      const vis = entries.filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (vis[0]) setActive(vis[0].target.id);
    }, { rootMargin: `-${NAV_H + 8}px 0px -55% 0px`, threshold: [0.1, 0.35, 0.6] });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [ids.join(',')]);
  return active;
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - (NAV_H - 2);
  window.scrollTo({ top: y, behavior: 'smooth' });
}

const wrap = (mobile) => ({ width: '100%', maxWidth: 'var(--container)', margin: '0 auto', padding: mobile ? '0 20px' : '0 32px' });

/* ================= NAV ================= */
function Nav() {
  const mobile = useMediaQuery('(max-width: 880px)');
  const active = useActiveSection(D.nav.map(n => n.id));
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const go = (id) => { setOpen(false); scrollToId(id); };

  const Wordmark = () => (
    <a href="#inicio" onClick={(e) => { e.preventDefault(); go('inicio'); }} style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}>
      <img src={LOGO} alt="FG Designs" style={{ height: 30 }} />
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--text-strong)', letterSpacing: '-0.02em' }}>
        <span style={{ color: 'var(--accent)' }}>FG</span> Designs
      </span>
    </a>
  );

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 60,
      borderBottom: `1px solid ${scrolled ? 'var(--border-subtle)' : 'transparent'}`,
      background: scrolled ? 'rgba(10,10,20,0.72)' : 'rgba(10,10,20,0.30)',
      backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      transition: 'background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
    }}>
      <div style={{ ...wrap(mobile), height: NAV_H, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Wordmark />

        {!mobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
            {D.nav.map(n => {
              const on = active === n.id;
              return (
                <a key={n.id} href={`#${n.id}`} onClick={(e) => { e.preventDefault(); go(n.id); }} style={{
                  position: 'relative', padding: '6px 0', textDecoration: 'none', whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: on ? 600 : 500,
                  color: on ? 'var(--text-strong)' : 'var(--text-muted)',
                  transition: 'color var(--dur-fast) var(--ease-out)',
                }}
                  onMouseEnter={e => { if (!on) e.currentTarget.style.color = 'var(--text-body)'; }}
                  onMouseLeave={e => { if (!on) e.currentTarget.style.color = 'var(--text-muted)'; }}>
                  {n.label}
                  <span style={{
                    position: 'absolute', left: 0, right: 0, bottom: -2, height: 2, borderRadius: 2,
                    background: 'var(--accent)', opacity: on ? 1 : 0,
                    transform: on ? 'scaleX(1)' : 'scaleX(0.3)',
                    transition: 'opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
                  }} />
                </a>
              );
            })}
          </nav>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {!mobile && <FG.Button size="sm" onClick={() => scrollToId('contato')} iconRight={<Icon name="ArrowRight" size={15} />}>Orçamento</FG.Button>}
          {mobile && (
            <button aria-label="Menu" onClick={() => setOpen(o => !o)} style={{
              all: 'unset', cursor: 'pointer', width: 42, height: 42, borderRadius: 'var(--radius-md)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--surface-section)', border: '1px solid var(--border-default)', color: 'var(--text-strong)',
            }}>
              <Icon name={open ? 'X' : 'Menu'} size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobile && (
        <div style={{
          overflow: 'hidden', maxHeight: open ? 560 : 0,
          transition: 'max-height var(--dur-slow) var(--ease-out)',
          background: 'rgba(10,10,20,0.94)', borderTop: open ? '1px solid var(--border-subtle)' : 'none',
        }}>
          <div style={{ ...wrap(mobile), padding: '14px 20px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {D.nav.map(n => {
              const on = active === n.id;
              return (
                <a key={n.id} href={`#${n.id}`} onClick={(e) => { e.preventDefault(); go(n.id); }} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '13px 14px', borderRadius: 'var(--radius-md)', textDecoration: 'none',
                  fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: on ? 600 : 500,
                  color: on ? 'var(--text-strong)' : 'var(--text-body)',
                  background: on ? 'var(--accent-soft)' : 'transparent',
                }}>
                  {n.label}
                  {on && <Icon name="ChevronRight" size={16} color="var(--accent)" />}
                </a>
              );
            })}
            <FG.Button full glow style={{ marginTop: 12 }} onClick={() => go('contato')} iconRight={<Icon name="ArrowRight" size={16} />}>Pedir orçamento</FG.Button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ================= HERO ================= */
function Hero() {
  const mobile = useMediaQuery('(max-width: 880px)');
  const centered = false;

  const Stats = () => (
    <div style={{
      display: 'flex', gap: mobile ? 28 : 48, marginTop: mobile ? 40 : 60,
      flexWrap: 'wrap', justifyContent: centered ? 'center' : 'flex-start',
    }}>
      {D.stats.map(s => <FG.Stat key={s.label} value={s.value} label={s.label} accent={s.accent} />)}
    </div>
  );

  const Buttons = () => (
    <div style={{ display: 'flex', gap: 14, marginTop: mobile ? 30 : 38, flexWrap: 'wrap', justifyContent: centered ? 'center' : 'flex-start' }}>
      <FG.Button size={mobile ? 'md' : 'lg'} glow onClick={() => scrollToId('contato')} iconRight={<Icon name="ArrowRight" size={18} />}>Começar um projeto</FG.Button>
      <FG.Button size={mobile ? 'md' : 'lg'} variant="secondary" onClick={() => scrollToId('trabalhos')} iconLeft={<Icon name="Sparkles" size={16} />}>Ver trabalhos</FG.Button>
    </div>
  );

  return (
    <section id="inicio" style={{ position: 'relative', overflow: 'hidden', background: 'var(--fg-void)' }}>
      {/* animated starfield backdrop */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <FG.StarsBackground density={mobile ? 'sparse' : 'normal'} speed={80} interactive={!mobile} style={{ position: 'absolute', inset: 0 }} />
      </div>

      <div style={{
        ...wrap(mobile), position: 'relative', zIndex: 1,
        paddingTop: mobile ? 84 : 118, paddingBottom: mobile ? 76 : 104,
        display: centered ? 'flex' : 'grid',
        flexDirection: 'column', alignItems: 'center',
        gridTemplateColumns: (!centered && !mobile) ? '1.15fr 0.85fr' : '1fr',
        gap: 40, textAlign: centered ? 'center' : 'left',
      }}>
        <div style={{ maxWidth: centered ? 860 : 720 }}>
          {centered && !mobile && (
            <img src={LOGO_STELLAR} alt="" aria-hidden="true" className="fg-twinkle" style={{ height: 96, marginBottom: 8 }} />
          )}
          <div style={{ display: 'flex', justifyContent: centered ? 'center' : 'flex-start' }}>
            <FG.Eyebrow>Freelancer · Web · Produção gráfica</FG.Eyebrow>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: centered ? 'clamp(40px, 8vw, 78px)' : 'clamp(38px, 6.4vw, 76px)',
            lineHeight: 1.02, letterSpacing: '-0.03em', color: 'var(--text-strong)',
            margin: '18px auto 0', maxWidth: centered ? 900 : 'none',
          }}>
            Interfaces com<br /><span className="fg-text-flow">a vastidão da galáxia.</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-sans)', fontSize: mobile ? 16 : 19, lineHeight: 1.6,
            color: 'var(--text-body)', margin: centered ? '22px auto 0' : '22px 0 0',
            maxWidth: 560,
          }}>
            Crio landing pages e interfaces que respiram — do conceito ao deploy — e cuido da arte final pra gráfica: cor, sangria, encaixe e registro.
          </p>
          <Buttons />
          <Stats />
        </div>

        {/* right: big stellar monogram (only layout A on desktop) */}
        {!centered && !mobile && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={LOGO_STELLAR} alt="Monograma FG" className="fg-twinkle" style={{ width: '100%', maxWidth: 380, filter: 'drop-shadow(0 20px 60px rgba(142,123,255,0.35))' }} />
          </div>
        )}
      </div>
      <hr className="fg-rule" style={{ position: 'relative', zIndex: 1, margin: 0 }} />
    </section>
  );
}

/* ================= SHOWREEL ================= */
function ShowReel() {
  const mobile = useMediaQuery('(max-width: 760px)');
  const vidRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(true);

  const togglePlay = () => {
    const v = vidRef.current; if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  return (
    <section id="showreel" style={{ background: 'var(--surface-page)', position: 'relative', overflow: 'hidden' }}>
      {/* soft nebula wash behind the frame */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 70% at 50% 40%, rgba(142,123,255,0.12), transparent 70%)', pointerEvents: 'none' }} />
      <div className="fg-reveal" style={{ ...wrap(mobile), position: 'relative', zIndex: 1, padding: mobile ? '56px 20px' : '78px 32px' }}>
        <div style={{ textAlign: 'center', marginBottom: mobile ? 28 : 38 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FG.Eyebrow color="var(--aurora)">Showreel</FG.Eyebrow>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: mobile ? 'clamp(26px,7vw,34px)' : 'clamp(30px,4vw,44px)', letterSpacing: '-0.02em', color: 'var(--text-strong)', margin: '14px 0 0', lineHeight: 1.08 }}>
            A marca em movimento.
          </h2>
        </div>

        {/* cosmic frame */}
        <div style={{ maxWidth: 940, margin: '0 auto', position: 'relative' }}>
          {/* glow halo */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: -1, borderRadius: 'calc(var(--radius-xl) + 3px)', background: 'linear-gradient(135deg, var(--accent), var(--aurora) 55%, var(--premium))', opacity: 0.55, filter: 'blur(18px)' }} />
          <div style={{
            position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden',
            border: '1px solid var(--border-default)', background: 'var(--fg-void)', boxShadow: 'var(--shadow-xl)',
          }}>
            {/* frame chrome bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(10,10,20,0.72)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
              <span style={{ display: 'flex', gap: 6 }}>
                {['var(--accent)', 'var(--aurora)', 'var(--premium)'].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.9 }} />)}
              </span>
              <span style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>fg-designs · animação</span>
              <img src={LOGO} alt="FG" style={{ height: 18, opacity: 0.9 }} />
            </div>
            {/* video */}
            <div className="fg-starfield" style={{ position: 'relative', background: 'var(--fg-void)' }}>
              <video ref={vidRef} autoPlay muted loop playsInline preload="metadata"
                onClick={togglePlay}
                style={{ display: 'block', width: '100%', maxHeight: mobile ? 440 : 560, objectFit: 'contain', background: 'var(--fg-void)', cursor: 'pointer' }}>
                <source src="assets/std-fg-animacao-720.webm" type="video/webm" />
                <source src="assets/fg-animacao.mp4" type="video/mp4" />
              </video>
              {/* controls */}
              <div style={{ position: 'absolute', right: 14, bottom: 14, display: 'flex', gap: 8 }}>
                <button aria-label={playing ? 'Pausar' : 'Reproduzir'} onClick={togglePlay} style={ctrlBtn}>
                  <Icon name={playing ? 'Pause' : 'Play'} size={17} color="var(--text-strong)" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="fg-rule" style={{ position: 'relative', zIndex: 1, margin: 0 }} />
    </section>
  );
}
const ctrlBtn = {
  all: 'unset', cursor: 'pointer', width: 40, height: 40, borderRadius: 'var(--radius-md)',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  background: 'rgba(5,5,9,0.62)', border: '1px solid var(--border-default)',
  backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
};

Object.assign(window, { Icon, useMediaQuery, useActiveSection, scrollToId, FG_WRAP: wrap, FG_LOGO: LOGO, FG_LOGO_STELLAR: LOGO_STELLAR, Nav, Hero, ShowReel, NAV_H });
