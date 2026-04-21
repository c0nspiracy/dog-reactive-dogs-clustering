// Shared editorial kit for DRD iterations.
// Reusable atoms so the five editorial variants can diverge on layout/type
// without restating the dog mark, severity dots, progress, etc.

window.DRDKit = {};

// Abstract circle dog mark — variations get props for size/palette.
window.DRDKit.Mark = function ({ size = 32, accent = 'var(--drd-accent, #b87333)', paper = '#fff', ears = true, style = {} }) {
  const s = size;
  return (
    <div style={{ position: 'relative', width: s, height: s, ...style }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: accent }} />
      {ears && <>
        <div style={{ position: 'absolute', top: -s * 0.15, left: s * 0.05, width: s * 0.3, height: s * 0.38, borderRadius: `${s * 0.18}px ${s * 0.18}px ${s * 0.04}px ${s * 0.18}px`, background: accent, transform: 'rotate(-22deg)' }} />
        <div style={{ position: 'absolute', top: -s * 0.15, right: s * 0.05, width: s * 0.3, height: s * 0.38, borderRadius: `${s * 0.18}px ${s * 0.18}px ${s * 0.18}px ${s * 0.04}px`, background: accent, transform: 'rotate(22deg)' }} />
      </>}
      <div style={{ position: 'absolute', top: s * 0.36, left: s * 0.26, width: s * 0.12, height: s * 0.12, borderRadius: '50%', background: paper }} />
      <div style={{ position: 'absolute', top: s * 0.36, right: s * 0.26, width: s * 0.12, height: s * 0.12, borderRadius: '50%', background: paper }} />
      <div style={{ position: 'absolute', bottom: s * 0.18, left: '50%', transform: 'translateX(-50%)', width: s * 0.22, height: s * 0.11, borderRadius: s * 0.06, background: paper }} />
    </div>
  );
};

window.DRDKit.SeverityDots = function ({ level, accent = 'var(--drd-accent, #b87333)', muted = 'oklch(0.88 0.008 70)', size = 7, gap = 4 }) {
  return (
    <div style={{ display: 'flex', gap }}>
      {[1,2,3,4].map((i) => (
        <div key={i} style={{ width: size, height: size, borderRadius: size, background: i <= level ? accent : muted, transition: 'background .25s' }} />
      ))}
    </div>
  );
};

// Render repo-verbatim "research" block (shared across variants).
window.DRDKit.ResearchBlock = function ({ ink, muted, accent, serifFamily }) {
  const c = window.DRD_COPY;
  const italic = { fontFamily: serifFamily, fontStyle: 'italic', fontSize: '1.05em' };
  return (
    <div>
      <h2 style={{ fontFamily: serifFamily, fontWeight: 400, fontSize: 26, letterSpacing: -0.3, margin: '32px 0 14px', color: ink }}>
        {c.researchHeading}
      </h2>
      <ul style={{ paddingLeft: 20, lineHeight: 1.6, fontSize: 15, color: ink, margin: 0 }}>
        <li style={{ marginBottom: 12 }}>
          For the purposes of this app, a DRD is defined as <span style={italic}>&lsquo;A dog showing <strong>one or more</strong> of the following behaviours towards another dog: barking, growling, snarling, lunging, snapping, nipping, biting, whining, or stiff posture with raised hackles and staring&rsquo;.</span>
          <ul style={{ paddingLeft: 20, marginTop: 10 }}>
            {c.researchBullets.map((b, i) => (
              <li key={i} style={{ marginBottom: 6 }}><strong>{b.bold}</strong> {b.text}</li>
            ))}
          </ul>
        </li>
        {c.researchOuter.map((t, i) => (
          <li key={i} style={{ marginBottom: 12 }}>{t}</li>
        ))}
      </ul>
    </div>
  );
};

// Risk management + guidance lists (repo-verbatim).
window.DRDKit.UnderstandingBlock = function ({ ink, muted, accent, serifFamily, compact = false }) {
  const c = window.DRD_COPY;
  return (
    <div>
      <h2 style={{ fontFamily: serifFamily, fontWeight: 400, fontSize: compact ? 22 : 26, letterSpacing: -0.3, margin: '0 0 14px', color: ink }}>
        {c.understandingHeading}
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: ink, margin: '0 0 14px' }}>{c.understandingLead}</p>
      <ul style={{ paddingLeft: 20, fontSize: 15, lineHeight: 1.6, color: ink, margin: '0 0 20px' }}>
        {c.riskBullets.map((b, i) => (
          <li key={i} style={{ marginBottom: 8 }}>
            <strong>{b.bold}</strong> {b.text.includes('The Muzzle Movement website')
              ? <>The muzzle should be introduced positively and allow panting, drinking, eating, and vomiting. Welfare-friendly muzzles and fitting advice can be found on <a href="https://themuzzlemovement.com/" style={{ color: accent }}>The Muzzle Movement website</a></>
              : b.text}
          </li>
        ))}
      </ul>
      <h2 style={{ fontFamily: serifFamily, fontWeight: 400, fontSize: compact ? 20 : 24, letterSpacing: -0.3, margin: '24px 0 14px', color: ink }}>
        {c.guidanceHeading}
      </h2>
      <ul style={{ paddingLeft: 20, fontSize: 15, lineHeight: 1.6, color: ink, margin: 0 }}>
        {c.guidanceBullets.map((b, i) => (
          <li key={i} style={{ marginBottom: 8 }}><strong>{b.bold}</strong> {b.text}</li>
        ))}
      </ul>
    </div>
  );
};

// Render all four clusters with one highlighted.
window.DRDKit.ClusterPanels = function ({ activeCluster, ink, muted, accent, rule, serifFamily, paper }) {
  const c = window.DRD_COPY.clusters;
  return (
    <div>
      {[1, 2, 3, 4].map((i) => {
        const d = c[i];
        const active = i === activeCluster;
        return (
          <div key={i} style={{
            padding: active ? '24px 28px' : '18px 28px',
            borderLeft: `3px solid ${active ? accent : rule}`,
            background: active ? 'color-mix(in oklch, ' + accent + ' 7%, transparent)' : 'transparent',
            marginBottom: 10,
            transition: 'all .25s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <window.DRDKit.SeverityDots level={i} accent={active ? accent : muted} muted={rule} size={6} />
              {active && <span style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: accent, fontWeight: 600 }}>Your dog</span>}
            </div>
            <h3 style={{ fontFamily: serifFamily, fontWeight: 400, fontSize: active ? 26 : 20, lineHeight: 1.15, letterSpacing: -0.3, margin: '0 0 10px', color: ink }}>{d.heading}</h3>
            {active && <>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: ink, margin: '0 0 10px' }}><strong>Profile:</strong> {d.profile}</p>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: ink, margin: 0 }}><strong>Focus:</strong> {d.focus}</p>
            </>}
            {!active && <p style={{ fontSize: 13, lineHeight: 1.55, color: muted, margin: 0 }}>{d.profile}</p>}
          </div>
        );
      })}
    </div>
  );
};

// Group readouts (behaviour bar chart)
window.DRDKit.GroupReadout = function ({ input, ink, muted, rule }) {
  const groupScore = (keys) => keys.reduce((s, k) => s + input[k], 0) / (keys.length * 2);
  return (
    <div>
      {Object.entries(window.DRD_BEHAVIOUR_GROUPS).map(([gk, group]) => {
        const pct = groupScore(group.keys);
        return (
          <div key={gk} style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ fontSize: 13, color: ink }}>{group.label}</div>
              <div style={{ fontSize: 12, color: muted, fontVariantNumeric: 'tabular-nums' }}>{Math.round(pct * 100)}%</div>
            </div>
            <div style={{ height: 3, background: rule, position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, height: 3, width: `${pct * 100}%`, background: ink, transition: 'width .5s' }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
