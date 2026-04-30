// DRD Cluster Tool — direction D (editorial).
// Three-section single-page app: About → Assess → Result.
// Anchored on the logo's dark teal + four pastel cluster colours.

(function () {
  // -- Shared tokens (all reads from CSS custom properties so styles.css owns truth) --
  const css = (name, fallback) => {
    if (typeof window === 'undefined') return fallback;
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  };
  const T = {
    teal:   () => css('--drd-teal', '#143D3E'),
    cream:  () => css('--drd-cream', '#FCF7F1'),
    paper2: () => css('--drd-paper2', '#f3ede4'),
    ink:    () => css('--drd-ink', '#1c2626'),
    muted:  () => css('--drd-muted', '#6b7777'),
    rule:   () => css('--drd-rule', '#d8dcd6'),
  };
  const CLUSTER_FILL = { 1: '#B7C5B0', 2: '#F6B99A', 3: '#B8D3CE', 4: '#B8A9C9' };
  const CLUSTER_DEEP = { 1: '#5e7259', 2: '#c47953', 3: '#5b8580', 4: '#76618f' };
  const SHORT_NAME = {
    1: 'Low-risk signallers',
    2: 'Frustrated escalators',
    3: 'Impulsive escalators',
    4: 'Risky rapid escalators',
  };
  const SHORT_BLURB = {
    1: 'Vocal but rarely physical.',
    2: 'Predictable triggers, vocal escalation.',
    3: 'Quick to escalate, harder to read.',
    4: 'Cue-to-contact threshold is low.',
  };

  const SERIF = '"Instrument Serif", Georgia, serif';

  // -- Logo --
  function Logo({ size = 40, style = {} }) {
    return (
      <img src="logo.svg" width={size} height={size} alt="Dog Reactive Dogs"
           style={{ display: 'block', flexShrink: 0, ...style }} />
    );
  }

  // -- Header (shared across all three pages) --
  function Header({ page, ack, onNav }) {
    const teal = T.teal(), muted = T.muted(), rule = T.rule(), cream = T.cream();
    const tabs = ['About', 'Assess', 'Result'];
    const numerals = ['i', 'ii', 'iii'];
    const canGo = (i) => i === 0 || ack;

    return (
      <header style={{
        position: 'sticky', top: 0, zIndex: 5, background: cream,
        borderBottom: `1px solid ${rule}`, padding: '14px 40px',
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Logo size={36} />
          <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase', color: teal }}>
            Dog Reactive Dogs · Cluster Tool
          </div>
        </div>
        <nav style={{ display: 'flex', gap: 24, justifySelf: 'center' }}>
          {tabs.map((lbl, i) => (
            <button
              key={i}
              onClick={() => canGo(i) && onNav(i)}
              disabled={!canGo(i)}
              style={{
                border: 'none', background: 'transparent',
                cursor: canGo(i) ? 'pointer' : 'not-allowed',
                padding: '4px 0', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
                color: page === i ? teal : muted,
                opacity: canGo(i) ? (page === i ? 1 : 0.65) : 0.3,
                display: 'flex', alignItems: 'center', gap: 8,
                borderBottom: page === i ? `1px solid ${teal}` : '1px solid transparent',
              }}
            >
              <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 14 }}>{numerals[i]}</span>
              {lbl}
            </button>
          ))}
        </nav>
        <div style={{ justifySelf: 'end', fontSize: 11, color: muted, letterSpacing: 1.5 }}>
          9 BEHAVIOURS · ~3 MIN
        </div>
      </header>
    );
  }

  // -- Page 1 — About --
  function AboutPage({ ack, onAck, onBegin }) {
    const teal = T.teal(), cream = T.cream(), muted = T.muted(), rule = T.rule(), ink = T.ink();
    const c = window.DRD_COPY;

    return (
      <section style={{ paddingBottom: 120 }}>
        {/* Hero — two-column lockup */}
        <div style={{ padding: '80px 40px 56px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: muted, marginBottom: 18 }}>
                Step i · An owner-friendly screening tool
              </div>
              <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 64, lineHeight: 0.98, margin: '0 0 28px', letterSpacing: -0.9, color: teal }}>
                What kind of <em style={{ fontStyle: 'italic' }}>reactive dog</em> do you live with?
              </h1>
              <p style={{ fontSize: 17, lineHeight: 1.55, margin: '0 0 18px', maxWidth: 480 }}>
                {c.intro1}
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.5, margin: '0 0 32px', maxWidth: 480, color: muted }}>
                {c.intro2}
              </p>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', marginBottom: 20, maxWidth: 480 }}>
                <input
                  type="checkbox"
                  checked={ack}
                  onChange={(e) => onAck(e.target.checked)}
                  style={{ marginTop: 4, accentColor: teal }}
                />
                <span style={{ fontSize: 13, lineHeight: 1.5 }}>
                  I understand this is a screening tool, not a diagnosis.
                </span>
              </label>
              <button
                onClick={onBegin}
                disabled={!ack}
                style={{
                  padding: '14px 28px', border: 'none',
                  background: ack ? teal : '#aab1ad',
                  color: cream, fontSize: 14, letterSpacing: 0.3,
                  cursor: ack ? 'pointer' : 'not-allowed',
                }}
              >
                Begin assessment  →
              </button>
            </div>
            <div>
              <Logo size={360} style={{ margin: '0 auto' }} />
            </div>
          </div>
        </div>

        {/* The four clusters preview */}
        <div style={{ padding: '24px 40px 48px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ borderTop: `1px solid ${rule}`, paddingTop: 32 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, letterSpacing: -0.3, margin: 0, color: teal }}>
                The four clusters
              </h2>
              <span style={{ fontSize: 12, color: muted, letterSpacing: 1, textTransform: 'uppercase' }}>You'll be matched to one</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: rule, border: `1px solid ${rule}` }}>
              {[1,2,3,4].map((n) => (
                <div key={n} style={{ background: cream, padding: '24px 20px 28px', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: CLUSTER_FILL[n] }} />
                  <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 36, color: CLUSTER_DEEP[n], margin: '20px 0 6px', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.3, marginBottom: 8 }}>{SHORT_NAME[n]}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.45, color: muted }}>{SHORT_BLURB[n]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The research block — verbatim copy */}
        <div style={{ padding: '0 40px 80px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 32, marginTop: 32 }}>
            <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 26, letterSpacing: -0.3, margin: 0, color: teal }}>
              {c.researchHeading}
            </h3>
            <div style={{ fontSize: 15, lineHeight: 1.65 }}>
              <p style={{ margin: '0 0 14px' }}>
                <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: '1.05em' }}>
                  &lsquo;{c.researchDef.replace(/^For the purposes of this app, a DRD is defined as \u2018/, '').replace(/\u2019\.$/, '')}&rsquo;
                </span>
              </p>
              <ul style={{ paddingLeft: 20, margin: '0 0 14px' }}>
                {c.researchBullets.map((b, i) => (
                  <li key={i} style={{ marginBottom: 6 }}><strong>{b.bold}</strong> {b.text}</li>
                ))}
              </ul>
              {c.researchOuter.map((t, i) => (
                <p key={i} style={{ margin: '0 0 12px' }}>{t}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // -- Page 2 — Assess --
  function AssessPage({ input, setBeh, onBack, onNext }) {
    const teal = T.teal(), cream = T.cream(), muted = T.muted(), rule = T.rule(), ink = T.ink();
    const allBehaviours = Object.values(window.DRD_BEHAVIOUR_GROUPS).flatMap(g => g.keys);

    return (
      <section style={{ padding: '56px 40px 120px', maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: muted, marginBottom: 16 }}>
          Step ii
        </div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 40, lineHeight: 1.05, margin: '0 0 12px', letterSpacing: -0.5, color: teal }}>
          {window.DRD_COPY.formHeading}
        </h2>
        <p style={{ fontSize: 15, color: muted, margin: '0 0 32px', maxWidth: 540 }}>
          {window.DRD_COPY.formSub}
        </p>

        <div style={{ borderTop: `1px solid ${rule}` }}>
          {allBehaviours.map((k) => (
            <div key={k} style={{
              display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 20,
              padding: '16px 0', borderBottom: `1px solid ${rule}`,
            }}>
              <div style={{ fontSize: 15 }}>{window.DRD_BEHAVIOURS[k]}</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {[{v:0,l:'Never'},{v:1,l:'Sometimes'},{v:2,l:'Often'}].map((o) => {
                  const sel = input[k] === o.v;
                  return (
                    <button
                      key={o.v}
                      onClick={() => setBeh(k, o.v)}
                      style={{
                        border: `1px solid ${sel ? teal : rule}`,
                        background: sel ? teal : 'transparent',
                        color: sel ? cream : ink,
                        padding: '7px 14px', fontSize: 12,
                        cursor: 'pointer', minWidth: 80,
                      }}
                    >
                      {o.l}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
          <button onClick={onBack} style={{ padding: '14px 22px', border: `1px solid ${rule}`, background: 'transparent', color: teal, fontSize: 14, cursor: 'pointer' }}>← Back</button>
          <button onClick={onNext} style={{ padding: '14px 28px', border: 'none', background: teal, color: cream, fontSize: 14, cursor: 'pointer' }}>See result  →</button>
        </div>
      </section>
    );
  }

  // -- Page 3 — Result --
  function ResultPage({ input, result, onRevise, onRestart }) {
    const teal = T.teal(), cream = T.cream(), muted = T.muted(), rule = T.rule(), ink = T.ink(), paper2 = T.paper2();
    const fill = CLUSTER_FILL[result.cluster];
    const deep = CLUSTER_DEEP[result.cluster];
    const c = window.DRD_COPY.clusters[result.cluster];
    const headingNoPrefix = c.heading.replace(/^Cluster \d+: /, '');

    const groupScore = (keys) => keys.reduce((s, k) => s + input[k], 0) / (keys.length * 2);

    return (
      <section style={{ padding: '56px 40px 96px', maxWidth: 1100, margin: '0 auto' }}>
        {/* Eyebrow + heading */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: fill, border: `1px solid ${deep}` }} />
          <span style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: muted }}>
            Your result · Cluster {result.cluster}
          </span>
        </div>
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 60, lineHeight: 1.0, margin: '0 0 8px', letterSpacing: -0.8, color: teal }}>
          <em style={{ fontStyle: 'italic', position: 'relative', display: 'inline-block' }}>
            {headingNoPrefix}.
            <span style={{ position: 'absolute', left: 0, right: 0, bottom: -2, height: 8, background: fill, zIndex: -1, opacity: 0.85 }} />
          </em>
        </h1>

        {/* Cluster strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: rule, border: `1px solid ${rule}`, marginTop: 40, marginBottom: 48 }}>
          {[1,2,3,4].map((n) => {
            const isActive = n === result.cluster;
            return (
              <div key={n} style={{
                background: isActive ? CLUSTER_FILL[n] : cream,
                padding: '20px 20px 24px',
                position: 'relative',
                opacity: isActive ? 1 : 0.7,
                transition: 'all .25s',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: CLUSTER_FILL[n] }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, marginBottom: 6 }}>
                  <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 28, color: CLUSTER_DEEP[n], lineHeight: 1 }}>{n}</span>
                  {isActive && <span style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: deep, fontWeight: 600 }}>Your dog</span>}
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.3, marginBottom: 6, color: ink }}>{SHORT_NAME[n]}</div>
                <div style={{ fontSize: 12, lineHeight: 1.45, color: isActive ? ink : muted }}>{SHORT_BLURB[n]}</div>
              </div>
            );
          })}
        </div>

        {/* Two-column body: profile/focus + sidebar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 56 }}>
          <div>
            {/* Profile + focus */}
            <div style={{ background: cream, border: `1px solid ${rule}`, borderTop: `4px solid ${fill}`, padding: '28px 32px', marginBottom: 32 }}>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, letterSpacing: -0.3, margin: '0 0 16px', color: teal }}>About this cluster</h2>
              <p style={{ fontSize: 15, lineHeight: 1.6, margin: '0 0 14px' }}><strong>Profile:</strong> {c.profile}</p>
              <p style={{ fontSize: 15, lineHeight: 1.6, margin: 0 }}><strong>Focus:</strong> {c.focus}</p>
            </div>

            {/* Behaviour readout */}
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 26, letterSpacing: -0.3, margin: '0 0 18px', color: teal }}>What you reported</h2>
            <div style={{ borderTop: `1px solid ${rule}` }}>
              {Object.entries(window.DRD_BEHAVIOUR_GROUPS).map(([gk, group]) => {
                const pct = groupScore(group.keys);
                return (
                  <div key={gk} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 50px', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: `1px solid ${rule}` }}>
                    <div style={{ fontSize: 14 }}>{group.label}</div>
                    <div style={{ height: 6, background: paper2, position: 'relative' }}>
                      <div style={{ position: 'absolute', inset: 0, width: `${pct * 100}%`, background: deep, transition: 'width .5s' }} />
                    </div>
                    <div style={{ fontSize: 12, color: muted, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{Math.round(pct * 100)}%</div>
                  </div>
                );
              })}
            </div>

            {/* All four clusters expanded for context */}
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 26, letterSpacing: -0.3, margin: '40px 0 18px', color: teal }}>The full picture</h2>
            {[1,2,3,4].map((n) => {
              const cl = window.DRD_COPY.clusters[n];
              const isActive = n === result.cluster;
              return (
                <div key={n} style={{
                  borderLeft: `3px solid ${CLUSTER_FILL[n]}`,
                  padding: isActive ? '18px 24px' : '14px 24px',
                  background: isActive ? `${CLUSTER_FILL[n]}33` : 'transparent',
                  marginBottom: 8,
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4 }}>
                    <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 20, color: CLUSTER_DEEP[n] }}>Cluster {n}</span>
                    <span style={{ fontSize: 15, fontWeight: 500, color: ink }}>{cl.heading.replace(/^Cluster \d+: /, '')}</span>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.55, color: isActive ? ink : muted, margin: 0 }}>{cl.profile}</p>
                </div>
              );
            })}
          </div>

          {/* Sidebar — risk management */}
          <aside style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
            <div style={{ background: cream, border: `1px solid ${rule}`, padding: 24 }}>
              <window.DRDKit.UnderstandingBlock
                ink={ink} muted={muted} accent={teal} serifFamily={SERIF} compact
              />
            </div>
          </aside>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 48, display: 'flex', gap: 12 }}>
          <button onClick={onRevise} style={{ padding: '14px 22px', border: `1px solid ${rule}`, background: 'transparent', color: teal, fontSize: 14, cursor: 'pointer' }}>← Revise answers</button>
          <button onClick={onRestart} style={{ padding: '14px 22px', border: 'none', background: 'transparent', color: muted, fontSize: 14, cursor: 'pointer', textDecoration: 'underline' }}>Start over</button>
        </div>
      </section>
    );
  }

  // -- Root --
  function App() {
    const [page, setPage] = React.useState(0);
    const [ack, setAck] = React.useState(false);
    const [input, setInput] = React.useState(window.drdEmptyInput());
    const result = window.drdCalculate(input);

    const setBeh = (k, v) => setInput({ ...input, [k]: v });

    return (
      <div style={{ width: '100%', minHeight: '100%' }}>
        <Header page={page} ack={ack} onNav={(i) => { if (i === 0 || ack) setPage(i); }} />
        {page === 0 && <AboutPage ack={ack} onAck={setAck} onBegin={() => ack && setPage(1)} />}
        {page === 1 && <AssessPage input={input} setBeh={setBeh} onBack={() => setPage(0)} onNext={() => setPage(2)} />}
        {page === 2 && <ResultPage
          input={input}
          result={result}
          onRevise={() => setPage(1)}
          onRestart={() => { setInput(window.drdEmptyInput()); setAck(false); setPage(0); }}
        />}
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
})();
