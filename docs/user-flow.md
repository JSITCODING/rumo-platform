# Rumo — Fluxo canónico do utilizador

## Estado do documento

- **Versão:** 1.0
- **Data de aprovação:** 7 de agosto de 2026
- **Última revisão:** 7 de agosto de 2026
- **Estado:** Aprovado
- **Responsável funcional:** Produto e UX
- **Finalidade:** definir o fluxo canónico de ponta a ponta do MVP antes do diagrama em Figma, dos wireframes e da implementação.

## 1. Escopo

Este documento define como um estudante percorre os oito ecrãs primários confirmados para o MVP:

1. Landing Page
2. Registo
3. Onboarding do estudante
4. Análise do perfil
5. Dashboard
6. Descoberta de oportunidades
7. Detalhes da oportunidade
8. Plano de candidatura

O fluxo é mobile-first e não introduz outros ecrãs primários.

Mensagens de validação, alertas, estados de carregamento, erro, vazio, confirmação e autenticação são estados de apoio, não novos ecrãs primários.

## 2. Atores

### Ator principal — Estudante

Estudante angolano que está a concluir o ensino secundário, procura uma licenciatura ou é recém-licenciado e procura uma oportunidade de pós-graduação. Pode ter pouca experiência com candidaturas internacionais e utilizar sobretudo um telemóvel.

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

## 4. Fluxo principal

Landing Page  
→ Registo  
→ Onboarding do estudante  
→ Análise do perfil  
→ Dashboard  
→ Descoberta de oportunidades  
→ Detalhes da oportunidade  
→ Adicionar ao plano  
→ Plano de candidatura  
→ Checklist personalizada

O percurso central considera-se concluído quando o estudante:

1. compreende o propósito da Rumo;
2. cria uma conta;
3. fornece informação suficiente para uma análise inicial;
4. compreende os principais pontos fortes, limitações e incertezas do perfil;
5. chega ao Dashboard;
6. encontra pelo menos uma oportunidade potencialmente compatível;
7. consulta os requisitos e o estado da informação;
8. adiciona deliberadamente a oportunidade ao plano;
9. recebe uma checklist organizada e compreende a próxima ação.

## 5. Fluxo por ecrã

### 5.1 Landing Page

**Objetivo do estudante:** perceber o que a Rumo faz e decidir se quer começar.

**A Rumo comunica:**

- ajuda a descobrir oportunidades internacionais de estudo;
- usa o perfil para explicar compatibilidade;
- ajuda a organizar candidaturas passo a passo;
- os destinos iniciais são Portugal, Alemanha e Espanha;
- não garante admissão, bolsa, financiamento ou visto.

**Ação principal:** “Criar a minha conta”.

**Transição principal:** Landing Page → Registo.

**Saída alternativa:** o estudante pode sair sem se registar; isto é uma saída válida, não um erro.

**Dados encaminhados:** não é necessária informação de perfil. Apenas contexto de aquisição não sensível poderá ser mantido para análise, se essa recolha vier a ser aprovada.

### 5.2 Registo

**Objetivo do estudante:** criar a conta necessária para iniciar a experiência personalizada.

O estudante fornece a informação mínima de conta definida para o registo e aceita os termos e condições de privacidade aplicáveis.

**Ação principal:** “Criar conta”.

**Decisão:** os campos obrigatórios são válidos?

- **Sim:** criar a conta e avançar para o Onboarding do estudante.
- **Não:** permanecer no Registo, mostrar validação clara junto dos campos afetados e preservar os dados válidos sempre que possível.

Exemplos de copy:

- “Introduz um endereço de email válido.”
- “Este campo é obrigatório.”
- “É necessário aceitar os termos para continuar.”

Se a conta não puder ser criada devido a um problema técnico, a Rumo deve explicar o ocorrido, preservar a informação quando possível, permitir nova tentativa e não atribuir a falha ao estudante.

**Dados encaminhados:** identificador da conta, informação de conta e estado de consentimento. Nenhuma conclusão de compatibilidade é produzida nesta fase.

### 5.3 Onboarding do estudante

**Objetivo do estudante:** fornecer a informação mínima necessária para uma análise útil do perfil.

O onboarding usa divulgação progressiva, evitando um questionário longo num único bloco, e explica por que razão solicita informação importante ou potencialmente sensível.

**Áreas mínimas de informação:**

- académico: nível atual, histórico ou resultados, nível de estudo pretendido e áreas de interesse;
- destino: preferências limitadas inicialmente a Portugal, Alemanha e Espanha;
- língua: capacidades linguísticas relevantes;
- financeiro: capacidade financeira aproximada e necessidade ou preferência por bolsa ou outro financiamento;
- calendário: entrada pretendida ou horizonte aproximado de estudo.

**Progressão interna:**

Início  
→ Informação académica  
→ Preferências de estudo  
→ Destinos  
→ Línguas  
→ Informação financeira  
→ Calendário  
→ Revisão e conclusão

Estas etapas pertencem ao único ecrã/experiência de Onboarding e não são novos ecrãs primários.

**Decisão:** a informação mínima para análise está completa?

- **Sim:** disponibilizar “Analisar o meu perfil” e avançar para Análise do perfil.
- **Não:** manter o estudante no Onboarding e explicar o que falta e porquê.

A Rumo não deve inventar pressupostos para completar a análise. Quando adequado, pode aceitar valores aproximados ou respostas incertas e deve preservar essa incerteza.

Exemplos de estado da informação:

- capacidade financeira: aproximada;
- nível de língua: autodeclarado;
- equivalência académica: requer verificação.

**Dados encaminhados:** perfil estruturado com informação académica, nível pretendido, áreas de interesse, destinos, línguas, capacidade financeira aproximada, necessidade ou preferência de financiamento e entrada pretendida.

### 5.4 Análise do perfil

**Objetivo do estudante:** compreender como a informação fornecida afeta as suas opções de estudo internacional.

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

**Transição principal:** Análise do perfil → Dashboard.

**Caminho de correção:** se o estudante identificar informação incorreta, pode regressar ao Onboarding e repetir a análise:

Análise do perfil → Onboarding do estudante → Análise do perfil.

**Dados encaminhados:** perfil estruturado, categorias da análise, pontos fortes, limitações, informação não resolvida ou não verificada e indicadores de preparação.

### 5.5 Dashboard

**Objetivo do estudante:** perceber a sua situação atual e escolher a próxima ação relevante.

Depois da análise inicial, o Dashboard torna-se o ponto central autenticado.

**Estado inicial:**

- resumo do perfil ou preparação;
- próxima ação relevante;
- estado do plano de candidatura;
- ações importantes pendentes;
- acesso à descoberta de oportunidades.

**Ação principal para novo estudante:** “Descobrir oportunidades”.

**Transição principal:** Dashboard → Descoberta de oportunidades.

Em sessões posteriores, o Dashboard funciona como página inicial principal após a autenticação. A autenticação é um estado de apoio e não constitui novo ecrã primário neste documento.

**Outras transições válidas:**

- Dashboard → Descoberta de oportunidades;
- Dashboard → Plano de candidatura;
- Dashboard → Análise do perfil.

Antes de existirem oportunidades guardadas, pode apresentar: “Ainda não adicionaste nenhuma oportunidade ao teu plano.” e a ação “Descobrir oportunidades”.

O Dashboard não deve introduzir funcionalidades alheias à jornada central do MVP.

### 5.6 Descoberta de oportunidades

**Objetivo do estudante:** encontrar oportunidades relevantes e potencialmente compatíveis com o seu perfil.

A descoberta usa os elementos relevantes do perfil: nível pretendido, áreas e destinos preferidos, informação financeira, necessidade ou preferência de bolsa, línguas e entrada pretendida.

Cada cartão deve fornecer informação suficiente para decidir se vale a pena investigar, quando disponível:

- instituição e programa;
- destino e nível de estudo;
- custos principais;
- indicação de bolsa ou financiamento;
- explicação de compatibilidade;
- estado de verificação.

A compatibilidade responde a “Porque é que esta oportunidade está a aparecer para mim?” e nunca implica “Vais ser aceite.” Requisitos ausentes ou não verificados permanecem visíveis.

**Decisão A:** existem oportunidades para os critérios atuais?

- **Sim:** apresentar a lista e permitir abrir uma oportunidade.
- **Não:** apresentar “Não encontrámos oportunidades com estes critérios.” e permitir “Alterar filtros”.

A Rumo não deve fabricar correspondências fracas para evitar um estado vazio.

**Decisão B:** a oportunidade contém informação incompleta ou não verificada?

- **Sim:** mostrar a oportunidade e identificar claramente a incerteza, por exemplo “Prazo por verificar”, “Informação de bolsa por confirmar” ou “Requisito académico por verificar”.
- **Não:** mostrar normalmente a fonte e o estado de verificação disponíveis.

**Transição principal:** Descoberta de oportunidades → Detalhes da oportunidade.

### 5.7 Detalhes da oportunidade

**Objetivo do estudante:** decidir se a oportunidade merece entrar no plano de candidatura.

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

**Decisão:** quero incluir esta oportunidade no meu plano?

- **Sim:** selecionar “Adicionar ao meu plano”; a Rumo guarda a oportunidade e avança para o Plano de candidatura.
- **Não:** regressar à Descoberta de oportunidades sem consequência negativa ou pressão.

Se a oportunidade já estiver no plano, a Rumo não cria um duplicado. A ação passa conceptualmente a “Ver no meu plano” e abre o Plano de candidatura.

**Dados encaminhados ao plano:** identificador, contexto do programa e instituição, requisitos e documentos conhecidos, prazos disponíveis, estado de verificação e contexto necessário à personalização das tarefas.

A incerteza é preservada. Um prazo não verificado não pode aparecer como prazo confirmado na checklist.

### 5.8 Plano de candidatura

**Objetivo do estudante:** transformar interesse numa sequência compreensível de ações.

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

**Estados mínimos da tarefa:**

- Por fazer
- Em curso
- Concluído

O estado da tarefa é separado do estado da informação. Exemplo: a tarefa “Confirmar prazo oficial” pode estar “Por fazer” enquanto a informação permanece “Prazo por verificar”.

**Estado vazio:**

- mensagem: “O teu plano ainda está vazio.”
- explicação: “Adiciona uma oportunidade para começares a organizar os próximos passos.”
- ação: “Descobrir oportunidades”.
- transição: Plano de candidatura → Descoberta de oportunidades.

A jornada central do MVP considera-se bem-sucedida quando o estudante adiciona uma oportunidade, recebe a checklist personalizada e compreende a próxima ação. O processo real de admissão continua fora da Rumo quando necessário.

## 6. Pontos de decisão confirmados

| ID | Condição | Caminho esperado | Resultado |
| --- | --- | --- | --- |
| P1 | Análise inicial concluída | Análise do perfil → Dashboard → Descoberta | O Dashboard integra o caminho principal |
| P2 | Utilizador regressa após o onboarding | Autenticação resolvida → Dashboard | O Dashboard é a página inicial autenticada |
| P3 | Informação do perfil precisa de correção | Análise → Onboarding → Análise | Perfil corrigido e análise atualizada |
| P4 | Plano de candidatura está vazio | Plano → Descoberta | O estudante recebe uma saída útil |
| P5 | Oportunidade já existe no plano | Detalhes → Ver no plano | Não é criado um duplicado |
| P6 | Tarefa muda de progresso | Por fazer / Em curso / Concluído | Progresso separado da verificação da informação |

Os fundamentos e consequências de P1–P6 estão registados em docs/design-decisions.md.

## 7. Ciclos principais

### Correção do perfil

Análise do perfil → Onboarding do estudante → Análise do perfil.

**Finalidade:** corrigir informação incorreta ou incompleta.

### Exploração de oportunidades

Descoberta → Detalhes → Descoberta.

**Finalidade:** comparar oportunidades antes de as adicionar ao plano.

### Planeamento

Plano de candidatura → Descoberta → Detalhes → Plano de candidatura.

**Finalidade:** adicionar outras oportunidades ao plano sem sair da jornada central.

## 8. Estados globais e recuperação

Todos os oito ecrãs devem considerar, quando aplicável:

- **Carregamento:** indicar que a informação está a ser processada sem antecipar um resultado positivo.
- **Erro:** explicar o que falhou, se os dados estão preservados e qual é a próxima ação.
- **Vazio:** explicar por que não existe conteúdo e oferecer uma ação útil.
- **Informação incompleta:** distinguir ausência de informação de inelegibilidade.
- **Informação não verificada:** usar linguagem como “Por verificar”, “Ainda não confirmado” e “Confirma esta informação na fonte oficial”.
- **Perda de ligação ou interrupção:** preservar progresso razoavelmente possível e permitir retomar ou tentar novamente.
- **Ação repetida:** impedir duplicações, sobretudo ao adicionar oportunidades ao plano.

## 9. Modelo de navegação

### Antes de concluir o perfil

A experiência é principalmente sequencial:

Landing Page → Registo → Onboarding → Análise do perfil.

### Depois da análise do perfil

A experiência passa a ser centrada no Dashboard e em tarefas.

Destinos autenticados primários:

- Dashboard;
- Descoberta de oportunidades;
- Plano de candidatura.

Detalhes da oportunidade é contextual e abre a partir de uma oportunidade. A Análise do perfil pode ser revisitada através do Dashboard.

Nenhum destino adicional deve ser introduzido sem uma decisão explícita de escopo.

## 10. Fluxo de informação

| Origem → destino | Informação encaminhada |
| --- | --- |
| Registo → Onboarding | Identidade da conta e consentimento |
| Onboarding → Análise | Perfil académico, línguas, finanças, preferências, destinos e entrada pretendida |
| Análise → Dashboard | Resumo, pontos fortes, limitações, incertezas e indicadores de preparação |
| Dashboard → Descoberta | Preferências e restrições relevantes do perfil |
| Descoberta → Detalhes | Oportunidade selecionada e contexto de compatibilidade |
| Detalhes → Plano | Oportunidade, requisitos, prazos, documentos, verificação e contexto de compatibilidade |
| Perfil + oportunidade → Checklist | Tarefas personalizadas baseadas apenas em informação conhecida, com incertezas preservadas |

## 11. Pós-condições

### Conclusão bem-sucedida

- existe uma conta;
- existe um perfil inicial analisado;
- a incerteza relevante permanece identificada;
- existe pelo menos uma oportunidade no plano;
- existe uma checklist personalizada;
- o estudante conhece a próxima ação.

### Encerramento antecipado

O estudante pode abandonar antes de concluir qualquer etapa. Informação introduzida só deve ser preservada de acordo com requisitos de dados, privacidade e consentimento que venham a ser aprovados.

## 12. Limites do MVP

Este fluxo não autoriza:

- novos ecrãs primários além dos oito listados;
- uma conta ou jornada dedicada para pais ou responsáveis;
- garantias de admissão, bolsas, financiamento ou vistos;
- submissão de candidaturas pela Rumo;
- preenchimento de lacunas com informação inventada;
- expansão para destinos além de Portugal, Alemanha e Espanha;
- funcionalidades de Dashboard que não apoiem a jornada central.

## 13. Fonte para design

Este documento v1.0 é a fonte canónica para o diagrama Figma “01 — User Flows”. O diagrama deve representar os oito ecrãs, transições, decisões, estados e ciclos aqui definidos sem acrescentar escopo.

Os wireframes só avançam depois de o diagrama ser revisto contra este documento.
