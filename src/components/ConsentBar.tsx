import { useEffect, useState } from "react";

const KEY = "aw:consent-v1";

/** One-time, non-blocking notice. Content stays readable and crawlable; the choice is remembered on this device. */
const ConsentBar = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  const accept = () => {
    try {
      localStorage.setItem(KEY, new Date().toISOString());
    } catch {
      /* storage blocked: the notice simply shows again next visit */
    }
    setShow(false);
  };

  return (
    <div className="st-consent" role="region" aria-label="Terms and privacy notice">
      <p>
        This site sets no tracking cookies. By continuing you accept the <a href="/terms-of-use">Terms of Use</a> and the{" "}
        <a href="/privacy-policy">Privacy Policy</a>.
      </p>
      <button type="button" onClick={accept}>
        Accept
      </button>
    </div>
  );
};

export default ConsentBar;
