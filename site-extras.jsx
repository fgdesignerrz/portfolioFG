// FG Designs — site (parte 4): Depoimentos, Preços e Detalhe de projeto
const FGx = window.FGDesignsCosmosDesignSystem_29e3f7;
const Dx  = window.FG_DATA;
const IconX = window.Icon;
const useMQx = window.useMediaQuery;

/* ================= TESTIMONIALS ================= */
function Testimonials() {
  const mobile = useMQx('(max-width: 760px)');
  return (
    <section id="depoimentos" style={{ background: 'var(--surface-page)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="fg-reveal" style={{ ...window.FG_WRAP(mobile), padding: mobile ? '64px 20px' : '90px 32px' }}>
        <window.SectionHead kicker="Depoimentos" kickerColor="var(--premium)" title="Quem já lançou comigo." mobile={mobile}
          sub="Palavra de quem recebeu o projeto — direto das conversas de entrega." />
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)', gap: mobile ? 14 : 18, marginTop: mobile ? 32 : 44 }}>
          {Dx.testimonials.map(t => (
            <FGx.Card key={t.author} padding={mobile ? '22px' : '28px'}>
              <IconX name="Quote" size={22} color="var(--accent)" />
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: mobile ? 19 : 22, lineHeight: 1.35, color: 'var(--text-strong)', margin: '14px 0 20px', letterSpacing: '-0.01em' }}>
                “{t.quote}”
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 38, height: 38, borderRadius: '50%', flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent-soft)', border: '1px solid var(--border-default)', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--accent)' }}>
                  {t.author.charAt(0)}
                </span>
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14.5, color: 'var(--text-strong)' }}>{t.author}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 3 }}>{t.tag}</div>
                </div>
              </div>
            </FGx.Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= PRICING ================= */
function Pricing() {
  const mobile = useMQx('(max-width: 860px)');
  const p = Dx.pricing;
  const planWa = (name) => 'https://wa.me/5541995917905?text=' + encodeURIComponent(`Oi Kauê! Tenho interesse no plano ${name} de landing page.`);

  return (
    <section id="precos" style={{ background: 'var(--surface-section)', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="fg-reveal" style={{ ...window.FG_WRAP(mobile), padding: mobile ? '64px 20px' : '90px 32px' }}>
        <window.SectionHead kicker={p.kicker} title={p.title} sub={p.sub} mobile={mobile} />

        {/* planos */}
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)', gap: mobile ? 16 : 22, marginTop: mobile ? 32 : 46, maxWidth: 880 }}>
          {p.plans.map(plan => (
            <FGx.Card key={plan.name} variant={plan.featured ? 'glow' : undefined} padding={mobile ? '24px' : '30px'}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: mobile ? 21 : 24, color: 'var(--text-strong)', margin: 0 }}>{plan.name}</h3>
                {plan.featured && <FGx.Badge tone="gold" solid>Mais completo</FGx.Badge>}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: mobile ? 30 : 36, letterSpacing: '-0.02em', color: plan.featured ? 'var(--accent)' : 'var(--text-strong)', margin: '14px 0 4px' }}>{plan.price}</div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14.5, color: 'var(--text-muted)', margin: '0 0 20px' }}>{plan.tagline}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 24 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <IconX name="Check" size={16} color={plan.featured ? 'var(--accent)' : 'var(--aurora)'} style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14.5, lineHeight: 1.5, color: 'var(--text-body)' }}>{f}</span>
                  </div>
                ))}
              </div>
              <FGx.Button full glow={plan.featured} variant={plan.featured ? 'primary' : 'secondary'}
                onClick={() => window.open(planWa(plan.name), '_blank')}
                iconRight={<IconX name="ArrowRight" size={16} />}>
                Quero o {plan.name}
              </FGx.Button>
            </FGx.Card>
          ))}
        </div>

        {/* peças gráficas: sob orçamento */}
        <div style={{ marginTop: mobile ? 16 : 22, maxWidth: 880 }}>
          <FGx.Card padding={mobile ? '22px' : '26px 30px'}>
            <div style={{ display: 'flex', alignItems: mobile ? 'flex-start' : 'center', gap: mobile ? 14 : 20, flexDirection: mobile ? 'column' : 'row' }}>
              <span style={{ width: 46, height: 46, borderRadius: 'var(--radius-md)', flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-raised)', border: '1px solid var(--border-default)' }}>
                <IconX name="Printer" size={22} color="var(--premium)" />
              </span>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: mobile ? 18 : 20, color: 'var(--text-strong)', margin: '0 0 6px' }}>{p.graphic.title}</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14.5, lineHeight: 1.55, color: 'var(--text-muted)', margin: 0, maxWidth: 560 }}>{p.graphic.desc}</p>
              </div>
              <FGx.Button variant="secondary" onClick={() => window.open(Dx.contact.whatsappQuoteUrl, '_blank')} iconLeft={<IconX name="WhatsApp" size={16} />}>
                Pedir orçamento
              </FGx.Button>
            </div>
          </FGx.Card>
        </div>

        {/* aviso de escopo */}
        <div style={{ marginTop: mobile ? 16 : 22, maxWidth: 880, display: 'flex', gap: 13, padding: mobile ? '16px 18px' : '18px 22px', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border-default)', background: 'var(--surface-card)' }}>
          <IconX name="Info" size={18} color="var(--premium)" style={{ marginTop: 2, flexShrink: 0 }} />
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13.5, lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>{p.note}</p>
        </div>
      </div>
    </section>
  );
}

/* ================= WORK DETAIL (tela cheia) ================= */
function WorkDetail({ work, onClose }) {
  const mobile = useMQx('(max-width: 860px)');

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.history.pushState({ fgWork: work.slug }, '', '#projeto-' + work.slug);
    const onPop = () => onClose(false);
    const onKey = (e) => { if (e.key === 'Escape') onClose(true); };
    window.addEventListener('popstate', onPop);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('keydown', onKey);
    };
  }, [work.slug]);

  const Info = (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
        {work.featured && <FGx.Badge tone="gold" solid>Destaque</FGx.Badge>}
        <FGx.Badge tone="violet">{work.type}</FGx.Badge>
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: mobile ? 'clamp(26px,7vw,34px)' : 'clamp(28px,3vw,40px)', letterSpacing: '-0.02em', lineHeight: 1.1, color: 'var(--text-strong)', margin: '0 0 16px' }}>
        {work.title}
      </h1>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: mobile ? 15 : 16, lineHeight: 1.7, color: 'var(--text-body)', margin: '0 0 20px', maxWidth: 520 }}>
        {work.desc}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 26 }}>
        {work.specs.map(s => <FGx.Tag key={s}>{s}</FGx.Tag>)}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <FGx.Button glow onClick={() => window.open(Dx.contact.whatsappUrl, '_blank')} iconLeft={<IconX name="WhatsApp" size={16} />}>
          Quero um assim
        </FGx.Button>
        <FGx.Button variant="secondary" onClick={() => onClose(true)} iconLeft={<IconX name="ArrowLeft" size={16} />}>
          Voltar
        </FGx.Button>
      </div>
    </div>
  );

  const Gallery = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 18 : 24 }}>
      {work.gallery.map(g => (
        <figure key={g.src} style={{ margin: 0 }}>
          <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: 'var(--fg-void)', boxShadow: 'var(--shadow-md)' }}>
            <img src={g.src} alt={g.cap} style={{ display: 'block', width: '100%', maxHeight: '76vh', objectFit: 'contain', background: 'var(--fg-void)' }} />
          </div>
          <figcaption style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '10px 2px 0' }}>
            {g.cap}
          </figcaption>
        </figure>
      ))}
    </div>
  );

  return (
    <div className="fg-detail-enter" role="dialog" aria-modal="true" aria-label={work.title} style={{
      position: 'fixed', inset: 0, zIndex: 200, overflowY: 'auto', WebkitOverflowScrolling: 'touch',
      background: 'var(--surface-page)',
    }}>
      {/* barra superior */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 5, height: 62,
        display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '1px solid var(--border-subtle)',
        background: 'rgba(10,10,20,0.78)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        padding: mobile ? '0 16px' : '0 28px',
      }}>
        <button onClick={() => onClose(true)} aria-label="Voltar" style={{
          all: 'unset', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 9,
          padding: '9px 14px', borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-default)', background: 'var(--surface-card)',
          fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--text-strong)',
        }}>
          <IconX name="ArrowLeft" size={16} color="var(--accent)" /> Voltar
        </button>
        <span style={{ flex: 1, textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {mobile ? 'Projeto' : 'Trabalhos selecionados · ' + work.title}
        </span>
        <img src={window.FG_LOGO} alt="FG Designs" style={{ height: 24 }} />
      </div>

      {/* conteúdo */}
      <div style={{ ...window.FG_WRAP(mobile), padding: mobile ? '28px 20px 64px' : '48px 32px 90px' }}>
        {mobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>{Info}{Gallery}</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 52, alignItems: 'start' }}>
            {Gallery}
            <div style={{ position: 'sticky', top: 62 + 32 }}>{Info}</div>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { Testimonials, Pricing, WorkDetail });
