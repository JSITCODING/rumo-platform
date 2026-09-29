import {
  ArrowRight,
  Check,
  CheckCircle,
  Circle,
  GraduationCap,
  MagnifyingGlass,
  MapPin,
  ShareNetwork
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import {
  AppShell,
  BackHeader,
  Brand,
  Button,
  FilterButton,
  LocaleToggle,
  NextLink,
  Notice,
  PageTransition,
  PublicHeader,
  RouteMark,
  StateLine,
  StateMarker
} from "./components";
import type { InfoState } from "./info-state";
import { useRumo } from "./state";
import { trackRumoEvent, type RumoEventName } from "./analytics";

function useScreenEvent(name: RumoEventName) {
  const { locale } = useRumo();
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    trackRumoEvent(name, locale);
  }, [locale, name]);
}

export function LandingScreen() {
  const { c } = useRumo();
  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <div className="mx-auto max-w-7xl">
        <PublicHeader />
        <PageTransition className="px-5 pb-16 pt-10 sm:px-8 sm:pt-16 lg:pb-24">
          <section className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)] lg:gap-24">
            <div className="max-w-3xl">
              <p className="eyebrow">{c.landing.eyebrow}</p>
              <h1 className="display-title mt-5 max-w-3xl text-[clamp(3.35rem,7vw,6.6rem)] text-ink">
                {c.landing.title}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">{c.landing.body}</p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-y border-line py-4" aria-label={c.landing.destinationsLabel}>
                {(["Portugal", "Alemanha", "Espanha"] as const).map((destination) => (
                  <span key={destination} className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.16em] text-muted before:h-1.5 before:w-1.5 before:rounded-full before:bg-cobalt">
                    {destination === "Alemanha" && c.common.language === "Language" ? "Germany" : destination === "Espanha" && c.common.language === "Language" ? "Spain" : destination}
                  </span>
                ))}
              </div>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <NextLink to="/profile">{c.landing.cta}</NextLink>
                <NavLink to="/dashboard" className="inline-flex min-h-12 items-center justify-center rounded-md px-5 text-sm font-extrabold text-muted hover:bg-paper hover:text-ink">
                  {c.landing.signin} <span className="ml-1 underline underline-offset-4">{c.landing.enter}</span>
                </NavLink>
              </div>
            </div>

            <div className="editorial-card relative overflow-hidden rounded-[1.2rem] p-5 sm:p-8">
              <div className="mb-7 flex items-center justify-between gap-4">
                <h2 className="font-display text-3xl font-semibold tracking-[-0.035em]">{c.landing.stepsTitle}</h2>
                <RouteMark className="relative h-11 w-11 text-cobalt" />
              </div>
              <ol className="divide-y divide-line border-y border-line">
                {c.landing.steps.map(([number, title, body], index) => (
                  <motion.li
                    key={number}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="grid grid-cols-[auto_1fr] gap-4 py-5"
                  >
                    <span className="font-display text-2xl font-semibold text-cobalt">{number}</span>
                    <div>
                      <h3 className="font-extrabold tracking-[-0.02em]">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted">{body}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
              <div className="mt-6 border-l-2 border-cobalt bg-cream/55 p-5">
                <strong className="block text-sm text-ink">{c.landing.noteTitle}</strong>
                <p className="mt-1 text-sm leading-6 text-muted">{c.landing.note}</p>
              </div>
            </div>
          </section>
        </PageTransition>
      </div>
    </div>
  );
}

export function RegisterScreen() {
  const { c } = useRumo();
  const navigate = useNavigate();
  useScreenEvent("signup_reached");
  const [values, setValues] = useState({ name: "Dandara", email: "dandara.demo@rumo.example", password: "demonstracao", consent: true });
  const [attempted, setAttempted] = useState(false);
  const valid = values.name.trim().length > 1 && /^\S+@\S+\.\S+$/.test(values.email) && values.password.length >= 8 && values.consent;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setAttempted(true);
    if (valid) navigate("/dashboard");
  };

  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <div className="mx-auto max-w-6xl">
        <PublicHeader />
        <PageTransition className="grid gap-12 px-5 pb-16 pt-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20 lg:pt-12">
          <div className="max-w-lg lg:sticky lg:top-10">
            <p className="eyebrow">{c.register.eyebrow}</p>
            <h1 className="display-title mt-4 text-5xl sm:text-6xl">{c.register.title}</h1>
            <p className="mt-5 text-lg leading-8 text-muted">{c.register.body}</p>
            <div className="mt-8 hidden lg:block">
              <Notice title={c.register.privacyTitle}>{c.register.privacy}</Notice>
            </div>
          </div>

          <form onSubmit={submit} className="editorial-card rounded-[1.2rem] border-t-2 border-t-cobalt p-5 sm:p-8" noValidate>
            <div className="space-y-5">
              <Field
                label={c.register.name}
                value={values.name}
                error={attempted && values.name.trim().length <= 1 ? c.register.required : undefined}
                onChange={(value) => setValues({ ...values, name: value })}
                autoComplete="off"
              />
              <Field
                label={c.register.email}
                value={values.email}
                type="email"
                error={attempted && !/^\S+@\S+\.\S+$/.test(values.email) ? c.register.validation : undefined}
                onChange={(value) => setValues({ ...values, email: value })}
                autoComplete="off"
              />
              <Field
                label={c.register.password}
                value={values.password}
                type="password"
                error={attempted && values.password.length < 8 ? c.register.validation : undefined}
                onChange={(value) => setValues({ ...values, password: value })}
                autoComplete="new-password"
              />
              <label className="flex cursor-pointer items-start gap-3 rounded-md p-2 text-sm font-semibold leading-6 text-ink hover:bg-mist">
                <input
                  type="checkbox"
                  checked={values.consent}
                  onChange={(event) => setValues({ ...values, consent: event.target.checked })}
                  className="mt-1 h-5 w-5 rounded border-line accent-cobalt"
                />
                {c.register.consent}
              </label>
              {attempted && !valid ? (
                <p role="alert" className="rounded-md bg-dangerSurface px-4 py-3 text-sm font-bold text-danger">
                  {c.register.validation}
                </p>
              ) : null}
            </div>
            <div className="mt-7 lg:hidden">
              <Notice title={c.register.privacyTitle}>{c.register.privacy}</Notice>
            </div>
            <Button type="submit" full className="mt-7">
              {c.register.cta} <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </form>
        </PageTransition>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, error, type = "text", autoComplete }: { label: string; value: string; onChange: (value: string) => void; error?: string; type?: string; autoComplete?: string }) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-extrabold text-ink">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`min-h-14 w-full rounded-md border bg-paper px-4 text-base text-ink outline-none transition focus:border-cobalt focus:ring-4 focus:ring-cobalt/10 ${error ? "border-danger" : "border-line"}`}
      />
      {error ? <p id={`${id}-error`} className="mt-2 text-sm font-bold text-red-700">{error}</p> : null}
    </div>
  );
}

export function OnboardingScreen() {
  const { c, locale, profile, saveProfile } = useRumo();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initial = Math.min(6, Math.max(0, Number(params.get("step") ?? 1) - 1));
  const [step, setStep] = useState(initial);
  const [answers, setAnswers] = useState<string[]>(profile.answers);
  const [funding, setFunding] = useState(profile.funding);
  const selected = answers[step];
  const isFinancial = step === 5;

  useScreenEvent("onboarding_started");

  const selectAnswer = (option: string) => {
    const nextAnswers = answers.map((answer, index) => (index === step ? option : answer));
    setAnswers(nextAnswers);
    saveProfile({ answers: nextAnswers, funding });
  };

  const changeFunding = (nextFunding: boolean) => {
    setFunding(nextFunding);
    saveProfile({ answers, funding: nextFunding });
  };

  const next = () => {
    if (!selected) return;
    if (step === 6) {
      saveProfile({ answers, funding });
      trackRumoEvent("onboarding_completed", locale);
      navigate("/analysis");
    }
    else setStep((current) => current + 1);
  };

  return (
    <AppShell>
      <BackHeader title={c.onboarding.title} />
      <PageTransition className="mx-auto max-w-3xl px-5 pb-16 pt-3 sm:px-8 sm:pt-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="h-1 flex-1 overflow-hidden bg-line" aria-hidden="true">
            <motion.div className="h-full bg-cobalt" animate={{ width: `${((step + 1) / 7) * 100}%` }} />
          </div>
          <span className="text-sm font-extrabold text-muted">{step + 1} / 7</span>
        </div>

        <p className="eyebrow">{c.onboarding.labels[step]}</p>
        <h1 className="display-title mt-4 max-w-2xl text-4xl sm:text-5xl">{c.onboarding.questions[step]}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">{c.onboarding.descriptions[step]}</p>

        <fieldset className="mt-8 overflow-hidden rounded-[1.2rem] border border-line bg-paper">
          <legend className="sr-only">{c.onboarding.questions[step]}</legend>
          {c.onboarding.options[step].map((option) => (
            <label
              key={option}
              className={`flex min-h-16 cursor-pointer items-center gap-3 border-b border-line p-4 transition last:border-b-0 ${
                selected === option ? "bg-mist text-ink" : "bg-paper hover:bg-canvas"
              }`}
            >
              <input
                type="radio"
                name={`step-${step}`}
                value={option}
                checked={selected === option}
                onChange={() => selectAnswer(option)}
                className="h-5 w-5 shrink-0 accent-cobalt"
              />
              <span className="font-bold text-ink">{option}</span>
            </label>
          ))}
        </fieldset>

        {isFinancial ? (
          <div className="mt-5 space-y-5">
            <label className="flex cursor-pointer items-start gap-3 rounded-md border-l-2 border-cobalt bg-paper p-4 text-sm font-bold leading-6">
              <input type="checkbox" checked={funding} onChange={(event) => changeFunding(event.target.checked)} className="mt-0.5 h-5 w-5 rounded accent-cobalt" />
              {c.onboarding.funding}
            </label>
            <Notice title={c.onboarding.estimateTitle}>{c.onboarding.estimate}</Notice>
          </div>
        ) : null}

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button type="button" variant="secondary" onClick={() => (step === 0 ? navigate("/") : setStep((current) => current - 1))}>
            {c.common.back}
          </Button>
          <Button type="button" onClick={next} disabled={!selected}>
            {step === 6 ? c.onboarding.analyse : c.common.continue}
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
        </div>
      </PageTransition>
    </AppShell>
  );
}

export function AnalysisScreen() {
  const { c } = useRumo();
  const analysisStates: InfoState[] = ["confirmed", "estimated", "to_verify"];
  useScreenEvent("analysis_viewed");
  return (
    <AppShell>
      <BackHeader title={c.analysis.title} />
      <PageTransition className="mx-auto max-w-4xl px-5 pb-16 sm:px-8">
        <p className="eyebrow">{c.analysis.eyebrow}</p>
        <h1 className="display-title mt-4 text-5xl sm:text-6xl">{c.analysis.heading}</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">{c.analysis.body}</p>

        <div className="mt-9 overflow-hidden rounded-[1.2rem] border border-line bg-paper">
          {c.analysis.cards.map(([label, title, body], index) => (
            <article key={label} className="grid gap-3 border-b border-line p-5 last:border-b-0 sm:grid-cols-[8rem_1fr_auto] sm:items-start sm:gap-6 sm:p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-muted">0{index + 1} · {label}</p>
              <div>
                <h2 className="text-lg font-extrabold tracking-[-0.025em]">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
              </div>
              <StateMarker state={analysisStates[index]} />
            </article>
          ))}
        </div>

        <div className="mt-4">
          <Notice title={c.analysis.verifyTitle} tone="warm">{c.analysis.verify}</Notice>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <NextLink to="/register">{c.analysis.cta}</NextLink>
          <NavLink to="/profile?step=1" className="inline-flex min-h-12 items-center justify-center rounded-md px-5 text-sm font-extrabold text-muted hover:bg-paper hover:text-ink">
            {c.analysis.edit}
          </NavLink>
        </div>
      </PageTransition>
    </AppShell>
  );
}

export function DashboardScreen() {
  const { c, inPlan } = useRumo();
  useScreenEvent("dashboard_reached");
  return (
    <AppShell active="home">
      <header className="flex items-center justify-between gap-3 px-5 py-3 sm:px-8 sm:py-6">
        <Brand />
        <div className="flex items-center gap-3">
          <LocaleToggle />
          <span role="img" className="grid h-10 w-10 place-items-center rounded-full bg-ink font-display text-xl font-semibold text-paper sm:h-12 sm:w-12 sm:text-2xl" aria-label="Dandara">D</span>
        </div>
      </header>
      <PageTransition className="px-5 pb-10 sm:px-8">
        <span className="mb-2 block h-px w-6 bg-clay sm:mb-5 sm:h-0.5 sm:w-12" aria-hidden="true" />
        <h1 className="display-title whitespace-nowrap text-[1.65rem] leading-none sm:whitespace-normal sm:text-5xl lg:text-[4.7rem]">{c.dashboard.hello}</h1>
        <p className="mt-1 text-sm leading-5 text-muted sm:mt-2 sm:text-xl">{c.dashboard.title}</p>

        <section className="mt-4 rounded-[0.75rem] border border-line bg-paper p-4 sm:mt-8 sm:rounded-[1.2rem] sm:p-8">
          <div className="flex items-start justify-between gap-3 sm:gap-5">
            <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">{c.dashboard.routeTitle}</h2>
            <p className="max-w-[7.5rem] text-right text-[0.56rem] font-extrabold uppercase leading-[0.85rem] tracking-[0.2em] text-muted sm:max-w-[10rem] sm:text-[0.68rem] sm:leading-5 sm:tracking-[0.22em]">{c.dashboard.routeKicker}</p>
          </div>

          <div role="group" className="mt-3 grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:mt-8 sm:gap-3" aria-label={c.dashboard.routeTitle}>
            <div className="text-center">
              <span className="mx-auto block h-4 w-4 rounded-full bg-clay sm:h-8 sm:w-8 sm:ring-8 sm:ring-clay/10" />
              <strong className="mt-1 block font-display text-sm sm:mt-3 sm:text-xl">{c.dashboard.routeOrigin}</strong>
            </div>
            <div className="grid grid-cols-3 items-start gap-1 sm:gap-2">
              <StateLine state="confirmed" />
              <StateLine state="estimated" />
              <StateLine state="to_verify" />
            </div>
            <div className="text-center">
              <GraduationCap size={26} weight="fill" className="mx-auto text-ink sm:h-[35px] sm:w-[35px]" aria-hidden="true" />
              <strong className="mt-1 block max-w-16 text-xs leading-4 sm:mt-2 sm:max-w-20 sm:text-sm sm:leading-5">{c.dashboard.routeDestination}</strong>
            </div>
          </div>

          <ol className="mt-3 divide-y divide-line border-y border-line sm:mt-8">
            {c.dashboard.routeSteps.map(([title, note], index) => {
              const state: InfoState = index === 0 ? "confirmed" : index === 1 ? "estimated" : "to_verify";
              return (
              <li key={title} className="grid grid-cols-[1fr_auto] gap-3 py-1.5 sm:gap-4 sm:py-4">
                <div>
                  <h3 className="text-sm font-extrabold leading-5 tracking-[-0.02em] sm:text-base">{title}</h3>
                  <p className="text-sm leading-5 text-muted sm:mt-0.5 sm:leading-6">{note}</p>
                </div>
                <StateMarker state={state} className="self-start" />
              </li>
              );
            })}
          </ol>

          <div className="mt-3 grid grid-cols-[auto_1fr] gap-3 rounded-md border border-success/30 bg-successSurface p-3 sm:mt-6 sm:gap-4 sm:rounded-lg sm:p-5">
            <span className="grid h-7 w-7 place-items-center rounded-full border border-success text-success sm:h-9 sm:w-9"><Check size={16} weight="bold" aria-hidden="true" /></span>
            <div><h3 className="text-sm font-extrabold leading-5 sm:text-base">{c.dashboard.profileReadyTitle}</h3><p className="text-sm leading-5 text-muted sm:mt-1 sm:leading-6">{c.dashboard.readyNote}</p></div>
          </div>

          <div className="mt-3 border-t border-line pt-3 sm:mt-7 sm:pt-7">
            <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.2em] text-muted sm:text-[0.68rem]">{c.dashboard.next}</p>
            <h2 className="font-display mt-1 text-2xl font-semibold leading-tight tracking-[-0.035em] sm:mt-3 sm:text-4xl">{c.dashboard.discoverTitle}</h2>
            <p className="mt-1 max-w-2xl text-sm leading-5 text-muted sm:mt-3 sm:text-base sm:leading-6">{c.dashboard.discoverBody}</p>
            <NavLink to="/discover" className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-cobalt px-5 text-sm font-extrabold text-white transition hover:bg-cobaltDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalt sm:mt-6 sm:min-h-14">
              {c.dashboard.cta}<ArrowRight size={19} aria-hidden="true" />
            </NavLink>
          </div>
        </section>

        <div className="mt-4 flex flex-col gap-3 border-t border-line py-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-6">
          <p className="max-w-xs text-[0.68rem] font-extrabold uppercase leading-5 tracking-[0.22em] text-muted">{c.dashboard.roots}</p>
          <div className="hidden sm:block"><NextLink to="/plan" secondary>{inPlan ? c.dashboard.openPlan : c.dashboard.emptyTitle}</NextLink></div>
        </div>
      </PageTransition>
    </AppShell>
  );
}

export function DiscoveryScreen() {
  const { c } = useRumo();
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<string | null>(null);
  const destinations = c.common.language === "Language" ? ["Portugal", "Germany", "Spain"] : ["Portugal", "Alemanha", "Espanha"];
  const results = useMemo(() => c.discovery.opportunities.filter((opportunity) => {
    const matchesQuery = !query || `${opportunity[0]} ${opportunity[1]} ${opportunity[2]}`.toLowerCase().includes(query.toLowerCase());
    const matchesCountry = !country || opportunity[0].toLowerCase().includes(country.toLowerCase());
    return matchesQuery && matchesCountry;
  }), [c.discovery.opportunities, country, query]);

  return (
    <AppShell active="discover">
      <header className="px-5 py-5 sm:px-8 sm:py-7">
        <div className="flex items-center justify-between gap-4"><Brand compact /><LocaleToggle /></div>
        <h1 className="display-title mt-5 text-5xl sm:text-6xl">{c.discovery.title}</h1>
      </header>
      <PageTransition className="px-5 pb-10 sm:px-8">
        <div className="relative max-w-2xl">
          <label htmlFor="opportunity-search" className="sr-only">{c.discovery.search}</label>
          <MagnifyingGlass size={21} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            id="opportunity-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={c.discovery.placeholder}
            className="min-h-14 w-full rounded-md border border-line bg-paper pl-12 pr-4 text-base text-ink outline-none transition placeholder:text-muted/65 focus:border-cobalt focus:ring-4 focus:ring-cobalt/10"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2" aria-label={c.discovery.filters}>
          {destinations.map((destination) => (
            <FilterButton key={destination} active={country === destination} onClick={() => setCountry((current) => current === destination ? null : destination)}>{destination}</FilterButton>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{c.discovery.results}</h2>
          <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted">{c.common.demo}</span>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted">{c.discovery.resultNote}</p>

        {results.length ? (
          <div className="mt-6 overflow-hidden rounded-[1.2rem] border border-line bg-paper">
            {results.map(([eyebrow, title, institution, matchTitle, match], index) => (
              <article key={title} className={`grid gap-4 border-b border-line p-5 last:border-b-0 sm:grid-cols-[2.2rem_1fr_auto] sm:items-start sm:p-6 ${index === 0 ? "bg-cobalt/[0.035]" : ""}`}>
                <span className={`grid h-8 w-8 place-items-center rounded-full border text-xs font-extrabold ${index === 0 ? "border-cobalt bg-cobalt text-white" : "border-line text-muted"}`}>0{index + 1}</span>
                <div>
                  <p className="text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-muted">{eyebrow}</p>
                  <h3 className="font-display mt-2 text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">{title}</h3>
                  <p className="mt-1 text-sm text-muted">{institution}</p>
                  <div className="mt-4 border-l-2 border-cobalt pl-4">
                    <strong className="text-sm">{matchTitle}</strong>
                    <p className="mt-1 text-sm leading-6 text-muted">{match}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                  <StateMarker state={index === 0 ? "estimated" : "to_verify"} />
                  <NextLink to={`/opportunity/${index + 1}`} secondary>{c.discovery.view}</NextLink>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-[1.2rem] border border-dashed border-line bg-paper p-8 text-center">
            <p className="font-extrabold">{c.discovery.empty}</p>
            <Button variant="secondary" className="mt-5" onClick={() => { setQuery(""); setCountry(null); }}>{c.discovery.reset}</Button>
          </div>
        )}
      </PageTransition>
    </AppShell>
  );
}

export function DetailsScreen() {
  const { c, inPlan, addToPlan } = useRumo();
  const navigate = useNavigate();
  const [shared, setShared] = useState(false);
  const add = () => { addToPlan(); navigate("/plan"); };
  return (
    <AppShell>
      <BackHeader
        title={c.details.title}
        action={
          <button type="button" onClick={() => setShared(true)} aria-label={shared ? c.details.shared : c.details.share} className="inline-flex min-h-11 min-w-11 items-center gap-2 rounded-md px-2 text-sm font-extrabold text-muted hover:bg-mist hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-cobalt">
            {shared ? <Check size={19} weight="bold" aria-hidden="true" /> : <ShareNetwork size={19} aria-hidden="true" />}
            <span className="hidden sm:inline">{shared ? c.common.verified : c.details.share}</span>
          </button>
        }
      />
      <PageTransition className="mx-auto max-w-4xl px-5 pb-16 sm:px-8">
        <p className="eyebrow">{c.details.eyebrow}</p>
        <h1 className="display-title mt-4 text-5xl sm:text-6xl">{c.details.program}</h1>
        <p className="mt-4 flex items-center gap-2 text-base leading-7 text-muted sm:text-lg"><MapPin size={20} aria-hidden="true" />{c.details.institution}</p>
        {shared ? <p role="status" className="mt-4 rounded-md bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">{c.details.shared}</p> : null}

        <div className="mt-8 rounded-[1.2rem] border border-line bg-paper p-6">
          <div className="flex items-center gap-2 text-sm font-extrabold"><RouteMark className="h-6 w-6 text-sun" />{c.details.matchTitle}</div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">{c.details.match}</p>
        </div>

        <dl className="mt-5 divide-y divide-line overflow-hidden rounded-[1.2rem] border border-line bg-paper">
          {c.details.requirements.map(([label, value], index) => (
            <div key={label} className="grid gap-2 p-5 sm:grid-cols-[0.7fr_1.3fr] sm:items-center sm:gap-6">
              <dt className="font-extrabold">{label}</dt>
              <dd className="flex items-center justify-between gap-3 text-sm leading-6 text-muted sm:text-base">
                {value}<StateMarker state={index === 2 ? "estimated" : "to_verify"} />
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-5"><Notice title={c.details.sourceTitle}>{c.details.sourceBody}</Notice></div>
        <Button full className="mt-7" onClick={add}>{inPlan ? c.details.added : c.details.add}<ArrowRight size={18} aria-hidden="true" /></Button>
      </PageTransition>
    </AppShell>
  );
}

export function PlanScreen() {
  const { c, inPlan, activeTask, startTask } = useRumo();
  const completed = activeTask ? 2 : 1;
  return (
    <AppShell active="plan">
      <header className="px-5 py-5 sm:px-8 sm:py-7">
        <div className="flex items-center justify-between gap-4"><Brand compact /><LocaleToggle /></div>
        <h1 className="display-title mt-5 text-5xl sm:text-6xl">{c.applicationPlan.title}</h1>
      </header>
      <PageTransition className="px-5 pb-10 sm:px-8">
        {!inPlan ? (
          <div className="editorial-card mx-auto mt-16 max-w-xl rounded-[1.2rem] border-t-2 border-t-cobalt p-8 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-mist text-cobalt"><ClipboardTextIcon /></span>
            <h2 className="font-display mt-6 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{c.applicationPlan.emptyTitle}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{c.applicationPlan.emptyBody}</p>
            <div className="mt-7"><NextLink to="/discover">{c.applicationPlan.emptyCta}</NextLink></div>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="eyebrow">{c.applicationPlan.eyebrow}</p>
              <span className="text-sm font-bold text-muted">{c.applicationPlan.count}</span>
            </div>
            <h2 className="display-title mt-4 text-5xl sm:text-6xl">{c.applicationPlan.program}</h2>
            <p className="mt-3 text-base text-muted sm:text-lg">{c.applicationPlan.institution}</p>

            <section className="editorial-card mt-8 rounded-[1.2rem] border-t-2 border-t-cobalt p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-extrabold">{c.applicationPlan.progress}</h3>
                <span className="text-sm font-bold text-muted">{completed} / 6 {c.applicationPlan.tasks}</span>
              </div>
              <div className="mt-4 h-1 overflow-hidden bg-line"><motion.div className="h-full bg-cobalt" animate={{ width: `${(completed / 6) * 100}%` }} /></div>
              <p className="mt-4 text-sm leading-6 text-muted">{c.applicationPlan.progressNote}</p>
            </section>

            <ol className="mt-5 divide-y divide-line overflow-hidden rounded-[1.2rem] border border-line bg-paper">
              {c.applicationPlan.taskList.map(([title, state], index) => {
                const done = index === 0 || (index === 1 && activeTask);
                const infoState: InfoState = index === 0 ? "estimated" : "to_verify";
                return (
                  <li key={title} className={`grid grid-cols-[auto_1fr] gap-4 p-5 ${index === 1 && !activeTask ? "bg-cobalt/[0.035]" : ""}`}>
                    <span className={`mt-0.5 grid h-7 w-7 place-items-center rounded-full border ${done ? "border-cobalt bg-cobalt text-white" : "border-line bg-paper text-muted"}`}>
                      {done ? <Check size={16} weight="bold" aria-hidden="true" /> : <Circle size={12} aria-hidden="true" />}
                    </span>
                    <div>
                      <p className="font-extrabold">{title}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                        <p className="text-sm text-muted">{index === 1 && activeTask ? "Em curso" : state}</p>
                        <StateMarker state={infoState} />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="mt-5"><Notice title={c.applicationPlan.noteTitle}>{c.applicationPlan.note}</Notice></div>
            <Button full className="mt-7" onClick={startTask} disabled={activeTask}>{activeTask ? c.applicationPlan.toast : c.applicationPlan.cta}</Button>
            {activeTask ? <p role="status" className="mt-3 text-center text-sm font-bold text-success">{c.applicationPlan.toast}</p> : null}
          </div>
        )}
      </PageTransition>
    </AppShell>
  );
}

function ClipboardTextIcon() {
  return <CheckCircle size={27} weight="fill" aria-hidden="true" />;
}

export function NotFoundScreen() {
  const { c } = useRumo();
  return (
    <div className="grid min-h-dvh place-items-center bg-canvas px-5 text-center">
      <div><Brand /><h1 className="mt-8 text-4xl font-extrabold">404</h1><div className="mt-6"><NextLink to="/">{c.common.home}</NextLink></div></div>
    </div>
  );
}
