import { Helmet } from "react-helmet-async";
import StaticHtmlPage from "@/components/StaticHtmlPage";
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
      <StaticHtmlPage
        rawHtml={rawHtml}
        rightLabel="SEO Blog Sample · Finance + AI"
        background="#f4f1eb"
        canonicalUrl={url}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "AI Personal Finance 2026" },
        ]}
      />
    </>
  );
};

export default AiPersonalFinance2026;
