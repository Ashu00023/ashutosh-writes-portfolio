import { useEffect, useState } from "react";
import logo from "@/assets/logo-new.png";

const SplashScreen = () => {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("splash-seen");
  });
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const fadeTimer = setTimeout(() => setFading(true), 700);
    const removeTimer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("splash-seen", "1");
    }, 1100);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <img
        src={logo}
        alt="Logo"
        className="h-28 w-28 md:h-36 md:w-36 object-contain animate-scale-in"
      />
    </div>
  );
};

export default SplashScreen;