# Teoria de design — Editorial Angolano Contemporâneo

## Estado do documento

- **Versão:** 1.1
- **Data:** 8 de agosto de 2026
- **Estado:** Direcção v0.2 implementada no Penpot; aprovação visual pendente
- **Âmbito:** S01–S08
- **Issue de origem:** #14
- **Issue de evolução:** #15

## Intenção

Rumo deve parecer uma orientação séria para uma decisão de vida importante: ambiciosa, clara e humana. O carácter premium nasce da composição, da linguagem, da qualidade tipográfica e da contenção. Não nasce de efeitos decorativos, excesso de cartões ou padrões visuais genéricos.

A referência cultural angolana deve surgir com respeito através das pessoas, da luz, da materialidade, do ritmo e da linguagem. Não usar símbolos nacionais como decoração automática nem reduzir Angola a clichés visuais.

## Direcção v0.2 — Guia documental de candidatura

A aplicação v0.2 abandona a repetição de cartões premium e adopta a linguagem de um dossier anotado: numeração, linhas editoriais, notas marginais, fontes e estados de certeza. A presença angolana surge nas pessoas, ambientes e linguagem, sem bandeiras ou padrões decorativos.

Cartões são reservados para escolhas, comparação e grupos accionáveis. Pills são reservadas a filtros e estados. A mesma composição não se repete em mais de duas telas.

## Princípios

### 1. Confiança antes de entusiasmo

A interface explica o que sabe, o que estima e o que precisa de confirmação. Compatibilidade não é admissão; progresso não é verificação.

### 2. Editorial, não institucional

Títulos fortes, introduções curtas, blocos de informação bem ritmados e hierarquia visível. Evitar páginas densas que pareçam formulários administrativos.

### 3. Ambição com proximidade

A comunicação pode ser optimista, mas nunca promocional ao ponto de ocultar custos, prazos, requisitos ou incertezas.

### 4. Cor com função

O verde profundo estrutura e transmite estabilidade. O terracota acrescenta calor e presença humana. O dourado é apenas um acento editorial; não representa bolsa, sucesso ou prioridade.

### 5. Espaço é parte da qualidade

Usar margens generosas, alinhamentos consistentes e poucos níveis de elevação. Uma secção importante recebe espaço, não necessariamente uma caixa.

### 6. Acessibilidade desde as foundations

Texto normal deve cumprir contraste AA. Foco não depende apenas de cor. Alvos interactivos devem ter pelo menos 44 × 44 px. Estados de erro, sucesso e incerteza incluem texto ou ícone além da cor.

## Tipografia

- **Display editorial seleccionado:** Literata, para títulos principais, dossiers e momentos de orientação.
- **Interface e leitura seleccionada:** IBM Plex Sans, para navegação, formulários, dados e texto corrido.
- **Metadados e fontes:** IBM Plex Mono, apenas para numeração, datas, estado e proveniência.
- **Fallbacks:** Georgia para display; Arial e sans-serif para interface.
- **Comparação realizada:** Newsreader + Manrope, Literata + IBM Plex Sans e Domine + Archivo. Literata + IBM Plex Sans foi seleccionada por legibilidade, carácter documental e menor associação à linguagem v0.1.
- Usar no máximo três tamanhos de título por ecrã.
- Não usar caixa alta em parágrafos, botões ou mensagens de estado.
- Números de custo, prazo e progresso usam algarismos tabulares quando disponível.

## Paleta

| Papel | Token | Valor inicial | Uso |
| --- | --- | --- | --- |
| Fundo principal | `color.semantic.background.canvas` | Marfim | Superfície geral |
| Conteúdo principal | `color.semantic.text.primary` | Tinta escura | Texto e ícones |
| Acção principal | `color.semantic.action.primary` | Verde profundo | CTA e foco |
| Acento humano | `color.semantic.accent.warm` | Terracota | Destaques editoriais |
| Acento premium | `color.semantic.accent.gold` | Dourado contido | Detalhes, nunca texto pequeno |
| Incerteza | `color.semantic.status.warning` | Ocre | Informação por confirmar |
| Erro | `color.semantic.status.danger` | Vermelho escuro | Erros recuperáveis |
| Sucesso | `color.semantic.status.success` | Verde médio | Acção concluída |

Os valores canónicos estão em `design/tokens.json`. Alterações exigem revisão de contraste e decisão registada.

## Fotografia

- Priorizar estudantes e famílias angolanas em situações reais de estudo, orientação ou preparação.
- Preferir luz natural, enquadramentos documentais e ambientes reconhecíveis.
- Evitar imagens encenadas de “sucesso garantido”, apertos de mão, chapéus de graduação genéricos ou aeroportos como atalho visual.
- Identificar sempre fotografia de demonstração; não sugerir parceria com instituições representadas.
- Não usar imagens geradas ou de stock como prova de resultados.
- Não usar imagens geradas por IA para representar pessoas reais.
- Registar autor, origem, licença, data, contexto confirmado, alterações e uso.
- Começar com licenças comerciais gratuitas; qualquer compra exige aprovação explícita.

## Ilustração e grafismo

- Formas inspiradas em caminhos, margens editoriais e marcações de estudo.
- Traço simples, cantos controlados e composição assimétrica equilibrada.
- Evitar mapas turísticos, bandeiras em excesso e padrões étnicos usados sem contexto.
- Ilustrações nunca substituem avisos, fontes ou informação crítica.

## Iconografia

- Ícones lineares de 20 ou 24 px, espessura consistente e significado directo.
- Combinar ícone e texto em estados críticos.
- Não usar troféus, estrelas ou selos para representar compatibilidade.
- “Verificado” só pode aparecer quando existe uma fonte e regra aprovadas.

## Componentes

A biblioteca inicial deve conter:

- botões primário, secundário, discreto e destrutivo;
- campos de texto, select, escolha única, checkbox e ajuda contextual;
- cabeçalho móvel, navegação inferior e cabeçalho desktop;
- Nota Rumo para contexto, conselho e incerteza;
- Faixa de fonte com origem, data e estado de verificação;
- Próximo passo numerado, sem contentor decorativo obrigatório;
- Dossier de oportunidade para requisitos, custos, prazos e evidências;
- Checklist documental com progresso separado da verificação;
- indicador de progresso e item de checklist;
- tags separadas para tarefa e estado da informação;
- estados loading, vazio, erro, desactivado e sucesso.

Cada componente deve cobrir padrão, hover quando aplicável, foco, pressionado, desactivado e erro.

## Movimento

- Usar movimento apenas para preservar contexto: mudança de etapa, abertura de detalhe, confirmação de guardar e feedback de progresso.
- Duração preferida entre 160 e 240 ms.
- Respeitar redução de movimento.
- Evitar parallax, animações contínuas e celebrações que sugiram admissão ou bolsa obtida.

## Conteúdo

- Português claro adequado ao contexto angolano.
- Frases curtas, verbos concretos e explicações próximas da decisão.
- Preferir “Parece compatível com o teu perfil” a “És elegível”.
- Preferir “Confirma na fonte oficial” a “Garantido”.
- Dados inventados devem incluir “Demonstração”, “Estimado”, “Por confirmar” ou “Não verificado”.

## Anti-padrões

- glassmorphism;
- gradientes decorativos intensos;
- dashboards com métricas sem acção;
- excesso de cartões dentro de cartões;
- percentagens inventadas de admissão;
- rankings opacos;
- linguagem que culpabiliza o estudante;
- bandeiras como sistema principal de navegação;
- visual de banco, seguradora ou portal governamental genérico;
- mais de dois contentores arredondados acima da dobra;
- chips ou formas sem função informativa;
- repetição da sequência kicker–título–subtítulo em todas as telas.

## Auditoria antigenericidade

- máximo de dois contentores arredondados acima da dobra;
- pills apenas para estado ou filtro;
- nenhum elemento decorativo sem significado;
- a mesma composição não se repete em mais de duas telas;
- S01–S08 mantêm silhuetas reconhecíveis em miniatura;
- copy real, incerteza e fonte permanecem visíveis.

## Revisão visual obrigatória

Cada tela deve ser verificada a 360 × 800 e 1440 × 900, além de uma passagem de robustez a 320 px. A revisão confirma hierarquia, contraste, foco, comprimento real da copy, estados essenciais e ausência de garantias.
