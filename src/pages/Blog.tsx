import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import seo from "@/data/seo-data.json";

const { blogIndex, aiPersonalFinance2026, humanCreativityVsAi } = seo.routes;
const canonical = `${seo.siteUrl}${blogIndex.path}`;

const posts = [
  {
    label: "AI + Finance",
    title: "AI Personal Finance 2026",
    summary: "Verified stats, structural trends, and the risks most AI finance coverage misses — built for readers who want signal over noise.",
    href: aiPersonalFinance2026.path,
  },
  {
    label: "AI + Content",
    title: "The Authenticity Premium in the AI-Slop Era",
    summary: "Why human creativity is winning in 2026 and how creators can turn authenticity into a durable competitive advantage.",
    href: humanCreativityVsAi.path,
  },
];

const Blog = () => (
  <>
    <Helmet>
      <title>{blogIndex.title}</title>
      <meta name="description" content={blogIndex.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={blogIndex.title} />
      <meta property="og:description" content={blogIndex.description} />
      <meta property="og:type" content={blogIndex.ogType} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={blogIndex.title} />
      <meta name="twitter:description" content={blogIndex.description} />
    </Helmet>
    <Navbar />
    <main className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-14">
          <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">The Blog</p>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-[1.15]">
            Latest <span className="font-display italic text-accent font-normal">Writing</span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto">
            Long-form pieces on the ideas shaping AI, finance, and content.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 max-w-5xl mx-auto">
          {posts.map((post, i) => (
            <ScrollReveal key={post.href} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
              <Link
                to={post.href}
                className="group flex flex-col h-full rounded-2xl bg-card border border-border/60 p-8 hover:shadow-xl hover:border-accent/30 transition-all duration-300"
              >
                <span className="self-start inline-flex items-center gap-1.5 text-[10px] font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-md uppercase tracking-[0.15em] mb-5">
                  <BookOpen size={11} /> {post.label}
                </span>
                <h2 className="text-xl font-bold text-foreground tracking-tight leading-snug mb-3 group-hover:text-accent transition-colors duration-200">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1">
                  {post.summary}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground group-hover:text-accent transition-colors duration-200">
                  Read the post <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default Blog;
