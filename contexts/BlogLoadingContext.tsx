"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface BlogLoadingContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

const BlogLoadingContext = createContext<BlogLoadingContextType | null>(null);

interface BlogLoadingProviderProps {
  children: ReactNode;
}

export function BlogLoadingProvider({ children }: BlogLoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  return (
    <BlogLoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </BlogLoadingContext.Provider>
  );
}

export function useBlogLoading() {
  const context = useContext(BlogLoadingContext);
  if (!context) {
    throw new Error("useBlogLoading must be used within BlogLoadingProvider");
  }
  return context;
}
