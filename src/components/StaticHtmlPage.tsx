import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string; // omit for current page
}

interface Props {
  rawHtml: string;
  rightLabel: string;
  background?: string;
  breadcrumbs?: BreadcrumbItem[];
  canonicalUrl?: string;
}

interface ExtractedScript {
  src?: string;
  code?: string;
  type?: string;
}

const extract = (raw: string) => {
  const headMatch = raw.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  const bodyMatch = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const head = headMatch ? headMatch[1] : "";
  const bodyRaw = bodyMatch ? bodyMatch[1] : raw;

  const styles = Array.from(head.matchAll(/<style[^>]*>[\s\S]*?<\/style>/gi))
    .map((m) => m[0])
    .join("\n");
  const links = Array.from(head.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi))
    .map((m) => m[0])
    .join("\n");

  const scripts: ExtractedScript[] = [];
  const bodyNoScripts = bodyRaw.replace(
    /<script([^>]*)>([\s\S]*?)<\/script>/gi,
    (_full, attrs: string, code: string) => {
      const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
      const typeMatch = attrs.match(/type=["']([^"']+)["']/i);
      const type = typeMatch ? typeMatch[1] : undefined;
      if (srcMatch) scripts.push({ src: srcMatch[1], type });
      else if (code.trim()) scripts.push({ code, type });
      return "";
    }
  );

  return { styles, links, body: bodyNoScripts, scripts };
};

const StaticHtmlPage = ({ rawHtml, rightLabel, background = "#f5f0e8", breadcrumbs, canonicalUrl }: Props) => {
  const { styles, links, body, scripts } = useMemo(() => extract(rawHtml), [rawHtml]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const injected: HTMLScriptElement[] = [];
    // Defer to next tick so injected DOM is in place before scripts query it.
    const timer = window.setTimeout(() => {
      scripts.forEach((s) => {
        const el = document.createElement("script");
        if (s.type) el.type = s.type;
        if (s.src) el.src = s.src;
        if (s.code) el.textContent = s.code;
        document.body.appendChild(el);
        injected.push(el);
      });
    }, 0);
    return () => {
      window.clearTimeout(timer);
      injected.forEach((el) => el.remove());
    };
  }, [scripts]);

  return (
    <div style={{ background, minHeight: "100vh" }}>
      {breadcrumbs && breadcrumbs.length > 0 && canonicalUrl && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((b, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: b.label,
                item: b.href
                  ? b.href.startsWith("http")
                    ? b.href
                    : `https://ashutoshwrites.online${b.href}`
                  : canonicalUrl,
              })),
            })}
          </script>
        </Helmet>
      )}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
          background: "#0d0c0a",
          borderBottom: "1px solid #2e2b26",
          fontFamily: "'Fira Code', ui-monospace, monospace",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#b0a99e",
        }}
      >
        <Link
          to="/"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#c94b2a", textDecoration: "none" }}
        >
          <ArrowLeft size={14} /> Back to portfolio
        </Link>
        <span style={{ color: "#7a746c" }}>{rightLabel}</span>
      </div>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav
          aria-label="Breadcrumb"
          style={{
            padding: "12px 20px",
            background: "rgba(13,12,10,0.04)",
            borderBottom: "1px solid rgba(13,12,10,0.08)",
            fontFamily: "'Fira Code', ui-monospace, monospace",
            fontSize: 12,
            color: "#5a544b",
          }}
        >
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: 6 }}>
            {breadcrumbs.map((b, i) => (
              <li key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                {b.href ? (
                  <Link to={b.href} style={{ color: "#c94b2a", textDecoration: "none" }}>
                    {b.label}
                  </Link>
                ) : (
                  <span aria-current="page" style={{ color: "#0d0c0a" }}>{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && <span style={{ color: "#a49b8f" }}>›</span>}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div ref={contentRef} dangerouslySetInnerHTML={{ __html: links + styles + body }} />
    </div>
  );
};

export default StaticHtmlPage;