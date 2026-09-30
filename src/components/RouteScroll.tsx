import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Restores what the browser did for free when every link was a full page load:
 * - new page  -> start at the top
 * - /#section -> land on that section (from another page, jump to top first, then glide)
 * - back/forward -> leave scrolling to the browser
 */
const RouteScroll = () => {
  const { key, pathname, hash } = useLocation();
  const navType = useNavigationType();
  const isFirst = useRef(true);
  const prevPath = useRef(pathname);

  useLayoutEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;

    if (isFirst.current) {
      isFirst.current = false;
      prevPath.current = pathname;
      target?.scrollIntoView();
      return;
    }
    if (navType === "POP") {
      prevPath.current = pathname;
      return;
    }
    if (!target || prevPath.current !== pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    target?.scrollIntoView();
    prevPath.current = pathname;
  }, [key, pathname, hash, navType]);

  return null;
};

export default RouteScroll;
