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
      <header className="drd-header" style={{ background: cream, borderBottom: `1px solid ${rule}` }}>
        <div className="drd-header__brand">
          <Logo size={36} />
          <div className="drd-header__brandline" style={{ color: teal }}>
            Dog Reactive Dogs · Cluster Tool
          </div>
        </div>
        <nav className="drd-header__nav">
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
        <div className="drd-header__meta" style={{ color: muted }}>
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
      <section className="drd-about">
        {/* Hero — two-column lockup */}
        <div className="drd-about__hero-wrap">
          <div className="drd-about__hero">
            <div>
              <div className="drd-eyebrow" style={{ color: muted }}>
                Step i · An owner-friendly screening tool
              </div>
              <h1 className="drd-about__h1" style={{ fontFamily: SERIF, color: teal }}>
                What kind of <em style={{ fontStyle: 'italic' }}>reactive dog</em> do you live with?
              </h1>
              <p style={{ fontSize: 17, lineHeight: 1.55, margin: '0 0 18px', maxWidth: 480 }}>
                {(() => {
                  const [before, after] = c.intro1.split('Dr Himara Van Haevermaet');
                  return <>{before}<a href="https://behaviour.services/" target="_blank" rel="noopener">Dr Himara Van Haevermaet</a>{after}</>;
                })()}
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
            <div className="drd-about__hero-art">
              <Logo size={360} style={{ margin: '0 auto', maxWidth: '100%', height: 'auto' }} />
            </div>
          </div>
        </div>

        {/* The four clusters preview */}
        <div className="drd-about__clusters-wrap">
          <div style={{ borderTop: `1px solid ${rule}`, paddingTop: 32 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, letterSpacing: -0.3, margin: 0, color: teal }}>
                The four clusters
              </h2>
              <span style={{ fontSize: 12, color: muted, letterSpacing: 1, textTransform: 'uppercase' }}>You'll be matched to one</span>
            </div>
            <div className="drd-cluster-grid" style={{ background: rule, border: `1px solid ${rule}` }}>
              {[1,2,3,4].map((n) => (
                <div key={n} className="drd-cluster-grid__card" style={{ background: cream }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: CLUSTER_FILL[n] }} />
                  <div style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 36, color: CLUSTER_DEEP[n], margin: '20px 0 6px', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.3, marginBottom: 8 }}>{SHORT_NAME[n]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The research block — verbatim copy */}
        <div className="drd-about__research-wrap">
          <div className="drd-about__research">
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
      <section className="drd-assess">
        <div className="drd-eyebrow" style={{ color: muted }}>
          Step ii
        </div>
        <h2 className="drd-assess__h2" style={{ fontFamily: SERIF, color: teal }}>
          {window.DRD_COPY.formHeading}
        </h2>
        <p style={{ fontSize: 15, color: muted, margin: '0 0 32px', maxWidth: 540 }}>
          {window.DRD_COPY.formSub}
        </p>

        <div className="drd-assess__list" style={{ borderTop: `1px solid ${rule}` }}>
          {allBehaviours.map((k) => (
            <div key={k} className="drd-assess__row" style={{ borderBottom: `1px solid ${rule}` }}>
              <div className="drd-assess__label">{window.DRD_BEHAVIOURS[k]}</div>
              <div className="drd-assess__segs">
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
  function ResultPage({ result, onRevise, onRestart }) {
    const teal = T.teal(), cream = T.cream(), muted = T.muted(), rule = T.rule(), ink = T.ink();
    const fill = CLUSTER_FILL[result.cluster];
    const deep = CLUSTER_DEEP[result.cluster];
    const c = window.DRD_COPY.clusters[result.cluster];
    const headingNoPrefix = c.heading.replace(/^Cluster \d+: /, '');

    return (
      <section className="drd-result">
        {/* Eyebrow + heading */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: fill, border: `1px solid ${deep}` }} />
          <span style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: muted }}>
            Your result · Cluster {result.cluster}
          </span>
        </div>
        <h1 className="drd-result__h1" style={{ fontFamily: SERIF, color: teal }}>
          <em style={{ fontStyle: 'italic', position: 'relative', display: 'inline-block' }}>
            {headingNoPrefix}.
            <span style={{ position: 'absolute', left: 0, right: 0, bottom: -2, height: 8, background: fill, zIndex: -1, opacity: 0.85 }} />
          </em>
        </h1>

        {/* Cluster strip */}
        <div className="drd-cluster-grid drd-cluster-grid--result" style={{ background: rule, border: `1px solid ${rule}` }}>
          {[1,2,3,4].map((n) => {
            const isActive = n === result.cluster;
            return (
              <div key={n} className="drd-cluster-grid__card" style={{
                background: isActive ? CLUSTER_FILL[n] : cream,
                opacity: isActive ? 1 : 0.7,
                transition: 'all .25s',
              }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: CLUSTER_FILL[n] }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, marginBottom: 6 }}>
                  <span style={{ fontFamily: SERIF, fontStyle: 'italic', fontSize: 28, color: CLUSTER_DEEP[n], lineHeight: 1 }}>{n}</span>
                  {isActive && <span style={{ fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: deep, fontWeight: 600 }}>Your dog</span>}
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.3, marginBottom: 6, color: ink }}>{SHORT_NAME[n]}</div>
              </div>
            );
          })}
        </div>

        {/* Two-column body: profile/focus + sidebar */}
        <div className="drd-result__split">
          <div>
            {/* Profile + focus */}
            <div className="drd-result__profile" style={{ background: cream, border: `1px solid ${rule}`, borderTop: `4px solid ${fill}` }}>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, letterSpacing: -0.3, margin: '0 0 16px', color: teal }}>About this cluster</h2>
              <p style={{ fontSize: 15, lineHeight: 1.6, margin: '0 0 14px' }}><strong>Profile:</strong> {c.profile}</p>
              <p style={{ fontSize: 15, lineHeight: 1.6, margin: 0 }}><strong>Focus:</strong> {c.focus}</p>
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
          <aside className="drd-result__aside">
            <div className="drd-result__aside-card" style={{ background: cream, border: `1px solid ${rule}` }}>
              <window.DRDKit.UnderstandingBlock
                ink={ink} muted={muted} accent={teal} serifFamily={SERIF} compact
              />
            </div>
          </aside>
        </div>

        {/* Footer */}
        <div className="drd-result__footer">
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
          result={result}
          onRevise={() => setPage(1)}
          onRestart={() => { setInput(window.drdEmptyInput()); setAck(false); setPage(0); }}
        />}
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
})();
