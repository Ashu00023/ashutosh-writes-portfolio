import { Helmet } from "react-helmet-async";
import thumbnail from "@/assets/portfolio-ai-authenticity.webp";
import StaticHtmlPage from "@/components/StaticHtmlPage";
import rawHtml from "../../../public/static-blogs/ai-authenticity-premium-2026.html?raw";

const url = "https://ashutoshwrites.online/blog/human-creativity-vs-ai-authenticity-premium-2026";
const title = "AI Took Over the Internet. Now Audiences Are Revolting — and Human Creators Are Winning";
const description = "AI content is flooding the internet, but audiences are rejecting it. Discover the data behind the Authenticity Premium and why human creativity is your best SEO strategy for 2026.";

const HumanCreativityVsAi = () => {
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
