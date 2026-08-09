# Rumo — Descoberta técnica de backend do MVP

## Estado do documento

- **Issue:** #17 — `[Research][Backend] Documentar descoberta técnica do MVP`
- **Estado:** Conceptualmente fechado — pronto para revisão final/PR
- **Ecrã afectado:** Transversal — S01–S08
- **Natureza:** investigação e documentação; não autoriza implementação
- **Piloto:** Angola
- **Expansão prevista:** internacional, sem hardcode geográfico no modelo conceptual

## 1. Objectivo

Reduzir a incerteza técnica do MVP antes da implementação, descrevendo apenas o domínio necessário ao fluxo aprovado.

Este documento **não** define esquema de base de dados, tabelas, migrations, endpoints, DTOs finais, serviços, autenticação, stack, regras reais de elegibilidade, algoritmos de matching, scraping, versionamento físico ou arquitectura de produção.

O piloto operacional da Rumo é Angola, mas o domínio deve evitar pressupostos que impeçam expansão para estudantes, organizações e oportunidades de outros países.

## 2. Fontes e precedência

### Fontes funcionais principais

- `docs/user-flow.md`
- `docs/design-decisions.md`
- Issue #17

### Fontes adicionais da issue

- `docs/design-theory.md`
- `docs/penpot-workspace.md`
- `design/tokens.json`
- Issue #14

### Documentos ainda incompletos

- `docs/product-brief.md`
- `docs/mvp-scope.md`
- `docs/data-requirements.md`

Documentos incompletos não devem ser usados para inventar requisitos ainda não aprovados.

## 3. Convenções

### Facto

Comportamento confirmado pelo fluxo aprovado, decisões já aceites ou pela própria issue.

### Recomendação conceptual

Limite de domínio ou produto aceite para reduzir risco. Não define persistência nem tecnologia.

### Aberto para fase técnica seguinte

Decisão deliberadamente não fechada porque depende de modelação física, operação real ou dados ainda inexistentes.

## 4. Factos confirmados

1. O MVP tem oito ecrãs primários, S01–S08.
2. O utilizador principal do piloto é um estudante angolano que procura estudar no estrangeiro.
3. Os destinos iniciais são Portugal, Alemanha e Espanha.
4. O perfil necessário à análise inclui informação académica, linguística, financeira, preferências de estudo, destinos e horizonte de entrada.
5. Respostas aproximadas, autodeclaradas ou não verificadas devem preservar a sua incerteza.
6. A análise de perfil não constitui decisão de admissão.
7. A descoberta apresenta oportunidades potencialmente compatíveis e deve explicar por que aparecem ao estudante.
8. A Rumo não pode garantir admissão, bolsa, financiamento ou visto.
9. Informação desconhecida não pode ser preenchida com valores inventados.
10. Informação crítica deve manter fonte e estado de revisão visíveis.
11. Uma oportunidade pode conter simultaneamente dados confirmados, incompletos, desactualizados ou em conflito.
12. A mesma oportunidade não pode aparecer duplicada no plano do mesmo estudante.
13. O plano contém uma checklist personalizada baseada no perfil e na informação conhecida da oportunidade.
14. O estado da tarefa é separado do estado da informação que lhe deu origem.
15. A Rumo não submete candidaturas em nome do estudante no MVP.
16. O Dashboard é a entrada principal para utilizadores que concluíram a análise inicial.
17. Um utilizador com onboarding incompleto deve retomá-lo.
18. Alterações ao perfil podem exigir nova análise.
19. A implementação de produção permanece bloqueada até aprovação do design visual, protótipo e testes.

## 5. Princípios conceptuais fechados

### 5.1 Program != Opportunity

`Program` representa a identidade e características relativamente persistentes de uma oferta académica.

`Opportunity` representa uma possibilidade concreta e contextualizada de acesso, participação, financiamento ou progressão, válida num determinado contexto temporal e com condições próprias relevantes para o estudante.

```text
Program
Engenharia Informática — IST

Opportunity
Candidatura internacional 2027/2028
```

Uma `Opportunity` não depende obrigatoriamente de `Program`: bolsas, estágios e intercâmbios podem existir independentemente.

### 5.2 Opportunity: núcleo comum pequeno + detalhes por tipo

Evitar uma entidade conceptual gigante com dezenas de campos opcionais.

Núcleo comum candidato:

- identidade;
- natureza/tipo principal;
- título;
- contexto temporal;
- público/aplicabilidade;
- organizações e respectivos papéis;
- períodos/prazos;
- requisitos efectivos no contexto;
- proveniência e estado da informação.

Detalhes específicos:

- **admission:** programa, via, propina, vagas;
- **funding:** cobertura, valor, condições de atribuição;
- **internship:** duração, remuneração, modalidade;
- **exchange:** instituições envolvidas, duração, mobilidade/créditos quando aplicável.

A estratégia de persistência permanece aberta.

### 5.3 Organization substitui Institution como conceito-base

Uma oportunidade pode envolver universidade, fundação, empresa, governo, agência ou outra organização.

O que a organização **é** não determina o papel que desempenha numa oportunidade.

Papéis iniciais úteis no domínio da Opportunity:

```text
provider
funder
host
```

`publisher` pertence primariamente à relação `Organization -> Source`, não à `Opportunity`.

Papéis adicionais só devem surgir de casos reais.

### 5.4 Requisitos são efectivos no contexto, não “propriedade exclusiva” da Opportunity

A Opportunity deve apresentar o conjunto efectivo conhecido de requisitos aplicáveis ao seu ciclo/contexto.

Esses requisitos podem ter origem ou aplicabilidade definida em:

- Program;
- Opportunity;
- via de admissão;
- FundingOpportunity;
- país/jurisdição;
- outro contexto relevante.

Evitar linguagem de “herança” nesta fase: mecanismo de composição, precedência, overrides ou resolução fica aberto para a fase técnica seguinte.

### 5.5 Requirement != RequirementAssessment != ApplicationTask

```text
Requirement
= o que é exigido no contexto da oportunidade

RequirementAssessment
= o que sabemos sobre a relação entre perfil e requisito

ApplicationTask
= o que o estudante deve fazer a seguir
```

Concluir uma tarefa não confirma um requisito; avaliar um requisito não altera a definição oficial desse requisito.

### 5.6 Source != Evidence != Verification != Freshness

```text
Source
= origem/documento/página/publicador

Evidence
= referência concreta que sustenta determinada informação

Verification
= resultado do processo de revisão da informação

Freshness
= actualidade/necessidade de nova revisão
```

Para informação crítica publicada, `Claim/InformationItem` é conceito obrigatório de produto, ainda que a sua representação técnica permaneça aberta.

### 5.7 Publication, Verification, Freshness e Lifecycle são eixos distintos

Não misturar estados como `draft`, `confirmed`, `stale` e `closed` num único enum conceptual.

Exemplo de separação:

```text
Publication
- draft
- published

Verification
- needs_review
- confirmed
- conflicting

Freshness
- current
- needs_refresh

Opportunity lifecycle
- upcoming/open/closed/archived/withdrawn conforme política final
```

Os nomes finais ficam para modelação técnica; a separação semântica é obrigatória.

### 5.8 Compatibilidade não é elegibilidade

`ProfileAnalysis` e `CompatibilityAssessment` são artefactos explicativos baseados na informação conhecida.

Não representam:

- elegibilidade oficial;
- probabilidade de admissão;
- probabilidade de bolsa;
- probabilidade de visto;
- garantia de financiamento.

### 5.9 Dados académicos são preservados na representação original

```text
Dado académico original
!= interpretação/equivalência derivada
!= reconhecimento oficial
```

Notas e qualificações mantêm escala, nome e contexto originais. Conversões futuras são derivadas, rastreáveis e nunca substituem silenciosamente o dado original.

### 5.10 Checklist não é projecção 1:1 dos requisitos

Nem todo Requirement gera uma ApplicationTask e uma task pode derivar de prazo, documento, conflito a confirmar ou outra informação operacional.

Checklist é orientação personalizada e rastreável.

### 5.11 Modelo global sem Angola/Portugal como regra universal

Não assumir universalmente:

- escala 0–20;
- 12.ª/13.ª classe;
- ano académico europeu;
- uma moeda;
- um modelo de admissão;
- uma nacionalidade por utilizador;
- uma localização por oportunidade;
- um sistema de ensino secundário.

## 6. Entidades candidatas do núcleo

### 6.1 StudentProfile

Informação mínima necessária à análise, descoberta e planeamento.

### 6.2 AcademicRecord

Percurso/qualificação/resultados no contexto original. Campos obrigatórios devem depender do tipo e estado do percurso; não existe uma lista universal rígida.

### 6.3 LanguageCapability

Capacidade linguística declarada e eventual evidência. `B2 declarado` não equivale a `prova aceite pela Opportunity`.

### 6.4 StudyPreference

Nível pretendido, áreas, destinos e horizonte de entrada.

### 6.5 FinancialProfile

Minimalista por defeito. Para o MVP, a descoberta deve conseguir trabalhar preferencialmente com:

- faixa de orçamento;
- moeda;
- se o orçamento cobre propina e/ou custo de vida;
- necessidade de financiamento;
- possibilidade de “não sei”.

Não recolher fonte/estabilidade de apoio, salário, património ou prova de fundos sem função concreta que o exija.

### 6.6 Organization

Organização relevante para programa, oportunidade ou fonte.

### 6.7 Program

Oferta académica relativamente persistente de uma organização educacional.

### 6.8 Opportunity

Possibilidade concreta e contextualizada relevante para o percurso do estudante.

Tipos candidatos actuais:

- Admission;
- Funding;
- Internship;
- Exchange.

### 6.9 Requirement

Condição aplicável ao acesso, candidatura, participação ou atribuição.

Taxonomia mínima recomendada:

- academic;
- language;
- document;
- legal/identity;
- financial-proof;
- portfolio;
- test/exam;
- experience;
- application-process;
- other.

Não misturar papel do requisito com aplicabilidade:

```text
RequirementRole
- minimum
- supporting

Applicability
- always
- conditional
```

Um requisito pode ser simultaneamente `minimum` e `conditional`.

### 6.10 RequiredDocument

Documento/categoria documental solicitada. Não implica armazenamento do ficheiro pela Rumo. A relação com Requirement não assume 1:1.

### 6.11 ApplicationWindow

Períodos/datas operacionais: abertura, fecho, rondas, prioridade, rolling admissions, etc.

### 6.12 Source

Origem da informação. Pode preservar referência/URL, tipo, publicador quando conhecido, `observedAt`, idioma e escopo.

### 6.13 Verification

Estado da revisão de determinada claim; separado de freshness, publicação e lifecycle.

### 6.14 ProfileAnalysis

Interpretação global do perfil actual.

### 6.15 CompatibilityAssessment

Explicação da relação `StudentProfile <-> Opportunity`.

### 6.16 RequirementAssessment

A avaliação e a qualidade dos inputs não devem ser fundidas num único estado.

Semântica recomendada:

```text
Assessment
- met
- appears_met
- gap_detected
- unknown
- not_applicable

EvidenceState
- sufficient
- insufficient
- missing

InputQuality
- consistent
- conflicting
```

Não implica que estes três eixos virem exactamente três enums físicos; apenas não podem ser semanticamente confundidos.

### 6.17 ApplicationPlan

Contexto de planeamento das oportunidades perseguidas.

### 6.18 PlanOpportunity

Relação estudante/plano/oportunidade; mantém estado específico do estudante e impede duplicação da mesma oportunidade no mesmo plano.

### 6.19 ApplicationTask

Acção da checklist.

Estados funcionais confirmados:

- Por fazer;
- Em curso;
- Concluído.

O histórico de conclusão nunca deve ser destruído. Se a informação de origem mudar, a tarefa pode exigir revisão ou ser substituída por nova tarefa sem falsificar o passado.

## 7. Conceitos auxiliares

Não são automaticamente entidades físicas.

### Claim / InformationItem

Unidade conceptual para atributos críticos publicados.

Cada claim crítica deve **preservar acesso** a valor/texto observado, fonte/evidência, data de observação, verification, freshness e conflito quando aplicável. Isto é um invariante de produto, não uma instrução de armazenamento.

Claims críticas do MVP incluem, quando aplicáveis:

- prazo/janela;
- propina;
- requisito;
- documento aceite/exigido;
- vaga/limite;
- benefício financeiro.

### Evidence

Referência concreta dentro de uma Source.

### Freshness

Avaliação de actualidade. Pode ser revista por gatilhos:

- temporais;
- mudança detectada na fonte;
- novo ciclo/contexto;
- aproximação de prazo;
- alteração relevante na Opportunity.

### OpportunityRelationship

Relações estruturais iniciais que podem ser úteis:

```text
financially_supports
requires
part_of
```

`requires` e `part_of` não devem ser fundidos.

`alternative_to` não é relação estrutural por defeito; na maioria dos casos é derivada pela discovery relativamente ao perfil/preferências do estudante.

### FundingScope

Uma FundingOpportunity pode aplicar-se a Opportunity, Program, Organization, área, nível ou outro conjunto. Não criar motor genérico de scopes nesta fase.

### SelectionCriterion

Critério competitivo é distinto de requisito mínimo. Não entra como entidade obrigatória enquanto o fluxo não exigir.

## 8. FundingOpportunity e informação financeira

Criar `FundingOpportunity` quando o apoio tem identidade própria e condições/regras relevantes, cobertura/valor próprios, fonte/organização própria ou aplicação a mais de uma oportunidade/programa.

Caso contrário, tratar como informação financeira/benefício da Opportunity relevante.

Exemplos normalmente não independentes:

- propina;
- taxa de candidatura;
- desconto simples;
- remuneração de estágio;
- custo de alojamento.

Princípios:

- `amount` != `coverage`;
- preservar moeda original;
- financiamento potencial != financiamento obtido;
- relações podem ser N:N;
- relação de financiamento != elegibilidade;
- associações podem precisar indicar o que é efectivamente coberto.

## 9. Relações candidatas

```text
Student
└── StudentProfile
    ├── AcademicRecord[]
    ├── LanguageCapability[]
    ├── StudyPreference
    └── FinancialProfile

Organization
├── Program[]
├── Opportunity[] via provider/funder/host
└── Source[] via publisher quando aplicável

Program
└── AdmissionOpportunity[] quando aplicável

Opportunity
├── ApplicationWindow[]
├── requisitos efectivos no contexto
├── RequiredDocument[]
├── organizações + papéis
├── detalhes específicos do tipo
└── claims críticas
    ├── Source[]
    ├── Evidence?
    ├── Verification
    └── Freshness

StudentProfile
├── ProfileAnalysis
└── CompatibilityAssessment[] ── Opportunity
    └── RequirementAssessment[] ── Requirement

Student
└── ApplicationPlan
    └── PlanOpportunity[] ── Opportunity
        └── ApplicationTask[]
```

## 10. Proveniência, revisão, actualidade e histórico

Nenhuma informação institucional crítica deve perder a ligação à fonte/contexto que a sustenta.

Evitar um estado global do tipo:

```text
Opportunity.verificationStatus = VERIFIED
```

Uma mesma Opportunity pode ter simultaneamente:

```text
Propina       -> confirmed/current
Prazo         -> confirmed/needs_refresh
Vagas         -> needs_review
Documento X   -> partial/missing evidence
Requisito Y   -> conflicting
```

### Definição de “verificado”

> Significa que a Rumo reviu evidência adequada numa fonte identificável para aquela informação e contexto. Não significa garantia de permanência, elegibilidade ou decisão oficial.

### Workflow conceptual

Automação pode recolher/sugerir informação, mas não promove sozinha uma claim crítica para `confirmed`. Confirmação exige revisão humana no MVP.

Edição, verificação e publicação são acções semanticamente distintas, mesmo que a mesma pessoa as desempenhe no piloto.

### Conflitos

Quando fontes relevantes entram em conflito:

- preservar as evidências;
- não escolher silenciosamente;
- não produzir avaliação/tarefa dependente de um valor definitivo;
- pode gerar tarefa explícita de confirmação, por exemplo “Confirmar o prazo com a instituição”.

### Histórico

Claims críticas publicadas não devem ser sobrescritas destrutivamente. O sistema futuro deve conseguir explicar o que mudou, quando, com base em que fonte e através de que revisão.

A técnica física de histórico permanece aberta.

## 11. Perfil académico internacional

Preservar:

- sistema/contexto educacional;
- nome original da qualificação;
- estado da formação;
- resultados na escala original;
- instituição relevante;
- período quando disponível.

Campos obrigatórios são condicionais ao percurso.

Exemplos:

- `expectedCompletionYear` só se aplica quando ainda há conclusão futura;
- `area/course` não deve ser universalmente obrigatório quando o sistema de ensino não usa essa estrutura.

Equivalências futuras são derivadas e rastreáveis; nunca assumir reconhecimento oficial sem base apropriada.

## 12. Compatibilidade e análise

### ProfileAnalysis

Analisa o estudante isoladamente.

### CompatibilityAssessment

Analisa a relação `StudentProfile <-> Opportunity`.

Pode conter:

- alinhamentos;
- gaps;
- desconhecidos;
- RequirementAssessments;
- limitações da análise.

Princípios:

- sem probabilidades de admissão sem base metodológica real;
- bolsa disponível não é dinheiro garantido;
- ausência de dados não remove automaticamente a oportunidade;
- ausência de evidência pode resultar em `unknown`;
- alterações no perfil/Opportunity podem tornar artefactos derivados desactualizados;
- artefactos afectados devem ser marcados para revisão, não apagados automaticamente.

Artefactos potencialmente afectados:

- CompatibilityAssessment;
- RequirementAssessment;
- explicações de matching;
- checklist candidata;
- recomendações de financiamento;
- alertas de prazo.

## 13. ApplicationPlan e checklist

`PlanOpportunity` mantém estado específico do estudante, nunca na `Opportunity` global.

A checklist é orientação personalizada e não relação 1:1 com Requirement.

Quando origem muda:

- preservar histórico da task;
- permitir `needs_review` ou nova tarefa conceptual;
- não transformar retroactivamente “Concluído” em “nunca concluído”.

## 14. Deduplicação editorial

A identidade canónica da Opportunity deve ser interna/editorial.

Sinais úteis para matching:

- tipo;
- organização e papel;
- Program quando aplicável;
- público/via;
- ciclo/contexto temporal;
- localização relevante;
- janela temporal.

Esses sinais **não são a identidade por si só**.

Matching pode ser assistido, mas fusão ambígua exige revisão humana. Não deduplicar apenas por título ou semelhança textual.

## 15. Lifecycle, publicação e localização

Opportunities encerradas podem permanecer no catálogo para histórico, plano do estudante e auditoria, mas ficam fora da discovery padrão quando não são accionáveis.

Publication metadata pertence à representação editorial da Rumo, não à realidade externa da Opportunity.

Localização deve ser opcional e contextual. Separar:

- nacionalidade;
- residência;
- país/sistema onde estudou;
- localização da organização;
- destino de estudo;
- localização física;
- remoto/multilocal.

Nenhuma dessas dimensões deve ser inferida automaticamente da outra.

## 16. Contratos conceptuais propostos

Não são APIs nem DTOs finais.

### AnalyseProfile

Entrada: perfil actual + origem/certeza relevante.

Saída: pontos fortes, limitações, lacunas, desconhecidos e orientação.

### DiscoverOpportunities

Entrada: perfil, preferências, filtros, horizonte temporal, restrições financeiras e contexto linguístico/geográfico relevante.

Saída: oportunidades potencialmente relevantes + explicação de compatibilidade + incertezas + contexto de revisão/actualidade.

### GetOpportunityDetails

Saída conceptual: Opportunity, detalhes por tipo, Program quando aplicável, organizações/papéis, requisitos efectivos, documentos, finanças, períodos, fontes, verification/freshness e explicação de compatibilidade.

### AddOpportunityToPlan

Não duplica a mesma Opportunity no plano do mesmo estudante.

Saída: associação existente/criada + checklist candidata + incertezas preservadas.

### UpdateApplicationTask

Altera apenas a task do plano. Não altera implicitamente Requirement, Verification ou Opportunity.

## 17. Permissões conceptuais

### Estudante

- próprio perfil;
- oportunidades publicadas;
- informação de fonte/revisão apresentada;
- próprio plano;
- próprias tasks.

### Operação de conteúdo

- manter organizações, programas, oportunidades e informação editorial;
- associar fontes/evidência;
- rever claims;
- publicar conteúdo conforme workflow aprovado.

### Sistema

- produzir análise explicativa;
- produzir compatibilidade explicável;
- sugerir checklist;
- nunca promover automaticamente incerteza para confirmação.

Princípio transversal: acesso mínimo necessário.

## 18. Privacidade e sensibilidade

Dados e inferências sensíveis:

- histórico/resultados académicos;
- capacidade financeira;
- dados de conta/contacto;
- evidências linguísticas;
- conteúdo livre;
- inferências sobre limitações académicas/financeiras.

Princípios:

- minimização de dados;
- preferir faixas/aproximações quando suficientes;
- não enviar dados sensíveis para analytics genéricos sem aprovação;
- não assumir upload documental;
- distinguir autodeclarado de verificado;
- proteger também inferências derivadas.

Retenção, consentimento, base aplicável e regras finais de acesso ficam para decisão apropriada antes de produção.

## 19. Riscos prioritários

1. Compatibilidade confundida com elegibilidade.
2. Modelo global contaminado por pressupostos Angola/Portugal.
3. Opportunity transformar-se em contentor genérico.
4. Requirement transformar-se em contentor genérico de informação.
5. Estados semanticamente diferentes misturados num único eixo.
6. Verification criar falsa certeza.
7. Perda de proveniência.
8. Informação desactualizada.
9. Checklist desactualizada após mudança da origem.
10. Financiamento potencial tratado como garantido.
11. Recolha excessiva de dados.
12. Equivalência académica inferida sem autoridade.
13. Fontes oficiais contraditórias.
14. Rules engine prematuro.
15. Mecanismo de “herança” de requisitos fechado antes da necessidade real.
16. Papéis de Organization simplificados em excesso.
17. Deduplicação automática incorrecta.
18. Link rot/desaparecimento de fontes.
19. Conteúdo draft/internal exposto ao estudante.
20. Estado histórico do estudante perdido após mudança de requisitos.

## 20. Deliberadamente aberto para a próxima fase

- estratégia de persistência de Opportunity e detalhes por tipo;
- mecanismo técnico de requisitos contextuais e resolução/precedência;
- estratégia física de revision history/versionamento;
- estados/enums finais;
- regras formais AND/OR;
- motor real de elegibilidade;
- matching/ranking;
- conversão de notas;
- RBAC/autenticação/RLS;
- APIs/DTOs;
- ingestion/scraping;
- modelos de IA;
- arquitectura de produção;
- taxonomias que dependam de dados reais adicionais.

## 21. Fora do âmbito da #17

Não decidir aqui:

- PostgreSQL/schema/tabelas/FKs/indexes;
- migrations;
- Supabase/RLS;
- REST vs GraphQL;
- URLs de endpoints;
- DTOs finais;
- JWT/provider de autenticação;
- JSONB vs normalização;
- herança física de tabelas;
- cron jobs;
- scraping pipeline;
- event sourcing;
- algoritmo de elegibilidade;
- algoritmo de conversão de notas;
- pesos de ranking;
- arquitectura de produção.

## 22. Modelo conceptual mínimo consolidado

```text
Student
└── StudentProfile
    ├── AcademicRecord[]
    ├── LanguageCapability[]
    ├── StudyPreference
    └── FinancialProfile

StudentProfile
├── ProfileAnalysis
└── CompatibilityAssessment[] ── Opportunity
    └── RequirementAssessment[] ── Requirement

Organization
├── Program[]
├── Opportunity[] via provider/funder/host
└── Source[] via publisher

Program
└── AdmissionOpportunity[] quando aplicável

Opportunity
├── common core
├── typed details
├── Organization relations
├── ApplicationWindow[]
├── effective contextual requirements
├── RequiredDocument[]
└── critical claims
    ├── Source[]
    ├── Evidence?
    ├── Verification
    └── Freshness

Student
└── ApplicationPlan
    └── PlanOpportunity[] ── Opportunity
        └── ApplicationTask[]
```

Conceitos auxiliares:

```text
Claim / InformationItem
Evidence
Freshness
OpportunityRelationship
FundingScope
SelectionCriterion
PublicationMetadata
```

## 23. Separações conceptuais críticas

```text
Program != Opportunity
Requirement != RequirementAssessment != ApplicationTask
Source != Evidence != Verification != Freshness
Verification != Publication != Lifecycle
Assessment != EvidenceState != InputQuality
RequirementRole != Applicability
ProfileAnalysis != CompatibilityAssessment
Organization classification != Organization role
Opportunity lifecycle != Information freshness
Funding availability != Funding obtained
Original academic data != Derived equivalence != Official recognition
Historical task completion != Current requirement satisfaction
```

## 24. Critério de saída da #17

A descoberta conceptual está suficientemente fechada quando Produto e Backend aceitam estas separações e limites, sem reabrir persistência ou arquitectura.

A fase seguinte pode então tratar, em decisões técnicas específicas:

1. requisitos contextuais e resolução efectiva;
2. claims críticos, revisão e histórico;
3. persistência dos tipos de Opportunity.

Essas decisões não devem reabrir as separações fundamentais documentadas aqui.