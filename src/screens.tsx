import {
  ArrowRight,
  BookOpenText,
  Check,
  CheckCircle,
  Circle,
  GraduationCap,
  MagnifyingGlass,
  MapPin,
  ShareNetwork,
  Sparkle,
  Wallet
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import { FormEvent, useMemo, useState } from "react";
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
  StatusTag
} from "./components";
import { useRumo } from "./state";

export function LandingScreen() {
  const { c } = useRumo();
  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <div className="mx-auto max-w-7xl">
        <PublicHeader />
        <PageTransition className="px-5 pb-16 pt-8 sm:px-8 sm:pt-14 lg:pb-24">
          <section className="grid items-start gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:gap-20">
            <div className="max-w-3xl">
              <p className="eyebrow">{c.landing.eyebrow}</p>
              <h1 className="mt-5 max-w-3xl text-[clamp(3.1rem,8vw,6.7rem)] font-extrabold leading-[0.94] tracking-[-0.065em] text-ink">
                {c.landing.title}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">{c.landing.body}</p>
              <div className="mt-7 flex flex-wrap gap-2" aria-label="Initial destinations">
                {(["Portugal", "Alemanha", "Espanha"] as const).map((destination) => (
                  <span key={destination} className="rounded-full border border-line bg-white px-4 py-2 text-sm font-bold text-muted shadow-sm">
                    {destination === "Alemanha" && c.common.language === "Language" ? "Germany" : destination === "Espanha" && c.common.language === "Language" ? "Spain" : destination}
                  </span>
                ))}
              </div>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <NextLink to="/register">{c.landing.cta}</NextLink>
                <NavLink to="/dashboard" className="inline-flex min-h-12 items-center justify-center rounded-2xl px-5 text-sm font-extrabold text-muted hover:bg-mist hover:text-ink">
                  {c.landing.signin} <span className="ml-1 underline underline-offset-4">{c.landing.enter}</span>
                </NavLink>
              </div>
            </div>

            <div className="rounded-[2rem] border border-line bg-white p-5 shadow-soft sm:p-7">
              <div className="mb-7 flex items-center justify-between gap-4">
                <h2 className="text-2xl font-extrabold tracking-[-0.04em]">{c.landing.stepsTitle}</h2>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cobalt text-white">
                  <Sparkle size={21} weight="fill" aria-hidden="true" />
                </span>
              </div>
              <ol className="space-y-3">
                {c.landing.steps.map(([number, title, body], index) => (
                  <motion.li
                    key={number}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="grid grid-cols-[auto_1fr] gap-4 rounded-xl2 border border-line bg-canvas p-4 sm:p-5"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-xs font-extrabold text-white">{number}</span>
                    <div>
                      <h3 className="font-extrabold tracking-[-0.02em]">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted">{body}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
              <div className="mt-4 rounded-xl2 bg-ink p-5 text-white">
                <strong className="block text-sm">{c.landing.noteTitle}</strong>
                <p className="mt-1 text-sm leading-6 text-white/70">{c.landing.note}</p>
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
  const [values, setValues] = useState({ name: "Ana Manuel", email: "ana.demo@example.com", password: "demonstracao", consent: true });
  const [attempted, setAttempted] = useState(false);
  const valid = values.name.trim().length > 1 && /^\S+@\S+\.\S+$/.test(values.email) && values.password.length >= 8 && values.consent;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setAttempted(true);
    if (valid) navigate("/profile");
  };

  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <div className="mx-auto max-w-6xl">
        <PublicHeader />
        <PageTransition className="grid gap-12 px-5 pb-16 pt-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20 lg:pt-12">
          <div className="max-w-lg lg:sticky lg:top-10">
            <p className="eyebrow">{c.register.eyebrow}</p>
            <h1 className="mt-4 text-5xl font-extrabold leading-[1] tracking-[-0.055em] sm:text-6xl">{c.register.title}</h1>
            <p className="mt-5 text-lg leading-8 text-muted">{c.register.body}</p>
            <div className="mt-8 hidden lg:block">
              <Notice title={c.register.privacyTitle}>{c.register.privacy}</Notice>
            </div>
          </div>

          <form onSubmit={submit} className="rounded-[2rem] border border-line bg-white p-5 shadow-soft sm:p-8" noValidate>
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
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl p-2 text-sm font-semibold leading-6 text-ink hover:bg-mist">
                <input
                  type="checkbox"
                  checked={values.consent}
                  onChange={(event) => setValues({ ...values, consent: event.target.checked })}
                  className="mt-1 h-5 w-5 rounded border-line accent-cobalt"
                />
                {c.register.consent}
              </label>
              {attempted && !valid ? (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
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
        className={`min-h-14 w-full rounded-2xl border bg-white px-4 text-base text-ink outline-none transition focus:border-cobalt focus:ring-4 focus:ring-cobalt/10 ${error ? "border-red-400" : "border-line"}`}
      />
      {error ? <p id={`${id}-error`} className="mt-2 text-sm font-bold text-red-700">{error}</p> : null}
    </div>
  );
}

export function OnboardingScreen() {
  const { c } = useRumo();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initial = Math.min(6, Math.max(0, Number(params.get("step") ?? 1) - 1));
  const [step, setStep] = useState(initial);
  const [answers, setAnswers] = useState<string[]>(Array(7).fill(""));
  const [funding, setFunding] = useState(true);
  const selected = answers[step];
  const isFinancial = step === 5;

  const next = () => {
    if (!selected) return;
    if (step === 6) navigate("/analysis");
    else setStep((current) => current + 1);
  };

  return (
    <AppShell>
      <BackHeader title={c.onboarding.title} />
      <PageTransition className="mx-auto max-w-3xl px-5 pb-16 sm:px-8">
        <div className="mb-8 flex items-center gap-4">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
            <motion.div className="h-full rounded-full bg-cobalt" animate={{ width: `${((step + 1) / 7) * 100}%` }} />
          </div>
          <span className="text-sm font-extrabold text-muted">{step + 1} / 7</span>
        </div>

        <p className="eyebrow">{c.onboarding.labels[step]}</p>
        <h1 className="mt-4 text-4xl font-extrabold leading-[1.04] tracking-[-0.05em] sm:text-5xl">{c.onboarding.questions[step]}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg">{c.onboarding.descriptions[step]}</p>

        <fieldset className="mt-8 grid gap-3 sm:grid-cols-2">
          <legend className="sr-only">{c.onboarding.questions[step]}</legend>
          {c.onboarding.options[step].map((option) => (
            <label
              key={option}
              className={`flex min-h-16 cursor-pointer items-center gap-3 rounded-xl2 border p-4 transition ${
                selected === option ? "border-cobalt bg-cobalt/5 shadow-sm" : "border-line bg-white hover:border-ink/20"
              }`}
            >
              <input
                type="radio"
                name={`step-${step}`}
                value={option}
                checked={selected === option}
                onChange={() => setAnswers((current) => current.map((answer, index) => (index === step ? option : answer)))}
                className="h-5 w-5 shrink-0 accent-cobalt"
              />
              <span className="font-bold text-ink">{option}</span>
            </label>
          ))}
        </fieldset>

        {isFinancial ? (
          <div className="mt-5 space-y-5">
            <label className="flex cursor-pointer items-start gap-3 rounded-xl2 border border-line bg-white p-4 text-sm font-bold leading-6">
              <input type="checkbox" checked={funding} onChange={(event) => setFunding(event.target.checked)} className="mt-0.5 h-5 w-5 rounded accent-cobalt" />
              {c.onboarding.funding}
            </label>
            <Notice title={c.onboarding.estimateTitle}>{c.onboarding.estimate}</Notice>
          </div>
        ) : null}

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button type="button" variant="secondary" onClick={() => (step === 0 ? navigate("/register") : setStep((current) => current - 1))}>
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
  const icons = [GraduationCap, Wallet, BookOpenText];
  return (
    <AppShell>
      <BackHeader title={c.analysis.title} />
      <PageTransition className="mx-auto max-w-4xl px-5 pb-16 sm:px-8">
        <p className="eyebrow">{c.analysis.eyebrow}</p>
        <h1 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-6xl">{c.analysis.heading}</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">{c.analysis.body}</p>

        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {c.analysis.cards.map(([label, title, body, state], index) => {
            const Icon = icons[index];
            return (
              <article key={label} className="rounded-xl2 border border-line bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-mist text-ink">
                    <Icon size={21} weight="fill" aria-hidden="true" />
                  </span>
                  <StatusTag state="estimated">{state}</StatusTag>
                </div>
                <p className="mt-6 text-sm font-bold text-muted">{label}</p>
                <h2 className="mt-1 text-xl font-extrabold tracking-[-0.03em]">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-4">
          <Notice title={c.analysis.verifyTitle} tone="warm">{c.analysis.verify}</Notice>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <NextLink to="/dashboard">{c.analysis.cta}</NextLink>
          <NavLink to="/profile?step=1" className="inline-flex min-h-12 items-center justify-center rounded-2xl px-5 text-sm font-extrabold text-muted hover:bg-mist hover:text-ink">
            {c.analysis.edit}
          </NavLink>
        </div>
      </PageTransition>
    </AppShell>
  );
}

export function DashboardScreen() {
  const { c, inPlan } = useRumo();
  return (
    <AppShell active="home">
      <header className="flex items-center justify-between px-5 py-5 sm:px-8 sm:py-7">
        <Brand />
        <div className="flex items-center gap-2"><LocaleToggle /></div>
      </header>
      <PageTransition className="px-5 pb-10 sm:px-8">
        <p className="eyebrow">{c.dashboard.hello}</p>
        <h1 className="mt-3 text-5xl font-extrabold tracking-[-0.055em] sm:text-6xl">{c.dashboard.title}</h1>

        <section className="mt-8 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <article className="rounded-[1.6rem] border border-line bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-extrabold">{c.dashboard.ready}</h2>
              <StatusTag state="confirmed">{c.dashboard.readyState}</StatusTag>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-line">
              <div className="h-full w-3/4 rounded-full bg-cobalt" />
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">{c.dashboard.readyNote}</p>
          </article>

          <article className="rounded-[1.6rem] bg-ink p-6 text-white shadow-lift sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/55">{c.dashboard.next}</p>
            <h2 className="mt-4 max-w-xl text-3xl font-extrabold leading-[1.05] tracking-[-0.045em] sm:text-4xl">{c.dashboard.discoverTitle}</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/65 sm:text-base">{c.dashboard.discoverBody}</p>
            <NavLink to="/discover" className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-extrabold text-ink transition hover:-translate-y-0.5 hover:bg-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              {c.dashboard.cta}<ArrowRight size={18} aria-hidden="true" />
            </NavLink>
          </article>
        </section>

        <section className="mt-4 rounded-[1.6rem] border border-line bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-extrabold tracking-[-0.03em]">{inPlan ? c.applicationPlan.program : c.dashboard.emptyTitle}</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{inPlan ? c.applicationPlan.progressNote : c.dashboard.emptyBody}</p>
            </div>
            <NextLink to="/plan" secondary>{c.dashboard.openPlan}</NextLink>
          </div>
        </section>
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
        <h1 className="mt-5 text-4xl font-extrabold tracking-[-0.05em]">{c.discovery.title}</h1>
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
            className="min-h-14 w-full rounded-2xl border border-line bg-white pl-12 pr-4 text-base text-ink outline-none transition placeholder:text-muted/65 focus:border-cobalt focus:ring-4 focus:ring-cobalt/10"
          />
        </div>
        <div className="mt-4 flex flex-wrap gap-2" aria-label={c.discovery.filters}>
          {destinations.map((destination) => (
            <FilterButton key={destination} active={country === destination} onClick={() => setCountry((current) => current === destination ? null : destination)}>{destination}</FilterButton>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-4xl font-extrabold tracking-[-0.05em] sm:text-5xl">{c.discovery.results}</h2>
          <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted">{c.common.demo}</span>
        </div>
        <p className="mt-3 text-sm leading-6 text-muted">{c.discovery.resultNote}</p>

        {results.length ? (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {results.map(([eyebrow, title, institution, matchTitle, match, state], index) => (
              <article key={title} className="flex flex-col rounded-[1.6rem] border border-line bg-white p-5 shadow-sm sm:p-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted">{eyebrow}</p>
                <h3 className="mt-3 text-2xl font-extrabold leading-tight tracking-[-0.035em]">{title}</h3>
                <p className="mt-2 text-sm text-muted">{institution}</p>
                <div className="mt-5 rounded-xl2 bg-mist p-4">
                  <strong className="text-sm">{matchTitle}</strong>
                  <p className="mt-1 text-sm leading-6 text-muted">{match}</p>
                </div>
                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                  <StatusTag state={index === 0 ? "estimated" : "unverified"}>{state}</StatusTag>
                  <NextLink to={`/opportunity/${index + 1}`} secondary>{c.discovery.view}</NextLink>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-[1.6rem] border border-dashed border-line bg-white p-8 text-center">
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
          <button type="button" onClick={() => setShared(true)} className="inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-extrabold text-muted hover:bg-mist hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-cobalt">
            {shared ? <Check size={19} weight="bold" aria-hidden="true" /> : <ShareNetwork size={19} aria-hidden="true" />}
            <span className="hidden sm:inline">{shared ? c.common.verified : c.details.share}</span>
          </button>
        }
      />
      <PageTransition className="mx-auto max-w-4xl px-5 pb-16 sm:px-8">
        <p className="eyebrow">{c.details.eyebrow}</p>
        <h1 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-6xl">{c.details.program}</h1>
        <p className="mt-4 flex items-center gap-2 text-base leading-7 text-muted sm:text-lg"><MapPin size={20} aria-hidden="true" />{c.details.institution}</p>
        {shared ? <p role="status" className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">Link copied in this demonstration.</p> : null}

        <div className="mt-8 rounded-[1.6rem] bg-ink p-6 text-white shadow-lift">
          <div className="flex items-center gap-2 text-sm font-extrabold"><Sparkle size={19} weight="fill" aria-hidden="true" />{c.details.matchTitle}</div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">{c.details.match}</p>
        </div>

        <dl className="mt-5 divide-y divide-line overflow-hidden rounded-[1.6rem] border border-line bg-white">
          {c.details.requirements.map(([label, value]) => (
            <div key={label} className="grid gap-2 p-5 sm:grid-cols-[0.7fr_1.3fr] sm:items-center sm:gap-6">
              <dt className="font-extrabold">{label}</dt>
              <dd className="flex items-center justify-between gap-3 text-sm leading-6 text-muted sm:text-base">
                {value}<StatusTag state="unverified">{c.common.unverified}</StatusTag>
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
        <h1 className="mt-5 text-3xl font-extrabold tracking-[-0.045em] sm:text-4xl">{c.applicationPlan.title}</h1>
      </header>
      <PageTransition className="px-5 pb-10 sm:px-8">
        {!inPlan ? (
          <div className="mx-auto mt-16 max-w-xl rounded-[2rem] border border-line bg-white p-8 text-center shadow-soft">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-mist text-cobalt"><ClipboardTextIcon /></span>
            <h2 className="mt-6 text-3xl font-extrabold tracking-[-0.04em]">{c.applicationPlan.emptyTitle}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{c.applicationPlan.emptyBody}</p>
            <div className="mt-7"><NextLink to="/discover">{c.applicationPlan.emptyCta}</NextLink></div>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="eyebrow">{c.applicationPlan.eyebrow}</p>
              <span className="text-sm font-bold text-muted">{c.applicationPlan.count}</span>
            </div>
            <h2 className="mt-4 text-5xl font-extrabold leading-[0.98] tracking-[-0.055em] sm:text-6xl">{c.applicationPlan.program}</h2>
            <p className="mt-3 text-base text-muted sm:text-lg">{c.applicationPlan.institution}</p>

            <section className="mt-8 rounded-[1.6rem] border border-line bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-extrabold">{c.applicationPlan.progress}</h3>
                <span className="text-sm font-bold text-muted">{completed} / 6 {c.applicationPlan.tasks}</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-line"><motion.div className="h-full rounded-full bg-cobalt" animate={{ width: `${(completed / 6) * 100}%` }} /></div>
              <p className="mt-4 text-sm leading-6 text-muted">{c.applicationPlan.progressNote}</p>
            </section>

            <ol className="mt-5 divide-y divide-line overflow-hidden rounded-[1.6rem] border border-line bg-white">
              {c.applicationPlan.taskList.map(([title, state], index) => {
                const done = index === 0 || (index === 1 && activeTask);
                return (
                  <li key={title} className={`grid grid-cols-[auto_1fr] gap-4 p-5 ${index === 1 && !activeTask ? "bg-cobalt/[0.035]" : ""}`}>
                    <span className={`mt-0.5 grid h-7 w-7 place-items-center rounded-lg border ${done ? "border-cobalt bg-cobalt text-white" : "border-line bg-white text-muted"}`}>
                      {done ? <Check size={16} weight="bold" aria-hidden="true" /> : <Circle size={12} aria-hidden="true" />}
                    </span>
                    <div>
                      <p className="font-extrabold">{title}</p>
                      <p className="mt-1 text-sm text-muted">{index === 1 && activeTask ? "Em curso · Por verificar" : state}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <div className="mt-5"><Notice title={c.applicationPlan.noteTitle}>{c.applicationPlan.note}</Notice></div>
            <Button full className="mt-7" onClick={startTask} disabled={activeTask}>{activeTask ? c.applicationPlan.toast : c.applicationPlan.cta}</Button>
            {activeTask ? <p role="status" className="mt-3 text-center text-sm font-bold text-emerald-800">{c.applicationPlan.toast}</p> : null}
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
