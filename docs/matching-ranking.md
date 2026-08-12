# Rumo — Matching e ranking explicável do MVP

## Estado

- **Issue:** #38 — `[Backend][Discovery] Fechar matching/ranking explicável do MVP`
- **Estado:** decisão fechada para implementação posterior
- **Base:** issues #31, #36 e #37
- **Natureza:** política determinística de discovery; não define ML, embeddings, probabilidade de admissão ou motor de elegibilidade

## 1. Objectivo

A Discovery da Rumo deve responder:

> Quais Opportunities fazem mais sentido explorar com o perfil e preferências que conhecemos agora, e porquê?

Não deve responder:

> Qual é a probabilidade de este estudante ser admitido?

Nem:

> Esta pessoa é oficialmente elegível?

A decisão central é manter três conceitos separados:

```text
catalog availability
        ↓
matching / profile alignment
        ↓
requirement assessment
```

Uma Opportunity pode estar publicada e ser relevante para exploração mesmo quando alguns requisitos estão `unknown` ou existe um `gap_detected` corrigível.

## 2. Invariante principal

```text
compatibility != eligibility != admission probability
```

Matching serve para descoberta e priorização.

RequirementAssessment serve para explicar a relação entre dados conhecidos do estudante e requisitos conhecidos.

A decisão oficial continua a pertencer à instituição/entidade responsável.

Por isso a Rumo não produz no MVP:

- `87% compatible`;
- `72% chance of admission`;
- `eligible=true` derivado do matching;
- um score único opaco;
- uma classificação automática de “segura”, “alvo” ou “ambiciosa” baseada em chance estimada.

## 3. Pipeline aprovado

```text
Published catalogue
        ↓
Availability gate
        ↓
Explicit query/filters
        ↓
Candidate Opportunities
        ↓
Explainable match signals
        ↓
Deterministic ordering
        ↓
Student-facing reasons + attention items
```

RequirementAssessment pode alimentar sinais, mas nunca é colapsado num veredicto de elegibilidade.

## 4. Três níveis que não podem ser misturados

### 4.1 Hard exclusion

Remove uma Opportunity do conjunto daquela consulta.

Só deve acontecer quando a exclusão é factual, estrutural ou explicitamente pedida pelo utilizador.

Casos aprovados:

1. representação não publicada para student-facing discovery;
2. Opportunity retirada/arquivada quando a consulta pede oportunidades actuais;
3. filtros explícitos escolhidos pelo estudante, por exemplo `country=PT`;
4. filtro explícito por `opportunityType`;
5. pesquisa textual quando o item não corresponde ao âmbito da consulta;
6. filtro explícito por janela/estado temporal quando suportado.

Não são hard exclusions automáticos:

- `RequirementAssessment = UNKNOWN`;
- `GAP_DETECTED`;
- orçamento aparentemente baixo;
- falta de certificado linguístico;
- equivalência académica ainda não estabelecida;
- dados críticos `needs_confirmation`;
- conflito editorial conhecido.

Esses casos afectam explicação, attention ou ordenação, não autorização de acesso ao item.

### 4.2 Compatibility signal

Descreve uma dimensão concreta de alinhamento entre perfil/preferências e Opportunity.

Exemplos:

- nível de estudo alinhado;
- país preferido;
- área de interesse relacionada;
- intake temporalmente próximo do objectivo;
- necessidade de financiamento potencialmente coberta;
- requisito académico conhecido sem gap detectado;
- requisito linguístico ainda por confirmar.

Um signal deve ser explicável individualmente.

### 4.3 Ranking preference

Define como candidatos já admitidos no conjunto de discovery são ordenados.

Ranking não altera RequirementAssessment e não cria verdade institucional.

## 5. MatchSignal mínimo

Conceptualmente:

```text
MatchSignal
├── dimension
├── state
├── reason
├── basis
└── importance class
```

Isto não obriga a uma tabela própria.

### 5.1 Estados mínimos

```text
ALIGNED
PARTIALLY_ALIGNED
NEEDS_ATTENTION
UNKNOWN
NOT_APPLICABLE
```

Não usar `PASS/FAIL` porque matching não é exame de elegibilidade.

### 5.2 Dimensões iniciais

Somente as que têm uso real no MVP:

```text
study_level
field
country
opportunity_type
timing
financial_fit
language_readiness
academic_readiness
requirement_uncertainty
```

Novas dimensões só entram com caso de produto concreto.

## 6. Core alignment vs supporting alignment

Nem todos os sinais têm a mesma função.

### 6.1 Core alignment

Responde se a Opportunity pertence aproximadamente ao espaço que o estudante está a procurar:

- `study_level`;
- `field`;
- `country`;
- `opportunity_type`;
- `timing`.

### 6.2 Supporting alignment

Ajuda a priorizar dentro desse espaço:

- `financial_fit`;
- `language_readiness`;
- `academic_readiness`;
- `requirement_uncertainty`.

A separação evita que uma propina conhecida ou um IELTS conhecido façam uma Opportunity de área errada parecer “melhor” do que uma Opportunity centralmente relevante.

## 7. Study level

Se o perfil declara um nível alvo e a Opportunity/Program possui nível estruturado:

```text
same level -> ALIGNED
clearly different level -> NEEDS_ATTENTION ou PARTIALLY_ALIGNED
missing data -> UNKNOWN
```

Por defeito o nível do perfil é um signal forte, não um hard filter invisível.

Se o utilizador activa um filtro explícito de nível, passa a hard filter daquela consulta.

Isto permite exploração sem confundir preferência persistida com restrição absoluta.

## 8. Área de estudo

No MVP não existe ontologia universal de áreas.

A comparação pode usar:

1. classificação estruturada quando ambos os lados usam o mesmo vocabulário controlado;
2. relação editorial explícita já curada;
3. correspondência textual simples como fallback claramente menos forte.

Não usar embeddings como requisito inicial.

Não inferir equivalência forte apenas porque duas designações são linguisticamente parecidas.

Exemplo:

```text
Student target: Informática
Program: Engenharia Informática
```

pode ser `ALIGNED` se a relação estiver representada de forma segura.

Mas:

```text
Student target: Economia
Program: Engenharia Informática
```

não deve ganhar relevância apenas porque outros sinais financeiros/linguísticos são bons.

## 9. País/destino

Preferências de país do perfil são sinais, não exclusões automáticas.

```text
preferred country match -> ALIGNED
other country -> NOT_APPLICABLE/PARTIALLY_ALIGNED para preferência
country unknown -> UNKNOWN
```

Quando o estudante escolhe `country=PT` na Discovery, a mesma dimensão torna-se hard filter da consulta.

Isto mantém a diferença entre:

```text
preference
```

and

```text
explicit filter
```

## 10. Opportunity type

Admission, Funding, Internship e Exchange permanecem distintos.

Se o estudante selecciona explicitamente um tipo na consulta, aplicar hard filter.

Sem filtro explícito, o tipo pode ser signal de alinhamento com o objectivo actual, mas a Rumo pode mostrar funding relacionado com uma admission Opportunity sem o tratar como curso.

## 11. Timing

Timing compara apenas contextos que podem ser comparados com segurança.

Exemplos úteis:

- target intake 2027 e Opportunity 2027/28;
- janela já encerrada;
- janela futura conhecida;
- rolling admission.

Estados possíveis:

```text
context overlaps target -> ALIGNED
nearby/approximately compatible -> PARTIALLY_ALIGNED
clearly outside target -> NEEDS_ATTENTION
insufficient temporal data -> UNKNOWN
```

Não assumir uma deadline única.

Opportunity `closed` fica fora da discovery corrente por lifecycle/availability, não porque o estudante “não combina”.

## 12. Financial fit

Financial fit é deliberadamente conservador.

Nunca é hard exclusion automática no MVP.

Pode considerar apenas informação comparável e conhecida:

- orçamento aproximado declarado;
- moeda;
- se o orçamento cobre propina, custo de vida ou ambos;
- tuition/custo conhecido;
- funding/coverage conhecido;
- necessidade de financiamento declarada.

Não calcular “affordable=true” quando faltam componentes materiais.

### 12.1 Estados

```text
known cost within declared comparable budget -> ALIGNED
known cost above declared comparable budget -> NEEDS_ATTENTION
funding may materially reduce cost but final net cost unknown -> PARTIALLY_ALIGNED / UNKNOWN
critical cost components missing -> UNKNOWN
```

`above budget` não significa impossibilidade de candidatura.

Não converter moedas silenciosamente com taxa não versionada/rastreável nesta decisão.

## 13. Language readiness

Language readiness deve reutilizar RequirementAssessment quando existir requisito linguístico resolvido.

Regra crítica:

> Apenas comparar métricas semanticamente comparáveis.

Exemplo seguro:

```text
Required IELTS >= 7.0
Student certified IELTS = 7.5
→ aligned signal supported by assessment
```

Exemplo não seguro:

```text
Required IELTS >= 7.0
Student self-declared CEFR B2
→ UNKNOWN, não GAP_DETECTED por conversão implícita
```

Satisfaction options e exemptions permanecem visíveis.

## 14. Academic readiness

Academic readiness também deriva dos assessments seguros existentes.

Não comparar directamente:

- notas de escalas diferentes sem equivalência aprovada;
- qualificação estrangeira com equivalente institucional presumido;
- “strong academic preparation” com threshold inventado.

Estados de matching refletem apenas o que o RequirementAssessment suporta.

```text
MET/APPEARS_MET -> sinal positivo, com evidência correspondente
GAP_DETECTED -> NEEDS_ATTENTION
UNKNOWN -> UNKNOWN
NOT_APPLICABLE -> NOT_APPLICABLE
```

Mesmo `GAP_DETECTED` não cria hard exclusion automática.

## 15. Known blocker vs inelegibility

O matching pode identificar um `known attention item` forte.

Exemplo:

```text
Requirement: IELTS >= 7.0
Student: certified IELTS 6.0
Assessment: GAP_DETECTED
```

A Discovery pode dizer:

> A tua certificação actual está abaixo do mínimo publicado.

Não deve dizer:

> Não és elegível.

O gap pode ser corrigível ou existir outra satisfaction option/exemption.

## 16. Informação incompleta

Unknown é estado de primeira classe.

A ausência de dados:

- não produz zero;
- não produz false;
- não produz mismatch;
- não elimina Opportunity por defeito.

### 16.1 Perfil incompleto

Se o estudante não informou orçamento:

```text
financial_fit = UNKNOWN
```

Não penalizar como se tivesse orçamento insuficiente.

### 16.2 Opportunity incompleta

Se custo, requisito ou deadline crítico está `needs_confirmation`:

- manter item visível se publicado;
- mostrar attention/uncertainty;
- evitar conclusão baseada no valor não confirmado;
- reduzir apenas o sinal de confiança/informação quando usado como desempate.

## 17. Qualidade da informação não é compatibilidade

`verification/freshness` não devem ser misturados semanticamente com “fit”.

Uma Opportunity pode ser altamente relevante mas ter uma propina ainda por confirmar.

Por isso existem dois eixos:

```text
profile alignment
information quality
```

A qualidade da informação pode ser usada como desempate, nunca para transformar uma Opportunity irrelevante numa correspondência melhor.

## 18. Resumo student-facing

O DTO de discovery pode derivar algo equivalente a:

```text
MatchSummary
├── alignmentLabel
├── whyItAppears[]
├── attentionItems[]
└── unknownItems[]
```

Os nomes físicos finais ficam para implementação.

### 18.1 Labels permitidos

Se o produto quiser uma síntese textual, usar linguagem de alinhamento, não probabilidade:

```text
Boa correspondência com o teu objectivo
Correspondência parcial
Faltam dados para avaliar melhor
```

Evitar:

```text
Alta chance
87% match
Muito provável
Seguro
```

## 19. `whyItAppears`

Cada Opportunity priorizada deve conseguir produzir razões legíveis.

Exemplos:

- `Corresponde ao nível de estudo que procuras.`
- `Portugal está entre os teus destinos preferidos.`
- `A área está alinhada com Informática.`
- `O ciclo conhecido aproxima-se do teu objectivo para 2027.`
- `Existe financiamento associado que pode ser relevante para a tua necessidade.`

Não gerar razão se o dado subjacente estiver ausente ou não suportar a afirmação.

## 20. `attentionItems`

Exemplos:

- `Requisito de inglês ainda precisa de confirmação.`
- `A tua nota actual está abaixo do mínimo publicado para este requisito.`
- `A equivalência da tua qualificação ainda não está estabelecida.`
- `O custo total não está suficientemente confirmado.`
- `Encontrámos fontes oficiais divergentes sobre este requisito.`

Attention não é rejection.

## 21. Ordenação default

Não usar soma ponderada universal.

A ordenação `relevance` usa uma tupla determinística de sinais discretos e inspectáveis.

Estratégia aprovada:

```text
1. explicit query/filter relevance
2. core alignment
3. requirement attention bucket
4. supporting alignment
5. information quality as tie-breaker
6. temporal usefulness / known next deadline
7. stable opportunity id as final tie-breaker
```

### 21.1 Core alignment

Pode ser representado internamente pela quantidade de dimensões core explicitamente alinhadas entre as dimensões aplicáveis.

Não publicar esse número como “compatibility score”.

### 21.2 Requirement attention bucket

Ordem conceptual:

```text
no known critical gap
unknown/needs confirmation
known critical gap
```

Isto é um sinal de priorização, não um veredicto.

Uma Opportunity com known gap continua acessível e pesquisável.

### 21.3 Supporting alignment

Considera apenas sinais conhecidos de financial/language/academic readiness.

Unknown não vale como mismatch.

### 21.4 Information quality

Usada apenas após relevância/alinhamento.

Preferir, em empate relevante:

```text
confirmed/current
before
needs_confirmation
before
conflicting/unavailable critical data
```

Sem esconder conflitos.

## 22. Porque não usar um score único

Exemplo rejeitado:

```text
country 20
field 30
budget 15
language 20
academic 15
= 82%
```

Problemas:

1. pesos parecem científicos sem fundamento;
2. mistura preferência com requisito;
3. unknown tende a virar zero;
4. um score esconde qual dimensão causou o resultado;
5. pode ser confundido com chance de admissão.

A Rumo prefere sinais separados + ordenação determinística.

## 23. Pesquisa textual

Pesquisa textual é parte da recuperação, não elegibilidade.

No MVP pode utilizar correspondência textual simples sobre campos publicados relevantes:

- title;
- organization;
- program;
- field text;
- country/destination text quando aplicável.

Search engine externo, fuzzy search avançado, stemming multilíngue e embeddings ficam abertos.

## 24. Filtros mínimos

Compatíveis com o contrato API já fechado:

- query textual;
- opportunity type;
- country;
- study level quando disponível;
- field quando houver classificação utilizável;
- timing/window quando houver caso UI aprovado;
- funding relevance apenas se definido de forma explícita e não enganadora.

Não criar filtros sobre dados internos de verification que não tenham representação student-facing aprovada.

## 25. Sorting student-facing

Opções iniciais possíveis:

```text
relevance   -- default explainable ranking
deadline    -- próxima deadline conhecida entre resultados
title       -- ordem estável simples
```

Não expor `recommended` como ordenação diferente até existir política de personalização aprovada.

## 26. Deadline sorting

`deadline` usa apenas janelas conhecidas/comparáveis.

Rolling Opportunities não recebem deadline falsa.

Itens sem deadline conhecida ficam depois dos que têm deadline válida na ordenação por prazo, com indicação de que o prazo é desconhecido/rolling conforme dados publicados.

## 27. Paginação

A API mantém cursor opaco.

O cursor da implementação deve incorporar os componentes necessários da ordenação seleccionada e um identificador estável como desempate.

Não usar offset como contrato obrigatório.

Mudanças materiais de catálogo entre páginas podem alterar a sequência no MVP; não exigir snapshot transaccional de toda a discovery.

O cliente deve deduplicar Opportunity por `id` se necessário.

Uma política de snapshot/pinned result set fica para escala futura se surgir requisito real.

## 28. Versionamento da política

A implementação deve possuir um identificador simples de versão da política de matching/ranking, por exemplo:

```text
matching_policy_v1
```

Isto serve para debugging e mudanças controladas.

Não exige tabela própria nem exposição pública obrigatória.

Não preservar cada resultado de discovery como evento histórico no MVP.

## 29. Dashboard S05

Dashboard pode consumir o mesmo mecanismo para mostrar um número pequeno de oportunidades relevantes ou CTA para descoberta.

Não criar motor separado de recomendação para Dashboard.

Se o perfil estiver insuficiente:

> Completa/actualiza estes dados para melhorarmos as oportunidades apresentadas.

Não inventar recomendações com dados inexistentes.

## 30. Discovery S06

Cada card pode apresentar apenas sinais de alta utilidade:

```text
- 1–3 reasons de alinhamento
- 0–2 attention/unknown items críticos
- deadline/window quando conhecida
- information state quando material
```

Não carregar a totalidade de RequirementAssessment no card.

## 31. Detail S07

S07 continua a ser a fonte completa de explicação:

```text
why this appeared
+
official requirement
+
student applicability
+
assessment
+
provenance/information state
```

O ranking não substitui o detalhe.

## 32. Casos-limite

### 32.1 Budget desconhecido

```text
financial_fit = UNKNOWN
```

Opportunity não é penalizada como “cara demais”.

### 32.2 Tuition acima do orçamento, bolsa relacionada

```text
financial_fit = PARTIALLY_ALIGNED/NEEDS_ATTENTION
```

Não excluir; explicar custo e funding conhecido separadamente.

### 32.3 IELTS desconhecido

```text
language_readiness = UNKNOWN
```

Não assumir gap.

### 32.4 IELTS comprovadamente abaixo do mínimo

```text
language_readiness = NEEDS_ATTENTION
```

Não assumir inelegibilidade.

### 32.5 Qualification equivalence pendente

```text
academic_readiness = UNKNOWN
reason = equivalence_required
```

### 32.6 Fonte crítica em conflito

A Opportunity pode aparecer se publicada, mas o signal dependente fica `UNKNOWN/NEEDS_ATTENTION` e S07 expõe o conflito.

### 32.7 Oportunidade perfeita em área errada

Supporting signals não compensam desalinhamento de core field/level para a ordenação default.

### 32.8 Opportunity fechada

Sai da discovery corrente por availability/lifecycle; continua preservada para histórico e acesso contextual quando permitido.

## 33. Dados que o matching pode consumir

Apenas dados já aprovados no domínio:

### Student side

- target study level;
- preferred countries;
- preferred fields;
- approximate target intake;
- budget context;
- funding need;
- academic records originais;
- language capabilities;
- RequirementAssessments derivados com segurança.

### Opportunity side

- type;
- country/context;
- Program/study level/field;
- temporal context/windows;
- published critical financial information;
- ResolvedRequirements publicados;
- information quality states necessários.

Não usar atributos sensíveis ou comportamentais que não foram aprovados.

## 34. O que não entra no MVP

Não criar agora:

- ML ranking model;
- embeddings;
- vector database;
- collaborative filtering;
- behavioural personalization;
- click-through optimization;
- paid promotion ranking;
- admission probability model;
- hidden university prestige score;
- hidden student desirability score;
- black-box composite compatibility score;
- universal academic ontology;
- automatic grade conversion;
- recommendation graph;
- learning-to-rank pipeline.

## 35. Invariantes finais

1. Matching nunca é apresentado como elegibilidade.
2. Ranking nunca é apresentado como probabilidade de admissão.
3. Unknown nunca é convertido silenciosamente em mismatch.
4. `GAP_DETECTED` não elimina Opportunity automaticamente.
5. Hard filters são factuais, estruturais ou explicitamente escolhidos pelo utilizador.
6. Preferência persistida não é automaticamente hard filter.
7. Cada reason student-facing precisa de base conhecida.
8. Supporting signals não podem mascarar desalinhamento core.
9. Information quality permanece separada de profile alignment.
10. Requisitos incomparáveis não são convertidos para permitir scoring.
11. Budget não produz exclusão automática.
12. Conflito crítico permanece visível.
13. Ordenação default é determinística e decomponível em sinais.
14. Não existe percentagem única de compatibilidade no MVP.
15. Mudanças futuras na política devem ser versionadas de forma simples.

## 36. Resultado implementável

A implementação futura pode seguir:

```text
candidateSet = availability + explicit filters
signals      = deriveKnownMatchSignals(profile, opportunity)
orderingKey  = explainableDiscreteTuple(signals)
result       = opportunity + whyItAppears + attention + unknowns
```

Isto é uma descrição conceptual, não assinatura de código obrigatória.

## 37. Decisões abertas

Ficam para implementação/tuning posterior:

- exacta estrutura de código dos signals;
- vocabulário controlado inicial para áreas;
- detalhes do text search;
- pesos inexistem no v1; se no futuro forem introduzidos terão de ser auditáveis;
- regras finais de tie-break após dados reais do piloto;
- search engine externo;
- métricas de qualidade de discovery;
- personalização comportamental;
- ML/embeddings se houver evidência de necessidade.

## 38. Conclusão

O matching do MVP é um sistema de **alinhamento explicável**, não um preditor de admissão.

A regra de desenho é:

> recuperar amplamente, excluir apenas por razões seguras, ordenar por sinais conhecidos e explicar sempre por que a Opportunity apareceu e o que ainda precisa de atenção.
