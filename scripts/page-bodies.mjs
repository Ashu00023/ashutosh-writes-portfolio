// Hand-written HTML mirrors of the React pages, read by prerender.mjs.
// Crawlers that do not run JavaScript (most AI bots) see exactly this text.
// If you change visible copy in a React page, change the matching string here in the same edit.

const EMAIL = "ashutosh@ashutoshwrites.in";
const LINKEDIN = "https://linkedin.com/in/ashutosh-mahapatra";

export function articlePath(seo, key) {
  return seo.routes[key].path;
}

/** Every article, in the order of src/data/posts.ts. The author page and its ItemList schema use this order. */
export const ARTICLE_KEYS = ["aiPersonalFinance2026", "humanCreativityVsAi", "byoaShadowAi", "visaAgenticCommerceDisputes"];

const list = (items) => `<ul>\n${items.map((i) => `    <li>${i}</li>`).join("\n")}\n  </ul>`;

const nav = `
<header>
  <nav aria-label="Primary">
    <a href="/">ashutoshwrites.online</a>
    <ul>
      <li><a href="/services">Services</a></li>
      <li><a href="/method">Method</a></li>
      <li><a href="/work">Work</a></li>
      <li><a href="/research">Research</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/author/ashutosh-mahapatra">Author</a></li>
      <li><a href="/contact">Contact</a></li>
      <li><a href="/contact">Free Article Check</a></li>
    </ul>
  </nav>
</header>`;

const footer = `
<footer>
  <nav aria-label="Explore">
    <p>Explore</p>
    <ul>
      <li><a href="/services">Services</a></li>
      <li><a href="/method">Method</a></li>
      <li><a href="/work">Work</a></li>
      <li><a href="/research">Research</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/author/ashutosh-mahapatra">Author</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
  <nav aria-label="Services">
    <p>Services</p>
    <ul>
      <li><a href="/services#search">On-page SEO, GEO &amp; AEO</a></li>
      <li><a href="/services#articles">Research-led articles</a></li>
      <li><a href="/services#strategy">Content strategy</a></li>
      <li><a href="/contact">Free Article Check</a></li>
    </ul>
  </nav>
  <nav aria-label="Connect">
    <p>Connect</p>
    <ul>
      <li><a href="mailto:${EMAIL}">Email</a></li>
      <li><a href="${LINKEDIN}">LinkedIn</a></li>
    </ul>
  </nav>
  <nav aria-label="Legal">
    <ul>
      <li><a href="/privacy-policy">Privacy Policy</a></li>
      <li><a href="/terms-of-use">Terms of Use</a></li>
    </ul>
  </nav>
  <p>&copy; ${new Date().getFullYear()} Ashutosh Mahapatra, Bhubaneswar, Odisha, India</p>
</footer>`;

const wrap = (main) => `${nav}\n<main>\n${main}\n</main>${footer}`.trim();

const close = `
  <section>
    <h2>Send us one article. We&rsquo;ll check every claim in it.</h2>
    <p>A few free Article Checks each month. You get a written report of what we found, whether or not we ever work together.</p>
    <p><a href="/contact">Get a free Article Check</a> <a href="mailto:${EMAIL}">${EMAIL}</a></p>
  </section>`;

// ---- shared copy -----------------------------------------------------------

const researchItems = (seo) => [
  {
    href: articlePath(seo, "byoaShadowAi"),
    title: seo.routes.byoaShadowAi.title,
    image: "/byoa-shadow-ai-blog-thumbnail.webp",
    thumbAlt: "Cover image for the shadow AI article: the line It's already inside, 150,000 agents by 2028, above a small device on a dark table",
    meta: "Cybersecurity &middot; 17 sources cited",
    problem: "Shadow AI coverage often centers on employees adopting new tools; the harder case is agents that arrive inside platforms already approved.",
    approach: "Wrote a technical threat brief on inherited OAuth scope nobody reviewed, grounded in CVE-2025-32711, three named incidents with their limits stated, dated EU AI Act obligations and a governance framework.",
    demonstrates: "Researching and explaining a technical security issue with primary-source verification and a usable governance framework.",
  },
  {
    href: articlePath(seo, "visaAgenticCommerceDisputes"),
    title: seo.routes.visaAgenticCommerceDisputes.title,
    meta: "Fintech &amp; AI &middot; 12 primary sources cited",
    problem: "Visa quietly routed AI-agent purchases into its existing card-not-present dispute rules, and most coverage skipped the actual liability question.",
    approach: "Wrote a fact-checked breakdown of who eats the loss when an agent buys the wrong thing, verified against Visa's and Mastercard's own rule text.",
    demonstrates: "Tracing a regulatory and payments question to primary-source rule text and explaining the liability outcome clearly.",
  },
  {
    href: articlePath(seo, "aiPersonalFinance2026"),
    title: seo.routes.aiPersonalFinance2026.title,
    meta: "AI Fintech &middot; 20+ sourced statistics",
    problem: "AI personal-finance content was crowded with surface-level listicles with little sourced data.",
    approach: "Built a long-form authority piece anchored in 20+ sourced statistics, mapped six structural trends, and added a risk framework most coverage skips.",
    demonstrates: "Turning scattered data points into a structured, evidence-backed trend and risk analysis.",
  },
  {
    href: articlePath(seo, "humanCreativityVsAi"),
    title: seo.routes.humanCreativityVsAi.title,
    meta: "Thesis &middot; Semrush: #1 pages 80.5% likely human-written",
    problem: "Audiences were tuning out AI-generated content, but the niche had no anchor article explaining why.",
    approach: "Built an original thesis on why human creators are earning an authenticity premium in 2026, tested against Semrush and Ahrefs ranking data and audience-engagement research.",
    demonstrates: "Why verified, human-edited work is the moat when AI-generated pages flood search.",
  },
];

const serviceBlocks = [
  { id: "search", title: "On-page SEO, GEO and AEO", lede: "For the articles we write and the ones you already have. We make each article rankable in Google (SEO), quotable by generative AI engines (GEO) and answer-ready for snippets and assistants (AEO).", get: ["Search-intent mapping and heading architecture", "Answer-first blocks, FAQ and definition structure for answer engines", "Schema.org JSON-LD that mirrors the visible article", "Primary sources, dates and author signals that make an article citable", "Citation checks across ChatGPT, Perplexity, Gemini and Claude, with prompts and dates recorded"], note: "We work one article at a time. We do not do full-site audits or technical SEO programmes." },
  { id: "articles", title: "Research-led articles", lede: "Long-form fintech, payments and AI-security articles, researched to primary sources and edited by a person, delivered ready to publish with the on-page SEO, GEO and AEO already built in.", get: ["Primary-source research and a source ledger for every claim", "An original angle that adds information other articles lack", "Written and edited by a person, with AI used only for research support", "Delivered as a Google Doc, or as a coded HTML/CSS page with Schema", "Terms, scope and revisions agreed in writing before work starts"], note: "Available as a single article or a monthly series." },
  { id: "strategy", title: "Content strategy", lede: "Which articles to publish, in what order, and why. Built around what your buyers search and what AI engines already cite.", get: ["A topic map tied to search intent in your niche", "A gap review of what already ranks and what AI engines already quote", "A content calendar built around claims you can back with evidence", "Briefs that any writer can follow, ours or yours"], note: "Available as a standalone plan or as the first step of a monthly series." },
  { id: "article-check", title: "Article Check", lede: "Free, and the easiest way to start. Send one article and see the work before you commit to anything.", get: ["Every statistic, date and quote in the article checked against primary sources", "A test of whether ChatGPT, Perplexity, Gemini and Claude cite it, with prompts and dates recorded", "A check that your Schema matches the visible article", "A one-page written report, yours to keep"], note: "We take a few each month, because each one is done by hand." },
];

const faqs = [
  ["What is a source ledger?", "A list of every statistic, date and quote in an article, with its primary source, the date of that source and what it does and does not prove. It ships with the article, so anyone can check it."],
  ["Do you do full-site SEO audits?", "No. We work at article level: the article, its structure, its Schema and whether it gets cited. If you need a full-site technical audit, we will say so and point you to a specialist."],
  ["Do you guarantee rankings or AI citations?", "No. Search results and AI answers depend on factors nobody controls, and AI answers change from run to run. We build articles to be rankable and quotable, then test and report what we see, including the misses."],
  ["Do you use AI to write the articles?", "We use AI tools for research support and workflow efficiency. The argument, structure and final wording are written and edited by a person, and every claim is checked against its source before it goes in."],
  ["What do you need from us to start?", "A topic or an existing article, who it is for, and anything proprietary you want us to cite. For an Article Check, one URL is enough."],
  ["How is pricing set?", "Every engagement is scoped to your goals and quoted after your Article Check. We do not publish a price list because the work varies with research depth, delivery format and the number of articles."],
  ["Is there a long contract?", "No. Monthly plans run month to month, with 14 days' written notice to stop. Terms are agreed in writing before any work starts."],
  ["Who owns the finished articles?", "You do. Ownership of the deliverables transfers to you once the final payment has cleared."],
];

// ---- pages -----------------------------------------------------------------

export function homeBodyHtml(seo) {
  const r = researchItems(seo);
  return wrap(`
  <section id="home">
    <img src="/profile.webp" alt="Portrait of Ashutosh Mahapatra" width="288" height="288" fetchpriority="high">
    <p>SEO, GEO and AEO articles for fintech and AI-security teams</p>
    <h1>Fintech and AI-security articles that rank, and get cited.</h1>
    <p>A boutique research-led writing studio. Every article is built for on-page SEO, GEO and AEO from the first draft, researched to primary sources, and delivered with the evidence behind each claim.</p>
    <p><a href="/contact">Get a free Article Check</a> <a href="#ledger">See the evidence</a></p>
    <p>Send one article. We verify its claims, review it for search and answer engines, and test whether AI engines cite it. A few per month.</p>
    <p>Ashutosh Mahapatra, Founder, Content Strategy &amp; Lead Writer</p>
    <p><a href="${LINKEDIN}">LinkedIn</a> <a href="mailto:${EMAIL}">${EMAIL}</a></p>
    <a href="${r[0].href}"><img src="${r[0].image}" alt="${r[0].thumbAlt}" width="800" height="450"><small>Latest research</small><span>${r[0].title}</span><p>${r[0].approach}</p></a>
  </section>

  <section id="build">
    <h2>What we do, at article level</h2>
    <p>Three things, done well. We do not do full-site audits or volume content.</p>
    <article><h3>On-page SEO, GEO &amp; AEO</h3><p>Search, generative-engine and answer-engine optimisation built into each article, not bolted on: intent-matched headings, answer-first blocks, Schema that mirrors the page, and refreshes for older articles that deserve to rank or be cited.</p><p><a href="/services#search">See how it works</a></p></article>
    <article><h3>Research-led articles</h3><p>Long-form articles researched to primary sources and written to a publishable standard, each with its on-page SEO, GEO and AEO already in place. Thought leadership and search-led pieces for fintech and AI-security buyers.</p><p><a href="/services#articles">See what is included</a></p></article>
    <article><h3>Content strategy</h3><p>Topic and angle strategy for your niche, a content calendar, and a brief for every article, so each one earns its place.</p><p><a href="/services#strategy">See what you get</a></p></article>
  </section>

  <section id="ledger">
    <h2>Every article ships with its source ledger.</h2>
    <p>The ledger lists each statistic in the article, its primary source, its date and what that source does and does not prove. Your readers, and your compliance team, can check it without trusting us.</p>
    <blockquote>CVE-2025-32711, better known as EchoLeak per the Aim Security researchers who found it, carries a CVSS score of 9.3, and Aim Security describes it as the first known zero-click attack on a major AI application. Source: <a href="https://nvd.nist.gov/vuln/detail/CVE-2025-32711">NIST National Vulnerability Database</a>.</blockquote>
    <h3>Normally, an article passes through four people</h3>
    <ol>
      <li>A writer delivers an article</li>
      <li>An SEO manager maps the meta tags and Schema markup</li>
      <li>A web developer formats the headings, codes the tables and builds the interactive elements</li>
      <li>A QA tester checks it on mobile</li>
    </ol>
    <h3>With us, one handoff</h3>
    <p>A finished article, with Schema built in and the ledger behind it, as a Google Doc or a fully coded page. Researched, written and checked by one team, so nothing is lost between roles.</p>
  </section>

  <section id="research">
    <h2>Research we published first</h2>
    <p>Independent research samples, not client work. Each is written the way we would deliver it for a client, with its sources in view.</p>
${r.slice(0, 3).map((i) => `    <article><h3><a href="${i.href}">${i.title}</a></h3><p>${i.meta}</p><p>${i.problem}</p></article>`).join("\n")}
    <p><a href="/research">See all research</a> <a href="/research#audit">How we audited our own site</a></p>
  </section>

  <section id="fit">
    <h2>Who this is for</h2>
    <p>We would rather be the right fit for a few teams than a loose fit for many.</p>
    <h3>Built for</h3>
    ${list(["Fintech, payments and AI-security teams", "B2B SaaS companies selling into those markets", "Teams where a wrong number in an article is a liability", "A content or marketing lead who needs articles an expert, or a compliance team, will read closely"])}
    <h3>Not for</h3>
    ${list(["Full-site SEO audits or technical SEO programmes. We work at article level", "Volume content or bulk listicles", "Guaranteed rankings or guaranteed AI citations. We test and report, and never promise", "Articles written without sources"])}
    <h3>One article</h3><p>A single finished article and its ledger. The simplest way to see the whole workflow.</p>
    <h3>A series</h3><p>Four or more connected articles built around one topic, so they support each other.</p>
    <h3>A programme</h3><p>New articles every month plus quarterly re-verification of the ones already live.</p>
    <p>Every engagement is scoped to your goals and quoted after your Article Check. Monthly plans run month to month, with 14 days&rsquo; notice. We are taking on a small number of founding clients, with terms agreed in writing before any work starts.</p>
  </section>
${close}`);
}

export function servicesBodyHtml() {
  return wrap(`
  <h1>On-page SEO, GEO and AEO, built into research-led articles.</h1>
  <p>Three services and one free way to start, all at article level. Fintech, payments and AI-security teams are our focus.</p>
${serviceBlocks.map((b) => `  <section id="${b.id}">\n    <h2>${b.title}</h2>\n    <p>${b.lede}</p>\n    <h3>What you get</h3>\n    ${list(b.get)}\n    <p>${b.note}</p>\n  </section>`).join("\n")}
  <section>
    <h2>The techniques behind the work</h2>
    <article><h3>On-page SEO</h3>${list(["Search-intent and SERP analysis for the article", "Title, H1 and heading architecture", "Internal links and canonical set for the article", "Fast, accessible HTML/CSS when you want a coded page", "Refreshes of articles that already rank"])}</article>
    <article><h3>GEO: generative engine optimization</h3>${list(["Primary-source research with dates, sample sizes and stated limits", "An original angle that adds information other pages lack", "Author and entity signals: byline, author page, Person schema", "Crawlable raw HTML for AI search bots", "Citation checks across ChatGPT, Perplexity, Gemini and Claude"])}</article>
    <article><h3>AEO: answer engine optimization</h3>${list(["Answer-first blocks under every question heading", "FAQ and definition structure for snippets and People Also Ask", "Schema.org JSON-LD that mirrors the visible page", "Tables and step lists in extractable formats"])}</article>
  </section>
  <section>
    <h2>Questions, answered</h2>
${faqs.map(([q, a]) => `    <h3>${q}</h3><p>${a}</p>`).join("\n")}
  </section>
${close}`);
}

export function methodBodyHtml() {
  return wrap(`
  <h1>How a source-verified article gets made.</h1>
  <p>Research comes first and writing second. Every article ships with a ledger, so the evidence travels with the work.</p>
  <section>
    <h2>Five steps, from brief to handoff</h2>
    <ol>
      <li><h3>Brief &amp; Audience</h3><p>Understand the business, reader, search intent and desired outcome</p></li>
      <li><h3>Research &amp; Verification</h3><p>Gather primary sources and verify important claims before drafting</p></li>
      <li><h3>SEO, GEO &amp; AEO Architecture</h3><p>Build the article around search intent, information hierarchy and the strongest original angle</p></li>
      <li><h3>Writing &amp; Refinement</h3><p>Write, edit, tighten and test the argument for clarity and flow</p></li>
      <li><h3>Delivery &amp; Handoff</h3><p>Deliver the finished article, source list, SEO structure and useful implementation notes</p></li>
    </ol>
  </section>
  <section>
    <h2>The source ledger standard</h2>
    <p>Each entry in the ledger carries six fields, so an editor can check any claim in under a minute.</p>
    ${list(["The claim, exactly as it appears in the article", "The primary source, with a link", "The date of that source", "What the source proves", "What it does not prove, stated as a limit", "The date we last verified it"])}
  </section>
  <section>
    <h2>What we test instead of promising</h2>
    <p>We never guarantee rankings or citations. We test four things and report what we see.</p>
    <h3>Claims</h3><p>Every statistic, date and quote is checked against its source before it goes in.</p>
    <h3>Structure</h3><p>Schema.org JSON-LD mirrors what is visible in the article, nothing more and nothing less.</p>
    <h3>Citations</h3><p>A fixed set of prompts is asked across ChatGPT, Perplexity, Gemini and Claude, with the engine, prompt and date recorded. AI answers vary between runs, so we report misses as well as hits.</p>
    <h3>Crawlability</h3><p>The raw HTML contains the content, because most AI crawlers do not run JavaScript.</p>
    <p>We use AI tools for research support and workflow efficiency. The argument, structure and final decisions stay with a person.</p>
  </section>
${close}`);
}

export function workBodyHtml(seo) {
  const r = researchItems(seo);
  return wrap(`
  <h1>Four articles, written the way we would write yours.</h1>
  <p>Self-directed writing samples in fintech and AI security. None was commissioned: each was written without a client brief, built with on-page SEO, GEO and AEO, and sourced to primary documents, so you can judge the work before you brief us.</p>
  <section id="portfolio">
    <h2>Selected work</h2>
    <p>Each sample shows the problem it took on, how it was researched, and what it demonstrates. Open the article to read it in full.</p>
${r.map((i) => `    <article><h3><a href="${i.href}">${i.title}</a></h3><p>${i.meta}</p><p><b>Problem: </b>${i.problem}</p><p><b>Approach: </b>${i.approach}</p><p><b>Demonstrates: </b>${i.demonstrates}</p></article>`).join("\n")}
  </section>
  <section>
    <h2>See the research behind the work.</h2>
    <p>The Research page lists every article we have published, and shows how we audited our own site for AI-crawler visibility.</p>
    <p><a href="/research">See the research</a> <a href="/author/ashutosh-mahapatra">Read the author page</a></p>
  </section>
${close}`);
}

export function researchBodyHtml(seo) {
  const r = researchItems(seo);
  return wrap(`
  <h1>Independent articles, researched like client work.</h1>
  <p>Fintech and AI-security articles written without a client brief. Each one is sourced to primary documents, built with on-page SEO, GEO and AEO, and written as we would deliver it for you.</p>
  <section id="portfolio">
    <h2>Featured research</h2>
${r.map((i) => `    <article><h3><a href="${i.href}">${i.title}</a></h3><p>${i.meta}</p><p><b>Problem: </b>${i.problem}</p><p><b>Approach: </b>${i.approach}</p><p><b>Demonstrates: </b>${i.demonstrates}</p></article>`).join("\n")}
  </section>
  <section id="audit">
    <h2>An article that AI crawlers cannot read cannot be cited.</h2>
    <p>Our site is built with React. When we fetched it the way most AI crawlers do, with a plain request that does not run JavaScript, it came back as an empty shell: no headline and no article text.</p>
    <p>Google still indexed it, because Googlebot renders JavaScript. Most AI crawlers do not. So the articles ranked, and the engines that answer questions could not see them.</p>
    <p><strong>The fix.</strong> Every page now ships as real HTML, generated at build time, and the build fails if any page comes out empty. Each article also has one canonical address, and the sitemap carries last-modified dates.</p>
    <p>We have not yet measured the effect on AI citations. When we have, we will publish the result here, including if it is zero.</p>
    <p>Check it yourself: <code>curl -s https://ashutoshwrites.online/ | grep -c "Fintech and AI-security articles that rank"</code>. This is the same check we run on your article in a free Article Check.</p>
    <p><a href="/contact">Get a free Article Check</a></p>
  </section>
  <section>
    <h2>All articles</h2>
    <ul>
${ARTICLE_KEYS.map((key) => `      <li><a href="${articlePath(seo, key)}">${seo.routes[key].title}</a></li>`).join("\n")}
    </ul>
  </section>
${close}`);
}

export function aboutBodyHtml() {
  return wrap(`
  <h1>The editors behind the articles.</h1>
  <p>Ashutosh Mahapatra leads a three-person writing and engineering team in Bhubaneswar, India. Read his <a href="/author/ashutosh-mahapatra">author page</a> for the full article archive.</p>
  <section>
    <h2>Research first. Writing second.</h2>
    <p>I am Ashutosh, founder of Ashutosh Writes, a three-person writing and engineering team in Bhubaneswar, India. We write source-verified articles for fintech and AI-security teams.</p>
    <p>I specialize in long-form articles built on understanding the subject, finding reliable evidence, identifying what existing coverage misses, and turning that research into something people can actually understand.</p>
    <p>I use AI where it improves research and workflow efficiency, but the argument, judgment, structure and final decisions remain mine.</p>
    ${list(["Articles built around search intent and the questions AI engines answer", "Answer-first headings, extractable facts and Schema that mirrors the page", "Original research, primary sources, and stated limits on every claim", "Judgment and final decisions made by a human editor"])}
  </section>
  <section>
    <h2>Our Team</h2>
    <p>Research and writing direction from the founder. Front-end engineering and technical SEO from the specialists who build every page.</p>
    <article><h3>Ashutosh Mahapatra</h3><p>Founder. Content Strategy &amp; Lead Writer.</p><p>Writer and overall architect of every engagement. Leads the research, strategy and writing direction, and owns the final edit.</p></article>
    <article><h3>Amlan Udaya Sarangi</h3><p>Lead Front-End Developer. Custom HTML/CSS, UI/UX Design &amp; Responsive Web Engineering.</p></article>
    <article><h3>Soubhagya Ranjan Rout</h3><p>Technical SEO Specialist. Schema.org JSON-LD, Structured Data Architecture &amp; On-Page SEO.</p></article>
  </section>
${close}`);
}

export function contactBodyHtml() {
  return wrap(`
  <h1>Send us one article.</h1>
  <p>We check every claim in it and test whether AI engines cite it. A few each month, each one done by hand.</p>
  <h2>What you get</h2>
  ${list(["Every statistic, date and quote checked against primary sources", "A test of whether AI engines cite the article, with prompts and dates recorded", "A check that your Schema matches the visible article", "A one-page written report, yours to keep"])}
  <h2>Prefer email?</h2>
  <p>Send the link to your article to <a href="mailto:${EMAIL}">${EMAIL}</a> and we will take it from there. You can also find us on <a href="${LINKEDIN}">LinkedIn</a>.</p>`);
}

export function authorBodyHtml(seo) {
  const items = ARTICLE_KEYS.map((key) => `<a href="${articlePath(seo, key)}">${seo.routes[key].title}</a>`);
  return wrap(`
  <h1>Ashutosh Mahapatra</h1>
  <p>Writer covering AI, fintech and cybersecurity, with on-page SEO, GEO and AEO built into every article</p>
  <p>I write long-form, research-backed articles about technology and money for readers who are tired of recycled takes. My work starts with primary sources (filings, CVEs, vendor documentation, published research) and ends with an argument a specialist can read without wincing.</p>
  <p>I use AI where it helps with research and workflow, but the argument, structure and final wording are mine.</p>
  <p>I work with founders, marketing leads, and content teams who need writing that holds up in front of an expert audience.</p>
  <p><a href="${LINKEDIN}">LinkedIn</a> <a href="mailto:${EMAIL}">Email</a></p>
  <section>
    <h2>What I cover</h2>
    <article><h3>Artificial intelligence</h3><p>How AI systems change work, money and trust, beyond the launch cycle.</p></article>
    <article><h3>Cybersecurity</h3><p>Threat models teams live with: identity, OAuth scope, agent permissions, and shadow adoption.</p></article>
    <article><h3>Business &amp; fintech</h3><p>Personal finance, B2B SaaS economics, and the incentives behind product decisions.</p></article>
  </section>
  <section>
    <h2>Articles by Ashutosh Mahapatra</h2>
    ${list(items)}
  </section>`);
}

export function legalBodyHtml(page) {
  return wrap(`
  <h1>${page.title}</h1>
  <p>${page.intro}</p>
  <p>Last updated: ${page.updated}</p>
  ${page.bodyHtml}
  <p>Questions about this page? <a href="mailto:${EMAIL}">${EMAIL}</a></p>`);
}