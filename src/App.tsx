import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import HumanCreativityVsAi from "./pages/blog-posts/HumanCreativityVsAi.tsx";
import AiPersonalFinance2026 from "./pages/blog-posts/AiPersonalFinance2026.tsx";
import SalaryTrap from "./pages/scripts/SalaryTrap.tsx";
import PredictionDrug from "./pages/scripts/PredictionDrug.tsx";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
        <Route path="/blog/human-creativity-vs-ai-authenticity-premium-2026" element={<HumanCreativityVsAi />} />
        <Route path="/blog/ai-personal-finance-2026" element={<AiPersonalFinance2026 />} />
        <Route path="/scripts/salary-trap" element={<SalaryTrap />} />
        <Route path="/scripts/prediction-is-the-drug" element={<PredictionDrug />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
