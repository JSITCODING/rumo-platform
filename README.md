# Rumo Platform

Rumo é um protótipo mobile-first que ajuda estudantes angolanos a explorar
oportunidades internacionais de estudo com mais clareza. Explica
compatibilidade sem prometer admissão, separa informação confirmada, estimada
e por verificar, e transforma uma oportunidade numa checklist compreensível.

O protótipo usa apenas dados sintéticos. Não existe autenticação real,
backend, submissão de candidaturas ou recolha de dados pessoais.

## Executar localmente

```bash
npm install
npm run dev
```

Verificações:

```bash
npm run check
```

## Percurso implementado

1. Landing page
2. Registo demonstrativo
3. Onboarding em sete etapas
4. Análise do perfil
5. Dashboard
6. Descoberta de oportunidades
7. Detalhes da oportunidade
8. Plano de candidatura

A interface está disponível integralmente em português e inglês. A preferência
de idioma fica apenas no armazenamento local do navegador.

## Estrutura

```text
.
├── AGENTS.md
├── src/
├── public/
├── package.json
└── docs/
    ├── product-brief.md
    ├── mvp-scope.md
    ├── user-flow.md
    ├── design-decisions.md
    ├── data-requirements.md
    └── testing-plan.md
```

## Documentos

- [Visão do produto](docs/product-brief.md)
- [Escopo do MVP](docs/mvp-scope.md)
- [Fluxos de utilização](docs/user-flow.md)
- [Decisões de design](docs/design-decisions.md)
- [Requisitos de dados](docs/data-requirements.md)
- [Plano de testes](docs/testing-plan.md)
- [Guião bilingue de validação](docs/research-survey.md)
- [Wireframes de referência](docs/wireframes.md)

## Limites responsáveis

- Toda oportunidade e instituição exibida é demonstrativa.
- Compatibilidade não significa elegibilidade nem admissão.
- Custos, prazos, bolsas, equivalências e requisitos devem ser confirmados na
  fonte oficial.
- A aplicação não transmite formulários nem dados para serviços externos.

O workflow de GitHub Pages está preparado, mas a publicação depende de revisão
e autorização explícita.

As orientações para agentes e colaboradores automatizados estão em
[AGENTS.md](AGENTS.md).
