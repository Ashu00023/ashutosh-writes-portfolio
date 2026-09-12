import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
const Blog = lazy(() => import("./pages/Blog.tsx"));
const Work = lazy(() => import("./pages/Work.tsx"));
const Author = lazy(() => import("./pages/Author.tsx"));
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy.tsx"));
const TermsOfUse = lazy(() => import("./pages/legal/TermsOfUse.tsx"));
const CookiePolicy = lazy(() => import("./pages/legal/CookiePolicy.tsx"));
const Disclaimer = lazy(() => import("./pages/legal/Disclaimer.tsx"));
const HumanCreativityVsAi = lazy(() => import("./pages/blog-posts/HumanCreativityVsAi.tsx"));
const AiPersonalFinance2026 = lazy(() => import("./pages/blog-posts/AiPersonalFinance2026.tsx"));
const ByoaShadowAi = lazy(() => import("./pages/blog-posts/ByoaShadowAi.tsx"));
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div style={{ minHeight: "100vh", background: "hsl(60 10% 98%)" }} />}>
          <div className="bg-bloom min-h-screen">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/work" element={<Work />} />
            <Route path="/blog/human-creativity-vs-ai-authenticity-premium-2026" element={<HumanCreativityVsAi />} />
            <Route path="/blog/ai-personal-finance-2026" element={<AiPersonalFinance2026 />} />
            <Route path="/blog/byoa-shadow-ai-b2b-saas-2026" element={<ByoaShadowAi />} />
            <Route path="/author/ashutosh-mahapatra" element={<Author />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </div>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
