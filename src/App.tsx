import { AnimatePresence } from "motion/react";
import { Route, Routes, useLocation } from "react-router-dom";
import { RumoProvider } from "./state";
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
  return <RumoProvider><RumoRoutes /></RumoProvider>;
}
