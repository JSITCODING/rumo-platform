# Rumo — Descoberta técnica de backend do MVP

## Estado do documento

- **Issue:** #17 — `[Research][Backend] Documentar descoberta técnica do MVP`
- **Estado:** Em progresso — descoberta consolidada para revisão
- **Ecrã afectado:** Transversal — S01–S08
- **Natureza:** investigação e documentação; não autoriza implementação
- **Piloto:** Angola
- **Expansão prevista:** internacional, sem hardcode geográfico no modelo conceptual

## 1. Objectivo

Reduzir a incerteza técnica do MVP antes da implementação, descrevendo apenas o domínio necessário ao fluxo aprovado.

Este documento **não** define esquema de base de dados, tabelas, migrations, endpoints, DTOs finais, serviços, autenticação, stack, regras reais de elegibilidade, algoritmos de matching ou arquitectura de produção.

O piloto operacional da Rumo é Angola. O domínio deve, contudo, evitar pressupostos que impeçam futura expansão para estudantes, instituições e oportunidades de outros países.

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

## 3. Convenções deste documento

### Facto

Comportamento confirmado pelo fluxo aprovado, decisões já aceites ou pela própria issue.

### Hipótese / recomendação

Conclusão técnica destinada a reduzir risco. Não constitui decisão de implementação.

### Questão em aberto

Ponto que exige validação de Produto/Backend ou dados reais antes de ser fechado.

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
10. Informação crítica deve manter fonte e estado de verificação visíveis.
11. Uma oportunidade pode conter simultaneamente dados confirmados, incompletos e por verificar.
12. A mesma oportunidade não pode aparecer duplicada no plano do mesmo estudante.
13. O plano contém uma checklist personalizada baseada no perfil e na informação conhecida da oportunidade.
14. O estado da tarefa é separado do estado de verificação da informação.
15. A Rumo não submete candidaturas em nome do estudante no MVP.
16. O Dashboard é a entrada principal para utilizadores que concluíram a análise inicial.
17. Um utilizador com onboarding incompleto deve retomá-lo.
18. Alterações ao perfil podem provocar nova análise.
19. A implementação de produção permanece bloqueada até aprovação do design visual, protótipo e testes.

## 5. Princípios conceptuais recomendados

### H1 — Program e Opportunity são conceitos diferentes

`Program` representa a identidade e características relativamente persistentes de uma oferta académica.

`Opportunity` representa uma possibilidade concreta e contextualizada de acesso, participação, financiamento ou progressão, válida num determinado contexto temporal e com condições próprias relevantes para o estudante.

Exemplo:

```text
Program
Engenharia Informática — IST

Opportunity
Candidatura internacional 2027/2028
```

Uma `Opportunity` não deve depender obrigatoriamente de `Program`, porque bolsas, estágios e intercâmbios podem existir independentemente.

### H2 — Opportunity deve ter núcleo comum e detalhes específicos por tipo

Evitar uma entidade conceptual gigante com dezenas de campos opcionais.

Núcleo comum candidato:

- identidade;
- natureza/tipo principal;
- título;
- contexto temporal;
- público/aplicabilidade;
- organizações e papéis;
- períodos/prazos;
- requisitos;
- proveniência e estado da informação.

Detalhes específicos candidatos:

- admissão: programa, via, propina, vagas;
- financiamento: cobertura, valor, condições de atribuição;
- estágio: duração, remuneração, modalidade;
- intercâmbio: instituições envolvidas, duração, mobilidade/créditos quando aplicável.

A estratégia técnica de persistência destes tipos fica fora desta issue.

### H3 — Organization é conceito-base mais geral que Institution

Uma oportunidade pode envolver universidade, fundação, empresa, governo, agência ou outra entidade.

O que uma organização **é** não deve ser confundido com o papel que desempenha numa oportunidade.

Exemplo conceptual:

```text
Organization A -> PROVIDER
Organization B -> FUNDER
Organization C -> HOST
```

A taxonomia de papéis só deve ser criada a partir de casos reais do MVP.

### H4 — Requirement, RequirementAssessment e ApplicationTask são conceitos distintos

```text
Requirement
= o que a oportunidade exige

RequirementAssessment
= o que se sabe sobre a relação entre o estudante e essa exigência

ApplicationTask
= o que o estudante deve fazer a seguir
```

Concluir uma tarefa não confirma um requisito, e avaliar um requisito não altera a definição oficial desse requisito.

### H5 — Source, Evidence, Verification e Freshness são conceitos distintos

```text
Source
= origem/publicador

Evidence
= referência concreta que sustenta determinada informação

Verification
= estado do processo de revisão da informação

Freshness
= actualidade/necessidade de revisão
```

`Evidence`, `Freshness` e `InformationItem/Claim` são conceitos auxiliares candidatos; não são automaticamente entidades técnicas.

### H6 — Compatibilidade não é elegibilidade

`ProfileAnalysis` e `CompatibilityAssessment` devem ser artefactos explicativos, baseados apenas em informação conhecida e preservando lacunas e incertezas.

Não devem representar:

- decisão oficial de elegibilidade;
- probabilidade de admissão;
- probabilidade de bolsa;
- probabilidade de visto;
- garantia de financiamento.

### H7 — Preservar dados académicos na representação original

Qualificações, resultados e escalas devem ser preservados no contexto original.

```text
Dado académico original
!= interpretação/equivalência
!= reconhecimento oficial
```

Conversões ou equivalências futuras devem ser derivadas, rastreáveis e nunca substituir silenciosamente o valor original.

### H8 — Evitar herança automática de requisitos no MVP

Mesmo quando um requisito tem origem num programa, regulamento ou via, a oportunidade concreta deve apresentar o conjunto efectivo conhecido de requisitos aplicáveis ao seu contexto.

Evitar comportamento invisível do tipo `Program -> herda automaticamente -> Opportunity` antes de existir necessidade real e regras de precedência aprovadas.

### H9 — Checklist é derivada, mas não é projecção 1:1 dos requisitos

Nem todo requisito gera uma tarefa e uma tarefa pode derivar de um prazo ou outra informação operacional.

Checklist deve ser tratada como orientação personalizada e rastreável.

### H10 — O modelo deve permitir expansão geográfica sem transformar Angola/Portugal em regras universais

Não assumir como universais:

- escala de notas 0–20;
- 12.ª/13.ª classe;
- ano académico europeu;
- uma moeda;
- um único modelo de admissão;
- uma nacionalidade por utilizador;
- uma única localização por oportunidade;
- um único sistema de ensino secundário.

## 6. Entidades candidatas do núcleo

Estas são entidades conceptuais. Não correspondem obrigatoriamente a tabelas.

### 6.1 StudentProfile

Informação do estudante necessária à análise, descoberta e planeamento.

Áreas candidatas:

- situação académica;
- histórico/resultados;
- nível pretendido;
- áreas de estudo;
- destinos;
- capacidades linguísticas;
- capacidade financeira aproximada;
- necessidade/preferência de financiamento;
- horizonte de entrada;
- origem/certeza dos dados quando relevante.

### 6.2 AcademicRecord

Representa percurso, qualificação, resultados ou informação académica original do estudante.

Deve permitir distinguir, conceptualmente, situações como:

- em curso;
- concluído;
- resultados parciais;
- qualificação obtida.

Não assume equivalência estrangeira automática.

### 6.3 LanguageCapability

Representa capacidade linguística declarada e eventual evidência.

`"falo inglês B2"` não equivale a `"a universidade aceita a minha evidência de inglês"`.

A aceitação pertence à avaliação do requisito da oportunidade.

### 6.4 StudyPreference

Representa nível pretendido, áreas, destinos e horizonte de entrada.

### 6.5 FinancialProfile

Representa apenas a informação financeira necessária ao fluxo aprovado, preferindo granularidade aproximada quando precisão adicional não altera a experiência.

`budget`, `income`, `assets` e `proof of funds` não devem ser tratados como sinónimos.

A unidade exacta de capacidade financeira permanece aberta.

### 6.6 Organization

Representa uma organização participante do domínio: instituição de ensino, fundação, empresa, organismo público ou outra organização relevante.

A classificação descritiva não determina o papel contextual da organização.

### 6.7 Program

Representa uma oferta académica relativamente persistente de uma organização educacional.

Pode conter identidade e características académicas relativamente estáveis.

Dados voláteis por ciclo, como prazos, vagas ou condições específicas de candidatura, pertencem ao contexto da `Opportunity`.

### 6.8 Opportunity

Representa uma possibilidade concreta e contextualizada relevante para o percurso do estudante.

Tipos candidatos do MVP/domínio actual:

- Admission;
- Funding;
- Internship;
- Exchange.

Uma `AdmissionOpportunity` pode referenciar um `Program`; outros tipos não são obrigados a fazê-lo.

### 6.9 Requirement

Representa uma condição que deve ser satisfeita, demonstrada ou considerada para acesso, candidatura, participação ou atribuição de uma oportunidade.

Não deve ser contentor genérico para qualquer informação.

Um prazo, custo ou simples descrição não é automaticamente um `Requirement`.

### 6.10 RequiredDocument

Representa um documento ou categoria documental solicitada pela oportunidade.

Não implica que a Rumo armazene o ficheiro do estudante.

A relação `Requirement <-> RequiredDocument` não deve assumir cardinalidade 1:1.

### 6.11 ApplicationWindow

Representa períodos e datas operacionais relevantes da candidatura.

O domínio não deve assumir uma única `deadline`; podem existir abertura, fecho, rondas, prioridade ou candidaturas contínuas.

### 6.12 Source

Representa origem/documento/página/publicador da informação.

Propriedades conceptuais candidatas:

- referência/URL;
- tipo de fonte;
- organização publicadora quando conhecida;
- data de consulta (`observedAt`);
- idioma;
- contexto/escopo.

A existência de uma URL não é suficiente para considerar informação confirmada.

### 6.13 Verification

Representa o estado do processo de revisão de determinada informação.

Deve ser capaz, conceptualmente, de distinguir situações como:

- ainda não revista;
- confirmada na fonte disponível;
- necessita revisão;
- fontes divergentes.

Os estados finais e o processo operacional permanecem abertos.

### 6.14 ProfileAnalysis

Interpretação global do perfil actual do estudante.

Pode conter:

- pontos fortes;
- limitações;
- lacunas;
- informação desconhecida;
- orientação para descoberta.

Não representa decisão de admissão.

### 6.15 CompatibilityAssessment

Explicação da relação entre determinado perfil e determinada oportunidade.

Deve preservar:

- razões de alinhamento;
- possíveis gaps;
- desconhecidos;
- limitações;
- contexto de verificação relevante.

### 6.16 RequirementAssessment

Representa a interpretação da relação entre um perfil e um requisito.

Ausência de dados não deve ser convertida automaticamente em incumprimento.

Estados exactos permanecem abertos; evitar semântica enganadora de `PASS/FAIL` enquanto não existir base suficiente.

### 6.17 ApplicationPlan

Representa o contexto de planeamento de candidaturas do estudante no MVP.

Não fica decidido nesta issue se haverá um ou vários planos no futuro.

### 6.18 PlanOpportunity

Associação entre o plano e uma oportunidade perseguida pelo estudante.

Regra funcional confirmada:

> A mesma oportunidade não pode aparecer duplicada no plano do mesmo estudante.

Estado pessoal de candidatura deve pertencer a esta relação, não à `Opportunity` global.

### 6.19 ApplicationTask

Representa uma acção da checklist do estudante.

Estados funcionais confirmados:

- Por fazer;
- Em curso;
- Concluído.

Pode ser sugerida a partir de requisito, prazo ou outra informação operacional conhecida.

## 7. Conceitos auxiliares que não devem ser promovidos automaticamente a entidades

### Evidence

Referência concreta dentro de uma fonte que sustenta determinada informação.

### Freshness

Actualidade da informação ou necessidade de nova revisão.

`Freshness` é diferente do lifecycle da oportunidade: uma oportunidade encerrada pode estar correctamente documentada e não estar stale.

### InformationItem / Claim

Conceito útil para discutir granularidade de proveniência e verificação.

Não fica decidido que cada campo do domínio se transforme numa entidade genérica.

### OpportunityRelationship

Uma oportunidade pode relacionar-se com outra, por exemplo uma bolsa que financia uma admissão.

A taxonomia e implementação destas relações permanecem abertas.

### FundingScope

Uma bolsa pode aplicar-se a uma oportunidade, programa, organização, área, nível ou outro conjunto.

Não criar motor genérico de scopes nesta fase.

### SelectionCriterion

Critério competitivo de selecção é semanticamente diferente de requisito mínimo, mas não entra como entidade obrigatória enquanto o fluxo não exigir esse detalhe.

## 8. FundingOpportunity e informação financeira

### Recomendação

Uma `FundingOpportunity` deve existir quando o financiamento possui identidade e condições próprias de acesso, atribuição ou consideração suficientemente relevantes para o estudante.

Nem todo dado financeiro é uma oportunidade de financiamento.

Exemplos que normalmente permanecem informação financeira do contexto:

- propina;
- taxa de candidatura;
- remuneração de estágio;
- desconto simples;
- custo de alojamento.

Uma bolsa com candidatura própria é uma `FundingOpportunity` clara.

Uma bolsa de consideração automática pode continuar a ser uma `FundingOpportunity` se tiver identidade, público e condições próprias, mesmo sem candidatura independente.

### Regras conceptuais

- `amount` e `coverage` não são sinónimos;
- valores monetários devem preservar moeda original;
- financiamento potencial nunca deve ser tratado como dinheiro garantido;
- uma bolsa pode estar associada a várias oportunidades ou a um escopo mais amplo;
- relação de financiamento e requisito de elegibilidade são conceitos diferentes;
- bolsas podem ter regras de acumulação ou dependências próprias;
- associações futuras podem precisar indicar o que efectivamente é coberto.

`FundingOption` deixa de ser entidade principal por ser demasiado ambígua; o conceito é substituído por `FundingOpportunity` quando existe oportunidade independente e por informação financeira/benefício quando não existe.

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
  └── Opportunity[] via papéis contextuais

Program
  └── AdmissionOpportunity[] quando aplicável

Opportunity
  ├── ApplicationWindow[]
  ├── Requirement[]
  ├── RequiredDocument[]
  ├── organizações + papéis
  ├── detalhes específicos do tipo
  └── informação crítica
       ├── Source[]
       ├── Evidence?       (conceito auxiliar)
       ├── Verification
       └── Freshness?      (conceito auxiliar)

StudentProfile
  ├── ProfileAnalysis
  └── CompatibilityAssessment[] ── Opportunity
       └── RequirementAssessment[] ── Requirement

Student
  └── ApplicationPlan
       └── PlanOpportunity[] ── Opportunity
            └── ApplicationTask[]
```

## 10. Proveniência, verificação e actualidade

### Princípio

Nenhuma informação institucional crítica deve perder a ligação à fonte que a sustenta.

Evitar um único estado global:

```text
Opportunity.verificationStatus = VERIFIED
```

Uma mesma oportunidade pode ter:

```text
Propina       -> confirmada
Prazo         -> confirmado
Vagas         -> por verificar
Documento X   -> parcialmente conhecido
Requisito Y   -> fontes divergentes
```

### Definição recomendada para “verificado”

> “Verificado” significa que a Rumo encontrou e reviu evidência adequada numa fonte identificável para aquela informação e contexto. Não significa garantia de permanência, elegibilidade ou decisão oficial.

### Princípios

- verificação não equivale a verdade absoluta;
- `Verification` e `Freshness` são distintos;
- autoridade, escopo e actualidade da fonte importam;
- conflitos entre fontes devem poder permanecer visíveis;
- `observedAt` é operacionalmente importante;
- validade pode depender do ciclo/contexto;
- informação crítica alterada não deve assumir sobrescrita destrutiva como única estratégia futura;
- um resumo agregado para UI pode ser derivado da informação granular, sem substituir os estados originais.

### Riscos específicos

- link rot;
- fontes oficiais divergentes;
- fonte oficial mas desactualizada;
- página dinâmica sem data de publicação;
- perda de contexto temporal;
- considerar “oficial” como sinónimo de “correcto para este caso”.

## 11. Perfil académico internacional

### AcademicRecord

Preservar:

- sistema/contexto educacional;
- nome original da qualificação;
- estado da formação;
- resultados na escala original;
- instituição relevante;
- data/período quando disponível.

Uma nota não deve ser representada apenas como `value = 15` sem contexto de escala.

### Equivalências

Qualquer conversão deve ser derivada e rastreável.

Nunca assumir equivalência oficial sem base apropriada.

### LanguageCapability

Capacidade declarada e evidência aceite por uma oportunidade são coisas diferentes.

### FinancialProfile

A capacidade financeira é sensível e imprecisa. A granularidade deve ser mínima e suficiente ao fluxo aprovado.

Questões como orçamento anual, mensal, propina, custo total ou apoio familiar permanecem abertas.

## 12. Compatibilidade e análise

### ProfileAnalysis

Analisa o estudante isoladamente.

### CompatibilityAssessment

Analisa a relação `StudentProfile <-> Opportunity`.

Pode incluir:

- alinhamentos;
- possíveis gaps;
- desconhecidos;
- RequirementAssessments;
- limitações da própria análise.

### Princípios

- não produzir probabilidade de admissão sem base metodológica real;
- não tratar bolsa disponível como financiamento garantido;
- não retirar automaticamente oportunidades apenas porque faltam dados do estudante;
- ausência de evidência deve poder resultar em `unknown` e não em reprovação;
- alterações no perfil ou na oportunidade podem tornar análises anteriores obsoletas;
- artefactos derivados precisam ser reconhecidos como dependentes do estado da informação que lhes deu origem.

## 13. ApplicationPlan e checklist

### ApplicationPlan

Contexto de planeamento das oportunidades perseguidas pelo estudante.

### PlanOpportunity

Mantém estado específico do estudante sobre determinada oportunidade.

Não colocar estado pessoal como `APPLIED` na `Opportunity` global.

### ApplicationTask

A checklist é orientação personalizada.

Não existe relação obrigatória 1:1 entre `Requirement` e `ApplicationTask`.

Exemplo:

```text
Requirement
“Ter concluído o ensino secundário”

ApplicationTask
“Obter e preparar o certificado do ensino secundário”
```

Uma alteração posterior na oportunidade pode tornar tarefas derivadas desactualizadas. O sistema futuro deve poder sinalizar necessidade de revisão sem assumir reset automático da tarefa.

## 14. Contratos conceptuais propostos

Estes contratos são interfaces de domínio para discussão. **Não são APIs, endpoints ou DTOs finais.**

### 14.1 AnalyseProfile

**Entrada conceptual**

- perfil actual;
- origem/certeza dos dados quando relevante.

**Saída conceptual**

- pontos fortes;
- limitações;
- lacunas;
- informação desconhecida;
- orientação para descoberta.

### 14.2 DiscoverOpportunities

**Entrada conceptual**

- perfil;
- preferências;
- filtros explícitos;
- horizonte temporal;
- restrições financeiras relevantes;
- línguas/destinos quando aplicáveis.

**Saída conceptual**

- oportunidades potencialmente relevantes;
- resumo explicativo de compatibilidade;
- incertezas;
- contexto de verificação/actualidade relevante.

### 14.3 GetOpportunityDetails

**Entrada conceptual**

- identidade da oportunidade;
- contexto de perfil apenas quando necessário à explicação.

**Saída conceptual**

- núcleo da oportunidade;
- tipo/detalhes específicos;
- programa quando aplicável;
- organizações e papéis;
- requisitos;
- documentos;
- informação financeira;
- financiamento associado quando aplicável;
- períodos/prazos;
- fontes;
- verificação/actualidade;
- explicação de compatibilidade.

### 14.4 AddOpportunityToPlan

**Pré-condição conceptual**

- estudante autenticado;
- oportunidade conhecida.

**Regra**

- não duplicar a mesma oportunidade no plano do mesmo estudante.

**Saída conceptual**

- associação existente ou criada;
- checklist candidata;
- incertezas preservadas.

### 14.5 UpdateApplicationTask

**Entrada conceptual**

- tarefa pertencente ao plano do estudante;
- novo estado permitido.

**Saída conceptual**

- tarefa actualizada;
- nenhuma alteração implícita em `Requirement`, `Verification` ou `Opportunity`.

## 15. Permissões candidatas

Estas permissões são responsabilidades conceptuais, não RBAC real.

### Estudante

- consultar e alterar o próprio perfil;
- consultar oportunidades publicadas para descoberta;
- consultar informação de fonte/verificação apresentada;
- gerir o próprio plano;
- alterar estado das próprias tarefas.

### Operação de conteúdo / investigação

Hipótese futura:

- manter organizações, programas e oportunidades;
- manter requisitos/documentos/informação editorial;
- associar fontes/evidência;
- rever informação;
- registar contexto e data de revisão.

### Sistema

Hipótese futura:

- produzir análise explicativa;
- produzir compatibilidade explicável;
- sugerir checklist;
- nunca elevar automaticamente informação incerta a confirmada sem processo aprovado.

### Princípio transversal

Aplicar acesso mínimo necessário. Dados académicos/financeiros e inferências derivadas não devem ficar disponíveis a actores internos sem necessidade funcional.

Editar, verificar e publicar conteúdo podem vir a ser responsabilidades distintas; a segregação exacta permanece aberta.

## 16. Privacidade e sensibilidade

### Dados particularmente sensíveis

- histórico e resultados académicos;
- capacidade financeira;
- dados de conta/contacto;
- evidências linguísticas;
- conteúdo livre;
- inferências derivadas sobre limitações académicas ou financeiras.

### Princípios

- recolher apenas informação necessária à finalidade aprovada;
- preferir dados aproximados quando precisão adicional não melhora o fluxo;
- não enviar resultados académicos, capacidade financeira ou conteúdo sensível para analytics genéricos sem aprovação explícita;
- uploads documentais não devem ser assumidos sem necessidade funcional e política apropriada;
- dado autodeclarado e dado verificado não devem ser confundidos.

### Riscos

- recolha excessiva no onboarding;
- retenção indefinida;
- acesso interno excessivo;
- analytics com dados sensíveis;
- exposição de inferências sensíveis;
- futura reutilização de dados fora da finalidade original.

Retenção, consentimento, base aplicável e regras finais de acesso permanecem por definir.

## 17. Internacionalização do domínio

Separar explicitamente:

- nacionalidade;
- residência;
- país/sistema onde estudou;
- localização da organização;
- destino da oportunidade;
- localização física da oportunidade.

Uma dimensão não deve ser inferida automaticamente da outra.

O domínio deve permitir oportunidades remotas, múltiplas localizações e contextos temporais que não usem ano académico europeu.

## 18. Riscos técnicos e de produto prioritários

### R1 — Compatibilidade confundida com elegibilidade

**Impacto:** alto.

Mitigação conceptual: análise explicativa, nunca previsão de admissão.

### R2 — Modelo global contaminado por pressupostos Angola/Portugal

**Impacto:** alto.

Mitigação: preservar sistemas, moedas, qualificações e escalas no contexto original.

### R3 — Opportunity transformar-se em entidade genérica sem semântica

**Impacto:** alto.

Mitigação: núcleo comum pequeno + detalhes específicos por tipo.

### R4 — Requirement transformar-se em contentor genérico de informação

**Impacto:** alto.

Mitigação: requisito representa condição; documentos, prazos, custos e critérios competitivos mantêm semântica própria.

### R5 — Verification criar falsa certeza

**Impacto:** alto.

Mitigação: verificação granular, contexto temporal, conflito de fontes e actualidade separados.

### R6 — Perda de proveniência

**Impacto:** alto.

Mitigação: informação institucional crítica preserva fonte/contexto de revisão.

### R7 — Informação stale

**Impacto:** alto.

Mitigação: separar verification/freshness e prever processo futuro de revisão.

### R8 — Checklist stale após alteração da oportunidade

**Impacto:** médio/alto.

Mitigação: tarefas derivadas podem requerer revisão quando a informação de origem muda.

### R9 — Financiamento potencial tratado como garantido

**Impacto:** alto.

Mitigação: separar disponibilidade de bolsa, compatibilidade e financiamento efectivamente obtido.

### R10 — Recolha excessiva de dados do estudante

**Impacto:** alto.

Mitigação: minimização e acesso mínimo necessário.

### R11 — Equivalência académica inferida sem autoridade

**Impacto:** alto.

Mitigação: preservar dados originais e marcar conversões como derivadas.

### R12 — Fontes oficiais contraditórias

**Impacto:** alto.

Mitigação: permitir estado de conflito; não escolher automaticamente sem política.

### R13 — Rules engine prematuro

**Impacto:** médio/alto.

Mitigação: preservar conditions/applicability sem formalizar lógica universal AND/OR nesta fase.

### R14 — Herança técnica invisível de requisitos

**Impacto:** médio/alto.

Mitigação: Opportunity apresenta requisitos efectivos conhecidos; origem pode ser preservada sem herança automática.

### R15 — Papéis de Organization simplificados em excesso

**Impacto:** médio.

Mitigação: relação contextual e taxonomia mínima guiada por casos reais.

### R16 — Deduplicação de catálogo

**Impacto:** médio/alto.

Risco: a mesma oportunidade pode surgir de várias fontes.

Identidade canónica/deduplicação permanece aberta.

### R17 — Link rot / desaparecimento de fontes

**Impacto:** médio.

Estratégia de preservação/arquivo não é definida nesta issue.

### R18 — Conteúdo não publicado exposto ao estudante

**Impacto:** alto.

Pode ser necessário estado editorial/publicação, mas o workflow exacto fica fora desta descoberta.

## 19. Questões em aberto

1. Quando uma bolsa automática merece `FundingOpportunity` própria e quando é apenas benefício financeiro associado?
2. Qual granularidade de proveniência/verificação é sustentável no MVP?
3. Qual processo humano, automático ou híbrido permite marcar informação como confirmada?
4. Como será definida e operacionalizada a actualidade/freshness?
5. Que dados financeiros exactos serão pedidos no onboarding?
6. Quais campos académicos são obrigatórios para o piloto angolano?
7. Qual taxonomia mínima de `Requirement` é necessária?
8. Que estados finais deve ter `RequirementAssessment` sem sugerir elegibilidade oficial?
9. Que relações `Opportunity <-> Opportunity` entram realmente no MVP?
10. Que papéis `Organization <-> Opportunity` são necessários nos primeiros casos reais?
11. Que histórico de informação crítica deve ser preservado?
12. Como tratar fontes oficiais contraditórias operacionalmente?
13. Como deduplicar Opportunities recolhidas de várias fontes?
14. O catálogo mantém Opportunities encerradas para histórico ou apenas as activas na descoberta?
15. É necessário workflow editorial separado de edição, verificação e publicação no MVP?
16. Quais dados ou artefactos derivados precisam de ser invalidados/revistos quando o perfil ou a oportunidade mudam?
17. Como representar oportunidades com múltiplas localizações ou sem localização física sem complicar o MVP?

## 20. Fora do âmbito da #17

Não decidir nesta issue:

- esquema PostgreSQL;
- tabelas/foreign keys/indexes;
- migrations;
- Supabase/RLS;
- REST vs GraphQL;
- URLs de endpoints;
- DTOs finais;
- autenticação/JWT/provider;
- JSONB vs normalização;
- herança física de tabelas;
- cron jobs;
- scraping/ingestion pipeline;
- modelos de IA;
- motor real de elegibilidade;
- algoritmo de conversão de notas;
- pesos de matching/ranking;
- arquitectura de produção;
- estratégia completa de versionamento/event sourcing.

## 21. Modelo conceptual mínimo consolidado

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
└── Opportunity[] via papéis contextuais

Program
└── AdmissionOpportunity[] quando aplicável

Opportunity
├── common core
├── typed details
├── Organization relations
├── ApplicationWindow[]
├── Requirement[]
├── RequiredDocument[]
└── provenance/verification

Student
└── ApplicationPlan
    └── PlanOpportunity[] ── Opportunity
        └── ApplicationTask[]

Source
Verification
```

Conceitos auxiliares, não entidades obrigatórias:

```text
Evidence
Freshness
InformationItem / Claim
OpportunityRelationship
FundingScope
SelectionCriterion
```

## 22. Separações conceptuais críticas

```text
Program != Opportunity

Requirement != RequirementAssessment != ApplicationTask

Source != Evidence != Verification != Freshness

ProfileAnalysis != CompatibilityAssessment

Organization classification != Organization role

Opportunity lifecycle != Information freshness

Funding availability != Funding obtained

Original academic data != Derived equivalence != Official recognition
```

## 23. Resultado da descoberta

A investigação não identifica necessidade de definir arquitectura de produção antes da aprovação do produto/design.

O modelo conceptual mínimo acima é suficiente para orientar futura modelação técnica sem:

- prender `Opportunity` apenas a cursos;
- esconder incerteza;
- assumir equivalências académicas;
- misturar estado do estudante com estado da oportunidade;
- transformar verificação em garantia;
- introduzir regras de elegibilidade prematuras;
- hardcodar Angola, Portugal ou um único sistema de ensino no domínio.

Antes de implementação, as questões em aberto que afectarem campos obrigatórios, regras de apresentação, processo de verificação ou permissões devem ser resolvidas no nível de produto/operacional apropriado.
