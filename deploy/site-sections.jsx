// FG Designs — site (parte 2): Serviços, Trabalhos, Sites no ar, Sobre, Produção, Processo
const FGb = window.FGDesignsCosmosDesignSystem_29e3f7;
const Db  = window.FG_DATA;
const Icon = window.Icon;
const useMQ = window.useMediaQuery;

function SectionHead({ kicker, title, kickerColor, sub, center, mobile }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', maxWidth: center ? 720 : 'none', margin: center ? '0 auto' : 0 }}>
      <div style={{ display: 'flex', justifyContent: center ? 'center' : 'flex-start' }}>
        <FGb.Eyebrow color={kickerColor || 'var(--accent)'}>{kicker}</FGb.Eyebrow>
      </div>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        fontSize: mobile ? 'clamp(27px,7vw,34px)' : 'clamp(30px,4vw,46px)',
        letterSpacing: '-0.02em', color: 'var(--text-strong)', margin: '14px 0 0', lineHeight: 1.08,
      }}>{title}</h2>
      {sub && <p style={{ fontFamily: 'var(--font-sans)', fontSize: mobile ? 15 : 17, lineHeight: 1.6, color: 'var(--text-body)', margin: '16px auto 0', maxWidth: 560 }}>{sub}</p>}
    </div>
  );
}

/* ================= SERVICES ================= */
function Services() {
  const mobile = useMQ('(max-width: 760px)');
  return (
    <section id="servicos" style={{ background: 'var(--surface-section)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="fg-reveal" style={{ ...window.FG_WRAP(mobile), padding: mobile ? '64px 20px' : '90px 32px' }}>
        <SectionHead kicker="O que eu faço" title="Do pixel à prova de gráfica." mobile={mobile}
          sub="Um estúdio de uma pessoa só — eu desenho, codifico e preparo a arte pra imprimir." />
        <div style={{ marginTop: mobile ? 34 : 46, borderTop: '1px solid var(--border-subtle)' }}>
          {Db.services.map((it, i) => (
            <div key={it.title} style={{
              display: 'grid', gridTemplateColumns: mobile ? 'auto 1fr' : '80px 46px 1fr', alignItems: mobile ? 'flex-start' : 'center',
              gap: mobile ? 14 : 24, padding: mobile ? '22px 4px' : '26px 8px', borderBottom: '1px solid var(--border-subtle)',
            }}>
              {!mobile && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>{String(i + 1).padStart(2, '0')}</span>}
              <span style={{ width: 46, height: 46, borderRadius: 'var(--radius-md)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-raised)', border: '1px solid var(--border-default)', flexShrink: 0 }}>
                <Icon name={it.icon} size={22} color={it.tone} />
              </span>
              <div style={{ gridColumn: mobile ? '2' : 'auto' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: mobile ? 19 : 23, color: 'var(--text-strong)', margin: '0 0 5px' }}>{it.title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14.5, lineHeight: 1.55, color: 'var(--text-muted)', margin: 0, maxWidth: 620 }}>{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= WORKS ================= */
function catOf(w) {
  if (/kit/i.test(w.type)) return 'Kits gráficos';
  if (/arte final/i.test(w.type)) return 'Arte final';
  return 'Adesivos';
}
function Works() {
  const mobile = useMQ('(max-width: 760px)');
  const tablet = useMQ('(max-width: 1024px)');
  const cats = ['Tudo', 'Kits gráficos', 'Adesivos', 'Arte final'];
  const [active, setActive] = React.useState('Tudo');
  const [sel, setSel] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const scrollerRef = React.useRef(null);
  const shown = Db.works.filter(w => active === 'Tudo' || catOf(w) === active);
  const cols = tablet ? 2 : 3;

  const openWork = (w) => setSel(w);
  const closeWork = (viaUi) => {
    setSel(null);
    if (viaUi && window.history.state && window.history.state.fgWork) window.history.back();
  };

  // ao trocar o filtro no mobile, volta o carrossel pro início
  React.useEffect(() => {
    if (scrollerRef.current) scrollerRef.current.scrollTo({ left: 0 });
    setPage(0);
  }, [active]);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el || !el.firstChild) return;
    const step = el.firstChild.offsetWidth + 14;
    setPage(Math.max(0, Math.min(shown.length - 1, Math.round(el.scrollLeft / step))));
  };

  const Wcard = ({ w }) => (
    <a href={'#projeto-' + w.slug} onClick={(e) => { e.preventDefault(); openWork(w); }} style={{
      display: 'block', borderRadius: 'var(--radius-xl)', overflow: 'hidden', textDecoration: 'none',
      border: '1px solid var(--border-subtle)', background: 'var(--surface-card)', cursor: 'pointer',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.borderColor = 'var(--border-default)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}>
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3 / 2', background: 'var(--fg-void)' }}>
        <img src={w.image} alt={w.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        {w.featured && (
          <span style={{ position: 'absolute', top: 12, left: 12 }}>
            <FGb.Badge tone="gold" solid>Destaque</FGb.Badge>
          </span>
        )}
        <div style={{ position: 'absolute', left: 10, right: 10, bottom: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {w.specs.slice(0, 2).map(s => (
            <span key={s} style={{
              fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.06em', color: 'var(--text-strong)',
              padding: '4px 8px', borderRadius: 'var(--radius-pill)', background: 'rgba(5,5,9,0.6)',
              border: '1px solid var(--border-default)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
            }}>{s}</span>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '15px 17px' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, color: 'var(--text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{w.title}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginTop: 4, letterSpacing: '0.04em' }}>{w.type.toUpperCase()}</div>
        </div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, flexShrink: 0, fontFamily: 'var(--font-sans)', fontSize: 12.5, fontWeight: 600, color: 'var(--accent)' }}>
          Ver <Icon name="ArrowUpRight" size={16} color="var(--accent)" />
        </span>
      </div>
    </a>
  );

  return (
    <section id="trabalhos" style={{ background: 'var(--surface-page)' }}>
      <div className="fg-reveal" style={{ ...window.FG_WRAP(mobile), padding: mobile ? '64px 20px' : '90px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 18 }}>
          <SectionHead kicker="Trabalhos selecionados" title="Constelação de projetos." mobile={mobile} />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {cats.map(c => (
              <FGb.Tag key={c} active={active === c} onClick={() => setActive(c)} style={{ cursor: 'pointer', fontFamily: 'var(--font-sans)', textTransform: 'none', letterSpacing: 0, fontSize: 13 }}>{c}</FGb.Tag>
            ))}
          </div>
        </div>

        {mobile ? (
          <>
            {/* carrossel horizontal com snap + fades nas bordas */}
            <div style={{ position: 'relative', margin: '28px -20px 0' }}>
              <div ref={scrollerRef} onScroll={onScroll} className="fg-hscroll" style={{
                display: 'flex', gap: 14, overflowX: 'auto', scrollSnapType: 'x mandatory',
                padding: '0 20px 6px',
              }}>
                {shown.map(w => (
                  <div key={w.slug} style={{ flex: '0 0 80%', scrollSnapAlign: 'center' }}>
                    <Wcard w={w} />
                  </div>
                ))}
              </div>
              {/* fade esquerda */}
              <div aria-hidden="true" style={{
                position: 'absolute', top: 0, left: 0, bottom: 6, width: 40, pointerEvents: 'none', zIndex: 2,
                background: 'linear-gradient(to right, var(--surface-page) 18%, transparent)',
                opacity: page > 0 ? 1 : 0, transition: 'opacity var(--dur-base) var(--ease-out)',
              }} />
              {/* fade direita + chevron — sugere que há mais projetos pra deslizar */}
              <div aria-hidden="true" style={{
                position: 'absolute', top: 0, right: 0, bottom: 6, width: 88, pointerEvents: 'none', zIndex: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 8,
                background: 'linear-gradient(to left, var(--surface-page) 30%, transparent)',
                opacity: page < shown.length - 1 ? 1 : 0, transition: 'opacity var(--dur-base) var(--ease-out)',
              }}>
                <span style={{
                  width: 32, height: 32, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--surface-card)', border: '1px solid var(--border-default)', boxShadow: '0 4px 14px rgba(5,5,9,0.5)',
                }}>
                  <Icon name="ChevronRight" size={17} color="var(--accent)" />
                </span>
              </div>
            </div>
            {/* indicador */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 16 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {shown.map((w, i) => (
                  <span key={w.slug} style={{
                    width: i === page ? 18 : 6, height: 6, borderRadius: 3,
                    background: i === page ? 'var(--accent)' : 'var(--border-default)',
                    transition: 'width var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)',
                  }} />
                ))}
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
                {String(page + 1).padStart(2, '0')} / {String(shown.length).padStart(2, '0')}
              </span>
            </div>
          </>
        ) : (
          <div key={active} className="fg-grid-swap" style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 18, marginTop: 40 }}>
            {shown.map(w => <Wcard key={w.slug} w={w} />)}
          </div>
        )}
      </div>

      {sel && <window.WorkDetail work={sel} onClose={closeWork} />}
    </section>
  );
}

/* ================= LIVE SITES ================= */
function LiveSites() {
  const mobile = useMQ('(max-width: 760px)');
  const domain = (u) => u.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return (
    <section id="sites" style={{ background: 'var(--surface-section)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="fg-reveal" style={{ ...window.FG_WRAP(mobile), padding: mobile ? '64px 20px' : '90px 32px' }}>
        <SectionHead kicker="No ar" kickerColor="var(--aurora)" title="Sites que já estão orbitando." mobile={mobile}
          sub="Projetos publicados e rodando. Dá pra visitar agora mesmo." />
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)', gap: mobile ? 18 : 24, marginTop: mobile ? 30 : 44 }}>
          {Db.liveSites.map(s => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{
              display: 'block', textDecoration: 'none', borderRadius: 'var(--radius-xl)', overflow: 'hidden',
              border: '1px solid var(--border-subtle)', background: 'var(--surface-card)', boxShadow: 'var(--shadow-md)',
              transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.borderColor = 'var(--border-default)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}>
              {/* browser chrome */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface-raised)' }}>
                <span style={{ display: 'flex', gap: 6 }}>
                  {['#FF6B81', '#F0C66B', '#5FE3C8'].map(c => <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.85 }} />)}
                </span>
                <span style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-muted)', letterSpacing: '0.02em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{domain(s.url)}</span>
                <Icon name="ExternalLink" size={14} color="var(--text-muted)" />
              </div>
              {/* live preview */}
              <div className="fg-starfield" style={{ position: 'relative', height: mobile ? 200 : 260, background: s.g, overflow: 'hidden' }}>
                <iframe src={s.url} title={s.name} loading="lazy" tabIndex={-1} scrolling="no" style={{
                  position: 'absolute', top: 0, left: 0, width: '200%', height: '200%',
                  border: 0, transform: 'scale(0.5)', transformOrigin: 'top left', pointerEvents: 'none',
                  background: 'transparent',
                }} />
                <span style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
                  <FGb.Badge tone="aurora" dot>Ao vivo</FGb.Badge>
                </span>
              </div>
              {/* footer */}
              <div style={{ padding: mobile ? '16px 18px' : '20px 22px', background: 'var(--surface-card)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: mobile ? 20 : 24, color: 'var(--text-strong)', margin: 0 }}>{s.title}</h3>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-sans)', fontSize: 13.5, fontWeight: 600, color: 'var(--accent)' }}>
                    Ver site <Icon name="ArrowUpRight" size={16} color="var(--accent)" />
                  </span>
                </div>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-muted)', margin: '7px 0 14px' }}>{s.role}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {s.tags.map(t => <FGb.Tag key={t} style={{ fontFamily: 'var(--font-sans)', textTransform: 'none', letterSpacing: 0, fontSize: 12 }}>{t}</FGb.Tag>)}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= ABOUT ================= */
function About() {
  const mobile = useMQ('(max-width: 860px)');
  const a = Db.about;
  const Photo = (
    <div style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-lg)', aspectRatio: mobile ? '4 / 3' : '4 / 5' }}>
      <img src={Db.profile.photo} alt={Db.profile.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 38%', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 55%, rgba(5,5,9,0.85))' }} />
      <div style={{ position: 'absolute', left: 18, right: 18, bottom: 16 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--text-strong)' }}>{Db.profile.name}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-body)', letterSpacing: '0.06em', marginTop: 4 }}>{Db.profile.location.toUpperCase()}</div>
      </div>
    </div>
  );
  const Text = (
    <div>
      <FGb.Eyebrow color="var(--premium)">{a.kicker}</FGb.Eyebrow>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: mobile ? 'clamp(26px,7vw,34px)' : 'clamp(30px,3.4vw,44px)', letterSpacing: '-0.02em', color: 'var(--text-strong)', margin: '16px 0 20px', lineHeight: 1.1 }}>{a.heading}</h2>
      {a.body.map((p, i) => (
        <p key={i} style={{ fontFamily: 'var(--font-sans)', fontSize: mobile ? 15.5 : 16.5, lineHeight: 1.7, color: 'var(--text-body)', margin: '0 0 16px', maxWidth: 540 }}>{p}</p>
      ))}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 22 }}>
        {a.tags.map(t => <FGb.Tag key={t}>{t}</FGb.Tag>)}
      </div>
      <div style={{ marginTop: 26 }}>
        <FGb.Button variant="secondary" onClick={() => window.open(Db.contact.instagramUrl, '_blank')} iconLeft={<Icon name="Instagram" size={16} />}>Ver no Instagram</FGb.Button>
      </div>
    </div>
  );
  return (
    <section id="sobre" style={{ background: 'var(--surface-page)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="fg-reveal" style={{ ...window.FG_WRAP(mobile), padding: mobile ? '64px 20px' : '96px 32px', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '0.85fr 1.15fr', gap: mobile ? 34 : 60, alignItems: 'center' }}>
        {Photo}{Text}
      </div>
    </section>
  );
}

/* ================= PRODUCTION ================= */
function Production() {
  const mobile = useMQ('(max-width: 860px)');
  return (
    <section className="fg-nebula-bg" style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
      <div className="fg-reveal" style={{ ...window.FG_WRAP(mobile), padding: mobile ? '56px 20px' : '68px 32px', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1.1fr', gap: mobile ? 28 : 52, alignItems: 'center' }}>
        <div>
          <FGb.Eyebrow color="var(--premium)">Diferencial</FGb.Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: mobile ? 'clamp(24px,6.5vw,30px)' : 'clamp(26px,3vw,38px)', letterSpacing: '-0.02em', color: 'var(--text-strong)', margin: '14px 0 14px', lineHeight: 1.1 }}>
            Arte final que a gráfica agradece.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: mobile ? 15 : 16, lineHeight: 1.65, color: 'var(--text-body)', margin: 0, maxWidth: 460 }}>
            Anos de produção em impressão — eu falo a língua da máquina. Cada arquivo sai com cor calibrada, sangria certa e encaixe conferido.
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {Db.specs.map(s => <FGb.Tag key={s}>{s}</FGb.Tag>)}
        </div>
      </div>
    </section>
  );
}

/* ================= PROCESS ================= */
function Process() {
  const mobile = useMQ('(max-width: 760px)');
  return (
    <section id="processo" style={{ background: 'var(--surface-section)' }}>
      <div className="fg-reveal" style={{ ...window.FG_WRAP(mobile), padding: mobile ? '64px 20px' : '90px 32px' }}>
        <SectionHead kicker="Como funciona" title="Quatro órbitas até o lançamento." mobile={mobile} />
        <div style={{ marginTop: mobile ? 34 : 48, position: 'relative', paddingLeft: mobile ? 34 : 42 }}>
          <span style={{ position: 'absolute', left: mobile ? 11 : 15, top: 6, bottom: 6, width: 2, background: 'linear-gradient(180deg, var(--accent), var(--aurora), transparent)' }} />
          {Db.process.map(s => (
            <div key={s.n} style={{ position: 'relative', paddingBottom: 30 }}>
              <span style={{ position: 'absolute', left: mobile ? -34 : -42, top: 0, width: mobile ? 24 : 32, height: mobile ? 24 : 32, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-active)', border: '1px solid var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)' }}>{s.n}</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: mobile ? 20 : 24, color: 'var(--text-strong)', margin: '2px 0 6px' }}>{s.t}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: mobile ? 14.5 : 15.5, lineHeight: 1.6, color: 'var(--text-muted)', margin: 0, maxWidth: 520 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { SectionHead, Services, Works, LiveSites, About, Production, Process });
