import { useEffect } from "react";
import { ArrowUpRight, FileText, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "./ScrollReveal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { prefetchSamples, prefetchOne } from "@/lib/prefetch";

import aiFinanceImg from "@/assets/portfolio-ai-finance.jpg";
import salaryTrapImg from "@/assets/portfolio-tds-deducted.webp";
import spendingYtImg from "@/assets/portfolio-dopamine.webp";
import aiAuthenticityImg from "@/assets/portfolio-ai-authenticity.webp";

type Blog = {
  niche: string;
  title: string;
  summary: string;
  image: string;
  liveUrl: string;
  transcriptHref: string;
};

type Script = {
  metric: string;
  title: string;
  bullets: string[];
  image: string;
  href: string;
};

const seoBlogs: Blog[] = [
  {
    niche: "Creator Economy",
    title: "Winning the Authenticity Premium in the AI-Slop Era",
    summary:
      "Audiences were tuning out AI-generated content but the niche had no anchor article. We produced a research-backed analysis on why human creators are winning in 2026 — built to rank and to convert.",
    image: aiAuthenticityImg,
    liveUrl: "/static-blogs/ai-authenticity-premium-2026.html",
    transcriptHref: "/blog/human-creativity-vs-ai-authenticity-premium-2026",
  },
  {
    niche: "AI Fintech",
    title: "Scaling Trust for an AI-Powered Personal Finance Audience",
    summary:
      "AI finance content was crowded with surface-level listicles and zero verified data. We built a long-form authority piece with 18 verified stats, 5 trends, and the risks most coverage misses.",
    image: aiFinanceImg,
    liveUrl: "/static-blogs/ai-personal-finance-2026.html",
    transcriptHref: "/blog/ai-personal-finance-2026",
  },
];

const ytScripts: Script[] = [
  {
    metric: "Indian Personal Finance · Long-form",
    title: "Why 90% of Salaried People Never Build Real Wealth",
    bullets: [
      "Cold open built around a relatable salary-slip pattern interrupt",
      "Six-stage emotional arc with humor beats every 45–60 seconds",
      "Retention engineered for the 8-minute mid-roll drop-off",
    ],
    image: salaryTrapImg,
    href: "/scripts/salary-trap",
  },
  {
    metric: "Neuroscience / Productivity · Long-form",
    title: "Why Your Brain Can't Stop Craving Things",
    bullets: [
      "Hook reframes dopamine as a prediction signal, not a pleasure chemical",
      "Visual pacing notes built around Wolfram Schultz's monkey experiments",
      "Closes with a structured-boredom CTA designed for comment velocity",
    ],
    image: spendingYtImg,
    href: "/scripts/prediction-is-the-drug",
  },
];

const BlogCard = ({ b }: { b: Blog }) => (
  <article
    className="group flex flex-col rounded-2xl bg-background border border-border/60 overflow-hidden hover:shadow-xl hover:border-accent/30 transition-all duration-300 h-full"
    onMouseEnter={() => prefetchOne(b.liveUrl)}
    onTouchStart={() => prefetchOne(b.liveUrl)}
  >
    <div className="relative overflow-hidden bg-muted aspect-[16/9] flex items-center justify-center">
      <img
        src={b.image}
        alt={b.title}
        loading="lazy"
        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="flex flex-col flex-1 p-6">
      <span className="self-start text-[10px] font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full uppercase tracking-[0.15em] mb-4">
        {b.niche}
      </span>
      <h3 className="text-lg font-bold text-foreground tracking-tight leading-snug mb-3">
        {b.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
        {b.summary}
      </p>
      <div className="flex flex-wrap gap-3 mt-auto">
        <a
          href={b.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-foreground text-background text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-accent transition-colors duration-200"
        >
          View Live Article <ArrowUpRight size={15} />
        </a>
        <Link
          to={b.transcriptHref}
          className="inline-flex items-center gap-1.5 border border-border text-foreground text-sm font-semibold px-4 py-2.5 rounded-full hover:border-accent hover:text-accent transition-colors duration-200"
        >
          <FileText size={14} /> Read Clean Transcript
        </Link>
      </div>
    </div>
  </article>
);

const ScriptCard = ({ s }: { s: Script }) => (
  <article
    className="group flex flex-col rounded-2xl bg-background border border-border/60 overflow-hidden hover:shadow-xl hover:border-accent/30 transition-all duration-300 h-full"
    onMouseEnter={() => prefetchOne(s.href === "/scripts/salary-trap" ? "/static-scripts/middle-class-trap.html" : "/static-scripts/reboot-human.html")}
    onTouchStart={() => prefetchOne(s.href === "/scripts/salary-trap" ? "/static-scripts/middle-class-trap.html" : "/static-scripts/reboot-human.html")}
  >
    <div className="relative overflow-hidden aspect-video bg-muted">
      <img
        src={s.image}
        alt={s.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center">
        <PlayCircle
          size={56}
          className="text-background drop-shadow-lg opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
        />
      </div>
    </div>
    <div className="flex flex-col flex-1 p-6">
      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.15em] mb-3">
        {s.metric}
      </p>
      <h3 className="text-lg font-bold text-foreground tracking-tight leading-snug mb-4">
        {s.title}
      </h3>
      <ul className="space-y-2 mb-6 flex-1">
        {s.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
            <span className="text-accent mt-1.5 shrink-0 h-1 w-1 rounded-full bg-accent" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <Link
        to={s.href}
        className="inline-flex items-center gap-1.5 self-start bg-foreground text-background text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-accent transition-colors duration-200 mt-auto"
      >
        View Script Blueprint <ArrowUpRight size={15} />
      </Link>
    </div>
  </article>
);

const PortfolioSection = () => {
  useEffect(() => {
    prefetchSamples();
  }, []);
  return (
    <section id="portfolio" className="py-28 bg-card/40">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight leading-[1.15]">
            Featured <span className="font-display italic text-accent font-normal">Case Studies</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground max-w-xl mx-auto">
            Selected assets shipped for AI, fintech, and creator-economy clients — engineered for ranking, retention, and revenue.
          </p>
        </ScrollReveal>

        <Tabs defaultValue="blogs" className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-10">
            <TabsList className="h-11 p-1 bg-secondary/80 rounded-full border border-border/60">
              <TabsTrigger
                value="blogs"
                className="rounded-full px-5 text-sm data-[state=active]:bg-foreground data-[state=active]:text-background"
              >
                SEO Blog Content
              </TabsTrigger>
              <TabsTrigger
                value="scripts"
                className="rounded-full px-5 text-sm data-[state=active]:bg-foreground data-[state=active]:text-background"
              >
                YouTube Scripts
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="blogs" className="mt-0">
            <div className="grid gap-6 sm:grid-cols-2">
              {seoBlogs.map((b, i) => (
                <ScrollReveal key={b.title} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
                  <BlogCard b={b} />
                </ScrollReveal>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scripts" className="mt-0">
            <div className="grid gap-6 sm:grid-cols-2">
              {ytScripts.map((s, i) => (
                <ScrollReveal key={s.title} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1}>
                  <ScriptCard s={s} />
                </ScrollReveal>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <ScrollReveal className="text-center mt-12 max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground italic">
            We can also turn YouTube scripts into SEO blogs and vice versa — same story, optimized for each format.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default PortfolioSection;
