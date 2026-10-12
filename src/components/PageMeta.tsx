import { Helmet } from "react-helmet-async";
import seo from "@/data/seo-data.json";

type RouteKey = "services" | "method" | "work" | "about" | "contact";

/** Title, description, canonical, social tags and breadcrumb schema for a page, read from seo-data.json. */
const PageMeta = ({ route, crumb }: { route: RouteKey; crumb: string }) => {
  const r = seo.routes[route];
  const canonical = `${seo.siteUrl}${r.path}`;
  return (
    <Helmet>
      <title>{r.title}</title>
      <meta name="description" content={r.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={r.title} />
      <meta property="og:description" content={r.description} />
      <meta property="og:type" content={r.ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={r.ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={r.title} />
      <meta name="twitter:description" content={r.description} />
      <meta name="twitter:image" content={r.ogImage} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${seo.siteUrl}/` },
            { "@type": "ListItem", position: 2, name: crumb, item: canonical },
          ],
        })}
      </script>
    </Helmet>
  );
};

export default PageMeta;
