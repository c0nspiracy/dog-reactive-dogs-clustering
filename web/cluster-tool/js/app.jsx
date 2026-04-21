// DRD Cluster Tool — 01b
// Single-page React app. Three sections: About → Assess → Result.

function App() {
  const [page, setPage] = React.useState(0);
  const [ack, setAck] = React.useState(false);
  const [input, setInput] = React.useState(window.drdEmptyInput());
  const result = window.drdCalculate(input);

  const serif = '"Instrument Serif", Georgia, serif';
  const ink = 'oklch(0.22 0.012 60)';
  const paper = 'oklch(0.975 0.008 80)';
  const card = '#fff';
  const muted = 'oklch(0.55 0.01 60)';
  const rule = 'oklch(0.88 0.01 70)';
  const accent = 'var(--drd-accent)';

  const setBeh = (k, v) => setInput({ ...input, [k]: v });
  const canGoTo = (i) => i === 0 || ack;

  // All nine behaviours as a single ordered list (no category headings)
  const allBehaviours = Object.values(window.DRD_BEHAVIOUR_GROUPS).flatMap(g => g.keys);

  return (
    <div style={{ width: '100%', minHeight: '100%', background: paper, color: ink }}>
      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 5, background: paper,
        borderBottom: `1px solid ${rule}`, padding: '18px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <DogMark size={30} color={accent} />
          <div style={{ fontSize: 13, letterSpacing: 0.2 }}>DRD Cluster Tool</div>
        </div>
        <nav style={{ display: 'flex', gap: 28 }}>
          {['01 · About', '02 · Assess', '03 · Result'].map((lbl, i) => (
            <button
              key={i}
              onClick={() => canGoTo(i) && setPage(i)}
              style={{
                border: 'none', background: 'transparent',
                cursor: canGoTo(i) ? 'pointer' : 'not-allowed',
                padding: '4px 0', fontSize: 12, letterSpacing: 1.5, textTransform: 'uppercase',
                color: page === i ? ink : muted,
                opacity: canGoTo(i) ? 1 : 0.35,
                borderBottom: page === i ? `1px solid ${ink}` : '1px solid transparent',
              }}
            >
              {lbl}
            </button>
          ))}
        </nav>
      </header>

      {/* Page 1 — About */}
      {page === 0 && (
        <section style={{ padding: '64px 48px 96px', maxWidth: 680, margin: '0 auto' }}>
          <DogMark size={96} color={accent} style={{ marginBottom: 28 }} />
          <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: 46, lineHeight: 1.05, margin: '0 0 28px', letterSpacing: -0.5 }}>
            {window.DRD_COPY.pageTitle}
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.65, margin: '0 0 18px' }}>{window.DRD_COPY.intro1}</p>
          <p style={{ fontSize: 16, lineHeight: 1.65, margin: '0 0 32px' }}>{window.DRD_COPY.intro2}</p>
          <window.DRDKit.ResearchBlock ink={ink} muted={muted} accent={accent} serifFamily={serif} />
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer', marginTop: 40, marginBottom: 20 }}>
            <input
              type="checkbox"
              checked={ack}
              onChange={(e) => setAck(e.target.checked)}
              style={{ marginTop: 4, accentColor: ink }}
            />
            <span style={{ fontSize: 14, lineHeight: 1.5 }}>
              I understand this is a screening tool, not a diagnosis.
            </span>
          </label>
          <button
            onClick={() => ack && setPage(1)}
            disabled={!ack}
            style={{
              padding: '14px 28px', border: 'none',
              background: ack ? ink : 'oklch(0.85 0.01 70)',
              color: paper, fontSize: 14, letterSpacing: 0.3,
              cursor: ack ? 'pointer' : 'not-allowed',
            }}
          >
            Begin assessment  →
          </button>
        </section>
      )}

      {/* Page 2 — Assess (single unified list) */}
      {page === 1 && (
        <section style={{ padding: '56px 48px 120px', maxWidth: 680, margin: '0 auto' }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: muted, marginBottom: 16 }}>Step 02</div>
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 32, lineHeight: 1.1, margin: '0 0 10px', letterSpacing: -0.3 }}>
            {window.DRD_COPY.formHeading}
          </h2>
          <p style={{ fontSize: 15, color: muted, margin: '0 0 32px' }}>{window.DRD_COPY.formSub}</p>
          <div style={{ borderTop: `1px solid ${rule}` }}>
            {allBehaviours.map((k) => (
              <div
                key={k}
                style={{
                  display: 'grid', gridTemplateColumns: '1fr auto',
                  alignItems: 'center', gap: 20,
                  padding: '16px 0', borderBottom: `1px solid ${rule}`,
                }}
              >
                <div style={{ fontSize: 15 }}>{window.DRD_BEHAVIOURS[k]}</div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[{v:0,l:'Never'},{v:1,l:'Sometimes'},{v:2,l:'Often'}].map((o) => (
                    <button
                      key={o.v}
                      onClick={() => setBeh(k, o.v)}
                      style={{
                        border: `1px solid ${input[k] === o.v ? ink : rule}`,
                        background: input[k] === o.v ? ink : 'transparent',
                        color: input[k] === o.v ? paper : ink,
                        padding: '7px 14px', fontSize: 12,
                        cursor: 'pointer', minWidth: 80,
                      }}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 32 }}>
            <button onClick={() => setPage(0)} style={{ padding: '14px 22px', border: `1px solid ${rule}`, background: 'transparent', color: ink, fontSize: 14, cursor: 'pointer' }}>← Back</button>
            <button onClick={() => setPage(2)} style={{ padding: '14px 28px', border: 'none', background: ink, color: paper, fontSize: 14, cursor: 'pointer' }}>See result  →</button>
          </div>
        </section>
      )}

      {/* Page 3 — Result (split-view with sticky sidebar) */}
      {page === 2 && (
        <section style={{ padding: '56px 40px 120px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 56, maxWidth: 1000, margin: '0 auto' }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: muted, marginBottom: 14 }}>
                Your result · Cluster {result.cluster}
              </div>
              <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 44, lineHeight: 1.02, margin: '0 0 28px', letterSpacing: -0.7 }}>
                <em style={{ color: accent }}>
                  {window.DRD_COPY.clusters[result.cluster].heading.replace(/^Cluster \d+: /, '')}.
                </em>
              </h2>
              <window.DRDKit.GroupReadout input={input} ink={ink} muted={muted} rule={rule} />
              <div style={{ height: 32 }} />
              <window.DRDKit.ClusterPanels
                activeCluster={result.cluster}
                ink={ink} muted={muted} accent={accent} rule={rule}
                serifFamily={serif} paper={paper}
              />
            </div>
            <aside style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
              <div style={{ background: card, border: `1px solid ${rule}`, padding: 24 }}>
                <window.DRDKit.UnderstandingBlock
                  ink={ink} muted={muted} accent={accent} serifFamily={serif} compact
                />
              </div>
            </aside>
          </div>
          <div style={{ maxWidth: 720, margin: '40px auto 0', display: 'flex', gap: 12 }}>
            <button onClick={() => setPage(1)} style={{ padding: '14px 22px', border: `1px solid ${rule}`, background: 'transparent', color: ink, fontSize: 14, cursor: 'pointer' }}>← Revise answers</button>
            <button
              onClick={() => { setInput(window.drdEmptyInput()); setPage(0); setAck(false); }}
              style={{ padding: '14px 22px', border: 'none', background: 'transparent', color: muted, fontSize: 14, cursor: 'pointer', textDecoration: 'underline' }}
            >
              Start over
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

// Simple abstract dog mark — round face, two ears, two eyes, snout.
// REPLACE with your own SVG / logo asset when ready.
function DogMark({ size = 32, color = '#b87333', style = {} }) {
  const s = size;
  return (
    <div style={{ position: 'relative', width: s, height: s, flexShrink: 0, ...style }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: color }} />
      <div style={{ position: 'absolute', top: -s * 0.15, left: s * 0.05, width: s * 0.3, height: s * 0.38, borderRadius: `${s * 0.18}px ${s * 0.18}px ${s * 0.04}px ${s * 0.18}px`, background: color, transform: 'rotate(-22deg)' }} />
      <div style={{ position: 'absolute', top: -s * 0.15, right: s * 0.05, width: s * 0.3, height: s * 0.38, borderRadius: `${s * 0.18}px ${s * 0.18}px ${s * 0.18}px ${s * 0.04}px`, background: color, transform: 'rotate(22deg)' }} />
      <div style={{ position: 'absolute', top: s * 0.36, left: s * 0.26, width: s * 0.12, height: s * 0.12, borderRadius: '50%', background: '#fff' }} />
      <div style={{ position: 'absolute', top: s * 0.36, right: s * 0.26, width: s * 0.12, height: s * 0.12, borderRadius: '50%', background: '#fff' }} />
      <div style={{ position: 'absolute', bottom: s * 0.18, left: '50%', transform: 'translateX(-50%)', width: s * 0.22, height: s * 0.11, borderRadius: s * 0.06, background: '#fff' }} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
