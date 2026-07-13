import { Helmet } from "react-helmet-async";
import thumb from "@/assets/portfolio-dopamine.webp";
import StaticHtmlPage from "@/components/StaticHtmlPage";
import rawHtml from "../../../public/static-scripts/reboot-human.html?raw";

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
    <StaticHtmlPage rawHtml={rawHtml} rightLabel="YouTube Script Sample · Neuroscience & Productivity" />
  </>
);

export default PredictionDrug;
