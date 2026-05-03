import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogCard, { BlogCardPost } from "@/components/BlogCard";
import ScrollReveal from "@/components/ScrollReveal";

const Blog = () => {
  const [posts, setPosts] = useState<BlogCardPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from("posts")
      .select("slug, title, excerpt, cover_image_url, published_at")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setPosts(data ?? []);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog — ashutoshwrites.online</title>
        <meta
          name="description"
          content="Insights and tips on SEO blog writing, YouTube scripting, and content that converts."
        />
        <link rel="canonical" href={`${window.location.origin}/blog`} />
        <meta property="og:title" content="Blog — ashutoshwrites.online" />
        <meta
          property="og:description"
          content="Insights and tips on SEO blog writing, YouTube scripting, and content that converts."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />
      <main className="pt-32 pb-28">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-16 max-w-2xl mx-auto">
            <p className="text-xs font-semibold text-accent uppercase tracking-[0.2em] mb-4">
              Blog
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Words that work
            </h1>
            <p className="text-muted-foreground mt-4">
              Notes on writing, SEO, and crafting content that ranks and converts.
            </p>
          </ScrollReveal>

          {error && (
            <p className="text-center text-destructive">Failed to load posts: {error}</p>
          )}

          {posts === null && !error && (
            <p className="text-center text-muted-foreground">Loading…</p>
          )}

          {posts && posts.length === 0 && (
            <p className="text-center text-muted-foreground">
              No posts yet. Check back soon.
            </p>
          )}

          {posts && posts.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {posts.map((p, i) => (
                <ScrollReveal key={p.slug} delay={i * 0.05}>
                  <BlogCard post={p} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Blog;