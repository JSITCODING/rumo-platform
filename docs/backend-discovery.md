# Rumo — Descoberta técnica de backend do MVP

## Estado do documento

- **Issue:** #17 — `[Research][Backend] Documentar descoberta técnica do MVP`
- **Estado:** Em progresso
- **Ecrã afectado:** Transversal — S01–S08
- **Natureza:** investigação e documentação; não autoriza implementação
- **Piloto:** Angola
- **Expansão prevista:** internacional, sem limitar o modelo conceptual a Angola

## 1. Objectivo

Reduzir a incerteza técnica do MVP antes da implementação, descrevendo apenas o domínio necessário ao fluxo aprovado. Este documento não define esquema de base de dados, endpoints, migrations, serviços, autenticação, regras reais de elegibilidade ou stack.

O piloto operacional da Rumo é Angola. O modelo conceptual deve, contudo, evitar decisões que tornem impossível a expansão posterior para estudantes de outros países.

## 2. Fontes e precedência

### Fontes funcionais usadas

- `docs/user-flow.md`
- `docs/design-decisions.md`
- Issue #17

### Fontes de apoio ainda incompletas

- `docs/product-brief.md`
- `docs/mvp-scope.md`
- `docs/data-requirements.md`

Os três documentos acima permanecem em rascunho e não devem ser usados para inventar requisitos ainda não aprovados.

## 3. Factos confirmados

Os pontos desta secção vêm do fluxo e das decisões já aprovadas.

1. O MVP tem oito ecrãs primários, S01–S08.
2. O utilizador principal do piloto é um estudante angolano que procura estudar no estrangeiro.
3. Os destinos iniciais do MVP são Portugal, Alemanha e Espanha.
4. O perfil necessário à análise inclui categorias académicas, linguísticas, financeiras, preferências de estudo, destinos e horizonte de entrada.
5. Respostas aproximadas, autodeclaradas ou não verificadas devem preservar o seu grau de incerteza.
6. A análise de perfil não constitui uma decisão de admissão.
7. A descoberta apresenta oportunidades potencialmente compatíveis e deve explicar por que razão aparecem para o estudante.
8. A plataforma não pode garantir admissão, bolsa, financiamento ou visto.
9. Informação desconhecida não pode ser preenchida com valores inventados.
10. Informação crítica deve manter fonte e estado de verificação visíveis.
11. Uma oportunidade pode conter simultaneamente dados confirmados, incompletos e por verificar.
12. Uma oportunidade só pode existir uma vez no plano do mesmo estudante.
13. O plano contém uma checklist personalizada baseada no perfil do estudante e nos requisitos conhecidos da oportunidade.
14. O estado da tarefa é separado do estado de verificação da informação.
15. A Rumo não submete candidaturas em nome do estudante no MVP.
16. O Dashboard é a entrada principal para utilizadores que já concluíram a análise inicial.
17. Um utilizador com onboarding incompleto deve retomar o onboarding.
18. Alterações ao perfil podem provocar uma nova análise.
19. A implementação permanece bloqueada até aprovação do design visual, protótipo e testes.

## 4. Hipóteses técnicas

As hipóteses abaixo servem para orientar discussão. Não são requisitos aprovados nem decisões de implementação.

### H1 — Separar programa de oportunidade

Um `Program` representa uma oferta académica relativamente estável de uma instituição. Uma `Opportunity` representa uma possibilidade concreta de candidatura associada a esse programa num contexto temporal e operacional específico.

Motivo: requisitos, propinas, bolsas, prazos e disponibilidade podem variar por ciclo de candidatura, intake ou ano académico.

### H2 — Proveniência ao nível da informação

Fonte e verificação devem poder ser associadas a elementos individuais de informação, e não apenas à oportunidade inteira.

Exemplo:

- propina: confirmada;
- prazo: por verificar;
- requisito linguístico: confirmado;
- bolsa: informação incompleta.

### H3 — Análise e compatibilidade são artefactos explicativos

`ProfileAnalysis` e `CompatibilityAssessment` devem representar explicações derivadas de informação conhecida, mantendo as incertezas. Não devem ser equivalentes a elegibilidade, admissão ou previsão de aceitação.

### H4 — Checklist derivada, mas rastreável

Uma `ApplicationTask` pode ser gerada a partir de um requisito conhecido, mas deve continuar distinguível desse requisito. Concluir uma tarefa não confirma automaticamente o requisito associado.

### H5 — Modelo preparado para expansão geográfica

O piloto é Angola, mas nacionalidade, sistema de ensino, moeda, qualificações e regras de equivalência não devem ser assumidos como constantes globais do domínio.

## 5. Entidades candidatas

Estas entidades representam conceitos de domínio. Não correspondem obrigatoriamente a tabelas futuras.

### 5.1 StudentProfile

Representa a informação do estudante necessária à análise, descoberta e planeamento.

Possíveis áreas internas:

- situação académica;
- histórico/resultados;
- nível de estudo pretendido;
- áreas de estudo;
- destinos preferidos;
- capacidades linguísticas;
- capacidade financeira aproximada;
- necessidade ou preferência por financiamento;
- horizonte de entrada;
- proveniência e nível de certeza dos dados quando aplicável.

### 5.2 AcademicRecord

Representa qualificações, resultados ou informação académica declarada pelo estudante.

Risco: qualificações angolanas não devem ser automaticamente traduzidas para equivalências estrangeiras sem uma regra e fonte aprovadas.

### 5.3 LanguageCapability

Representa língua, nível declarado e eventual evidência ou verificação futura.

### 5.4 StudyPreference

Representa nível pretendido, áreas, países/destinos e horizonte de entrada.

### 5.5 FinancialProfile

Representa capacidade financeira aproximada e preferência/necessidade de bolsa ou outro financiamento.

A unidade exacta de capacidade financeira ainda está por decidir.

### 5.6 Institution

Representa universidade, instituto ou outra entidade académica responsável por programas e oportunidades.

### 5.7 Program

Representa curso ou programa académico de uma instituição.

### 5.8 Opportunity

Representa uma possibilidade concreta apresentada na descoberta.

Pode agregar, quando disponíveis:

- programa;
- instituição;
- país/localização;
- nível e área;
- custos;
- financiamento;
- prazos;
- requisitos;
- documentos;
- fontes;
- estados de verificação;
- contexto temporal da candidatura.

### 5.9 Requirement

Representa um requisito conhecido da oportunidade.

Categorias candidatas:

- académico;
- linguístico;
- documental;
- financeiro;
- prazo/calendário;
- outro requisito oficial relevante.

A taxonomia final ainda não está aprovada.

### 5.10 FundingOption

Representa bolsa, apoio financeiro ou outra opção de financiamento associada à oportunidade ou programa.

### 5.11 ApplicationWindow

Representa informação temporal relevante da candidatura, incluindo prazos quando conhecidos.

### 5.12 RequiredDocument

Representa um documento ou categoria documental solicitada pela oportunidade.

### 5.13 Source

Representa a origem de uma informação.

Propriedades conceptuais candidatas:

- entidade responsável pela fonte;
- URL ou referência;
- tipo de fonte;
- data de consulta;
- idioma;
- carácter oficial ou secundário, se tal classificação vier a ser aprovada.

### 5.14 Verification

Representa o estado de confiança/verificação de uma informação.

Estados conceptuais já coerentes com o produto incluem:

- por verificar;
- ainda não confirmado;
- confirmado na fonte disponível.

A taxonomia final e o processo operacional permanecem por aprovar.

### 5.15 ProfileAnalysis

Representa a interpretação do perfil actual do estudante.

Pode conter:

- pontos fortes;
- limitações;
- informação não resolvida;
- indicadores de preparação;
- orientação de pesquisa.

Não representa uma decisão de admissão.

### 5.16 CompatibilityAssessment

Representa a explicação de por que razão uma oportunidade é potencialmente relevante para determinado perfil.

Deve preservar:

- razões;
- limitações;
- incertezas;
- fontes relevantes;
- estado de verificação.

### 5.17 ApplicationPlan

Representa o plano de candidatura do estudante no âmbito do MVP.

A hipótese inicial é existir um plano principal por estudante. A necessidade de múltiplos planos futuros permanece em aberto.

### 5.18 PlanOpportunity

Representa a associação entre o plano do estudante e uma oportunidade guardada.

Regra funcional confirmada:

> A mesma oportunidade não pode aparecer duplicada no plano do mesmo estudante.

### 5.19 ApplicationTask

Representa uma tarefa da checklist.

Estados funcionais confirmados:

- Por fazer;
- Em curso;
- Concluído.

O estado da tarefa não deve substituir o estado de verificação da informação associada.

## 6. Relações candidatas

```text
Student
  └── StudentProfile
       ├── AcademicRecord[]
       ├── LanguageCapability[]
       ├── StudyPreference
       └── FinancialProfile

Institution
  └── Program[]
       └── Opportunity[]
            ├── Requirement[]
            ├── FundingOption[]
            ├── ApplicationWindow[]
            ├── RequiredDocument[]
            └── InformationItem[]
                 ├── Source[]
                 └── Verification

StudentProfile
  ├── ProfileAnalysis
  └── CompatibilityAssessment[] ── Opportunity

Student
  └── ApplicationPlan
       └── PlanOpportunity[] ── Opportunity
            └── ApplicationTask[]
```

`InformationItem` aparece como conceito auxiliar candidato para permitir proveniência e verificação granular. A necessidade de o manter como entidade explícita deve ser validada antes de implementação.

## 7. Contratos conceptuais propostos

Os contratos desta secção são interfaces de domínio para discussão. Não são endpoints, DTOs finais ou APIs implementadas.

### 7.1 Analisar perfil

**Entrada conceptual**

- perfil actual;
- proveniência/certeza dos dados relevantes.

**Saída conceptual**

- pontos fortes;
- limitações;
- incertezas;
- informação a confirmar;
- indicadores de preparação;
- orientação para descoberta.

### 7.2 Descobrir oportunidades

**Entrada conceptual**

- nível pretendido;
- áreas;
- destinos;
- restrições financeiras relevantes;
- preferência de financiamento;
- línguas;
- horizonte de entrada;
- filtros explícitos do utilizador.

**Saída conceptual**

- oportunidades candidatas;
- explicação de compatibilidade;
- informação incompleta;
- fontes e estados de verificação necessários para a apresentação.

### 7.3 Obter detalhes de oportunidade

**Entrada conceptual**

- identificador da oportunidade;
- contexto do perfil apenas quando necessário para explicar compatibilidade.

**Saída conceptual**

- instituição e programa;
- requisitos;
- custos;
- financiamento;
- calendário;
- documentos;
- fontes;
- verificação;
- explicação de compatibilidade.

### 7.4 Adicionar oportunidade ao plano

**Pré-condição conceptual**

- estudante autenticado;
- oportunidade conhecida.

**Regra**

- não criar duplicado se já existir associação estudante/plano/oportunidade.

**Saída conceptual**

- entrada existente ou criada;
- checklist candidata;
- incertezas preservadas.

### 7.5 Actualizar tarefa

**Entrada conceptual**

- tarefa do próprio plano;
- novo estado permitido.

**Saída conceptual**

- tarefa actualizada;
- sem alteração implícita do estado de verificação da informação.

## 8. Permissões candidatas

As permissões abaixo são hipóteses de domínio. Não definem ainda RBAC real.

### Estudante

- consultar e alterar o próprio perfil;
- consultar oportunidades publicadas para descoberta;
- consultar fontes e estados de verificação apresentados;
- gerir o próprio plano;
- alterar estado das próprias tarefas.

### Operação de conteúdo / investigação

Hipótese futura a validar:

- criar e manter instituições, programas e oportunidades;
- associar fontes;
- actualizar estados de verificação;
- registar data e contexto de revisão.

### Sistema

Hipótese futura a validar:

- produzir análise explicativa;
- produzir compatibilidade explicável;
- sugerir checklist baseada em requisitos conhecidos;
- nunca elevar automaticamente informação incerta a confirmada.

## 9. Privacidade e sensibilidade

### Dados do estudante que exigem atenção

- resultados e histórico académico;
- capacidade financeira;
- dados de contacto/conta;
- preferências e contexto de candidatura;
- qualquer conteúdo livre que venha a ser introduzido futuramente.

### Factos já confirmados

- recolher apenas informação necessária à finalidade aprovada;
- não incluir resultados académicos, capacidade financeira ou conteúdo sensível em analytics sem aprovação explícita;
- retenção, base aplicável, consentimento e regras de acesso ainda não foram aprovados.

### Riscos

- recolha excessiva durante onboarding;
- retenção indefinida por ausência de política;
- exposição de informação financeira ou académica a perfis internos não necessários;
- utilização de dados sensíveis em analytics;
- mistura entre dado autodeclarado e dado verificado.

## 10. Proveniência, qualidade e verificação

### Princípio

Nenhuma informação institucional crítica deve perder a ligação à fonte que a sustenta.

### Granularidade recomendada como hipótese

Evitar apenas:

```text
Opportunity.verificationStatus = VERIFIED
```

Preferir um modelo capaz de representar:

```text
Tuition       -> confirmado
Deadline      -> por verificar
Scholarship   -> ainda não confirmado
LanguageReq   -> confirmado
Documents     -> parcialmente conhecidos
```

### Dimensões de qualidade a considerar futuramente

- completude;
- validade;
- actualidade;
- consistência;
- unicidade;
- rastreabilidade.

Os limiares e responsáveis ainda não estão aprovados.

## 11. Riscos técnicos e de produto

### R1 — Compatibilidade confundida com elegibilidade

Impacto: alto.

Mitigação conceptual: compatibilidade deve ser explicativa e acompanhada de incertezas, nunca uma previsão de admissão.

### R2 — Informação sem proveniência

Impacto: alto.

Mitigação conceptual: preservar fonte e data/contexto de verificação por informação crítica.

### R3 — Verificação demasiado grosseira

Impacto: alto.

Mitigação conceptual: permitir estados distintos dentro da mesma oportunidade.

### R4 — Requisitos mudam depois de uma oportunidade entrar no plano

Impacto: médio/alto.

Questão: decidir se a checklist é recalculada, versionada ou apenas sinalizada como potencialmente desactualizada.

### R5 — Perfil alterado depois da análise

Impacto: médio.

Facto: o fluxo exige nova análise após correcção. Deve existir forma de distinguir resultado actual de resultado obsoleto.

### R6 — Hardcode de Angola no modelo global

Impacto: alto a médio prazo.

Mitigação conceptual: Angola é o piloto, não uma constante estrutural para nacionalidade, sistema educativo, moeda ou tipos de qualificação.

### R7 — Normalização prematura de sistemas educativos

Impacto: alto.

Mitigação conceptual: não inferir equivalências entre qualificações angolanas e estrangeiras até existirem regras e fontes aprovadas.

### R8 — Checklist tratada como verdade oficial

Impacto: alto.

Mitigação conceptual: checklist é orientação organizacional e deve manter referência às instruções e fontes oficiais.

## 12. Questões em aberto

### Produto e domínio

1. Uma `Opportunity` corresponde a um programa + intake/ciclo específico ou existe outra unidade de publicação?
2. Um estudante terá sempre um único `ApplicationPlan` no MVP?
3. O que significa exactamente “compatível” em termos funcionais antes de qualquer algoritmo?
4. Que elementos da análise de perfil são apenas informativos e quais influenciam a descoberta?
5. Que categorias exactas de requisitos serão suportadas no MVP?

### Informação e verificação

6. Quem pode criar ou alterar informação institucional?
7. Quem pode marcar informação como confirmada?
8. Uma fonte valida uma oportunidade inteira ou cada informação individualmente?
9. Qual é a precedência entre fonte oficial, fonte governamental, agregador e informação manual?
10. Qual é a cadência mínima de reverificação por tipo de dado?
11. Como sinalizar informação que já foi confirmada mas ficou antiga?

### Checklist e mudanças

12. Quando requisitos de uma oportunidade mudam, o que acontece às tarefas já existentes?
13. O estudante pode criar, editar ou apagar tarefas manualmente no MVP?
14. A checklist deve preservar uma fotografia dos requisitos no momento da adição ou acompanhar sempre a versão actual?

### Perfil

15. Como representar a capacidade financeira: mensal, anual, total disponível ou intervalo?
16. Que resultados académicos são realmente necessários para uma análise inicial útil?
17. Como representar qualificações angolanas sem assumir equivalências não verificadas?
18. O histórico de análises deve ser preservado ou apenas a análise actual?

### Privacidade

19. Qual é o período de retenção do perfil e do plano?
20. Quais dados exigem consentimento específico ou outra base validada?
21. Que perfis internos podem consultar dados académicos e financeiros do estudante?

## 13. Decisões necessárias antes da implementação

A implementação não deve começar sem resolver pelo menos:

1. unidade conceptual de `Opportunity`;
2. regra funcional de compatibilidade;
3. granularidade de fonte/verificação;
4. modelo mínimo de perfil;
5. unidade da capacidade financeira;
6. política de actualização de checklist;
7. papéis operacionais de conteúdo/verificação;
8. regras de retenção e acesso a dados do estudante.

## 14. Fora do âmbito desta investigação

Este documento não autoriza nem especifica:

- base de dados;
- migrations;
- ORM;
- endpoints;
- serviços de produção;
- autenticação;
- framework/backend stack;
- algoritmo real de recomendação;
- regras reais de elegibilidade;
- scraping;
- integração com universidades;
- submissão de candidaturas;
- pagamentos;
- expansão efectiva para países além do âmbito aprovado do MVP.

## 15. Critérios da Issue #17

- [x] Factos, hipóteses e questões em aberto estão separados.
- [x] Entidades candidatas mapeiam apenas o fluxo aprovado.
- [x] Contratos estão documentados como propostas, não como APIs implementadas.
- [x] Privacidade, fontes, verificação e permissões têm riscos registados.

## 16. Próximo checkpoint

Antes de fechar a issue, Produto e Backend devem rever as questões em aberto e classificar cada uma como:

- decisão necessária antes da implementação;
- decisão que pode ser adiada;
- questão fora do MVP.

Só depois dessa revisão este documento deve passar de investigação para referência técnica aprovada.
