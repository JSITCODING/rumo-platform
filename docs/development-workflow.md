# Workflow de desenvolvimento e revisão

## Objectivo

Este processo mantém cada alteração do Rumo pequena, rastreável e pronta para revisão sem misturar ecrãs, requisitos ou decisões.

## Estados do projecto

| Estado | Quando usar | Condição de saída |
| --- | --- | --- |
| **Não iniciado** | Issue aprovada, ainda sem trabalho activo | Responsável inicia a branch |
| **Em progresso** | A branch está activa e a alteração está em preparação | Critérios cumpridos e PR aberta |
| **Pending review** | PR aberta, verificações executadas e pronta para revisão | Aprovação e verificações concluídas |
| **Concluído** | PR integrada em `main` | Issue encerrada e branch eliminada |

Os nomes devem permanecer exactamente iguais em issues, Project e documentação para evitar estados duplicados.

## Rastreabilidade obrigatória

Cada alteração deve identificar:

- **Ecrã:** S01–S08 ou “Transversal”;
- **Componente:** elemento visual, documento, serviço ou módulo afectado;
- **Requisito:** comportamento ou decisão que justifica a alteração;
- **Issue:** uma única issue principal;
- **Branch:** uma branch própria;
- **Penpot:** ligação ao ecrã, componente ou fluxo quando a alteração afecta design;
- **PR:** uma pull request pequena que fecha a issue.

## Formato da issue

A issue deve incluir, nesta ordem:

1. Estado actual;
2. Ecrã afectado;
3. Componente;
4. Requisito;
5. Fontes;
6. Critérios de aceitação verificáveis;
7. Fora do âmbito;
8. Regras do projecto;
9. Branch.

O estado inicial normal é **Não iniciado**.

## Branches

Formato obrigatório:

```text
issue-<número>-<tipo>-<slug>
```

Tipos permitidos:

- `wireframe`
- `design`
- `docs`
- `feature`
- `fix`
- `chore`
- `test`
- `research`

Exemplos:

- `issue-5-wireframe-s01-landing`
- `issue-21-feature-opportunity-card`
- `issue-34-fix-profile-validation`

Regras:

- uma issue principal por branch;
- criar a branch a partir de `main` actualizada;
- não reutilizar uma branch já integrada;
- evitar nomes pessoais, datas e termos vagos como `changes` ou `final`;
- não fazer commits directamente em `main`.

## Commits

Formato recomendado:

```text
<tipo>: <descrição curta> (#<issue>)
```

Exemplos:

- `docs: add MVP wireframe review pack (#7)`
- `fix: preserve onboarding progress (#34)`

Cada commit deve ter um propósito claro. Alterações mecânicas podem ser separadas de alterações de comportamento quando isso simplificar a revisão.

## Pull requests

Título:

```text
[#<issue>] <tipo>: <resumo>
```

A descrição deve usar o template do repositório e conter `Closes #<issue>`.

Antes de marcar **Pending review**:

- confirmar que a branch contém apenas o âmbito da issue;
- actualizar a branch com `main`;
- resolver conflitos na própria branch;
- executar as verificações relevantes;
- confirmar que não existem dados sensíveis, segredos ou informação institucional apresentada como verificada;
- adicionar screenshots para alterações visuais;
- ligar a página ou o elemento do Penpot quando existir.

## Regras de merge

Uma PR só pode ser integrada quando:

- a issue e a branch seguem a convenção;
- os critérios de aceitação estão assinalados;
- a revisão necessária foi aprovada;
- todas as verificações automáticas configuradas estão concluídas com sucesso;
- não existem conversas de revisão por resolver;
- a branch está actualizada e sem conflitos com `main`;
- a documentação e o Penpot estão alinhados quando afectados.

Estratégia preferida: **Squash and merge**.

Depois do merge:

1. mover a issue para **Concluído**;
2. confirmar o encerramento automático por `Closes #<n>`;
3. eliminar a branch remota;
4. registar decisões de produto que tenham mudado;
5. não iniciar implementação quando o fluxo ou wireframe afectado ainda não estiver aprovado.

## Configuração recomendada para `main`

Aplicar no GitHub, quando disponível:

- bloquear push directo;
- exigir pull request antes do merge;
- exigir pelo menos uma aprovação;
- dispensar aprovações antigas após novos commits;
- exigir resolução de conversas;
- exigir verificações automáticas definidas pelo repositório;
- impedir force-push e eliminação de `main`;
- permitir apenas squash merge;
- eliminar automaticamente branches integradas.

Estas definições dependem das permissões e do plano do repositório. A documentação define o padrão mesmo quando uma regra ainda não puder ser aplicada tecnicamente.

## Alterações de design e produto

Quando uma alteração afectar o produto, a issue e a PR devem identificar:

- ecrã;
- componente;
- requisito;
- issue;
- ligação Penpot;
- decisão confirmada ou hipótese ainda em avaliação.

O Penpot é a fonte de verdade para design activo. O Figma é apenas arquivo histórico e não recebe novas alterações. O GitHub é a fonte de verdade para decisões, documentação técnica, tokens, checkpoints e código.

## Artefactos de design e checkpoints

- O ficheiro activo chama-se `Rumo — Product Design` no projecto `Rumo — MVP`.
- `design/tokens.json` é o contrato versionado entre design e futura implementação.
- Cada marco aprovado deve actualizar `design/export-manifest.json`.
- Previews leves podem ser guardados em `docs/assets/design/`.
- Exportações `.penpot` devem ser anexadas a uma GitHub Release para evitar ficheiros binários grandes no histórico normal.
- Ligações antigas do Figma devem ser rotuladas como **Arquivo — não editar**.
- Uma alteração apenas no Penpot continua a exigir issue; a branch correspondente guarda a decisão, evidência ou checkpoint que permite revisão no GitHub.

## Descoberta técnica do backend

A descoberta técnica pode documentar entidades candidatas, relações, contratos propostos, permissões, riscos e questões em aberto. Não autoriza criar base de dados, migrações, API, serviços ou regras reais de elegibilidade. Usar o tipo de branch `research` e marcar hipóteses como **Por validar**.
