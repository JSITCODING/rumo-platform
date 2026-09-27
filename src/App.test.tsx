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
  it("renders the public landing page and starts the account flow", async () => {
    const user = userEvent.setup();
    renderAt("/");

    expect(screen.getByRole("heading", { name: /Encontra oportunidades/i })).toBeInTheDocument();
    await user.click(screen.getByRole("link", { name: /Criar a minha conta/i }));
    expect(await screen.findByRole("heading", { name: /Começa o teu percurso/i })).toBeInTheDocument();
  });

  it("persists the English language preference", async () => {
    const user = userEvent.setup();
    renderAt("/");

    await user.click(screen.getByRole("button", { name: /en/i }));
    expect(screen.getByRole("heading", { name: /Find opportunities/i })).toBeInTheDocument();
    expect(window.localStorage.getItem("rumo.locale")).toBe("en");
  });

  it("shows all seven onboarding stages without collecting real data", () => {
    renderAt("/profile?step=6");

    expect(screen.getByText("6 / 7")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Que apoio poderás precisar/i })).toBeInTheDocument();
    expect(screen.getByText(/tratado como estimativa/i)).toBeInTheDocument();
  });

  it("supports an empty plan state before an opportunity is added", () => {
    renderAt("/plan");

    expect(screen.getByRole("heading", { name: /O teu plano ainda está vazio/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Descobrir oportunidades/i })).toHaveAttribute("href", "/discover");
  });
});
