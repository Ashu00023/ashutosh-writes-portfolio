import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import seo from "@/data/seo-data.json";

type LegalLayoutProps = {
  title: string;
  metaTitle: string;
  description: string;
  path: string;
  breadcrumbLabel: string;
  updated: string;
  intro: string;
  children: ReactNode;
};

const LegalLayout = ({
  title,
  metaTitle,
  description,
  path,
  breadcrumbLabel,
  updated,
  intro,
  children,
}: LegalLayoutProps) => {
  const canonical = `${seo.siteUrl}${path}`;

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={seo.routes.home.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={seo.routes.home.ogImage} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${seo.siteUrl}/` },
              { "@type": "ListItem", position: 2, name: breadcrumbLabel, item: canonical },
            ],
          })}
        </script>
      </Helmet>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20">
        <div className="container mx-auto px-6">
          <nav aria-label="Breadcrumb" className="max-w-3xl mx-auto mb-8">
            <ol className="flex items-center gap-2 text-xs text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground font-medium" aria-current="page">
                {breadcrumbLabel}
              </li>
            </ol>
          </nav>

          <ScrollReveal className="max-w-3xl mx-auto mb-12">
            <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">Legal</p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.15]">{title}</h1>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed">{intro}</p>
            <p className="mt-4 text-xs text-muted-foreground">Last updated: {updated}</p>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto rounded-2xl border border-border/60 bg-card/50 p-7 md:p-10 legal-prose">
            {children}
          </div>

          <div className="max-w-3xl mx-auto mt-10 text-sm text-muted-foreground">
            Questions about this page?{" "}
            <a
              href="mailto:ashutosh@mail.ashutoshwrites.online"
              className="font-semibold text-accent hover:underline"
            >
              ashutosh@mail.ashutoshwrites.online
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LegalLayout;
