import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import profile from "@/assets/profile.jpg";
import { posts } from "@/data/posts";
import seo from "@/data/seo-data.json";

const { author } = seo.routes;
const canonical = `${seo.siteUrl}${author.path}`;

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/ashutosh-mahapatra" },
  { label: "Instagram", href: "https://instagram.com/ashutosh.writes" },
  { label: "Email", href: "mailto:ashutosh@mail.ashutoshwrites.online" },
];

const focusAreas = [
  { title: "Artificial intelligence", copy: "How AI systems actually change work, money, and trust — beyond the launch cycle." },
  { title: "Cybersecurity", copy: "Threat models teams live with: identity, OAuth scope, agent permissions, and shadow adoption." },
  { title: "Business & fintech", copy: "Personal finance, B2B SaaS economics, and the incentives behind product decisions." },
];

const Author = () => (
  <>
    <Helmet>
      <title>{author.title}</title>
      <meta name="description" content={author.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={author.title} />
      <meta property="og:description" content={author.description} />
      <meta property="og:type" content="profile" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={author.ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={author.title} />
      <meta name="twitter:description" content={author.description} />
      <meta name="twitter:image" content={author.ogImage} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { ...seo.person, mainEntityOfPage: canonical },
            {
              "@type": "ProfilePage",
              "@id": canonical,
              url: canonical,
              name: author.title,
              description: author.description,
              mainEntity: { "@id": seo.person["@id"] },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${seo.siteUrl}/` },
                { "@type": "ListItem", position: 2, name: "Author", item: canonical },
              ],
            },
            {
              "@type": "ItemList",
              name: "Articles by Ashutosh Mahapatra",
              itemListElement: posts.map((post, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: post.title,
                url: `${seo.siteUrl}${post.href}`,
              })),
            },
          ],
        })}
      </script>
    </Helmet>
    <Navbar />
    <main className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6">
        <nav aria-label="Breadcrumb" className="max-w-5xl mx-auto mb-8">
          <ol className="flex items-center gap-2 text-xs text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-accent transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground font-medium" aria-current="page">
              Author
            </li>
          </ol>
        </nav>

        <ScrollReveal className="max-w-5xl mx-auto">
          <div className="grid gap-10 md:grid-cols-[220px_1fr] md:items-start">
            <img
              src={profile}
              alt="Portrait of Ashutosh Mahapatra"
              width={220}
              height={220}
              loading="eager"
              decoding="async"
              className="w-40 h-40 md:w-[220px] md:h-[220px] rounded-2xl object-cover border border-border/60 layer-2"
            />
            <div>
              <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">Author</p>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.15]">
                Ashutosh <span className="font-display italic text-accent font-normal">Mahapatra</span>
              </h1>
              <p className="mt-3 text-sm font-semibold text-foreground">
                Technology writer — AI, cybersecurity, and business
              </p>
              <div className="mt-6 space-y-4 text-base text-muted-foreground leading-relaxed">
                <p>
                  I write long-form, research-backed articles about technology and money for readers who are tired of
                  recycled takes. My work starts with primary sources — filings, CVEs, vendor documentation, published
                  research — and ends with an argument a specialist can read without wincing.
                </p>
                <p>
                  Every piece is written by hand, sentence by sentence. Where AI helps, I use it for structural research
                  and SEO mapping, never to generate the prose. Statistics get verified before they get published, and
                  sources stay visible so readers can check the work themselves.
                </p>
                <p>
                  I work with founders, marketing leads, and editorial teams who need writing that ranks on Google and
                  still holds up in front of an expert audience.
                </p>
              </div>
              <ul className="mt-7 flex flex-wrap gap-2.5" aria-label="Social profiles">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center rounded-lg border border-border/60 bg-card/50 px-4 py-2 text-xs font-semibold text-foreground hover:border-accent/40 hover:text-accent transition-colors"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>

        <section aria-labelledby="focus-heading" className="max-w-5xl mx-auto mt-20">
          <h2 id="focus-heading" className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-8">
            What I cover
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {focusAreas.map((area, i) => (
              <ScrollReveal key={area.title} direction="up" delay={i * 0.08}>
                <div className="h-full rounded-xl border border-border/60 bg-card/50 p-6">
                  <h3 className="text-base font-bold text-foreground mb-2">{area.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{area.copy}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section aria-labelledby="archive-heading" className="max-w-5xl mx-auto mt-20">
          <h2 id="archive-heading" className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-8">
            Articles by Ashutosh <span className="font-display italic text-accent font-normal">Mahapatra</span>
          </h2>
          <ul className="space-y-4">
            {posts.map((post, i) => (
              <ScrollReveal key={post.href} direction="up" delay={i * 0.06}>
                <li>
                  <Link
                    to={post.href}
                    className="group flex items-start justify-between gap-6 rounded-xl border border-border/60 bg-card p-6 hover:border-accent/30 hover:shadow-xl transition-all duration-300"
                  >
                    <span className="min-w-0">
                      <span className="block text-[10px] font-semibold text-accent uppercase tracking-[0.15em] mb-2">
                        {post.label}
                      </span>
                      <span className="block text-lg font-bold text-foreground leading-snug group-hover:text-accent transition-colors">
                        {post.title}
                      </span>
                      <span className="mt-2 block text-sm text-muted-foreground leading-relaxed">{post.summary}</span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      aria-hidden="true"
                      className="shrink-0 text-muted-foreground group-hover:text-accent transition-colors"
                    />
                  </Link>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default Author;
