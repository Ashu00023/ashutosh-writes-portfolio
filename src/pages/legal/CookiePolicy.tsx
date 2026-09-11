import LegalLayout from "@/components/LegalLayout";

const CookiePolicy = () => (
  <LegalLayout
    title="Cookie Policy"
    metaTitle="Cookie Policy | Ashutosh Mahapatra"
    description="Which cookies ashutoshwrites.online uses — essential, analytics, and advertising — and how you can control them."
    path="/cookie-policy"
    breadcrumbLabel="Cookie Policy"
    updated="11 September 2026"
    intro="Cookies are small text files stored on your device. This page lists the categories used here and how to control each one."
  >
    <h2>1. Essential cookies</h2>
    <p>
      These keep the site working: remembering that you have already seen the intro animation in this browsing session,
      preserving form state while you type, and protecting the enquiry form against abuse. They store no advertising
      identifiers and cannot be switched off without breaking basic functionality.
    </p>

    <h2>2. Analytics cookies</h2>
    <p>
      These help me understand which articles are read, how visitors arrive, and where pages underperform. The data is
      aggregated and is not used to identify you personally. Blocking them does not affect your ability to read anything
      on the site.
    </p>

    <h2>3. Advertising cookies</h2>
    <p>
      This site may display advertising in future, including through Google AdSense. When advertising is active,
      third-party vendors — including Google — may set cookies to measure ad performance and to serve ads based on your
      prior visits to this and other websites. You can opt out of personalised advertising through{" "}
      <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
        Google Ads Settings
      </a>{" "}
      or{" "}
      <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">
        aboutads.info
      </a>
      .
    </p>

    <h2>4. Third-party cookies</h2>
    <p>
      Embedded or linked third-party services may set their own cookies when you interact with them. Those cookies are
      governed by the provider's own policy, not this one.
    </p>

    <h2>5. Consent</h2>
    <p>
      Where consent is legally required — for example in the EU, UK, and comparable jurisdictions — non-essential
      analytics and advertising cookies are set only after consent is given. This site is built so a consent banner can
      be enabled the moment advertising or region-gated analytics goes live, with your choice recorded and revocable at
      any time.
    </p>

    <h2>6. Controlling cookies in your browser</h2>
    <p>
      Every major browser lets you view, block, and delete cookies from its privacy or site-settings panel. Blocking all
      cookies may affect how some parts of this and other websites behave.
    </p>

    <h2>7. Changes and contact</h2>
    <p>
      This policy will be updated when the cookies in use change. For questions, email{" "}
      <a href="mailto:ashutosh@mail.ashutoshwrites.online">ashutosh@mail.ashutoshwrites.online</a>. See also the{" "}
      <a href="/privacy-policy">Privacy Policy</a>.
    </p>
  </LegalLayout>
);

export default CookiePolicy;
