import { Helmet } from "react-helmet-async";
import StaticHtmlPage from "@/components/StaticHtmlPage";
import CaseStudyFrame from "@/components/CaseStudyFrame";
import rawHtml from "../../../public/static-blogs/ai-authenticity-premium-2026.html?raw";
import seo from "@/data/seo-data.json";

const meta = seo.routes.humanCreativityVsAi;
const url = `${seo.siteUrl}${meta.path}`;

const HumanCreativityVsAi = () => {
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
        niche="Creator Economy"
        title="Winning the Authenticity Premium in the AI-Slop Era"
        format="SEO Blog"
        statHighlight="research-backed anchor article"
        challenge="Audiences were already tuning out AI-generated content, but the niche had no anchor article explaining what was happening."
        approach="I produced a research-backed analysis of why human creators are winning in 2026 — built to rank and to convert, not just to describe the trend."
        craftNotes={[
          "Positioned the piece as the niche's missing anchor article so it could absorb search demand around the topic.",
          "Supported the argument with original charts instead of restating other people's summaries.",
          "Kept the through-line on why human creators win, so every section pays off the headline promise.",
        ]}
      >
        <StaticHtmlPage
          rawHtml={rawHtml}
          rightLabel="SEO Blog Sample · Authenticity Premium"
          background="#080808"
          canonicalUrl={url}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Portfolio", href: "/#portfolio" },
            { label: "Human Creativity vs AI" },
          ]}
        />
      </CaseStudyFrame>
    </>
  );
};

export default HumanCreativityVsAi;
