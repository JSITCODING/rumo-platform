# Registo de decisões de design

## Estado do documento

- **Responsável funcional:** Produto e UX
- **Última revisão:** 8 de agosto de 2026
- **Estado:** Ativo

Este documento regista decisões confirmadas de produto e experiência que afetam o projeto. Uma proposta só é vinculativa quando o seu estado é **Aprovada**.

## Estados

- **Proposta:** em discussão e ainda não vinculativa.
- **Aprovada:** confirmada pelos responsáveis aplicáveis.
- **Substituída:** trocada por uma decisão posterior, que deve ser referenciada.
- **Rejeitada:** avaliada e não adotada.

## Índice de decisões

| ID | Título | Estado | Data | Substitui |
| --- | --- | --- | --- | --- |
| P1 | Dashboard entre Análise do perfil e Descoberta | Aprovada | 7 de agosto de 2026 | — |
| P2 | Dashboard como página inicial do utilizador autenticado | Aprovada | 7 de agosto de 2026 | — |
| P3 | Ciclo de correção do perfil | Aprovada | 7 de agosto de 2026 | — |
| P4 | Saída do plano de candidatura vazio para Descoberta | Aprovada | 7 de agosto de 2026 | — |
| P5 | Prevenção de oportunidades duplicadas no plano | Aprovada | 7 de agosto de 2026 | — |
| P6 | Estados de tarefa separados do estado da informação | Aprovada | 7 de agosto de 2026 | — |
| P7 | Penpot como fonte canónica de design | Aprovada | 8 de agosto de 2026 | Regra original do Charter sobre Figma |
| P8 | Editorial documental como linguagem visual v0.2 | Aprovada | 8 de agosto de 2026 | Aplicação visual v0.1 |

## P1 — Dashboard entre Análise do perfil e Descoberta

- **Estado:** Aprovada
- **Data:** 7 de agosto de 2026
- **Responsável funcional:** Produto e UX

### Contexto

O Dashboard é um dos oito ecrãs confirmados do MVP, mas a jornada central inicial não indicava explicitamente a sua posição. Era necessário resolver a transição após a Análise do perfil sem introduzir outro ecrã.

### Opções consideradas

- avançar diretamente da Análise do perfil para a Descoberta de oportunidades;
- colocar o Dashboard depois da Análise do perfil e antes da Descoberta.

### Escolha

Adotar a sequência:

Análise do perfil → Dashboard → Descoberta de oportunidades.

### Consequências

- todos os oito ecrãs confirmados participam coerentemente na jornada;
- o estudante vê o seu estado e a próxima ação antes de pesquisar oportunidades;
- o Dashboard deve manter-se focado na jornada central;
- não é criado nenhum ecrã adicional.

### Evidências e referências

- docs/user-flow.md, secções “Fluxo principal”, “Dashboard” e “Pontos de decisão confirmados”.
- Aprovação do fluxo canónico v1.0 em 7 de agosto de 2026.

### Revisão

- **Condição de revisão:** alteração aprovada da jornada central ou remoção do Dashboard do MVP.
- **Decisão que substitui esta:** nenhuma.

## P2 — Dashboard como página inicial do utilizador autenticado

- **Estado:** Aprovada
- **Data:** 7 de agosto de 2026
- **Responsável funcional:** Produto e UX

### Contexto

Depois de concluir o onboarding e a análise inicial, o estudante precisa de um ponto de entrada estável para sessões posteriores, com acesso ao estado do perfil, ao plano e à próxima ação.

### Opções consideradas

- retomar sempre o último ecrã visitado;
- criar outra página inicial;
- usar o Dashboard confirmado como página inicial autenticada.

### Escolha

Depois de resolvida a autenticação, o Dashboard é a página inicial principal do utilizador que já concluiu a análise inicial.

### Consequências

- o Dashboard concentra resumo, próxima ação, estado do plano e acesso à Descoberta;
- a autenticação continua a ser um estado de apoio, não um novo ecrã primário definido neste fluxo;
- utilizadores que ainda não concluíram o perfil permanecem no percurso sequencial adequado;
- não é acrescentada uma nova página inicial ao MVP.

### Evidências e referências

- docs/user-flow.md, secções “Dashboard” e “Modelo de navegação”.
- Aprovação do fluxo canónico v1.0 em 7 de agosto de 2026.

### Revisão

- **Condição de revisão:** aprovação de um novo modelo de autenticação, retoma ou navegação.
- **Decisão que substitui esta:** nenhuma.

## P3 — Ciclo de correção do perfil

- **Estado:** Aprovada
- **Data:** 7 de agosto de 2026
- **Responsável funcional:** Produto e UX

### Contexto

A Análise do perfil pode revelar informação incorreta ou incompleta. O estudante precisa de corrigir o perfil sem ficar bloqueado e sem criar outro ecrã.

### Opções consideradas

- impedir correções a partir da análise;
- criar uma experiência adicional de edição;
- regressar ao Onboarding existente e recalcular a análise.

### Escolha

Adotar o ciclo:

Análise do perfil → Onboarding do estudante → Análise do perfil.

### Consequências

- o estudante pode corrigir dados antes de usar a análise;
- a nova análise deve refletir os dados atualizados;
- a incerteza continua preservada quando o estudante não conhece um valor exato;
- o Onboarding é reutilizado e não é criado um ecrã primário adicional.

### Evidências e referências

- docs/user-flow.md, secções “Análise do perfil” e “Ciclos principais”.
- Aprovação do fluxo canónico v1.0 em 7 de agosto de 2026.

### Revisão

- **Condição de revisão:** aprovação de um modelo de edição de perfil diferente.
- **Decisão que substitui esta:** nenhuma.

## P4 — Saída do plano de candidatura vazio para Descoberta

- **Estado:** Aprovada
- **Data:** 7 de agosto de 2026
- **Responsável funcional:** Produto e UX

### Contexto

O estudante pode abrir o Plano de candidatura antes de guardar qualquer oportunidade. Um estado vazio sem ação seria um beco sem saída na jornada.

### Opções consideradas

- mostrar apenas uma mensagem vazia;
- impedir o acesso ao plano vazio;
- explicar o estado e encaminhar para Descoberta de oportunidades.

### Escolha

No estado vazio, mostrar:

- “O teu plano ainda está vazio.”
- “Adiciona uma oportunidade para começares a organizar os próximos passos.”
- ação “Descobrir oportunidades”.

A ação segue Plano de candidatura → Descoberta de oportunidades.

### Consequências

- o estado vazio torna-se recuperável;
- o estudante regressa à jornada central;
- não são criados conteúdo artificial, oportunidades automáticas ou novo ecrã;
- a mesma lógica pode ser resumida no Dashboard quando ainda não existem oportunidades guardadas.

### Evidências e referências

- docs/user-flow.md, secção “Plano de candidatura”.
- Aprovação do fluxo canónico v1.0 em 7 de agosto de 2026.

### Revisão

- **Condição de revisão:** alteração aprovada da forma como oportunidades entram no plano.
- **Decisão que substitui esta:** nenhuma.

## P5 — Prevenção de oportunidades duplicadas no plano

- **Estado:** Aprovada
- **Data:** 7 de agosto de 2026
- **Responsável funcional:** Produto e UX

### Contexto

O estudante pode voltar aos detalhes de uma oportunidade já guardada. Repetir a ação de adicionar não deve criar entradas ou checklists duplicadas.

### Opções consideradas

- permitir duplicados;
- bloquear a ação sem indicar o próximo passo;
- reconhecer a oportunidade existente e encaminhar para a entrada já guardada.

### Escolha

Uma oportunidade só pode existir uma vez no plano do estudante. Se já estiver guardada, a ação passa conceptualmente de “Adicionar ao meu plano” para “Ver no meu plano”.

### Consequências

- evita dados, tarefas e prazos duplicados;
- mantém um único ponto de verdade por oportunidade no plano;
- a interface deve comunicar claramente o estado “já adicionada”;
- a decisão não acrescenta funcionalidades fora do MVP.

### Evidências e referências

- docs/user-flow.md, secção “Detalhes da oportunidade”.
- Aprovação do fluxo canónico v1.0 em 7 de agosto de 2026.

### Revisão

- **Condição de revisão:** aprovação explícita de múltiplas candidaturas independentes à mesma oportunidade.
- **Decisão que substitui esta:** nenhuma.

## P6 — Estados de tarefa separados do estado da informação

- **Estado:** Aprovada
- **Data:** 7 de agosto de 2026
- **Responsável funcional:** Produto e UX

### Contexto

O plano precisa de representar tanto o progresso do estudante como a confiança na informação. Combinar os dois conceitos poderia fazer uma tarefa concluída parecer verificada ou uma informação incerta parecer uma tarefa incompleta.

### Opções consideradas

- usar um único estado para progresso e verificação;
- adotar um conjunto maior de estados de tarefa;
- manter três estados simples de tarefa e representar a verificação separadamente.

### Escolha

Usar os estados de tarefa:

- **Por fazer**
- **Em curso**
- **Concluído**

Representar separadamente o estado da informação, por exemplo:

- **Por verificar**
- **Ainda não confirmado**
- **Confirmado na fonte disponível**

### Consequências

- o progresso continua simples e compreensível;
- concluir uma tarefa não confirma automaticamente a informação associada;
- incertezas, fontes e requisitos oficiais continuam visíveis;
- qualquer regra futura para confirmar fontes ou dados exige decisão própria e não é inferida por esta decisão.

### Evidências e referências

- docs/user-flow.md, secções “Plano de candidatura”, “Estados globais e recuperação” e “Princípios obrigatórios”.
- Aprovação do fluxo canónico v1.0 em 7 de agosto de 2026.

### Revisão

- **Condição de revisão:** testes de usabilidade demonstrarem necessidade de outro modelo ou aprovação de um fluxo de verificação.
- **Decisão que substitui esta:** nenhuma.

## P7 — Penpot como fonte canónica de design

- **Estado:** Aprovada
- **Data:** 8 de agosto de 2026
- **Responsável funcional:** Produto, UX e Design

### Contexto

O Figma foi inicialmente escolhido como fonte de verdade para design. As restrições de chamadas e colaboração passaram a bloquear a continuidade do trabalho. O projecto precisa de uma ferramenta aberta, colaborativa, exportável e capaz de suportar wireframes, foundations, componentes e protótipos sem criar dependência de formatos fechados.

### Opções consideradas

- manter o Figma como ferramenta activa;
- adoptar Penpot Cloud e preservar a opção de autoalojamento;
- autoalojar Penpot imediatamente.

### Escolha

Adoptar **Penpot Cloud** como fonte canónica de design. O Figma passa a arquivo histórico, sem novas alterações. O GitHub continua a ser a fonte de verdade para decisões, documentação, tokens, checkpoints e futura implementação.

A estrutura canónica do ficheiro é:

1. 00 — Cover
2. 01 — User Flows
3. 02 — Wireframes
4. 03 — Foundations
5. 04 — Components
6. 05 — Visual Designs
7. 06 — Prototype

### Consequências

- os oito wireframes mobile aprovados são migrados como referências bloqueadas;
- novas foundations, componentes, telas e protótipos são criados apenas no Penpot;
- `design/tokens.json` é o contrato aberto entre design e futura implementação;
- cada marco aprovado recebe exportação `.penpot`, imagens de revisão e registo no manifest;
- a exportação `.penpot` é publicada como anexo de GitHub Release, não directamente no histórico normal do repositório;
- o autoalojamento permanece uma opção futura se privacidade, escala ou continuidade operacional o exigirem;
- frontend e backend de produção continuam bloqueados até aprovação do design visual, protótipo e testes.

### Evidências e referências

- docs/project-charter-amendments.md, emenda A1.
- docs/penpot-workspace.md.
- docs/design-theory.md.
- design/tokens.json.
- Issue #14.

### Revisão

- **Condição de revisão:** impossibilidade operacional do Penpot Cloud, necessidade aprovada de autoalojamento ou alteração formal da governação de design.
- **Decisão que substitui esta:** nenhuma.

## P8 — Editorial documental como linguagem visual v0.2

- **Estado:** Aprovada
- **Data:** 8 de agosto de 2026
- **Responsável funcional:** Produto, UX e Design

### Contexto

Os conceitos v0.1 eram elegantes, mas repetiam a fórmula serifada, cartões arredondados, chips e formas abstractas. O resultado aproximava o Rumo de um produto SaaS genérico e não exprimia suficientemente o papel de guia sério para uma candidatura.

### Escolha

Adoptar a linguagem **Editorial documental**: composição inspirada em dossiers, guias e cadernos de orientação, com numeração, linhas, notas marginais, fontes dos dados e indicadores de certeza.

A tipografia seleccionada é Literata + IBM Plex Sans, com IBM Plex Mono para metadados. Raios ficam limitados a 4, 8 e 12 px; 999 px é reservado a pills de estado e filtro.

A fotografia deve ser documental, licenciada e contextualizada. Imagens geradas por IA não representam pessoas reais.

### Consequências

- os conceitos v0.1 permanecem bloqueados como snapshot;
- S01–S08 recebem versões v0.2 mobile e desktop no Penpot;
- cartões são usados apenas para comparação, escolha ou grupos accionáveis;
- Nota Rumo, Faixa de fonte, Próximo passo, Dossier de oportunidade e Checklist documental tornam-se componentes próprios;
- a produção continua bloqueada até aprovação visual, protótipo e testes.

### Evidências e referências

- docs/design-theory.md, versão 1.1;
- design/tokens.json;
- docs/assets/design/v02/;
- registo de fotografia em docs/assets/design/v02/photo-licenses.md;
- Issue #15.

### Revisão

- **Condição de revisão:** testes de utilizadores demonstrarem problemas de compreensão, confiança, legibilidade ou adequação cultural.
- **Decisão que substitui esta:** nenhuma.

## Decisões ainda não tomadas

P1–P8 confirmam navegação, estados, governação e linguagem visual necessários ao fluxo canónico v1.0. Não definem:

- tecnologia ou arquitetura de implementação;
- regras automáticas de elegibilidade;
- fontes, cadência ou processo operacional de verificação;
- campos finais de registo ou onboarding;
- requisitos legais, consentimentos ou retenção de dados;
- conteúdo final dos wireframes;
- funcionalidades além dos oito ecrãs do MVP.

Estes assuntos permanecem sujeitos a decisões e aprovações próprias.
