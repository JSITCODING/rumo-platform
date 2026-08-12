# Rumo — Contrato PostgreSQL do núcleo do MVP

## Estado

- **Issue:** #34 — `[Backend][Schema] Fechar contrato PostgreSQL de migrations e constraints`
- **Estado:** Fechado para implementação posterior
- **Base:** issues #17, #31, #32 e #33
- **Natureza:** contrato físico PostgreSQL; não cria migrations executáveis, ORM, auth, RLS ou API

## 1. Objectivo

Fechar tipos, constraints, relações e ordem de migrations suficientemente cedo para que a implementação posterior não precise reabrir o domínio.

O repositório continua documental e o `AGENTS.md` bloqueia código/configuração de aplicação antes de uma tarefa de implementação aprovada. Por isso esta issue define **o SQL que deverá ser produzido**, mas não adiciona ainda `migrations/*.sql`.

## 2. Princípios físicos

1. PostgreSQL relacional como baseline.
2. IDs do domínio em `uuid`.
3. Datas/hora operacionais em `timestamptz`; datas sem hora permanecem `date`.
4. Dinheiro em `numeric`, nunca `float`.
5. Estados do MVP usam `text + CHECK`, não enum nativo PostgreSQL.
6. JSONB apenas para estruturas locais variáveis sem identidade/FK própria.
7. Histórico crítico é append/supersession, não overwrite destrutivo.
8. Não existe `status` universal.
9. FKs polimórficas `subject_type + subject_id` são proibidas no núcleo.
10. Hard delete não é mecanismo normal para catálogo, claims, requisitos resolvidos, assessments ou tasks históricas.

## 3. IDs e timestamps

### 3.1 IDs

Todas as entidades do núcleo usam:

```text
id uuid primary key
```

Quando migrations executáveis forem autorizadas, o default recomendado é geração no PostgreSQL (`gen_random_uuid()` no ambiente suportado). Se o provider exigir activação explícita de extensão, isso pertence à migration de bootstrap, não ao domínio.

`account_id` também é `uuid`, mas permanece sem FK até a issue de auth/ownership fechar o provider e o boundary de identidade.

### 3.2 Timestamps

Tabelas mutáveis usam, por defeito:

```text
created_at timestamptz not null default now()
updated_at timestamptz not null default now()
```

A actualização automática de `updated_at` por trigger ou aplicação fica para implementação. Esta issue não cria trigger universal.

Campos de negócio:

- `observed_at`, `assessed_at`, `added_at`, `removed_at`, `superseded_at`, `completed_at`, `opens_at`, `closes_at` → `timestamptz` quando hora/fuso forem semanticamente relevantes;
- datas puras de teste/documento → `date`;
- anos académicos aproximados permanecem `smallint`/texto contextual, sem converter em datas falsas.

## 4. Estratégia de enums

### 4.1 Decisão

Não usar `CREATE TYPE ... AS ENUM` no MVP inicial.

Usar `text` com `CHECK` nomeado para vocabulários já fechados.

Motivos:

- os estados ainda podem receber novos valores durante o piloto;
- CHECK é mais simples de alterar/reverter;
- evita acoplar migrations futuras à evolução de enum nativo;
- mantém validação no banco sem transformar valores ainda abertos em contratos rígidos.

Vocabulários ainda não fechados permanecem `text` com `CHECK (btrim(value) <> '')` quando obrigatórios.

## 5. Tipos transversais

### País

```text
country_code text
check (country_code is null or (length(country_code) = 2 and country_code = upper(country_code)))
```

Não criar tabela mundial de países no MVP.

### Moeda

```text
currency text
check (currency is null or (length(currency) = 3 and currency = upper(currency)))
```

Sempre obrigatória quando o valor monetário correspondente existe.

### Língua

`language_code text` não é limitado a 2 caracteres para não impedir tags linguísticas mais específicas. Apenas exigir valor não vazio quando obrigatório.

### Valores monetários

```text
numeric(18,4)
```

- não negativos quando representam orçamento, custo, benefício ou propina;
- moeda explícita sempre que houver valor;
- `amount` e `coverage` continuam conceitos diferentes.

### URLs

`text`; sem regex rígida no banco. Validação/canonicalização pertence ao boundary de aplicação/ingestion.

## 6. Estados fechados para CHECK

### Publication

```text
draft | published
```

### Opportunity type

```text
admission | funding | internship | exchange
```

### Opportunity lifecycle

```text
upcoming | open | closed | withdrawn | archived
```

### Opportunity organization role

```text
provider | funder | host
```

### Claim kind

```text
deadline | tuition | requirement | required_document | capacity | financial_benefit | other_critical
```

### Claim current interpretation

```text
accepted | conflicting | needs_review | unavailable
```

### Verification

```text
needs_review | confirmed | conflicting
```

### Freshness

```text
current | needs_refresh | stale
```

### Requirement category

```text
academic | language | document | legal_identity | financial_proof | portfolio | test_exam | experience | application_process | other
```

### Requirement role

```text
minimum | supporting
```

Pode ser nulo quando a fonte ainda não permite classificar com segurança.

### Functional scope

```text
admission | funding | internship | exchange | application_process | other
```

### Applicability mode

```text
unconditional | conditional | descriptive
```

### Resolution state

```text
resolved | conflicting | needs_review
```

### Applicability evaluation

```text
applies | does_not_apply | unknown
```

### Requirement assessment

```text
met | appears_met | gap_detected | unknown | not_applicable
```

### Evidence state

```text
sufficient | insufficient | missing
```

### Task type

```text
satisfaction | evidence | clarification | operational
```

### Task progress

```text
todo | in_progress | done
```

### Task revision

```text
current | needs_review | superseded
```

## 7. Perfil do estudante

### `student_profiles`

Tipos/constraints principais:

- `id uuid PK`;
- `account_id uuid NOT NULL UNIQUE` — sem FK por enquanto;
- `current_education_status text` — vocabulário ainda aberto;
- `target_study_level text` — vocabulário ainda aberto;
- `target_intake_text text` nullable;
- `preferred_country_codes jsonb` nullable, se presente deve ser array;
- `preferred_fields jsonb` nullable, se presente deve ser array;
- `budget_min numeric(18,4)` nullable;
- `budget_max numeric(18,4)` nullable;
- `budget_currency text` nullable;
- `budget_covers text` nullable;
- `funding_needed boolean` nullable, onde `NULL = desconhecido`.

Checks:

```text
budget_min >= 0
budget_max >= 0
budget_min <= budget_max quando ambos existem
budget_currency obrigatório se budget_min ou budget_max existir
jsonb_typeof(preferred_country_codes) = 'array' quando não nulo
jsonb_typeof(preferred_fields) = 'array' quando não nulo
```

Não guardar `0` ou `false` para representar desconhecido.

### `academic_records`

- FK `student_profile_id -> student_profiles.id`;
- `country_code` com regra transversal;
- `grade_value numeric` nullable;
- `grade_scale_min numeric` nullable;
- `grade_scale_max numeric` nullable;
- `grade_text text` nullable;
- `start_year`, `completion_year`, `expected_completion_year` em `smallint` nullable;
- `status text` obrigatório, vocabulário ainda aberto;
- `data_origin text` obrigatório, inicialmente limitado a `self_declared | evidence_backed`.

Checks:

```text
grade_scale_min < grade_scale_max quando ambos existem
grade_value entre min/max quando os três existem
completion_year e expected_completion_year não são ambos obrigatórios
```

Nenhuma equivalência ou nota convertida substitui o valor original.

### `language_capabilities`

- FK `student_profile_id`;
- `language_code text NOT NULL` não vazio;
- `declared_level text` nullable;
- `test_type text` nullable;
- `test_score numeric` nullable;
- `test_date date` nullable;
- `evidence_state text` permanece vocabulário local aberto até a issue de upload/evidence do estudante.

Não impor `UNIQUE(student_profile_id, language_code)`.

Índice/unique opcional posterior para duplicados exactos de teste só é criado quando a identidade de certificação estiver fechada.

## 8. Catálogo

### `organizations`

- `id uuid PK`;
- `name text NOT NULL CHECK btrim(name) <> ''`;
- `organization_type text NOT NULL` não vazio;
- `country_code` nullable;
- `website_url text` nullable.

Não criar unique por nome.

### `programs`

- FK `provider_organization_id -> organizations.id` com delete restritivo;
- `title text NOT NULL`;
- `study_level text NOT NULL`, vocabulário ainda aberto;
- `field_text text` nullable;
- `language_of_instruction text` nullable;
- `publication_state` com CHECK `draft|published`.

Program não possui ciclo de candidatura.

### `opportunities`

- `opportunity_type` com CHECK fechado;
- `title text NOT NULL`;
- `summary text` nullable;
- `primary_country_code` nullable;
- `temporal_context jsonb` nullable; quando presente deve ser object;
- `audience_summary text` nullable;
- `publication_state` CHECK;
- `lifecycle_state` CHECK.

Índices iniciais:

```text
(opportunity_type, publication_state, lifecycle_state)
(primary_country_code)
```

### `opportunity_organizations`

PK composta ou surrogate id não é necessária; usar chave relacional:

```text
(opportunity_id, organization_id, role)
```

- FKs para Opportunity e Organization;
- role CHECK `provider|funder|host`;
- `PRIMARY KEY(opportunity_id, organization_id, role)`.

Relação pode usar `ON DELETE CASCADE` porque não tem histórico próprio; hard delete dos pais continua bloqueado por referências históricas quando existirem.

### `opportunity_programs`

Redução em relação à #33: **não persistir `relation_role` inicialmente** enquanto não houver caso real que exija dois papéis diferentes entre a mesma Opportunity e Program.

```text
PRIMARY KEY(opportunity_id, program_id)
```

Se surgir semântica que não possa ser inferida pelo tipo/contexto da Opportunity, adicionar coluna numa migration específica.

### `application_windows`

- FK `opportunity_id`;
- `window_type text` nullable;
- `opens_at timestamptz` nullable;
- `closes_at timestamptz` nullable;
- `is_rolling boolean NOT NULL DEFAULT false`;
- `notes text` nullable.

Check:

```text
opens_at <= closes_at quando ambos existem
```

Índice:

```text
(opportunity_id, closes_at)
```

Não assumir deadline única.

## 9. RequirementDefinition antes de Claim

`requirement_definitions` deve ser criada antes de `claims`, porque uma Claim pode ter RequirementDefinition como subject.

Campos físicos:

- `id uuid PK`;
- `program_id uuid` nullable FK;
- `opportunity_id uuid` nullable FK;
- `statement text NOT NULL`;
- `category text NOT NULL` CHECK fechado;
- `requirement_role text` nullable CHECK;
- `functional_scope text NOT NULL` CHECK;
- `applicability_mode text NOT NULL` CHECK;
- `applicability_data jsonb` nullable/object;
- `satisfaction_options jsonb` nullable/array;
- `exemptions jsonb` nullable/array;
- `stage text` nullable;
- `publication_state text NOT NULL` CHECK;
- timestamps.

Constraint:

```text
num_nonnulls(program_id, opportunity_id) >= 1
```

Isto evita RequirementDefinition global órfã no MVP e ainda permite uma definição contextual ligada simultaneamente a Program e Opportunity.

Não criar AST nem tabela de operadores.

## 10. Sources, Claims e Observations

### `sources`

- `publisher_organization_id` nullable FK restritiva;
- `reference_url text NOT NULL`;
- `source_type text NOT NULL` não vazio;
- `title text` nullable;
- `language_code text` nullable.

Não aplicar UNIQUE ao URL: uma mesma origem pode precisar de contextos/editorial records distintos e canonicalização pertence a ingestion.

### `claims`

Campos:

- `id uuid PK`;
- `claim_kind text NOT NULL` CHECK;
- `opportunity_id` nullable FK;
- `program_id` nullable FK;
- `requirement_definition_id` nullable FK;
- `application_window_id` nullable FK;
- `current_observation_id uuid` nullable;
- `current_interpretation_state text NOT NULL` CHECK;
- timestamps.

XOR obrigatório:

```text
CHECK (
  num_nonnulls(
    opportunity_id,
    program_id,
    requirement_definition_id,
    application_window_id
  ) = 1
)
```

Não usar polymorphic FK.

### `claim_observations`

- `id uuid PK`;
- `claim_id uuid NOT NULL`;
- `source_id uuid NOT NULL`;
- `observed_value jsonb NOT NULL`;
- `observed_text text` nullable;
- `evidence_locator jsonb` nullable/object;
- `observed_at timestamptz NOT NULL`;
- `context jsonb` nullable/object;
- `verification_state text NOT NULL` CHECK;
- `freshness_state text NOT NULL` CHECK;
- `supersedes_observation_id uuid` nullable;
- timestamps.

Criar `UNIQUE(claim_id, id)` para suportar FKs compostas de consistência.

FK de supersession deve garantir mesma Claim:

```text
(claim_id, supersedes_observation_id)
  -> claim_observations(claim_id, id)
```

`supersedes_observation_id` não pode apontar para a própria linha.

### Current observation pertence à mesma Claim

Após `claim_observations` existir, adicionar FK composta:

```text
(claims.id, claims.current_observation_id)
  -> claim_observations(claim_id, id)
```

Isto impede uma Claim de seleccionar como corrente uma observação de outra Claim.

`current_observation_id` pode ser nulo, inclusive em conflito.

Índice:

```text
claim_observations(claim_id, observed_at DESC)
```

Nunca seleccionar interpretação corrente apenas por `MAX(observed_at)`.

## 11. ResolvedRequirement

### `resolved_requirements`

Campos:

- `id uuid PK`;
- `opportunity_id uuid NOT NULL`;
- `local_key text NOT NULL CHECK btrim(local_key) <> ''`;
- `category text NOT NULL` CHECK;
- `functional_scope text NOT NULL` CHECK;
- `effective_statement text NOT NULL`;
- `applicability_summary jsonb` nullable/object;
- `satisfaction_options jsonb` nullable/array;
- `exemptions jsonb` nullable/array;
- `stage text` nullable;
- `resolution_state text NOT NULL` CHECK;
- `explanation text NOT NULL`;
- `publication_state text NOT NULL` CHECK;
- `supersedes_resolved_requirement_id uuid` nullable;
- `superseded_at timestamptz` nullable;
- timestamps.

Criar `UNIQUE(opportunity_id, local_key, id)` para consistência de supersession.

Supersession deve permanecer na mesma obrigação local:

```text
(opportunity_id, local_key, supersedes_resolved_requirement_id)
  -> resolved_requirements(opportunity_id, local_key, id)
```

Self-reference proibida.

Uma única versão corrente:

```text
UNIQUE (opportunity_id, local_key)
WHERE superseded_at IS NULL
```

Isto é um índice unique parcial, não uma unique constraint tradicional.

### `resolved_requirement_definitions`

```text
PRIMARY KEY(resolved_requirement_id, requirement_definition_id)
```

Sem relação formal addition/specialization/etc. no MVP.

## 12. ApplicationPlan e PlanOpportunity

### `application_plans`

O MVP possui no máximo um plano por estudante.

- `id uuid PK`;
- `student_profile_id uuid NOT NULL UNIQUE`;
- timestamps.

Não criar `status` sem caso de uso.

### `plan_opportunities`

- `id uuid PK`;
- `application_plan_id uuid NOT NULL`;
- `opportunity_id uuid NOT NULL`;
- `added_at timestamptz NOT NULL DEFAULT now()`;
- `removed_at timestamptz` nullable;
- timestamps.

Check:

```text
removed_at is null OR removed_at >= added_at
```

Uma Opportunity corrente por plano:

```text
UNIQUE(application_plan_id, opportunity_id)
WHERE removed_at IS NULL
```

Permite remover e voltar a adicionar no futuro sem apagar história.

Criar também `UNIQUE(id, opportunity_id)` para constraints compostas dos assessments.

## 13. RequirementAssessment

Refinamento da #33: remover `student_profile_id` de `requirement_assessments` porque é derivável por:

```text
assessment
 -> plan_opportunity
 -> application_plan
 -> student_profile
```

Duplicá-lo abriria possibilidade de inconsistência sem ganho funcional.

Para garantir que assessment e ResolvedRequirement pertencem à mesma Opportunity, persistir `opportunity_id` como âncora de integridade.

Campos:

- `id uuid PK`;
- `plan_opportunity_id uuid NOT NULL`;
- `opportunity_id uuid NOT NULL`;
- `resolved_requirement_id uuid NOT NULL`;
- `applicability_result text NOT NULL` CHECK;
- `assessment_result text NOT NULL` CHECK;
- `evidence_state text` nullable CHECK;
- `reason_code text` nullable;
- `explanation text` nullable;
- `supersedes_assessment_id uuid` nullable;
- `superseded_at timestamptz` nullable;
- `assessed_at timestamptz NOT NULL`;
- timestamps.

Integridade de Opportunity:

```text
(plan_opportunity_id, opportunity_id)
  -> plan_opportunities(id, opportunity_id)

(resolved_requirement_id, opportunity_id)
  -> resolved_requirements(id, opportunity_id)
```

Para isso, `resolved_requirements` também recebe `UNIQUE(id, opportunity_id)`.

Criar `UNIQUE(id, plan_opportunity_id)`.

Supersession deve permanecer no mesmo PlanOpportunity:

```text
(supersedes_assessment_id, plan_opportunity_id)
  -> requirement_assessments(id, plan_opportunity_id)
```

Self-reference proibida.

Um assessment corrente por requisito-version/plan opportunity:

```text
UNIQUE(plan_opportunity_id, resolved_requirement_id)
WHERE superseded_at IS NULL
```

Checks semânticos mínimos:

- `assessment_result = 'not_applicable'` só é válido quando `applicability_result = 'does_not_apply'`;
- `applicability_result = 'unknown'` não pode coexistir com `assessment_result IN ('met','gap_detected')`;
- `gap_detected` nunca é convertido em estado de inelegibilidade.

## 14. ApplicationTask

Campos:

- `id uuid PK`;
- `plan_opportunity_id uuid NOT NULL`;
- `requirement_assessment_id uuid` nullable;
- `origin_claim_id uuid` nullable;
- `title text NOT NULL`;
- `description text` nullable;
- `task_type text NOT NULL` CHECK;
- `progress_status text NOT NULL DEFAULT 'todo'` CHECK;
- `revision_state text NOT NULL DEFAULT 'current'` CHECK;
- `due_at timestamptz` nullable;
- `completed_at timestamptz` nullable;
- `supersedes_task_id uuid` nullable;
- timestamps.

Se a task aponta para assessment, ele deve pertencer ao mesmo PlanOpportunity:

```text
(requirement_assessment_id, plan_opportunity_id)
  -> requirement_assessments(id, plan_opportunity_id)
```

Criar `UNIQUE(id, plan_opportunity_id)` para chain de supersession.

Supersession da task deve permanecer no mesmo PlanOpportunity:

```text
(supersedes_task_id, plan_opportunity_id)
  -> application_tasks(id, plan_opportunity_id)
```

Self-reference proibida.

Check de conclusão:

```text
(progress_status = 'done' AND completed_at IS NOT NULL)
OR
(progress_status <> 'done' AND completed_at IS NULL)
```

Não resetar task concluída; mudança material gera `needs_review` ou nova task.

`requirement_assessment_id` e `origin_claim_id` podem ambos ser nulos para task operacional legítima. Não impor XOR.

## 15. Delete policy

### Dados estritamente filhos do perfil

`academic_records` e `language_capabilities` podem usar `ON DELETE CASCADE` a partir de `student_profiles`, porque não são histórico institucional compartilhado.

### Join tables sem histórico próprio

`opportunity_organizations`, `opportunity_programs` e `resolved_requirement_definitions` podem usar cascade a partir dos respectivos pais.

### Catálogo e histórico crítico

Usar `RESTRICT/NO ACTION` por defeito em:

- Opportunity referenciada por plano/claims/requisitos;
- Program referenciado por Opportunity/Requirement/Claim;
- Source referenciada por Observation;
- Claim com Observation/current interpretation/task;
- ClaimObservation;
- RequirementDefinition usada por resolução/claim;
- ResolvedRequirement usada por assessment;
- ApplicationPlan com PlanOpportunity;
- PlanOpportunity com assessment/task;
- RequirementAssessment com task;
- ApplicationTask histórica.

Remoção normal é lifecycle, `removed_at`, supersession ou revisão de estado — não hard delete.

Política de apagamento de dados pessoais por privacidade fica para a issue de auth/ownership e pode exigir fluxo transaccional explícito; não será simulada com cascades amplos agora.

## 16. Índices iniciais

Além de PK/FK/unique:

```text
programs(provider_organization_id)
opportunities(opportunity_type, publication_state, lifecycle_state)
opportunities(primary_country_code)
application_windows(opportunity_id, closes_at)
requirement_definitions(opportunity_id)
requirement_definitions(program_id)
claims(opportunity_id) WHERE opportunity_id IS NOT NULL
claims(program_id) WHERE program_id IS NOT NULL
claims(requirement_definition_id) WHERE requirement_definition_id IS NOT NULL
claims(application_window_id) WHERE application_window_id IS NOT NULL
claim_observations(claim_id, observed_at DESC)
resolved_requirements(opportunity_id, local_key)
plan_opportunities(application_plan_id, opportunity_id)
requirement_assessments(plan_opportunity_id, resolved_requirement_id)
application_tasks(plan_opportunity_id, progress_status, revision_state)
```

Não criar GIN genérico em todos os JSONB.

GIN só entra quando existir consulta real que o justifique.

## 17. JSONB permitido

Permitido inicialmente:

- `student_profiles.preferred_country_codes` — array;
- `student_profiles.preferred_fields` — array;
- `opportunities.temporal_context` — object;
- `requirement_definitions.applicability_data` — object;
- `requirement_definitions.satisfaction_options` — array;
- `requirement_definitions.exemptions` — array;
- `claim_observations.observed_value` — formato variável da claim;
- `claim_observations.evidence_locator` — object;
- `claim_observations.context` — object;
- `resolved_requirements.applicability_summary` — object;
- `resolved_requirements.satisfaction_options` — array;
- `resolved_requirements.exemptions` — array.

Regra: se um item dentro de JSON ganhar identidade própria, precisar de FK, consulta relacional frequente ou histórico independente, deixa de pertencer ao JSON e recebe modelação própria.

## 18. Ordem das futuras migrations

Quando o gate de implementação abrir:

```text
0000_bootstrap
  - extensão/função UUID apenas se o ambiente exigir

0001_student_profile
  - student_profiles
  - academic_records
  - language_capabilities

0002_catalog
  - organizations
  - programs
  - opportunities
  - opportunity_organizations
  - opportunity_programs
  - application_windows

0003_requirement_definitions
  - requirement_definitions

0004_sources_claims
  - sources
  - claims sem FK current_observation ainda
  - claim_observations
  - FKs compostas de supersession
  - FK composta de claims.current_observation_id

0005_resolved_requirements
  - resolved_requirements
  - partial unique current version
  - supersession consistency
  - resolved_requirement_definitions

0006_application_plan
  - application_plans
  - plan_opportunities
  - partial unique current opportunity

0007_requirement_assessments
  - requirement_assessments
  - same-opportunity composite FKs
  - current assessment partial unique

0008_application_tasks
  - application_tasks
  - assessment/task chain consistency

0009_indexes_validation
  - índices secundários
  - validação final das FKs/checks que tenham sido adicionadas NOT VALID durante deploy, se necessário
```

Não dividir migrations por tabela sem necessidade; cada migration representa uma unidade coerente/reversível.

## 19. Subtype tables de Opportunity

Não entram na primeira sequência apenas porque os tipos existem.

Adicionar `*_opportunity_details` numa migration posterior quando existir pelo menos um atributo de tipo efectivamente requerido pelo MVP.

Isto evita quatro tabelas vazias e mantém `opportunities` pequena sem antecipar domínio inexistente.

## 20. O que continua aberto

Esta issue NÃO fecha:

- provider de auth;
- FK real de `student_profiles.account_id`;
- ownership;
- RBAC/RLS;
- policies PostgreSQL/Supabase;
- grants;
- service role;
- API/DTO;
- ORM;
- workflow editorial;
- ingestion;
- matching/ranking;
- conversão de notas;
- retenção/erasure de dados pessoais;
- storage de ficheiros/evidence do estudante;
- triggers complexos;
- actual estratégia de deploy das migrations.

## 21. Reauditoria

O contrato foi reavaliado contra as issues #17, #31, #32 e #33.

Refinamentos introduzidos sem mudar o domínio:

1. `opportunity_programs.relation_role` foi removido do schema inicial por falta de caso de uso concreto.
2. `requirement_assessments.student_profile_id` foi removido por ser redundante e derivável do plano.
3. `requirement_assessments.opportunity_id` foi adicionado apenas como âncora de integridade para garantir que PlanOpportunity e ResolvedRequirement pertencem à mesma Opportunity.
4. `claims.current_observation_id` recebe FK composta para impedir referência cruzada entre Claims.
5. cadeias de supersession recebem consistência local onde isso é possível sem trigger complexo.
6. enums nativos foram rejeitados em favor de CHECKs evolutivos.

Nenhum destes refinamentos altera compatibilidade, elegibilidade, resolução de requisitos ou fluxo do utilizador.

## 22. Conclusão

O schema PostgreSQL está suficientemente fechado para migrations posteriores sem precisar voltar a decidir a estrutura central.

A regra final é:

> integridade forte para identidade, relações, histórico e estados fechados; flexibilidade controlada para estruturas locais ainda variáveis.

A próxima decisão técnica é ownership/auth + RBAC/RLS.