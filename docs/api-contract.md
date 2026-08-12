# Rumo — Contrato API/DTO do MVP

## Estado

- **Issue:** #36 — `[Backend][API] Fechar contratos API/DTO do MVP`
- **Estado:** Fechado para implementação posterior
- **Ecrãs:** S03–S08
- **Base:** issues #31–#35 e documentos de domínio/schema/acesso correspondentes
- **Natureza:** contrato HTTP/DTO; não define framework, OpenAPI executável, auth provider ou controllers

## 1. Objectivo

Definir a menor superfície de API necessária para o fluxo autenticado do estudante sem transformar o schema PostgreSQL na API pública.

A API deve suportar:

```text
S03 Perfil/onboarding
  ↓
S04 Análise do perfil
  ↓
S05 Dashboard
  ↓
S06 Descoberta
  ↓
S07 Detalhe da oportunidade
  ↓
S08 Plano/checklist
```

O contrato preserva as separações já aprovadas:

```text
compatibilidade != elegibilidade
Requirement != RequirementAssessment != ApplicationTask
Verification != Freshness != Publication != Lifecycle
student ownership != editorial authority
```

## 2. Princípios obrigatórios

### 2.1 API orientada a produto, não a tabelas

Não criar um endpoint CRUD para cada tabela. O cliente consome recursos e agregados que correspondem às necessidades dos ecrãs.

Exemplos rejeitados:

```text
GET /claim-observations
POST /resolved-requirement-definitions
PATCH /requirement-assessments/:id   -- pelo estudante
```

Exemplos aprovados:

```text
GET  /v1/me/profile
POST /v1/me/profile-analysis
GET  /v1/opportunities
GET  /v1/opportunities/:id
GET  /v1/me/plan
PUT  /v1/me/plan/opportunities/:opportunityId
PATCH /v1/me/plan/tasks/:taskId
```

### 2.2 DTO != row SQL

DTOs não expõem:

- nomes de colunas por obrigação;
- join tables;
- `current_observation_id`;
- cadeias de supersession internas;
- drafts editoriais;
- raw observations;
- role assignments;
- detalhes de RLS;
- campos internos sem utilidade para o estudante.

### 2.3 Sem escrita privilegiada pelo estudante

O estudante nunca escreve directamente:

- `RequirementAssessment`;
- Verification/Freshness;
- Claim/ClaimObservation;
- RequirementDefinition/ResolvedRequirement;
- catálogo oficial;
- estado editorial/publicação;
- `revisionState` de tasks.

O estudante pode escrever apenas dados que lhe pertencem e acções explicitamente autorizadas, como o perfil e o progresso legítimo da própria task.

### 2.4 Incerteza é parte do contrato

Ausência, desconhecimento e conflito não são convertidos em `false`, zero ou strings inventadas.

Quando a razão é relevante para a experiência, o DTO transporta estado + explicação.

### 2.5 Sem probabilidade de admissão

Nenhum DTO do MVP contém:

- admission probability;
- scholarship probability;
- visa probability;
- eligibility decision;
- confidence score opaco de 0–100.

### 2.6 IDs e formatos

- IDs de recursos são UUIDs opacos em string.
- JSON usa `camelCase`.
- instantes usam ISO-8601 com timezone;
- datas puras usam `YYYY-MM-DD`;
- dinheiro usa decimal como string + moeda explícita.

Exemplo:

```json
{
  "amount": "1250.0000",
  "currency": "EUR"
}
```

Nunca enviar dinheiro como `float` binário sem moeda.

## 3. Versionamento e autenticação

### 3.1 Prefixo

```text
/v1
```

Mudança breaking do contrato exige nova versão. Adição compatível de campos opcionais não exige `/v2`.

### 3.2 Auth boundary

A forma de autenticação fica fora desta issue.

A API assume que, depois da autenticação, existe um `accountId` confiável no contexto do servidor. O cliente não envia `accountId` para escolher ownership.

Rejeitado:

```json
{
  "accountId": "outro-utilizador"
}
```

como mecanismo de autorização.

Os recursos `/me/*` resolvem ownership exclusivamente a partir da identidade autenticada.

## 4. Concorrência mínima

Recursos mutáveis do estudante devem devolver um `ETag` opaco.

Updates sensíveis usam:

```text
If-Match: <etag recebido>
```

Se o recurso mudou desde a última leitura:

```text
412 Precondition Failed
```

com erro `stale_write`.

Isto aplica-se inicialmente a:

- perfil;
- listas académicas/linguísticas quando substituídas;
- progresso de task.

Não expor `updated_at` como mecanismo de locking contratual.

## 5. Envelope de erro

Formato mínimo:

```json
{
  "error": {
    "code": "invalid_input",
    "message": "Não foi possível guardar os dados.",
    "fieldErrors": [
      {
        "field": "budget.currency",
        "code": "invalid_currency",
        "message": "Indica uma moeda válida."
      }
    ]
  }
}
```

`fieldErrors` é opcional.

Códigos HTTP relevantes:

- `400` pedido mal formado;
- `401` não autenticado;
- `403` autenticado sem permissão;
- `404` recurso não visível/não encontrado;
- `409` conflito de estado ou transição inválida;
- `412` `If-Match` falhou;
- `422` dados semanticamente inválidos;
- `500` erro interno sem detalhes sensíveis.

O cliente não recebe stack traces, nomes de policies, SQL ou detalhes internos de autorização.

## 6. S03 — Perfil/onboarding

### 6.1 Ler perfil

```text
GET /v1/me/profile
```

Resposta `StudentProfileDto`:

```text
StudentProfileDto
- id
- educationStatus?
- targetStudyLevel?
- targetIntake?
- preferredCountries[]
- preferredFields[]
- budget?
- fundingNeed?
- academicRecords[]
- languageCapabilities[]
- completeness
- unresolvedFields[]
```

`completeness` indica se existe informação mínima suficiente para análise; não significa “perfil perfeito”.

### 6.2 Actualizar campos gerais

```text
PATCH /v1/me/profile
If-Match: ...
```

Payload apenas com campos editáveis do estudante:

```json
{
  "educationStatus": "in_progress",
  "targetStudyLevel": "bachelor",
  "targetIntake": "2027/28",
  "preferredCountries": ["PT", "DE"],
  "preferredFields": ["Engenharia Informática"],
  "budget": {
    "min": null,
    "max": "6000.0000",
    "currency": "EUR",
    "covers": "tuition"
  },
  "fundingNeed": "needed"
}
```

Os valores finais de enums permanecem alinhados ao contrato de schema e podem evoluir sem transformar o payload num key/value genérico.

### 6.3 Registos académicos

Para o MVP a lista é pequena e pertence integralmente ao estudante. Preferir substituição idempotente da colecção em vez de expor CRUD da tabela:

```text
PUT /v1/me/profile/academic-records
If-Match: ...
```

Payload:

```text
AcademicRecordInput[]
- clientKey?              -- chave temporária opcional do cliente
- institutionName
- countryCode?
- qualificationName?
- educationLevel?
- status
- startYear?
- completionYear?
- expectedCompletionYear?
- grade?                  -- preserva escala original
```

`grade`:

```json
{
  "value": "15",
  "scaleMin": "0",
  "scaleMax": "20",
  "text": null
}
```

Nunca aceitar um campo que substitua silenciosamente a nota original por equivalência estrangeira.

### 6.4 Capacidades linguísticas

Mesma estratégia:

```text
PUT /v1/me/profile/language-capabilities
If-Match: ...
```

`LanguageCapabilityInput[]` pode conter declaração e/ou teste conhecido, mas o cliente não define `evidenceState=confirmed`.

Se o estudante introduz um teste sem upload/verificação, o servidor preserva a origem como autodeclarada/insuficiente conforme política futura.

## 7. S04 — Análise do perfil

### 7.1 Gerar/recalcular

```text
POST /v1/me/profile-analysis
```

No MVP o contrato assume processamento síncrono. Jobs assíncronos ficam fora desta issue.

Se faltam dados mínimos:

```text
422 profile_incomplete
```

com campos que impedem uma análise útil.

### 7.2 Ler análise corrente

```text
GET /v1/me/profile-analysis
```

`ProfileAnalysisDto`:

```text
ProfileAnalysisDto
- generatedAt
- basedOnProfileEtag
- sections
- strengths[]
- limitations[]
- unresolvedItems[]
- guidance[]
```

Cada afirmação explicativa usa:

```text
AnalysisStatementDto
- kind: confirmed | estimated | needs_confirmation
- text
- reasons[]?
```

Exemplo:

```json
{
  "kind": "needs_confirmation",
  "text": "A equivalência da tua qualificação deve ser confirmada para cada instituição."
}
```

Não existe campo `admissionChance`.

## 8. S05 — Dashboard

```text
GET /v1/me/dashboard
```

É um DTO agregado; não uma réplica de várias tabelas.

```text
DashboardDto
- profileSummary
- nextAction?
- planSummary
- pendingActions[]
- unresolvedInformationCount
```

`NextActionDto`:

```text
- kind
- title
- description?
- target
```

Targets iniciais podem apontar para:

- profile;
- profile_analysis;
- discovery;
- plan;
- task específica.

Não introduzir notificações, métricas avançadas ou módulos fora do fluxo.

## 9. S06 — Descoberta

### 9.1 Listar oportunidades

```text
GET /v1/opportunities
```

Query mínima:

```text
q?
country?
opportunityType?
studyLevel?
cursor?
limit?
sort?
```

Filtros só são aceites quando têm significado suportado por dados canónicos. Não criar parâmetros que façam a API prometer matching ainda inexistente.

`limit` máximo inicial: 50.

### 9.2 Ordenação

No contrato actual são permitidas ordenações transparentes, por exemplo:

```text
deadline_asc
recently_updated
```

`recommended` ou score personalizado fica para a issue de matching/ranking.

A API não devolve um ranking opaco fingindo ser compatibilidade oficial.

### 9.3 Paginação

Cursor opaco:

```json
{
  "items": [],
  "nextCursor": "opaque-or-null"
}
```

Não expor offsets internos como compromisso de estabilidade.

### 9.4 `OpportunityListItemDto`

```text
- id
- type
- title
- providers[]
- country?
- temporalSummary?
- applicationWindowSummary?
- compatibilitySummary?
- decisionSignals[]
- informationNotice?
```

`compatibilitySummary` é explicativo:

```text
CompatibilitySummaryDto
- summary
- reasons[]
- unresolvedCount
```

Sem percentagem/probabilidade.

`decisionSignals` contém apenas sinais úteis ao cartão, por exemplo:

```text
- label
- state: positive | gap | unknown | informational
- explanation?
```

`gap` significa diferença conhecida, não inelegibilidade.

### 9.5 Zero resultados

Resposta continua `200`:

```json
{
  "items": [],
  "nextCursor": null
}
```

O cliente decide o estado vazio; zero resultados não é erro HTTP.

## 10. S07 — Detalhe da Opportunity

```text
GET /v1/opportunities/:opportunityId
```

`OpportunityDetailDto`:

```text
- id
- type
- title
- summary?
- organizations[]
- programs[]
- location/context
- temporalContext
- applicationWindows[]
- financialInformation[]
- requirements[]
- documents[]
- compatibility?
- sources[]
- planState
- informationNotice?
```

### 10.1 Informação crítica publicada

Prazo, propina, benefício financeiro e outros valores críticos são apresentados através de uma visão segura:

```text
CriticalInformationDto<T>
- value?
- state: confirmed | needs_confirmation | conflicting | unavailable
- explanation?
- sources[]
- lastReviewedAt?
```

Não expor `ClaimObservation` bruto nem decidir `latest == accepted` no cliente.

Quando existe conflito sem resolução segura, `value` pode ser `null` e `state=conflicting`.

### 10.2 Fonte visível

`SourceSummaryDto`:

```text
- title?
- publisher?
- url?
- observedAt?
- reviewLabel?
```

Evidence locator interno, IDs de observations e notas editoriais não entram no DTO do estudante.

## 11. Requirement DTO

Esta é a separação mais importante do contrato.

```text
RequirementViewDto
- id
- category
- scope
- statement?
- stage?
- informationState
- satisfactionOptions[]
- exemptions[]
- applicability
- assessment
- sources[]
- explanation?
```

### 11.1 Regra oficial/publicada

`statement`, `satisfactionOptions`, `exemptions` e `informationState` descrevem o requisito conhecido.

### 11.2 Aplicabilidade ao estudante

```text
ApplicabilityDto
- result: applies | does_not_apply | unknown
- explanation?
```

### 11.3 Assessment do estudante

```text
RequirementAssessmentDto
- result: met | appears_met | gap_detected | unknown | not_applicable
- evidence: sufficient | insufficient | missing
- explanation?
- reasonCode?
```

O cliente nunca calcula estes estados a partir de campos soltos nem os envia de volta como autoridade.

### 11.4 Conflito

Se o requisito oficial está em conflito crítico:

```text
informationState = conflicting
assessment.result = unknown
```

quando o conflito impede comparação segura.

A API não escolhe o valor “mais exigente por segurança”.

## 12. S08 — Plano

### 12.1 Ler plano

```text
GET /v1/me/plan
```

`ApplicationPlanDto`:

```text
- id
- opportunities[]
- summary
- nextAction?
```

`PlanOpportunityDto`:

```text
- id
- opportunity
- requirementAssessments[]
- tasks[]
- unresolvedInformation[]
```

### 12.2 Adicionar oportunidade

```text
PUT /v1/me/plan/opportunities/:opportunityId
```

Operação idempotente.

Se já estiver no plano, devolver o `PlanOpportunityDto` existente em vez de criar duplicado.

Isto aplica P5 no contrato da API além da constraint de base de dados.

Não aceitar `studentProfileId` ou `applicationPlanId` arbitrário do cliente para escolher ownership.

### 12.3 Remoção

A remoção de Opportunity do plano não faz parte do percurso canónico obrigatório actual. Não criar endpoint até o comportamento de produto ser aprovado.

O modelo físico pode preservar `removedAt`, mas isso não obriga a API a expor a operação agora.

## 13. Tasks

### 13.1 Actualizar progresso

```text
PATCH /v1/me/plan/tasks/:taskId
If-Match: ...
```

Único campo inicialmente editável pelo estudante:

```json
{
  "progressStatus": "in_progress"
}
```

O servidor controla:

- `revisionState`;
- ligação à claim/assessment;
- due date derivada;
- supersession;
- origem da task;
- se a task ainda é corrente.

### 13.2 Transições mínimas

```text
todo -> in_progress
in_progress -> todo

todo -> done
in_progress -> done
```

`done` é terminal para a versão corrente da task no MVP.

Isto evita apagar silenciosamente a história de conclusão. Se a informação oficial mudar depois, o sistema marca a task para revisão/supersession ou cria uma nova task; não volta uma task concluída para `todo`.

Uma tentativa inválida devolve:

```text
409 invalid_task_transition
```

### 13.3 DTO

```text
ApplicationTaskDto
- id
- title
- description?
- type?
- progressStatus
- informationState
- dueAt?
- completedAt?
- actionable
- explanation?
```

`informationState` é uma visão student-facing de `revisionState`; o cliente não escreve esse campo.

## 14. Operações proibidas ao estudante

Não existe na superfície student-facing:

```text
PATCH /requirement-assessments/:id
POST  /claims/:id/confirm
PATCH /claim-observations/:id
POST  /resolved-requirements
PATCH /opportunities/:id/publication
POST  /staff-role-assignments
```

Mesmo que futuras APIs editoriais tenham operações equivalentes, usam autorização e DTOs separados.

## 15. Boundary editorial/trusted backend

O contrato student-facing não é reutilizado para escrita editorial privilegiada.

Futura superfície interna pode precisar de comandos equivalentes a:

```text
record observation
review claim
resolve requirement
publish catalogue change
recompute affected assessments
```

Mas os endpoints/DTOs concretos ficam para a issue de ingestion/workflow editorial.

Regra:

> DTO de leitura do estudante não é automaticamente DTO de escrita do editor.

## 16. Publicado vs interno

A API de S06/S07 só expõe informação que passou pelo boundary de publicação apropriado ou um estado explicitamente seguro para o utilizador, como `needs_confirmation`/`conflicting`.

Não expor:

- drafts;
- comentários internos;
- observações não revistas como se fossem verdade actual;
- PII de staff;
- dados de outros estudantes;
- material bruto de ingestion.

## 17. Campos derivados

Campos como:

- `compatibilitySummary`;
- `nextAction`;
- `informationNotice`;
- `unresolvedCount`;
- `completeness`;

são contratos de produto derivados. Não precisam corresponder a colunas SQL.

O servidor é responsável por derivá-los consistentemente.

## 18. Null, unknown e unavailable

Regras:

1. `null` = não existe valor representável naquele campo;
2. `unknown` = o sistema não consegue concluir com segurança;
3. `unavailable` = informação antes relevante não está actualmente disponível/aceite;
4. `conflicting` = existem claims incompatíveis não resolvidas.

Não usar `null` para esconder conflito conhecido.

## 19. Idempotência

Operações que representam “garantir que existe/está associado” usam semântica idempotente:

```text
PUT /v1/me/plan/opportunities/:opportunityId
PUT /v1/me/profile/academic-records
PUT /v1/me/profile/language-capabilities
```

Não criar `Idempotency-Key` global no MVP sem operação que realmente precise dele.

## 20. Segurança do contrato

- `/me/*` nunca recebe owner id arbitrário;
- IDs não substituem autorização;
- `404` pode ser usado para recurso não visível quando apropriado;
- o cliente não escolhe roles;
- o cliente não confirma claims;
- o cliente não publica catálogo;
- o cliente não escreve assessments;
- raw editorial state não é serializado por conveniência;
- service credentials nunca fazem parte do bundle cliente.

RLS e autorização de aplicação devem defender a mesma fronteira, mas a API não assume que uma substitui a outra.

## 21. Matriz S03–S08

| Ecrã | Operação principal | Escrita do estudante? |
| --- | --- | --- |
| S03 | `GET/PATCH /me/profile`, `PUT` listas académicas/linguísticas | Sim, dados próprios |
| S04 | `POST/GET /me/profile-analysis` | Apenas pedir análise; resultado server-owned |
| S05 | `GET /me/dashboard` | Não |
| S06 | `GET /opportunities` | Não |
| S07 | `GET /opportunities/:id` | Não |
| S08 | `GET /me/plan`, `PUT` opportunity, `PATCH` task progress | Apenas plano/progresso legítimo |

## 22. O que não entra agora

Não criar nesta fase:

- GraphQL;
- generic `/entities` endpoint;
- generic filter DSL;
- CRUD 1:1 de todas as tabelas;
- admission/eligibility endpoint;
- ranking score contract;
- bulk mutation framework;
- webhooks;
- background job API;
- upload/document API;
- notifications;
- messaging;
- visa workflow;
- payments;
- candidatura directa;
- admin API completa;
- OpenAPI gerado antes de framework/implementação aprovados.

## 23. Deliberadamente aberto

Para implementação posterior:

- framework/language;
- exact route naming se o framework impuser convenção;
- auth provider/session transport;
- CORS/CSRF conforme arquitectura;
- OpenAPI executável;
- serialization library;
- rate limits;
- caching;
- search implementation;
- matching/ranking;
- ingestion/editorial command API;
- jobs;
- uploads;
- observability.

## 24. Invariantes finais

1. A API não expõe o schema PostgreSQL como contrato público.
2. Ownership deriva da identidade autenticada, não de IDs enviados pelo cliente.
3. O estudante não escreve informação oficial nem assessments.
4. Compatibilidade permanece explicativa e não vira decisão de elegibilidade.
5. Requirement, applicability e assessment permanecem dimensões separadas no DTO.
6. Conflito crítico permanece visível e pode bloquear assessment definitivo.
7. `gap_detected` não significa inelegibilidade.
8. Dados ausentes não viram `false`/zero.
9. Operações de plano que representam associação são idempotentes.
10. Tasks concluídas não são silenciosamente reabertas por mudança de informação.
11. Escrita editorial usa boundary/DTO diferente do estudante.
12. DTOs derivados podem agregar várias tabelas sem revelar a persistência.

## 25. Conclusão

A superfície mínima aprovada é:

```text
GET   /v1/me/profile
PATCH /v1/me/profile
PUT   /v1/me/profile/academic-records
PUT   /v1/me/profile/language-capabilities

POST  /v1/me/profile-analysis
GET   /v1/me/profile-analysis
GET   /v1/me/dashboard

GET   /v1/opportunities
GET   /v1/opportunities/:id

GET   /v1/me/plan
PUT   /v1/me/plan/opportunities/:opportunityId
PATCH /v1/me/plan/tasks/:taskId
```

É suficiente para S03–S08 sem criar uma API genérica, sem permitir escrita privilegiada no cliente e sem fechar prematuramente framework ou implementação.