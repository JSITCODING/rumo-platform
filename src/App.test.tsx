import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </MemoryRouter>
  );
}

describe("Rumo prototype", () => {
  it("starts onboarding before asking for an account", async () => {
    const user = userEvent.setup();
    renderAt("/");

    expect(screen.getByRole("heading", { name: /Encontra oportunidades/i })).toBeInTheDocument();
    await user.click(screen.getByRole("link", { name: /Traçar o meu rumo/i }));
    expect(await screen.findByRole("heading", { name: /Onde estás no teu percurso académico/i })).toBeInTheDocument();
  });

  it("persists the English language preference", async () => {
    const user = userEvent.setup();
    renderAt("/");

    await user.click(screen.getByRole("button", { name: /en/i }));
    expect(screen.getByRole("heading", { name: /Find opportunities/i })).toBeInTheDocument();
    expect(window.localStorage.getItem("rumo.locale")).toBe("en");
  });

  it("restores the document language on a direct English visit", () => {
    window.localStorage.setItem("rumo.locale", "en");
    document.documentElement.lang = "pt";

    renderAt("/dashboard");

    expect(screen.getByRole("heading", { name: /Good (morning|afternoon|evening), Dandara/i })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("en");
  });

  it("shows all seven onboarding stages without collecting real data", () => {
    renderAt("/profile?step=6");

    expect(screen.getByText("6 / 7")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Que apoio poderás precisar/i })).toBeInTheDocument();
    expect(screen.getByText(/tratado como estimativa/i)).toBeInTheDocument();
  });

  it("keeps profile answers only in the browser session", async () => {
    const user = userEvent.setup();
    renderAt("/profile?step=1");

    await user.click(screen.getByRole("radio", { name: /A concluir o ensino secundário/i }));
    const stored = JSON.parse(window.sessionStorage.getItem("rumo.profile.v1") ?? "{}");
    expect(stored.answers[0]).toBe("A concluir o ensino secundário");
    expect(window.localStorage.getItem("rumo.profile.v1")).toBeNull();
  });

  it("gates the dashboard behind the save-account screen after analysis", async () => {
    const user = userEvent.setup();
    renderAt("/analysis");

    await user.click(screen.getByRole("link", { name: /Guardar análise e continuar/i }));
    expect(await screen.findByRole("heading", { name: /A tua análise está pronta para continuar/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Guardar e abrir o Dashboard/i }));
    expect(await screen.findByRole("heading", { name: /Boa tarde, Dandara/i })).toBeInTheDocument();
  });

  it("uses a synthetic Dandara identity on the save screen", () => {
    renderAt("/register");

    expect(screen.getByDisplayValue("Dandara")).toBeInTheDocument();
    expect(screen.getByDisplayValue("dandara.demo@rumo.example")).toBeInTheDocument();
  });

  it("emits provider-independent progress events without profile answers", () => {
    const received: unknown[] = [];
    const listener = (event: Event) => received.push((event as CustomEvent).detail);
    window.addEventListener("rumo:product-event", listener);

    renderAt("/analysis");

    expect(received).toEqual([
      expect.objectContaining({ name: "analysis_viewed", locale: "pt" })
    ]);
    expect(JSON.stringify(received)).not.toContain("answers");
    window.removeEventListener("rumo:product-event", listener);
  });

  it("supports an empty plan state before an opportunity is added", () => {
    renderAt("/plan");

    expect(screen.getByRole("heading", { name: /O teu plano ainda está vazio/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Descobrir oportunidades/i })).toHaveAttribute("href", "/discover");
  });

  it("renders distinct non-colour encodings for every information state", () => {
    const { container } = renderAt("/dashboard");
    const states = ["confirmed", "estimated", "to_verify"] as const;
    const fills = states.map((state) => container.querySelector(`[data-info-marker="${state}"]`)?.getAttribute("data-marker-fill"));
    const dashes = states.map((state) => container.querySelector(`[data-info-line="${state}"] line`)?.getAttribute("stroke-dasharray"));

    expect(new Set(fills).size).toBe(3);
    expect(new Set(dashes).size).toBe(3);
    expect(screen.getAllByText("Confirmado").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Estimado").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Por verificar").length).toBeGreaterThan(0);
  });
});
