import LegalLayout from "@/components/LegalLayout";

const Disclaimer = () => (
  <LegalLayout
    title="Disclaimer"
    metaTitle="Disclaimer | Ashutosh Mahapatra"
    description="Editorial disclaimer for ashutoshwrites.online: content is educational, is not financial, legal, or professional advice, and how research and AI are used."
    path="/disclaimer"
    breadcrumbLabel="Disclaimer"
    updated="11 September 2026"
    intro="Everything published here is written to inform. It is not advice, and it should not be the only thing you rely on before making a decision."
  >
    <h2>1. Educational purpose only</h2>
    <p>
      Articles on this site cover finance, artificial intelligence, cybersecurity, and content strategy for a general
      audience. They are published for education and general information, not as instructions for your specific
      situation.
    </p>

    <h2>2. No financial, legal, or professional advice</h2>
    <p>
      Nothing on this site constitutes financial, investment, tax, legal, security, or other professional advice, and no
      article creates a professional or advisory relationship. Before acting on anything you read here, consult a
      qualified professional who can review your circumstances. Any decision you make remains yours alone.
    </p>

    <h2>3. Research, sourcing, and AI use</h2>
    <p>
      Every article is written by hand. Where AI tools help, they are used for structural research and SEO support — never
      to generate the text you read. Statistics, quotes, and technical claims are traced back to primary or reputable
      secondary sources, and sources are cited so you can check them yourself.
    </p>

    <h2>4. Accuracy and timeliness</h2>
    <p>
      Data on AI, finance, and security changes quickly. Figures reflect the sources available at the time of writing and
      may be outdated by the time you read them. I make reasonable efforts to be accurate and complete, but I make no
      warranty to that effect, and I am not liable for any loss arising from errors, omissions, or reliance on this
      content.
    </p>

    <h2>5. External links</h2>
    <p>
      Links to external research, tools, and reporting are provided for verification and further reading. I do not
      control those sites and do not endorse everything they publish.
    </p>

    <h2>6. Portfolio samples</h2>
    <p>
      Writing samples shown here are self-directed pieces produced to demonstrate research depth, structure, and
      editorial craft. They are not sponsored, and they are not client deliverables unless explicitly stated.
    </p>

    <h2>7. Advertising</h2>
    <p>
      Advertising, including Google AdSense, may appear on this site. Ads are served by third parties and are not
      editorial endorsements. Advertising never influences the content or conclusions of an article.
    </p>

    <h2>8. Contact</h2>
    <p>
      Spotted an error worth correcting? Email{" "}
      <a href="mailto:ashutosh@mail.ashutoshwrites.online">ashutosh@mail.ashutoshwrites.online</a> and I will review it.
    </p>
  </LegalLayout>
);

export default Disclaimer;
