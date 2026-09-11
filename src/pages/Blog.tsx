import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { POSTS_PER_PAGE, posts } from "@/data/posts";
import seo from "@/data/seo-data.json";

const { blogIndex } = seo.routes;
const canonical = `${seo.siteUrl}${blogIndex.path}`;
const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));

const Blog = () => {
  const [searchParams] = useSearchParams();
  const requested = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const page = Number.isFinite(requested) ? Math.min(Math.max(requested, 1), totalPages) : 1;

  const visible = useMemo(
    () => posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE),
    [page],
  );

  const pageCanonical = page > 1 ? `${canonical}?page=${page}` : canonical;
  const pageTitle = page > 1 ? `${blogIndex.title} — Page ${page}` : blogIndex.title;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={blogIndex.description} />
        <link rel="canonical" href={pageCanonical} />
        {page > 1 && (
          <link rel="prev" href={page - 1 === 1 ? canonical : `${canonical}?page=${page - 1}`} />
        )}
        {page < totalPages && <link rel="next" href={`${canonical}?page=${page + 1}`} />}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={blogIndex.description} />
        <meta property="og:type" content={blogIndex.ogType} />
        <meta property="og:url" content={pageCanonical} />
        <meta property="og:image" content={blogIndex.ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={blogIndex.description} />
        <meta name="twitter:image" content={blogIndex.ogImage} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: `${seo.siteUrl}/` },
                  { "@type": "ListItem", position: 2, name: "Blog", item: canonical },
                ],
              },
              {
                "@type": "Blog",
                "@id": canonical,
                url: canonical,
                name: blogIndex.title,
                description: blogIndex.description,
                author: { "@id": seo.person["@id"] },
                blogPost: posts.map((post) => ({
                  "@type": "BlogPosting",
                  headline: post.title,
                  url: `${seo.siteUrl}${post.href}`,
                  description: post.summary,
                  author: { "@id": seo.person["@id"] },
                })),
              },
            ],
          })}
        </script>
      </Helmet>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20">
        <div className="container mx-auto px-6">
          <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto mb-8">
            <ol className="flex items-center gap-2 text-xs text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground font-medium" aria-current="page">
                Blog
              </li>
            </ol>
          </nav>

          <ScrollReveal className="text-center mb-14">
            <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">The Blog</p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.15]">
              Latest <span className="font-display italic text-accent font-normal">Writing</span>
            </h1>
            <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto">
              Long-form pieces on the ideas shaping AI, finance, and content. Every article is written by{" "}
              <Link to="/author/ashutosh-mahapatra" className="font-semibold text-accent hover:underline">
                Ashutosh Mahapatra
              </Link>
              .
            </p>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {visible.map((post, i) => (
              <ScrollReveal key={post.href} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
                <Link
                  to={post.href}
                  className="group flex flex-col h-full rounded-2xl bg-card border border-border/60 p-8 hover:shadow-xl hover:border-accent/30 transition-all duration-300"
                >
                  <span className="self-start inline-flex items-center gap-1.5 text-[10px] font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-md uppercase tracking-[0.15em] mb-5">
                    <BookOpen size={11} aria-hidden="true" /> {post.label}
                  </span>
                  <h2 className="text-xl font-bold text-foreground tracking-tight leading-snug mb-3 group-hover:text-accent transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1">{post.summary}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground group-hover:text-accent transition-colors duration-200">
                    Read the post{" "}
                    <ArrowUpRight
                      size={15}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {totalPages > 1 && (
            <nav aria-label="Blog pagination" className="mt-14 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  to={n === 1 ? blogIndex.path : `${blogIndex.path}?page=${n}`}
                  aria-current={n === page ? "page" : undefined}
                  className={`inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm font-semibold transition-colors ${
                    n === page
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border/60 text-muted-foreground hover:border-accent/40 hover:text-accent"
                  }`}
                >
                  {n}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
