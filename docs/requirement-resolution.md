# Rumo — Requisitos contextuais e resolução efectiva

## Estado do documento

- **Issue:** #31 — `[Research][Backend] Definir requisitos contextuais e resolução efectiva`
- **Estado:** Conceptualmente fechado após reauditoria
- **Ecrãs afectados:** S04, S06, S07 e S08
- **Natureza:** decisão conceptual; não autoriza implementação de produção
- **Dependência:** #17 — descoberta técnica de backend do MVP

## 1. Objectivo

Definir o significado mínimo de requisito contextual no Rumo e como obter uma visão efectiva de requisitos para uma Opportunity concreta sem criar um motor universal de elegibilidade, uma linguagem genérica de regras ou uma decisão institucional automatizada.

A pergunta desta decisão é:

> Dadas várias afirmações de requisitos provenientes de Program, Opportunity, FundingOpportunity, via, público, ciclo, jurisdição ou outra fonte aplicável, o que significa um requisito ser efectivo naquele contexto e até onde a Rumo pode avaliá-lo contra o perfil do estudante?

## 2. Resultado da reauditoria

A decisão foi reavaliada contra:

- `docs/backend-discovery.md`;
- `docs/user-flow.md`;
- `docs/design-decisions.md`;
- os limites fechados na Issue #17;
- os casos-limite discutidos durante a descoberta da #31.

Resultado: **aprovada conceptualmente**, com um refinamento explícito da #17.

### Refinamento da #17

A #17 afirma que uma ApplicationTask pode derivar de “conflito a confirmar”. A #31 restringe essa formulação:

- conflito editorial, divergência entre fontes ou incapacidade interna da Rumo de determinar qual informação está correcta **não gera automaticamente tarefa para o estudante**;
- um conflito pode gerar uma acção editorial/interna;
- só gera ApplicationTask quando a própria situação exige legitimamente uma acção do estudante, por exemplo quando a fonte oficial instrui o candidato a confirmar o caso individual junto da instituição.

Portanto:

```text
information uncertainty
!= automatically a student task
```

Este refinamento não altera a separação fundamental `Requirement != RequirementAssessment != ApplicationTask`.

## 3. Invariantes herdadas

Continuam obrigatórias:

1. compatibilidade não é elegibilidade;
2. ausência de dados não equivale a incumprimento;
3. informação desconhecida não é preenchida por inferência inventada;
4. dados académicos preservam representação original;
5. equivalência derivada não é reconhecimento oficial;
6. `Requirement != RequirementAssessment != ApplicationTask`;
7. `Source != Evidence != Verification != Freshness`;
8. publication, verification, freshness e lifecycle continuam eixos distintos;
9. informação crítica preserva proveniência;
10. conflitos não são resolvidos silenciosamente;
11. a Rumo não garante admissão, bolsa, financiamento ou visto;
12. esta decisão não define persistência física, API, RBAC ou arquitectura de produção.

## 4. Modelo conceptual mínimo aprovado

O núcleo da resolução é:

```text
Source / Claims
      ↓
RequirementDefinition
      ↓
contextual resolution
      ↓
ResolvedRequirement
      ↓
student applicability
      ↓
RequirementAssessment
      ↓
next useful action
      ↓
ApplicationTask? 
```

Nem todos os conceitos acima são entidades físicas. A representação técnica permanece aberta.

## 5. RequirementDefinition

`RequirementDefinition` representa uma regra ou condição tal como conhecida a partir de uma ou mais claims/fontes, antes de a Rumo a tratar como requisito efectivo de uma Opportunity concreta.

### Informação conceptual mínima

```text
RequirementDefinition
├── statement
├── category
├── functional scope
├── applicability
├── satisfaction options?
├── exemptions/waivers?
├── temporal/stage context?
└── provenance / claims
```

### 5.1 Statement

Preserva a formulação observada ou uma paráfrase rastreável. A estrutura nunca deve destruir o significado da fonte.

### 5.2 Category

Taxonomia inicial pequena:

```text
academic
language
document
legal_identity
financial_proof
portfolio
test_exam
experience
application_process
other
```

A categoria serve classificação ampla; não determina identidade da obrigação.

### 5.3 Functional scope

Requisitos de objectivos diferentes não entram automaticamente em conflito apenas por tratarem do mesmo assunto.

Exemplos de scope relevantes:

```text
admission
funding
internship
exchange
application_process
```

Exemplo:

```text
Admission: IELTS >= 6.5
Funding:   IELTS >= 7.0
```

Não existe conflito. São condições de objectivos diferentes.

### 5.4 Applicability

Uma RequirementDefinition pode ser incondicional ou condicional.

Não construir no MVP uma linguagem universal AND/OR. Preservar:

- texto original;
- dimensões estruturáveis com segurança;
- parte não estruturada quando necessária.

Quando uma condição não pode ser formalizada sem alterar o significado, mantém-se descritiva e a avaliação automática fica limitada.

### 5.5 Satisfaction options

Alternativas de satisfação não são requisitos independentes.

```text
Requirement:
English proficiency

Accepted options:
- IELTS >= 7.0
- TOEFL >= 100
```

A Rumo não deve transformar isto em duas obrigações.

### 5.6 Exemptions e waivers

Exemption não é SatisfactionOption.

```text
Requirement:
English proficiency

Satisfaction options:
- IELTS >= 7.0
- TOEFL >= 100

Exemption:
accepted prior English-medium education
```

Quando a fonte só dispensa uma forma específica de satisfação, a Rumo não deve inferir que toda a obrigação desaparece.

### 5.7 Temporal / stage context

Preservar o momento em que a condição precisa de ser satisfeita quando isso altera o significado.

Exemplos:

```text
at_application
before_deadline
at_enrolment
before_start
ongoing
```

Os nomes finais não são decididos aqui.

## 6. Identidade da obrigação

A Rumo não determina que duas definições representam a mesma obrigação apenas por palavras semelhantes ou pela mesma categoria.

Princípio:

```text
same subject
!= same obligation
```

Exemplo:

```text
Minimum Mathematics grade >= X
Entrance Mathematics exam required
```

Ambos tratam de Matemática, mas podem ser obrigações distintas.

Para decidir se duas definições são candidatas à mesma obrigação, considerar conceptualmente:

- significado normativo;
- functional scope;
- assunto;
- intenção da obrigação;
- alvo concreto;
- contexto de aplicabilidade.

Não é obrigatório persistir uma ontologia ou `ObligationIdentity` complexa no MVP.

Uma chave canónica opcional pode existir quando realmente reduz ambiguidade, mas normalização semântica automática não é requisito desta fase.

### Regra conservadora

> Se não há base suficiente para afirmar que duas definições representam a mesma obrigação, mantê-las separadas.

## 7. Afirmação descritiva não é automaticamente Requirement

Antes de resolver requisitos, a Rumo deve distinguir semanticamente afirmações normativas de informação descritiva.

Exemplo:

```text
“Programme taught in English.”
```

não equivale a:

```text
“Applicants must demonstrate English proficiency.”
```

A primeira pode ser apenas característica do Program; a segunda é candidata a Requirement.

Também distinguir:

- Requirement;
- recommendation;
- description;
- exemption;
- alternative;
- SelectionCriterion;
- process instruction.

`SelectionCriterion` continua diferente de requisito mínimo.

## 8. Resolução contextual

Não existe uma regra universal “Opportunity vence Program”.

A origem da regra não determina sozinha precedência.

A resolução segue semanticamente:

```text
1. recolher definições candidatas
2. excluir contextos claramente incompatíveis
3. separar functional scopes diferentes
4. agrupar apenas obrigações semanticamente compatíveis
5. identificar a relação entre as definições
6. considerar route, audience e contexto temporal/jurisdicional
7. resolver apenas quando a relação é segura
8. preservar conflito/unknown quando não é segura
```

### 8.1 Relações conceptuais úteis

As seguintes relações descrevem os casos encontrados:

```text
ADDITION
SPECIALIZATION
EXCEPTION
ALTERNATIVE
REPLACEMENT
CONFLICT
```

Não é obrigatório persistir todas como enum/arestas no MVP.

### ADDITION

As condições acumulam-se.

```text
secondary education completed
+
Mathematics entrance exam
```

### SPECIALIZATION

Uma definição torna uma obrigação geral mais concreta para um contexto.

```text
English proficiency required
→ international route: IELTS 7.0 or TOEFL 100
```

### EXCEPTION

Uma regra limita a aplicação de outra.

A regra base não é apagada.

### ALTERNATIVE

Representa formas alternativas de satisfazer a mesma obrigação.

### REPLACEMENT

Só deve ser inferido quando existe evidência forte de substituição/alteração. “Mais recente” ou “mais específico” isoladamente não bastam.

### CONFLICT

Duas definições aplicáveis ao mesmo contexto são incompatíveis e nenhuma relação segura resolve a divergência.

A Rumo não escolhe silenciosamente a opção “mais exigente”.

## 9. Especificidade e autoridade de fonte

Especificidade é sinal, não regra absoluta.

```text
more_specific
!= automatically_wins
```

Autoridade da fonte também não é ranking absoluto.

A decisão deve considerar em conjunto:

- autoridade da fonte;
- adequação do scope;
- contexto temporal;
- público/route;
- especificidade;
- estado de revisão;
- existência de substituição explícita.

Quando estes factores não permitem resolução segura, preservar conflito ou necessidade de revisão editorial.

## 10. ResolutionContext mínimo

O contexto suficiente para resolver regras de uma Opportunity pode incluir:

```text
ResolutionContext
├── Opportunity
├── OpportunityType
├── Program?
├── ApplicationRoute?
├── AudienceContext?
├── TemporalContext
├── jurisdiction/application dimensions?
└── related opportunity context?
```

### 10.1 Dimensões geográficas não são intercambiáveis

Separar quando a regra usa explicitamente:

```text
nationality
residence
previous education country/system
destination/jurisdiction
physical location
```

Não inferir uma a partir da outra.

### 10.2 Related Opportunities

Uma FundingOpportunity pode adicionar requisitos sem reescrever os requisitos de admissão.

```text
Admission requirement = IELTS 6.5
Funding requirement   = IELTS 7.0
```

Se o estudante persegue ambos, a implicação prática pode exigir 7.0, mas a Rumo não muda a regra oficial de admission para 7.0.

## 11. StudentProfile não altera a regra oficial

Separar três fases:

```text
Context Resolution
      ↓
ResolvedRequirement
      ↓
Student Applicability
      ↓
RequirementAssessment
```

O estudante não redefine o que a instituição exige.

Uma condição como:

```text
IELTS required unless accepted prior education was in English
```

continua parte do ResolvedRequirement. O perfil é usado depois para avaliar se a exemption se aplica.

## 12. ResolvedRequirement

`ResolvedRequirement` é a visão contextual que a Rumo pode apresentar como requisito conhecido para uma Opportunity concreta.

Não é uma nova “verdade oficial” criada pela Rumo.

### Estrutura conceptual mínima

```text
ResolvedRequirement
├── effective statement
├── functional scope
├── source definitions[]
├── applicability
├── satisfaction options[]
├── exemptions/waivers[]
├── temporal/stage context?
├── conflict state
└── explanation
```

Pode ser calculado, materializado, editorialmente publicado, cacheado ou versionado no futuro. Esta issue não decide como persiste.

## 13. ApplicabilityEvaluation

Depois da resolução contextual, avaliar se a regra se aplica ao estudante.

Estados semânticos mínimos:

```text
APPLIES
DOES_NOT_APPLY
UNKNOWN
```

Com razão explicável.

Não fundir conflito/qualidade de informação no próprio resultado.

### Invariantes

- falta de informação nunca vira `DOES_NOT_APPLY`;
- condição jurídica ou equivalência que não possa ser inferida com segurança fica `UNKNOWN`;
- exemption potencial não é exemption confirmada;
- condições negativas não devem ser simplificadas até alterar o significado.

## 14. RequirementAssessment

Só depois de existir ResolvedRequirement e aplicabilidade suficientemente conhecida a Rumo avalia a relação com o perfil.

Semântica mínima:

```text
AssessmentResult
- MET
- APPEARS_MET
- GAP_DETECTED
- UNKNOWN
- NOT_APPLICABLE
```

Separado de:

```text
EvidenceSufficiency
- sufficient
- insufficient
- missing
```

Os nomes finais permanecem abertos à modelação técnica.

### 14.1 MET

Usar apenas quando a comparação relevante é suficientemente conhecida e não depende de inferência externa não estabelecida.

### 14.2 APPEARS_MET

Os dados conhecidos são consistentes com o requisito, mas falta evidência, validação ou confirmação suficiente para uma conclusão mais forte.

### 14.3 GAP_DETECTED

Existe uma diferença conhecida entre o dado comparável do estudante e a condição conhecida.

Não significa “inelegível”.

### 14.4 UNKNOWN

Não existe base segura para concluir.

Todo `UNKNOWN` deve conseguir explicar a causa, por exemplo:

- missing student data;
- applicability unclear;
- evidence missing;
- equivalence required;
- requirement conflict;
- requirement needs refresh;
- discretionary rule;
- semantic mapping uncertain;
- pending external decision.

## 15. Gate de avaliação automática

A Rumo só deve produzir avaliação automática forte quando todos os pontos necessários forem seguros.

Perguntas conceptuais:

```text
1. o requisito está resolvido sem conflito crítico?
2. a aplicabilidade é conhecida?
3. a condição é suficientemente explícita?
4. os dados necessários do estudante existem?
5. os valores são semanticamente comparáveis?
6. não exige equivalência/reconhecimento externo não estabelecido?
7. não depende de decisão discricionária de terceiros?
8. a informação crítica está suficientemente actual/revista?
9. a evidência permite o nível de certeza pretendido?
```

Se a resposta necessária for negativa, preferir `UNKNOWN`/`APPEARS_MET` ou não avaliar conclusivamente.

## 16. Casos que bloqueiam conclusão definitiva

### Equivalência académica

```text
student grade 15/20
requirement “equivalent to Portuguese 14/20”
```

A Rumo não compara simplesmente `15 > 14` sem base de equivalência aplicável.

### Fonte crítica em conflito

```text
Source A: IELTS 6.5
Source B: IELTS 7.0
```

O assessment definitivo fica bloqueado até resolução segura.

### Decisão externa

```text
Funding available only to admitted students
```

Antes da decisão de admissão:

```text
UNKNOWN
reason = pending external decision
```

### Critério discricionário

```text
outstanding portfolio
strong motivation
excellent academic record
```

A Rumo pode explicar, mas não deve emitir `MET` como se substituísse uma comissão de selecção.

## 17. Next action e ApplicationTask

Checklist não é projecção 1:1 de Requirement.

O próximo passo útil pode ser:

- satisfazer uma condição;
- fornecer/obter evidência;
- escolher uma SatisfactionOption;
- confirmar informação pessoal em falta;
- acompanhar uma fase futura.

### Regra crítica

Problema editorial da Rumo não vira automaticamente responsabilidade do estudante.

```text
StudentAction
!= EditorialAction
```

Exemplos:

```text
missing student grade
→ possible StudentAction

conflicting official sources
→ EditorialAction by default

source explicitly tells candidate to contact admissions for individual case
→ possible StudentAction
```

Tarefas concluídas mantêm histórico. Mudança posterior do requisito pode exigir revisão, supersession ou nova tarefa, sem apagar a conclusão passada.

## 18. Comportamento por ecrã

### S04 — Análise do perfil

S04 analisa o estudante, não uma Opportunity específica.

Não apresentar requisito específico de uma Opportunity como facto geral.

Exemplo correcto:

> “Algumas oportunidades podem exigir evidência formal de inglês; isso será verificado em cada candidatura.”

### S06 — Descoberta

Consumir apenas resumos decision-relevant dos requisitos.

`UNKNOWN` não exclui automaticamente Opportunity da discovery.

`GAP_DETECTED` também não equivale automaticamente a esconder a Opportunity; ranking/filtro é decisão separada.

### S07 — Detalhes da Opportunity

A UI deve conseguir distinguir:

1. o que é exigido;
2. por que a Rumo acredita que é exigido;
3. se se aplica ao estudante;
4. como o perfil actual se relaciona com a condição;
5. proveniência/estado da informação.

### S08 — Plano

Tasks são derivadas de requisitos resolvidos + assessment + contexto operacional, nunca directamente de texto bruto da RequirementDefinition.

Incerteza editorial não cria automaticamente tarefa do estudante.

## 19. Casos-limite que o modelo deve suportar

Sem exigir um rules engine genérico, o modelo deve preservar correctamente:

- estudante ainda a concluir secundário quando o requisito é para enrolment;
- rolling admission;
- documento A **ou** documento B;
- documentos A **e** B;
- requisitos dependentes de idade em momento específico;
- nationality != residence;
- bolsa automática sem candidatura separada;
- financiamento dependente de admissão;
- IELTS com score global + mínimo por componente;
- exemption parcial de uma SatisfactionOption;
- requisitos de ciclos diferentes sem falso conflito;
- fontes sem contexto temporal suficiente;
- requirement alterado depois de task concluída;
- requirement removido depois de task concluída;
- experiência “relevante” que exige interpretação;
- portfolio como submissão vs avaliação de qualidade;
- recommendation ≠ minimum requirement;
- requisitos de immigration/legal separados de admission;
- fee waiver;
- predicted grades vs final grades;
- oferta condicional;
- regras demasiado vagas para avaliação automática.

## 20. O que foi deliberadamente cortado

Não implementar nem definir nesta decisão:

- rules engine genérico;
- AST de condições;
- linguagem universal AND/OR;
- ontologia académica universal;
- motor automático de equivalência semântica;
- scoring genérico de precedência;
- replacement automático;
- classificador jurídico universal;
- elegibilidade oficial;
- matching/ranking;
- conversão de notas;
- parser universal de regulamentos;
- scraping/ingestion;
- schema/tabelas;
- APIs/DTOs;
- RBAC/RLS/autenticação;
- arquitectura de produção.

## 21. Estratégia operacional recomendada para o MVP

```text
human-reviewed RequirementDefinitions
        ↓
human-assisted contextual resolution
        ↓
ResolvedRequirement
        ↓
automatic student assessment only where safe
```

Automação/IA pode futuramente:

- extrair claims;
- classificar afirmações;
- sugerir mapeamento de requisitos;
- sugerir aplicabilidade;
- sinalizar conflito.

Mas não promove informação crítica a confirmada nem produz elegibilidade oficial sem processo aprovado.

## 22. Invariantes finais aprovadas

1. Requisitos mantêm proveniência.
2. Origem não determina automaticamente precedência.
3. Mesmo assunto não significa mesma obrigação.
4. Scope diferente não gera conflito automaticamente.
5. Alternativas de satisfação não são requisitos independentes.
6. Exemption não é SatisfactionOption.
7. Aplicabilidade desconhecida não vira falsa.
8. Ausência de dados não vira gap.
9. Equivalências não confirmadas bloqueiam comparação definitiva.
10. Conflitos críticos bloqueiam assessment definitivo.
11. Critérios discricionários não recebem `MET` automático.
12. Dependências de decisões externas permanecem incertas até o evento ocorrer.
13. Alterações não destroem histórico de assessments/tasks.
14. Problemas editoriais não viram automaticamente tasks do estudante.
15. Automatização só ocorre quando a comparação é semanticamente segura.
16. ResolvedRequirement não é garantia nem decisão oficial.

## 23. Decisões ainda abertas

A #31 não precisa permanecer aberta por estes pontos; pertencem às próximas decisões técnicas:

- representação física de RequirementDefinition/ResolvedRequirement;
- se ResolvedRequirement é persistido, materializado ou calculado;
- mecanismo técnico de versionamento/histórico;
- estrutura física de claims;
- enums finais;
- workflow editorial concreto;
- mecanismo de ingestion;
- APIs;
- RBAC/RLS;
- arquitectura de produção.

## 24. Conclusão

A resolução efectiva do Rumo não é uma hierarquia de “quem vence”. É uma interpretação contextual rastreável e conservadora das regras conhecidas.

O MVP deve privilegiar:

```text
estrutura suficiente para explicar e avaliar
+
revisão humana nas zonas ambíguas
+
automação apenas nas comparações seguras
```

Este modelo é suficiente para S04/S06/S07/S08 e não exige regras de elegibilidade completas nem um motor genérico de condições.