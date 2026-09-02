import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import seo from "@/data/seo-data.json";

const { aiPersonalFinance2026, humanCreativityVsAi, byoaShadowAi } = seo.routes;

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
  {
    label: "Cybersecurity",
    title: "The Shadow AI Crisis: Why BYOA Is B2B SaaS's Next Data Nightmare",
    summary: "AI agents aren't sneaking in through shadow IT anymore — they're inheriting OAuth scope from platforms you already approved.",
    href: byoaShadowAi.path,
  },
];

const LatestBlogsSection = () => (
  <section id="latest-blogs" className="py-28 bg-background">
    <div className="container mx-auto px-6">
      <ScrollReveal className="text-center mb-12">
        <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">From the Blog</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-[1.15]">
          Latest <span className="font-display italic text-accent font-normal">Writing</span>
        </h2>
        <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto">
          Recent posts on content strategy, finance, AI, and the craft of writing that holds attention.
        </p>
      </ScrollReveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {posts.map((post, i) => (
          <ScrollReveal key={post.href} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
            <Link
              to={post.href}
              className="group flex flex-col h-full rounded-xl bg-card border border-border/60 p-8 hover:shadow-xl hover:border-accent/30 transition-all duration-300"
            >
              <span className="self-start inline-flex items-center gap-1.5 text-[10px] font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-md uppercase tracking-[0.15em] mb-5">
                <BookOpen size={11} /> {post.label}
              </span>
              <h3 className="text-xl font-bold text-foreground tracking-tight leading-snug mb-3 group-hover:text-accent transition-colors duration-200">
                {post.title}
              </h3>
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
  </section>
);

export default LatestBlogsSection;
