# Rumo — Modelo relacional mínimo do núcleo do MVP

## Estado

- **Issue:** #33 — `[Backend] Modelar persistência mínima do núcleo do MVP`
- **Estado:** Fechado para implementação posterior de migrations
- **Base:** issues #17, #31 e #32
- **Natureza:** modelação física mínima; não define API, ORM, RBAC/RLS, ingestion ou arquitectura de produção

## 1. Objectivo

Traduzir o domínio já fechado para um modelo relacional pequeno o suficiente para o MVP e suficientemente explícito para futuras migrations.

O modelo deve preservar quatro propriedades que não podem ser recuperadas depois se forem perdidas:

1. identidade e relações do domínio;
2. contexto efectivo dos requisitos;
3. proveniência/histórico de informação crítica;
4. histórico específico do estudante no plano.

Não se pretende transformar cada conceito conceptual numa tabela.

## 2. Decisões de redução

### 2.1 Não criar tabela para todo conceito

Ficam como value objects/JSON estruturado quando não necessitam de identidade própria, pesquisa relacional forte ou foreign key:

- detalhes simples de aplicabilidade;
- satisfaction options;
- exemptions/waivers;
- preferências ainda sem catálogo canónico;
- razões/explicações de assessment;
- evidence locator dentro de uma source.

### 2.2 JSON não é domínio genérico

JSON é permitido apenas para estruturas pequenas, locais e variáveis cujo conteúdo completo não precisa de integridade referencial.

Não usar JSON para esconder:

- Organization;
- Program;
- Opportunity;
- RequirementDefinition;
- ResolvedRequirement;
- Source;
- Claim/ClaimObservation;
- ApplicationPlan;
- PlanOpportunity;
- RequirementAssessment;
- ApplicationTask.

### 2.3 Sem event sourcing

Histórico crítico é preservado com novas linhas de observação e supersession explícita onde necessário. Não existe event store universal nem snapshot integral por alteração.

## 3. Visão geral

```text
Account/Auth boundary
        |
        v
StudentProfile
  |-- AcademicRecord[]
  |-- LanguageCapability[]
  |
  |-- ApplicationPlan
         |-- PlanOpportunity[] ---- Opportunity
                 |                    |-- Program[]
                 |                    |-- Organization[]
                 |                    |-- ApplicationWindow[]
                 |                    |-- RequirementDefinition[]
                 |                    |        |
                 |                    |        v
                 |                    |   ResolvedRequirement[]
                 |                    |
                 |                    |-- Claim[]
                 |                           |-- ClaimObservation[] --> Source
                 |
                 |-- RequirementAssessment[]
                 |-- ApplicationTask[]
```

## 4. Perfil do estudante

### 4.1 `student_profiles`

Uma linha por conta de estudante.

Campos mínimos candidatos:

- `id`;
- `account_id` — identificador externo ao modelo de auth desta issue;
- `current_education_status`;
- `target_study_level`;
- `target_intake_text`/contexto temporal aproximado;
- `preferred_country_codes` — estrutura pequena/lista;
- `preferred_fields` — estrutura pequena/lista enquanto não existir taxonomia canónica;
- `budget_range`/`budget_currency` quando conhecido;
- `budget_covers` — propina/custo de vida/ambos/desconhecido;
- `funding_needed`/desconhecido;
- timestamps.

Constraints:

- `account_id` único;
- preferências e orçamento podem ser nulos/desconhecidos;
- ausência de valor não equivale a zero nem a falso.

Não criar `financial_profiles` ou `study_preferences` separados no MVP enquanto forem estritamente 1:1 e sem lifecycle próprio.

### 4.2 `academic_records`

Preserva o percurso académico original.

Campos mínimos:

- `id`;
- `student_profile_id`;
- `institution_name`;
- `country_code`;
- `qualification_name`;
- `education_level`;
- `status` — em curso/concluído/etc.;
- `start_year`;
- `completion_year`/`expected_completion_year` quando aplicável;
- `grade_value` opcional;
- `grade_scale_min`/`grade_scale_max` opcionais;
- `grade_text` opcional para sistemas não numéricos;
- `data_origin` — self_declared/evidence-backed conforme futura enum;
- timestamps.

Não guardar uma nota convertida por cima da original. Qualquer equivalência futura é derivada e rastreável.

### 4.3 `language_capabilities`

Campos mínimos:

- `id`;
- `student_profile_id`;
- `language_code`;
- `declared_level` opcional;
- `test_type` opcional;
- `test_score` opcional;
- `test_date` opcional;
- `evidence_state`;
- timestamps.

Constraint recomendada: evitar duplicados exactos do mesmo teste/data; não impor uma única capability por língua porque declaração e certificações podem coexistir.

## 5. Catálogo

### 5.1 `organizations`

Campos mínimos:

- `id`;
- `name`;
- `organization_type`;
- `country_code` opcional;
- `website_url` opcional;
- timestamps.

O tipo da organização não determina o papel que desempenha numa Opportunity.

### 5.2 `programs`

Campos mínimos:

- `id`;
- `provider_organization_id`;
- `title`;
- `study_level`;
- `field_text`/classificação quando conhecida;
- `language_of_instruction` opcional;
- `publication_state`;
- timestamps.

Program é relativamente persistente e não contém ciclo de candidatura específico.

### 5.3 `opportunities`

Núcleo pequeno.

Campos mínimos:

- `id`;
- `opportunity_type` — admission/funding/internship/exchange;
- `title`;
- `summary` opcional;
- `primary_country_code` opcional;
- `temporal_context` — texto/estrutura mínima para ciclo/intake quando necessário;
- `audience_summary` opcional;
- `publication_state`;
- `lifecycle_state`;
- timestamps.

Não colocar dezenas de campos específicos de todos os tipos nesta tabela.

### 5.4 `opportunity_organizations`

N:N entre Opportunity e Organization.

Campos:

- `opportunity_id`;
- `organization_id`;
- `role` — provider/funder/host e apenas novos papéis justificados por caso real.

Constraint:

- unique (`opportunity_id`, `organization_id`, `role`).

`publisher` pertence normalmente a Source, não a esta relação.

### 5.5 `opportunity_programs`

N:N entre Opportunity e Program.

Campos:

- `opportunity_id`;
- `program_id`;
- `relation_role` — primary/eligible/supported/etc. apenas se necessário.

Motivação:

- uma admission Opportunity pode apontar para um Program;
- uma FundingOpportunity pode financiar vários Programs;
- não hardcodar Funding → Program 1:1.

Constraint:

- unique (`opportunity_id`, `program_id`, `relation_role`).

### 5.6 detalhes específicos por tipo

Usar tabelas 1:1 apenas quando existirem campos específicos realmente usados:

- `admission_opportunity_details`;
- `funding_opportunity_details`;
- `internship_opportunity_details`;
- `exchange_opportunity_details`.

Regra de corte: não criar uma subtype table vazia só porque o tipo existe. A migration adiciona-a quando o MVP persistir pelo menos um atributo próprio daquele tipo.

Exemplos futuros:

```text
admission_opportunity_details
- opportunity_id PK/FK
- application_route_text
- seats_limit?  -- apenas se realmente usado

funding_opportunity_details
- opportunity_id PK/FK
- amount?
- currency?
- coverage_summary?
- separate_application_required?
```

`amount` não substitui `coverage`.

### 5.7 `application_windows`

Uma Opportunity pode ter zero ou várias janelas/rondas.

Campos mínimos:

- `id`;
- `opportunity_id`;
- `window_type`/round label;
- `opens_at` opcional;
- `closes_at` opcional;
- `is_rolling`;
- `notes` opcional;
- timestamps.

Não assumir deadline única.

## 6. Fontes e claims críticas

### 6.1 `sources`

Campos mínimos:

- `id`;
- `publisher_organization_id` opcional;
- `url`/reference;
- `source_type`;
- `title` opcional;
- `language_code` opcional;
- timestamps.

Source é a origem; Evidence é a referência concreta usada dentro dessa origem.

No MVP Evidence não precisa de tabela própria. Pode existir como locator/trecho/metadados na observação.

### 6.2 `claims`

Claim só existe para informação materialmente crítica. Não é uma tabela key/value para todo o produto.

Campos mínimos:

- `id`;
- `claim_kind` — deadline, tuition, requirement, required_document, capacity, financial_benefit, other_critical;
- exactamente um subject principal entre os FKs actualmente suportados:
  - `opportunity_id` nullable;
  - `program_id` nullable;
  - `requirement_definition_id` nullable;
  - `application_window_id` nullable;
- `current_observation_id` nullable;
- `current_interpretation_state` — accepted/conflicting/needs_review/unavailable conforme enum final;
- timestamps.

Constraint obrigatória: exactamente um subject FK não-nulo.

Evitar `subject_type + subject_id` sem FK porque perderia integridade referencial para poupar poucas colunas.

### 6.3 `claim_observations`

Unidade mínima histórica da informação crítica.

Campos mínimos:

- `id`;
- `claim_id`;
- `source_id`;
- `observed_value` — JSON estruturado apenas porque os tipos de valor variam;
- `observed_text` opcional para preservar a formulação relevante;
- `evidence_locator` opcional;
- `observed_at`;
- `context` opcional e pequeno;
- `verification_state`;
- `freshness_state`;
- `supersedes_observation_id` opcional quando a relação é confirmada;
- timestamps.

Regras:

- nova observação material cria nova linha;
- observação anterior não é apagada por mudança de valor;
- recência não define automaticamente `current_observation_id`;
- conflito pode deixar `current_observation_id` nulo;
- `verification_state` histórico não é reescrito apenas porque a informação ficou stale depois.

`claims.current_observation_id` é uma materialização editorial da interpretação corrente, não “a última linha por data”.

## 7. Requisitos

### 7.1 `requirement_definitions`

Representa uma definição/regra conhecida antes da resolução contextual.

Campos mínimos:

- `id`;
- `program_id` nullable;
- `opportunity_id` nullable;
- `statement`;
- `category`;
- `requirement_role` — minimum/supporting quando aplicável;
- `functional_scope` — admission/funding/internship/exchange/application_process/etc.;
- `applicability_mode` — unconditional/conditional/descriptive;
- `applicability_data` JSON estruturado pequeno;
- `satisfaction_options` JSON estruturado pequeno;
- `exemptions` JSON estruturado pequeno;
- `stage` opcional;
- `publication_state`;
- timestamps.

A proveniência crítica da definição é representada através de Claim/ClaimObservation e Source, não por campos soltos de URL.

Não criar AST, operador genérico, expression language ou rules table.

### 7.2 `resolved_requirements`

Persistir a resolução editorial corrente/histórica porque:

- S07 precisa de uma visão publicada e explicável;
- assessments precisam apontar para exactamente o requisito que foi avaliado;
- alterações posteriores não podem reescrever o passado.

Campos mínimos:

- `id`;
- `opportunity_id`;
- `local_key` — chave editorial estável apenas dentro da Opportunity, não ontologia universal;
- `category`;
- `functional_scope`;
- `effective_statement`;
- `applicability_summary` JSON pequeno;
- `satisfaction_options` JSON pequeno;
- `exemptions` JSON pequeno;
- `stage` opcional;
- `resolution_state` — resolved/conflicting/needs_review;
- `explanation`;
- `publication_state`;
- `supersedes_resolved_requirement_id` nullable;
- `superseded_at` nullable;
- timestamps.

Constraint recomendada:

- no máximo uma versão corrente por (`opportunity_id`, `local_key`).

Ao mudar materialmente a obrigação publicada, inserir nova versão e superseder a anterior em vez de reescrever a linha usada por assessments históricos.

### 7.3 `resolved_requirement_definitions`

Join N:N:

- `resolved_requirement_id`;
- `requirement_definition_id`.

Constraint:

- unique (`resolved_requirement_id`, `requirement_definition_id`).

Isto permite explicar quais definições sustentaram a resolução sem guardar uma árvore de precedência.

## 8. Plano do estudante

### 8.1 `application_plans`

Campos mínimos:

- `id`;
- `student_profile_id`;
- `status` opcional se surgir uso real;
- timestamps.

O MVP pode ter apenas um plano activo por estudante; não impor múltiplos planos sem caso de uso.

### 8.2 `plan_opportunities`

Relação estudante/plano/oportunidade.

Campos mínimos:

- `id`;
- `application_plan_id`;
- `opportunity_id`;
- `added_at`;
- `removed_at` nullable se precisarmos preservar remoção sem delete destrutivo;
- timestamps.

Constraint obrigatória:

- unique corrente (`application_plan_id`, `opportunity_id`).

Isto implementa P5: a mesma Opportunity não aparece duplicada no mesmo plano.

### 8.3 `requirement_assessments`

Assessment específico do estudante e de uma versão de ResolvedRequirement.

Campos mínimos:

- `id`;
- `student_profile_id`;
- `plan_opportunity_id`;
- `resolved_requirement_id`;
- `applicability_result` — applies/does_not_apply/unknown;
- `assessment_result` — met/appears_met/gap_detected/unknown/not_applicable;
- `evidence_state` — sufficient/insufficient/missing conforme enum final;
- `reason_code` opcional;
- `explanation` opcional;
- `supersedes_assessment_id` nullable;
- `superseded_at` nullable;
- `assessed_at`;
- timestamps.

Regras:

- assessment não altera Requirement/ResolvedRequirement;
- `gap_detected` não significa inelegibilidade;
- nova avaliação material cria nova linha/supersession para preservar história;
- applicability desconhecida bloqueia conclusão definitiva;
- equivalência não estabelecida e conflitos críticos mantêm `unknown` quando aplicável.

Constraint recomendada:

- no máximo um assessment corrente por (`student_profile_id`, `plan_opportunity_id`, `resolved_requirement_id`).

### 8.4 `application_tasks`

Campos mínimos:

- `id`;
- `plan_opportunity_id`;
- `requirement_assessment_id` nullable;
- `origin_claim_id` nullable quando a tarefa deriva directamente de prazo/documento/informação operacional;
- `title`;
- `description` opcional;
- `task_type` — satisfaction/evidence/clarification/operational conforme uso real;
- `progress_status` — todo/in_progress/done;
- `revision_state` — current/needs_review/superseded;
- `due_at` nullable;
- `completed_at` nullable;
- `supersedes_task_id` nullable;
- timestamps.

Invariantes:

- `progress_status` permanece separado de `revision_state`;
- uma task concluída nunca volta silenciosamente para todo;
- se a informação de origem muda, marcar needs_review ou criar task nova;
- conflito editorial não gera automaticamente task para o estudante;
- nem todo Requirement gera task.

## 9. Estados ortogonais

Não criar um `status` universal.

Os eixos mantêm semântica própria:

```text
Opportunity.publication_state
Opportunity.lifecycle_state

ClaimObservation.verification_state
ClaimObservation.freshness_state
Claim.current_interpretation_state

ResolvedRequirement.resolution_state
ResolvedRequirement.publication_state

RequirementAssessment.applicability_result
RequirementAssessment.assessment_result
RequirementAssessment.evidence_state

ApplicationTask.progress_status
ApplicationTask.revision_state
```

Os nomes físicos finais podem mudar nas migrations; os eixos não podem ser fundidos.

## 10. Constraints essenciais

Obrigatórias ou fortemente recomendadas:

1. `student_profiles.account_id` unique.
2. `opportunity_organizations` unique por Opportunity/Organization/role.
3. `opportunity_programs` unique por Opportunity/Program/relation_role.
4. `claims` com exactamente um subject FK.
5. `resolved_requirement_definitions` sem duplicação do mesmo par.
6. uma versão corrente de `resolved_requirements` por Opportunity/local_key.
7. `plan_opportunities` sem Opportunity corrente duplicada no mesmo plano.
8. um assessment corrente por Student/PlanOpportunity/ResolvedRequirement.
9. FKs com delete restritivo ou soft/supersession nos objectos históricos; não usar cascade destrutivo em ClaimObservation, assessments ou tasks concluídas.
10. currency sempre explícita quando existe valor monetário.
11. datas semânticas preservam timezone quando horário for relevante; datas puras permanecem datas.

## 11. Índices iniciais úteis

Sem optimização prematura, os índices mais prováveis são:

- `opportunities(opportunity_type, publication_state, lifecycle_state)`;
- `opportunities(primary_country_code)`;
- `application_windows(opportunity_id, closes_at)`;
- `programs(provider_organization_id)`;
- `requirement_definitions(opportunity_id)` e `(program_id)`;
- `resolved_requirements(opportunity_id, local_key)`;
- `claims(opportunity_id)`/subjects suportados;
- `claim_observations(claim_id, observed_at desc)`;
- `plan_opportunities(application_plan_id, opportunity_id)`;
- `requirement_assessments(plan_opportunity_id, resolved_requirement_id)`;
- `application_tasks(plan_opportunity_id, progress_status, revision_state)`.

Índices de search/matching ficam fora desta issue.

## 12. O que não entra no modelo inicial

Não criar agora:

- generic entity/value tables;
- universal `context` table;
- rules/conditions/operators AST;
- ontology tables para todos os requisitos;
- event log;
- snapshots completos de Opportunity;
- grade conversion tables;
- eligibility decision table;
- ranking/matching score tables;
- recommendation graph;
- scraper/import jobs;
- audit log universal;
- notifications;
- messaging;
- visa workflow;
- payment tables;
- document file storage sem requisito funcional específico.

## 13. Fluxo físico resultante

```text
Source
  ↓
ClaimObservation -> Claim -> current interpretation
                           ↓
RequirementDefinition(s)
                           ↓ human-assisted resolution
ResolvedRequirement(version)
                           ↓
RequirementAssessment(version, student)
                           ↓
ApplicationTask?
```

E para catálogo/plano:

```text
Organization -> Program
      \          /
       \        /
        Opportunity
             ↓
       PlanOpportunity
             ↓
     ApplicationTask[]
```

## 14. Decisões deliberadamente abertas

Ficam para issues seguintes:

- tipos SQL/enums exactos;
- migration order;
- ORM;
- Supabase/Postgres RLS;
- ownership/auth mapping de `account_id`;
- API/DTO;
- workflow editorial e permissões;
- ingestion;
- full-text/search;
- matching/ranking;
- cache/materialização;
- retenção/arquivamento;
- ficheiros/documentos do estudante.

## 15. Conclusão

O núcleo físico aprovado é relacional e selectivamente versionado onde a história altera o significado do produto.

A regra de desenho é:

> tabela quando existe identidade, relação ou histórico que precisa de integridade; JSON/value object quando existe apenas estrutura local variável sem identidade própria.

Isto mantém o MVP implementável sem perder os invariantes que tornam a Rumo rastreável e segura.