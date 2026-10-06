import LegalLayout from "@/components/LegalLayout";

const CookiePolicy = () => (
  <LegalLayout
    title="Cookie Policy"
    metaTitle="Cookie Policy | Ashutosh Mahapatra"
    description="ashutoshwrites.online sets no analytics or advertising cookies. This page explains third-party fonts, external links and your browser controls."
    path="/cookie-policy"
    breadcrumbLabel="Cookie Policy"
    updated="3 October 2026"
    intro="Cookies are small text files stored on your device. This page explains what this site does with them."
  >
    <h2>1. Cookies on this site</h2>
    <p>
      This site does not set cookies for analytics, advertising or tracking, and it does not currently set any cookies
      of its own. Because of that, there is no cookie consent banner.
    </p>

    <h2>2. Third-party fonts</h2>
    <p>
      The main pages load fonts from Fontshare, and some article pages load fonts from Google Fonts. These services
      receive your IP address and browser details when a page loads. See their own privacy policies for how they
      handle that data.
    </p>

    <h2>3. External links</h2>
    <p>
      Links to sites such as LinkedIn, Instagram and WhatsApp take you away from this site. Those sites may set their
      own cookies once you visit them, under their own policies.
    </p>

    <h2>4. Your browser controls</h2>
    <p>
      You can block or delete cookies in your browser settings at any time. Doing so will not affect how this site
      works.
    </p>

    <h2>5. If this changes</h2>
    <p>
      If I add analytics, advertising or any other tool that uses cookies, I will add a consent choice and update this
      page and the <a href="/privacy-policy">Privacy Policy</a> before those tools load.
    </p>
  </LegalLayout>
);

export default CookiePolicy;
