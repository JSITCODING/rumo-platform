import {
  ArrowLeft,
  ArrowRight,
  Check,
  ClipboardText,
  Compass,
  FunnelSimple,
  House,
  ShieldCheck
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { NavLink, useNavigate } from "react-router-dom";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { INFO_STATE_SURFACE, INFO_STATE_TOKENS, type InfoState } from "./info-state";
import { useRumo } from "./state";

export function Brand({ compact = false }: { compact?: boolean }) {
  const { c } = useRumo();
  return (
    <NavLink to="/" className="group inline-flex items-center gap-2.5" aria-label={c.common.brand}>
      <RouteMark className="h-9 w-9 text-cobalt transition-transform group-hover:translate-x-0.5" />
      {!compact && <span className="font-display text-2xl font-semibold tracking-[-0.045em] text-ink">{c.common.brand}</span>}
    </NavLink>
  );
}

export function RouteMark({ className = "", animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <circle cx="10" cy="36" r="4" fill="currentColor" />
      <circle cx="38" cy="10" r="4" fill="currentColor" />
      <motion.path
        d="M10 32C11 20 19 28 23 19C27 10 31 18 36 12"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={animated ? { pathLength: 0, opacity: 0.4 } : false}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

export function LocaleToggle() {
  const { locale, setLocale, c } = useRumo();
  return (
    <div className="inline-flex items-center gap-1" role="group" aria-label={c.common.language}>
      {(["pt", "en"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLocale(option)}
          className={`relative min-h-11 min-w-11 px-2 text-sm font-extrabold uppercase tracking-[0.12em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt after:absolute after:inset-x-2 after:-bottom-0.5 after:h-0.5 after:origin-center after:bg-cobalt after:transition-transform ${
            locale === option ? "text-ink after:scale-x-100" : "text-muted after:scale-x-0 hover:text-ink"
          }`}
          aria-pressed={locale === option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export function PublicHeader() {
  return (
    <header className="flex items-center justify-between gap-4 px-5 py-5 sm:px-8 sm:py-7">
      <Brand />
      <LocaleToggle />
    </header>
  );
}

export function BackHeader({ title, action }: { title: string; action?: ReactNode }) {
  const { c } = useRumo();
  const navigate = useNavigate();
  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-5 py-5 sm:px-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label={c.common.back}
        className="inline-flex min-h-11 min-w-11 items-center gap-1.5 justify-self-start px-1 font-bold text-muted transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt"
      >
        <ArrowLeft size={20} aria-hidden="true" />
        <span className="hidden xs:inline">{c.common.back}</span>
      </button>
      <strong className="text-sm font-extrabold tracking-[-0.02em] text-ink sm:text-base">{title}</strong>
      <div className="justify-self-end">{action ?? <LocaleToggle />}</div>
    </header>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "quiet";
  full?: boolean;
};

export function Button({ children, variant = "primary", full = false, className = "", ...props }: ButtonProps) {
  const base =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 text-sm font-extrabold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt disabled:cursor-not-allowed disabled:opacity-50";
  const variants = {
    primary: "bg-cobalt text-white hover:bg-cobaltDark",
    secondary: "border border-line bg-transparent text-ink hover:border-ink/30 hover:bg-paper",
    quiet: "text-muted hover:bg-mist hover:text-ink"
  };
  return (
    <button className={`${base} ${variants[variant]} ${full ? "w-full" : ""} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function PageTransition({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.main
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.main>
  );
}

export function StateMarker({ state, className = "" }: { state: InfoState; className?: string }) {
  const { c } = useRumo();
  const token = INFO_STATE_TOKENS[state];
  const label = c.common.infoStates[state];
  return (
    <span
      className={`inline-flex min-h-7 items-center gap-2 text-[0.68rem] font-extrabold uppercase tracking-[0.08em] text-ink ${className}`}
      data-info-marker={state}
      data-marker-fill={token.markerFill}
      aria-label={label}
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true">
        <circle cx="8" cy="8" r="6" fill={state === "confirmed" ? token.stroke : INFO_STATE_SURFACE} stroke={token.stroke} strokeWidth="2" />
        {state === "estimated" ? <path d="M8 2a6 6 0 0 0 0 12Z" fill={token.stroke} /> : null}
      </svg>
      <span>{label}</span>
    </span>
  );
}

export function StateLine({ state, className = "" }: { state: InfoState; className?: string }) {
  const { c } = useRumo();
  const token = INFO_STATE_TOKENS[state];
  const label = c.common.infoStates[state];
  return (
    <span className={`block min-w-0 text-center ${className}`} data-info-line={state} aria-label={label}>
      <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="h-2.5 w-full" aria-hidden="true">
        <line
          x1="0"
          y1="5"
          x2="100"
          y2="5"
          stroke={token.stroke}
          strokeWidth="2"
          strokeDasharray={token.lineDasharray}
          strokeLinecap="round"
        />
      </svg>
      <span className="mt-1 block truncate text-[0.5rem] font-extrabold uppercase tracking-[0.08em] text-muted sm:text-[0.6rem]">
        {label}
      </span>
    </span>
  );
}

export function Notice({ title, children, tone = "neutral" }: { title: string; children: ReactNode; tone?: "neutral" | "warm" }) {
  return (
    <aside className={`border-l-2 p-5 ${tone === "warm" ? "border-sun bg-cream" : "border-cobalt bg-mist"}`}>
      <div className="mb-2 flex items-center gap-2 text-sm font-extrabold text-ink">
        <ShieldCheck size={20} weight="fill" className="text-cobalt" aria-hidden="true" />
        {title}
      </div>
      <div className="text-sm leading-6 text-muted">{children}</div>
    </aside>
  );
}

export function AppShell({ children, active }: { children: ReactNode; active?: "home" | "discover" | "plan" }) {
  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <div className="mx-auto min-h-dvh max-w-5xl bg-canvas pb-24">
        {children}
      </div>
      {active ? <BottomNav active={active} /> : null}
    </div>
  );
}

function BottomNav({ active }: { active: "home" | "discover" | "plan" }) {
  const { c } = useRumo();
  const links = [
    { id: "home", to: "/dashboard", label: c.common.home, icon: House },
    { id: "discover", to: "/discover", label: c.common.discover, icon: Compass },
    { id: "plan", to: "/plan", label: c.common.plan, icon: ClipboardText }
  ] as const;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-paper/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl"
      aria-label={c.common.language === "Language" ? "Primary navigation" : "Navegação principal"}
    >
      <div className="mx-auto grid max-w-lg grid-cols-3 gap-2">
        {links.map((link) => {
          const Icon = link.icon;
          const selected = active === link.id;
          return (
            <NavLink
              key={link.id}
              to={link.to}
              className={`relative flex min-h-14 flex-col items-center justify-center gap-1 text-xs font-extrabold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt after:absolute after:inset-x-6 after:-bottom-1 after:h-0.5 after:bg-cobalt ${
                selected ? "text-ink after:scale-x-100" : "text-muted after:scale-x-0 hover:text-ink"
              }`}
              aria-current={selected ? "page" : undefined}
            >
              <Icon size={21} weight={selected ? "fill" : "regular"} aria-hidden="true" />
              {link.label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export function NextLink({ to, children, secondary = false }: { to: string; children: ReactNode; secondary?: boolean }) {
  return (
    <NavLink
      to={to}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 text-sm font-extrabold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt ${
        secondary
          ? "border border-line bg-transparent text-ink hover:border-ink/30 hover:bg-paper"
          : "bg-cobalt text-white hover:bg-cobaltDark"
      }`}
    >
      {children}
      {!secondary ? <ArrowRight size={18} aria-hidden="true" /> : null}
    </NavLink>
  );
}

export function FilterButton({ children, active = false, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex min-h-11 items-center gap-2 rounded-md border px-4 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt ${
        active ? "border-cobalt bg-cobalt text-white" : "border-line bg-white text-muted hover:border-ink/20 hover:text-ink"
      }`}
    >
      <FunnelSimple size={16} aria-hidden="true" />
      {children}
    </button>
  );
}
