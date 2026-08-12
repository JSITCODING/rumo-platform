# Rumo — Claims críticos e histórico de revisões

## Estado

- **Issue:** #32 — `[Research][Backend] Definir claims críticos e histórico de revisões`
- **Estado:** Conceptualmente fechado após reauditoria
- **Natureza:** decisão de domínio; não autoriza implementação
- **Base:** #17 e #31

## 1. Objectivo

Definir o mínimo conceptual necessário para que a Rumo preserve evolução, conflito e proveniência de informação crítica sem sobrescrita destrutiva e sem adoptar prematuramente event sourcing, temporal tables ou snapshots integrais.

## 2. Princípio central

A menor unidade histórica útil é uma **observação de uma claim crítica**.

```text
Claim
= a afirmação/informação de produto que queremos conhecer

ClaimObservation
= aquilo que uma fonte sustentava ou apresentava num momento/contexto observado
```

Exemplo:

```text
Claim:
Prazo final da candidatura internacional 2027/28

Observation A:
15 Fev 2027
observedAt: T1
source: página oficial

Observation B:
1 Mar 2027
observedAt: T2
source: mesma página oficial actualizada
```

A Observation B não apaga A.

## 3. O que não vamos criar

Não criar nesta fase:

- event store;
- evento por cada alteração técnica;
- snapshot completo da Opportunity a cada revisão;
- modelo key/value universal para todo o domínio;
- histórico de qualquer campo irrelevante;
- temporal database genérica;
- mecanismo de CDC;
- diff engine universal.

O histórico aplica-se a informação cuja alteração possa mudar materialmente discovery, interpretação, requisito, prazo ou plano.

## 4. Claim não é um contentor genérico

`Claim/InformationItem` é usado apenas onde granularidade de proveniência, conflito ou mudança é funcionalmente relevante.

Claims críticas iniciais incluem, quando aplicável:

- prazo/janela de candidatura;
- propina/custo crítico;
- requisito;
- documento exigido ou aceite;
- vaga/limite;
- benefício financeiro/cobertura;
- outra informação que possa alterar materialmente S06, S07 ou S08.

Não transformar automaticamente título, descrição, fotografia, copy ou todos os campos internos em Claims versionadas.

## 5. Modelo conceptual mínimo

```text
Claim
├── subject/context
├── observations[]
└── current interpretation?

ClaimObservation
├── observed value/text
├── source
├── evidence?
├── observedAt
├── applicable context
├── verification
└── freshness context
```

`current interpretation` é a visão que a Rumo decide apresentar naquele contexto. Pode ser derivada, editorialmente seleccionada ou materializada; a #32 não decide persistência.

## 6. Source, Evidence e Observation

```text
Source
= documento/página/origem

Evidence
= referência concreta dentro da Source

ClaimObservation
= informação observada nessa origem/contexto naquele momento
```

Uma URL não é uma Observation.

Uma Observation deve preservar acesso suficiente para explicar de onde veio a informação observada.

## 7. Verification e Freshness não pertencem à mesma dimensão

Uma Observation pode ser:

```text
verification = confirmed
freshness = needs_refresh
```

Isto significa:

- foi revista e confirmada quando observada;
- já precisa de nova revisão.

Não converter automaticamente isso para “não verificada”.

Da mesma forma, uma informação pode estar actual e ainda precisar de revisão humana antes de ser confirmada.

## 8. Publication e lifecycle continuam separados

Não misturar:

```text
Publication
Verification
Freshness
Opportunity lifecycle
```

Uma Opportunity fechada pode ter claims historicamente correctas.

Uma Opportunity aberta pode ter claims stale.

Uma claim confirmada pode ainda não estar publicada.

## 9. Nova observação

Uma nova observação existe quando a Rumo volta a consultar uma fonte ou recebe nova evidência relevante e encontra informação materialmente observável para a mesma claim/contexto.

Nova consulta sem mudança material não exige duplicação histórica obrigatória.

Podemos conceptualizar:

```text
same value + same context + no material evidence change
→ refresh/review metadata may be enough

changed value/context/evidence with material effect
→ new ClaimObservation
```

A representação física fica aberta.

## 10. Supersession

`superseded` significa:

> uma observação posterior é considerada a representação actualmente aplicável daquela informação no mesmo contexto.

Não significa:

- apagar a anterior;
- declarar a anterior “falsa” retroactivamente;
- alterar histórico de decisões feitas com base nela.

Exemplo:

```text
T1: deadline = 15 Fev
T2: deadline = 1 Mar
```

Se a fonte oficial actualizou explicitamente o mesmo ciclo:

```text
T2 supersedes T1 for current presentation
```

T1 continua no histórico.

## 11. Supersession não deve ser inferida apenas por recência

Uma informação mais recente pode pertencer a:

- outro ciclo;
- outra route;
- outro público;
- outro programa;
- outro scope.

Logo:

```text
newer != automatically supersedes
```

Antes de supersession, verificar compatibilidade de contexto.

## 12. Conflito

Existe conflito quando duas ou mais observações continuam potencialmente aplicáveis ao mesmo contexto e não existe base segura para seleccionar uma como representação actual.

Exemplo:

```text
Source A:
IELTS 6.5

Source B:
IELTS 7.0

same cycle
same route
same audience
```

Resultado:

```text
current interpretation = unresolved/conflicting
```

A Rumo não escolhe o valor mais conservador apenas por segurança.

## 13. Conflito não é histórico normal de alteração

Se uma fonte dizia 6.5 em Janeiro e explicitamente passa a dizer 7.0 em Fevereiro para o mesmo ciclo, isso pode ser supersession.

Se duas fontes actuais continuam a afirmar 6.5 e 7.0, isso é conflito.

A distinção depende de contexto e evidência de substituição, não apenas timestamp.

## 14. Fonte desaparecida

Quando uma Source deixa de estar acessível:

- não apagar Observation anterior;
- não assumir que a informação ficou falsa;
- freshness deve exigir revisão;
- verification histórico permanece como facto do processo anterior;
- current interpretation pode deixar de ser suficientemente segura para nova decisão.

Arquivamento técnico da página fica fora desta issue.

## 15. Fonte actualizada sem alterar o valor

Se a fonte continua a apresentar a mesma claim:

```text
value remains same
new observation/review confirms currentness
```

Não é necessário criar uma nova “versão de domínio” integral da Opportunity.

A política física pode actualizar metadados de revisão ou criar Observation conforme necessidade de auditoria; não decidimos aqui.

## 16. Fonte actualizada com mudança material

Mudanças materiais incluem, por exemplo:

- deadline;
- valor de propina;
- limiar de requisito;
- documento aceite;
- cobertura financeira;
- número de vagas quando afecta produto;
- contexto de aplicabilidade.

Produzem nova observação e reavaliação do que depende da claim.

## 17. Claim de Requirement

Para requisitos, a Observation original continua distinta de `ResolvedRequirement`.

```text
ClaimObservation(s)
        ↓
RequirementDefinition
        ↓
contextual resolution
        ↓
ResolvedRequirement
```

Uma alteração numa claim pode tornar o ResolvedRequirement anterior obsoleto, mas não apaga a resolução histórica.

## 18. Impacto em artefactos derivados

Quando uma claim material muda, não actualizar silenciosamente todos os artefactos derivados como se sempre tivessem usado o novo valor.

O mínimo conceptual é:

```text
Claim changes materially
        ↓
mark dependent derived artifacts for review
```

Podem ser afectados:

- ResolvedRequirement;
- RequirementAssessment;
- CompatibilityAssessment;
- deadline alerts;
- checklist;
- ApplicationTask.

## 19. ResolvedRequirement

Se uma claim de requisito é superseded ou entra em conflito:

- o ResolvedRequirement corrente precisa de nova resolução/revisão;
- a resolução anterior continua historicamente explicável;
- conflito crítico impede uma nova resolução definitiva.

Não precisamos decidir nesta issue se cada resolução é persistida ou recalculada.

## 20. RequirementAssessment

Um assessment produzido com base em requisito anterior não deve ser reescrito retroactivamente.

Exemplo:

```text
T1 requirement: IELTS 6.5
T1 student: IELTS 6.5
assessment: MET

T2 requirement: IELTS 7.0
```

O assessment em T1 continua historicamente correcto relativamente aos inputs de T1.

O estado actual precisa de nova avaliação.

## 21. ApplicationTask

Uma task concluída não volta silenciosamente a `Por fazer` porque a claim mudou.

Exemplo:

```text
Task:
Preparar IELTS 6.5
status: Concluído
```

Depois a regra muda para 7.0.

Opções conceptuais seguras:

- task antiga mantém histórico e passa a `needs_review` em dimensão própria futura;
- task antiga fica superseded;
- nova task é criada.

Não falsificar conclusão passada.

Os estados funcionais `Por fazer / Em curso / Concluído` continuam separados do impacto da revisão.

## 22. Problema editorial vs tarefa do estudante

Se duas fontes entram em conflito:

```text
EditorialAction:
resolver/rever informação
```

por defeito.

Só gerar `ApplicationTask` quando existir uma acção real e legítima para o estudante.

Exemplo válido:

> A instituição exige que casos individuais confirmem directamente o requisito.

Exemplo inválido:

> A Rumo não sabe qual página está correcta, então manda o estudante investigar.

## 23. O que significa “histórico não destrutivo”

Para informação crítica, deve ser possível reconstruir conceptualmente:

```text
what we observed
where we observed it
when we observed it
what context it applied to
what review state it had
what later observation replaced or conflicted with it
```

Não exige event sourcing.

## 24. Não precisamos de snapshot integral

Não guardar por princípio uma cópia integral da Opportunity sempre que um prazo muda.

O histórico necessário está concentrado nas claims críticas e nas referências dos artefactos derivados aos inputs/contextos usados.

Isto reduz complexidade e volume.

## 25. Referência dos artefactos derivados aos inputs

Conceptualmente, artefactos derivados devem conseguir indicar a que estado/input foram produzidos.

Não fixamos mecanismo físico.

Pode ser versão, IDs de observations, timestamp consistente ou outra estratégia futura.

O invariante é:

> uma explicação histórica deve conseguir identificar os inputs relevantes que sustentaram o artefacto.

## 26. Human review

Automação pode:

- recolher nova informação;
- detectar mudança;
- sugerir que duas observações são da mesma claim;
- sinalizar possível supersession;
- detectar possível conflito.

Mas informação crítica não é promovida automaticamente a `confirmed` sem o processo de revisão aprovado.

## 27. Freshness

Freshness pode mudar sem alteração de valor.

Gatilhos incluem:

- tempo desde última revisão;
- aproximação de deadline;
- novo ciclo;
- mudança detectada na fonte;
- desaparecimento da fonte;
- alteração relevante na Opportunity;
- conflito surgido.

Não precisamos de uma política universal nesta issue.

## 28. Claim actual vs Observation actual

Evitar confundir:

```text
latest observation
```

com:

```text
current accepted interpretation
```

A última observação pode:

- pertencer a contexto diferente;
- estar por rever;
- entrar em conflito;
- não substituir a anterior.

A apresentação corrente é uma decisão contextual/revista.

## 29. Exemplo completo — prazo alterado

```text
Claim:
application deadline / opportunity X / cycle 2027

Observation A
value: 15 Feb
source: official page
observedAt: Jan 10
verification: confirmed

Observation B
value: Mar 1
source: same official page
observedAt: Jan 25
verification: confirmed
```

Se B explicitamente actualiza o mesmo prazo:

```text
current interpretation = Mar 1
A remains historical
```

Derivados:

- deadline display actualizado;
- alertas precisam revisão/regeneração;
- tasks dependentes do prazo precisam revisão;
- histórico anterior permanece.

## 30. Exemplo completo — conflito

```text
Claim:
English minimum / opportunity X / cycle 2027

Observation A
IELTS 6.5
official central admissions page

Observation B
IELTS 7.0
official programme page
```

Sem evidência segura de precedência:

```text
verification/context result = conflicting
current definitive requirement = unavailable
```

Impacto:

- S07 mostra informação em confirmação;
- Requirement resolution é bloqueada ou marcada unresolved;
- assessment definitivo é bloqueado;
- não criar automaticamente task para o estudante;
- criar necessidade editorial de revisão.

## 31. Exemplo — propina

```text
T1:
€7,000
confirmed

T2:
€7,500
new cycle
```

Se os ciclos diferem, não há supersession global.

Cada valor pertence ao respectivo contexto.

Não substituir o valor histórico do ciclo anterior.

## 32. Exemplo — documento deixou de ser exigido

```text
T1:
motivation letter required

T2:
source no longer lists motivation letter
```

A ausência por si só não prova remoção se a fonte for incompleta.

Requer revisão antes de concluir supersession/removal.

Se confirmado que deixou de ser exigido:

- current requirement muda;
- task histórica não é apagada;
- task corrente pode ser superseded/no-longer-required em semântica futura.

## 33. Invariantes fechados

1. Claims críticas preservam proveniência.
2. Mudança material não é sobrescrita destrutivamente.
3. `latest observation` não significa `current accepted interpretation`.
4. Recência por si só não prova supersession.
5. Contextos diferentes não entram automaticamente em conflito.
6. Conflito actual não apaga observações anteriores.
7. Fonte desaparecida não apaga histórico nem prova falsidade.
8. Verification histórico não é reescrito por Freshness posterior.
9. Alterações materiais exigem revisão dos artefactos derivados afectados.
10. Assessments antigos continuam historicamente ligados aos inputs que os produziram.
11. Tasks concluídas não são resetadas silenciosamente.
12. Problemas editoriais não viram automaticamente tarefas do estudante.
13. Automação não confirma informação crítica sem processo aprovado.
14. Não é necessário snapshot integral da Opportunity para preservar histórico crítico.
15. Event sourcing não é requisito do MVP.

## 34. Modelo mínimo aprovado

```text
Claim
└── ClaimObservation[]
    ├── observed value/text
    ├── source/evidence
    ├── observedAt
    ├── context
    ├── verification
    └── freshness-related metadata

Claim observations
        ↓ review/context
Current interpretation
        ↓
Domain object / ResolvedRequirement / UI
```

E para derivados:

```text
critical claim changes
        ↓
identify affected derived artifacts
        ↓
review/recompute current state
        ↓
preserve historical state
```

## 35. Deliberadamente aberto

A próxima fase pode decidir:

- se Claim é entidade física ou estrutura ligada aos objectos;
- se ClaimObservation é tabela própria;
- estratégia de IDs/versioning;
- como ligar artefactos derivados aos inputs;
- retenção concreta;
- arquivamento de evidência;
- política de freshness por tipo;
- workflow editorial;
- materialização/cache de current interpretation;
- schema, indexes e migrations;
- APIs/DTOs;
- RLS/RBAC.

## 36. Resultado

A #32 fecha com uma escolha deliberadamente simples:

> Preservar observações históricas apenas para informação crítica, manter uma interpretação corrente separada do histórico, propagar mudanças por revisão de artefactos derivados e não adoptar event sourcing ou snapshots integrais sem necessidade demonstrada.
