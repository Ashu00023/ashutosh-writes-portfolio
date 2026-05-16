import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import thumbnail from "@/assets/portfolio-ai-finance.jpg";

const url = "https://ashutoshwrites.online/blog/ai-personal-finance-2026";
const title = "AI Personal Finance 2026: Stats, Tools & Risks Explained";
const description = "18 verified stats, 5 structural trends, and the risks most coverage misses — a data-driven look at how AI is reshaping personal finance in 2026.";

const AiPersonalFinance2026 = () => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={thumbnail} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={thumbnail} />
      </Helmet>

      <div style={{ position: "fixed", inset: 0, display: "flex", flexDirection: "column", background: "#0d0c0a", zIndex: 0 }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 20px", background: "#0d0c0a", borderBottom: "1px solid #2e2b26",
          fontFamily: "'Fira Code', ui-monospace, monospace", fontSize: 11, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "#b0a99e",
        }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#c94b2a", textDecoration: "none" }}>
            <ArrowLeft size={14} /> Back to portfolio
          </Link>
          <span style={{ color: "#7a746c" }}>SEO Blog Sample · Finance + AI</span>
        </div>
        <iframe
          src="/static-blogs/ai-personal-finance-2026.html"
          title={title}
          style={{ flex: 1, width: "100%", border: "none", background: "#f4f1eb" }}
        />
      </div>
    </>
  );
};

export default AiPersonalFinance2026;