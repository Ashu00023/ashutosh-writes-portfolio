import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import RouteScroll from "@/components/RouteScroll";
import ConsentBar from "@/components/ConsentBar";
const Services = lazy(() => import("./pages/Services.tsx"));
const Method = lazy(() => import("./pages/Method.tsx"));
const Work = lazy(() => import("./pages/Work.tsx"));
const Research = lazy(() => import("./pages/Research.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const Author = lazy(() => import("./pages/Author.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy.tsx"));
const TermsOfUse = lazy(() => import("./pages/legal/TermsOfUse.tsx"));

/** Work and Research open on the black stage, so the loading fallback is black there too and never flashes cream. */
const STAGE_PATHS = ["/work", "/research"];
const RouteFallback = () => {
  const { pathname } = useLocation();
  const onStage = STAGE_PATHS.includes(pathname.replace(/\/+$/, ""));
  return <div style={{ minHeight: "100vh", background: onStage ? "var(--stage)" : "hsl(70 15% 92%)" }} />;
};

const App = () => (
  <TooltipProvider>
    <BrowserRouter>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:text-foreground focus:shadow-lg">Skip to main content</a>
      <RouteScroll />
      <Suspense fallback={<RouteFallback />}>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/method" element={<Method />} />
            <Route path="/work" element={<Work />} />
            <Route path="/research" element={<Research />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/author/ashutosh-mahapatra" element={<Author />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            {/* Retired pages. The real 301s live in vercel.json; these cover in-app navigation and local dev. */}
            <Route path="/blog" element={<Navigate to="/research" replace />} />
            <Route path="/cookie-policy" element={<Navigate to="/privacy-policy#cookies" replace />} />
            <Route path="/disclaimer" element={<Navigate to="/terms-of-use#disclaimer" replace />} />
            <Route path="/refund-policy" element={<Navigate to="/terms-of-use#payments" replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Suspense>
      <ConsentBar />
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
