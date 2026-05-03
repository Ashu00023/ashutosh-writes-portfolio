import DOMPurify from "dompurify";

export const sanitizeHtml = (html: string): string =>
  DOMPurify.sanitize(html, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: [
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
      "loading",
      "referrerpolicy",
      "target",
    ],
  });