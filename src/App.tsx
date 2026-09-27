import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { RumoProvider } from "./state";
import { RouteMark } from "./components";
import {
  AnalysisScreen,
  DashboardScreen,
  DetailsScreen,
  DiscoveryScreen,
  LandingScreen,
  NotFoundScreen,
  OnboardingScreen,
  PlanScreen,
  RegisterScreen
} from "./screens";

function RumoRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profile" element={<OnboardingScreen />} />
        <Route path="/analysis" element={<AnalysisScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/discover" element={<DiscoveryScreen />} />
        <Route path="/opportunity/:id" element={<DetailsScreen />} />
        <Route path="/plan" element={<PlanScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <RumoProvider>
      <RumoRoutes />
      <OpeningMark />
    </RumoProvider>
  );
}

function OpeningMark() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage?.getItem?.("rumo.opened.v1") !== "yes";
  });

  useEffect(() => {
    if (!visible) return;
    window.sessionStorage?.setItem?.("rumo.opened.v1", "yes");
    const close = () => setVisible(false);
    const timer = window.setTimeout(close, reduceMotion ? 450 : 1100);
    window.addEventListener("pointerdown", close, { once: true });
    window.addEventListener("keydown", close, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("pointerdown", close);
      window.removeEventListener("keydown", close);
    };
  }, [reduceMotion, visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 grid place-items-center bg-ink text-canvas"
          initial={reduceMotion ? false : { opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.22 }}
        >
          <motion.div
            className="flex items-center gap-4"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <RouteMark className="h-12 w-12 text-sun" animated={!reduceMotion} />
            <span className="font-display text-5xl font-semibold tracking-[-0.045em]">Rumo</span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
