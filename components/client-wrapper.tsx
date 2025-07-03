"use client";

import { useEffect, type ReactNode } from "react";
import PremiumPageTransitions from "./premium-page-transitions"; // Use the updated version

interface ClientWrapperProps {
  children: ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  // Restore opacity and clear visual bugs on hydration
  useEffect(() => {
    const restoreOpacity = () => {
      document.body.style.opacity = "1";
      document.documentElement.style.opacity = "1";
      document.body.style.filter = "none";
      document.body.style.transform = "none";
    };

    restoreOpacity();
    const interval = setInterval(() => {
      if (document.body.style.opacity !== "1") restoreOpacity();
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ opacity: 1, minHeight: "100vh", position: "relative" }}>
      <PremiumPageTransitions>{children}</PremiumPageTransitions>
    </div>
  );
}
