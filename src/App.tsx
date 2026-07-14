import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
const HumanCreativityVsAi = lazy(() => import("./pages/blog-posts/HumanCreativityVsAi.tsx"));
const AiPersonalFinance2026 = lazy(() => import("./pages/blog-posts/AiPersonalFinance2026.tsx"));
const SalaryTrap = lazy(() => import("./pages/scripts/SalaryTrap.tsx"));
const PredictionDrug = lazy(() => import("./pages/scripts/PredictionDrug.tsx"));
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div style={{ minHeight: "100vh", background: "#0d0c0a" }} />}>
          <Routes>
          <Route path="/" element={<Index />} />
        <Route path="/blog/human-creativity-vs-ai-authenticity-premium-2026" element={<HumanCreativityVsAi />} />
        <Route path="/blog/ai-personal-finance-2026" element={<AiPersonalFinance2026 />} />
        <Route path="/scripts/salary-trap" element={<SalaryTrap />} />
        <Route path="/scripts/prediction-is-the-drug" element={<PredictionDrug />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
