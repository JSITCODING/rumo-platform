import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { copy, type Locale } from "./content";

export type ProfileDraft = {
  answers: string[];
  funding: boolean;
};

type RumoContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  c: (typeof copy)[Locale];
  inPlan: boolean;
  addToPlan: () => void;
  activeTask: boolean;
  startTask: () => void;
  profile: ProfileDraft;
  saveProfile: (profile: ProfileDraft) => void;
};

const RumoContext = createContext<RumoContextValue | null>(null);

function initialLocale(): Locale {
  if (typeof window === "undefined") return "pt";
  const saved = window.localStorage?.getItem?.("rumo.locale");
  return saved === "en" ? "en" : "pt";
}

function initialProfile(): ProfileDraft {
  const empty = { answers: Array<string>(7).fill(""), funding: true };
  if (typeof window === "undefined") return empty;
  try {
    const stored = window.sessionStorage?.getItem?.("rumo.profile.v1");
    if (!stored) return empty;
    const parsed = JSON.parse(stored) as Partial<ProfileDraft>;
    return {
      answers: Array.isArray(parsed.answers) && parsed.answers.length === 7 ? parsed.answers.map(String) : empty.answers,
      funding: typeof parsed.funding === "boolean" ? parsed.funding : true
    };
  } catch {
    return empty;
  }
}

export function RumoProvider({ children }: { children: ReactNode }) {
  const [locale, updateLocale] = useState<Locale>(initialLocale);
  const [inPlan, setInPlan] = useState(false);
  const [activeTask, setActiveTask] = useState(false);
  const [profile, updateProfile] = useState<ProfileDraft>(initialProfile);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: Locale) => {
    window.localStorage?.setItem?.("rumo.locale", next);
    updateLocale(next);
  };

  const saveProfile = (next: ProfileDraft) => {
    window.sessionStorage?.setItem?.("rumo.profile.v1", JSON.stringify(next));
    updateProfile(next);
  };

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      c: copy[locale],
      inPlan,
      addToPlan: () => setInPlan(true),
      activeTask,
      startTask: () => setActiveTask(true),
      profile,
      saveProfile
    }),
    [activeTask, inPlan, locale, profile]
  );

  return <RumoContext.Provider value={value}>{children}</RumoContext.Provider>;
}

export function useRumo() {
  const value = useContext(RumoContext);
  if (!value) throw new Error("useRumo must be used within RumoProvider");
  return value;
}
