import LegalLayout from "@/components/LegalLayout";
import { EMAIL } from "@/data/site";

const PrivacyPolicy = () => (
  <LegalLayout
    title="Privacy Policy"
    metaTitle="Privacy Policy | Ashutosh Mahapatra"
    description="What personal data ashutoshwrites.online collects through its Article Check form, how it uses cookies and third-party fonts, which service providers handle your data, how long it is kept, and your privacy rights."
    path="/privacy-policy"
    breadcrumbLabel="Privacy Policy"
    updated="14 October 2026"
    intro="This policy explains what personal data this website collects, why, who handles it, how long it is kept, and the choices you have."
  >
    <h2>1. Who is responsible for your data</h2>
    <p>
      This website (<strong>ashutoshwrites.online</strong>) is run by Ashutosh Mahapatra, an independent writer based in
      Bhubaneswar, Odisha, India. In this policy, "I", "me" and "my" mean Ashutosh Mahapatra, and "you" means anyone who
      visits the site or contacts me. I work with two collaborators, a front-end developer and a technical SEO
      specialist, who may see enquiry details when a project needs them.
    </p>

    <h2>2. What I collect</h2>
    <ul>
      <li>
        <strong>Article Check form:</strong> your name, work email address and the link to the article you want
        checked. Optional fields are your company and any extra context you choose to add.
      </li>
      <li>
        <strong>Messages:</strong> anything you send me by email or LinkedIn, together with the
        contact details those platforms show me.
      </li>
      <li>
        <strong>Technical data:</strong> the hosting provider processes your IP address, browser type and the pages you
        request in server logs, so the site can be delivered and kept secure.
      </li>
    </ul>
    <p>
      This site does not use analytics, advertising or tracking tools, and it does not take payments, so I never see
      payment card details here.
    </p>

    <h2>3. Why I use your data</h2>
    <ul>
      <li>To reply to your request, run the Article Check and prepare a proposal if you ask for one.</li>
      <li>To deliver the work and manage invoices if you hire me.</li>
      <li>To keep records that tax and accounting law require.</li>
      <li>To keep the site secure and working, which is my legitimate interest.</li>
    </ul>
    <p>I do not sell your personal data and I do not use it for advertising.</p>

    <h2>4. Who handles your data</h2>
    <ul>
      <li><strong>Vercel</strong> hosts and delivers the website.</li>
      <li><strong>Supabase</strong> stores enquiry form submissions in an access-restricted database.</li>
      <li><strong>Resend</strong> delivers form submissions to my inbox by email.</li>
      <li>
        <strong>Fontshare</strong> serves the fonts on the main pages, and <strong>Google Fonts</strong> serves fonts
        on some article pages. Your IP address reaches these services when a page loads.
      </li>
      <li>My two collaborators, only when a project needs them, and under a duty of confidentiality.</li>
    </ul>
    <p>
      If you contact me through LinkedIn, that platform's own privacy policy also applies to the conversation.
    </p>

    <h2 id="cookies">5. Cookies, local storage and fonts</h2>
    <p>
      This site does not set cookies for analytics, advertising or tracking. It stores one small value in your
      browser's local storage, <strong>aw:consent-v1</strong>, to remember that you accepted these policies so the
      notice does not appear on every page. It is strictly necessary for that purpose, it is never sent to a server,
      and you can clear it in your browser settings at any time.
    </p>
    <ul>
      <li>
        <strong>Third-party fonts:</strong> the main pages load fonts from Fontshare, and some article pages load fonts
        from Google Fonts. These services receive your IP address and browser details when a page loads. See their own
        privacy policies for how they handle that data.
      </li>
      <li>
        <strong>External links:</strong> links to sites such as LinkedIn take you away from this site. Those sites may
        set their own cookies once you visit them, under their own policies.
      </li>
      <li>
        <strong>Your browser controls:</strong> you can block or delete cookies in your browser settings at any time.
        Doing so will not affect how this site works.
      </li>
    </ul>
    <p>
      If I add analytics, advertising or any other tool that uses cookies, I will add a consent choice and update this
      page before those tools load.
    </p>

    <h2>6. How long I keep your data</h2>
    <ul>
      <li>Enquiry form submissions are deleted from the database after 12 months.</li>
      <li>If we work together, the agreement and invoices are kept separately for as long as tax and accounting law require.</li>
      <li>Emails are kept for as long as the conversation or project needs them.</li>
    </ul>
    <p>You can ask me to delete your data earlier at any time.</p>

    <h2>7. Transfers outside your country</h2>
    <p>
      My service providers may process data on servers outside India and outside your country, including in the
      United States and the European Union. Where the law requires safeguards for such transfers, I rely on the
      contractual terms my providers offer.
    </p>

    <h2>8. Your rights</h2>
    <p>
      Depending on where you live, including under India's Digital Personal Data Protection Act 2023, the GDPR and the
      UK GDPR, you may have the right to:
    </p>
    <ul>
      <li>ask what personal data I hold about you and get a copy;</li>
      <li>have inaccurate data corrected or completed;</li>
      <li>have your data erased;</li>
      <li>object to or restrict how I use it, and withdraw consent you have given;</li>
      <li>complain to your local data protection authority.</li>
    </ul>
    <p>
      To use any of these rights, or to raise a privacy grievance, email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. I aim to respond within 30 days.
    </p>

    <h2>9. Security</h2>
    <p>
      The site is served over HTTPS and enquiry data sits in an access-restricted database. No system is completely
      secure, so I cannot guarantee absolute security.
    </p>

    <h2>10. Children</h2>
    <p>This site is not directed at anyone under 18, and I do not knowingly collect their personal data.</p>

    <h2>11. Changes to this policy</h2>
    <p>
      If I change how I handle personal data, I will update this page and its "Last updated" date. If I add analytics
      or advertising, I will update this policy first.
    </p>

    <h2>12. Contact</h2>
    <p>
      Ashutosh Mahapatra, Bhubaneswar, Odisha, India.{" "}
      <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
    </p>
  </LegalLayout>
);

export default PrivacyPolicy;
