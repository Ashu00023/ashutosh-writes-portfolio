import LegalLayout from "@/components/LegalLayout";

const RefundPolicy = () => (
  <LegalLayout
    title="Payment, Refund and Revision Policy"
    metaTitle="Payment, Refund and Revision Policy | Ashutosh Mahapatra"
    description="Deposits, payment schedule, revision rounds, refunds and cancellation for paid projects with Ashutosh Writes."
    path="/refund-policy"
    breadcrumbLabel="Refund Policy"
    updated="3 October 2026"
    intro="These terms apply to paid projects. Your written proposal or invoice may add project-specific terms, which take priority where they differ."
  >
    <h2>1. Fees and deposit</h2>
    <ul>
      <li>Fees are quoted in US dollars unless your written proposal says otherwise, and exclude any taxes that apply.</li>
      <li>A 50% deposit is due before work starts. The remaining 50% is due when the final draft is delivered, before final files are released.</li>
      <li>Monthly plans are invoiced at the start of each month.</li>
      <li>Work starts when the deposit has cleared and I have received your brief.</li>
    </ul>

    <h2>2. Revisions</h2>
    <ul>
      <li>Each deliverable includes 2 rounds of revisions, requested within 14 days of delivery.</li>
      <li>A round is one consolidated set of feedback on the agreed brief.</li>
      <li>Changes to the brief, topic, angle or target keyword after work starts are a new scope and are quoted separately.</li>
      <li>Extra rounds are billed at an agreed rate.</li>
      <li>If I do not hear from you within 14 days of delivery, the deliverable is treated as accepted.</li>
    </ul>

    <h2>3. Refunds</h2>
    <ul>
      <li>Before work starts: full refund of the deposit.</li>
      <li>After research or drafting has started: the deposit is not refundable, because the work has been done.</li>
      <li>After delivery: no refund once final files are released, unless I failed to deliver what the written scope describes. In that case I will fix it or refund the unfinished portion.</li>
      <li>If I miss an agreed deadline by more than 10 days without a delay on your side or an agreed change, you may cancel and receive a refund for work not yet delivered.</li>
      <li>Approved refunds are paid within 14 days, minus payment processor fees.</li>
    </ul>

    <h2>4. Cancellation</h2>
    <p>
      Either of us may cancel in writing. You pay for work completed up to the cancellation date. Monthly plans need 14
      days' notice.
    </p>

    <h2>5. Ownership and portfolio use</h2>
    <ul>
      <li>Ownership of the deliverables transfers to you once the final payment has cleared.</li>
      <li>I may show completed work in my portfolio unless you ask me in writing, before work starts, not to.</li>
    </ul>

    <h2>6. Late payment</h2>
    <p>
      If an invoice is unpaid after 7 days, I may pause work. Final files are held until the invoice is paid in full.
    </p>

    <h2>7. Results, AI use and later changes</h2>
    <ul>
      <li>I do not guarantee rankings, traffic or conversions. Search results depend on factors I do not control.</li>
      <li>I use AI tools for research and workflow support. The writing and editorial decisions are mine.</li>
      <li>Coded pages are tested when delivered. I am not responsible for later changes to your site, hosting or third-party platforms.</li>
    </ul>

    <h2>8. Disputes and governing law</h2>
    <p>
      Please contact me first at <a href="mailto:ashutosh@mail.ashutoshwrites.online">ashutosh@mail.ashutoshwrites.online</a>. I will respond within 5 working days. Unresolved disputes are governed by the
      laws of India, and the courts of Odisha, India, as set out in the <a href="/terms-of-use">Terms of Use</a>.
    </p>
  </LegalLayout>
);

export default RefundPolicy;