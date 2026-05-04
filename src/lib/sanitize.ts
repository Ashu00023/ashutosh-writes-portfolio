import DOMPurify from "dompurify";

export const sanitizeHtml = (html: string): string =>
  DOMPurify.sanitize(html, {
    ADD_TAGS: ["iframe", "style"],
    ADD_ATTR: [
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
      "loading",
      "referrerpolicy",
      "target",
      "style",
      "class",
    ],
    // Allow <style> blocks so per-post CSS (scoped under .blog-custom) renders
    FORBID_TAGS: [],
    ALLOW_DATA_ATTR: false,
  });