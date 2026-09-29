export type InfoState = "confirmed" | "estimated" | "to_verify";

export const INFO_STATE_SURFACE = "#fffdf8";

export const INFO_STATE_TOKENS = {
  confirmed: {
    stroke: "#183d99",
    lineDasharray: "none",
    markerFill: "full"
  },
  estimated: {
    stroke: "#2755c7",
    lineDasharray: "8 5",
    markerFill: "half"
  },
  to_verify: {
    stroke: "#647069",
    lineDasharray: "2 5",
    markerFill: "empty"
  }
} as const satisfies Record<InfoState, {
  stroke: string;
  lineDasharray: string;
  markerFill: "full" | "half" | "empty";
}>;
