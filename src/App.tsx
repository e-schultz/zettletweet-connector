
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/zettle/:id" element={<Index />} /> {/* Placeholder for future implementation */}
          <Route path="/graph" element={<Index />} /> {/* Placeholder for future implementation */}
          <Route path="/explore" element={<Index />} /> {/* Placeholder for future implementation */}
          <Route path="/tag/:tag" element={<Index />} /> {/* Placeholder for future implementation */}
          <Route path="/user/:username" element={<Index />} /> {/* Placeholder for future implementation */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
