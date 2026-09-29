import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DESIGN_COLORS } from "../src/design-tokens.ts";
import { INFO_STATE_TOKENS } from "../src/info-state.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = resolve(root, "docs/qa/contrast.md");

const checks = [
  ["ink / canvas", "texto", DESIGN_COLORS.ink, DESIGN_COLORS.canvas, 4.5],
  ["ink / paper", "texto", DESIGN_COLORS.ink, DESIGN_COLORS.paper, 4.5],
  ["ink / mist", "texto", DESIGN_COLORS.ink, DESIGN_COLORS.mist, 4.5],
  ["ink / cream", "texto", DESIGN_COLORS.ink, DESIGN_COLORS.cream, 4.5],
  ["muted / canvas", "texto", DESIGN_COLORS.muted, DESIGN_COLORS.canvas, 4.5],
  ["muted / paper", "texto", DESIGN_COLORS.muted, DESIGN_COLORS.paper, 4.5],
  ["muted / mist", "texto", DESIGN_COLORS.muted, DESIGN_COLORS.mist, 4.5],
  ["muted / cream", "texto", DESIGN_COLORS.muted, DESIGN_COLORS.cream, 4.5],
  ["cobalt / canvas", "texto e foco", DESIGN_COLORS.cobalt, DESIGN_COLORS.canvas, 4.5],
  ["cobalt / paper", "texto e foco", DESIGN_COLORS.cobalt, DESIGN_COLORS.paper, 4.5],
  ["white / cobalt", "texto", DESIGN_COLORS.white, DESIGN_COLORS.cobalt, 4.5],
  ["white / cobalt dark", "texto", DESIGN_COLORS.white, DESIGN_COLORS.cobaltDark, 4.5],
  ["clay / canvas", "origem e orientação", DESIGN_COLORS.clay, DESIGN_COLORS.canvas, 3],
  ["clay / paper", "origem e orientação", DESIGN_COLORS.clay, DESIGN_COLORS.paper, 3],
  ["sun / ink", "marca de abertura", DESIGN_COLORS.sun, DESIGN_COLORS.ink, 3],
  ["line / canvas", "limite de controlo", DESIGN_COLORS.line, DESIGN_COLORS.canvas, 3],
  ["line / paper", "limite de controlo", DESIGN_COLORS.line, DESIGN_COLORS.paper, 3],
  ["line / mist", "limite de controlo", DESIGN_COLORS.line, DESIGN_COLORS.mist, 3],
  ["line / cream", "limite de controlo", DESIGN_COLORS.line, DESIGN_COLORS.cream, 3],
  ["confirmed / paper", "estado não textual", INFO_STATE_TOKENS.confirmed.stroke, DESIGN_COLORS.paper, 3],
  ["estimated / paper", "estado não textual", INFO_STATE_TOKENS.estimated.stroke, DESIGN_COLORS.paper, 3],
  ["to verify / paper", "estado não textual", INFO_STATE_TOKENS.to_verify.stroke, DESIGN_COLORS.paper, 3],
  ["danger / danger surface", "erro", DESIGN_COLORS.danger, DESIGN_COLORS.dangerSurface, 4.5],
  ["danger / canvas", "erro", DESIGN_COLORS.danger, DESIGN_COLORS.canvas, 4.5],
  ["success / success surface", "sucesso", DESIGN_COLORS.success, DESIGN_COLORS.successSurface, 4.5],
  ["success / canvas", "sucesso", DESIGN_COLORS.success, DESIGN_COLORS.canvas, 4.5]
] as const;

function luminance(hex: string) {
  const channels = hex.slice(1).match(/.{2}/g)?.map((channel) => Number.parseInt(channel, 16) / 255) ?? [];
  const [red, green, blue] = channels.map((channel) => channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function ratio(foreground: string, background: string) {
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

const results = checks.map(([pair, use, foreground, background, threshold]) => {
  const value = ratio(foreground, background);
  return { pair, use, foreground, background, threshold, value, passes: value >= threshold };
});

const rows = results.map((result) => `| ${result.pair} | ${result.use} | ${result.foreground} / ${result.background} | ${result.value.toFixed(2)}:1 | ${result.threshold.toFixed(1)}:1 | ${result.passes ? "Passa" : "Falha"} |`).join("\n");
const report = `# Auditoria de contraste\n\n- **Data:** 29 de setembro de 2026\n- **Método:** luminância relativa e rácio de contraste WCAG 2.x\n- **Limiares:** texto normal 4,5:1; texto grande e elementos não textuais 3:1\n\n| Par | Uso | Cores | Rácio | Limiar | Resultado |\n| --- | --- | --- | ---: | ---: | --- |\n${rows}\n\nTodos os pares usados passam o limiar aplicável. A terracota fica restrita a origem e orientação; o amarelo da abertura é usado apenas sobre tinta escura.\n`;

if (process.argv.includes("--write")) {
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, report, "utf8");
} else {
  const current = await readFile(outputPath, "utf8");
  if (current !== report) throw new Error("docs/qa/contrast.md está desatualizado; execute npm run contrast:update");
}

const failures = results.filter((result) => !result.passes);
if (failures.length) {
  throw new Error(`Falhas de contraste: ${failures.map((failure) => failure.pair).join(", ")}`);
}

console.log(`${results.length} pares de contraste aprovados.`);
