import { Helmet } from "react-helmet-async";
import StaticHtmlPage from "@/components/StaticHtmlPage";
import CaseStudyFrame from "@/components/CaseStudyFrame";
import rawHtml from "../../../public/static-blogs/byoa-shadow-ai-blog.html?raw";
import seo from "@/data/seo-data.json";

const meta = seo.routes.byoaShadowAi;
const url = `${seo.siteUrl}${meta.path}`;

const ByoaShadowAi = () => {
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
        niche="Cybersecurity"
        title="Why BYOA Is B2B SaaS's Next Data Nightmare"
        format="SEO Blog"
        statHighlight="CVE-2025-32711 cited"
        challenge="Shadow AI coverage was stuck describing 2019-era shadow IT — employees smuggling in unapproved tools — which no longer matches how AI actually enters a company."
        approach="I wrote it as a threat brief: how agents ship pre-embedded inside already-approved platforms and inherit OAuth scope nobody reviewed, anchored to CVE-2025-32711 and closed with a three-pillar governance framework."
        craftNotes={[
          "Led with the gap in existing coverage so security readers immediately see why the 2019 shadow-IT frame fails.",
          "Anchored the core claim to a citable CVE rather than vendor commentary, so the piece holds up under scrutiny.",
          "Ended on a three-pillar framework, giving the article a reusable structure teams can act on and other pages can cite.",
        ]}
      >
        <StaticHtmlPage
          rawHtml={rawHtml}
          rightLabel="Cybersecurity Blog Sample · Shadow AI & BYOA"
          background="#eef0ee"
          canonicalUrl={url}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Portfolio", href: "/#portfolio" },
            { label: "Shadow AI & BYOA" },
          ]}
        />
      </CaseStudyFrame>
    </>
  );
};

export default ByoaShadowAi;
