"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import ScrollToTop from "@/components/ScrollToTop";
import ThemeController from "@/components/layout/ThemeController";
import { SessionProvider } from "next-auth/react";
import { GlobalSettings } from "@/lib/adminService";

export default function Providers({
  children,
  initialSettings
}: {
  children: React.ReactNode;
  initialSettings: GlobalSettings | null | undefined;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <TooltipProvider>
          <Sonner />
          <ScrollToTop />
          <ThemeController initialSettings={initialSettings} />
          {children}
        </TooltipProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
