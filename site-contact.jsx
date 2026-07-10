// FG Designs — site (parte 3): Contato + Footer + App + FAB
const FGc = window.FGDesignsCosmosDesignSystem_29e3f7;
const Dc  = window.FG_DATA;
const IconC = window.Icon;

/* ================= CONTACT ================= */
function Contact() {
  const mobile = window.useMediaQuery('(max-width: 860px)');
  const [sent, setSent] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const [err, setErr] = React.useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) { setErr('Me conta seu nome pra eu saber com quem falo.'); return; }
    if (!email.trim() && !msg.trim()) { setErr('Deixa um contato ou conta um pouco do projeto.'); return; }
    setErr('');
    const text = `Oi Kauê! Sou ${name}.` + (msg ? ` ${msg}` : '') + (email ? ` (contato: ${email})` : '');
    window.open('https://wa.me/5541995917905?text=' + encodeURIComponent(text), '_blank');
    setSent(true);
  };

  const rows = [
    { ic: 'WhatsApp', label: Dc.contact.whatsappLabel, sub: 'WhatsApp', url: Dc.contact.whatsappUrl },
    { ic: 'Mail', label: Dc.contact.email, sub: 'E-mail', url: 'mailto:' + Dc.contact.email },
    { ic: 'Instagram', label: Dc.contact.instagramLabel, sub: 'Instagram', url: Dc.contact.instagramUrl },
    { ic: 'MapPin', label: Dc.profile.location, sub: 'Base', url: null },
  ];

  return (
    <section id="contato" className="fg-cosmos" style={{ borderTop: '1px solid var(--border-subtle)' }}>
      <div className="fg-reveal" style={{ ...window.FG_WRAP(mobile), padding: mobile ? '68px 20px' : '100px 32px', display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? 40 : 56, alignItems: 'center' }}>
        <div>
          <FGc.Eyebrow>Vamos conversar</FGc.Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: mobile ? 'clamp(32px,9vw,44px)' : 'clamp(34px,4.5vw,56px)', letterSpacing: '-0.03em', color: 'var(--text-strong)', margin: '16px 0 18px', lineHeight: 1.04 }}>
            Sua ideia merece<br />o espaço todo.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: mobile ? 16 : 17, lineHeight: 1.6, color: 'var(--text-body)', margin: '0 0 26px', maxWidth: 430 }}>
            Conte o que precisa criar. Respondo em até 24h com próximos passos e um orçamento honesto.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 30 }}>
            <FGc.Button glow onClick={() => window.open(Dc.contact.whatsappUrl, '_blank')} iconLeft={<IconC name="WhatsApp" size={17} />}>Chamar no WhatsApp</FGc.Button>
            <FGc.Button variant="secondary" onClick={() => { window.location.href = 'mailto:' + Dc.contact.email; }} iconLeft={<IconC name="Mail" size={16} />}>E-mail</FGc.Button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {rows.map(r => {
              const inner = (
                <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '10px 0' }}>
                  <span style={{ width: 38, height: 38, borderRadius: 'var(--radius-md)', flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-card)', border: '1px solid var(--border-default)' }}>
                    <IconC name={r.ic} size={17} color="var(--accent)" />
                  </span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{r.sub}</div>
                    <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--text-strong)', marginTop: 2 }}>{r.label}</div>
                  </div>
                </div>
              );
              return r.url
                ? <a key={r.sub} href={r.url} target={r.url.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{inner}</a>
                : <div key={r.sub}>{inner}</div>;
            })}
          </div>
        </div>

        <FGc.Card variant="glow" padding={mobile ? '24px' : '32px'}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '32px 8px' }}>
              <span style={{ width: 64, height: 64, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent-soft)', boxShadow: 'var(--glow-violet)' }}>
                <IconC name="Check" size={30} color="var(--accent)" />
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--text-strong)', margin: '20px 0 8px' }}>Abrindo o WhatsApp 🛰️</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--text-muted)', margin: 0 }}>Valeu, {name.split(' ')[0] || 'pessoa'}! Se não abriu, me chama em {Dc.contact.whatsappLabel}.</p>
              <div style={{ marginTop: 22 }}><FGc.Button variant="secondary" onClick={() => { setSent(false); setName(''); setEmail(''); setMsg(''); }}>Enviar outro</FGc.Button></div>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <FGc.Input label="Nome" placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)} />
              <FGc.Input label="E-mail ou telefone" placeholder="pra eu te retornar" value={email} onChange={e => setEmail(e.target.value)} />
              <FGc.Textarea label="Sobre o projeto" rows={4} placeholder="Tipo, prazo, referências…" value={msg} onChange={e => setMsg(e.target.value)} />
              {err && (
                <div role="alert" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-sans)', fontSize: 13.5, color: 'var(--fg-danger)' }}>
                  <IconC name="AlertCircle" size={15} color="var(--fg-danger)" /> {err}
                </div>
              )}
              <FGc.Button type="submit" full glow iconRight={<IconC name="Send" size={16} />}>Enviar pelo WhatsApp</FGc.Button>
            </form>
          )}
        </FGc.Card>
      </div>
    </section>
  );
}

/* ================= FOOTER ================= */
function Footer() {
  const mobile = window.useMediaQuery('(max-width: 760px)');
  const socials = [
    { ic: 'Instagram', url: Dc.contact.instagramUrl },
    { ic: 'WhatsApp', url: Dc.contact.whatsappUrl },
    { ic: 'Mail', url: 'mailto:' + Dc.contact.email },
  ];
  return (
    <footer style={{ background: 'var(--surface-sunken)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="fg-reveal" style={{ ...window.FG_WRAP(mobile), padding: mobile ? '30px 20px' : '40px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={window.FG_LOGO} alt="FG Designs" style={{ height: 28 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>© 2026 FG Designs · a vastidão da galáxia</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {socials.map(s => (
            <a key={s.ic} href={s.url} target={s.url.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={s.ic} style={{
              width: 40, height: 40, borderRadius: 'var(--radius-md)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--surface-card)', border: '1px solid var(--border-default)', color: 'var(--text-muted)',
              transition: 'color var(--dur-fast), border-color var(--dur-fast)',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-default)'; }}>
              <IconC name={s.ic} size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ================= WhatsApp FAB ================= */
function WhatsFab() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <a href={Dc.contact.whatsappUrl} target="_blank" rel="noopener" aria-label="Falar no WhatsApp" style={{
      position: 'fixed', right: 20, bottom: 20, zIndex: 70,
      width: 56, height: 56, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--accent)', color: 'var(--text-on-accent)', boxShadow: 'var(--glow-violet)',
      opacity: show ? 1 : 0, transform: show ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.9)',
      pointerEvents: show ? 'auto' : 'none', transition: 'opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-spring)',
    }}>
      <IconC name="WhatsApp" size={26} />
    </a>
  );
}

/* ================= APP ================= */
function App() {
  // reveal-on-scroll para as seções (suave, com fallbacks robustos)
  React.useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('fg-reveal-ready');
    const els = Array.from(document.querySelectorAll('.fg-reveal'));
    const io = new IntersectionObserver((ents) => {
      ents.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    els.forEach(el => io.observe(el));
    // rede de segurança: nunca deixar conteúdo oculto
    const safety = setTimeout(() => els.forEach(el => el.classList.add('is-visible')), 2600);
    return () => { io.disconnect(); clearTimeout(safety); };
  }, []);

  return (
    <div className="fg-root">
      <window.Nav />
      <main>
        <window.Hero />
        <window.ShowReel />
        <window.Services />
        <window.Works />
        <window.LiveSites />
        <window.Testimonials />
        <window.Pricing />
        <window.About />
        <window.Production />
        <window.Process />
        <Contact />
      </main>
      <Footer />
      <WhatsFab />
      {window.CosmicClimber && <window.CosmicClimber />}
    </div>
  );
}

Object.assign(window, { Contact, Footer, WhatsFab });
window.FGApp = App;
