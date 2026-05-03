import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sanitizeHtml } from "@/lib/sanitize";

type Post = {
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  content_html: string;
  published_at: string;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    supabase
      .from("posts")
      .select("slug, title, excerpt, cover_image_url, content_html, published_at")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) setNotFound(true);
        else setPost(data as Post);
      });
  }, [slug]);

  if (notFound) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-28 container mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Post not found</h1>
          <Link to="/blog" className="text-accent font-semibold">← Back to blog</Link>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-28 container mx-auto px-6 text-center text-muted-foreground">
          Loading…
        </main>
      </>
    );
  }

  const url = `${window.location.origin}/blog/${post.slug}`;
  const description = post.excerpt ?? post.title;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image: post.cover_image_url ? [post.cover_image_url] : undefined,
    datePublished: post.published_at,
    dateModified: post.published_at,
    author: { "@type": "Person", name: "Ashutosh Mahapatra" },
    mainEntityOfPage: url,
  };

  return (
    <>
      <Helmet>
        <title>{post.title} — ashutoshwrites.online</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        {post.cover_image_url && (
          <meta property="og:image" content={post.cover_image_url} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={description} />
        {post.cover_image_url && (
          <meta name="twitter:image" content={post.cover_image_url} />
        )}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />
      <main className="pt-32 pb-28">
        <article className="container mx-auto px-6 max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to blog
          </Link>

          <header className="mb-10">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <Calendar size={12} />
              <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-lg text-muted-foreground mt-4">{post.excerpt}</p>
            )}
          </header>

          {post.cover_image_url && (
            <img
              src={post.cover_image_url}
              alt={post.title}
              className="w-full rounded-2xl mb-10 border border-border/60"
            />
          )}

          <div
            className="prose prose-invert prose-lg max-w-none prose-headings:tracking-tight prose-a:text-accent prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content_html) }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
};

export default BlogPost;