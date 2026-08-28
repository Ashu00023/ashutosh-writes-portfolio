import { Helmet } from "react-helmet-async";
import StaticHtmlPage from "@/components/StaticHtmlPage";
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
    </>
  );
};

export default HumanCreativityVsAi;
