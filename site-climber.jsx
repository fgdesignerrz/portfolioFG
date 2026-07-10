// FG Designs — Cosmic Astronaut
// Astronauta pendurado numa corda, na lateral. Balança (GSAP), pode ser arrastado
// e "desce" conforme a rolagem — chamariz que acompanha o scroll.
// Degrada com elegância: sem GSAP vira balanço em CSS; em telas muito estreitas some.

function useMinWidth(px) {
  const q = `(min-width: ${px}px)`;
  const [m, setM] = React.useState(() => window.matchMedia(q).matches);
  React.useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    on(); mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [q]);
  return m;
}

function CosmicClimber({
  ropeHeight = 96,
  ropeWidth = 2,
  iconSize = 58,
  minAngle = 5,
  initialAngle = 9,
  gravity = 13,
}) {
  const wide = useMinWidth(900);
  const wrapRef = React.useRef(null);
  const ropeRef = React.useRef(null);
  const iconRef = React.useRef(null);
  const swingRef = React.useRef(null);

  // --- balanço (pêndulo) ---
  React.useEffect(() => {
    if (!wide || !ropeRef.current) return;
    const rope = ropeRef.current;
    const g = window.gsap;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!g) { // fallback CSS
      if (!reduce) rope.style.animation = 'fg-climber-swing 3.4s ease-in-out infinite';
      return;
    }
    if (window.Draggable) { try { g.registerPlugin(window.Draggable); } catch (e) {} }

    let angle = initialAngle, dir = -1;
    g.set(rope, { rotation: initialAngle, transformOrigin: 'top center' });

    function startSwing() {
      if (reduce) return;
      swingRef.current = g.to(rope, {
        rotation: dir * angle,
        duration: 1.8 + angle / 50,
        ease: 'power1.inOut',
        onComplete: () => { angle = Math.max(angle - gravity, minAngle); dir *= -1; startSwing(); },
      });
    }
    startSwing();

    let drag = null;
    if (window.Draggable && iconRef.current) {
      drag = window.Draggable.create(rope, {
        type: 'rotation',
        trigger: iconRef.current,           // agarra o astronauta, gira a corda
        bounds: { minRotation: -80, maxRotation: 80 },
        dragResistance: 0.4,
        edgeResistance: 1,
        onPress() { if (swingRef.current) swingRef.current.kill(); },
        onRelease() {
          dir = this.rotation >= 0 ? -1 : 1;
          angle = Math.max(Math.abs(this.rotation) - gravity, minAngle);
          startSwing();
        },
      });
    }

    return () => {
      if (swingRef.current) swingRef.current.kill();
      if (drag && drag[0]) drag[0].kill();
    };
  }, [wide, initialAngle, minAngle, gravity]);

  // --- descida com a rolagem ---
  React.useEffect(() => {
    if (!wide || !wrapRef.current) return;
    const wrap = wrapRef.current;
    const g = window.gsap;
    const total = ropeHeight + iconSize;
    const topStart = 84; // logo abaixo do nav

    const qY = g ? g.quickTo(wrap, 'y', { duration: 0.6, ease: 'power2.out' }) : null;
    wrap.style.transition = 'opacity .5s var(--ease-out), visibility .5s var(--ease-out)';
    if (!g) wrap.style.willChange = 'transform, opacity';

    let raf = 0;
    function update() {
      raf = 0;
      const max = (document.documentElement.scrollHeight - window.innerHeight) || 1;
      const y = window.scrollY;
      const p = Math.min(Math.max(y / max, 0), 1);
      const hero = document.getElementById('inicio');
      const appearAt = (hero ? hero.offsetHeight : window.innerHeight) * 0.42;
      const shown = y > appearAt;
      const travel = Math.max(window.innerHeight - total - topStart - 26, 0);
      const ty = topStart + p * travel;
      if (qY) qY(ty); else wrap.style.transform = `translateY(${ty}px)`;
      wrap.style.opacity = shown ? '1' : '0';
      wrap.style.visibility = shown ? 'visible' : 'hidden';
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [wide, ropeHeight, iconSize]);

  if (!wide) return null;

  return (
    <div ref={wrapRef} aria-hidden="true" style={{
      position: 'fixed', top: 0,
      right: 'max(10px, calc((100vw - var(--container)) / 2 - 24px))',
      width: iconSize, zIndex: 45, pointerEvents: 'none',
      opacity: 0, visibility: 'hidden', willChange: 'transform, opacity',
    }}>
      {/* ponto de ancoragem */}
      <div style={{ position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)', width: 9, height: 9, borderRadius: '50%', background: 'var(--accent)', boxShadow: 'var(--glow-violet)', pointerEvents: 'none' }} />
      {/* corda */}
      <div ref={ropeRef} style={{
        position: 'relative', width: ropeWidth, height: ropeHeight, margin: '0 auto',
        background: 'linear-gradient(180deg, rgba(142,123,255,0.15), rgba(142,123,255,0.6))',
        transformOrigin: 'top center', pointerEvents: 'auto', willChange: 'transform',
      }}>
        {/* astronauta */}
        <div ref={iconRef} className="fg-climber-icon" style={{
          position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
          width: iconSize, height: iconSize, cursor: 'grab', pointerEvents: 'auto',
          filter: 'drop-shadow(0 10px 24px rgba(142,123,255,0.4))', transition: 'transform .35s var(--ease-out)',
        }}
          onMouseEnter={(e) => { if (window.gsap) window.gsap.to(e.currentTarget, { scale: 1.12, duration: 0.35, ease: 'power2.out' }); }}
          onMouseLeave={(e) => { if (window.gsap) window.gsap.to(e.currentTarget, { scale: 1, duration: 0.35, ease: 'power2.out' }); }}>
          <AstronautSvg size={iconSize} />
        </div>
      </div>
    </div>
  );
}

function AstronautSvg({ size = 58 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="fgSuitGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#C7CAE2" />
        </linearGradient>
        <linearGradient id="fgVisorGrad" x1="0.15" y1="0.1" x2="0.85" y2="0.95">
          <stop offset="0" stopColor="#A99BFF" />
          <stop offset="0.5" stopColor="#3A2F66" />
          <stop offset="1" stopColor="#0A0A14" />
        </linearGradient>
      </defs>
      {/* antena */}
      <line x1="32" y1="6.5" x2="32" y2="3" stroke="#A7ABC8" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="32" cy="2.4" r="2" fill="#8E7BFF" />
      {/* mochila */}
      <rect x="22" y="24" width="20" height="20" rx="6" fill="#AEB2D0" />
      {/* braços */}
      <rect x="11" y="29" width="7.5" height="17" rx="3.75" fill="url(#fgSuitGrad)" stroke="#A7ABC8" strokeWidth="0.8" />
      <rect x="45.5" y="29" width="7.5" height="17" rx="3.75" fill="url(#fgSuitGrad)" stroke="#A7ABC8" strokeWidth="0.8" />
      {/* pernas */}
      <rect x="24" y="47" width="7" height="13" rx="3" fill="url(#fgSuitGrad)" stroke="#A7ABC8" strokeWidth="0.8" />
      <rect x="33" y="47" width="7" height="13" rx="3" fill="url(#fgSuitGrad)" stroke="#A7ABC8" strokeWidth="0.8" />
      {/* botas */}
      <rect x="23.4" y="57" width="8.2" height="4.4" rx="2.2" fill="#8E7BFF" />
      <rect x="32.4" y="57" width="8.2" height="4.4" rx="2.2" fill="#8E7BFF" />
      {/* torso */}
      <rect x="20" y="30" width="24" height="22" rx="9" fill="url(#fgSuitGrad)" stroke="#A7ABC8" strokeWidth="0.9" />
      {/* mãos */}
      <circle cx="14.75" cy="46.5" r="4.1" fill="url(#fgSuitGrad)" stroke="#A7ABC8" strokeWidth="0.8" />
      <circle cx="49.25" cy="46.5" r="4.1" fill="url(#fgSuitGrad)" stroke="#A7ABC8" strokeWidth="0.8" />
      {/* painel do peito */}
      <rect x="26.5" y="36" width="11" height="8" rx="2" fill="#12122A" stroke="#2B2B45" strokeWidth="0.6" />
      <circle cx="29.5" cy="40" r="1.1" fill="#5FE3C8" />
      <circle cx="33" cy="40" r="1.1" fill="#8E7BFF" />
      <rect x="35" y="38.4" width="1.5" height="3.2" rx="0.75" fill="#F0C66B" />
      {/* capacete */}
      <circle cx="32" cy="19" r="14" fill="url(#fgSuitGrad)" stroke="#A7ABC8" strokeWidth="0.9" />
      {/* viseira */}
      <ellipse cx="32" cy="19.5" rx="10.5" ry="9.5" fill="url(#fgVisorGrad)" />
      {/* brilhos da viseira */}
      <ellipse cx="27.5" cy="15.5" rx="3.3" ry="2.1" fill="#FFFFFF" opacity="0.5" transform="rotate(-25 27.5 15.5)" />
      <circle cx="36.5" cy="22.5" r="1.3" fill="#FFFFFF" opacity="0.45" />
      {/* estrelinha refletida */}
      <path d="M34.2 14.6 l0.55 1.35 1.45 .2 -1.05 1 .28 1.45 -1.23 -.75 -1.23 .75 .28 -1.45 -1.05 -1 1.45 -.2z" fill="#FFFFFF" opacity="0.75" />
    </svg>
  );
}

window.CosmicClimber = CosmicClimber;
