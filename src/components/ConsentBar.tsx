import { useEffect, useState } from "react";

const TERMS_KEY = "aw:consent-v1";
const ANALYTICS_KEY = "aw:analytics-v1";

declare global {
  interface Window { awAnalytics?: { grant: () => void; deny: () => void } }
}

const ConsentBar = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(ANALYTICS_KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  const choose = (allow: boolean) => {
    try { localStorage.setItem(TERMS_KEY, new Date().toISOString()); } catch { /* blocked */ }
    if (allow) window.awAnalytics?.grant(); else window.awAnalytics?.deny();
    setShow(false);
  };

  return (
    <div className="st-consent" role="region" aria-label="Analytics and privacy notice">
      <p>
        I use Google Analytics (cookies) to see which articles get read. Nothing loads until you choose. By continuing
        you accept the <a href="/terms-of-use">Terms of Use</a> and the <a href="/privacy-policy">Privacy Policy</a>.
      </p>
      <button type="button" onClick={() => choose(true)}>Accept analytics</button>
      <button type="button" onClick={() => choose(false)}>No thanks</button>
    </div>
  );
};

export default ConsentBar;