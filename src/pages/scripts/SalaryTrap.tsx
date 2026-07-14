import { Helmet } from "react-helmet-async";
import thumb from "@/assets/portfolio-tds-deducted.webp";
import StaticHtmlPage from "@/components/StaticHtmlPage";
import rawHtml from "../../../public/static-scripts/middle-class-trap.html?raw";

const url = "https://ashutoshwrites.online/scripts/salary-trap";
const title = "Why 90% of Salaried People Never Build Real Wealth — YouTube Script Sample";
const description = "An 8-minute long-form YouTube script for an Indian personal finance channel — structured for retention with pattern interrupts, humor beats, and a six-stage emotional arc.";

const SalaryTrap = () => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content="https://ashutoshwrites.online/og-cover.jpg" />
      <meta property="og:image" content={thumb} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={thumb} />
    </Helmet>
    <StaticHtmlPage
      rawHtml={rawHtml}
      rightLabel="YouTube Script Sample · Indian Personal Finance"
      canonicalUrl={url}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Portfolio", href: "/#portfolio" },
        { label: "Salary Trap" },
      ]}
    />
  </>
);

export default SalaryTrap;
