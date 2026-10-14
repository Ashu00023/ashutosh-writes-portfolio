import LegalLayout from "@/components/LegalLayout";
import { EMAIL } from "@/data/site";

const TermsOfUse = () => (
  <LegalLayout
    title="Terms of Use"
    metaTitle="Terms of Use | Ashutosh Mahapatra"
    description="The terms that govern your use of ashutoshwrites.online: intellectual property, acceptable use, editorial disclaimer, payment, refund and revision terms, and limitation of liability."
    path="/terms-of-use"
    breadcrumbLabel="Terms of Use"
    updated="14 October 2026"
    intro="By browsing this website you agree to the terms below. If you do not agree with them, please stop using the site."
  >
    <h2>1. Acceptance of terms</h2>
    <p>
      These terms form an agreement between you and Ashutosh Mahapatra, the owner and operator of
      <strong> ashutoshwrites.online</strong>. Continued use of the site means you accept them, along with the{" "}
      <a href="/privacy-policy">Privacy Policy</a> and the disclaimer and payment terms in sections 11 and 12 below.
    </p>

    <h2>2. Intellectual property</h2>
    <p>
      All articles, writing samples, case-study framing, layouts, graphics, charts, and code on this site are my original
      work and are protected by copyright unless credited otherwise. The site name and logo are my marks.
    </p>

    <h2>3. Content ownership and permitted use</h2>
    <ul>
      <li>You may read, share links to, and quote short excerpts with clear attribution and a link back to the page.</li>
      <li>
        You may not republish, resell, syndicate, or reproduce full articles, in whole or in substantial part, without my
        written permission.
      </li>
      <li>
        You may not use content from this site to train, fine-tune, or benchmark machine-learning models for commercial
        purposes without written permission.
      </li>
      <li>
        Work produced for clients is governed by the separate agreement for that engagement; ownership transfers as
        stated in that agreement, not on this page.
      </li>
    </ul>

    <h2>4. Acceptable use</h2>
    <p>You agree not to:</p>
    <ul>
      <li>Attempt to gain unauthorised access to the site, its hosting, or any connected service.</li>
      <li>Interfere with the site's operation, including scraping at a rate that degrades availability.</li>
      <li>Submit false, misleading, unlawful, or abusive content through the Article Check form.</li>
      <li>Use the site to distribute malware, spam, or unsolicited commercial messages.</li>
    </ul>

    <h2>5. Enquiries and no automatic engagement</h2>
    <p>
      Submitting the Article Check form does not create a client relationship. A project begins only when scope, timeline, and
      fees are agreed in writing. Paid work is also covered by section 12 below.
    </p>

    <h2>6. Third-party links</h2>
    <p>
      Articles cite external sources and may link to third-party sites. Those sites are outside my control, and I am not
      responsible for their content, accuracy, or practices.
    </p>

    <h2>7. Limitation of liability</h2>
    <p>
      The site and its content are provided "as is" and "as available" without warranties of any kind, express or
      implied. To the fullest extent permitted by law, I am not liable for any indirect, incidental, consequential, or
      special damages, or for any loss of profit, data, or business, arising from your use of the site or reliance on its
      content.
    </p>

    <h2>8. Availability</h2>
    <p>
      I aim to keep the site available and accurate, but I may change, suspend, or remove any page or feature at any time
      without notice.
    </p>

    <h2>9. Changes to these terms</h2>
    <p>
      These terms may be revised from time to time. The revision date at the top of this page reflects the current
      version, and continued use after a change means you accept the revised terms.
    </p>

    <h2>10. Governing law</h2>
    <p>
      These terms are governed by the laws of India, and the courts of Odisha, India have exclusive jurisdiction over any
      dispute, without regard to conflict-of-law rules. Nothing here removes consumer rights you hold under the mandatory
      law of your own country of residence.
    </p>

    <h2 id="disclaimer">11. Disclaimer</h2>
    <p>
      <strong>Educational purpose only.</strong> Articles on this site cover finance, artificial intelligence,
      cybersecurity, and content strategy for a general audience. They are published for education and general
      information, not as instructions for your specific situation.
    </p>
    <p>
      <strong>No financial, legal, or professional advice.</strong> Nothing on this site constitutes financial,
      investment, tax, legal, security, or other professional advice, and no article creates a professional or advisory
      relationship. Before acting on anything you read here, consult a qualified professional who can review your
      circumstances. Any decision you make remains yours alone.
    </p>
    <p>
      <strong>Research, sourcing, and AI use.</strong> I use AI tools for research support and workflow efficiency. The
      argument, structure and final wording of each article are mine. I aim to trace statistics, quotes and technical
      claims back to primary or reputable secondary sources, and I cite them so you can check them yourself.
    </p>
    <p>
      <strong>Accuracy and timeliness.</strong> Data on AI, finance, and security changes quickly. Figures reflect the
      sources available at the time of writing and may be outdated by the time you read them. I make reasonable efforts
      to be accurate and complete, but I make no warranty to that effect, and I am not liable for any loss arising from
      errors, omissions, or reliance on this content.
    </p>
    <p>
      <strong>External links.</strong> Links to external research, tools, and reporting are provided for verification
      and further reading. I do not control those sites and do not endorse everything they publish.
    </p>
    <p>
      <strong>Portfolio samples.</strong> Writing samples shown here are self-directed pieces produced to demonstrate
      research depth, structure, and editorial craft. They are not sponsored, and they are not client deliverables
      unless explicitly stated.
    </p>
    <p>
      <strong>Advertising.</strong> This site does not currently display advertising. If that changes, this page and the
      Privacy Policy will be updated before any ads appear.
    </p>
    <p>Spotted an error worth correcting? Email the address in section 13 and I will review it.</p>

    <h2 id="payments">12. Payment, refund and revision terms</h2>
    <p>
      These terms apply to paid projects. Your written proposal or invoice may add project-specific terms, which take
      priority where they differ.
    </p>
    <p><strong>Fees and deposit</strong></p>
    <ul>
      <li>Fees are quoted in US dollars unless your written proposal says otherwise, and exclude any taxes that apply.</li>
      <li>A 50% deposit is due before work starts. The remaining 50% is due when the final draft is delivered, before final files are released.</li>
      <li>Monthly plans are invoiced at the start of each month.</li>
      <li>Work starts when the deposit has cleared and I have received your brief.</li>
    </ul>
    <p><strong>Revisions</strong></p>
    <ul>
      <li>Each deliverable includes 2 rounds of revisions, requested within 14 days of delivery.</li>
      <li>A round is one consolidated set of feedback on the agreed brief.</li>
      <li>Changes to the brief, topic, angle or target keyword after work starts are a new scope and are quoted separately.</li>
      <li>Extra rounds are billed at an agreed rate.</li>
      <li>If I do not hear from you within 14 days of delivery, the deliverable is treated as accepted.</li>
    </ul>
    <p><strong>Refunds</strong></p>
    <ul>
      <li>Before work starts: full refund of the deposit.</li>
      <li>After research or drafting has started: the deposit is not refundable, because the work has been done.</li>
      <li>After delivery: no refund once final files are released, unless I failed to deliver what the written scope describes. In that case I will fix it or refund the unfinished portion.</li>
      <li>If I miss an agreed deadline by more than 10 days without a delay on your side or an agreed change, you may cancel and receive a refund for work not yet delivered.</li>
      <li>Approved refunds are paid within 14 days, minus payment processor fees.</li>
    </ul>
    <p><strong>Cancellation.</strong> Either of us may cancel in writing. You pay for work completed up to the cancellation date. Monthly plans need 14 days' notice.</p>
    <p><strong>Ownership and portfolio use</strong></p>
    <ul>
      <li>Ownership of the deliverables transfers to you once the final payment has cleared.</li>
      <li>I may show completed work in my portfolio unless you ask me in writing, before work starts, not to.</li>
    </ul>
    <p><strong>Late payment.</strong> If an invoice is unpaid after 7 days, I may pause work. Final files are held until the invoice is paid in full.</p>
    <p><strong>Results, AI use and later changes</strong></p>
    <ul>
      <li>I do not guarantee rankings, traffic or conversions. Search results depend on factors I do not control.</li>
      <li>I use AI tools for research and workflow support. The writing and editorial decisions are mine.</li>
      <li>Coded pages are tested when delivered. I am not responsible for later changes to your site, hosting or third-party platforms.</li>
    </ul>
    <p>
      <strong>Disputes.</strong> Please contact me first at the address in section 13. I will respond within 5 working
      days. Unresolved disputes are governed by section 10 above.
    </p>

    <h2>13. Contact</h2>
    <p>
      Ashutosh Mahapatra:{" "}
      <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
    </p>
  </LegalLayout>
);

export default TermsOfUse;
