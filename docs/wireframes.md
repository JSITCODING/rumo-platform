# Wireframes do MVP

## Estado do documento

- **Versão:** 1.0
- **Data:** 8 de agosto de 2026
- **Estado:** Aprovado
- **Âmbito:** oito ecrãs mobile-first do MVP
- **Fonte canónica de fluxo:** [`docs/user-flow.md`](./user-flow.md)
- **Fonte de verdade para design activo:** Penpot Cloud — ver [`docs/penpot-workspace.md`](./penpot-workspace.md)
- **Arquivo histórico — não editar:** [wireframes no Figma](https://www.figma.com/design/dCYPl6m4YvlnrDSAsKWHzP) e [fluxo no FigJam](https://www.figma.com/board/DIXxIYHOC7CMFnwB1s4j8U)

> Estes wireframes móveis foram aprovados. Os PNGs são a referência de migração e devem entrar no Penpot como imagens bloqueadas, sem reabrir decisões de layout nesta etapa. Não representam implementação, visual design final ou dados institucionais verificados.

## Princípios aplicados

- Mobile-first, com foco em estudantes angolanos que podem usar principalmente o telemóvel.
- Português claro e adequado ao contexto angolano.
- Apenas os oito ecrãs confirmados para o MVP.
- Dados fictícios identificados como “demonstrativos”, “não verificados”, “estimados” ou “por confirmar”.
- Compatibilidade explicada como orientação, nunca como garantia de admissão.
- Progresso de tarefas separado do estado de verificação da informação.
- Acção principal e estados alternativos essenciais visíveis em cada ecrã.

## S01 — Landing page

![Wireframe S01 — Landing page](./assets/wireframes/s01-landing-page.png)

**Acção principal:** Criar a minha conta → S02.  
**Estado alternativo essencial:** entrar numa conta existente ou sair sem registo.

## S02 — Registo

![Wireframe S02 — Registo](./assets/wireframes/s02-registo.png)

**Acção principal:** Criar conta → S03.  
**Estado alternativo essencial:** validação de email, consentimento em falta ou erro recuperável.

## S03 — Onboarding do estudante

![Wireframe S03 — Onboarding](./assets/wireframes/s03-onboarding.png)

**Acção principal:** Continuar até pedir a análise → S04.  
**Estado alternativo essencial:** resposta aproximada, “Ainda não sei”, voltar ou retomar progresso.

## S04 — Análise do perfil

![Wireframe S04 — Análise do perfil](./assets/wireframes/s04-analise-perfil.png)

**Acção principal:** Continuar para o Dashboard → S05.  
**Estado alternativo essencial:** corrigir perfil → S03 → S04.

## S05 — Dashboard

![Wireframe S05 — Dashboard](./assets/wireframes/s05-dashboard.png)

**Acção principal:** Descobrir oportunidades → S06.  
**Estado alternativo essencial:** plano vazio, abrir o plano ou rever a análise.

## S06 — Descoberta de oportunidades

![Wireframe S06 — Descoberta](./assets/wireframes/s06-descoberta.png)

**Acção principal:** Ver detalhes → S07.  
**Estado alternativo essencial:** zero resultados, informação incompleta ou filtros sem correspondência.

## S07 — Detalhes da oportunidade

![Wireframe S07 — Detalhes](./assets/wireframes/s07-detalhes.png)

**Acção principal:** Adicionar ao meu plano → S08.  
**Estado alternativo essencial:** já adicionada, falha ao guardar ou regresso à descoberta.

## S08 — Plano de candidatura

![Wireframe S08 — Plano de candidatura](./assets/wireframes/s08-plano-candidatura.png)

**Acção principal:** actualizar a próxima tarefa no próprio plano.  
**Estado alternativo essencial:** plano vazio → S06, prazo por verificar ou erro ao guardar.

## Critérios de revisão

- [x] Os oito ecrãs correspondem exactamente a S01–S08 do fluxo canónico.
- [x] A hierarquia e as acções principais são compreensíveis em telemóvel.
- [x] Nenhum ecrã ou funcionalidade fora do MVP foi introduzido.
- [x] Estados de vazio, validação, erro e incerteza são suficientes para a jornada.
- [x] Copy não promete admissão, bolsa, financiamento ou visto.
- [x] Dados demonstrativos nunca parecem informação verificada.
- [x] O pacote aprovado no GitHub é a referência de migração para o Penpot.

## Fora do âmbito

- identidade visual final;
- protótipo navegável de alta fidelidade;
- implementação funcional;
- regras reais de elegibilidade;
- informação verificada de universidades, bolsas, prazos ou vistos.
