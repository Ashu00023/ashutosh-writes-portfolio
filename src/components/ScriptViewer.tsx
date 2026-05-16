import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

interface Meta {
  label: string;
  value: string;
}

interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
  metaTable: Meta[];
  children: ReactNode;
}

const ScriptViewer = ({ eyebrow, title, subtitle, metaTable, children }: Props) => {
  return (
    <>
      <style>{`
        .script-doc { --ink:#0f0e0d; --paper:#f5f0e8; --paper-2:#ebe5d8; --accent:#b8362a; --mid:#5e574d; --rule:#cdc5b3;
          background: var(--paper); color: var(--ink); font-family: 'Inter', system-ui, sans-serif; line-height:1.78; font-size:17px; min-height:100vh; }
        .script-doc .doc-nav { position:sticky; top:0; z-index:20; background:#0f0e0d; color:#cdc5b3; padding:11px 24px; display:flex; justify-content:space-between; align-items:center;
          font-family:'JetBrains Mono', ui-monospace, monospace; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; }
        .script-doc .doc-nav a { color:#c94b2a; text-decoration:none; display:inline-flex; align-items:center; gap:8px; }
        .script-doc .doc-nav a:hover { color:#fff; }
        .script-doc .doc-confidential { background:var(--paper-2); color:var(--mid); padding:9px 24px; text-align:center; font-family:'JetBrains Mono',ui-monospace,monospace; font-size:9.5px; letter-spacing:0.32em; text-transform:uppercase; border-bottom:1px solid var(--rule); }
        .script-doc .doc-page { max-width:840px; margin:0 auto; padding:64px 32px 96px; }
        .script-doc .doc-eyebrow { font-family:'JetBrains Mono',ui-monospace,monospace; font-size:11px; letter-spacing:0.32em; text-transform:uppercase; color:var(--accent); display:flex; align-items:center; gap:14px; margin-bottom:24px; }
        .script-doc .doc-eyebrow::before, .script-doc .doc-eyebrow::after { content:''; flex:1; height:1px; background:var(--rule); max-width:80px; }
        .script-doc h1.doc-title { font-family:'Playfair Display', Georgia, serif; font-size:clamp(32px,5vw,52px); font-weight:900; line-height:1.05; letter-spacing:-0.02em; text-align:center; margin-bottom:16px; }
        .script-doc .doc-subtitle { text-align:center; font-style:italic; color:var(--mid); font-size:1rem; margin-bottom:48px; }
        .script-doc .doc-meta { width:100%; border-collapse:collapse; margin:0 0 56px; border-top:1px solid var(--ink); border-bottom:1px solid var(--ink); }
        .script-doc .doc-meta tr { border-bottom:1px solid var(--rule); }
        .script-doc .doc-meta tr:last-child { border-bottom:none; }
        .script-doc .doc-meta td { padding:11px 16px; vertical-align:top; }
        .script-doc .doc-meta td:first-child { font-family:'JetBrains Mono',ui-monospace,monospace; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:var(--mid); width:35%; }
        .script-doc .doc-meta td:last-child { font-weight:600; color:var(--ink); }
        .script-doc h2 { font-family:'Playfair Display',serif; font-size:clamp(22px,3vw,30px); font-weight:700; margin:64px 0 18px; padding-bottom:14px; border-bottom:2px solid var(--ink); letter-spacing:-0.01em; }
        .script-doc h3 { font-family:'JetBrains Mono',ui-monospace,monospace; font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:var(--accent); margin:48px 0 18px; padding-bottom:10px; border-bottom:1px solid var(--rule); }
        .script-doc p { margin-bottom:1.4em; }
        .script-doc .timecode { display:inline-block; font-family:'JetBrains Mono',ui-monospace,monospace; font-size:10px; letter-spacing:0.14em; padding:3px 9px; background:var(--ink); color:var(--paper); margin-right:10px; vertical-align:middle; }
        .script-doc .humor-beat { background:#fff7ec; border-left:3px solid #c98b2a; padding:14px 18px; margin:1.4em 0; font-style:italic; color:#7a5418; }
        .script-doc .humor-beat strong { color:#7a5418; font-style:normal; font-family:'JetBrains Mono',ui-monospace,monospace; font-size:9px; letter-spacing:0.18em; text-transform:uppercase; display:block; margin-bottom:6px; }
        .script-doc .pattern-interrupt { background:var(--ink); color:var(--paper); padding:18px 22px; margin:1.6em 0; font-family:'JetBrains Mono',ui-monospace,monospace; font-size:0.85rem; letter-spacing:0.04em; line-height:1.6; }
        .script-doc .pattern-interrupt em { color:#e88a4a; font-style:italic; }
        .script-doc .transition { font-family:'JetBrains Mono',ui-monospace,monospace; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:var(--mid); border-top:1px solid var(--rule); border-bottom:1px solid var(--rule); padding:14px 0; margin:2.2em 0; text-align:center; }
        .script-doc blockquote { margin:2em 0; padding:18px 24px; border-left:4px solid var(--accent); background:#fff; font-style:italic; color:var(--ink); font-size:1.05rem; }
        .script-doc strong { color:var(--ink); font-weight:700; }
        .script-doc .stat-line { display:block; font-family:'Playfair Display',serif; font-size:1.4rem; font-weight:700; text-align:center; margin:1.2em 0; color:var(--accent); }
        .script-doc .doc-table { width:100%; border-collapse:collapse; margin:1.5em 0; font-size:0.9rem; background:#fff; border:1px solid var(--rule); }
        .script-doc .doc-table th { background:var(--ink); color:var(--paper); padding:11px 14px; text-align:left; font-family:'JetBrains Mono',ui-monospace,monospace; font-size:10px; letter-spacing:0.12em; text-transform:uppercase; font-weight:500; }
        .script-doc .doc-table td { padding:11px 14px; border-bottom:1px solid var(--rule); vertical-align:top; }
        .script-doc .doc-table tr:last-child td { border-bottom:none; }
        .script-doc .doc-table td:first-child { font-weight:600; }
        .script-doc .end { margin-top:80px; padding:24px; text-align:center; font-family:'JetBrains Mono',ui-monospace,monospace; font-size:10px; letter-spacing:0.32em; color:var(--mid); border-top:1px solid var(--rule); }
        @media (max-width:640px){ .script-doc .doc-page{ padding:40px 20px 60px; } }
      `}</style>
      <div className="script-doc">
        <div className="doc-nav">
          <Link to="/"><ArrowLeft size={14} /> Back to portfolio</Link>
          <span>YouTube Script · Portfolio Sample</span>
        </div>
        <div className="doc-confidential">Confidential — Portfolio Sample · ashutoshwrites.online</div>
        <article className="doc-page">
          <div className="doc-eyebrow">{eyebrow}</div>
          <h1 className="doc-title">{title}</h1>
          {subtitle && <p className="doc-subtitle">{subtitle}</p>}
          <table className="doc-meta">
            <tbody>
              {metaTable.map((m) => (
                <tr key={m.label}>
                  <td>{m.label}</td>
                  <td>{m.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {children}
          <div className="end">End of Document · Ashutosh Mahapatra · ashutoshwrites.online</div>
        </article>
      </div>
    </>
  );
};

export default ScriptViewer;