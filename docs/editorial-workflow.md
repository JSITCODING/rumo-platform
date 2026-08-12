# Rumo — Workflow editorial de informação crítica

## Estado

- **Issue:** #37 — `[Backend][Editorial] Fechar ingestion e workflow editorial de informação crítica`
- **Estado:** Fechado conceptualmente; sem implementação
- **Base:** issues #32, #34, #35 e #36
- **Natureza:** contrato de ingestion/review/publicação; não define scraper, filas, IA, scheduler ou UI editorial

## 1. Objectivo

Definir o menor workflow que permite à Rumo receber informação externa, preservar o que foi observado, rever criticamente essa informação e só depois permitir que ela altere aquilo que o estudante vê.

O princípio central é:

> Captura não é confirmação, confirmação não é publicação e publicação não apaga histórico.

A pipeline conceptual é:

```text
Source discovered/registered
        ↓
ClaimObservation captured
        ↓
Editorial review
        ↓
Verification decision
        ↓
Current interpretation of Claim
        ↓
Publication/derived-domain impact
        ↓
ResolvedRequirement / Opportunity / Student-facing DTO
```

Nada capturado por scraper, import, operador ou IA se torna automaticamente verdade publicada.

## 2. Fronteiras do workflow

### 2.1 Source

`Source` identifica a origem externa relevante: página oficial, regulamento, documento, anúncio ou outra referência.

Registar uma Source significa apenas que a Rumo conhece a origem.

Não significa:

- que todo o conteúdo foi revisto;
- que a Source é actual;
- que todas as claims nela presentes são válidas;
- que a Source possui precedência universal.

### 2.2 Claim

`Claim` representa uma informação crítica cujo significado precisa de identidade e histórico próprios.

Exemplos:

- prazo de candidatura;
- valor da propina;
- requisito de inglês;
- documento obrigatório;
- número de vagas;
- valor/cobertura de financiamento.

Claim não é uma tabela genérica de qualquer atributo do sistema.

### 2.3 ClaimObservation

`ClaimObservation` preserva o que foi observado numa Source num determinado momento/contexto.

É a unidade mínima histórica.

Uma observação pode ser:

- inserida manualmente;
- capturada por futura automação;
- sugerida por futura IA;
- importada de fonte estruturada.

A origem do mecanismo de captura não altera o gate editorial.

## 3. Workflow mínimo

### Etapa A — registar ou reutilizar Source

Antes de criar uma observação, a Rumo deve conseguir identificar a Source correspondente.

Quando a mesma URL/documento já existe, o sistema reutiliza a Source salvo mudança material de identidade.

Redireccionamentos ou URLs diferentes para o mesmo documento não devem obrigatoriamente criar entidades distintas se a identidade editorial for claramente a mesma.

Essa deduplicação exacta fica para implementação; o princípio é evitar duplicação óbvia sem inventar equivalência.

### Etapa B — capturar observação

Criar uma nova `ClaimObservation` quando:

1. a Claim ainda não possui observação daquela informação;
2. o valor/texto observado mudou materialmente;
3. o contexto temporal/aplicabilidade mudou;
4. uma nova Source relevante apresenta uma versão independente que precisa ser preservada;
5. é necessário preservar nova evidência que afecta confiança/conflito.

Não criar obrigatoriamente uma nova observação para uma nova leitura que seja materialmente idêntica e não acrescente evidência relevante.

Uma observação ainda não revista começa conceptualmente como informação não confirmada.

### Etapa C — revisão editorial

Um `reviewer` examina pelo menos:

- subject/Claim correcta;
- Source/evidence;
- texto/valor observado;
- contexto temporal;
- route/audience/jurisdição quando relevantes;
- relação com observações anteriores;
- existência de conflito;
- se a observação é suficientemente clara para suportar interpretação publicada.

O reviewer não deve escolher automaticamente o valor mais recente nem o mais restritivo.

### Etapa D — decisão de verification

Verification responde:

> Esta observação foi revista e qual é o resultado dessa revisão?

Estados conceptuais mínimos:

```text
needs_review
confirmed
conflicting
rejected
```

Os nomes físicos finais podem variar.

`rejected` significa que a observação não deve sustentar interpretação corrente, por exemplo por erro de captura, contexto errado ou fonte inadequada.

Não significa apagar a linha histórica.

### Etapa E — interpretação corrente da Claim

A Claim pode ficar em estados conceptuais como:

```text
accepted
needs_review
conflicting
unavailable
```

A mudança de `current_observation_id` só é permitida quando existe revisão suficiente para afirmar que aquela observação representa a interpretação corrente da Claim no contexto relevante.

Regra obrigatória:

> `current_observation_id` nunca é calculado simplesmente por `ORDER BY observed_at DESC LIMIT 1`.

Se existe conflito crítico não resolvido, a Claim pode manter `current_observation_id = null` ou manter explicitamente uma interpretação anterior marcada como needing review, conforme política física posterior. Nunca seleccionar silenciosamente um dos lados.

### Etapa F — publicação

`publisher` controla a passagem de informação editorial pronta para estado publicado quando publication state for aplicável.

Verification e publication continuam separados:

- uma observação pode estar confirmada mas ainda não publicada;
- uma informação publicada pode posteriormente precisar de refresh;
- uma informação stale não perde automaticamente o facto histórico de ter sido confirmada em determinado momento.

## 4. Responsabilidades mínimas por papel

### catalog_editor

Pode:

- registar/editar catálogo em draft;
- registar Sources;
- criar ClaimObservations;
- estruturar RequirementDefinitions propostas;
- corrigir erros antes da revisão.

Não pode sozinho transformar informação crítica em confirmada/publicada quando a política exige review independente.

### reviewer

Pode:

- rever observações;
- confirmar, rejeitar ou marcar conflito;
- validar contexto e relação com observações anteriores;
- aprovar supersession quando suportada;
- sinalizar refresh.

Reviewer não precisa necessariamente ser uma pessoa diferente do editor no piloto, mas as capabilities permanecem distintas.

### publisher

Pode:

- publicar representação editorial já suficientemente revista;
- retirar representação publicada;
- manter informação em needs_confirmation/conflicting quando não existe resolução segura.

Publisher não deve usar publicação para alterar retroactivamente o conteúdo observado.

### admin

Admin gere acessos/operação.

`admin` não implica automaticamente `reviewer` ou `publisher`.

### trusted backend

Pode executar operações técnicas necessárias ao workflow, mas não possui autoridade semântica autónoma para confirmar informação crítica.

Uma service credential nunca aparece no cliente.

## 5. Automação e IA

Automação futura pode:

- descobrir Sources;
- detectar alterações;
- extrair candidatos a claims;
- sugerir `ClaimObservation`;
- sugerir classificação/contexto;
- sugerir possível supersession;
- sinalizar possíveis conflitos;
- priorizar itens para review.

Automação futura não pode, por defeito:

- marcar informação crítica como `confirmed`;
- escolher silenciosamente um valor num conflito;
- publicar uma nova interpretação;
- gerar elegibilidade oficial;
- sobrescrever observações anteriores.

Regra:

> IA/automação pode acelerar a preparação da decisão; a decisão editorial crítica continua sujeita a gate humano aprovado.

## 6. Observação idêntica

Se uma Source é revista novamente e apresenta exactamente o mesmo conteúdo material:

- não é obrigatório criar nova ClaimObservation;
- pode actualizar metadata operacional de última verificação em estrutura separada futura;
- não reescrever `observed_at` histórico da observação anterior como se tivesse sido criada hoje.

Se existir valor para provar nova observação independente, uma nova linha pode ser criada; isso é escolha de implementação, não requisito de domínio.

O MVP não exige uma linha histórica para cada polling.

## 7. Mudança material

Exemplo:

```text
15 Feb 2027
→
1 Mar 2027
```

Uma mudança material cria nova ClaimObservation.

A antiga permanece.

A nova observação não se torna current automaticamente.

Fluxo:

```text
new observation
→ needs_review
→ compare context/evidence
→ confirm supersession OR conflict
→ update current interpretation
→ mark derived artifacts affected
```

## 8. Supersession

Supersession exige evidência suficiente de que uma observação substitui outra no mesmo significado/contexto.

Sinais fortes:

- fonte declara nova versão/ciclo;
- documento actualizado explicitamente;
- prazo corrigido oficialmente;
- regulamento afirma substituição;
- mesmo contexto e autoridade editorial suficientemente clara.

Não são suficientes isoladamente:

- ser mais recente;
- ser mais específico;
- ser mais restritivo;
- vir de URL diferente;
- parecer mais plausível.

Quando supersession é confirmada:

- a observação anterior continua histórica;
- a nova pode tornar-se interpretação corrente;
- artefactos derivados relevantes entram em revisão/recomputação.

## 9. Conflito

Existe conflito editorial quando duas ou mais observações relevantes para o mesmo significado/contexto apresentam claims incompatíveis e não existe relação segura de supersession/especialização/temporalidade que resolva a diferença.

Exemplo:

```text
Official admissions page: IELTS 6.5
Official regulation: IELTS 7.0
same route/audience/cycle
```

Resultado:

```text
Claim.current_interpretation_state = conflicting
```

Comportamento:

- preservar ambas observações;
- não seleccionar a mais alta "por segurança";
- bloquear assessment definitivo dependente da claim;
- S07 pode expor `conflicting`/`needs_confirmation` de forma adequada ao estudante;
- criar trabalho editorial, não automaticamente tarefa do estudante.

## 10. Contextos diferentes não são conflito

Antes de marcar conflito, verificar:

- Opportunity/ciclo;
- route;
- audience;
- functional scope;
- temporal context;
- geography/jurisdiction quando explicitamente usados;
- subject da Claim.

Exemplo:

```text
2026/27 IELTS 6.5
2027/28 IELTS 7.0
```

Não é conflito quando os contextos temporais são claros.

## 11. Source desaparecida ou indisponível

Se uma URL retorna 404, deixa de responder ou é removida:

- não apagar Source;
- não apagar observações;
- não transformar automaticamente observação anterior em falsa;
- marcar necessidade de revisão/freshness conforme política;
- procurar futura evidência alternativa apenas como novo trabalho editorial.

Uma Source indisponível pode continuar relevante para explicar porque determinada informação foi publicada no passado.

## 12. Freshness

Freshness responde se a informação precisa de nova revisão, não se era verdadeira quando foi confirmada.

Gatilhos mínimos:

1. tempo decorrido conforme categoria;
2. novo ciclo/intake;
3. aproximação de prazo crítico;
4. alteração detectada na Source;
5. Source indisponível;
6. nova observação potencialmente conflitante;
7. mudança material da Opportunity/contexto.

Não fixar ainda TTL universal.

Prazo, propina e requisitos podem ter cadências diferentes.

## 13. Publication, Verification, Freshness e Lifecycle

Continuam ortogonais.

Exemplo válido:

```text
Verification = confirmed
Freshness = needs_refresh
Publication = published
OpportunityLifecycle = open
```

Isto significa:

- a informação foi confirmada;
- está publicada;
- a Opportunity continua aberta;
- mas já passou o ponto em que convém revê-la novamente.

Não colapsar isso num estado `stale_published_open_confirmed`.

## 14. Impacto em RequirementDefinition

Uma ClaimObservation confirmada pode sustentar criação/revisão de `RequirementDefinition`.

Mas:

- RequirementDefinition não é apagada quando a Source muda;
- mudança material pode criar/revisar definição correspondente;
- resolução contextual posterior continua separada;
- informação em conflito não deve produzir silenciosamente definição definitiva.

## 15. Impacto em ResolvedRequirement

Quando Claim/RequirementDefinition usada por um ResolvedRequirement muda materialmente:

1. identificar ResolvedRequirements dependentes;
2. marcar necessidade de revisão;
3. produzir nova versão apenas quando nova resolução estiver suficientemente determinada;
4. preservar versão anterior para assessments históricos.

Nunca actualizar silenciosamente uma versão histórica já usada pelo estudante.

## 16. Impacto em RequirementAssessment

Se o ResolvedRequirement muda:

- assessments antigos permanecem históricos;
- novo assessment pode ser calculado contra nova versão;
- se a nova regra está em conflito/unknown, avaliação definitiva é bloqueada;
- `gap_detected` histórico não é reescrito retroactivamente.

## 17. Impacto em ApplicationTask

Mudança de informação crítica pode:

- não afectar task;
- marcar `revision_state = needs_review`;
- superseder task;
- gerar nova task quando existe nova acção legítima do estudante.

Nunca:

- mudar `done` para `todo` silenciosamente;
- apagar tarefa concluída;
- gerar tarefa do estudante apenas porque a equipa editorial precisa investigar um conflito.

Exemplo:

```text
Old requirement: IELTS 6.5
Task done: obtain IELTS 6.5
New confirmed requirement: IELTS 7.0
```

A tarefa antiga permanece concluída historicamente. O plano pode receber nova tarefa/revisão referente à nova exigência.

## 18. Acções editoriais vs acções do estudante

### EditorialAction

Exemplos:

- confirmar deadline divergente;
- verificar nova versão de regulamento;
- decidir supersession;
- rever Source desaparecida;
- resolver contexto incorrecto;
- re-resolver Requirement.

### StudentAction

Exemplos:

- completar dado de perfil;
- escolher uma satisfaction option;
- obter documento;
- realizar teste;
- confirmar condição pessoal quando a própria instituição exige essa confirmação.

Problema interno da Rumo não deve ser transferido automaticamente ao estudante.

## 19. Publicação student-facing

A API student-facing continua a usar estados simplificados:

```text
confirmed
needs_confirmation
conflicting
unavailable
```

O cliente não recebe:

- raw ClaimObservations;
- drafts;
- internal reviewer notes;
- supersession chains completas;
- estados operacionais de ingestion;
- scores de confiança internos.

S07 pode receber fonte/evidence suficiente para explicar criticamente a informação publicada sem expor o workflow interno inteiro.

## 20. Prioridade editorial

O MVP não precisa de scoring complexo.

Priorizar manualmente/regras simples com base em impacto:

1. deadline/janela activa;
2. requisito que muda decisão/next action;
3. custo/propina/financiamento material;
4. documento obrigatório;
5. vagas/capacidade quando relevante;
6. demais claims críticas.

A proximidade de deadline pode elevar prioridade de refresh.

Sem motor universal de risk score nesta fase.

## 21. Auditoria mínima necessária

Esta issue não cria `audit_log` universal.

O histórico essencial já existe por:

- ClaimObservation;
- verification/current interpretation;
- versões de ResolvedRequirement;
- versões/supersession de RequirementAssessment;
- histórico das ApplicationTasks.

Quando operação/segurança exigir audit trail adicional, criar issue específica.

## 22. Pipeline que o MVP aprova

```text
manual/import/automation candidate
        ↓
Source
        ↓
ClaimObservation (unreviewed)
        ↓
reviewer
        ↓
confirmed | conflicting | rejected
        ↓
Claim current interpretation
        ↓
publisher gate
        ↓
published domain representation
        ↓
derived artifacts review/recompute
```

Não aprovado:

```text
scraper → LLM → publish
```

nem:

```text
latest value → current truth
```

## 23. Casos-limite fechados

### Mesma informação em duas fontes oficiais

Podem existir duas observações que reforçam a mesma interpretação. Não é necessário fundi-las destrutivamente.

### Fonte não oficial repete fonte oficial

Pode ser evidence secundária, mas não substitui a origem mais autoritativa por simples recência.

### Nova Source mais recente contradiz regulamento específico

Revisão obrigatória; não usar recência isolada.

### Correcção de erro interno de captura

Preservar observação incorrecta se já teve impacto/histórico relevante; marcar rejeitada/corrigida. Se nunca foi publicada nem usada e política futura permitir limpeza operacional, isso é implementação, não requisito de domínio.

### Informação crítica sem fonte suficiente

Pode permanecer `needs_confirmation`; não preencher por inferência.

### Informação parcialmente estruturável

Preservar texto original/descrição; incapacidade de estruturar não justifica alterar significado.

## 24. Invariantes finais

1. Captura não é confirmação.
2. Confirmação não é publicação.
3. Recência não define interpretação corrente.
4. Automação não confirma/publica critical claims autonomamente.
5. Observação materialmente substituída permanece histórica.
6. Conflito crítico é preservado, não escondido.
7. Contextos diferentes são avaliados antes de declarar conflito.
8. Source indisponível não apaga histórico.
9. Freshness não reescreve verification histórico.
10. Mudança material propaga revisão a artefactos derivados.
11. Histórico do estudante não é falsificado por alterações oficiais posteriores.
12. Problema editorial não vira automaticamente task do estudante.
13. Publication/Verification/Freshness/Lifecycle permanecem eixos distintos.
14. A incapacidade de automatizar uma regra nunca autoriza simplificar o seu significado.
15. Informação crítica publicada deve continuar rastreável à evidência que a sustentou.

## 25. Fora do âmbito

Não definir agora:

- crawler/scraper;
- browser automation;
- modelos LLM;
- prompt engineering;
- embeddings;
- workers/queues;
- scheduler;
- retries;
- webhooks;
- admin UI completa;
- OCR;
- APIs editoriais executáveis;
- audit log universal;
- notifications;
- observability operacional;
- deploy.

## 26. Deliberadamente aberto

Fica para implementação posterior:

- mecanismo concreto de captura;
- deduplicação técnica de Sources;
- IDs/metadata de ingestion runs;
- estrutura exacta de reviewer notes;
- TTL/freshness policy por claim kind;
- API editorial;
- UI editorial;
- workers/scheduler;
- modelo/IA auxiliar;
- retries e dead-letter handling;
- observability/audit operacional.

## 27. Conclusão

O workflow editorial mínimo da Rumo é human-assisted, não human-replaced.

A Rumo pode automatizar descoberta e preparação, mas não transforma automaticamente informação externa em verdade oficial própria.

A arquitectura aprovada é:

```text
capture
→ preserve observation
→ review
→ verify
→ resolve current interpretation
→ publish
→ recompute/review derived artifacts
```

Isto mantém a plataforma rápida para operar no piloto sem sacrificar rastreabilidade nem criar prematuramente uma plataforma distribuída de ingestion.