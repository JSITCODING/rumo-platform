# Rumo — Fluxo canónico do utilizador

## Estado do documento

- **Versão:** 1.1
- **Data de aprovação da base do fluxo:** 7 de agosto de 2026
- **Última revisão:** 8 de agosto de 2026
- **Estado:** Aprovado para preparação do diagrama; wireframes ainda não autorizados
- **Responsável funcional:** Produto e UX
- **Fonte de produto:** Rumo Project Charter v1.0, de 6 de agosto de 2026
- **Destino de design:** Figma, página “01 — User Flows”
- **Finalidade:** definir a fonte canónica do fluxo de ponta a ponta do MVP antes do diagrama em Figma, dos wireframes e da implementação.

## 1. Escopo e limites

Este documento define como um estudante percorre os oito ecrãs primários confirmados para o MVP:

1. Landing Page
2. Registo
3. Onboarding do estudante
4. Análise do perfil
5. Dashboard
6. Descoberta de oportunidades
7. Detalhes da oportunidade
8. Plano de candidatura

O fluxo é mobile-first e não introduz outros ecrãs primários. Passos internos, mensagens de validação, alertas, estados de carregamento, erro, vazio, confirmação, retoma e autenticação são estados de apoio dos oito ecrãs, não novos ecrãs primários.

Este documento:

- confirma navegação, ações principais, transições, decisões e estados alternativos essenciais;
- identifica a informação mínima que deve circular entre os ecrãs;
- prepara a estrutura lógica do diagrama em Figma;
- não define layout, hierarquia visual, componentes finais ou comportamento detalhado de wireframes;
- não autoriza implementação.

## 2. Atores

### Ator principal — Estudante

Estudante angolano que está a concluir o ensino secundário, procura uma licenciatura ou é recém-licenciado e procura uma oportunidade de pós-graduação. Pode ter pouca experiência com candidaturas internacionais, ligação limitada à Internet e utilizar sobretudo um telemóvel.

### Ator de apoio — Pai, mãe ou responsável

Pode apoiar a decisão ou o financiamento, mas não tem conta nem fluxo dedicado no MVP.

## 3. Princípios obrigatórios

- Usar português claro e adequado a utilizadores angolanos na interface.
- Explicar compatibilidade; não a apresentar como decisão de admissão.
- Não garantir admissão, bolsa, financiamento ou visto.
- Não preencher informação desconhecida com valores inventados.
- Manter visíveis as incertezas e os requisitos por verificar.
- Recomendar a confirmação de informação crítica junto da fonte oficial.
- Não substituir instruções oficiais das instituições.
- Não submeter candidaturas em nome do estudante no MVP.
- Preservar o progresso quando for razoavelmente possível em caso de erro ou perda de ligação.
- Recolher apenas a informação necessária à finalidade aprovada; formatos, obrigatoriedade por campo, retenção e base aplicável permanecem por definir em requisitos próprios.

## 4. Identificadores canónicos

### Ecrãs

| ID | Ecrã |
| --- | --- |
| S01 | Landing Page |
| S02 | Registo |
| S03 | Onboarding do estudante |
| S04 | Análise do perfil |
| S05 | Dashboard |
| S06 | Descoberta de oportunidades |
| S07 | Detalhes da oportunidade |
| S08 | Plano de candidatura |

### Decisões

| ID | Pergunta |
| --- | --- |
| D01 | O estudante decidiu criar uma conta? |
| D02 | O registo é válido e a conta foi criada? |
| D03 | Existe informação mínima suficiente para análise? |
| D04 | O estudante considera os dados do perfil corretos? |
| D05 | Qual é a próxima ação escolhida no Dashboard? |
| D06 | Existem oportunidades para os critérios atuais? |
| D07 | O estudante abriu uma oportunidade? |
| D08 | O estudante quer adicionar a oportunidade ao plano? |
| D09 | A oportunidade já existe no plano? |
| D10 | O plano contém pelo menos uma oportunidade? |

## 5. Fluxo canónico de ponta a ponta

S01 Landing Page  
→ D01 Criar conta  
→ S02 Registo  
→ D02 Conta criada  
→ S03 Onboarding  
→ D03 Informação mínima completa  
→ S04 Análise do perfil  
→ D04 Dados corretos  
→ S05 Dashboard  
→ D05 Descobrir oportunidades  
→ S06 Descoberta  
→ D06 Existem resultados  
→ D07 Abrir oportunidade  
→ S07 Detalhes  
→ D08 Adicionar ao plano  
→ D09 Ainda não existe no plano  
→ S08 Plano de candidatura  
→ Checklist personalizada e próxima ação compreendida.

O percurso central considera-se concluído quando o estudante:

1. compreende o propósito da Rumo e os seus limites;
2. cria uma conta;
3. fornece informação suficiente para uma análise inicial;
4. compreende os principais pontos fortes, limitações e incertezas do perfil;
5. chega ao Dashboard;
6. encontra pelo menos uma oportunidade potencialmente compatível;
7. consulta requisitos, fontes e estado de verificação;
8. adiciona deliberadamente a oportunidade ao plano;
9. recebe uma checklist organizada e compreende a próxima ação.

## 6. Resumo operacional por ecrã

| ID | Entrada principal | Ação principal | Saída principal | Alternativas essenciais |
| --- | --- | --- | --- | --- |
| S01 | Descoberta externa da Rumo | Criar a minha conta | S02 | Sair sem registo |
| S02 | S01 | Criar conta | S03 | Corrigir validação; tentar novamente após erro |
| S03 | S02 ou ciclo de correção | Analisar o meu perfil | S04 | Completar informação em falta; retomar progresso |
| S04 | S03 | Continuar | S05 | Corrigir perfil em S03; tentar análise novamente |
| S05 | S04 ou sessão autenticada posterior | Descobrir oportunidades | S06 | Abrir S08; rever S04 |
| S06 | S05 ou S08 vazio | Abrir oportunidade | S07 | Alterar filtros; recuperar de vazio ou erro |
| S07 | S06 | Adicionar ao meu plano | S08 | Regressar a S06; ver oportunidade já adicionada em S08 |
| S08 | S07 ou S05 | Consultar/atualizar checklist | Próxima tarefa no próprio S08 | Ir para S06 quando vazio; adicionar outra oportunidade |

## 7. Fluxo detalhado por ecrã

### 7.1 S01 — Landing Page

**Objetivo do estudante:** perceber o que a Rumo faz e decidir se quer começar.

**Entrada:** visita directa, referência ou canal de aquisição. A origem específica só pode ser conservada se a recolha for aprovada.

**A Rumo comunica:**

- ajuda a descobrir oportunidades internacionais de estudo;
- usa o perfil para explicar compatibilidade;
- ajuda a organizar candidaturas passo a passo;
- os destinos iniciais são Portugal, Alemanha e Espanha;
- não garante admissão, bolsa, financiamento ou visto.

**Ação principal:** “Criar a minha conta”.

**D01 — O estudante decidiu criar uma conta?**

- **Sim:** S01 → S02.
- **Não:** pode sair; é uma saída válida, não um erro.

**Estados essenciais:** conteúdo disponível; falha de carregamento com nova tentativa; saída sem conversão.

**Dados encaminhados:** nenhum dado de perfil.

### 7.2 S02 — Registo

**Objetivo do estudante:** criar a conta necessária para iniciar a experiência personalizada.

**Entrada:** S01.

O estudante fornece a informação mínima de conta que vier a ser aprovada e aceita os termos e condições de privacidade aplicáveis. Os campos finais, regras de consentimento e requisitos legais permanecem por definir fora deste fluxo.

**Ação principal:** “Criar conta”.

**D02 — O registo é válido e a conta foi criada?**

- **Sim:** S02 → S03.
- **Campos inválidos ou consentimento em falta:** permanecer em S02, mostrar validação clara junto dos campos afetados e preservar os dados válidos sempre que possível.
- **Email já utilizado ou conflito equivalente:** explicar o estado e oferecer recuperação adequada dentro do estado de autenticação aprovado; não criar outro ecrã primário.
- **Erro técnico ou perda de ligação:** explicar o ocorrido, indicar se os dados foram preservados e permitir nova tentativa.

Exemplos de copy:

- “Introduz um endereço de email válido.”
- “Este campo é obrigatório.”
- “É necessário aceitar os termos para continuar.”

**Dados encaminhados:** identificador da conta, informação mínima de conta e estado de consentimento. Nenhuma conclusão de compatibilidade é produzida nesta fase.

### 7.3 S03 — Onboarding do estudante

**Objetivo do estudante:** fornecer a informação mínima necessária para uma análise útil do perfil.

**Entrada:** S02 após criação da conta; S04 quando o estudante decide corrigir dados; retoma autenticada quando o perfil ainda não está completo.

O onboarding usa divulgação progressiva, evita um questionário longo num único bloco e explica por que razão solicita informação importante ou potencialmente sensível.

**Áreas mínimas confirmadas pelo Charter:**

- nível académico atual;
- histórico académico ou resultados;
- nível de estudo pretendido;
- áreas de estudo preferidas;
- destinos preferidos, limitados a Portugal, Alemanha e Espanha;
- capacidades linguísticas relevantes;
- capacidade financeira aproximada;
- necessidade ou preferência por bolsa ou outro financiamento;
- entrada pretendida ou horizonte aproximado de estudo.

As opções, formatos, validações e obrigatoriedade exacta por campo permanecem **por definir**. Esta lista confirma categorias necessárias ao fluxo, não um esquema final de dados.

**Progressão interna:**

Início  
→ Informação académica  
→ Preferências de estudo  
→ Destinos  
→ Línguas  
→ Informação financeira  
→ Calendário  
→ Revisão e conclusão.

Estas etapas pertencem à experiência S03 e não são novos ecrãs primários.

**Ação principal:** “Analisar o meu perfil”.

**D03 — Existe informação mínima suficiente para análise?**

- **Sim:** S03 → S04.
- **Não:** permanecer em S03, identificar o que falta e explicar por que é necessário.
- **Resposta incerta ou aproximada permitida:** conservar a incerteza; não converter uma estimativa em dado confirmado.
- **Interrupção ou perda de ligação:** preservar o progresso razoavelmente possível e permitir retoma.

Exemplos de estado da informação:

- capacidade financeira: aproximada;
- nível de língua: autodeclarado;
- equivalência académica: requer verificação.

**Dados encaminhados:** perfil estruturado nas categorias confirmadas, com proveniência e grau de certeza quando aplicável.

### 7.4 S04 — Análise do perfil

**Objetivo do estudante:** compreender como a informação fornecida afeta as suas opções de estudo internacional.

**Entrada:** S03 após pedido de análise ou após correção do perfil.

A análise explica o perfil atual; não é uma decisão de admissão.

**Estrutura mínima:**

- perfil académico;
- perfil financeiro;
- preparação linguística;
- limitações;
- informação que requer verificação;
- orientação sugerida para a pesquisa.

A interface distingue:

- **Confirmado pela informação do estudante:** por exemplo, “Indicastes Portugal e Alemanha como destinos preferidos.”
- **Estimado:** por exemplo, “O teu orçamento poderá limitar algumas opções sem apoio financeiro.”
- **Requer verificação:** por exemplo, “A equivalência da tua qualificação deve ser confirmada para cada instituição.”

**Ação principal:** “Continuar”.

**D04 — O estudante considera os dados do perfil corretos?**

- **Sim:** S04 → S05.
- **Não:** S04 → S03 → S04, com nova análise após correção.
- **Falha de processamento:** manter o perfil, explicar que não foi possível concluir a análise e permitir nova tentativa.
- **Lacunas ou incertezas:** mostrar o que pode ser concluído responsavelmente e o que permanece por verificar; ausência de dados não equivale a inelegibilidade.

**Dados encaminhados:** perfil estruturado, categorias da análise, pontos fortes, limitações, informação não resolvida ou não verificada e indicadores de preparação.

### 7.5 S05 — Dashboard

**Objetivo do estudante:** perceber a sua situação atual e escolher a próxima ação relevante.

**Entrada:** S04 após a análise inicial; entrada autenticada principal em sessões posteriores para quem já concluiu a análise.

Depois da análise inicial, o Dashboard torna-se o ponto central autenticado.

**Conteúdo mínimo:**

- resumo do perfil ou preparação;
- próxima ação relevante;
- estado do plano de candidatura;
- ações importantes pendentes;
- acesso à Descoberta de oportunidades.

**Ação principal para novo estudante:** “Descobrir oportunidades”.

**D05 — Qual é a próxima ação escolhida?**

- **Descobrir oportunidades:** S05 → S06.
- **Abrir plano:** S05 → S08.
- **Rever análise:** S05 → S04.

Antes de existirem oportunidades guardadas, mostrar “Ainda não adicionaste nenhuma oportunidade ao teu plano.” e a ação “Descobrir oportunidades”.

Quem regressa autenticado com onboarding incompleto retoma S03; essa retoma é um estado de apoio e não altera S05 como página inicial de quem já concluiu a análise.

**Estados essenciais:** perfil analisado sem plano; perfil analisado com plano; ações pendentes; carregamento; erro recuperável. O Dashboard não introduz funcionalidades alheias à jornada central.

**Dados consumidos:** resumo da análise, estado do perfil, oportunidades no plano, progresso das tarefas e próximas ações conhecidas.

### 7.6 S06 — Descoberta de oportunidades

**Objetivo do estudante:** encontrar oportunidades relevantes e potencialmente compatíveis com o seu perfil.

**Entrada:** S05; S08 quando o plano está vazio ou quando o estudante quer adicionar outra oportunidade; S07 quando regressa aos resultados.

A descoberta usa os elementos relevantes do perfil: nível pretendido, áreas e destinos preferidos, informação financeira, necessidade ou preferência de bolsa, línguas e entrada pretendida.

Cada cartão deve fornecer informação suficiente para decidir se vale a pena investigar, quando disponível:

- instituição e programa;
- destino e nível de estudo;
- custos principais;
- indicação de bolsa ou financiamento;
- explicação de compatibilidade;
- estado de verificação.

A compatibilidade responde a “Porque é que esta oportunidade está a aparecer para mim?” e nunca implica “Vais ser aceite.”

**Ação principal:** abrir uma oportunidade.

**D06 — Existem oportunidades para os critérios atuais?**

- **Sim:** apresentar resultados explicados.
- **Não:** mostrar “Não encontrámos oportunidades com estes critérios.” e permitir “Alterar filtros”. Não fabricar correspondências fracas para evitar o estado vazio.

**D07 — O estudante abriu uma oportunidade?**

- **Sim:** S06 → S07, preservando o contexto da lista e dos filtros.
- **Não:** permanece em S06, ajusta filtros ou regressa ao ponto anterior.

**Informação incompleta ou não verificada:** manter a oportunidade visível quando ainda for útil, identificando claramente “Prazo por verificar”, “Informação de bolsa por confirmar” ou “Requisito académico por verificar”.

**Estados essenciais:** carregamento; resultados; zero resultados; filtros sem correspondência; resultados com dados parciais; erro de carregamento com nova tentativa.

**Dados encaminhados:** oportunidade selecionada e contexto de compatibilidade, verificação, filtros e origem da navegação.

### 7.7 S07 — Detalhes da oportunidade

**Objetivo do estudante:** decidir se a oportunidade merece entrar no plano de candidatura.

**Entrada:** S06 a partir de uma oportunidade selecionada.

**Conteúdo, quando disponível:**

- instituição, programa, localização e país;
- nível e área de estudo;
- requisitos académicos e linguísticos;
- custos estimados;
- informação de bolsa ou financiamento;
- calendário da candidatura;
- documentos necessários;
- explicação de compatibilidade;
- fonte e estado de verificação.

A informação desconhecida não pode ser preenchida com valores inventados.

**Ação principal:** “Adicionar ao meu plano”.

**D08 — O estudante quer adicionar a oportunidade ao plano?**

- **Sim:** avaliar D09.
- **Não:** S07 → S06, preservando o contexto da descoberta.

**D09 — A oportunidade já existe no plano?**

- **Não:** guardar uma única entrada, gerar a checklist com informação conhecida e avançar S07 → S08.
- **Sim:** não criar duplicado; a ação passa conceptualmente a “Ver no meu plano” e abre S08.
- **Falha ao guardar:** permanecer em S07, explicar se a operação foi concluída ou não e permitir nova tentativa sem duplicar.

**Dados encaminhados:** identificador, programa e instituição, requisitos e documentos conhecidos, prazos disponíveis, fontes, estado de verificação e contexto necessário à personalização das tarefas.

A incerteza é preservada. Um prazo não verificado não pode aparecer como prazo confirmado na checklist.

### 7.8 S08 — Plano de candidatura

**Objetivo do estudante:** transformar interesse numa sequência compreensível de ações.

**Entrada:** S07 após adicionar ou abrir uma oportunidade já guardada; S05; S06 através da continuação do ciclo de planeamento.

Para cada oportunidade guardada, o estudante deve perceber:

- o que precisa de fazer;
- o que já concluiu;
- a próxima ação;
- prazos relevantes;
- dependências;
- informação que ainda exige confirmação.

A checklist resulta da combinação do perfil do estudante com os requisitos conhecidos da oportunidade. É orientação organizacional e não substitui as instruções oficiais.

**Categorias possíveis de tarefa, conforme a oportunidade:**

- confirmar elegibilidade académica;
- confirmar requisitos linguísticos;
- preparar documentos académicos;
- verificar requisitos de tradução;
- confirmar o prazo oficial;
- verificar requisitos de bolsa;
- preparar materiais da candidatura;
- concluir o processo oficial da instituição.

A Rumo não submete a candidatura em nome do estudante no MVP.

**Ação principal:** consultar e atualizar a próxima tarefa da checklist.

**D10 — O plano contém pelo menos uma oportunidade?**

- **Sim:** mostrar oportunidades, progresso e próxima tarefa.
- **Não:** mostrar “O teu plano ainda está vazio.”, explicar “Adiciona uma oportunidade para começares a organizar os próximos passos.” e oferecer “Descobrir oportunidades”; S08 → S06.

**Estados mínimos da tarefa:**

- Por fazer
- Em curso
- Concluído

O estado da tarefa é separado do estado da informação. Exemplo: a tarefa “Confirmar prazo oficial” pode estar “Por fazer” enquanto a informação permanece “Prazo por verificar”.

**Estados essenciais:** plano vazio; plano com uma ou mais oportunidades; checklist com tarefas e dependências; prazo por verificar; tarefa sem prazo conhecido; alteração de estado em curso; erro ao guardar uma alteração com recuperação segura.

**Saídas úteis:** continuar no próprio plano; S08 → S06 para adicionar outra oportunidade; S08 → S05 para regressar ao resumo.

A jornada central do MVP considera-se bem-sucedida quando o estudante adiciona uma oportunidade, recebe a checklist personalizada e compreende a próxima ação. O processo real de admissão continua fora da Rumo quando necessário.

## 8. Ramos e ciclos essenciais

### 8.1 Correção do perfil

S04 → S03 → S04.

**Finalidade:** corrigir informação incorreta ou incompleta e atualizar a análise.

### 8.2 Exploração de oportunidades

S06 → S07 → S06.

**Finalidade:** comparar oportunidades antes de as adicionar ao plano.

### 8.3 Planeamento

S08 → S06 → S07 → S08.

**Finalidade:** adicionar outras oportunidades ao plano sem sair da jornada central.

### 8.4 Retoma

- conta criada, perfil incompleto → S03;
- perfil analisado → S05;
- oportunidade já guardada aberta em S07 → S08 sem duplicação.

A autenticação e a retoma são estados de apoio e não criam um nono ecrã primário.

## 9. Estados globais e recuperação

Todos os oito ecrãs devem considerar, quando aplicável:

- **Carregamento:** indicar que a informação está a ser processada sem antecipar um resultado positivo.
- **Erro:** explicar o que falhou, se os dados estão preservados e qual é a próxima ação.
- **Vazio:** explicar por que não existe conteúdo e oferecer uma ação útil.
- **Informação incompleta:** distinguir ausência de informação de inelegibilidade.
- **Informação não verificada:** usar linguagem como “Por verificar”, “Ainda não confirmado” e “Confirma esta informação na fonte oficial”.
- **Perda de ligação ou interrupção:** preservar progresso razoavelmente possível e permitir retomar ou tentar novamente.
- **Ação repetida:** impedir duplicações, sobretudo ao adicionar oportunidades ao plano.
- **Operação em curso:** impedir submissões repetidas enquanto uma criação, análise ou gravação ainda está a decorrer.

## 10. Modelo de navegação

### Antes de concluir o perfil

A experiência é principalmente sequencial:

S01 → S02 → S03 → S04.

### Depois da análise do perfil

A experiência passa a ser centrada no Dashboard e em tarefas.

Destinos autenticados primários:

- S05 Dashboard;
- S06 Descoberta de oportunidades;
- S08 Plano de candidatura.

S07 Detalhes da oportunidade é contextual e abre a partir de S06. S04 Análise do perfil pode ser revisitada através de S05.

Nenhum destino adicional deve ser introduzido sem uma decisão explícita de escopo.

## 11. Fluxo de informação

| Origem → destino | Informação encaminhada | Observação de confiança |
| --- | --- | --- |
| S02 → S03 | Identidade da conta e consentimento | Sem conclusão de compatibilidade |
| S03 → S04 | Perfil académico, línguas, finanças, preferências, destinos e entrada pretendida | Preservar respostas aproximadas e autodeclaradas |
| S04 → S05 | Resumo, pontos fortes, limitações, incertezas e indicadores de preparação | Análise não equivale a decisão de admissão |
| S05 → S06 | Preferências e restrições relevantes do perfil | Usar apenas dados necessários à descoberta |
| S06 → S07 | Oportunidade selecionada e contexto de compatibilidade | Preservar fontes e estado de verificação |
| S07 → S08 | Oportunidade, requisitos, prazos, documentos, verificação e contexto de compatibilidade | Não elevar informação incerta a confirmada |
| Perfil + oportunidade → Checklist | Tarefas baseadas apenas em informação conhecida | Incertezas e dependências permanecem visíveis |

## 12. Eventos analíticos iniciais

Esta secção prepara a medição do fluxo, conforme o Charter. Os nomes, propriedades, consentimento, ferramenta, retenção e implementação técnica permanecem **por definir** e exigem validação própria. Nenhum evento deve incluir resultados académicos, capacidade financeira, conteúdo livre ou outro dado sensível sem aprovação explícita.

| Momento | Evento conceptual | Finalidade |
| --- | --- | --- |
| S01 | CTA de criação de conta selecionado | Medir passagem para o registo |
| S02 | Registo submetido / concluído / falhou | Identificar conclusão e fricção sem registar valores dos campos |
| S03 | Onboarding iniciado / etapa concluída / análise solicitada | Compreender progressão e abandono por etapa |
| S04 | Análise apresentada / correção de perfil selecionada / continuação selecionada | Avaliar compreensão operacional do resultado |
| S05 | Dashboard apresentado / descoberta selecionada / plano selecionado | Identificar a próxima ação escolhida |
| S06 | Resultados apresentados / zero resultados / filtros alterados / oportunidade aberta | Avaliar utilidade da descoberta |
| S07 | Adicionar ao plano selecionado / concluído / falhou / já existia | Medir intenção e sucesso sem duplicação |
| S08 | Plano apresentado / plano vazio / estado de tarefa alterado | Avaliar activação e uso organizacional |

O indicador de conclusão do fluxo é conceptual: primeira oportunidade adicionada, checklist apresentada e próxima ação disponível. A definição de métricas, limiares e períodos de sucesso continua por aprovar.

## 13. Preparação para Figma — “01 — User Flows”

O diagrama em Figma deve ser uma representação deste documento, não uma fonte de novo escopo.

### 13.1 Estrutura recomendada

- **Página:** 01 — User Flows
- **Secção:** UF-01 — Fluxo canónico MVP v1.1
- **Sentido de leitura:** esquerda para direita no percurso principal
- **Faixa principal:** S01 a S08 e D01 a D10
- **Faixa de alternativas:** validação, correção, vazio, regressos e retoma
- **Faixa transversal:** carregamento, erro, informação incompleta, informação não verificada e perda de ligação
- **Legenda:** ecrã, decisão, ação/transição, estado de apoio, saída válida e fim do percurso central

### 13.2 Nós obrigatórios

- oito nós de ecrã, identificados S01–S08;
- dez decisões, identificadas D01–D10;
- início “Estudante descobre a Rumo”;
- fim principal “Checklist apresentada; próxima ação compreendida”;
- saída válida “Sai sem criar conta”;
- ciclos de correção, exploração e planeamento;
- retoma para S03 ou S05, conforme o estado do perfil;
- rótulos “Por verificar” nas transições onde a incerteza deve ser preservada.

### 13.3 Regras de representação

- Usar o nome e o ID canónico em cada nó.
- Rotular cada conector com a ação ou condição que provoca a transição.
- Manter o caminho principal visualmente contínuo.
- Colocar alternativas junto da decisão que as origina, sem criar ecrãs adicionais.
- Representar estados globais como anotações reutilizáveis, não como páginas.
- Não desenhar interfaces, componentes finais ou conteúdo de wireframe nesta fase.
- Não usar cor como único meio para distinguir sucesso, erro, incerteza ou verificação.
- Ligar a secção do Figma a este documento e identificar a versão 1.1.

### 13.4 Checklist de revisão do diagrama

- [ ] Os oito ecrãs S01–S08 estão presentes uma única vez no percurso principal.
- [ ] Todas as transições principais têm origem, destino e rótulo.
- [ ] D01–D10 têm saídas explícitas e não criam becos sem saída inexplicados.
- [ ] O Dashboard aparece entre Análise do perfil e Descoberta.
- [ ] A correção do perfil regressa a S03 e recalcula S04.
- [ ] Zero resultados em S06 oferece alteração de filtros.
- [ ] S07 impede duplicação e encaminha oportunidades já guardadas para S08.
- [ ] S08 vazio regressa a S06.
- [ ] Progresso da tarefa e estado de verificação são conceitos separados.
- [ ] Garantias de admissão, bolsa, financiamento e visto não aparecem.
- [ ] Estados de informação incompleta e não verificada estão visíveis.
- [ ] Nenhum nono ecrã primário, wireframe ou funcionalidade excluída foi introduzido.

## 14. Pós-condições

### Conclusão bem-sucedida

- existe uma conta;
- existe um perfil inicial analisado;
- a incerteza relevante permanece identificada;
- existe pelo menos uma oportunidade no plano;
- existe uma checklist personalizada;
- o estudante conhece a próxima ação.

### Encerramento antecipado

O estudante pode abandonar antes de concluir qualquer etapa. Informação introduzida só deve ser preservada de acordo com requisitos de dados, privacidade e consentimento que venham a ser aprovados.

## 15. Limites do MVP

Este fluxo não autoriza:

- novos ecrãs primários além dos oito listados;
- uma conta ou jornada dedicada para pais ou responsáveis;
- garantias de admissão, bolsas, financiamento ou vistos;
- submissão de candidaturas pela Rumo;
- preenchimento de lacunas com informação inventada;
- expansão para destinos além de Portugal, Alemanha e Espanha;
- funcionalidades de Dashboard que não apoiem a jornada central;
- criação de wireframes, visual design ou implementação nesta fase.

## 16. Decisões confirmadas e pontos por definir

### Confirmado

- Limite de oito ecrãs do MVP.
- Sequência principal S01 → S08.
- Dashboard entre Análise do perfil e Descoberta.
- Dashboard como página inicial de quem concluiu a análise.
- Ciclo de correção S04 → S03 → S04.
- Saída útil S08 vazio → S06.
- Prevenção de oportunidades duplicadas no plano.
- Separação entre progresso de tarefas e estado de verificação.
- Categorias mínimas de informação do onboarding definidas pelo Charter.

### Por definir ou validar separadamente

- campos finais, opções, formatos e obrigatoriedade exacta do registo e onboarding;
- regras de compatibilidade e categorias exactas de análise;
- fontes, cadência e processo operacional de verificação;
- consentimento, retenção, privacidade e recuperação de conta;
- esquema técnico e propriedades dos eventos analíticos;
- métricas, limiares e períodos de sucesso;
- conteúdo final e hierarquia dos wireframes;
- tecnologia e arquitectura de implementação.

## 17. Critérios de saída da Fase 2 — User Flow

O fluxo está pronto para revisão em Figma quando:

- cada passo da jornada central corresponde a S01–S08;
- cada ecrã tem entrada, ação principal e saída identificadas;
- não existem becos sem saída inexplicados;
- as categorias mínimas do onboarding estão identificadas sem transformar campos não aprovados em requisitos;
- a relação entre perfil, análise, descoberta, detalhes e plano é explícita;
- estados de sucesso, erro, vazio e informação incompleta estão representáveis;
- os eventos analíticos iniciais estão identificados como conceitos sujeitos a validação técnica;
- o diagrama pode ser construído sem tomar decisões de wireframe.

Depois da revisão do diagrama contra este documento, a aprovação explícita da Fase 2 é necessária antes de iniciar wireframes.

## 18. Referências

- Rumo Project Charter v1.0, 6 de agosto de 2026.
- docs/design-decisions.md, decisões P1–P6.
- Destino de design: Figma, página “01 — User Flows”.

Este documento v1.1 é a fonte canónica do fluxo e substitui a versão 1.0 de docs/user-flow.md. O Figma deve espelhá-lo sem acrescentar escopo.
