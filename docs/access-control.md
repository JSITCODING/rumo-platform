# Rumo — Ownership, RBAC e contrato RLS do MVP

## Estado

- **Issue:** #35 — `[Backend][Security] Fechar ownership, RBAC e contrato RLS do MVP`
- **Estado:** Fechado para implementação posterior
- **Base:** issues #31–#34
- **Natureza:** contrato de acesso; não escolhe provider de auth nem cria policies SQL executáveis

## 1. Objectivo

Definir quem é dono de cada dado, quem pode lê-lo ou alterá-lo e onde a Rumo exige uma boundary de serviço confiável.

Esta decisão precisa preservar quatro separações:

1. identidade autenticada != perfil do estudante;
2. ownership do estudante != papel editorial;
3. informação oficial/revista != dados que o estudante pode editar;
4. RLS/security != lógica de discovery, matching ou elegibilidade.

## 2. Identity boundary

### 2.1 Identidade externa

O domínio não cria tabela própria de password/sessão.

O provider de autenticação futuro fornece um identificador estável:

```text
authenticated_account_id: uuid
```

`student_profiles.account_id` referencia conceptualmente esse identificador.

A FK física permanece aberta até o provider de auth ser escolhido.

### 2.2 Identidade corrente

As futuras policies não devem confiar num `account_id` enviado pelo frontend.

Devem usar uma função/boundary lógico equivalente a:

```text
current_account_id() -> uuid | null
```

A implementação pode futuramente mapear:

- claim do provider/JWT;
- sessão PostgreSQL controlada pelo backend;
- `auth.uid()` se Supabase for escolhido;
- mecanismo equivalente de outro provider.

O domínio e as policies não dependem do nome concreto dessa função.

### 2.3 Sem autenticação anónima para dados personalizados

O fluxo MVP exige conta antes de S03–S08.

Não existe requisito para acesso anónimo directo ao catálogo na base de dados.

S01/S02 não justificam grants públicos sobre as tabelas do núcleo.

## 3. Ownership do estudante

Ownership é derivado de uma única raiz:

```text
student_profiles.account_id = current_account_id()
```

Todos os outros dados pessoais derivam desta relação.

### Grafo de ownership

```text
Account
  ↓
StudentProfile
  ├── AcademicRecord[]
  ├── LanguageCapability[]
  └── ApplicationPlan
       └── PlanOpportunity[]
            ├── RequirementAssessment[]
            └── ApplicationTask[]
```

Não duplicar `account_id` em todas as tabelas.

## 4. Student não é papel editorial

A condição de estudante não depende de uma row em RBAC.

Um utilizador é owner dos seus dados quando existe um `student_profile` ligado ao seu account id.

Papéis editoriais são uma camada separada.

Isto permite que, se necessário, uma mesma conta tenha perfil de estudante e permissões de staff sem misturar ownership com autoridade editorial.

## 5. Papéis editoriais mínimos

Usar atribuições múltiplas, não um único `role` por conta.

Tabela conceptual mínima futura:

```text
staff_role_assignments
- account_id uuid
- role text
- granted_at timestamptz
- granted_by uuid nullable

PK(account_id, role)
```

Roles fechados para o MVP:

```text
catalog_editor
reviewer
publisher
admin
```

### `catalog_editor`

Pode preparar informação interna:

- criar/editar Organizations;
- criar/editar Programs em draft;
- criar/editar Opportunities em draft;
- criar/editar ApplicationWindows;
- criar Sources;
- criar Claims;
- adicionar ClaimObservations inicialmente em estado de revisão;
- criar/editar RequirementDefinitions;
- preparar ResolvedRequirements ainda não publicados.

Não pode, apenas por ser editor:

- promover informação crítica a `confirmed`;
- seleccionar definitivamente uma interpretação corrente conflitante;
- publicar conteúdo;
- alterar dados pessoais do estudante.

### `reviewer`

Pode executar decisões de revisão:

- rever ClaimObservations;
- marcar verification como `confirmed` ou `conflicting`;
- seleccionar/alterar a interpretação corrente de uma Claim;
- declarar Claim como `needs_review`, `accepted`, `conflicting` ou `unavailable` segundo evidência;
- rever ResolvedRequirements e o respectivo `resolution_state`;
- validar que conflitos não foram ocultados.

Reviewer não publica apenas por rever.

### `publisher`

Pode tornar representação editorial visível ao estudante:

- `Program.publication_state -> published`;
- `Opportunity.publication_state -> published`;
- `ResolvedRequirement.publication_state -> published`;
- alterações editoriais de lifecycle visível quando legitimamente aprovadas.

Publicação deve operar sobre informação já revista segundo o workflow que será fechado na issue de ingestion/editorial.

### `admin`

Admin gere acesso operacional:

- atribuir/remover roles de staff;
- recuperar acesso administrativo;
- gerir configuração de segurança que venha a ser aprovada.

**Admin não implica automaticamente editor, reviewer ou publisher.**

Se a mesma pessoa precisar das quatro capacidades no piloto, recebe explicitamente os papéis necessários.

Isto preserva a separação sem exigir quatro pessoas diferentes.

## 6. Princípio de separação de capacidades

A separação obrigatória é semântica, não necessariamente humana.

```text
edit
!= review
!= publish
```

No piloto, uma única pessoa pode possuir os três papéis.

Mesmo assim, devem continuar a existir acções e permissões distintas para evitar que uma escrita normal seja automaticamente uma confirmação/publicação.

## 7. Actor de serviço interno

Existe conceptualmente um principal não-humano:

```text
trusted_system_service
```

Serve para operações que não devem ser executadas directamente pelo browser:

- produzir/recomputar RequirementAssessments;
- gerar/rever ApplicationTasks derivadas;
- executar transacções com múltiplas tabelas;
- servir API futura;
- executar jobs futuros.

Regras:

1. credencial privilegiada nunca vai para frontend/mobile;
2. não usar bypass de RLS como substituto de authorization de aplicação;
3. operações privilegiadas devem ser limitadas ao caso de uso;
4. automação não pode promover informação crítica a `confirmed` ou `published` sem o processo humano aprovado;
5. se o provider oferecer uma `service role` com bypass amplo, ela só existe no backend confiável.

## 8. Política por grupo de tabelas

### 8.1 Student-owned mutable

```text
student_profiles
academic_records
language_capabilities
application_plans
plan_opportunities
```

Estudante autenticado pode operar apenas rows pertencentes ao seu grafo de ownership.

### 8.2 Student-derived, não-authoritative

```text
requirement_assessments
application_tasks
```

São personalizados, mas nem todos são student-writable.

`RequirementAssessment` é derivado pela Rumo e nunca é uma declaração editável pelo estudante.

`ApplicationTask` contém parte gerida pela Rumo e parte de progresso gerida pelo estudante.

### 8.3 Catálogo publicado

```text
organizations
programs
opportunities
opportunity_organizations
opportunity_programs
application_windows
resolved_requirements
resolved_requirement_definitions
```

Estudante pode ler apenas a representação necessária ao produto e já autorizada para publicação.

### 8.4 Editorial interno

```text
sources
claims
claim_observations
requirement_definitions
raw/draft catalogue data
```

Não recebem acesso directo de estudante.

A API futura pode expor provenance segura e fontes oficiais a partir destes dados sem abrir raw observations, conflitos internos ou draft editorial.

## 9. Matriz de acesso — estudante

### `student_profiles`

Student:

- SELECT próprio;
- INSERT apenas com `account_id = current_account_id()`;
- UPDATE próprio;
- DELETE directo: não.

Nenhum cliente pode criar perfil para outro account id.

### `academic_records`

Student:

- SELECT/INSERT/UPDATE apenas se o `student_profile_id` for próprio;
- DELETE pode ser permitido para dados ainda editáveis do perfil, desde que não destrua evidence externa ou histórico institucional — que ainda não existe neste modelo.

### `language_capabilities`

Mesmo ownership de AcademicRecord.

### `application_plans`

Student:

- SELECT próprio;
- INSERT apenas para o próprio StudentProfile;
- sem hard delete normal.

Unique física continua a garantir um plano por estudante no MVP.

### `plan_opportunities`

Student:

- SELECT próprias;
- INSERT em plano próprio apenas para Opportunity que o produto autorize a guardar;
- remoção lógica apenas em row própria (`removed_at`), não hard delete;
- não pode modificar `opportunity_id` de uma row existente para fingir que é outra oportunidade.

A condition “Opportunity publicada” pertence à operação de adicionar ao plano, mas lifecycle/compatibilidade não deve ser transformada em regra de segurança universal.

### `requirement_assessments`

Student:

- SELECT apenas assessments ligados às suas PlanOpportunities;
- INSERT: não;
- UPDATE: não;
- DELETE: não.

O estudante não pode marcar a si próprio como `met`, `not_applicable` ou alterar evidence state.

### `application_tasks`

Student:

- SELECT tasks das suas PlanOpportunities;
- não cria task derivada do sistema no MVP;
- pode alterar apenas o progresso legítimo da task.

Campos que podem ser student-writable:

```text
progress_status
completed_at
```

Campos que NÃO podem ser student-writable:

```text
plan_opportunity_id
requirement_assessment_id
origin_claim_id
title
description
task_type
revision_state
due_at
supersedes_task_id
```

Se acesso directo à DB for usado no futuro, isto exige grants por coluna e RLS. Se existir apenas API backend, a mesma regra deve ser aplicada no command handler.

Student não pode mudar `revision_state = needs_review` para `current`.

## 10. Leitura do catálogo publicado

### RLS não é filtro de discovery

RLS responde:

> “este utilizador pode ver esta row?”

Discovery responde:

> “esta Opportunity deve aparecer neste resultado, em que ordem e com que explicação?”

Não codificar matching, compatibilidade, país preferido, ranking ou deadlines como policies RLS.

### Opportunity

Para student, requisito mínimo de segurança:

```text
publication_state = 'published'
```

`lifecycle_state` não deve por si só ser bloqueado por RLS porque:

- uma Opportunity closed pode continuar necessária no histórico do plano;
- uma Opportunity archived pode precisar ser mostrada como referência histórica;
- discovery decide o que entra no feed actual.

### Program

Student vê Programs `published` necessários às Opportunities visíveis.

### Organization

Organization não possui publication_state no modelo actual.

Não conceder SELECT irrestrito a todas as Organizations por conveniência.

A policy/view/API futura deve limitar a Organizations relacionadas com Program/Opportunity publicada, salvo se surgir requisito público mais amplo.

### Join tables / ApplicationWindow

Leitura permitida apenas quando a Opportunity relacionada é visível ao estudante.

### ResolvedRequirement

Student vê versões `published` necessárias para:

- S07 actual;
- assessments do próprio plano;
- histórico que explique uma avaliação anterior.

Não esconder automaticamente versão histórica só porque `superseded_at` deixou de ser nulo se ela sustenta assessment do estudante.

## 11. Raw claims e provenance

### Student não lê raw editorial por defeito

Sem acesso directo a:

```text
claims
claim_observations
requirement_definitions
```

Motivos:

- podem conter informação ainda não revista;
- podem conter fontes contraditórias;
- podem ter observações históricas que não são a interpretação corrente;
- expor a tabela directamente obrigaria o cliente a reconstruir lógica editorial.

### Mas provenance continua visível no produto

A decisão #17 permanece válida: informação crítica publicada precisa de fonte/revisão acessível.

A futura API/DTO deve projectar apenas:

- fonte apropriada;
- data/estado de revisão relevante;
- explicação de conflito quando aplicável;
- evidência que seja segura e necessária.

Isto não exige SELECT directo às tabelas internas pelo student role.

## 12. Staff access matrix

### Catalog editor

Pode escrever catálogo/drafts e observações, mas novas ClaimObservations entram por defeito sem confirmação final.

Não pode usar simples UPDATE para transformar edição em verificação/publicação.

### Reviewer

Pode ler todo o material editorial necessário e alterar campos de revisão/resolução aprovados.

Não altera dados pessoais de estudante por esse papel.

### Publisher

Pode publicar artefactos revistos.

Não deve precisar de alterar observed_value/raw evidence para publicar.

### Admin

Pode gerir `staff_role_assignments`.

Admin não recebe acesso ao perfil de estudantes por conveniência. Qualquer suporte operacional futuro que precise de dados pessoais deve ter capability específica e motivo auditável.

## 13. Staff role storage

`staff_role_assignments` é a única tabela nova exigida por esta decisão.

Contrato mínimo:

```text
account_id uuid not null
role text not null
  check role in ('catalog_editor','reviewer','publisher','admin')
granted_at timestamptz not null default now()
granted_by uuid nullable
primary key(account_id, role)
```

`granted_by` permanece sem FK para auth provider até identity boundary físico ser escolhido.

Não criar:

- tabela `permissions`;
- role hierarchy;
- ABAC genérico;
- policy engine;
- scopes institucionais;
- tenant table.

O MVP não precisa disso.

## 14. Helpers conceptuais de policy

As futuras policies podem usar equivalentes lógicos a:

```text
current_account_id()
owns_student_profile(profile_id)
owns_application_plan(plan_id)
owns_plan_opportunity(plan_opportunity_id)
has_staff_role(role)
```

A implementação deve evitar helpers `SECURITY DEFINER` amplos sem revisão de `search_path` e privilégios.

Se helpers não forem necessários, usar `EXISTS` directamente nas policies.

## 15. RLS por tabela — contrato mínimo

### Enable RLS

Quando implementação começar, activar RLS em todas as tabelas acessíveis por credenciais de aplicação, incluindo catálogo, e não apenas tabelas pessoais.

### Student-owned

Policies de ownership para:

```text
student_profiles
academic_records
language_capabilities
application_plans
plan_opportunities
requirement_assessments
application_tasks
```

### Editorial/catalogue

Policies baseadas em:

```text
published visibility
OR approved staff capability
```

para:

```text
programs
opportunities
opportunity_organizations
opportunity_programs
application_windows
resolved_requirements
```

### Internal only

Sem student policy directa para:

```text
staff_role_assignments
sources
claims
claim_observations
requirement_definitions
```

Accessível apenas a staff capability apropriada ou trusted backend.

## 16. Column privileges

RLS restringe rows; não resolve por si só quais colunas podem ser alteradas.

Pontos obrigatórios:

1. student pode actualizar StudentProfile próprio conforme campos permitidos;
2. student pode alterar apenas progresso/completed_at das tasks;
3. editor não pode confirmar/publicar só porque pode editar row;
4. reviewer não precisa de privileges sobre observed_value se a sua função é rever;
5. publisher não precisa de privileges de edição ampla sobre raw data.

A implementação deve usar column grants, views/RPCs ou command handlers backend — não um `UPDATE` genérico para todos os campos.

## 17. Trusted service e RLS

Se o backend usar uma credencial com bypass de RLS:

- nunca expor essa credencial ao browser/app;
- toda chamada deve revalidar actor e ownership;
- bypass não significa `admin` funcional;
- operações editoriais humanas devem transportar a identidade real do actor quando workflow/auditoria for implementado;
- jobs automáticos não podem confirmar/publish critical claims sem gate humano aprovado.

Preferir credenciais/roles separadas por finalidade quando a plataforma escolhida permitir, em vez de uma única chave omnipotente usada em todo lado.

## 18. Segurança de assessments

RequirementAssessment é particularmente sensível semanticamente.

Regras:

- só trusted backend cria/recalcula;
- student só lê os seus;
- staff editorial não edita assessment individual do estudante como parte da curadoria normal;
- `gap_detected` continua não significando inelegibilidade;
- alterações no profile podem causar nova assessment, nunca UPDATE destrutivo da história;
- nenhuma policy permite student escrever `assessment_result`.

## 19. Segurança das tasks

A ApplicationTask mistura orientação do sistema e progresso do utilizador.

Logo:

```text
system-owned fields
+ student-owned progress
```

A task não é “row totalmente owned pelo estudante”.

O student tem autorização funcional para actualizar progresso, não autoridade sobre a definição da task.

Quando source/requisito muda:

- trusted service/editorial workflow altera `revision_state` ou cria nova task;
- student não pode remover o alerta de revisão alterando a row.

## 20. Delete e erasure

### Operação normal

Student não executa hard delete de:

- StudentProfile;
- ApplicationPlan;
- PlanOpportunity histórica;
- Assessment;
- Task.

Staff também não hard-delete:

- ClaimObservation;
- RequirementDefinition usada;
- ResolvedRequirement histórico;
- fontes/evidence usadas por histórico;
- Opportunities usadas por planos.

### Direito/fluxo de apagamento futuro

Apagamento de dados pessoais é uma operação administrativa própria e não uma policy CRUD comum.

A futura issue de privacy/retention deve decidir:

- que dados podem/dever ser eliminados;
- quais precisam de anonimização;
- retenção;
- impacto em histórico agregado/editorial;
- execução transaccional.

Não usar `ON DELETE CASCADE` amplo como substituto dessa decisão.

## 21. O que RLS não deve decidir

Não colocar em RLS:

- matching score;
- compatibility;
- elegibilidade;
- recomendação;
- `unknown` assessment logic;
- filtro por destinos preferidos;
- ordenação;
- prazo “relevante”;
- decisão de scholarship;
- seleção de SatisfactionOption;
- derivação de tasks.

São regras de domínio/aplicação.

## 22. Gate de publicação

Contrato funcional:

```text
editor prepares
      ↓
reviewer reviews
      ↓
publisher publishes
```

A mesma conta pode executar os três passos se tiver os três roles.

Mas nenhuma capability isolada deve colapsar os passos.

Detalhes como `reviewed_by`, `published_by`, transições exactas e logs pertencem à futura issue de workflow editorial/ingestion; não criar audit log universal aqui.

## 23. Invariantes de segurança

1. Nunca confiar em `account_id` fornecido pelo cliente para ownership.
2. Student nunca escreve official Requirement/Claim/Assessment.
3. Student não pode promover informação para confirmed/published.
4. Student só altera progresso legítimo das próprias tasks.
5. Raw observations e drafts não são student-readable directamente.
6. Publicação é separada de edição e revisão.
7. Admin não implica automaticamente publisher/reviewer/editor.
8. Service credentials privilegiadas nunca entram no cliente.
9. RLS não substitui autorização da API quando houver backend privilegiado.
10. RLS não contém matching/elegibilidade.
11. Closed/archived não são sinónimos de “proibido ler”.
12. Histórico do estudante continua legível quando necessário para explicar decisões passadas.
13. Automation não confirma critical information sozinha.
14. Dados pessoais de outro estudante nunca são visíveis por ownership indirecto acidental.

## 24. O que fica aberto

- provider de auth;
- formato real do JWT/session;
- FK de `account_id`;
- implementação de `current_account_id()`;
- policies SQL exactas;
- grants PostgreSQL exactos;
- integração Supabase ou outro provider;
- password recovery/MFA/social auth;
- retenção/erasure;
- auditoria de actor;
- workflow editorial concreto;
- institutional SSO;
- multi-tenancy;
- API/DTO.

## 25. Próxima ordem técnica

Com o domínio, schema e access contract fechados:

```text
#36 API/DTO contract
# editorial/ingestion workflow
# matching/ranking
```

A implementação executável continua bloqueada pelo gate visual/protótipo/testes já definido no projecto.

## 26. Conclusão

O modelo de segurança do MVP é deliberadamente simples:

```text
student ownership
+
small explicit staff RBAC
+
RLS as defence in depth
+
trusted backend for derived/system writes
```

Não é necessário ABAC genérico, multi-tenant permission engine ou acesso administrativo omnipotente para entregar o MVP com separação de responsabilidades correcta.