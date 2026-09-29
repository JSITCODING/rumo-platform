import { DESIGN_COLORS } from "./design-tokens.ts";

export type InfoState = "confirmed" | "estimated" | "to_verify";

export const INFO_STATE_SURFACE = DESIGN_COLORS.paper;

export const INFO_STATE_TOKENS = {
  confirmed: {
    stroke: DESIGN_COLORS.cobaltDark,
    lineDasharray: "none",
    markerFill: "full"
  },
  estimated: {
    stroke: DESIGN_COLORS.cobalt,
    lineDasharray: "8 5",
    markerFill: "half"
  },
  to_verify: {
    stroke: DESIGN_COLORS.muted,
    lineDasharray: "2 5",
    markerFill: "empty"
  }
} as const satisfies Record<InfoState, {
  stroke: string;
  lineDasharray: string;
  markerFill: "full" | "half" | "empty";
}>;
