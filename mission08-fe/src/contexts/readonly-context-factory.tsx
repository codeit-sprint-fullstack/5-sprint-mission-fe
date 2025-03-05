"use client";

import { Article } from "@/types";
import { createContext, useContext, ReactNode } from "react";

export interface ContextType<T> {
  value: T;
}

export function createReadonlyContext<T>() {
  const context = createContext<ContextType<T> | undefined>(undefined);
  const Provider = ({ value, children }: { value: T; children: ReactNode }) => {
    return <context.Provider value={{ value }}>{children}</context.Provider>;
  };
  const useContextValue = () => {
    const contextValue = useContext(context);
    if (!contextValue) {
      throw new Error("useContextValue must be used within a Provider");
    }
    return contextValue;
  };
  return { Provider, useContextValue };
}

const ArticleContext = createReadonlyContext<Article>();
export const ArticleProvider = ArticleContext.Provider;
export const useArticle = ArticleContext.useContextValue;
