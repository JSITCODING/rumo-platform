import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { copy, type Locale } from "./content";

type RumoContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  c: (typeof copy)[Locale];
  inPlan: boolean;
  addToPlan: () => void;
  activeTask: boolean;
  startTask: () => void;
};

const RumoContext = createContext<RumoContextValue | null>(null);

function initialLocale(): Locale {
  if (typeof window === "undefined") return "pt";
  const saved = window.localStorage?.getItem?.("rumo.locale");
  return saved === "en" ? "en" : "pt";
}

export function RumoProvider({ children }: { children: ReactNode }) {
  const [locale, updateLocale] = useState<Locale>(initialLocale);
  const [inPlan, setInPlan] = useState(false);
  const [activeTask, setActiveTask] = useState(false);

  const setLocale = (next: Locale) => {
    window.localStorage?.setItem?.("rumo.locale", next);
    document.documentElement.lang = next;
    updateLocale(next);
  };

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      c: copy[locale],
      inPlan,
      addToPlan: () => setInPlan(true),
      activeTask,
      startTask: () => setActiveTask(true)
    }),
    [activeTask, inPlan, locale]
  );

  return <RumoContext.Provider value={value}>{children}</RumoContext.Provider>;
}

export function useRumo() {
  const value = useContext(RumoContext);
  if (!value) throw new Error("useRumo must be used within RumoProvider");
  return value;
}
