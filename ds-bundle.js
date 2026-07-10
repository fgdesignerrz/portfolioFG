/* @ds-bundle: {"format":4,"namespace":"FGDesignsCosmosDesignSystem_29e3f7","components":[{"name":"StarsBackground","sourcePath":"components/backgrounds/StarsBackground.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Stat","sourcePath":"components/core/Stat.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"}],"sourceHashes":{"animations.jsx":"c3cd9e8a4a61","components/backgrounds/StarsBackground.jsx":"aa613814f965","components/core/Avatar.jsx":"cfe2f9738b8d","components/core/Badge.jsx":"8eeebc43241d","components/core/Button.jsx":"5b52e1df21f6","components/core/Card.jsx":"57af6f112ed7","components/core/Eyebrow.jsx":"8aa092d9fb2f","components/core/Stat.jsx":"c55a684038f5","components/core/Tag.jsx":"70779292d772","components/forms/Input.jsx":"952e9b57363f","components/forms/Switch.jsx":"91c0278e37fe","components/forms/Textarea.jsx":"a644a4821132","fg-motion-scene.jsx":"7948bcb8f071","site/data.js":"0e750296e94e","site/data.standalone.js":"e9f718091a00","site/site-climber.jsx":"68d3d9fb94db","site/site-contact.jsx":"a3be83d9a17b","site/site-core.jsx":"19affd89f67c","site/site-core.standalone.jsx":"1781ae098a20","site/site-extras.jsx":"3e3c5226f81c","site/site-sections.jsx":"851c7b94eac0","ui_kits/fgdesigns-site/sections-a.jsx":"0b8878bca358","ui_kits/fgdesigns-site/sections-b.jsx":"a3fd6c58c44f","ui_kits/fgdesigns-site/sections-c.jsx":"66229393083e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FGDesignsCosmosDesignSystem_29e3f7 = window.FGDesignsCosmosDesignSystem_29e3f7 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// animations.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// animations.jsx — timeline engine. Exports (on window): Stage, Sprite,
//   TextSprite, ImageSprite, RectSprite, VideoSprite, PlaybackBar,
//   useTime, useTimeline, useSprite, Easing, interpolate, animate, clamp.
//
//   <Stage width={1280} height={720} duration={10} background="#f6f4ef">
//     <Sprite start={0} end={3}>
//       <TextSprite text="Hello" x={100} y={300} size={72} color="#111" />
//     </Sprite>
//     <Sprite start={2} end={8}>
//       <ImageSprite src="hero.png" x={200} y={120} width={640} height={360} kenBurns />
//     </Sprite>
//   </Stage>
//
// Stage({width,height,duration,background,fps,loop,autoplay}) — auto-scales to
//   viewport; scrubber + play/pause + ←/→ seek + space + 0-reset; persists
//   playhead. The canvas is an <svg><foreignObject>, export-ready: Share →
//   Export → Video (or the PlaybackBar's download button) renders it to .mp4.
//   Stage OWNS the exportable-video contract (the
//   data-om-exportable-video-with-duration-secs attribute + seek listener +
//   font inlining) — NEVER put that attribute on any other element; a second
//   nested "exportable root" makes export and the host timeline bind to the
//   wrong element and silently breaks playback control.
//   Screenshot tools DOM-rerender (not pixel-capture) and unwrap this wrapper
//   so captures should work — but if one comes back black, that's a capture
//   artifact, not a render bug; trust the live preview.
// Sprite({start,end,keepMounted}) — mounts children only while playhead is in
//   [start,end]. Children read {localTime, progress, duration} via useSprite().
// useTime() → seconds; useTimeline() → {time,duration,playing,setTime,setPlaying}.
// TextSprite({text,x,y,size,color,font,weight,align,entryDur,exitDur}) — fades/scales in+out.
// ImageSprite({src,x,y,width,height,fit,radius,kenBurns,placeholder}) — same, with optional ken-burns.
// RectSprite({x,y,width,height,color,radius}) — solid box with entry/exit.
// VideoSprite({src,start,end,speed,style}) — looped <video> clip synced to the
//   timeline; its audio is mixed into the exported video.
// Easing.{linear,easeIn/Out/InOut Quad/Cubic/Quart/Quint/Expo/Back, …}
// interpolate([t0,t1,…],[v0,v1,…],ease?) → (t)=>v  — piecewise tween.
// animate({from,to,start,end,ease}) → (t)=>v  — single tween.
//
// Build scenes by composing Sprites inside Stage. Absolutely-position elements.
//
// In a .dc.html project, put your scene in a sibling my-scene.jsx (reading
// {Stage, Sprite, useTime, Easing, …} from window is safe) and mount BOTH:
//   <x-import component-from-global-scope="MyScene"
//             from="./animations.jsx ./my-scene.jsx"></x-import>
// The two files in from= load in order, so my-scene.jsx can use the globals
// animations.jsx set.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

// ── Easing functions (hand-rolled, Popmotion-style) ─────────────────────────
// All easings take t ∈ [0,1] and return eased t ∈ [0,1] (may overshoot for back/elastic).
const Easing = {
  linear: t => t,
  // Quad
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  // Cubic
  easeInCubic: t => t * t * t,
  easeOutCubic: t => --t * t * t + 1,
  easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  // Quart
  easeInQuart: t => t * t * t * t,
  easeOutQuart: t => 1 - --t * t * t * t,
  easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  // Expo
  easeInExpo: t => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),
  easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  easeInOutExpo: t => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if (t < 0.5) return 0.5 * Math.pow(2, 20 * t - 10);
    return 1 - 0.5 * Math.pow(2, -20 * t + 10);
  },
  // Sine
  easeInSine: t => 1 - Math.cos(t * Math.PI / 2),
  easeOutSine: t => Math.sin(t * Math.PI / 2),
  easeInOutSine: t => -(Math.cos(Math.PI * t) - 1) / 2,
  // Back (overshoot)
  easeOutBack: t => {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  easeInBack: t => {
    const c1 = 1.70158,
      c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  },
  easeInOutBack: t => {
    const c1 = 1.70158,
      c2 = c1 * 1.525;
    return t < 0.5 ? Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2) / 2 : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  },
  // Elastic
  easeOutElastic: t => {
    const c4 = 2 * Math.PI / 3;
    if (t === 0) return 0;
    if (t === 1) return 1;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  }
};

// ── Core interpolation helpers ──────────────────────────────────────────────

// Clamp a value to [min, max]
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// interpolate([0, 0.5, 1], [0, 100, 50], ease?) -> fn(t)
// Popmotion-style: linearly maps t across input keyframes to output values,
// with optional easing per segment (single fn or array of fns).
function interpolate(input, output, ease = Easing.linear) {
  return t => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i];
        const local = span === 0 ? 0 : (t - input[i]) / span;
        const easeFn = Array.isArray(ease) ? ease[i] || Easing.linear : ease;
        const eased = easeFn(local);
        return output[i] + (output[i + 1] - output[i]) * eased;
      }
    }
    return output[output.length - 1];
  };
}

// animate({from, to, start, end, ease})(t) — simpler single-segment tween.
// Returns `from` before `start`, `to` after `end`.
function animate({
  from = 0,
  to = 1,
  start = 0,
  end = 1,
  ease = Easing.easeInOutCubic
}) {
  return t => {
    if (t <= start) return from;
    if (t >= end) return to;
    const local = (t - start) / (end - start);
    return from + (to - from) * ease(local);
  };
}

// ── Timeline context ────────────────────────────────────────────────────────

const TimelineContext = React.createContext({
  time: 0,
  duration: 10,
  playing: false
});
const useTime = () => React.useContext(TimelineContext).time;
const useTimeline = () => React.useContext(TimelineContext);

// ── Sprite ──────────────────────────────────────────────────────────────────
// Renders children only when the playhead is inside [start, end]. Provides
// a sub-context with `localTime` (seconds since start) and `progress` (0..1).
//
//   <Sprite start={2} end={5}>
//     {({ localTime, progress }) => <Thing x={progress * 100} />}
//   </Sprite>
//
// Or as a plain wrapper — children can call useSprite() themselves.

const SpriteContext = React.createContext({
  localTime: 0,
  progress: 0,
  duration: 0
});
const useSprite = () => React.useContext(SpriteContext);
function Sprite({
  start = 0,
  end = Infinity,
  children,
  keepMounted = false
}) {
  const {
    time
  } = useTimeline();
  const visible = time >= start && time <= end;
  if (!visible && !keepMounted) return null;
  const duration = end - start;
  const localTime = Math.max(0, time - start);
  const progress = duration > 0 && isFinite(duration) ? clamp(localTime / duration, 0, 1) : 0;
  const value = {
    localTime,
    progress,
    duration,
    visible
  };
  return /*#__PURE__*/React.createElement(SpriteContext.Provider, {
    value: value
  }, typeof children === 'function' ? children(value) : children);
}

// ── Sample sprite components ────────────────────────────────────────────────

// TextSprite: fades/slides text in on entry, holds, then fades out on exit.
// Props: text, x, y, size, color, font, entryDur, exitDur, align
function TextSprite({
  text,
  x = 0,
  y = 0,
  size = 48,
  color = '#111',
  font = 'Inter, system-ui, sans-serif',
  weight = 600,
  entryDur = 0.45,
  exitDur = 0.35,
  entryEase = Easing.easeOutBack,
  exitEase = Easing.easeInCubic,
  align = 'left',
  letterSpacing = '-0.01em'
}) {
  const {
    localTime,
    duration
  } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1;
  let ty = 0;
  if (localTime < entryDur) {
    const t = entryEase(clamp(localTime / entryDur, 0, 1));
    opacity = t;
    ty = (1 - t) * 16;
  } else if (localTime > exitStart) {
    const t = exitEase(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    ty = -t * 8;
  }
  const translateX = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      transform: `translate(${translateX}, ${ty}px)`,
      opacity,
      fontFamily: font,
      fontSize: size,
      fontWeight: weight,
      color,
      letterSpacing,
      whiteSpace: 'pre',
      lineHeight: 1.1,
      willChange: 'transform, opacity'
    }
  }, text);
}

// ImageSprite: scales + fades in; optional Ken Burns drift during hold.
function ImageSprite({
  src,
  x = 0,
  y = 0,
  width = 400,
  height = 300,
  entryDur = 0.6,
  exitDur = 0.4,
  kenBurns = false,
  kenBurnsScale = 1.08,
  radius = 12,
  fit = 'cover',
  placeholder = null // {label: string} for striped placeholder
}) {
  const {
    localTime,
    duration
  } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1;
  let scale = 1;
  if (localTime < entryDur) {
    const t = Easing.easeOutCubic(clamp(localTime / entryDur, 0, 1));
    opacity = t;
    scale = 0.96 + 0.04 * t;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    scale = (kenBurns ? kenBurnsScale : 1) + 0.02 * t;
  } else if (kenBurns) {
    const holdSpan = exitStart - entryDur;
    const holdT = holdSpan > 0 ? (localTime - entryDur) / holdSpan : 0;
    scale = 1 + (kenBurnsScale - 1) * holdT;
  }
  const content = placeholder ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'repeating-linear-gradient(135deg, #e9e6df 0 10px, #dcd8cf 10px 20px)',
      color: '#6b6458',
      fontFamily: 'JetBrains Mono, ui-monospace, monospace',
      fontSize: 13,
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    }
  }, placeholder.label || 'image') : /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: fit,
      display: 'block'
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      width,
      height,
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      borderRadius: radius,
      overflow: 'hidden',
      willChange: 'transform, opacity'
    }
  }, content);
}

// RectSprite: simple rectangle that animates position/size/color via props.
// Useful demo primitive — takes a `render` fn for per-frame customization.
function RectSprite({
  x = 0,
  y = 0,
  width = 100,
  height = 100,
  color = '#111',
  radius = 8,
  entryDur = 0.4,
  exitDur = 0.3,
  render // optional: (ctx) => style overrides
}) {
  const spriteCtx = useSprite();
  const {
    localTime,
    duration
  } = spriteCtx;
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1;
  let scale = 1;
  if (localTime < entryDur) {
    const t = Easing.easeOutBack(clamp(localTime / entryDur, 0, 1));
    opacity = clamp(localTime / entryDur, 0, 1);
    scale = 0.4 + 0.6 * t;
  } else if (localTime > exitStart) {
    const t = Easing.easeInQuad(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    scale = 1 - 0.15 * t;
  }
  const overrides = render ? render(spriteCtx) : {};
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      width,
      height,
      background: color,
      borderRadius: radius,
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      willChange: 'transform, opacity',
      ...overrides
    }
  });
}

// ── Font inlining ───────────────────────────────────────────────────────────
// Copy every @font-face rule from the page into a <style> inside the svg's
// foreignObject, with font URLs rewritten to data: URLs. Makes the svg
// self-describing so serializing it alone (video export fast path) still
// renders with the right fonts. Sets data-om-fonts-inlined on the svg when
// done so the exporter can wait for it.

function useInlineFontsInto(svgRef) {
  React.useEffect(() => {
    const svg = svgRef.current;
    const host = svg && svg.querySelector('foreignObject > div');
    if (!svg || !host) return;
    let cancelled = false;
    (async () => {
      const rules = [];
      for (const ss of document.styleSheets) {
        let cssRules;
        try {
          cssRules = ss.cssRules;
        } catch {
          // Cross-origin sheet without crossorigin attr (e.g. the standard
          // fonts.googleapis.com <link>) — fetch the CSS text directly and
          // regex-extract the @font-face blocks.
          if (ss.href) {
            try {
              const txt = await fetch(ss.href).then(r => {
                if (!r.ok) throw 0;
                return r.text();
              });
              for (const ff of txt.match(/@font-face\s*{[^}]*}/g) || []) rules.push({
                css: ff,
                base: ss.href
              });
            } catch {}
          }
          continue;
        }
        if (!cssRules) continue;
        for (const r of cssRules) {
          if (r.type === CSSRule.FONT_FACE_RULE) {
            rules.push({
              css: r.cssText,
              base: ss.href || location.href
            });
          }
        }
      }
      const toDataURL = url => fetch(url).then(r => {
        if (!r.ok) throw 0;
        return r.blob();
      }).then(b => new Promise(res => {
        const fr = new FileReader();
        fr.onload = () => res(fr.result);
        fr.onerror = () => res(url);
        fr.readAsDataURL(b);
      })).catch(() => url);
      const parts = await Promise.all(rules.map(async ({
        css,
        base
      }) => {
        const re = /url\((['"]?)([^'")]+)\1\)/g;
        let out = css,
          m;
        while (m = re.exec(css)) {
          const u = m[2];
          if (u.startsWith('data:')) continue;
          let abs;
          try {
            abs = new URL(u, base).href;
          } catch {
            continue;
          }
          out = out.split(m[0]).join(`url("${await toDataURL(abs)}")`);
        }
        return out;
      }));
      if (cancelled || !parts.length) {
        svg.setAttribute('data-om-fonts-inlined', 'true');
        return;
      }
      const style = document.createElement('style');
      style.textContent = parts.join('\n');
      host.insertBefore(style, host.firstChild);
      svg.setAttribute('data-om-fonts-inlined', 'true');
    })();
    return () => {
      cancelled = true;
    };
  }, []);
}
function Stage({
  width = 1280,
  height = 720,
  duration = 10,
  background = '#f6f4ef',
  fps = 60,
  loop = true,
  autoplay = true,
  persistKey = 'animstage',
  children
}) {
  // Props arrive as strings when Stage is mounted via <x-import> (DC
  // projects) — coerce so style={{width}} gets a number React can px-ify.
  width = +width || 1280;
  height = +height || 720;
  duration = +duration || 10;
  fps = +fps || 60;
  if (typeof loop === 'string') loop = loop !== 'false';
  if (typeof autoplay === 'string') autoplay = autoplay !== 'false';
  const [time, setTime] = React.useState(() => {
    try {
      const v = parseFloat(localStorage.getItem(persistKey + ':t') || '0');
      return isFinite(v) ? clamp(v, 0, duration) : 0;
    } catch {
      return 0;
    }
  });
  const [playing, setPlaying] = React.useState(autoplay);
  const [hoverTime, setHoverTime] = React.useState(null);
  const [scale, setScale] = React.useState(1);
  const stageRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const lastTsRef = React.useRef(null);

  // Persist playhead
  React.useEffect(() => {
    try {
      localStorage.setItem(persistKey + ':t', String(time));
    } catch {}
  }, [time, persistKey]);

  // Auto-scale to fit viewport
  React.useEffect(() => {
    if (!stageRef.current) return;
    const el = stageRef.current;
    const measure = () => {
      const barH = 44; // playback bar height
      const s = Math.min(el.clientWidth / width, (el.clientHeight - barH) / height);
      setScale(Math.max(0.05, s));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [width, height]);

  // Animation loop
  React.useEffect(() => {
    if (!playing) {
      lastTsRef.current = null;
      return;
    }
    const step = ts => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setTime(t => {
        let next = t + dt;
        if (next >= duration) {
          if (loop) next = next % duration;else {
            next = duration;
            setPlaying(false);
          }
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [playing, duration, loop]);

  // Keyboard: space = play/pause, ← → = seek
  React.useEffect(() => {
    const onKey = e => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setPlaying(p => !p);
      } else if (e.code === 'ArrowLeft') {
        setTime(t => clamp(t - (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.code === 'ArrowRight') {
        setTime(t => clamp(t + (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.key === '0' || e.code === 'Home') {
        setTime(0);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [duration]);

  // Video-export protocol: the exporter dispatches this event per frame;
  // pause + sync the playhead so the capture sees exactly that timestamp.
  React.useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const onSeek = e => {
      setPlaying(false);
      setTime(clamp(e.detail.time, 0, duration));
    };
    el.addEventListener('data-om-seek-to-time-frame', onSeek);
    return () => el.removeEventListener('data-om-seek-to-time-frame', onSeek);
  }, [duration]);

  // Inline @font-face rules into the svg's foreignObject so the svg is
  // self-describing — serializing it alone (for video export) then renders
  // with the right fonts. Sets data-om-fonts-inlined once done.
  useInlineFontsInto(canvasRef);
  const displayTime = hoverTime != null ? hoverTime : time;
  const ctxValue = React.useMemo(() => ({
    time: displayTime,
    duration,
    playing,
    setTime,
    setPlaying
  }), [displayTime, duration, playing]);
  return /*#__PURE__*/React.createElement("div", {
    ref: stageRef,
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#0a0a0a',
      fontFamily: 'Inter, system-ui, sans-serif'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    ref: canvasRef,
    width: width,
    height: height,
    "data-om-exportable-video-with-duration-secs": duration,
    style: {
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      flexShrink: 0,
      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("foreignObject", {
    x: "0",
    y: "0",
    width: "100%",
    height: "100%"
  }, /*#__PURE__*/React.createElement("div", {
    xmlns: "http://www.w3.org/1999/xhtml",
    style: {
      width,
      height,
      background,
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(TimelineContext.Provider, {
    value: ctxValue
  }, children))))), /*#__PURE__*/React.createElement(PlaybackBar, {
    time: displayTime,
    actualTime: time,
    duration: duration,
    playing: playing,
    onPlayPause: () => setPlaying(p => !p),
    onReset: () => {
      setTime(0);
    },
    onSeek: t => setTime(t),
    onHover: t => setHoverTime(t)
  }));
}

// ── Playback bar ────────────────────────────────────────────────────────────
// Play/pause, return-to-begin, scrub track, time display.
// Uses fixed-width time fields so layout doesn't thrash.

function PlaybackBar({
  time,
  duration,
  playing,
  onPlayPause,
  onReset,
  onSeek,
  onHover
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const timeFromEvent = React.useCallback(e => {
    const rect = trackRef.current.getBoundingClientRect();
    const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    return x * duration;
  }, [duration]);
  const onTrackMove = e => {
    if (!trackRef.current) return;
    const t = timeFromEvent(e);
    if (dragging) {
      onSeek(t);
    } else {
      onHover(t);
    }
  };
  const onTrackLeave = () => {
    if (!dragging) onHover(null);
  };
  const onTrackDown = e => {
    setDragging(true);
    const t = timeFromEvent(e);
    onSeek(t);
    onHover(null);
  };
  React.useEffect(() => {
    if (!dragging) return;
    const onUp = () => setDragging(false);
    const onMove = e => {
      if (!trackRef.current) return;
      const t = timeFromEvent(e);
      onSeek(t);
    };
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mousemove', onMove);
    };
  }, [dragging, timeFromEvent, onSeek]);
  const pct = duration > 0 ? time / duration * 100 : 0;
  const fmt = t => {
    const total = Math.max(0, t);
    const m = Math.floor(total / 60);
    const s = Math.floor(total % 60);
    const cs = Math.floor(total * 100 % 100);
    return `${String(m).padStart(1, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
  };
  const mono = 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace';
  return /*#__PURE__*/React.createElement("div", {
    "data-omelette-chrome": true,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '8px 16px',
      background: 'rgba(20,20,20,0.92)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      width: '100%',
      maxWidth: 680,
      alignSelf: 'center',
      borderRadius: 8,
      color: '#f6f4ef',
      fontFamily: 'Inter, system-ui, sans-serif',
      userSelect: 'none',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    onClick: onReset,
    title: "Return to start (0)"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 2v10M12 2L5 7l7 5V2z",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement(IconButton, {
    onClick: onPlayPause,
    title: "Play/pause (space)"
  }, playing ? /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "2",
    width: "3",
    height: "10",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "8",
    y: "2",
    width: "3",
    height: "10",
    fill: "currentColor"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 2l9 5-9 5V2z",
    fill: "currentColor"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 12,
      fontVariantNumeric: 'tabular-nums',
      width: 64,
      textAlign: 'right',
      color: '#f6f4ef'
    }
  }, fmt(time)), /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    onMouseMove: onTrackMove,
    onMouseLeave: onTrackLeave,
    onMouseDown: onTrackDown,
    style: {
      flex: 1,
      height: 22,
      position: 'relative',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 4,
      background: 'rgba(255,255,255,0.12)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      width: `${pct}%`,
      height: 4,
      background: 'oklch(72% 0.12 250)',
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: `${pct}%`,
      top: '50%',
      width: 12,
      height: 12,
      marginLeft: -6,
      marginTop: -6,
      background: '#fff',
      borderRadius: 6,
      boxShadow: '0 2px 4px rgba(0,0,0,0.4)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: mono,
      fontSize: 12,
      fontVariantNumeric: 'tabular-nums',
      width: 64,
      textAlign: 'left',
      color: 'rgba(246,244,239,0.55)'
    }
  }, fmt(duration)), typeof VideoEncoder !== 'undefined' && /*#__PURE__*/React.createElement(IconButton, {
    title: "Export video",
    onClick: () => window.parent.postMessage({
      type: 'omelette:request-video-export'
    }, '*')
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 2v7m0 0L4 6m3 3l3-3M2 12h10",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))));
}
function IconButton({
  children,
  onClick,
  title
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    title: title,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: 28,
      height: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: hover ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 6,
      color: '#f6f4ef',
      cursor: 'pointer',
      padding: 0,
      transition: 'background 120ms'
    }
  }, children);
}

// ── VideoSprite ─────────────────────────────────────────────────────────────
// Renders a <video> that loops within [start,end] of its source at `speed`,
// kept in sync with the Stage's playhead. Carries the
// data-om-exportable-video-play-* attrs so video export can mix its audio.
//
//   <VideoSprite src="clip.mp4" start={2} end={5} speed={1}
//     style={{ width: 640, height: 360 }} />

function VideoSprite({
  src,
  start = 0,
  end,
  speed = 1,
  style,
  ...rest
}) {
  start = +start || 0;
  speed = +speed || 1;
  if (end != null) end = +end || undefined;
  const t = useTime();
  const ref = React.useRef(null);
  const span = Math.max(0.001, (end ?? start + 1) - start);
  React.useEffect(() => {
    const v = ref.current;
    if (!v || v.readyState < 1) return;
    const target = start + t * speed % span;
    if (Math.abs(v.currentTime - target) > 0.05) v.currentTime = target;
  }, [t, start, span, speed]);
  return /*#__PURE__*/React.createElement("video", _extends({
    ref: ref,
    src: src,
    muted: true,
    playsInline: true,
    preload: "auto",
    "data-om-exportable-video-play-start": start,
    "data-om-exportable-video-play-end": end ?? start + span,
    "data-om-exportable-video-play-speed": speed,
    style: {
      display: 'block',
      objectFit: 'cover',
      ...style
    }
  }, rest));
}
Object.assign(window, {
  Easing,
  interpolate,
  animate,
  clamp,
  TimelineContext,
  useTime,
  useTimeline,
  Sprite,
  SpriteContext,
  useSprite,
  TextSprite,
  ImageSprite,
  RectSprite,
  VideoSprite,
  Stage,
  PlaybackBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "animations.jsx", error: String((e && e.message) || e) }); }

// components/backgrounds/StarsBackground.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FG Designs — StarsBackground
 * The signature animated void: three parallax starfields drifting upward,
 * with a gentle spring-eased mouse parallax and an optional nebula haze.
 * Dependency-free (no framer-motion) so it drops into any consumer.
 * Colors pull from the Cosmos palette — starlight white with sparks of
 * stellar violet, starlight gold and aurora cyan.
 */

const DENSITY = {
  sparse: 0.55,
  normal: 1,
  dense: 1.6
};

/* Weighted so the field reads mostly as starlight, with occasional accent sparks. */
const COSMOS_PALETTE = ['#ECECF7', '#ECECF7', '#ECECF7', '#ECECF7', '#ECECF7',
// starlight (dominant)
'#C5BBFF', '#8E7BFF',
// stellar violet
'#F0C66B',
// starlight gold
'#5FE3C8' // aurora cyan
];
function generateStars(count, palette) {
  let out = '';
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    const c = palette[Math.floor(Math.random() * palette.length)];
    out += (i ? ', ' : '') + x + 'px ' + y + 'px ' + c;
  }
  return out;
}
function StarLayer({
  count,
  size,
  duration,
  palette,
  animate
}) {
  const [shadow, setShadow] = React.useState('');
  React.useEffect(() => {
    setShadow(generateStars(count, palette));
  }, [count, palette]);
  const dot = {
    position: 'absolute',
    width: size + 'px',
    height: size + 'px',
    borderRadius: '50%',
    background: 'transparent',
    boxShadow: shadow
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '2000px',
      animation: animate ? `fg-stars-rise ${duration}s linear infinite` : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: dot
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...dot,
      top: '2000px'
    }
  }));
}
function StarsBackground({
  children,
  className,
  style = {},
  factor = 0.04,
  speed = 60,
  density = 'normal',
  palette = COSMOS_PALETTE,
  nebula = true,
  interactive = true,
  ...rest
}) {
  const rootRef = React.useRef(null);
  const wrapRef = React.useRef(null);
  const target = React.useRef({
    x: 0,
    y: 0
  });
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Spring-eased parallax loop — lerp current toward target every frame.
  React.useEffect(() => {
    if (reduced || !interactive) {
      if (wrapRef.current) wrapRef.current.style.transform = 'translate3d(0,0,0)';
      return;
    }
    let raf;
    const cur = {
      x: 0,
      y: 0
    };
    const loop = () => {
      cur.x += (target.current.x - cur.x) * 0.06;
      cur.y += (target.current.y - cur.y) * 0.06;
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${cur.x.toFixed(2)}px, ${cur.y.toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced, interactive]);
  const handleMove = e => {
    if (reduced || !interactive) return;
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    target.current = {
      x: -((e.clientX - (r.left + r.width / 2)) * factor),
      y: -((e.clientY - (r.top + r.height / 2)) * factor)
    };
  };
  const mult = DENSITY[density] || 1;
  const animate = !reduced;
  const layers = [{
    count: Math.round(700 * mult),
    size: 1,
    duration: speed
  }, {
    count: Math.round(280 * mult),
    size: 2,
    duration: speed * 2
  }, {
    count: Math.round(140 * mult),
    size: 3,
    duration: speed * 3.4
  }];
  const nebulaLayers = nebula ? 'radial-gradient(60% 55% at 18% 12%, rgba(142,123,255,0.18), transparent 70%),' + 'radial-gradient(50% 50% at 85% 82%, rgba(95,227,200,0.10), transparent 70%),' + 'radial-gradient(42% 42% at 72% 20%, rgba(240,198,107,0.07), transparent 70%),' : '';
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: rootRef,
    className: className,
    onMouseMove: handleMove,
    style: {
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      height: '100%',
      background: `${nebulaLayers}radial-gradient(ellipse at bottom, #12122A 0%, #050509 100%)`,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("style", null, '@keyframes fg-stars-rise{from{transform:translateY(0)}to{transform:translateY(-2000px)}}'), /*#__PURE__*/React.createElement("div", {
    ref: wrapRef,
    style: {
      position: 'absolute',
      inset: 0,
      willChange: 'transform'
    }
  }, layers.map((l, i) => /*#__PURE__*/React.createElement(StarLayer, {
    key: i,
    count: l.count,
    size: l.size,
    duration: l.duration,
    palette: palette,
    animate: animate
  }))), children);
}
Object.assign(__ds_scope, { StarsBackground });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/backgrounds/StarsBackground.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FG Designs — Avatar
 * Round identity image with optional ring + online status. Falls back to initials.
 */
const SIZES = {
  sm: 32,
  md: 44,
  lg: 60
};
function Avatar({
  src,
  name = '',
  size = 'md',
  ring = false,
  status,
  style = {},
  ...rest
}) {
  const px = SIZES[size] || SIZES.md;
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: px,
      height: px,
      borderRadius: '50%',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface-active)',
      color: 'var(--fg-violet-200)',
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-semibold)',
      fontSize: px * 0.36,
      border: ring ? '2px solid var(--accent)' : '1px solid var(--border-default)',
      boxShadow: ring ? 'var(--glow-violet)' : 'none'
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials), status && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: px * 0.28,
      height: px * 0.28,
      borderRadius: '50%',
      background: status === 'online' ? 'var(--fg-success)' : 'var(--fg-faint)',
      border: '2px solid var(--surface-card)'
    }
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FG Designs — Badge
 * Small status / category label. Soft (tinted) or solid fills across the cosmic palette.
 */
const TONES = {
  violet: {
    soft: ['rgba(142,123,255,0.16)', 'var(--fg-violet-200)'],
    solid: ['var(--accent)', 'var(--text-on-accent)']
  },
  gold: {
    soft: ['rgba(240,198,107,0.16)', 'var(--fg-gold-200)'],
    solid: ['var(--fg-gold-400)', '#2A1E05']
  },
  aurora: {
    soft: ['rgba(95,227,200,0.16)', 'var(--fg-aurora-200)'],
    solid: ['var(--fg-aurora-400)', '#04211B']
  },
  neutral: {
    soft: ['rgba(180,180,230,0.10)', 'var(--text-body)'],
    solid: ['var(--fg-nebula)', 'var(--text-strong)']
  },
  success: {
    soft: ['rgba(79,215,155,0.16)', '#8DEBC1'],
    solid: ['var(--fg-success)', '#04211B']
  },
  warning: {
    soft: ['rgba(240,198,107,0.16)', 'var(--fg-gold-200)'],
    solid: ['var(--fg-warning)', '#2A1E05']
  },
  danger: {
    soft: ['rgba(255,107,129,0.16)', '#FFB3BF'],
    solid: ['var(--fg-danger)', '#2A0610']
  }
};
function Badge({
  children,
  tone = 'violet',
  solid = false,
  dot = false,
  style = {},
  ...rest
}) {
  const [bg, fg] = (TONES[tone] || TONES.violet)[solid ? 'solid' : 'soft'];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '3px 10px',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--weight-semibold)',
      lineHeight: 1.4,
      background: bg,
      color: fg,
      border: solid ? '1px solid transparent' : '1px solid var(--border-subtle)',
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: fg
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FG Designs — Button
 * Cosmic primary (stellar violet), secondary (outline), ghost, and premium (gold foil).
 */
const SIZES = {
  sm: {
    padding: '8px 14px',
    fontSize: 'var(--text-sm)',
    height: 36,
    gap: 8,
    radius: 'var(--radius-sm)'
  },
  md: {
    padding: '11px 20px',
    fontSize: 'var(--text-base)',
    height: 44,
    gap: 9,
    radius: 'var(--radius-md)'
  },
  lg: {
    padding: '15px 28px',
    fontSize: 'var(--text-md)',
    height: 54,
    gap: 10,
    radius: 'var(--radius-lg)'
  }
};
function Button({
  children,
  variant = 'primary',
  size = 'md',
  glow = false,
  full = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const variants = {
    primary: {
      background: 'var(--accent)',
      color: 'var(--text-on-accent)',
      border: '1px solid transparent',
      boxShadow: glow ? 'var(--glow-violet)' : 'var(--shadow-sm)',
      fontWeight: 'var(--weight-bold)'
    },
    secondary: {
      background: 'var(--surface-raised)',
      color: 'var(--text-strong)',
      border: '1px solid var(--border-default)',
      boxShadow: 'var(--shadow-sm)',
      fontWeight: 'var(--weight-semibold)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-body)',
      border: '1px solid transparent',
      fontWeight: 'var(--weight-semibold)'
    },
    premium: {
      background: 'linear-gradient(180deg, var(--fg-gold-200), var(--fg-gold-400))',
      color: '#2A1E05',
      border: '1px solid var(--fg-gold-600)',
      boxShadow: glow ? 'var(--glow-gold)' : 'var(--shadow-sm)',
      fontWeight: 'var(--weight-bold)'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      width: full ? '100%' : 'auto',
      fontFamily: 'var(--font-sans)',
      fontSize: s.fontSize,
      letterSpacing: '-0.01em',
      borderRadius: s.radius,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      whiteSpace: 'nowrap',
      transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), background var(--dur-fast) var(--ease-out)',
      ...variants[variant],
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.transform = 'translateY(1px) scale(0.985)';
    },
    onMouseUp: e => {
      e.currentTarget.style.transform = '';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = '';
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FG Designs — Card
 * Surface container. Optional starfield backdrop, hover-lift, and glow accent.
 */
function Card({
  children,
  variant = 'default',
  // default | starfield | glow
  hover = false,
  padding = 'var(--space-5)',
  style = {},
  ...rest
}) {
  const base = {
    position: 'relative',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--border-subtle)',
    background: 'var(--surface-card)',
    boxShadow: 'var(--shadow-md)',
    padding,
    color: 'var(--text-body)',
    overflow: 'hidden',
    transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)'
  };
  const variants = {
    default: {},
    starfield: {
      background: 'var(--fg-deep)'
    },
    glow: {
      boxShadow: 'var(--glow-violet)',
      borderColor: 'transparent'
    }
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    className: variant === 'starfield' ? 'fg-starfield' : undefined,
    style: {
      ...base,
      ...variants[variant],
      ...style
    },
    onMouseEnter: e => {
      if (!hover) return;
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      e.currentTarget.style.borderColor = 'var(--border-default)';
    },
    onMouseLeave: e => {
      if (!hover) return;
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = variant === 'glow' ? 'var(--glow-violet)' : 'var(--shadow-md)';
      e.currentTarget.style.borderColor = variant === 'glow' ? 'transparent' : 'var(--border-subtle)';
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FG Designs — Eyebrow
 * Monospace, letter-spaced kicker above headings. Optional leading rule/glyph.
 */
function Eyebrow({
  children,
  color = 'var(--accent)',
  rule = true,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color,
      ...style
    }
  }, rest), rule && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 1,
      background: 'currentColor',
      opacity: 0.6
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FG Designs — Stat
 * Big display metric for landing pages (projects shipped, years, etc.).
 */
function Stat({
  value,
  label,
  accent = 'var(--text-strong)',
  sublabel,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-bold)',
      fontSize: 'var(--text-3xl)',
      lineHeight: 1,
      letterSpacing: '-0.03em',
      color: accent
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)',
      fontWeight: 'var(--weight-medium)'
    }
  }, label), sublabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      letterSpacing: '0.04em'
    }
  }, sublabel));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stat.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FG Designs — Tag
 * Mono pill used for technical / print-spec chips (CMYK, bleed, DPI) and filters.
 */
function Tag({
  children,
  active = false,
  onRemove,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      padding: '5px 12px',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      letterSpacing: '0.04em',
      lineHeight: 1.4,
      background: active ? 'var(--accent-soft)' : 'transparent',
      color: active ? 'var(--fg-violet-200)' : 'var(--text-body)',
      border: `1px solid ${active ? 'var(--accent)' : 'var(--border-default)'}`,
      transition: 'all var(--dur-fast) var(--ease-out)',
      ...style
    }
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    style: {
      all: 'unset',
      cursor: 'pointer',
      color: 'var(--text-muted)',
      lineHeight: 1,
      fontSize: 14
    },
    "aria-label": "Remover"
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FG Designs — Input
 * Dark text field with optional label, leading icon, and violet focus glow.
 */
function Input({
  label,
  hint,
  error,
  iconLeft,
  size = 'md',
  style = {},
  id,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const heights = {
    sm: 38,
    md: 46,
    lg: 54
  };
  const h = heights[size] || heights.md;
  const fid = id || (label ? `fg-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--fg-danger)' : focused ? 'var(--accent)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--text-body)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: h,
      padding: '0 14px',
      background: 'var(--surface-section)',
      borderRadius: 'var(--radius-md)',
      border: `1px solid ${borderColor}`,
      boxShadow: focused ? 'var(--glow-focus)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      display: 'flex'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    onFocus: e => {
      setFocused(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocused(false);
      rest.onBlur && rest.onBlur(e);
    }
  }, rest, {
    style: {
      all: 'unset',
      flex: 1,
      height: '100%',
      width: '100%',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-strong)'
    }
  }))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: error ? 'var(--fg-danger)' : 'var(--text-muted)',
      letterSpacing: '0.02em'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FG Designs — Switch
 * Cosmic toggle. Off = void track, On = stellar violet with glow.
 */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  label,
  style = {},
  ...rest
}) {
  const toggle = () => {
    if (!disabled && onChange) onChange(!checked);
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "switch",
    "aria-checked": checked,
    onClick: toggle,
    disabled: disabled,
    style: {
      all: 'unset',
      width: 44,
      height: 26,
      borderRadius: 'var(--radius-pill)',
      position: 'relative',
      background: checked ? 'var(--accent)' : 'var(--surface-active)',
      border: `1px solid ${checked ? 'transparent' : 'var(--border-default)'}`,
      boxShadow: checked ? 'var(--glow-violet)' : 'none',
      transition: 'background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)'
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: checked ? 20 : 2,
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: checked ? 'var(--text-on-accent)' : 'var(--text-body)',
      transition: 'left var(--dur-base) var(--ease-spring)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-body)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FG Designs — Textarea
 * Multi-line dark field matching Input. Violet focus glow.
 */
function Textarea({
  label,
  hint,
  error,
  rows = 4,
  style = {},
  id,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const fid = id || (label ? `fg-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--fg-danger)' : focused ? 'var(--accent)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--weight-medium)',
      color: 'var(--text-body)'
    }
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: fid,
    rows: rows,
    onFocus: e => {
      setFocused(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocused(false);
      rest.onBlur && rest.onBlur(e);
    }
  }, rest, {
    style: {
      all: 'unset',
      boxSizing: 'border-box',
      width: '100%',
      padding: '12px 14px',
      background: 'var(--surface-section)',
      borderRadius: 'var(--radius-md)',
      border: `1px solid ${borderColor}`,
      boxShadow: focused ? 'var(--glow-focus)' : 'none',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--text-base)',
      color: 'var(--text-strong)',
      lineHeight: 1.55,
      resize: 'vertical',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)'
    }
  })), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: error ? 'var(--fg-danger)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// fg-motion-scene.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// FG Designs — motion de lançamento (Instagram, 1080x1080)
// Self-contained for video export: literal colors/fonts inline (no external CSS
// vars/classes), all images embedded as data-URLs at runtime so they survive
// the export's SVG serialization. Timeline engine: animations.jsx

const DUR = 37;
const CX = 540,
  CY = 540;
const lerp = (a, b, t) => a + (b - a) * t;
const TRANSPARENT = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

// ── brand tokens as literals (so nothing depends on styles.css at export) ──
const C = {
  void: '#050509',
  ink: '#0A0A14',
  deep: '#0F0F1E',
  slate: '#16162A',
  line: 'rgba(180,180,230,0.10)',
  lineStrong: 'rgba(180,180,230,0.18)',
  star: '#ECECF7',
  mist: '#B6B6CE',
  dust: '#7C7C98',
  faint: '#565670',
  violet200: '#C5BBFF',
  violet400: '#8E7BFF',
  gold400: '#F0C66B',
  aurora400: '#5FE3C8',
  accent: '#8E7BFF'
};
const FONT_DISPLAY = "'Space Grotesk', system-ui, sans-serif";
const FONT_SANS = "'Hanken Grotesk', system-ui, sans-serif";
const FONT_MONO = "'Space Mono', ui-monospace, monospace";
const SHADOW_XL = '0 32px 80px -20px rgba(0,0,0,0.8)';
const EYEBROW = {
  fontFamily: FONT_MONO,
  fontSize: 12,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: C.dust
};
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// Fetch an asset and return it as a data-URL (so it embeds in the exported svg).
function useDataUrl(src) {
  const [url, setUrl] = React.useState(null);
  React.useEffect(() => {
    let alive = true;
    fetch(src).then(r => r.blob()).then(b => new Promise(res => {
      const fr = new FileReader();
      fr.onload = () => res(fr.result);
      fr.readAsDataURL(b);
    })).then(u => {
      if (alive) setUrl(u);
    }).catch(() => {});
    return () => {
      alive = false;
    };
  }, [src]);
  return url;
}

/* ═══════════════════════ Living cosmos backdrop ═══════════════════════ */

function CosmosBackdrop() {
  const t = useTime();
  const violetOp = interpolate([0, 6, 13, 20, 30, 37], [0.24, 0.17, 0.13, 0.15, 0.18, 0.26], Easing.easeInOutSine)(t);
  const auroraOp = interpolate([0, 6, 12, 18, 26, 37], [0.07, 0.12, 0.18, 0.11, 0.14, 0.09], Easing.easeInOutSine)(t);
  const goldOp = interpolate([0, 9, 15, 21, 30, 37], [0.05, 0.07, 0.15, 0.09, 0.11, 0.12], Easing.easeInOutSine)(t);
  const dx = Math.sin(t * 0.11) * 55,
    dy = Math.cos(t * 0.08) * 44;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: C.void
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      width: 1000,
      height: 1000,
      left: -300 + dx,
      top: -340 + dy,
      background: `radial-gradient(closest-side, rgba(142,123,255,${violetOp}), transparent 72%)`,
      transform: `rotate(${t * 2}deg)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      width: 900,
      height: 900,
      right: -300 - dx,
      bottom: -300 - dy,
      background: `radial-gradient(closest-side, rgba(95,227,200,${auroraOp}), transparent 72%)`,
      transform: `rotate(${-t * 1.6}deg)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      width: 820,
      height: 820,
      right: -200 + dy,
      top: -240 - dx,
      background: `radial-gradient(closest-side, rgba(240,198,107,${goldOp}), transparent 72%)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      width: 760,
      height: 760,
      left: -160 - dy,
      bottom: -220 + dx,
      background: `radial-gradient(closest-side, rgba(142,123,255,${violetOp * 0.7}), transparent 72%)`
    }
  }));
}
function StarsLayer() {
  const t = useTime();
  const stars = React.useMemo(() => {
    const rnd = mulberry32(1337);
    const cols = ['#ECECF7', '#ECECF7', '#ECECF7', '#C5BBFF', '#F7E3B5'];
    return Array.from({
      length: 90
    }, () => ({
      x: rnd() * 1080,
      y: rnd() * 1080,
      size: 1 + rnd() * 1.7,
      color: cols[Math.floor(rnd() * cols.length)],
      phase: rnd() * Math.PI * 2,
      dur: 3 + rnd() * 3,
      depth: 0.3 + rnd() * 0.7
    }));
  }, []);
  const px = Math.sin(t * 0.06) * 16,
    py = Math.cos(t * 0.05) * 12;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0
    }
  }, stars.map((s, i) => {
    const opacity = (0.55 + 0.35 * Math.cos(t / s.dur * Math.PI * 2 + s.phase)) * s.depth;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'absolute',
        left: s.x + px * s.depth,
        top: s.y + py * s.depth,
        width: s.size,
        height: s.size,
        borderRadius: '50%',
        background: s.color,
        opacity
      }
    });
  }));
}
function DustParticles() {
  const t = useTime();
  const dots = React.useMemo(() => {
    const r = mulberry32(77);
    return Array.from({
      length: 22
    }, () => ({
      x: r() * 1080,
      y0: r() * 1120,
      speed: 7 + r() * 15,
      size: 1.5 + r() * 2.4,
      col: r() > 0.6 ? '#8E7BFF' : r() > 0.5 ? '#5FE3C8' : '#F0C66B',
      ph: r() * 6.28
    }));
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0
    }
  }, dots.map((d, i) => {
    const y = ((d.y0 - t * d.speed) % 1120 + 1120) % 1120 - 20;
    const x = d.x + Math.sin(t * 0.3 + d.ph) * 20;
    const op = 0.12 + 0.16 * (0.5 + 0.5 * Math.sin(t * 0.6 + d.ph));
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'absolute',
        left: x,
        top: y,
        width: d.size,
        height: d.size,
        borderRadius: '50%',
        background: d.col,
        opacity: op,
        filter: 'blur(0.5px)'
      }
    });
  }));
}
function ShootingStars() {
  const t = useTime();
  const shots = [{
    t0: 3.4,
    x0: -120,
    y0: 150,
    ang: 26,
    col: '#C5BBFF'
  }, {
    t0: 8.5,
    x0: 1200,
    y0: 240,
    ang: 205,
    col: '#B7F4E8'
  }, {
    t0: 15.5,
    x0: -140,
    y0: 720,
    ang: 18,
    col: '#F7E3B5'
  }, {
    t0: 21.5,
    x0: 1180,
    y0: 140,
    ang: 192,
    col: '#C5BBFF'
  }, {
    t0: 28.5,
    x0: -120,
    y0: 420,
    ang: 22,
    col: '#B7F4E8'
  }, {
    t0: 34.5,
    x0: 1180,
    y0: 520,
    ang: 200,
    col: '#C5BBFF'
  }];
  const dur = 1.15,
    travel = 940,
    len = 230;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0
    }
  }, shots.map((s, i) => {
    const dt = t - s.t0;
    if (dt < 0 || dt > dur) return null;
    const p = dt / dur,
      rad = s.ang * Math.PI / 180;
    const x = s.x0 + Math.cos(rad) * travel * p,
      y = s.y0 + Math.sin(rad) * travel * p;
    const op = Math.sin(p * Math.PI) * 0.9;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'absolute',
        left: x,
        top: y,
        width: len,
        height: 2,
        background: `linear-gradient(90deg, transparent, ${s.col})`,
        transform: `rotate(${s.ang}deg)`,
        transformOrigin: 'right center',
        opacity: op,
        filter: 'blur(0.5px)',
        boxShadow: `0 0 10px ${s.col}`
      }
    });
  }));
}
function Vignette() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'radial-gradient(120% 120% at 50% 45%, transparent 55%, rgba(3,3,8,0.55) 100%)'
    }
  });
}
function OrbitRings({
  sizes = [380, 540],
  color = C.violet400,
  opacity = 0.16
}) {
  const t = useTime();
  return /*#__PURE__*/React.createElement(React.Fragment, null, sizes.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: 'absolute',
      left: CX - s / 2,
      top: CY - s / 2,
      width: s,
      height: s,
      borderRadius: '50%',
      border: `1px solid ${color}`,
      opacity: opacity - i * 0.05,
      transform: `rotate(${t * (i % 2 ? -5 : 5)}deg)`
    }
  })));
}

/* ═══════════════════════ Fade / slide / flow ═══════════════════════ */

function FadeSlide({
  children,
  x,
  y,
  width,
  align = 'left',
  entryDur = 0.8,
  exitDur = 0.5,
  distance = 22,
  scaleFrom = null
}) {
  const {
    localTime,
    duration
  } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1,
    ty = 0,
    scale = 1;
  if (localTime < entryDur) {
    const t = Easing.easeOutCubic(clamp(localTime / entryDur, 0, 1));
    opacity = t;
    ty = (1 - t) * distance;
    if (scaleFrom != null) scale = scaleFrom + (1 - scaleFrom) * t;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    ty = -t * (distance * 0.5);
  }
  const translateX = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      width,
      transform: `translate(${translateX}, ${ty}px) scale(${scale})`,
      opacity,
      textAlign: align,
      willChange: 'transform, opacity'
    }
  }, children);
}
function FlowText({
  children,
  style
}) {
  const t = useTime();
  const pos = -(t / 10 * 100) % 200;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      backgroundImage: 'linear-gradient(100deg, #C5BBFF 0%, #8E7BFF 22%, #B7F4E8 44%, #F7E3B5 66%, #8E7BFF 84%, #C5BBFF 100%)',
      backgroundSize: '200% auto',
      backgroundPosition: `${pos}% center`,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      paddingBottom: '0.2em',
      overflow: 'visible',
      ...style
    }
  }, children);
}

/* ═══════════════════════ Opening (orbit) ═══════════════════════ */

function FlashBurst({
  flashT,
  color = C.violet200,
  size = 170
}) {
  const scale = lerp(0.15, 3.4, Easing.easeOutCubic(flashT));
  const opacity = lerp(0.95, 0, flashT);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: CX - size / 2,
      top: CY - size / 2,
      width: size,
      height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      transform: `scale(${scale})`,
      opacity,
      filter: 'blur(1px)'
    }
  });
}
function OrbitOpening() {
  const {
    localTime,
    duration
  } = useSprite();
  const dots = [{
    angle0: 30,
    color: C.violet400
  }, {
    angle0: 155,
    color: C.aurora400
  }, {
    angle0: 275,
    color: C.gold400
  }];
  const travelDur = duration * 0.76;
  const t = clamp(localTime / travelDur, 0, 1);
  const eased = Easing.easeInOutCubic(t);
  const radius = lerp(420, 0, eased);
  const arrived = localTime >= travelDur;
  const flashT = arrived ? clamp((localTime - travelDur) / (duration - travelDur), 0, 1) : 0;
  return /*#__PURE__*/React.createElement(React.Fragment, null, !arrived && dots.map((d, i) => {
    const angle = (d.angle0 + eased * 240) * Math.PI / 180;
    const x = CX + Math.cos(angle) * radius,
      y = CY + Math.sin(angle) * radius;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'absolute',
        left: x - 7,
        top: y - 7,
        width: 14,
        height: 14,
        borderRadius: '50%',
        background: d.color,
        boxShadow: `0 0 12px 4px ${d.color}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        right: 7,
        top: 5,
        width: 60 * (1 - eased),
        height: 3,
        background: `linear-gradient(90deg, transparent, ${d.color})`,
        opacity: 0.5,
        transform: `rotate(${angle * 180 / Math.PI + 180}deg)`,
        transformOrigin: 'right center'
      }
    }));
  }), arrived && /*#__PURE__*/React.createElement(FlashBurst, {
    flashT: flashT,
    color: C.aurora400
  }));
}

/* ═══════════════════════ Lockup + framed shots ═══════════════════════ */

function Lockup({
  size = 40
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 700,
      fontSize: size,
      letterSpacing: '-0.02em',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.accent
    }
  }, "FG"), ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      color: C.star
    }
  }, "Designs"));
}
function LogoImg({
  src,
  x,
  y,
  w,
  h
}) {
  const {
    localTime,
    duration
  } = useSprite();
  const entryDur = 0.75,
    exitDur = 0.45;
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1,
    scale = 1;
  if (localTime < entryDur) {
    const e = Easing.easeOutCubic(clamp(localTime / entryDur, 0, 1));
    opacity = e;
    scale = 0.94 + 0.06 * e;
  } else if (localTime > exitStart) {
    const e = Easing.easeInCubic(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - e;
    scale = 1 + 0.02 * e;
  }
  return /*#__PURE__*/React.createElement("img", {
    src: src || TRANSPARENT,
    alt: "",
    style: {
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: h,
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center'
    }
  });
}
function ChromeBar({
  url
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 44,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '0 16px',
      borderBottom: `1px solid ${C.line}`,
      background: C.deep
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: C.dust
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: C.dust
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: C.dust
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 14,
      fontFamily: FONT_MONO,
      fontSize: 12,
      letterSpacing: '0.04em',
      color: C.dust,
      background: C.void,
      border: `1px solid ${C.line}`,
      borderRadius: 999,
      padding: '4px 16px'
    }
  }, url));
}

// Fixed-size framed panel that flies in on a 3D tilt, holds with a gentle turn,
// tilts out. Media pans/zooms INSIDE — never leaves the frame.
function Shot({
  x,
  y,
  w,
  h,
  url,
  fromRotY = 0,
  driftY = 3,
  driftX = 1.5,
  contain = false,
  children
}) {
  const {
    localTime,
    duration
  } = useSprite();
  const entryDur = 0.9,
    exitDur = 0.7;
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1,
    rotY = 0,
    scale = 1,
    glare = -1;
  if (localTime < entryDur) {
    const e = Easing.easeOutCubic(clamp(localTime / entryDur, 0, 1));
    opacity = e;
    rotY = fromRotY * (1 - e);
    scale = 0.92 + 0.08 * e;
    glare = clamp(localTime / (entryDur + 0.4), 0, 1);
  } else if (localTime > exitStart) {
    const e = Easing.easeInCubic(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - e;
    rotY = -fromRotY * 0.55 * e;
    scale = 1 + 0.03 * e;
  }
  const dRotY = Math.sin(localTime * 0.5) * driftY;
  const dRotX = Math.cos(localTime * 0.42) * driftX;
  const contentTop = url ? 44 : 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: x,
      top: y,
      width: w,
      height: h,
      perspective: 1600,
      opacity
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      transformStyle: 'preserve-3d',
      transform: `rotateY(${rotY + dRotY}deg) rotateX(${dRotX}deg) scale(${scale})`,
      borderRadius: 20,
      overflow: 'hidden',
      border: `1px solid ${C.lineStrong}`,
      boxShadow: `${SHADOW_XL}, 0 0 70px -18px rgba(142,123,255,0.45)`,
      background: contain ? C.ink : C.slate
    }
  }, url && /*#__PURE__*/React.createElement(ChromeBar, {
    url: url
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: contentTop,
      bottom: 0,
      overflow: 'hidden',
      background: contain ? C.ink : 'transparent'
    }
  }, children), glare >= 0 && glare < 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '55%',
      left: `${-55 + glare * 175}%`,
      background: 'linear-gradient(105deg, transparent, rgba(255,255,255,0.10), transparent)',
      pointerEvents: 'none'
    }
  })));
}
function KenImg({
  src,
  contain = false,
  from = 1.02,
  to = 1.12,
  pan = 16
}) {
  const {
    localTime,
    duration
  } = useSprite();
  const p = clamp(localTime / duration, 0, 1);
  const scale = from + (to - from) * p;
  const tx = (p - 0.5) * -2 * pan;
  return /*#__PURE__*/React.createElement("img", {
    src: src || TRANSPARENT,
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: contain ? 'contain' : 'cover',
      display: 'block',
      transform: `scale(${scale}) translateX(${tx}px)`,
      transformOrigin: 'center'
    }
  });
}
function LogoGlow() {
  const t = useTime();
  const s = 1 + 0.06 * Math.sin(t * 1.4);
  const o = 0.35 + 0.12 * Math.sin(t * 1.4);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: CX - 180,
      top: 150,
      width: 360,
      height: 360,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(142,123,255,0.5), transparent 68%)',
      transform: `scale(${s})`,
      opacity: o,
      filter: 'blur(4px)'
    }
  });
}

/* ═══════════════════════ Root scene ═══════════════════════ */

const SHOT = {
  x: 100,
  y: 282,
  w: 880,
  h: 540
};
function FGMotionScene() {
  const logoWhite = useDataUrl('assets/logo/fg-logo-white.svg');
  const logoStellar = useDataUrl('assets/logo/fg-logo-stellar.svg');
  const imgHero = useDataUrl('scraps/01-site-shot.png');
  const imgAdesivos = useDataUrl('scraps/work-adesivos.png');
  const imgSites = useDataUrl('scraps/work-sites.png');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      fontFamily: FONT_SANS
    }
  }, /*#__PURE__*/React.createElement(CosmosBackdrop, null), /*#__PURE__*/React.createElement(StarsLayer, null), /*#__PURE__*/React.createElement(DustParticles, null), /*#__PURE__*/React.createElement(ShootingStars, null), /*#__PURE__*/React.createElement(Sprite, {
    start: 0,
    end: 5.2
  }, /*#__PURE__*/React.createElement(OrbitRings, null)), /*#__PURE__*/React.createElement(Sprite, {
    start: 0.3,
    end: 2.4
  }, /*#__PURE__*/React.createElement(OrbitOpening, null)), /*#__PURE__*/React.createElement(Sprite, {
    start: 1.85,
    end: 5.2
  }, /*#__PURE__*/React.createElement(LogoImg, {
    src: logoWhite,
    x: CX - 148,
    y: 228,
    w: 296,
    h: 301
  })), /*#__PURE__*/React.createElement(Sprite, {
    start: 2.2,
    end: 5.2
  }, /*#__PURE__*/React.createElement(FadeSlide, {
    x: CX,
    y: 556,
    align: "center",
    width: 600,
    exitDur: 0.5
  }, /*#__PURE__*/React.createElement(Lockup, {
    size: 44
  }))), /*#__PURE__*/React.createElement(Sprite, {
    start: 2.8,
    end: 5.2
  }, /*#__PURE__*/React.createElement(FadeSlide, {
    x: CX,
    y: 616,
    align: "center",
    width: 700,
    exitDur: 0.5
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...EYEBROW,
      textAlign: 'center'
    }
  }, "FREELANCER \xB7 WEB \xB7 PRODU\xC7\xC3O GR\xC1FICA"))), /*#__PURE__*/React.createElement(Sprite, {
    start: 5.7,
    end: 11.6
  }, /*#__PURE__*/React.createElement(FadeSlide, {
    x: 110,
    y: 368,
    width: 900,
    entryDur: 1.0,
    exitDur: 0.55
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 700,
      fontSize: 78,
      lineHeight: 1.03,
      letterSpacing: '-0.03em',
      color: C.star
    }
  }, "Interfaces com"))), /*#__PURE__*/React.createElement(Sprite, {
    start: 6.4,
    end: 11.6
  }, /*#__PURE__*/React.createElement(FadeSlide, {
    x: 110,
    y: 462,
    width: 940,
    entryDur: 1.0,
    exitDur: 0.55
  }, /*#__PURE__*/React.createElement(FlowText, {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 700,
      fontSize: 78,
      lineHeight: 1.03,
      letterSpacing: '-0.03em'
    }
  }, "a vastid\xE3o da gal\xE1xia."))), /*#__PURE__*/React.createElement(Sprite, {
    start: 7.6,
    end: 11.6
  }, /*#__PURE__*/React.createElement(FadeSlide, {
    x: 112,
    y: 602,
    width: 640,
    entryDur: 0.9,
    exitDur: 0.55
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 29,
      lineHeight: 1.5,
      color: C.mist
    }
  }, "Do conceito ao deploy."))), /*#__PURE__*/React.createElement(Sprite, {
    start: 11.8,
    end: 18.2
  }, /*#__PURE__*/React.createElement(FadeSlide, {
    x: CX,
    y: 214,
    align: "center",
    width: 700,
    entryDur: 0.7
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...EYEBROW,
      textAlign: 'center'
    }
  }, "CARA NOVA"))), /*#__PURE__*/React.createElement(Sprite, {
    start: 12.1,
    end: 18.0
  }, /*#__PURE__*/React.createElement(Shot, _extends({}, SHOT, {
    url: "fgdesigns.site",
    fromRotY: -20,
    driftY: 3.5,
    contain: true
  }), /*#__PURE__*/React.createElement(KenImg, {
    src: imgHero,
    contain: true,
    from: 1.02,
    to: 1.1,
    pan: 12
  }))), /*#__PURE__*/React.createElement(Sprite, {
    start: 12.9,
    end: 17.8
  }, /*#__PURE__*/React.createElement(FadeSlide, {
    x: CX,
    y: 852,
    align: "center",
    width: 800,
    entryDur: 0.8
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 27,
      color: C.mist
    }
  }, "O site novo, no ar."))), /*#__PURE__*/React.createElement(Sprite, {
    start: 18.4,
    end: 24.8
  }, /*#__PURE__*/React.createElement(FadeSlide, {
    x: CX,
    y: 214,
    align: "center",
    width: 800,
    entryDur: 0.7
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...EYEBROW,
      textAlign: 'center'
    }
  }, "CONSTELA\xC7\xC3O DE PROJETOS"))), /*#__PURE__*/React.createElement(Sprite, {
    start: 18.7,
    end: 24.6
  }, /*#__PURE__*/React.createElement(Shot, _extends({}, SHOT, {
    url: "fgdesigns.site/trabalhos",
    fromRotY: 22,
    driftY: 3,
    contain: true
  }), /*#__PURE__*/React.createElement(KenImg, {
    src: imgAdesivos,
    contain: true,
    from: 1.0,
    to: 1.06,
    pan: 10
  }))), /*#__PURE__*/React.createElement(Sprite, {
    start: 19.5,
    end: 24.4
  }, /*#__PURE__*/React.createElement(FadeSlide, {
    x: CX,
    y: 852,
    align: "center",
    width: 860,
    entryDur: 0.8
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 27,
      color: C.mist
    }
  }, "Kits gr\xE1ficos, adesivos e arte final pra gr\xE1fica."))), /*#__PURE__*/React.createElement(Sprite, {
    start: 25.0,
    end: 31.4
  }, /*#__PURE__*/React.createElement(FadeSlide, {
    x: CX,
    y: 214,
    align: "center",
    width: 700,
    entryDur: 0.7
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...EYEBROW,
      textAlign: 'center'
    }
  }, "NO AR"))), /*#__PURE__*/React.createElement(Sprite, {
    start: 25.3,
    end: 31.2
  }, /*#__PURE__*/React.createElement(Shot, _extends({}, SHOT, {
    url: "sites ao vivo",
    fromRotY: -18,
    driftY: 3.5,
    driftX: 2,
    contain: true
  }), /*#__PURE__*/React.createElement(KenImg, {
    src: imgSites,
    contain: true,
    from: 1.0,
    to: 1.06,
    pan: 12
  }))), /*#__PURE__*/React.createElement(Sprite, {
    start: 26.1,
    end: 31.0
  }, /*#__PURE__*/React.createElement(FadeSlide, {
    x: CX,
    y: 852,
    align: "center",
    width: 820,
    entryDur: 0.8
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 27,
      color: C.mist
    }
  }, "Sites que j\xE1 est\xE3o orbitando."))), /*#__PURE__*/React.createElement(Sprite, {
    start: 31.4,
    end: 37
  }, /*#__PURE__*/React.createElement(OrbitRings, {
    sizes: [420, 600],
    color: C.aurora400,
    opacity: 0.14
  })), /*#__PURE__*/React.createElement(Sprite, {
    start: 31.6,
    end: 37
  }, /*#__PURE__*/React.createElement(LogoGlow, null)), /*#__PURE__*/React.createElement(Sprite, {
    start: 31.8,
    end: 37
  }, /*#__PURE__*/React.createElement(LogoImg, {
    src: logoStellar,
    x: CX - 118,
    y: 218,
    w: 236,
    h: 240
  })), /*#__PURE__*/React.createElement(Sprite, {
    start: 32.5,
    end: 37
  }, /*#__PURE__*/React.createElement(FadeSlide, {
    x: CX,
    y: 492,
    align: "center",
    width: 600
  }, /*#__PURE__*/React.createElement(Lockup, {
    size: 48
  }))), /*#__PURE__*/React.createElement(Sprite, {
    start: 33.1,
    end: 37
  }, /*#__PURE__*/React.createElement(FadeSlide, {
    x: CX,
    y: 556,
    align: "center",
    width: 820
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 27,
      color: C.mist
    }
  }, "A vastid\xE3o da gal\xE1xia, agora com site novo."))), /*#__PURE__*/React.createElement(Sprite, {
    start: 33.6,
    end: 37
  }, /*#__PURE__*/React.createElement(FadeSlide, {
    x: CX - 90,
    y: 628,
    width: 180
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: `linear-gradient(90deg, transparent, ${C.lineStrong}, transparent)`
    }
  }))), /*#__PURE__*/React.createElement(Sprite, {
    start: 33.9,
    end: 37
  }, /*#__PURE__*/React.createElement(FadeSlide, {
    x: CX,
    y: 664,
    align: "center",
    width: 700
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...EYEBROW,
      textAlign: 'center'
    }
  }, "INSTAGRAM"))), /*#__PURE__*/React.createElement(Sprite, {
    start: 34.3,
    end: 37
  }, /*#__PURE__*/React.createElement(FadeSlide, {
    x: CX,
    y: 696,
    align: "center",
    width: 800
  }, /*#__PURE__*/React.createElement(FlowText, {
    style: {
      fontFamily: FONT_DISPLAY,
      fontWeight: 700,
      fontSize: 46,
      letterSpacing: '-0.01em',
      textAlign: 'center'
    }
  }, "@fgdesigns._"))), /*#__PURE__*/React.createElement(Vignette, null));
}
Object.assign(window, {
  FGMotionScene
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "fg-motion-scene.jsx", error: String((e && e.message) || e) }); }

// site/data.js
try { (() => {
/* ============================================================
   FG DESIGNS — dados do site (fonte única de conteúdo)
   Plain JS (sem Babel) para carregar de forma síncrona e robusta.
   ============================================================ */
window.FG_DATA = {
  profile: {
    name: 'Kauê Felix Garzaro',
    alias: 'FG Designs',
    role: 'Designer gráfico & web · freelancer',
    location: 'Curitiba · PR · Brasil',
    photo: 'assets/kaue-portrait.jpg',
    experience: '3+ anos em produção · 200+ projetos entregues'
  },
  contact: {
    whatsappLabel: '+55 41 99591-7905',
    whatsappUrl: 'https://wa.me/5541995917905?text=' + encodeURIComponent('Oi Kauê! Vi seu site e queria conversar sobre um projeto.'),
    whatsappQuoteUrl: 'https://wa.me/5541995917905?text=' + encodeURIComponent('Oi Kauê! Quero um orçamento de peça gráfica.'),
    email: 'fgdesignerrz@gmail.com',
    instagramLabel: '@fgdesigns._',
    instagramUrl: 'https://www.instagram.com/fgdesigns._'
  },
  nav: [{
    id: 'inicio',
    label: 'Início'
  }, {
    id: 'servicos',
    label: 'Serviços'
  }, {
    id: 'trabalhos',
    label: 'Trabalhos'
  }, {
    id: 'sites',
    label: 'No ar'
  }, {
    id: 'precos',
    label: 'Preços'
  }, {
    id: 'sobre',
    label: 'Sobre'
  }, {
    id: 'processo',
    label: 'Processo'
  }],
  stats: [{
    value: '200+',
    label: 'Projetos entregues',
    accent: 'var(--accent)'
  }, {
    value: '3+',
    label: 'Anos em produção',
    accent: 'var(--text-strong)'
  }, {
    value: '24h',
    label: 'Pra te responder',
    accent: 'var(--premium)'
  }],
  services: [{
    icon: 'MonitorSmartphone',
    tone: 'var(--accent)',
    title: 'Landing pages & web',
    desc: 'Páginas que respiram e convertem — copy, design e código, do conceito ao deploy.'
  }, {
    icon: 'PenTool',
    tone: 'var(--aurora)',
    title: 'UX/UI & interfaces',
    desc: 'Fluxos, protótipos e telas de produto pensados no detalhe, com carinho de vibe coding.'
  }, {
    icon: 'Image',
    tone: 'var(--premium)',
    title: 'Tratamento de imagem',
    desc: 'Retoque, recorte e ajuste de cor com qualidade de impressão — sem susto na hora de imprimir.'
  }, {
    icon: 'Printer',
    tone: 'var(--fg-danger)',
    title: 'Consultoria de produção',
    desc: 'Para empresas de comunicação visual: cor, sangria, encaixe, registro e CMYK.'
  }],
  liveSites: [{
    name: 'GRIFFT Gráficos',
    title: 'GRIFFT',
    url: 'https://fgdesignerrz.github.io/grifft/',
    role: 'Loja / catálogo de gráficos de motocross',
    tags: ['Web', 'Loja', 'Motocross'],
    g: 'radial-gradient(120% 120% at 20% 0%, #2C1A3A, #0A0A14)',
    tone: 'var(--accent)'
  }, {
    name: 'BF Studio',
    title: 'BF STUDIO',
    url: 'https://fgdesignerrz.github.io/StudioBF/',
    role: 'Estúdio / portfólio',
    tags: ['Web', 'Studio', 'Portfólio'],
    g: 'radial-gradient(120% 120% at 80% 0%, #102A3A, #0A0A14)',
    tone: 'var(--aurora)'
  }, {
    name: 'KAC',
    title: 'KAC',
    url: 'https://fgdesignerrz.github.io/KAC/',
    role: 'Vitrine de roupa',
    tags: ['Web', 'Loja', 'Moda'],
    g: 'radial-gradient(120% 120% at 50% 0%, #3A2E10, #0A0A14)',
    tone: 'var(--premium)'
  }],
  /* Cada projeto abre uma tela de detalhe (gallery = imagens grandes + legenda) */
  works: [{
    slug: 'ktm-petrosol',
    title: 'KTM SX-F #19 — Rede Petrosol',
    type: 'Kit gráfico de motocross',
    image: 'assets/ktm-milani-19-graphic.jpg',
    specs: ['GRÁFICO BRILHANTE', 'CMYK', 'VINIL'],
    featured: true,
    desc: 'Kit gráfico criado sob medida pra KTM 350 SX-F #19, com patrocínio da Rede Petrosol — número, logos e cores pensados peça por peça pra carenagem da moto. Impresso em vinil brilhante com arte final conferida: cor calibrada, sangria e registro no lugar.',
    gallery: [{
      src: 'assets/ktm-milani-19-graphic.jpg',
      cap: 'Layout do kit gráfico'
    }, {
      src: 'assets/ktm-milani-19-bike-photo.jpg',
      cap: 'Aplicado na moto'
    }]
  }, {
    slug: 'bananalama-2026',
    title: 'Bananalama 2026 — MXF',
    type: 'Adesivo do evento',
    image: 'assets/bananalama-adesivo.jpg',
    specs: ['ADESIVO', 'RECORTE', 'SÉRIE'],
    featured: false,
    desc: 'Adesivo comemorativo do Bananalama 2026, da MXF — piloto, bananas e as datas do evento numa composição só. Arte fechada com faca de recorte contornando o desenho e rodada em série na plotter, pronta pra distribuir na trilha.',
    gallery: [{
      src: 'assets/bananalama-adesivo.jpg',
      cap: 'Layout do adesivo'
    }, {
      src: 'assets/bananalama-impresso.jpg',
      cap: 'Saindo da impressora, em série'
    }]
  }, {
    slug: 'honda-939-militao',
    title: 'Honda CRF #939 — Militão',
    type: 'Adesivo ilustrado (vetor)',
    image: 'assets/honda-939-militao-sticker.jpg',
    specs: ['ILUSTRAÇÃO', 'RECORTE'],
    featured: false,
    desc: 'Boneco criado exclusivamente pro Militão — pensado na moto, no nome e nas cores da CRF #939. Ilustração vetorial do capacete ao pneu, fechada com faca de recorte pra virar adesivo com acabamento limpo.',
    gallery: [{
      src: 'assets/honda-939-militao-sticker.jpg',
      cap: 'Ilustração vetorial exclusiva'
    }]
  }, {
    slug: 'gasgas-86-gael',
    title: 'GasGas #86 — Gael Rodrigues',
    type: 'Adesivo ilustrado (vetor)',
    image: 'assets/gasgas-gael-86-sticker.jpg',
    specs: ['ILUSTRAÇÃO', 'RECORTE'],
    featured: false,
    desc: 'Boneco exclusivo do Gael Rodrigues: a GasGas #86 ilustrada em vetor, com as cores oficiais da moto e o número em destaque. Cada detalhe desenhado pra funcionar em adesivo — de longe e de perto.',
    gallery: [{
      src: 'assets/gasgas-gael-86-sticker.jpg',
      cap: 'Ilustração vetorial exclusiva'
    }]
  }, {
    slug: 'mauriti-832',
    title: 'Mauriti Jr. #832 — cartela',
    type: 'Cartela de adesivos',
    image: 'assets/mauriti-jr-832-patches.jpg',
    specs: ['2–11cm', 'CARTELA', 'RECORTE'],
    featured: false,
    desc: 'Cartela de adesivos do Mauriti Jr. #832 com peças de 2 a 11 cm — logos, números e mascote organizados pra aproveitar o material ao máximo e facilitar a aplicação, tudo com faca de recorte individual.',
    gallery: [{
      src: 'assets/mauriti-jr-832-patches.jpg',
      cap: 'Cartela completa, peças de 2 a 11 cm'
    }]
  }, {
    slug: 'arte-final-corel',
    title: 'Adesivos — vinil & perfurado',
    type: 'Arte final · CorelDraw',
    image: 'assets/workspace-ktm-molde.png',
    specs: ['VINIL', 'PERFURADO', 'CMYK'],
    featured: false,
    desc: 'Bastidor da arte final no CorelDraw: moldes, facas e encaixes prontos pra impressão em vinil e perfurado. É aqui que a cor é calibrada e o registro conferido antes de rodar — a parte que a gráfica agradece.',
    gallery: [{
      src: 'assets/workspace-ktm-molde.png',
      cap: 'Arte final aberta no CorelDraw'
    }]
  }],
  testimonials: [{
    quote: 'Amei o site, ficou perfeito!',
    author: 'Studio BF',
    tag: 'Site no ar'
  }, {
    quote: 'Ficou fera, combinou totalmente com a empresa.',
    author: 'GRIFFT',
    tag: 'Loja no ar'
  }, {
    quote: 'O gráfico ficou animal!',
    author: 'Foguinho',
    tag: 'Kit gráfico'
  }, {
    quote: 'Ótimo acabamento nos bonecos, fera demais.',
    author: 'Dudu',
    tag: 'Adesivos ilustrados'
  }],
  pricing: {
    kicker: 'Preços',
    title: 'Quanto custa lançar sua página.',
    sub: 'Valores de referência pra landing pages — o número final depende do escopo, fechado junto com você antes de começar.',
    plans: [{
      name: 'Starter',
      price: 'R$ 690–900',
      tagline: 'Pra colocar sua presença no ar, sem enrolação.',
      features: ['1 página · até 5 seções', 'Layout limpo com componentes prontos', 'Você manda os textos (sem copy)', 'Publicação no ar inclusa'],
      featured: false
    }, {
      name: 'Premium',
      price: 'R$ 990–1.500',
      tagline: 'Design do zero, com a cara da sua marca.',
      features: ['Design próprio, feito pra sua marca', 'Animações e microinterações', 'Responsivo — perfeito em qualquer tela', '1 página · seções sob medida', 'Publicação + ajustes finos'],
      featured: true
    }],
    graphic: {
      title: 'Peças gráficas — sob orçamento',
      desc: 'Kits, adesivos, bonecos e artes em geral variam com tamanho, quantidade e se já existe arte pronta. Me chama no WhatsApp que eu te passo o valor certinho.'
    },
    note: 'Meu foco hoje é criação de landing pages — páginas feitas pra apresentar bem o seu negócio e gerar leads qualificados (os exemplos estão na seção “No ar”). Sites mais complexos, com sistema de pagamento, login ou área de cliente, eu ainda não faço, por envolverem outra camada de complexidade.'
  },
  specs: ['CMYK 0/12/40/4', 'SANGRIA 3mm', '300 DPI', 'REGISTRO ✓', 'PANTONE 871C', 'OVERPRINT', 'FACA / VINCO', 'ICC PROFILE'],
  process: [{
    n: '01',
    t: 'Briefing',
    d: 'Entendo objetivo, público e referências. Sem enrolação.'
  }, {
    n: '02',
    t: 'Design',
    d: 'Conceito, protótipo e iteração junto com você.'
  }, {
    n: '03',
    t: 'Build',
    d: 'Código limpo ou arte final pronta pra máquina.'
  }, {
    n: '04',
    t: 'Entrega',
    d: 'Deploy, arquivos e prova de gráfica conferida.'
  }],
  about: {
    kicker: 'Quem faz',
    heading: 'O FG é o meu sobrenome — e o meu jeito de fazer.',
    body: ['Sou o Kauê, de Curitiba. O FG vem de Felix Garzaro. Trabalho sozinho, do começo ao fim: eu desenho, eu codifico e eu preparo a arte pra gráfica.', 'Vim da produção gráfica — anos ajustando cor, sangria e registro — e hoje o foco cresce pro digital: landing pages, interfaces e vibe coding. Gosto da vastidão da galáxia: interfaces que parecem ilimitadas.'],
    tags: ['Curitiba · PR', 'Freelancer', 'Web + Impressão']
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "site/data.js", error: String((e && e.message) || e) }); }

// site/data.standalone.js
try { (() => {
/* ============================================================
   FG DESIGNS — dados do site (fonte única de conteúdo)
   Plain JS (sem Babel) para carregar de forma síncrona e robusta.
   ============================================================ */
window.FG_DATA = {
  profile: {
    name: 'Kauê Felix Garzaro',
    alias: 'FG Designs',
    role: 'Designer gráfico & web · freelancer',
    location: 'Curitiba · PR · Brasil',
    photo: window.__resources.portrait,
    experience: '3+ anos em produção · 200+ projetos entregues'
  },
  contact: {
    whatsappLabel: '+55 41 99591-7905',
    whatsappUrl: 'https://wa.me/5541995917905?text=' + encodeURIComponent('Oi Kauê! Vi seu site e queria conversar sobre um projeto.'),
    whatsappQuoteUrl: 'https://wa.me/5541995917905?text=' + encodeURIComponent('Oi Kauê! Quero um orçamento de peça gráfica.'),
    email: 'fgdesignerrz@gmail.com',
    instagramLabel: '@fgdesigns._',
    instagramUrl: 'https://www.instagram.com/fgdesigns._'
  },
  nav: [{
    id: 'inicio',
    label: 'Início'
  }, {
    id: 'servicos',
    label: 'Serviços'
  }, {
    id: 'trabalhos',
    label: 'Trabalhos'
  }, {
    id: 'sites',
    label: 'No ar'
  }, {
    id: 'precos',
    label: 'Preços'
  }, {
    id: 'sobre',
    label: 'Sobre'
  }, {
    id: 'processo',
    label: 'Processo'
  }],
  stats: [{
    value: '200+',
    label: 'Projetos entregues',
    accent: 'var(--accent)'
  }, {
    value: '3+',
    label: 'Anos em produção',
    accent: 'var(--text-strong)'
  }, {
    value: '24h',
    label: 'Pra te responder',
    accent: 'var(--premium)'
  }],
  services: [{
    icon: 'MonitorSmartphone',
    tone: 'var(--accent)',
    title: 'Landing pages & web',
    desc: 'Páginas que respiram e convertem — copy, design e código, do conceito ao deploy.'
  }, {
    icon: 'PenTool',
    tone: 'var(--aurora)',
    title: 'UX/UI & interfaces',
    desc: 'Fluxos, protótipos e telas de produto pensados no detalhe, com carinho de vibe coding.'
  }, {
    icon: 'Image',
    tone: 'var(--premium)',
    title: 'Tratamento de imagem',
    desc: 'Retoque, recorte e ajuste de cor com qualidade de impressão — sem susto na hora de imprimir.'
  }, {
    icon: 'Printer',
    tone: 'var(--fg-danger)',
    title: 'Consultoria de produção',
    desc: 'Para empresas de comunicação visual: cor, sangria, encaixe, registro e CMYK.'
  }],
  liveSites: [{
    name: 'GRIFFT Gráficos',
    title: 'GRIFFT',
    url: 'https://fgdesignerrz.github.io/grifft/',
    role: 'Loja / catálogo de gráficos de motocross',
    tags: ['Web', 'Loja', 'Motocross'],
    g: 'radial-gradient(120% 120% at 20% 0%, #2C1A3A, #0A0A14)',
    tone: 'var(--accent)'
  }, {
    name: 'BF Studio',
    title: 'BF STUDIO',
    url: 'https://fgdesignerrz.github.io/StudioBF/',
    role: 'Estúdio / portfólio',
    tags: ['Web', 'Studio', 'Portfólio'],
    g: 'radial-gradient(120% 120% at 80% 0%, #102A3A, #0A0A14)',
    tone: 'var(--aurora)'
  }, {
    name: 'KAC',
    title: 'KAC',
    url: 'https://fgdesignerrz.github.io/KAC/',
    role: 'Vitrine de roupa',
    tags: ['Web', 'Loja', 'Moda'],
    g: 'radial-gradient(120% 120% at 50% 0%, #3A2E10, #0A0A14)',
    tone: 'var(--premium)'
  }],
  /* Cada projeto abre uma tela de detalhe (gallery = imagens grandes + legenda) */
  works: [{
    slug: 'ktm-petrosol',
    title: 'KTM SX-F #19 — Rede Petrosol',
    type: 'Kit gráfico de motocross',
    image: window.__resources.workKtmGraphic,
    specs: ['GRÁFICO BRILHANTE', 'CMYK', 'VINIL'],
    featured: true,
    desc: 'Kit gráfico criado sob medida pra KTM 350 SX-F #19, com patrocínio da Rede Petrosol — número, logos e cores pensados peça por peça pra carenagem da moto. Impresso em vinil brilhante com arte final conferida: cor calibrada, sangria e registro no lugar.',
    gallery: [{
      src: window.__resources.workKtmGraphic,
      cap: 'Layout do kit gráfico'
    }, {
      src: window.__resources.workKtmBike,
      cap: 'Aplicado na moto'
    }]
  }, {
    slug: 'bananalama-2026',
    title: 'Bananalama 2026 — MXF',
    type: 'Adesivo do evento',
    image: window.__resources.workBananaLayout,
    specs: ['ADESIVO', 'RECORTE', 'SÉRIE'],
    featured: false,
    desc: 'Adesivo comemorativo do Bananalama 2026, da MXF — piloto, bananas e as datas do evento numa composição só. Arte fechada com faca de recorte contornando o desenho e rodada em série na plotter, pronta pra distribuir na trilha.',
    gallery: [{
      src: window.__resources.workBananaLayout,
      cap: 'Layout do adesivo'
    }, {
      src: window.__resources.workBananaPrint,
      cap: 'Saindo da impressora, em série'
    }]
  }, {
    slug: 'honda-939-militao',
    title: 'Honda CRF #939 — Militão',
    type: 'Adesivo ilustrado (vetor)',
    image: window.__resources.workHonda,
    specs: ['ILUSTRAÇÃO', 'RECORTE'],
    featured: false,
    desc: 'Boneco criado exclusivamente pro Militão — pensado na moto, no nome e nas cores da CRF #939. Ilustração vetorial do capacete ao pneu, fechada com faca de recorte pra virar adesivo com acabamento limpo.',
    gallery: [{
      src: window.__resources.workHonda,
      cap: 'Ilustração vetorial exclusiva'
    }]
  }, {
    slug: 'gasgas-86-gael',
    title: 'GasGas #86 — Gael Rodrigues',
    type: 'Adesivo ilustrado (vetor)',
    image: window.__resources.workGasgas,
    specs: ['ILUSTRAÇÃO', 'RECORTE'],
    featured: false,
    desc: 'Boneco exclusivo do Gael Rodrigues: a GasGas #86 ilustrada em vetor, com as cores oficiais da moto e o número em destaque. Cada detalhe desenhado pra funcionar em adesivo — de longe e de perto.',
    gallery: [{
      src: window.__resources.workGasgas,
      cap: 'Ilustração vetorial exclusiva'
    }]
  }, {
    slug: 'mauriti-832',
    title: 'Mauriti Jr. #832 — cartela',
    type: 'Cartela de adesivos',
    image: window.__resources.workMauriti,
    specs: ['2–11cm', 'CARTELA', 'RECORTE'],
    featured: false,
    desc: 'Cartela de adesivos do Mauriti Jr. #832 com peças de 2 a 11 cm — logos, números e mascote organizados pra aproveitar o material ao máximo e facilitar a aplicação, tudo com faca de recorte individual.',
    gallery: [{
      src: window.__resources.workMauriti,
      cap: 'Cartela completa, peças de 2 a 11 cm'
    }]
  }, {
    slug: 'arte-final-corel',
    title: 'Adesivos — vinil & perfurado',
    type: 'Arte final · CorelDraw',
    image: window.__resources.workWorkspace,
    specs: ['VINIL', 'PERFURADO', 'CMYK'],
    featured: false,
    desc: 'Bastidor da arte final no CorelDraw: moldes, facas e encaixes prontos pra impressão em vinil e perfurado. É aqui que a cor é calibrada e o registro conferido antes de rodar — a parte que a gráfica agradece.',
    gallery: [{
      src: window.__resources.workWorkspace,
      cap: 'Arte final aberta no CorelDraw'
    }]
  }],
  testimonials: [{
    quote: 'Amei o site, ficou perfeito!',
    author: 'Studio BF',
    tag: 'Site no ar'
  }, {
    quote: 'Ficou fera, combinou totalmente com a empresa.',
    author: 'GRIFFT',
    tag: 'Loja no ar'
  }, {
    quote: 'O gráfico ficou animal!',
    author: 'Foguinho',
    tag: 'Kit gráfico'
  }, {
    quote: 'Ótimo acabamento nos bonecos, fera demais.',
    author: 'Dudu',
    tag: 'Adesivos ilustrados'
  }],
  pricing: {
    kicker: 'Preços',
    title: 'Quanto custa lançar sua página.',
    sub: 'Valores de referência pra landing pages — o número final depende do escopo, fechado junto com você antes de começar.',
    plans: [{
      name: 'Starter',
      price: 'R$ 690–900',
      tagline: 'Pra colocar sua presença no ar, sem enrolação.',
      features: ['1 página · até 5 seções', 'Layout limpo com componentes prontos', 'Você manda os textos (sem copy)', 'Publicação no ar inclusa'],
      featured: false
    }, {
      name: 'Premium',
      price: 'R$ 990–1.500',
      tagline: 'Design do zero, com a cara da sua marca.',
      features: ['Design próprio, feito pra sua marca', 'Animações e microinterações', 'Responsivo — perfeito em qualquer tela', '1 página · seções sob medida', 'Publicação + ajustes finos'],
      featured: true
    }],
    graphic: {
      title: 'Peças gráficas — sob orçamento',
      desc: 'Kits, adesivos, bonecos e artes em geral variam com tamanho, quantidade e se já existe arte pronta. Me chama no WhatsApp que eu te passo o valor certinho.'
    },
    note: 'Meu foco hoje é criação de landing pages — páginas feitas pra apresentar bem o seu negócio e gerar leads qualificados (os exemplos estão na seção “No ar”). Sites mais complexos, com sistema de pagamento, login ou área de cliente, eu ainda não faço, por envolverem outra camada de complexidade.'
  },
  specs: ['CMYK 0/12/40/4', 'SANGRIA 3mm', '300 DPI', 'REGISTRO ✓', 'PANTONE 871C', 'OVERPRINT', 'FACA / VINCO', 'ICC PROFILE'],
  process: [{
    n: '01',
    t: 'Briefing',
    d: 'Entendo objetivo, público e referências. Sem enrolação.'
  }, {
    n: '02',
    t: 'Design',
    d: 'Conceito, protótipo e iteração junto com você.'
  }, {
    n: '03',
    t: 'Build',
    d: 'Código limpo ou arte final pronta pra máquina.'
  }, {
    n: '04',
    t: 'Entrega',
    d: 'Deploy, arquivos e prova de gráfica conferida.'
  }],
  about: {
    kicker: 'Quem faz',
    heading: 'O FG é o meu sobrenome — e o meu jeito de fazer.',
    body: ['Sou o Kauê, de Curitiba. O FG vem de Felix Garzaro. Trabalho sozinho, do começo ao fim: eu desenho, eu codifico e eu preparo a arte pra gráfica.', 'Vim da produção gráfica — anos ajustando cor, sangria e registro — e hoje o foco cresce pro digital: landing pages, interfaces e vibe coding. Gosto da vastidão da galáxia: interfaces que parecem ilimitadas.'],
    tags: ['Curitiba · PR', 'Freelancer', 'Web + Impressão']
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "site/data.standalone.js", error: String((e && e.message) || e) }); }

// site/site-climber.jsx
try { (() => {
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
    on();
    mq.addEventListener('change', on);
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
  gravity = 13
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
    if (!g) {
      // fallback CSS
      if (!reduce) rope.style.animation = 'fg-climber-swing 3.4s ease-in-out infinite';
      return;
    }
    if (window.Draggable) {
      try {
        g.registerPlugin(window.Draggable);
      } catch (e) {}
    }
    let angle = initialAngle,
      dir = -1;
    g.set(rope, {
      rotation: initialAngle,
      transformOrigin: 'top center'
    });
    function startSwing() {
      if (reduce) return;
      swingRef.current = g.to(rope, {
        rotation: dir * angle,
        duration: 1.8 + angle / 50,
        ease: 'power1.inOut',
        onComplete: () => {
          angle = Math.max(angle - gravity, minAngle);
          dir *= -1;
          startSwing();
        }
      });
    }
    startSwing();
    let drag = null;
    if (window.Draggable && iconRef.current) {
      drag = window.Draggable.create(rope, {
        type: 'rotation',
        trigger: iconRef.current,
        // agarra o astronauta, gira a corda
        bounds: {
          minRotation: -80,
          maxRotation: 80
        },
        dragResistance: 0.4,
        edgeResistance: 1,
        onPress() {
          if (swingRef.current) swingRef.current.kill();
        },
        onRelease() {
          dir = this.rotation >= 0 ? -1 : 1;
          angle = Math.max(Math.abs(this.rotation) - gravity, minAngle);
          startSwing();
        }
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

    const qY = g ? g.quickTo(wrap, 'y', {
      duration: 0.6,
      ease: 'power2.out'
    }) : null;
    wrap.style.transition = 'opacity .5s var(--ease-out), visibility .5s var(--ease-out)';
    if (!g) wrap.style.willChange = 'transform, opacity';
    let raf = 0;
    function update() {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight || 1;
      const y = window.scrollY;
      const p = Math.min(Math.max(y / max, 0), 1);
      const hero = document.getElementById('inicio');
      const appearAt = (hero ? hero.offsetHeight : window.innerHeight) * 0.42;
      const shown = y > appearAt;
      const travel = Math.max(window.innerHeight - total - topStart - 26, 0);
      const ty = topStart + p * travel;
      if (qY) qY(ty);else wrap.style.transform = `translateY(${ty}px)`;
      wrap.style.opacity = shown ? '1' : '0';
      wrap.style.visibility = shown ? 'visible' : 'hidden';
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [wide, ropeHeight, iconSize]);
  if (!wide) return null;
  return /*#__PURE__*/React.createElement("div", {
    ref: wrapRef,
    "aria-hidden": "true",
    style: {
      position: 'fixed',
      top: 0,
      right: 'max(10px, calc((100vw - var(--container)) / 2 - 24px))',
      width: iconSize,
      zIndex: 45,
      pointerEvents: 'none',
      opacity: 0,
      visibility: 'hidden',
      willChange: 'transform, opacity'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -4,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 9,
      height: 9,
      borderRadius: '50%',
      background: 'var(--accent)',
      boxShadow: 'var(--glow-violet)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    ref: ropeRef,
    style: {
      position: 'relative',
      width: ropeWidth,
      height: ropeHeight,
      margin: '0 auto',
      background: 'linear-gradient(180deg, rgba(142,123,255,0.15), rgba(142,123,255,0.6))',
      transformOrigin: 'top center',
      pointerEvents: 'auto',
      willChange: 'transform'
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: iconRef,
    className: "fg-climber-icon",
    style: {
      position: 'absolute',
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: iconSize,
      height: iconSize,
      cursor: 'grab',
      pointerEvents: 'auto',
      filter: 'drop-shadow(0 10px 24px rgba(142,123,255,0.4))',
      transition: 'transform .35s var(--ease-out)'
    },
    onMouseEnter: e => {
      if (window.gsap) window.gsap.to(e.currentTarget, {
        scale: 1.12,
        duration: 0.35,
        ease: 'power2.out'
      });
    },
    onMouseLeave: e => {
      if (window.gsap) window.gsap.to(e.currentTarget, {
        scale: 1,
        duration: 0.35,
        ease: 'power2.out'
      });
    }
  }, /*#__PURE__*/React.createElement(AstronautSvg, {
    size: iconSize
  }))));
}
function AstronautSvg({
  size = 58
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 64 64",
    xmlns: "http://www.w3.org/2000/svg",
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "fgSuitGrad",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#FFFFFF"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#C7CAE2"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "fgVisorGrad",
    x1: "0.15",
    y1: "0.1",
    x2: "0.85",
    y2: "0.95"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#A99BFF"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "0.5",
    stopColor: "#3A2F66"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#0A0A14"
  }))), /*#__PURE__*/React.createElement("line", {
    x1: "32",
    y1: "6.5",
    x2: "32",
    y2: "3",
    stroke: "#A7ABC8",
    strokeWidth: "1.4",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "2.4",
    r: "2",
    fill: "#8E7BFF"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "22",
    y: "24",
    width: "20",
    height: "20",
    rx: "6",
    fill: "#AEB2D0"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "11",
    y: "29",
    width: "7.5",
    height: "17",
    rx: "3.75",
    fill: "url(#fgSuitGrad)",
    stroke: "#A7ABC8",
    strokeWidth: "0.8"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "45.5",
    y: "29",
    width: "7.5",
    height: "17",
    rx: "3.75",
    fill: "url(#fgSuitGrad)",
    stroke: "#A7ABC8",
    strokeWidth: "0.8"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "24",
    y: "47",
    width: "7",
    height: "13",
    rx: "3",
    fill: "url(#fgSuitGrad)",
    stroke: "#A7ABC8",
    strokeWidth: "0.8"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "33",
    y: "47",
    width: "7",
    height: "13",
    rx: "3",
    fill: "url(#fgSuitGrad)",
    stroke: "#A7ABC8",
    strokeWidth: "0.8"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "23.4",
    y: "57",
    width: "8.2",
    height: "4.4",
    rx: "2.2",
    fill: "#8E7BFF"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "32.4",
    y: "57",
    width: "8.2",
    height: "4.4",
    rx: "2.2",
    fill: "#8E7BFF"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "20",
    y: "30",
    width: "24",
    height: "22",
    rx: "9",
    fill: "url(#fgSuitGrad)",
    stroke: "#A7ABC8",
    strokeWidth: "0.9"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "14.75",
    cy: "46.5",
    r: "4.1",
    fill: "url(#fgSuitGrad)",
    stroke: "#A7ABC8",
    strokeWidth: "0.8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "49.25",
    cy: "46.5",
    r: "4.1",
    fill: "url(#fgSuitGrad)",
    stroke: "#A7ABC8",
    strokeWidth: "0.8"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "26.5",
    y: "36",
    width: "11",
    height: "8",
    rx: "2",
    fill: "#12122A",
    stroke: "#2B2B45",
    strokeWidth: "0.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "29.5",
    cy: "40",
    r: "1.1",
    fill: "#5FE3C8"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "33",
    cy: "40",
    r: "1.1",
    fill: "#8E7BFF"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "35",
    y: "38.4",
    width: "1.5",
    height: "3.2",
    rx: "0.75",
    fill: "#F0C66B"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "19",
    r: "14",
    fill: "url(#fgSuitGrad)",
    stroke: "#A7ABC8",
    strokeWidth: "0.9"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "32",
    cy: "19.5",
    rx: "10.5",
    ry: "9.5",
    fill: "url(#fgVisorGrad)"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "27.5",
    cy: "15.5",
    rx: "3.3",
    ry: "2.1",
    fill: "#FFFFFF",
    opacity: "0.5",
    transform: "rotate(-25 27.5 15.5)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "36.5",
    cy: "22.5",
    r: "1.3",
    fill: "#FFFFFF",
    opacity: "0.45"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M34.2 14.6 l0.55 1.35 1.45 .2 -1.05 1 .28 1.45 -1.23 -.75 -1.23 .75 .28 -1.45 -1.05 -1 1.45 -.2z",
    fill: "#FFFFFF",
    opacity: "0.75"
  }));
}
window.CosmicClimber = CosmicClimber;
})(); } catch (e) { __ds_ns.__errors.push({ path: "site/site-climber.jsx", error: String((e && e.message) || e) }); }

// site/site-contact.jsx
try { (() => {
// FG Designs — site (parte 3): Contato + Footer + App + FAB
const FGc = window.FGDesignsCosmosDesignSystem_29e3f7;
const Dc = window.FG_DATA;
const IconC = window.Icon;

/* ================= CONTACT ================= */
function Contact() {
  const mobile = window.useMediaQuery('(max-width: 860px)');
  const [sent, setSent] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const [err, setErr] = React.useState('');
  const submit = e => {
    e.preventDefault();
    if (!name.trim()) {
      setErr('Me conta seu nome pra eu saber com quem falo.');
      return;
    }
    if (!email.trim() && !msg.trim()) {
      setErr('Deixa um contato ou conta um pouco do projeto.');
      return;
    }
    setErr('');
    const text = `Oi Kauê! Sou ${name}.` + (msg ? ` ${msg}` : '') + (email ? ` (contato: ${email})` : '');
    window.open('https://wa.me/5541995917905?text=' + encodeURIComponent(text), '_blank');
    setSent(true);
  };
  const rows = [{
    ic: 'WhatsApp',
    label: Dc.contact.whatsappLabel,
    sub: 'WhatsApp',
    url: Dc.contact.whatsappUrl
  }, {
    ic: 'Mail',
    label: Dc.contact.email,
    sub: 'E-mail',
    url: 'mailto:' + Dc.contact.email
  }, {
    ic: 'Instagram',
    label: Dc.contact.instagramLabel,
    sub: 'Instagram',
    url: Dc.contact.instagramUrl
  }, {
    ic: 'MapPin',
    label: Dc.profile.location,
    sub: 'Base',
    url: null
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "contato",
    className: "fg-cosmos",
    style: {
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fg-reveal",
    style: {
      ...window.FG_WRAP(mobile),
      padding: mobile ? '68px 20px' : '100px 32px',
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
      gap: mobile ? 40 : 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FGc.Eyebrow, null, "Vamos conversar"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: mobile ? 'clamp(32px,9vw,44px)' : 'clamp(34px,4.5vw,56px)',
      letterSpacing: '-0.03em',
      color: 'var(--text-strong)',
      margin: '16px 0 18px',
      lineHeight: 1.04
    }
  }, "Sua ideia merece", /*#__PURE__*/React.createElement("br", null), "o espa\xE7o todo."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: mobile ? 16 : 17,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      margin: '0 0 26px',
      maxWidth: 430
    }
  }, "Conte o que precisa criar. Respondo em at\xE9 24h com pr\xF3ximos passos e um or\xE7amento honesto."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      marginBottom: 30
    }
  }, /*#__PURE__*/React.createElement(FGc.Button, {
    glow: true,
    onClick: () => window.open(Dc.contact.whatsappUrl, '_blank'),
    iconLeft: /*#__PURE__*/React.createElement(IconC, {
      name: "WhatsApp",
      size: 17
    })
  }, "Chamar no WhatsApp"), /*#__PURE__*/React.createElement(FGc.Button, {
    variant: "secondary",
    onClick: () => {
      window.location.href = 'mailto:' + Dc.contact.email;
    },
    iconLeft: /*#__PURE__*/React.createElement(IconC, {
      name: "Mail",
      size: 16
    })
  }, "E-mail")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, rows.map(r => {
    const inner = /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 13,
        padding: '10px 0'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 38,
        height: 38,
        borderRadius: 'var(--radius-md)',
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--surface-card)',
        border: '1px solid var(--border-default)'
      }
    }, /*#__PURE__*/React.createElement(IconC, {
      name: r.ic,
      size: 17,
      color: "var(--accent)"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 10.5,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)'
      }
    }, r.sub), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-sans)',
        fontSize: 15,
        color: 'var(--text-strong)',
        marginTop: 2
      }
    }, r.label)));
    return r.url ? /*#__PURE__*/React.createElement("a", {
      key: r.sub,
      href: r.url,
      target: r.url.startsWith('http') ? '_blank' : undefined,
      rel: "noopener noreferrer",
      style: {
        textDecoration: 'none'
      }
    }, inner) : /*#__PURE__*/React.createElement("div", {
      key: r.sub
    }, inner);
  }))), /*#__PURE__*/React.createElement(FGc.Card, {
    variant: "glow",
    padding: mobile ? '24px' : '32px'
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '32px 8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 64,
      height: 64,
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--accent-soft)',
      boxShadow: 'var(--glow-violet)'
    }
  }, /*#__PURE__*/React.createElement(IconC, {
    name: "Check",
    size: 30,
    color: "var(--accent)"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 26,
      color: 'var(--text-strong)',
      margin: '20px 0 8px'
    }
  }, "Abrindo o WhatsApp \uD83D\uDEF0\uFE0F"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      color: 'var(--text-muted)',
      margin: 0
    }
  }, "Valeu, ", name.split(' ')[0] || 'pessoa', "! Se n\xE3o abriu, me chama em ", Dc.contact.whatsappLabel, "."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(FGc.Button, {
    variant: "secondary",
    onClick: () => {
      setSent(false);
      setName('');
      setEmail('');
      setMsg('');
    }
  }, "Enviar outro"))) : /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(FGc.Input, {
    label: "Nome",
    placeholder: "Seu nome",
    value: name,
    onChange: e => setName(e.target.value)
  }), /*#__PURE__*/React.createElement(FGc.Input, {
    label: "E-mail ou telefone",
    placeholder: "pra eu te retornar",
    value: email,
    onChange: e => setEmail(e.target.value)
  }), /*#__PURE__*/React.createElement(FGc.Textarea, {
    label: "Sobre o projeto",
    rows: 4,
    placeholder: "Tipo, prazo, refer\xEAncias\u2026",
    value: msg,
    onChange: e => setMsg(e.target.value)
  }), err && /*#__PURE__*/React.createElement("div", {
    role: "alert",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-sans)',
      fontSize: 13.5,
      color: 'var(--fg-danger)'
    }
  }, /*#__PURE__*/React.createElement(IconC, {
    name: "AlertCircle",
    size: 15,
    color: "var(--fg-danger)"
  }), " ", err), /*#__PURE__*/React.createElement(FGc.Button, {
    type: "submit",
    full: true,
    glow: true,
    iconRight: /*#__PURE__*/React.createElement(IconC, {
      name: "Send",
      size: 16
    })
  }, "Enviar pelo WhatsApp")))));
}

/* ================= FOOTER ================= */
function Footer() {
  const mobile = window.useMediaQuery('(max-width: 760px)');
  const socials = [{
    ic: 'Instagram',
    url: Dc.contact.instagramUrl
  }, {
    ic: 'WhatsApp',
    url: Dc.contact.whatsappUrl
  }, {
    ic: 'Mail',
    url: 'mailto:' + Dc.contact.email
  }];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--surface-sunken)',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fg-reveal",
    style: {
      ...window.FG_WRAP(mobile),
      padding: mobile ? '30px 20px' : '40px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.FG_LOGO,
    alt: "FG Designs",
    style: {
      height: 28
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      color: 'var(--text-muted)',
      letterSpacing: '0.04em'
    }
  }, "\xA9 2026 FG Designs \xB7 a vastid\xE3o da gal\xE1xia")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, socials.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.ic,
    href: s.url,
    target: s.url.startsWith('http') ? '_blank' : undefined,
    rel: "noopener noreferrer",
    "aria-label": s.ic,
    style: {
      width: 40,
      height: 40,
      borderRadius: 'var(--radius-md)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      color: 'var(--text-muted)',
      transition: 'color var(--dur-fast), border-color var(--dur-fast)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = 'var(--accent)';
      e.currentTarget.style.borderColor = 'var(--accent)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = 'var(--text-muted)';
      e.currentTarget.style.borderColor = 'var(--border-default)';
    }
  }, /*#__PURE__*/React.createElement(IconC, {
    name: s.ic,
    size: 18
  }))))));
}

/* ================= WhatsApp FAB ================= */
function WhatsFab() {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    on();
    window.addEventListener('scroll', on, {
      passive: true
    });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return /*#__PURE__*/React.createElement("a", {
    href: Dc.contact.whatsappUrl,
    target: "_blank",
    rel: "noopener",
    "aria-label": "Falar no WhatsApp",
    style: {
      position: 'fixed',
      right: 20,
      bottom: 20,
      zIndex: 70,
      width: 56,
      height: 56,
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--accent)',
      color: 'var(--text-on-accent)',
      boxShadow: 'var(--glow-violet)',
      opacity: show ? 1 : 0,
      transform: show ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.9)',
      pointerEvents: show ? 'auto' : 'none',
      transition: 'opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-spring)'
    }
  }, /*#__PURE__*/React.createElement(IconC, {
    name: "WhatsApp",
    size: 26
  }));
}

/* ================= APP ================= */
function App() {
  // reveal-on-scroll para as seções (suave, com fallbacks robustos)
  React.useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('fg-reveal-ready');
    const els = Array.from(document.querySelectorAll('.fg-reveal'));
    const io = new IntersectionObserver(ents => {
      ents.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, {
      rootMargin: '0px 0px -12% 0px',
      threshold: 0.08
    });
    els.forEach(el => io.observe(el));
    // rede de segurança: nunca deixar conteúdo oculto
    const safety = setTimeout(() => els.forEach(el => el.classList.add('is-visible')), 2600);
    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "fg-root"
  }, /*#__PURE__*/React.createElement(window.Nav, null), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(window.Hero, null), /*#__PURE__*/React.createElement(window.ShowReel, null), /*#__PURE__*/React.createElement(window.Services, null), /*#__PURE__*/React.createElement(window.Works, null), /*#__PURE__*/React.createElement(window.LiveSites, null), /*#__PURE__*/React.createElement(window.Testimonials, null), /*#__PURE__*/React.createElement(window.Pricing, null), /*#__PURE__*/React.createElement(window.About, null), /*#__PURE__*/React.createElement(window.Production, null), /*#__PURE__*/React.createElement(window.Process, null), /*#__PURE__*/React.createElement(Contact, null)), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(WhatsFab, null), window.CosmicClimber && /*#__PURE__*/React.createElement(window.CosmicClimber, null));
}
Object.assign(window, {
  Contact,
  Footer,
  WhatsFab
});
window.FGApp = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "site/site-contact.jsx", error: String((e && e.message) || e) }); }

// site/site-core.jsx
try { (() => {
// FG Designs — site (parte 1): helpers + Nav responsiva com scroll-spy + Hero
const FG = window.FGDesignsCosmosDesignSystem_29e3f7;
const D = window.FG_DATA;
const LOGO = 'assets/fg-logo-white.svg';
const LOGO_STELLAR = 'assets/fg-logo-stellar.svg';
const NAV_H = 66;

/* ---------- Lucide icon helper ---------- */
const WHATSAPP_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z';
function Icon({
  name,
  size = 18,
  color = 'currentColor',
  style = {}
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) return;
    if (name === 'WhatsApp') {
      const NS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.setAttribute('fill', 'currentColor');
      svg.style.color = color;
      svg.style.display = 'block';
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
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.style.color = color;
      svg.style.display = 'block';
      ref.current.appendChild(svg);
    }
  }, [name, size, color]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      ...style
    }
  });
}

/* ---------- media query hook ---------- */
function useMediaQuery(q) {
  const [m, setM] = React.useState(() => window.matchMedia(q).matches);
  React.useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener('change', on);
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
    const obs = new IntersectionObserver(entries => {
      const vis = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (vis[0]) setActive(vis[0].target.id);
    }, {
      rootMargin: `-${NAV_H + 8}px 0px -55% 0px`,
      threshold: [0.1, 0.35, 0.6]
    });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [ids.join(',')]);
  return active;
}
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - (NAV_H - 2);
  window.scrollTo({
    top: y,
    behavior: 'smooth'
  });
}
const wrap = mobile => ({
  width: '100%',
  maxWidth: 'var(--container)',
  margin: '0 auto',
  padding: mobile ? '0 20px' : '0 32px'
});

/* ================= NAV ================= */
function Nav() {
  const mobile = useMediaQuery('(max-width: 880px)');
  const active = useActiveSection(D.nav.map(n => n.id));
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener('scroll', on, {
      passive: true
    });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const go = id => {
    setOpen(false);
    scrollToId(id);
  };
  const Wordmark = () => /*#__PURE__*/React.createElement("a", {
    href: "#inicio",
    onClick: e => {
      e.preventDefault();
      go('inicio');
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    alt: "FG Designs",
    style: {
      height: 30
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 18,
      color: 'var(--text-strong)',
      letterSpacing: '-0.02em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "FG"), " Designs"));
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 60,
      borderBottom: `1px solid ${scrolled ? 'var(--border-subtle)' : 'transparent'}`,
      background: scrolled ? 'rgba(10,10,20,0.72)' : 'rgba(10,10,20,0.30)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      transition: 'background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap(mobile),
      height: NAV_H,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, null), !mobile && /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 26
    }
  }, D.nav.map(n => {
    const on = active === n.id;
    return /*#__PURE__*/React.createElement("a", {
      key: n.id,
      href: `#${n.id}`,
      onClick: e => {
        e.preventDefault();
        go(n.id);
      },
      style: {
        position: 'relative',
        padding: '6px 0',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        fontWeight: on ? 600 : 500,
        color: on ? 'var(--text-strong)' : 'var(--text-muted)',
        transition: 'color var(--dur-fast) var(--ease-out)'
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.color = 'var(--text-body)';
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.color = 'var(--text-muted)';
      }
    }, n.label, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -2,
        height: 2,
        borderRadius: 2,
        background: 'var(--accent)',
        opacity: on ? 1 : 0,
        transform: on ? 'scaleX(1)' : 'scaleX(0.3)',
        transition: 'opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)'
      }
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, !mobile && /*#__PURE__*/React.createElement(FG.Button, {
    size: "sm",
    onClick: () => scrollToId('contato'),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "ArrowRight",
      size: 15
    })
  }, "Or\xE7amento"), mobile && /*#__PURE__*/React.createElement("button", {
    "aria-label": "Menu",
    onClick: () => setOpen(o => !o),
    style: {
      all: 'unset',
      cursor: 'pointer',
      width: 42,
      height: 42,
      borderRadius: 'var(--radius-md)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface-section)',
      border: '1px solid var(--border-default)',
      color: 'var(--text-strong)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: open ? 'X' : 'Menu',
    size: 20
  })))), mobile && /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden',
      maxHeight: open ? 560 : 0,
      transition: 'max-height var(--dur-slow) var(--ease-out)',
      background: 'rgba(10,10,20,0.94)',
      borderTop: open ? '1px solid var(--border-subtle)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap(mobile),
      padding: '14px 20px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, D.nav.map(n => {
    const on = active === n.id;
    return /*#__PURE__*/React.createElement("a", {
      key: n.id,
      href: `#${n.id}`,
      onClick: e => {
        e.preventDefault();
        go(n.id);
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '13px 14px',
        borderRadius: 'var(--radius-md)',
        textDecoration: 'none',
        fontFamily: 'var(--font-sans)',
        fontSize: 16,
        fontWeight: on ? 600 : 500,
        color: on ? 'var(--text-strong)' : 'var(--text-body)',
        background: on ? 'var(--accent-soft)' : 'transparent'
      }
    }, n.label, on && /*#__PURE__*/React.createElement(Icon, {
      name: "ChevronRight",
      size: 16,
      color: "var(--accent)"
    }));
  }), /*#__PURE__*/React.createElement(FG.Button, {
    full: true,
    glow: true,
    style: {
      marginTop: 12
    },
    onClick: () => go('contato'),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "ArrowRight",
      size: 16
    })
  }, "Pedir or\xE7amento"))));
}

/* ================= HERO ================= */
function Hero() {
  const mobile = useMediaQuery('(max-width: 880px)');
  const centered = false;
  const Stats = () => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: mobile ? 28 : 48,
      marginTop: mobile ? 40 : 60,
      flexWrap: 'wrap',
      justifyContent: centered ? 'center' : 'flex-start'
    }
  }, D.stats.map(s => /*#__PURE__*/React.createElement(FG.Stat, {
    key: s.label,
    value: s.value,
    label: s.label,
    accent: s.accent
  })));
  const Buttons = () => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: mobile ? 30 : 38,
      flexWrap: 'wrap',
      justifyContent: centered ? 'center' : 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(FG.Button, {
    size: mobile ? 'md' : 'lg',
    glow: true,
    onClick: () => scrollToId('contato'),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "ArrowRight",
      size: 18
    })
  }, "Come\xE7ar um projeto"), /*#__PURE__*/React.createElement(FG.Button, {
    size: mobile ? 'md' : 'lg',
    variant: "secondary",
    onClick: () => scrollToId('trabalhos'),
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "Sparkles",
      size: 16
    })
  }, "Ver trabalhos"));
  return /*#__PURE__*/React.createElement("section", {
    id: "inicio",
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--fg-void)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 0
    }
  }, /*#__PURE__*/React.createElement(FG.StarsBackground, {
    density: mobile ? 'sparse' : 'normal',
    speed: 80,
    interactive: !mobile,
    style: {
      position: 'absolute',
      inset: 0
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap(mobile),
      position: 'relative',
      zIndex: 1,
      paddingTop: mobile ? 84 : 118,
      paddingBottom: mobile ? 76 : 104,
      display: centered ? 'flex' : 'grid',
      flexDirection: 'column',
      alignItems: 'center',
      gridTemplateColumns: !centered && !mobile ? '1.15fr 0.85fr' : '1fr',
      gap: 40,
      textAlign: centered ? 'center' : 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: centered ? 860 : 720
    }
  }, centered && !mobile && /*#__PURE__*/React.createElement("img", {
    src: LOGO_STELLAR,
    alt: "",
    "aria-hidden": "true",
    className: "fg-twinkle",
    style: {
      height: 96,
      marginBottom: 8
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: centered ? 'center' : 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(FG.Eyebrow, null, "Freelancer \xB7 Web \xB7 Produ\xE7\xE3o gr\xE1fica")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: centered ? 'clamp(40px, 8vw, 78px)' : 'clamp(38px, 6.4vw, 76px)',
      lineHeight: 1.02,
      letterSpacing: '-0.03em',
      color: 'var(--text-strong)',
      margin: '18px auto 0',
      maxWidth: centered ? 900 : 'none'
    }
  }, "Interfaces com", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "fg-text-flow"
  }, "a vastid\xE3o da gal\xE1xia.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: mobile ? 16 : 19,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      margin: centered ? '22px auto 0' : '22px 0 0',
      maxWidth: 560
    }
  }, "Crio landing pages e interfaces que respiram \u2014 do conceito ao deploy \u2014 e cuido da arte final pra gr\xE1fica: cor, sangria, encaixe e registro."), /*#__PURE__*/React.createElement(Buttons, null), /*#__PURE__*/React.createElement(Stats, null)), !centered && !mobile && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO_STELLAR,
    alt: "Monograma FG",
    className: "fg-twinkle",
    style: {
      width: '100%',
      maxWidth: 380,
      filter: 'drop-shadow(0 20px 60px rgba(142,123,255,0.35))'
    }
  }))), /*#__PURE__*/React.createElement("hr", {
    className: "fg-rule",
    style: {
      position: 'relative',
      zIndex: 1,
      margin: 0
    }
  }));
}

/* ================= SHOWREEL ================= */
function ShowReel() {
  const mobile = useMediaQuery('(max-width: 760px)');
  const vidRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(true);
  const togglePlay = () => {
    const v = vidRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "showreel",
    style: {
      background: 'var(--surface-page)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(60% 70% at 50% 40%, rgba(142,123,255,0.12), transparent 70%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "fg-reveal",
    style: {
      ...wrap(mobile),
      position: 'relative',
      zIndex: 1,
      padding: mobile ? '56px 20px' : '78px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: mobile ? 28 : 38
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(FG.Eyebrow, {
    color: "var(--aurora)"
  }, "Showreel")), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: mobile ? 'clamp(26px,7vw,34px)' : 'clamp(30px,4vw,44px)',
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      margin: '14px 0 0',
      lineHeight: 1.08
    }
  }, "A marca em movimento.")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 940,
      margin: '0 auto',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: -1,
      borderRadius: 'calc(var(--radius-xl) + 3px)',
      background: 'linear-gradient(135deg, var(--accent), var(--aurora) 55%, var(--premium))',
      opacity: 0.55,
      filter: 'blur(18px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      border: '1px solid var(--border-default)',
      background: 'var(--fg-void)',
      boxShadow: 'var(--shadow-xl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '11px 16px',
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(10,10,20,0.72)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, ['var(--accent)', 'var(--aurora)', 'var(--premium)'].map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: c,
      opacity: 0.9
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "fg-designs \xB7 anima\xE7\xE3o"), /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    alt: "FG",
    style: {
      height: 18,
      opacity: 0.9
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "fg-starfield",
    style: {
      position: 'relative',
      background: 'var(--fg-void)'
    }
  }, /*#__PURE__*/React.createElement("video", {
    ref: vidRef,
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    preload: "metadata",
    onClick: togglePlay,
    style: {
      display: 'block',
      width: '100%',
      maxHeight: mobile ? 440 : 560,
      objectFit: 'contain',
      background: 'var(--fg-void)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("source", {
    src: "assets/std-fg-animacao-720.webm",
    type: "video/webm"
  }), /*#__PURE__*/React.createElement("source", {
    src: "assets/fg-animacao.mp4",
    type: "video/mp4"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 14,
      bottom: 14,
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    "aria-label": playing ? 'Pausar' : 'Reproduzir',
    onClick: togglePlay,
    style: ctrlBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: playing ? 'Pause' : 'Play',
    size: 17,
    color: "var(--text-strong)"
  }))))))), /*#__PURE__*/React.createElement("hr", {
    className: "fg-rule",
    style: {
      position: 'relative',
      zIndex: 1,
      margin: 0
    }
  }));
}
const ctrlBtn = {
  all: 'unset',
  cursor: 'pointer',
  width: 40,
  height: 40,
  borderRadius: 'var(--radius-md)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(5,5,9,0.62)',
  border: '1px solid var(--border-default)',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)'
};
Object.assign(window, {
  Icon,
  useMediaQuery,
  useActiveSection,
  scrollToId,
  FG_WRAP: wrap,
  FG_LOGO: LOGO,
  FG_LOGO_STELLAR: LOGO_STELLAR,
  Nav,
  Hero,
  ShowReel,
  NAV_H
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "site/site-core.jsx", error: String((e && e.message) || e) }); }

// site/site-core.standalone.jsx
try { (() => {
// FG Designs — site (parte 1): helpers + Nav responsiva com scroll-spy + Hero
const FG = window.FGDesignsCosmosDesignSystem_29e3f7;
const D = window.FG_DATA;
const LOGO = window.__resources.logoWhite;
const LOGO_STELLAR = window.__resources.logoStellar;
const NAV_H = 66;

/* ---------- Lucide icon helper ---------- */
const WHATSAPP_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z';
function Icon({
  name,
  size = 18,
  color = 'currentColor',
  style = {}
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) return;
    if (name === 'WhatsApp') {
      const NS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.setAttribute('fill', 'currentColor');
      svg.style.color = color;
      svg.style.display = 'block';
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
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.style.color = color;
      svg.style.display = 'block';
      ref.current.appendChild(svg);
    }
  }, [name, size, color]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      ...style
    }
  });
}

/* ---------- media query hook ---------- */
function useMediaQuery(q) {
  const [m, setM] = React.useState(() => window.matchMedia(q).matches);
  React.useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener('change', on);
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
    const obs = new IntersectionObserver(entries => {
      const vis = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (vis[0]) setActive(vis[0].target.id);
    }, {
      rootMargin: `-${NAV_H + 8}px 0px -55% 0px`,
      threshold: [0.1, 0.35, 0.6]
    });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [ids.join(',')]);
  return active;
}
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - (NAV_H - 2);
  window.scrollTo({
    top: y,
    behavior: 'smooth'
  });
}
const wrap = mobile => ({
  width: '100%',
  maxWidth: 'var(--container)',
  margin: '0 auto',
  padding: mobile ? '0 20px' : '0 32px'
});

/* ================= NAV ================= */
function Nav() {
  const mobile = useMediaQuery('(max-width: 880px)');
  const active = useActiveSection(D.nav.map(n => n.id));
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener('scroll', on, {
      passive: true
    });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const go = id => {
    setOpen(false);
    scrollToId(id);
  };
  const Wordmark = () => /*#__PURE__*/React.createElement("a", {
    href: "#inicio",
    onClick: e => {
      e.preventDefault();
      go('inicio');
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    alt: "FG Designs",
    style: {
      height: 30
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 18,
      color: 'var(--text-strong)',
      letterSpacing: '-0.02em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "FG"), " Designs"));
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 60,
      borderBottom: `1px solid ${scrolled ? 'var(--border-subtle)' : 'transparent'}`,
      background: scrolled ? 'rgba(10,10,20,0.72)' : 'rgba(10,10,20,0.30)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      transition: 'background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap(mobile),
      height: NAV_H,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, null), !mobile && /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 26
    }
  }, D.nav.map(n => {
    const on = active === n.id;
    return /*#__PURE__*/React.createElement("a", {
      key: n.id,
      href: `#${n.id}`,
      onClick: e => {
        e.preventDefault();
        go(n.id);
      },
      style: {
        position: 'relative',
        padding: '6px 0',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        fontWeight: on ? 600 : 500,
        color: on ? 'var(--text-strong)' : 'var(--text-muted)',
        transition: 'color var(--dur-fast) var(--ease-out)'
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.color = 'var(--text-body)';
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.color = 'var(--text-muted)';
      }
    }, n.label, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -2,
        height: 2,
        borderRadius: 2,
        background: 'var(--accent)',
        opacity: on ? 1 : 0,
        transform: on ? 'scaleX(1)' : 'scaleX(0.3)',
        transition: 'opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)'
      }
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, !mobile && /*#__PURE__*/React.createElement(FG.Button, {
    size: "sm",
    onClick: () => scrollToId('contato'),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "ArrowRight",
      size: 15
    })
  }, "Or\xE7amento"), mobile && /*#__PURE__*/React.createElement("button", {
    "aria-label": "Menu",
    onClick: () => setOpen(o => !o),
    style: {
      all: 'unset',
      cursor: 'pointer',
      width: 42,
      height: 42,
      borderRadius: 'var(--radius-md)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface-section)',
      border: '1px solid var(--border-default)',
      color: 'var(--text-strong)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: open ? 'X' : 'Menu',
    size: 20
  })))), mobile && /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden',
      maxHeight: open ? 560 : 0,
      transition: 'max-height var(--dur-slow) var(--ease-out)',
      background: 'rgba(10,10,20,0.94)',
      borderTop: open ? '1px solid var(--border-subtle)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap(mobile),
      padding: '14px 20px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, D.nav.map(n => {
    const on = active === n.id;
    return /*#__PURE__*/React.createElement("a", {
      key: n.id,
      href: `#${n.id}`,
      onClick: e => {
        e.preventDefault();
        go(n.id);
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '13px 14px',
        borderRadius: 'var(--radius-md)',
        textDecoration: 'none',
        fontFamily: 'var(--font-sans)',
        fontSize: 16,
        fontWeight: on ? 600 : 500,
        color: on ? 'var(--text-strong)' : 'var(--text-body)',
        background: on ? 'var(--accent-soft)' : 'transparent'
      }
    }, n.label, on && /*#__PURE__*/React.createElement(Icon, {
      name: "ChevronRight",
      size: 16,
      color: "var(--accent)"
    }));
  }), /*#__PURE__*/React.createElement(FG.Button, {
    full: true,
    glow: true,
    style: {
      marginTop: 12
    },
    onClick: () => go('contato'),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "ArrowRight",
      size: 16
    })
  }, "Pedir or\xE7amento"))));
}

/* ================= HERO ================= */
function Hero() {
  const mobile = useMediaQuery('(max-width: 880px)');
  const centered = false;
  const Stats = () => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: mobile ? 28 : 48,
      marginTop: mobile ? 40 : 60,
      flexWrap: 'wrap',
      justifyContent: centered ? 'center' : 'flex-start'
    }
  }, D.stats.map(s => /*#__PURE__*/React.createElement(FG.Stat, {
    key: s.label,
    value: s.value,
    label: s.label,
    accent: s.accent
  })));
  const Buttons = () => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: mobile ? 30 : 38,
      flexWrap: 'wrap',
      justifyContent: centered ? 'center' : 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(FG.Button, {
    size: mobile ? 'md' : 'lg',
    glow: true,
    onClick: () => scrollToId('contato'),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "ArrowRight",
      size: 18
    })
  }, "Come\xE7ar um projeto"), /*#__PURE__*/React.createElement(FG.Button, {
    size: mobile ? 'md' : 'lg',
    variant: "secondary",
    onClick: () => scrollToId('trabalhos'),
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "Sparkles",
      size: 16
    })
  }, "Ver trabalhos"));
  return /*#__PURE__*/React.createElement("section", {
    id: "inicio",
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--fg-void)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 0
    }
  }, /*#__PURE__*/React.createElement(FG.StarsBackground, {
    density: mobile ? 'sparse' : 'normal',
    speed: 80,
    interactive: !mobile,
    style: {
      position: 'absolute',
      inset: 0
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap(mobile),
      position: 'relative',
      zIndex: 1,
      paddingTop: mobile ? 84 : 118,
      paddingBottom: mobile ? 76 : 104,
      display: centered ? 'flex' : 'grid',
      flexDirection: 'column',
      alignItems: 'center',
      gridTemplateColumns: !centered && !mobile ? '1.15fr 0.85fr' : '1fr',
      gap: 40,
      textAlign: centered ? 'center' : 'left'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: centered ? 860 : 720
    }
  }, centered && !mobile && /*#__PURE__*/React.createElement("img", {
    src: LOGO_STELLAR,
    alt: "",
    "aria-hidden": "true",
    className: "fg-twinkle",
    style: {
      height: 96,
      marginBottom: 8
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: centered ? 'center' : 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(FG.Eyebrow, null, "Freelancer \xB7 Web \xB7 Produ\xE7\xE3o gr\xE1fica")), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: centered ? 'clamp(40px, 8vw, 78px)' : 'clamp(38px, 6.4vw, 76px)',
      lineHeight: 1.02,
      letterSpacing: '-0.03em',
      color: 'var(--text-strong)',
      margin: '18px auto 0',
      maxWidth: centered ? 900 : 'none'
    }
  }, "Interfaces com", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "fg-text-flow"
  }, "a vastid\xE3o da gal\xE1xia.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: mobile ? 16 : 19,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      margin: centered ? '22px auto 0' : '22px 0 0',
      maxWidth: 560
    }
  }, "Crio landing pages e interfaces que respiram \u2014 do conceito ao deploy \u2014 e cuido da arte final pra gr\xE1fica: cor, sangria, encaixe e registro."), /*#__PURE__*/React.createElement(Buttons, null), /*#__PURE__*/React.createElement(Stats, null)), !centered && !mobile && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO_STELLAR,
    alt: "Monograma FG",
    className: "fg-twinkle",
    style: {
      width: '100%',
      maxWidth: 380,
      filter: 'drop-shadow(0 20px 60px rgba(142,123,255,0.35))'
    }
  }))), /*#__PURE__*/React.createElement("hr", {
    className: "fg-rule",
    style: {
      position: 'relative',
      zIndex: 1,
      margin: 0
    }
  }));
}

/* ================= SHOWREEL ================= */
function ShowReel() {
  const mobile = useMediaQuery('(max-width: 760px)');
  const vidRef = React.useRef(null);
  const [playing, setPlaying] = React.useState(true);
  const togglePlay = () => {
    const v = vidRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "showreel",
    style: {
      background: 'var(--surface-page)',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(60% 70% at 50% 40%, rgba(142,123,255,0.12), transparent 70%)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "fg-reveal",
    style: {
      ...wrap(mobile),
      position: 'relative',
      zIndex: 1,
      padding: mobile ? '56px 20px' : '78px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: mobile ? 28 : 38
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(FG.Eyebrow, {
    color: "var(--aurora)"
  }, "Showreel")), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: mobile ? 'clamp(26px,7vw,34px)' : 'clamp(30px,4vw,44px)',
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      margin: '14px 0 0',
      lineHeight: 1.08
    }
  }, "A marca em movimento.")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 940,
      margin: '0 auto',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: -1,
      borderRadius: 'calc(var(--radius-xl) + 3px)',
      background: 'linear-gradient(135deg, var(--accent), var(--aurora) 55%, var(--premium))',
      opacity: 0.55,
      filter: 'blur(18px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      border: '1px solid var(--border-default)',
      background: 'var(--fg-void)',
      boxShadow: 'var(--shadow-xl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '11px 16px',
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(10,10,20,0.72)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, ['var(--accent)', 'var(--aurora)', 'var(--premium)'].map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: c,
      opacity: 0.9
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "fg-designs \xB7 anima\xE7\xE3o"), /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    alt: "FG",
    style: {
      height: 18,
      opacity: 0.9
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "fg-starfield",
    style: {
      position: 'relative',
      background: 'var(--fg-void)'
    }
  }, /*#__PURE__*/React.createElement("video", {
    ref: vidRef,
    src: window.__resources.video,
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    preload: "metadata",
    onClick: togglePlay,
    style: {
      display: 'block',
      width: '100%',
      maxHeight: mobile ? 440 : 560,
      objectFit: 'contain',
      background: 'var(--fg-void)',
      cursor: 'pointer'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 14,
      bottom: 14,
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    "aria-label": playing ? 'Pausar' : 'Reproduzir',
    onClick: togglePlay,
    style: ctrlBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: playing ? 'Pause' : 'Play',
    size: 17,
    color: "var(--text-strong)"
  }))))))), /*#__PURE__*/React.createElement("hr", {
    className: "fg-rule",
    style: {
      position: 'relative',
      zIndex: 1,
      margin: 0
    }
  }));
}
const ctrlBtn = {
  all: 'unset',
  cursor: 'pointer',
  width: 40,
  height: 40,
  borderRadius: 'var(--radius-md)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(5,5,9,0.62)',
  border: '1px solid var(--border-default)',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)'
};
Object.assign(window, {
  Icon,
  useMediaQuery,
  useActiveSection,
  scrollToId,
  FG_WRAP: wrap,
  FG_LOGO: LOGO,
  FG_LOGO_STELLAR: LOGO_STELLAR,
  Nav,
  Hero,
  ShowReel,
  NAV_H
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "site/site-core.standalone.jsx", error: String((e && e.message) || e) }); }

// site/site-extras.jsx
try { (() => {
// FG Designs — site (parte 4): Depoimentos, Preços e Detalhe de projeto
const FGx = window.FGDesignsCosmosDesignSystem_29e3f7;
const Dx = window.FG_DATA;
const IconX = window.Icon;
const useMQx = window.useMediaQuery;

/* ================= TESTIMONIALS ================= */
function Testimonials() {
  const mobile = useMQx('(max-width: 760px)');
  return /*#__PURE__*/React.createElement("section", {
    id: "depoimentos",
    style: {
      background: 'var(--surface-page)',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fg-reveal",
    style: {
      ...window.FG_WRAP(mobile),
      padding: mobile ? '64px 20px' : '90px 32px'
    }
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    kicker: "Depoimentos",
    kickerColor: "var(--premium)",
    title: "Quem j\xE1 lan\xE7ou comigo.",
    mobile: mobile,
    sub: "Palavra de quem recebeu o projeto \u2014 direto das conversas de entrega."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)',
      gap: mobile ? 14 : 18,
      marginTop: mobile ? 32 : 44
    }
  }, Dx.testimonials.map(t => /*#__PURE__*/React.createElement(FGx.Card, {
    key: t.author,
    padding: mobile ? '22px' : '28px'
  }, /*#__PURE__*/React.createElement(IconX, {
    name: "Quote",
    size: 22,
    color: "var(--accent)"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 600,
      fontSize: mobile ? 19 : 22,
      lineHeight: 1.35,
      color: 'var(--text-strong)',
      margin: '14px 0 20px',
      letterSpacing: '-0.01em'
    }
  }, "\u201C", t.quote, "\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: '50%',
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--accent-soft)',
      border: '1px solid var(--border-default)',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 15,
      color: 'var(--accent)'
    }
  }, t.author.charAt(0)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 14.5,
      color: 'var(--text-strong)'
    }
  }, t.author), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      marginTop: 3
    }
  }, t.tag))))))));
}

/* ================= PRICING ================= */
function Pricing() {
  const mobile = useMQx('(max-width: 860px)');
  const p = Dx.pricing;
  const planWa = name => 'https://wa.me/5541995917905?text=' + encodeURIComponent(`Oi Kauê! Tenho interesse no plano ${name} de landing page.`);
  return /*#__PURE__*/React.createElement("section", {
    id: "precos",
    style: {
      background: 'var(--surface-section)',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fg-reveal",
    style: {
      ...window.FG_WRAP(mobile),
      padding: mobile ? '64px 20px' : '90px 32px'
    }
  }, /*#__PURE__*/React.createElement(window.SectionHead, {
    kicker: p.kicker,
    title: p.title,
    sub: p.sub,
    mobile: mobile
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)',
      gap: mobile ? 16 : 22,
      marginTop: mobile ? 32 : 46,
      maxWidth: 880
    }
  }, p.plans.map(plan => /*#__PURE__*/React.createElement(FGx.Card, {
    key: plan.name,
    variant: plan.featured ? 'glow' : undefined,
    padding: mobile ? '24px' : '30px'
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: mobile ? 21 : 24,
      color: 'var(--text-strong)',
      margin: 0
    }
  }, plan.name), plan.featured && /*#__PURE__*/React.createElement(FGx.Badge, {
    tone: "gold",
    solid: true
  }, "Mais completo")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: mobile ? 30 : 36,
      letterSpacing: '-0.02em',
      color: plan.featured ? 'var(--accent)' : 'var(--text-strong)',
      margin: '14px 0 4px'
    }
  }, plan.price), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14.5,
      color: 'var(--text-muted)',
      margin: '0 0 20px'
    }
  }, plan.tagline), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 11,
      marginBottom: 24
    }
  }, plan.features.map(f => /*#__PURE__*/React.createElement("div", {
    key: f,
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    name: "Check",
    size: 16,
    color: plan.featured ? 'var(--accent)' : 'var(--aurora)',
    style: {
      marginTop: 2,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14.5,
      lineHeight: 1.5,
      color: 'var(--text-body)'
    }
  }, f)))), /*#__PURE__*/React.createElement(FGx.Button, {
    full: true,
    glow: plan.featured,
    variant: plan.featured ? 'primary' : 'secondary',
    onClick: () => window.open(planWa(plan.name), '_blank'),
    iconRight: /*#__PURE__*/React.createElement(IconX, {
      name: "ArrowRight",
      size: 16
    })
  }, "Quero o ", plan.name)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: mobile ? 16 : 22,
      maxWidth: 880
    }
  }, /*#__PURE__*/React.createElement(FGx.Card, {
    padding: mobile ? '22px' : '26px 30px'
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: mobile ? 'flex-start' : 'center',
      gap: mobile ? 14 : 20,
      flexDirection: mobile ? 'column' : 'row'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 'var(--radius-md)',
      flexShrink: 0,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface-raised)',
      border: '1px solid var(--border-default)'
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    name: "Printer",
    size: 22,
    color: "var(--premium)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: mobile ? 18 : 20,
      color: 'var(--text-strong)',
      margin: '0 0 6px'
    }
  }, p.graphic.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14.5,
      lineHeight: 1.55,
      color: 'var(--text-muted)',
      margin: 0,
      maxWidth: 560
    }
  }, p.graphic.desc)), /*#__PURE__*/React.createElement(FGx.Button, {
    variant: "secondary",
    onClick: () => window.open(Dx.contact.whatsappQuoteUrl, '_blank'),
    iconLeft: /*#__PURE__*/React.createElement(IconX, {
      name: "WhatsApp",
      size: 16
    })
  }, "Pedir or\xE7amento")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: mobile ? 16 : 22,
      maxWidth: 880,
      display: 'flex',
      gap: 13,
      padding: mobile ? '16px 18px' : '18px 22px',
      borderRadius: 'var(--radius-lg)',
      border: '1px dashed var(--border-default)',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    name: "Info",
    size: 18,
    color: "var(--premium)",
    style: {
      marginTop: 2,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13.5,
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      margin: 0
    }
  }, p.note))));
}

/* ================= WORK DETAIL (tela cheia) ================= */
function WorkDetail({
  work,
  onClose
}) {
  const mobile = useMQx('(max-width: 860px)');
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.history.pushState({
      fgWork: work.slug
    }, '', '#projeto-' + work.slug);
    const onPop = () => onClose(false);
    const onKey = e => {
      if (e.key === 'Escape') onClose(true);
    };
    window.addEventListener('popstate', onPop);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('keydown', onKey);
    };
  }, [work.slug]);
  const Info = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 16
    }
  }, work.featured && /*#__PURE__*/React.createElement(FGx.Badge, {
    tone: "gold",
    solid: true
  }, "Destaque"), /*#__PURE__*/React.createElement(FGx.Badge, {
    tone: "violet"
  }, work.type)), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: mobile ? 'clamp(26px,7vw,34px)' : 'clamp(28px,3vw,40px)',
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
      color: 'var(--text-strong)',
      margin: '0 0 16px'
    }
  }, work.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: mobile ? 15 : 16,
      lineHeight: 1.7,
      color: 'var(--text-body)',
      margin: '0 0 20px',
      maxWidth: 520
    }
  }, work.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 26
    }
  }, work.specs.map(s => /*#__PURE__*/React.createElement(FGx.Tag, {
    key: s
  }, s))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(FGx.Button, {
    glow: true,
    onClick: () => window.open(Dx.contact.whatsappUrl, '_blank'),
    iconLeft: /*#__PURE__*/React.createElement(IconX, {
      name: "WhatsApp",
      size: 16
    })
  }, "Quero um assim"), /*#__PURE__*/React.createElement(FGx.Button, {
    variant: "secondary",
    onClick: () => onClose(true),
    iconLeft: /*#__PURE__*/React.createElement(IconX, {
      name: "ArrowLeft",
      size: 16
    })
  }, "Voltar")));
  const Gallery = /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: mobile ? 18 : 24
    }
  }, work.gallery.map(g => /*#__PURE__*/React.createElement("figure", {
    key: g.src,
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      border: '1px solid var(--border-subtle)',
      background: 'var(--fg-void)',
      boxShadow: 'var(--shadow-md)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: g.src,
    alt: g.cap,
    style: {
      display: 'block',
      width: '100%',
      maxHeight: '76vh',
      objectFit: 'contain',
      background: 'var(--fg-void)'
    }
  })), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      margin: '10px 2px 0'
    }
  }, g.cap))));
  return /*#__PURE__*/React.createElement("div", {
    className: "fg-detail-enter",
    role: "dialog",
    "aria-modal": "true",
    "aria-label": work.title,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 5,
      height: 62,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(10,10,20,0.78)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      padding: mobile ? '0 16px' : '0 28px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onClose(true),
    "aria-label": "Voltar",
    style: {
      all: 'unset',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 9,
      padding: '9px 14px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-default)',
      background: 'var(--surface-card)',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, /*#__PURE__*/React.createElement(IconX, {
    name: "ArrowLeft",
    size: 16,
    color: "var(--accent)"
  }), " Voltar"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, mobile ? 'Projeto' : 'Trabalhos selecionados · ' + work.title), /*#__PURE__*/React.createElement("img", {
    src: window.FG_LOGO,
    alt: "FG Designs",
    style: {
      height: 24
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.FG_WRAP(mobile),
      padding: mobile ? '28px 20px 64px' : '48px 32px 90px'
    }
  }, mobile ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28
    }
  }, Info, Gallery) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.15fr 0.85fr',
      gap: 52,
      alignItems: 'start'
    }
  }, Gallery, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 62 + 32
    }
  }, Info))));
}
Object.assign(window, {
  Testimonials,
  Pricing,
  WorkDetail
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "site/site-extras.jsx", error: String((e && e.message) || e) }); }

// site/site-sections.jsx
try { (() => {
// FG Designs — site (parte 2): Serviços, Trabalhos, Sites no ar, Sobre, Produção, Processo
const FGb = window.FGDesignsCosmosDesignSystem_29e3f7;
const Db = window.FG_DATA;
const Icon = window.Icon;
const useMQ = window.useMediaQuery;
function SectionHead({
  kicker,
  title,
  kickerColor,
  sub,
  center,
  mobile
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: center ? 'center' : 'left',
      maxWidth: center ? 720 : 'none',
      margin: center ? '0 auto' : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: center ? 'center' : 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(FGb.Eyebrow, {
    color: kickerColor || 'var(--accent)'
  }, kicker)), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: mobile ? 'clamp(27px,7vw,34px)' : 'clamp(30px,4vw,46px)',
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      margin: '14px 0 0',
      lineHeight: 1.08
    }
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: mobile ? 15 : 17,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      margin: '16px auto 0',
      maxWidth: 560
    }
  }, sub));
}

/* ================= SERVICES ================= */
function Services() {
  const mobile = useMQ('(max-width: 760px)');
  return /*#__PURE__*/React.createElement("section", {
    id: "servicos",
    style: {
      background: 'var(--surface-section)',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fg-reveal",
    style: {
      ...window.FG_WRAP(mobile),
      padding: mobile ? '64px 20px' : '90px 32px'
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    kicker: "O que eu fa\xE7o",
    title: "Do pixel \xE0 prova de gr\xE1fica.",
    mobile: mobile,
    sub: "Um est\xFAdio de uma pessoa s\xF3 \u2014 eu desenho, codifico e preparo a arte pra imprimir."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: mobile ? 34 : 46,
      borderTop: '1px solid var(--border-subtle)'
    }
  }, Db.services.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: it.title,
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? 'auto 1fr' : '80px 46px 1fr',
      alignItems: mobile ? 'flex-start' : 'center',
      gap: mobile ? 14 : 24,
      padding: mobile ? '22px 4px' : '26px 8px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, !mobile && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
      color: 'var(--text-muted)',
      letterSpacing: '0.08em'
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 'var(--radius-md)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface-raised)',
      border: '1px solid var(--border-default)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: 22,
    color: it.tone
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: mobile ? '2' : 'auto'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: mobile ? 19 : 23,
      color: 'var(--text-strong)',
      margin: '0 0 5px'
    }
  }, it.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14.5,
      lineHeight: 1.55,
      color: 'var(--text-muted)',
      margin: 0,
      maxWidth: 620
    }
  }, it.desc)))))));
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
  const openWork = w => setSel(w);
  const closeWork = viaUi => {
    setSel(null);
    if (viaUi && window.history.state && window.history.state.fgWork) window.history.back();
  };

  // ao trocar o filtro no mobile, volta o carrossel pro início
  React.useEffect(() => {
    if (scrollerRef.current) scrollerRef.current.scrollTo({
      left: 0
    });
    setPage(0);
  }, [active]);
  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el || !el.firstChild) return;
    const step = el.firstChild.offsetWidth + 14;
    setPage(Math.max(0, Math.min(shown.length - 1, Math.round(el.scrollLeft / step))));
  };
  const Wcard = ({
    w
  }) => /*#__PURE__*/React.createElement("a", {
    href: '#projeto-' + w.slug,
    onClick: e => {
      e.preventDefault();
      openWork(w);
    },
    style: {
      display: 'block',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      textDecoration: 'none',
      border: '1px solid var(--border-subtle)',
      background: 'var(--surface-card)',
      cursor: 'pointer',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      e.currentTarget.style.borderColor = 'var(--border-default)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = '';
      e.currentTarget.style.borderColor = 'var(--border-subtle)';
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      aspectRatio: '3 / 2',
      background: 'var(--fg-void)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: w.image,
    alt: w.title,
    loading: "lazy",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }), w.featured && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12
    }
  }, /*#__PURE__*/React.createElement(FGb.Badge, {
    tone: "gold",
    solid: true
  }, "Destaque")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 10,
      right: 10,
      bottom: 10,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, w.specs.slice(0, 2).map(s => /*#__PURE__*/React.createElement("span", {
    key: s,
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10.5,
      letterSpacing: '0.06em',
      color: 'var(--text-strong)',
      padding: '4px 8px',
      borderRadius: 'var(--radius-pill)',
      background: 'rgba(5,5,9,0.6)',
      border: '1px solid var(--border-default)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)'
    }
  }, s)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      padding: '15px 17px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 15,
      color: 'var(--text-strong)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, w.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)',
      marginTop: 4,
      letterSpacing: '0.04em'
    }
  }, w.type.toUpperCase())), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      flexShrink: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 12.5,
      fontWeight: 600,
      color: 'var(--accent)'
    }
  }, "Ver ", /*#__PURE__*/React.createElement(Icon, {
    name: "ArrowUpRight",
    size: 16,
    color: "var(--accent)"
  }))));
  return /*#__PURE__*/React.createElement("section", {
    id: "trabalhos",
    style: {
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fg-reveal",
    style: {
      ...window.FG_WRAP(mobile),
      padding: mobile ? '64px 20px' : '90px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    kicker: "Trabalhos selecionados",
    title: "Constela\xE7\xE3o de projetos.",
    mobile: mobile
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, cats.map(c => /*#__PURE__*/React.createElement(FGb.Tag, {
    key: c,
    active: active === c,
    onClick: () => setActive(c),
    style: {
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      textTransform: 'none',
      letterSpacing: 0,
      fontSize: 13
    }
  }, c)))), mobile ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      margin: '28px -20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: scrollerRef,
    onScroll: onScroll,
    className: "fg-hscroll",
    style: {
      display: 'flex',
      gap: 14,
      overflowX: 'auto',
      scrollSnapType: 'x mandatory',
      padding: '0 20px 6px'
    }
  }, shown.map(w => /*#__PURE__*/React.createElement("div", {
    key: w.slug,
    style: {
      flex: '0 0 80%',
      scrollSnapAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Wcard, {
    w: w
  })))), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 6,
      width: 40,
      pointerEvents: 'none',
      zIndex: 2,
      background: 'linear-gradient(to right, var(--surface-page) 18%, transparent)',
      opacity: page > 0 ? 1 : 0,
      transition: 'opacity var(--dur-base) var(--ease-out)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 6,
      width: 88,
      pointerEvents: 'none',
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: 8,
      background: 'linear-gradient(to left, var(--surface-page) 30%, transparent)',
      opacity: page < shown.length - 1 ? 1 : 0,
      transition: 'opacity var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      boxShadow: '0 4px 14px rgba(5,5,9,0.5)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ChevronRight",
    size: 17,
    color: "var(--accent)"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, shown.map((w, i) => /*#__PURE__*/React.createElement("span", {
    key: w.slug,
    style: {
      width: i === page ? 18 : 6,
      height: 6,
      borderRadius: 3,
      background: i === page ? 'var(--accent)' : 'var(--border-default)',
      transition: 'width var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)'
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '0.1em',
      color: 'var(--text-muted)'
    }
  }, String(page + 1).padStart(2, '0'), " / ", String(shown.length).padStart(2, '0')))) : /*#__PURE__*/React.createElement("div", {
    key: active,
    className: "fg-grid-swap",
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 18,
      marginTop: 40
    }
  }, shown.map(w => /*#__PURE__*/React.createElement(Wcard, {
    key: w.slug,
    w: w
  })))), sel && /*#__PURE__*/React.createElement(window.WorkDetail, {
    work: sel,
    onClose: closeWork
  }));
}

/* ================= LIVE SITES ================= */
function LiveSites() {
  const mobile = useMQ('(max-width: 760px)');
  const domain = u => u.replace(/^https?:\/\//, '').replace(/\/$/, '');
  return /*#__PURE__*/React.createElement("section", {
    id: "sites",
    style: {
      background: 'var(--surface-section)',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fg-reveal",
    style: {
      ...window.FG_WRAP(mobile),
      padding: mobile ? '64px 20px' : '90px 32px'
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    kicker: "No ar",
    kickerColor: "var(--aurora)",
    title: "Sites que j\xE1 est\xE3o orbitando.",
    mobile: mobile,
    sub: "Projetos publicados e rodando. D\xE1 pra visitar agora mesmo."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)',
      gap: mobile ? 18 : 24,
      marginTop: mobile ? 30 : 44
    }
  }, Db.liveSites.map(s => /*#__PURE__*/React.createElement("a", {
    key: s.name,
    href: s.url,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      display: 'block',
      textDecoration: 'none',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      border: '1px solid var(--border-subtle)',
      background: 'var(--surface-card)',
      boxShadow: 'var(--shadow-md)',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      e.currentTarget.style.borderColor = 'var(--border-default)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      e.currentTarget.style.borderColor = 'var(--border-subtle)';
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '11px 14px',
      borderBottom: '1px solid var(--border-subtle)',
      background: 'var(--surface-raised)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, ['#FF6B81', '#F0C66B', '#5FE3C8'].map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: c,
      opacity: 0.85
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      textAlign: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      color: 'var(--text-muted)',
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, domain(s.url)), /*#__PURE__*/React.createElement(Icon, {
    name: "ExternalLink",
    size: 14,
    color: "var(--text-muted)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "fg-starfield",
    style: {
      position: 'relative',
      height: mobile ? 200 : 260,
      background: s.g,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("iframe", {
    src: s.url,
    title: s.name,
    loading: "lazy",
    tabIndex: -1,
    scrolling: "no",
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '200%',
      height: '200%',
      border: 0,
      transform: 'scale(0.5)',
      transformOrigin: 'top left',
      pointerEvents: 'none',
      background: 'transparent'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 12,
      right: 12,
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement(FGb.Badge, {
    tone: "aurora",
    dot: true
  }, "Ao vivo"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: mobile ? '16px 18px' : '20px 22px',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: mobile ? 20 : 24,
      color: 'var(--text-strong)',
      margin: 0
    }
  }, s.title), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      fontSize: 13.5,
      fontWeight: 600,
      color: 'var(--accent)'
    }
  }, "Ver site ", /*#__PURE__*/React.createElement(Icon, {
    name: "ArrowUpRight",
    size: 16,
    color: "var(--accent)"
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-muted)',
      margin: '7px 0 14px'
    }
  }, s.role), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 7
    }
  }, s.tags.map(t => /*#__PURE__*/React.createElement(FGb.Tag, {
    key: t,
    style: {
      fontFamily: 'var(--font-sans)',
      textTransform: 'none',
      letterSpacing: 0,
      fontSize: 12
    }
  }, t)))))))));
}

/* ================= ABOUT ================= */
function About() {
  const mobile = useMQ('(max-width: 860px)');
  const a = Db.about;
  const Photo = /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      border: '1px solid var(--border-default)',
      boxShadow: 'var(--shadow-lg)',
      aspectRatio: mobile ? '4 / 3' : '4 / 5'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: Db.profile.photo,
    alt: Db.profile.name,
    loading: "lazy",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center 38%',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, transparent 55%, rgba(5,5,9,0.85))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 18,
      right: 18,
      bottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 20,
      color: 'var(--text-strong)'
    }
  }, Db.profile.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      color: 'var(--text-body)',
      letterSpacing: '0.06em',
      marginTop: 4
    }
  }, Db.profile.location.toUpperCase())));
  const Text = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FGb.Eyebrow, {
    color: "var(--premium)"
  }, a.kicker), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: mobile ? 'clamp(26px,7vw,34px)' : 'clamp(30px,3.4vw,44px)',
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      margin: '16px 0 20px',
      lineHeight: 1.1
    }
  }, a.heading), a.body.map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: mobile ? 15.5 : 16.5,
      lineHeight: 1.7,
      color: 'var(--text-body)',
      margin: '0 0 16px',
      maxWidth: 540
    }
  }, p)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 22
    }
  }, a.tags.map(t => /*#__PURE__*/React.createElement(FGb.Tag, {
    key: t
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement(FGb.Button, {
    variant: "secondary",
    onClick: () => window.open(Db.contact.instagramUrl, '_blank'),
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "Instagram",
      size: 16
    })
  }, "Ver no Instagram")));
  return /*#__PURE__*/React.createElement("section", {
    id: "sobre",
    style: {
      background: 'var(--surface-page)',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fg-reveal",
    style: {
      ...window.FG_WRAP(mobile),
      padding: mobile ? '64px 20px' : '96px 32px',
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : '0.85fr 1.15fr',
      gap: mobile ? 34 : 60,
      alignItems: 'center'
    }
  }, Photo, Text));
}

/* ================= PRODUCTION ================= */
function Production() {
  const mobile = useMQ('(max-width: 860px)');
  return /*#__PURE__*/React.createElement("section", {
    className: "fg-nebula-bg",
    style: {
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fg-reveal",
    style: {
      ...window.FG_WRAP(mobile),
      padding: mobile ? '56px 20px' : '68px 32px',
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : '1fr 1.1fr',
      gap: mobile ? 28 : 52,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FGb.Eyebrow, {
    color: "var(--premium)"
  }, "Diferencial"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: mobile ? 'clamp(24px,6.5vw,30px)' : 'clamp(26px,3vw,38px)',
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      margin: '14px 0 14px',
      lineHeight: 1.1
    }
  }, "Arte final que a gr\xE1fica agradece."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: mobile ? 15 : 16,
      lineHeight: 1.65,
      color: 'var(--text-body)',
      margin: 0,
      maxWidth: 460
    }
  }, "Anos de produ\xE7\xE3o em impress\xE3o \u2014 eu falo a l\xEDngua da m\xE1quina. Cada arquivo sai com cor calibrada, sangria certa e encaixe conferido.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10
    }
  }, Db.specs.map(s => /*#__PURE__*/React.createElement(FGb.Tag, {
    key: s
  }, s)))));
}

/* ================= PROCESS ================= */
function Process() {
  const mobile = useMQ('(max-width: 760px)');
  return /*#__PURE__*/React.createElement("section", {
    id: "processo",
    style: {
      background: 'var(--surface-section)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fg-reveal",
    style: {
      ...window.FG_WRAP(mobile),
      padding: mobile ? '64px 20px' : '90px 32px'
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    kicker: "Como funciona",
    title: "Quatro \xF3rbitas at\xE9 o lan\xE7amento.",
    mobile: mobile
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: mobile ? 34 : 48,
      position: 'relative',
      paddingLeft: mobile ? 34 : 42
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: mobile ? 11 : 15,
      top: 6,
      bottom: 6,
      width: 2,
      background: 'linear-gradient(180deg, var(--accent), var(--aurora), transparent)'
    }
  }), Db.process.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.n,
    style: {
      position: 'relative',
      paddingBottom: 30
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: mobile ? -34 : -42,
      top: 0,
      width: mobile ? 24 : 32,
      height: mobile ? 24 : 32,
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface-active)',
      border: '1px solid var(--accent)',
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--accent)'
    }
  }, s.n), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: mobile ? 20 : 24,
      color: 'var(--text-strong)',
      margin: '2px 0 6px'
    }
  }, s.t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: mobile ? 14.5 : 15.5,
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      margin: 0,
      maxWidth: 520
    }
  }, s.d))))));
}
Object.assign(window, {
  SectionHead,
  Services,
  Works,
  LiveSites,
  About,
  Production,
  Process
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "site/site-sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fgdesigns-site/sections-a.jsx
try { (() => {
// FG Designs — landing site sections (part 1: chrome + hero + services)
// Uses design-system primitives from window namespace + Lucide icons via CDN.
const FG = window.FGDesignsCosmosDesignSystem_29e3f7;
function Icon({
  name,
  size = 18,
  color = 'currentColor',
  style = {}
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide && ref.current) {
      ref.current.innerHTML = '';
      const svg = window.lucide.createElement(window.lucide.icons[name] || window.lucide.icons.Circle);
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.style.color = color;
      svg.style.display = 'block';
      ref.current.appendChild(svg);
    }
  });
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      ...style
    }
  });
}
const LOGO = '../../assets/logo/fg-logo-white.svg';
const LOGO_STELLAR = '../../assets/logo/fg-logo-stellar.svg';
const wrap = {
  width: '100%',
  maxWidth: 'var(--container)',
  margin: '0 auto',
  padding: '0 28px'
};

/* ---------------- NAV ---------------- */
function Nav({
  onContact
}) {
  const links = ['Trabalhos', 'Serviços', 'Processo', 'Sobre'];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(10,10,20,0.72)',
      backdropFilter: 'blur(14px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      height: 68,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    alt: "FG",
    style: {
      height: 34
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 19,
      color: 'var(--text-strong)',
      letterSpacing: '-0.02em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "FG"), " Designs")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 30
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-body)',
      textDecoration: 'none',
      transition: 'color var(--dur-fast) var(--ease-out)'
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--text-strong)',
    onMouseLeave: e => e.currentTarget.style.color = 'var(--text-body)'
  }, l)), /*#__PURE__*/React.createElement(FG.Button, {
    size: "sm",
    onClick: onContact,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "ArrowRight",
      size: 15
    })
  }, "Or\xE7amento"))));
}

/* ---------------- HERO ---------------- */
function Hero({
  onContact
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "fg-cosmos",
    style: {
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO_STELLAR,
    alt: "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: -90,
      top: -70,
      height: 640,
      opacity: 0.1,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      paddingTop: 110,
      paddingBottom: 96,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement(FG.Eyebrow, null, "Freelancer \xB7 Web \xB7 Produ\xE7\xE3o gr\xE1fica"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(44px, 7vw, 84px)',
      lineHeight: 1.02,
      letterSpacing: '-0.03em',
      color: 'var(--text-strong)',
      margin: '20px 0 0'
    }
  }, "Interfaces com", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "fg-text-stellar"
  }, "a vastid\xE3o da gal\xE1xia.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 19,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      margin: '24px 0 0',
      maxWidth: 580
    }
  }, "Crio landing pages e interfaces que respiram \u2014 do conceito ao deploy \u2014 e cuido da arte final pra gr\xE1fica: cores, sangria, encaixe e registro."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 36,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(FG.Button, {
    size: "lg",
    glow: true,
    onClick: onContact,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "ArrowRight",
      size: 18
    })
  }, "Come\xE7ar um projeto"), /*#__PURE__*/React.createElement(FG.Button, {
    size: "lg",
    variant: "secondary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "Play",
      size: 16
    })
  }, "Ver trabalhos")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 52,
      marginTop: 64
    }
  }, /*#__PURE__*/React.createElement(FG.Stat, {
    value: "120+",
    label: "Projetos entregues",
    accent: "var(--accent)"
  }), /*#__PURE__*/React.createElement(FG.Stat, {
    value: "8 anos",
    label: "Em produ\xE7\xE3o gr\xE1fica"
  }), /*#__PURE__*/React.createElement(FG.Stat, {
    value: "100%",
    label: "No prazo",
    accent: "var(--premium)"
  })))));
}

/* ---------------- SERVICES ---------------- */
function Services() {
  const items = [{
    icon: 'MonitorSmartphone',
    tone: 'var(--accent)',
    title: 'Landing pages',
    desc: 'Páginas que convertem — copy, design e código, prontas pra publicar.'
  }, {
    icon: 'PenTool',
    tone: 'var(--aurora)',
    title: 'UX/UI & interfaces',
    desc: 'Fluxos, protótipos e telas de produto pensados no detalhe.'
  }, {
    icon: 'Image',
    tone: 'var(--premium)',
    title: 'Tratamento de imagem',
    desc: 'Retoque, recorte e ajuste de cor com qualidade de impressão.'
  }, {
    icon: 'Printer',
    tone: 'var(--fg-danger)',
    title: 'Consultoria de produção',
    desc: 'Para empresas de comunicação visual: cor, sangria, encaixe e registro.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-section)',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      padding: '88px 28px'
    }
  }, /*#__PURE__*/React.createElement(FG.Eyebrow, null, "O que eu fa\xE7o"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(30px,4vw,46px)',
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      margin: '14px 0 0'
    }
  }, "Do pixel \xE0 prova de gr\xE1fica."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 18,
      marginTop: 44
    }
  }, items.map(it => /*#__PURE__*/React.createElement(FG.Card, {
    key: it.title,
    hover: true,
    padding: "22px"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 'var(--radius-md)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface-raised)',
      border: '1px solid var(--border-default)',
      color: it.tone
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: 22,
    color: it.tone
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 20,
      color: 'var(--text-strong)',
      margin: '18px 0 8px'
    }
  }, it.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      lineHeight: 1.55,
      color: 'var(--text-muted)',
      margin: 0
    }
  }, it.desc))))));
}
Object.assign(window, {
  Icon,
  Nav,
  Hero,
  Services,
  FG_WRAP: wrap,
  FG_LOGO: LOGO
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fgdesigns-site/sections-a.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fgdesigns-site/sections-b.jsx
try { (() => {
// FG Designs — landing site sections (part 2: work, production, process, contact, footer)
const FGb = window.FGDesignsCosmosDesignSystem_29e3f7;

/* ---------------- SELECTED WORK ---------------- */
function Work() {
  const cats = ['Tudo', 'Landing', 'Interface', 'Marca'];
  const [active, setActive] = React.useState('Tudo');
  const projects = [{
    name: 'Nebulosa',
    kind: 'Landing',
    cat: 'Landing',
    g: 'radial-gradient(120% 100% at 20% 0%, #2A2A4A, #0A0A14)',
    tone: 'var(--accent)'
  }, {
    name: 'Órbita SaaS',
    kind: 'Interface',
    cat: 'Interface',
    g: 'radial-gradient(120% 100% at 80% 0%, #18342E, #0A0A14)',
    tone: 'var(--aurora)'
  }, {
    name: 'Foil & Co',
    kind: 'Identidade',
    cat: 'Marca',
    g: 'radial-gradient(120% 100% at 50% 0%, #3A2E12, #0A0A14)',
    tone: 'var(--premium)'
  }, {
    name: 'Vega Store',
    kind: 'Landing',
    cat: 'Landing',
    g: 'radial-gradient(120% 100% at 30% 10%, #2C1A3A, #0A0A14)',
    tone: 'var(--accent)'
  }, {
    name: 'Pulsar App',
    kind: 'Interface',
    cat: 'Interface',
    g: 'radial-gradient(120% 100% at 70% 0%, #102A3A, #0A0A14)',
    tone: 'var(--aurora)'
  }, {
    name: 'Cometa',
    kind: 'Identidade',
    cat: 'Marca',
    g: 'radial-gradient(120% 100% at 40% 0%, #3A1220, #0A0A14)',
    tone: 'var(--fg-danger)'
  }];
  const shown = projects.filter(p => active === 'Tudo' || p.cat === active);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-page)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.FG_WRAP,
      padding: '88px 28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(window.Icon, {
    name: "Sparkles",
    size: 0
  }), /*#__PURE__*/React.createElement(FGb.Eyebrow, null, "Trabalhos selecionados"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(30px,4vw,46px)',
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      margin: '14px 0 0'
    }
  }, "Constela\xE7\xE3o de projetos.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, cats.map(c => /*#__PURE__*/React.createElement(FGb.Tag, {
    key: c,
    active: active === c,
    onClick: () => setActive(c),
    style: {
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      textTransform: 'none',
      letterSpacing: 0
    }
  }, c)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 18,
      marginTop: 40
    }
  }, shown.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    style: {
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      border: '1px solid var(--border-subtle)',
      cursor: 'pointer',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = '';
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fg-starfield",
    style: {
      height: 188,
      background: p.g,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 30,
      color: p.tone,
      opacity: 0.92,
      letterSpacing: '-0.02em'
    }
  }, p.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 18px',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: 15,
      color: 'var(--text-strong)'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)',
      marginTop: 3,
      letterSpacing: '0.04em'
    }
  }, p.kind.toUpperCase())), /*#__PURE__*/React.createElement(window.Icon, {
    name: "ArrowUpRight",
    size: 20,
    color: "var(--text-muted)"
  })))))));
}

/* ---------------- PRODUCTION STRIP ---------------- */
function Production() {
  const specs = ['CMYK 0/12/40/4', 'SANGRIA 3mm', '300 DPI', 'REGISTRO ✓', 'PANTONE 871C', 'OVERPRINT', 'FACA / VINCO', 'ICC PROFILE'];
  return /*#__PURE__*/React.createElement("section", {
    className: "fg-nebula-bg",
    style: {
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.FG_WRAP,
      padding: '64px 28px',
      display: 'grid',
      gridTemplateColumns: '1fr 1.1fr',
      gap: 48,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FGb.Eyebrow, {
    color: "var(--premium)"
  }, "Diferencial"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(26px,3vw,38px)',
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      margin: '14px 0 14px'
    }
  }, "Arte final que a gr\xE1fica agradece."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 16,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      margin: 0,
      maxWidth: 440
    }
  }, "Anos de produ\xE7\xE3o em impress\xE3o \u2014 eu falo a l\xEDngua da m\xE1quina. Cada arquivo sai com cor calibrada, sangria certa e encaixe conferido.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 10
    }
  }, specs.map(s => /*#__PURE__*/React.createElement(FGb.Tag, {
    key: s
  }, s)))));
}

/* ---------------- PROCESS ---------------- */
function Process() {
  const steps = [{
    n: '01',
    t: 'Briefing',
    d: 'Entendo objetivo, público e referências.'
  }, {
    n: '02',
    t: 'Design',
    d: 'Conceito, protótipo e iteração com você.'
  }, {
    n: '03',
    t: 'Build',
    d: 'Código limpo ou arte final pronta.'
  }, {
    n: '04',
    t: 'Entrega',
    d: 'Deploy, arquivos e prova de gráfica.'
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-section)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.FG_WRAP,
      padding: '88px 28px'
    }
  }, /*#__PURE__*/React.createElement(FGb.Eyebrow, null, "Como funciona"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(30px,4vw,46px)',
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)',
      margin: '14px 0 44px'
    }
  }, "Quatro \xF3rbitas at\xE9 o lan\xE7amento."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 18
    }
  }, steps.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.n,
    style: {
      padding: '24px 22px',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-subtle)',
      background: 'var(--surface-card)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--accent)',
      letterSpacing: '0.1em'
    }
  }, s.n), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 21,
      color: 'var(--text-strong)',
      margin: '14px 0 8px'
    }
  }, s.t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      lineHeight: 1.55,
      color: 'var(--text-muted)',
      margin: 0
    }
  }, s.d))))));
}
Object.assign(window, {
  Work,
  Production,
  Process
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fgdesigns-site/sections-b.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fgdesigns-site/sections-c.jsx
try { (() => {
// FG Designs — landing site sections (part 3: contact + footer) and App composition
const FGc = window.FGDesignsCosmosDesignSystem_29e3f7;

/* ---------------- CONTACT ---------------- */
function Contact({
  formRef
}) {
  const [sent, setSent] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const submit = e => {
    e.preventDefault();
    if (name && email) setSent(true);
  };
  return /*#__PURE__*/React.createElement("section", {
    ref: formRef,
    className: "fg-cosmos",
    style: {
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.FG_WRAP,
      padding: '96px 28px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FGc.Eyebrow, null, "Vamos conversar"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(34px,4.5vw,56px)',
      letterSpacing: '-0.03em',
      color: 'var(--text-strong)',
      margin: '16px 0 18px',
      lineHeight: 1.05
    }
  }, "Sua ideia merece", /*#__PURE__*/React.createElement("br", null), "o espa\xE7o todo."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 17,
      lineHeight: 1.6,
      color: 'var(--text-body)',
      margin: '0 0 28px',
      maxWidth: 420
    }
  }, "Conte o que precisa criar. Respondo em at\xE9 24h com pr\xF3ximos passos e um or\xE7amento honesto."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, [['Mail', 'contato@fgdesigns.com'], ['Instagram', '@fgdesigns._'], ['MapPin', 'Remoto · Brasil']].map(([ic, tx]) => /*#__PURE__*/React.createElement("div", {
    key: tx,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: ic,
    size: 18,
    color: "var(--accent)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 15
    }
  }, tx))))), /*#__PURE__*/React.createElement(FGc.Card, {
    variant: "glow",
    padding: "32px"
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '36px 8px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 64,
      height: 64,
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--accent-soft)',
      boxShadow: 'var(--glow-violet)'
    }
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: "Check",
    size: 30,
    color: "var(--accent)"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 26,
      color: 'var(--text-strong)',
      margin: '20px 0 8px'
    }
  }, "Recebido! \uD83D\uDEF0\uFE0F"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      color: 'var(--text-muted)',
      margin: 0
    }
  }, "Obrigado, ", name.split(' ')[0], ". Te respondo j\xE1 j\xE1."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(FGc.Button, {
    variant: "secondary",
    onClick: () => {
      setSent(false);
      setName('');
      setEmail('');
    }
  }, "Enviar outro"))) : /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(FGc.Input, {
    label: "Nome",
    placeholder: "Seu nome",
    value: name,
    onChange: e => setName(e.target.value)
  }), /*#__PURE__*/React.createElement(FGc.Input, {
    label: "E-mail",
    placeholder: "voce@email.com",
    value: email,
    onChange: e => setEmail(e.target.value)
  }), /*#__PURE__*/React.createElement(FGc.Textarea, {
    label: "Sobre o projeto",
    rows: 4,
    placeholder: "Tipo, prazo, refer\xEAncias\u2026"
  }), /*#__PURE__*/React.createElement(FGc.Button, {
    type: "submit",
    full: true,
    glow: true,
    iconRight: /*#__PURE__*/React.createElement(window.Icon, {
      name: "Send",
      size: 16
    })
  }, "Enviar mensagem")))));
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--surface-sunken)',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...window.FG_WRAP,
      padding: '40px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.FG_LOGO,
    alt: "FG",
    style: {
      height: 30
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      color: 'var(--text-muted)',
      letterSpacing: '0.04em'
    }
  }, "\xA9 2026 FG Designs \xB7 a vastid\xE3o da gal\xE1xia")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18
    }
  }, ['Instagram', 'Linkedin', 'Github', 'Dribbble'].map(s => /*#__PURE__*/React.createElement("a", {
    key: s,
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: 'var(--text-muted)',
      display: 'inline-flex',
      transition: 'color var(--dur-fast)'
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--accent)',
    onMouseLeave: e => e.currentTarget.style.color = 'var(--text-muted)'
  }, /*#__PURE__*/React.createElement(window.Icon, {
    name: s,
    size: 19
  }))))));
}

/* ---------------- APP ---------------- */
function App() {
  const formRef = React.useRef(null);
  const toContact = () => formRef.current && window.scrollTo({
    top: formRef.current.offsetTop - 40,
    behavior: 'smooth'
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "fg-root"
  }, /*#__PURE__*/React.createElement(window.Nav, {
    onContact: toContact
  }), /*#__PURE__*/React.createElement(window.Hero, {
    onContact: toContact
  }), /*#__PURE__*/React.createElement(window.Services, null), /*#__PURE__*/React.createElement(window.Work, null), /*#__PURE__*/React.createElement(window.Production, null), /*#__PURE__*/React.createElement(window.Process, null), /*#__PURE__*/React.createElement(Contact, {
    formRef: formRef
  }), /*#__PURE__*/React.createElement(Footer, null));
}
window.FGApp = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fgdesigns-site/sections-c.jsx", error: String((e && e.message) || e) }); }

__ds_ns.StarsBackground = __ds_scope.StarsBackground;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

})();
