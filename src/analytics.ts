export type RumoEventName =
  | "onboarding_started"
  | "onboarding_completed"
  | "analysis_viewed"
  | "signup_reached"
  | "dashboard_reached";

export type RumoEvent = {
  name: RumoEventName;
  locale: "pt" | "en";
  path: string;
  occurredAt: string;
};

export const RUMO_EVENT = "rumo:product-event";

export function trackRumoEvent(name: RumoEventName, locale: "pt" | "en") {
  if (typeof window === "undefined") return;

  const event: RumoEvent = {
    name,
    locale,
    path: window.location.pathname,
    occurredAt: new Date().toISOString()
  };

  // Deliberately browser-only: a future analytics provider can subscribe to
  // this event without changing the product flow or transmitting profile data.
  window.dispatchEvent(new CustomEvent<RumoEvent>(RUMO_EVENT, { detail: event }));
}
