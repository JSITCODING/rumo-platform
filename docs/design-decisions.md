# Registo de decisões de design

## Estado do documento

- **Responsável funcional:** Produto e UX
- **Última revisão:** 29 de setembro de 2026
- **Estado:** Ativo

Este documento regista decisões confirmadas de produto e experiência que afetam o projeto. Uma proposta só é vinculativa quando o seu estado é **Aprovada**.

## Estados

- **Proposta:** em discussão e ainda não vinculativa.
- **Aprovada:** confirmada pelos responsáveis aplicáveis.
- **Parcialmente substituída:** substituída em parte; as partes não afetadas continuam vinculativas.
- **Substituída:** trocada por uma decisão posterior, que deve ser referenciada.
- **Rejeitada:** avaliada e não adotada.

## Índice de decisões

| ID | Título | Estado | Data | Substitui |
| --- | --- | --- | --- | --- |
| P1 | Dashboard entre Análise do perfil e Descoberta | Aprovada | 7 de agosto de 2026 | — |
| P2 | Dashboard como página inicial do utilizador autenticado | Parcialmente substituída | 7 de agosto de 2026 | — |
| P3 | Ciclo de correção do perfil | Aprovada | 7 de agosto de 2026 | — |
| P4 | Saída do plano de candidatura vazio para Descoberta | Aprovada | 7 de agosto de 2026 | — |
| P5 | Prevenção de oportunidades duplicadas no plano | Aprovada | 7 de agosto de 2026 | — |
| P6 | Estados de tarefa separados do estado da informação | Aprovada | 7 de agosto de 2026 | — |
| P7 | Protótipo PWA bilingue com dados sintéticos | Parcialmente substituída | 27 de setembro de 2026 | — |
| P8 | Onboarding antes do registo e análise antes da barreira | Aprovada | 27 de setembro de 2026 | P2 (fluxo inicial) |
| P9 | Direção visual Personal Atlas | Aprovada | 28 de setembro de 2026 | P7 (visual) |
| P10 | Vocabulário e codificação dos estados da informação | Proposta | 29 de setembro de 2026 | — |

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
- P8 insere o registo para guardar entre Análise e Dashboard;
- não é criado nenhum ecrã adicional.

### Evidências e referências

- docs/user-flow.md, secções “Fluxo principal”, “Dashboard” e “Pontos de decisão confirmados”.
- Aprovação do fluxo canónico v1.0 em 7 de agosto de 2026.

### Revisão

- **Condição de revisão:** alteração aprovada da jornada central ou remoção do Dashboard do MVP.
- **Decisão que substitui esta:** nenhuma.
- **Métrica relacionada:** `docs/validation-plan.md`.

## P2 — Dashboard como página inicial do utilizador autenticado

- **Estado:** Parcialmente substituída
- **Data:** 7 de agosto de 2026
- **Responsável funcional:** Produto e UX
- **Substituída em parte por:** P8 (fluxo inicial)

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
- **Refinado por:** P10 (proposta)

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
- **Métrica relacionada:** `docs/validation-plan.md`.

## P7 — Protótipo PWA bilingue com dados sintéticos

- **Estado:** Parcialmente substituída
- **Data:** 27 de setembro de 2026
- **Responsável funcional:** Produto
- **Substituída em parte por:** P9 (visual editorial)
- **Refinado por:** P10 (proposta)

### Contexto

Os oito wireframes e o fluxo canónico foram escolhidos como base para um
protótipo navegável destinado a testes e apresentação de portefólio.

### Escolha

Implementar os oito ecrãs como PWA React e TypeScript, mobile-first, com
português e inglês completos, movimento reduzido quando solicitado pelo
sistema e apenas dados sintéticos. Usar `confirmado`, `estimado` e `por
verificar` como estados distintos da informação.

### Consequências

- não existe autenticação, backend, pagamento ou submissão real;
- nenhum dado real de estudante ou instituição deve entrar no protótipo;
- a publicação só ocorre depois de revisão de acessibilidade, privacidade e
  qualidade;
- o visual evolui os wireframes para um sistema calmo e profissional, sem
  alterar os oito ecrãs primários nem as decisões do fluxo.

### Evidências e referências

- `docs/user-flow.md`
- `docs/wireframes.md`
- tarefa de implementação aprovada em 27 de setembro de 2026.

### Revisão

- **Condição de revisão:** aprovação de backend, autenticação ou regras reais de dados.
- **Decisão que substitui esta:** nenhuma.
- **Métrica relacionada:** `docs/validation-plan.md`.

## P8 — Onboarding antes do registo e análise antes da barreira

- **Estado:** Aprovada
- **Data:** 27 de setembro de 2026
- **Responsável funcional:** Produto

### Contexto

O protótipo inicial pedia um registo demonstrativo antes de o estudante receber
valor. Foi aprovada uma experiência de validação que permite concluir o perfil
e ver uma análise inicial antes de pedir conta.

### Escolha

Adotar a sequência Landing → Onboarding → Análise inicial → Registo para
guardar → Dashboard. O registo continua demonstrativo e não transmite dados.
As respostas do perfil permanecem apenas durante a sessão do navegador.

### Consequências

- o estudante recebe uma análise responsável antes da barreira de registo;
- o pedido de conta explica que serve para guardar e continuar;
- a hipótese de maior retenção só pode ser afirmada depois de validação real;
- eventos de progressão não incluem respostas do perfil nem dados pessoais;
- perda da sessão do navegador antes do registo elimina as respostas; risco aceite no protótipo;
- o Dashboard continua a ser a página inicial conceptual após autenticação.

### Revisão

- **Condição de revisão:** evidência de validação, aprovação de autenticação real ou requisitos formais de retenção.
- **Decisão que substitui esta:** nenhuma.
- **Métrica relacionada:** `docs/validation-plan.md`.

## P9 — Direção visual Personal Atlas

- **Estado:** Aprovada
- **Data:** 28 de setembro de 2026
- **Responsável funcional:** Produto e UX

### Contexto

O primeiro protótipo de alta fidelidade preservava o fluxo, mas distribuía
demasiada informação por cartões com peso visual semelhante. A direção
Personal Atlas foi escolhida para dar ao produto uma identidade reconhecível
através do percurso do estudante, sem aumentar a densidade ou sugerir certezas
que os dados demonstrativos não suportam.

### Escolha

Usar Dandara como identidade integralmente sintética e organizar cada ecrã em
torno de uma única tarefa. O sistema visual usa papel quente, tinta escura,
azul Atlântico e terracota restrita; Newsreader para títulos; Manrope para a
interface; e posição, linha e marcadores de percurso como gramática de marca.

O Dashboard torna o percurso visível desde Luanda até ao próximo passo, com
estados de informação ainda separados do progresso. Cartões repetidos,
sombras genéricas, pílulas decorativas e secções de igual ênfase são reduzidos.

### Consequências

- o Dashboard torna-se a expressão de referência da identidade Personal Atlas;
- os restantes ecrãs usam listas, folhas de evidência e checklists apropriadas à tarefa;
- a ilustração de Luanda é omitida até existir um ativo público, original e necessário;
- a identidade não altera o fluxo value-first, os oito ecrãs ou os limites de dados;
- ícone, imagens de loja e filme serão derivados desta direção depois de a interface estabilizar.

### Evidências e referências

- `docs/personal-atlas-direction.md`
- comparação visual lado a lado: [referência aprovada e Dashboard final](design-qa.md#visual-comparison);
- referência visual Personal Atlas aprovada em 28 de setembro de 2026;
- princípios de propósito, simplicidade, hierarquia e redução de informação concorrente fornecidos para esta revisão.

### Revisão

- **Condição de revisão:** testes visuais ou de utilização demonstrarem perda de clareza, identidade ou acessibilidade.
- **Decisão que substitui esta:** nenhuma.
- **Métrica relacionada:** `docs/validation-plan.md`.

## P10 — Vocabulário e codificação dos estados da informação

- **Estado:** Proposta
- **Data:** 29 de setembro de 2026
- **Responsável funcional:** Produto e UX

### Contexto

P6 separa o estado da tarefa do estado da informação, mas usa os exemplos
“Por verificar”, “Ainda não confirmado” e “Confirmado na fonte disponível”.
P7 introduz o conjunto `confirmado`, `estimado` e `por verificar`. É necessário
propor um vocabulário único e uma codificação que não dependa apenas da cor.

### Opções consideradas

- manter os dois vocabulários em paralelo;
- comunicar os estados apenas por cor;
- adotar um conjunto canónico com linha, marcador e rótulo distintos.

### Escolha proposta

Adotar `confirmado`, `estimado` e `por verificar` como conjunto canónico.

| P6 | P10 proposto | Estado do mapeamento |
| --- | --- | --- |
| Por verificar | por verificar | a confirmar pelo Produto e UX |
| Ainda não confirmado | estimado | a confirmar pelo Produto e UX |
| Confirmado na fonte disponível | confirmado | a confirmar pelo Produto e UX |

Cada estado usa simultaneamente linha, preenchimento do marcador e rótulo:

| Estado | Linha | Marcador | Rótulo |
| --- | --- | --- | --- |
| confirmado | sólida | preenchido | sempre visível |
| estimado | tracejada | meio preenchido | sempre visível |
| por verificar | pontilhada | vazio | sempre visível |

A codificação deve permanecer distinguível em escala de cinzentos. Os estados
de tarefa **Por fazer**, **Em curso** e **Concluído** permanecem separados.
Concluir uma tarefa nunca altera o estado da informação associada.

### Consequências propostas

- os ecrãs partilham um vocabulário único sem ocultar incerteza;
- linha, marcador e texto evitam uma distinção baseada apenas na cor;
- a proposta não define como uma fonte passa a ser considerada confirmada;
- P6 continua vinculativa quanto à separação entre tarefa e informação.

### Evidências e referências

- P6 — Estados de tarefa separados do estado da informação.
- P7 — Protótipo PWA bilingue com dados sintéticos.
- `docs/personal-atlas-direction.md`, secção “Testes de qualidade”.

### Revisão

- **Condição de revisão:** aprovação ou alteração do vocabulário e do mapeamento pelo Produto e UX, ou testes de acessibilidade demonstrarem ambiguidade.
- **Decisão que substitui esta:** nenhuma.

## Decisões ainda não tomadas

P1–P9 confirmam apenas navegação, comportamento de estados e direção visual necessários ao fluxo canónico v1.0. P10 permanece uma proposta. Não definem:

- tecnologia ou arquitetura de implementação;
- regras automáticas de elegibilidade;
- fontes, cadência ou processo operacional de verificação;
- regras para confirmar fontes ou alterar o estado da informação;
- campos finais de registo ou onboarding;
- requisitos legais, consentimentos ou retenção de dados;
- conteúdo final dos wireframes;
- funcionalidades além dos oito ecrãs do MVP.

Estes assuntos permanecem sujeitos a decisões e aprovações próprias.
