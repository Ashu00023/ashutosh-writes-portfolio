import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

export type BlogCardPost = {
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published_at: string;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const BlogCard = ({ post }: { post: BlogCardPost }) => (
  <Link
    to={`/blog/${post.slug}`}
    className="group block rounded-2xl border border-border/60 bg-card/50 overflow-hidden hover:border-accent/40 hover:shadow-xl transition-all duration-300"
  >
    {post.cover_image_url && (
      <div className="aspect-[16/9] overflow-hidden bg-muted">
        <img
          src={post.cover_image_url}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
    )}
    <div className="p-6">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
        <Calendar size={12} />
        <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
      </div>
      <h2 className="text-xl font-bold text-foreground tracking-tight mb-2 group-hover:text-accent transition-colors">
        {post.title}
      </h2>
      {post.excerpt && (
        <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
      )}
      <span className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
        Read more →
      </span>
    </div>
  </Link>
);

export default BlogCard;