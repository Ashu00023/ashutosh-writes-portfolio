/** Single source for contact details, so an address or link changes here only. */
export const EMAIL = "ashutosh@mail.ashutoshwrites.online";
export const LINKEDIN = "https://linkedin.com/in/ashutosh-mahapatra";

export const contacts = [
  { label: EMAIL, href: `mailto:${EMAIL}` },
  { label: "LinkedIn", href: LINKEDIN },
];

/** The four roles a page usually passes through before it can be published. */
export const usualRoute = [
  "A writer delivers an article",
  "An SEO manager maps the meta tags and Schema markup",
  "A web developer formats the headings, codes the tables and builds the interactive elements",
  "A QA tester checks it on mobile",
];
