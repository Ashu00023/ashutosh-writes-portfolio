import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import thumb from "@/assets/portfolio-dopamine.png";

const url = "https://ashutoshwrites.online/scripts/prediction-is-the-drug";
const title = "Why Your Brain Can't Stop Craving Things — YouTube Script Sample";
const description = "Long-form YouTube script on dopamine, prediction error, and structured boredom — written for a neuroscience and productivity channel.";

const PredictionDrug = () => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={thumb} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={thumb} />
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
        <span style={{ color: "#7a746c" }}>YouTube Script Sample · Neuroscience & Productivity</span>
      </div>
      <iframe
        src="/static-scripts/reboot-human.html"
        title={title}
        style={{ flex: 1, width: "100%", border: "none", background: "#f5f0e8" }}
      />
    </div>
  </>
);

export default PredictionDrug;
