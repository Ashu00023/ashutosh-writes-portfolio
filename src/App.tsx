import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
   import NotFound from "./pages/NotFound.tsx";
   import RouteScroll from "@/components/RouteScroll";
const Blog = lazy(() => import("./pages/Blog.tsx"));
const Work = lazy(() => import("./pages/Work.tsx"));
const Author = lazy(() => import("./pages/Author.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy.tsx"));
const TermsOfUse = lazy(() => import("./pages/legal/TermsOfUse.tsx"));
const CookiePolicy = lazy(() => import("./pages/legal/CookiePolicy.tsx"));
const Disclaimer = lazy(() => import("./pages/legal/Disclaimer.tsx"));
const RefundPolicy = lazy(() => import("./pages/legal/RefundPolicy.tsx"));

const App = () => (
  <TooltipProvider>
   <BrowserRouter>
         <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:text-foreground focus:shadow-lg">Skip to main content</a>
         <RouteScroll />
      <Suspense fallback={<div style={{ minHeight: "100vh", background: "hsl(70 15% 92%)" }} />}>
        <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/work" element={<Work />} />
          <Route path="/author/ashutosh-mahapatra" element={<Author />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;