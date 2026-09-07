import { Helmet } from "react-helmet-async";
import StaticHtmlPage from "@/components/StaticHtmlPage";
import CaseStudyFrame from "@/components/CaseStudyFrame";
import rawHtml from "../../../public/static-blogs/ai-personal-finance-2026.html?raw";
import seo from "@/data/seo-data.json";

const meta = seo.routes.aiPersonalFinance2026;
const url = `${seo.siteUrl}${meta.path}`;

const AiPersonalFinance2026 = () => {
  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:type" content={meta.ogType} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={meta.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.ogImage} />
      </Helmet>
      <CaseStudyFrame
        niche="AI Fintech"
        title="Scaling Trust for an AI-Powered Personal Finance Audience"
        format="SEO Blog"
        statHighlight="18 verified stats"
        challenge="AI finance content was crowded with surface-level listicles and zero verified data, so nothing in the niche earned a reader's trust."
        approach="I built a long-form authority piece carrying 18 verified stats, 5 trends, and the risks most coverage skips entirely."
        craftNotes={[
          "Verified every statistic before it went in, so each number can be traced to a primary source.",
          "Rewrote section headings as the direct questions readers ask, formatted for featured snippets and AI answers.",
          "Added a short standalone summary under the headline and a Key Takeaway line closing each major section.",
        ]}
      >
        <StaticHtmlPage
          rawHtml={rawHtml}
          rightLabel="SEO Blog Sample · Finance + AI"
          background="#f4f1eb"
          canonicalUrl={url}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Portfolio", href: "/#portfolio" },
            { label: "AI Personal Finance 2026" },
          ]}
        />
      </CaseStudyFrame>
    </>
  );
};

export default AiPersonalFinance2026;
