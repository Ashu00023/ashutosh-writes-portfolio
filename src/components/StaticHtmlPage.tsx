import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface Props {
  rawHtml: string;
  rightLabel: string;
  background?: string;
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

const StaticHtmlPage = ({ rawHtml, rightLabel, background = "#f5f0e8" }: Props) => {
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
      <div ref={contentRef} dangerouslySetInnerHTML={{ __html: links + styles + body }} />
    </div>
  );
};

export default StaticHtmlPage;