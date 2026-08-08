# Estrutura canónica do Penpot

## Estado

- **Plataforma:** Penpot Cloud
- **Equipa:** Rumo
- **Projecto:** Rumo — MVP
- **Ficheiro:** Rumo — Product Design
- **Estado de criação no Cloud:** Criado e activo
- **URL canónico:** [Rumo — Product Design no Penpot](https://design.penpot.app/#/workspace?team-id=3be9e5e1-190f-8090-8008-7396e7d47c43&file-id=81f57451-85cc-819d-8008-739706c5372c)
- **Fonte canónica de fluxo:** `docs/user-flow.md`
- **Tokens canónicos:** `design/tokens.json`
- **Decisão:** P7
- **Issue:** #14

O URL acima foi verificado depois da criação autenticada. O ficheiro permanece privado à equipa até uma decisão explícita de partilha.

## Páginas

| Ordem | Página | Conteúdo | Condição |
| --- | --- | --- | --- |
| 00 | Cover | Estado, versão, responsáveis, links e avisos | Sem telas de produto |
| 01 | User Flows | Fluxo S01–S08, decisões D01–D10 e alternativas | Deve espelhar `docs/user-flow.md` |
| 02 | Wireframes | Oito referências móveis aprovadas e adaptações desktop | PNGs móveis bloqueados |
| 03 | Foundations | Cor, tipografia, espaço, grelha, raio, sombra, ícones e movimento | Tokens ligados |
| 04 | Components | Componentes e estados reutilizáveis | Sem componentes locais duplicados |
| 05 | Visual Designs | S01–S08 mobile e desktop | Apenas oito telas primárias |
| 06 | Prototype | Ligações canónicas e estados críticos | Sem fluxos fora do MVP |

## Convenções

### Frames

- `S01 / Mobile / Default`
- `S01 / Desktop / Default`
- `S02 / Mobile / Error — Email inválido`
- `S08 / Mobile / Empty`

### Componentes

- `Action/Button/Primary`
- `Input/Text/Default`
- `Opportunity/Card/Default`
- `Status/Information/Unverified`
- `Task/Item/InProgress`

### Viewports

- Base móvel: 360 × 800.
- Robustez móvel: 320 px de largura.
- Desktop principal: 1440 × 900.
- Comportamento intermédio: documentar a partir de 768 px; não criar uma terceira versão visual completa sem necessidade.

## Migração dos wireframes

1. Usar os oito PNGs de `docs/assets/wireframes/`.
2. Colocá-los na página `02 — Wireframes`.
3. Nomear cada referência `S0N / Approved reference / 2026-08-08`.
4. Bloquear as imagens e agrupá-las numa secção “Mobile aprovado”.
5. Não reconstruir nem reinterpretar os layouts nesta etapa.
6. Criar as adaptações desktop essenciais ao lado, ligadas à mesma issue da tela visual futura.
7. Manter os links do Figma apenas na secção de arquivo.

## Ordem de construção

1. Importar tokens.
2. Criar estilos e foundations.
3. Criar componentes e estados.
4. Aplicar os componentes a S01–S08.
5. Criar as adaptações desktop.
6. Ligar o protótipo.
7. Rever contraste, copy, incerteza e dados demonstrativos.
8. Exportar o checkpoint aprovado.

## Checkpoints e backups

Em cada marco aprovado:

1. Exportar o ficheiro `.penpot`.
2. Exportar previews PNG das telas afectadas.
3. Criar ou actualizar uma GitHub Release.
4. Anexar o `.penpot` à Release.
5. Guardar apenas previews leves no repositório.
6. Actualizar `design/export-manifest.json` com versão, data, release, commit, âmbito e responsável.
7. Confirmar que a exportação pode ser importada antes de marcar o marco como concluído.

## Integração com Codex

O MCP oficial do Penpot deve ser configurado apenas depois da criação do ficheiro. A chave de integração:

- não entra no repositório;
- não é colada em issues, PRs ou documentação;
- é guardada na configuração segura do ambiente;
- é validada primeiro numa página de teste;
- recebe apenas o acesso necessário.

Enquanto o MCP não estiver configurado, o trabalho é feito directamente no Penpot Cloud. O Figma não é usado como fallback.

## Estado visual actual

- A página `05 — Visual Designs` preserva os conceitos vectoriais v0.1 bloqueados.
- S01–S08 possuem versões v0.2 editáveis em 360 × 800 e 1440 × 900.
- A página `03 — Foundations` contém foundations v0.2.
- A página `04 — Components` contém os componentes próprios e estados alternativos.
- Literata + IBM Plex Sans foi seleccionada no estudo tipográfico.
- A direcção v0.2 permanece **pendente de aprovação visual** e não autoriza implementação.

## Critérios de conclusão da preparação

- [x] Equipa, projecto e ficheiro criados.
- [x] Páginas 00–06 criadas na ordem definida.
- [x] URL real registado.
- [x] Oito wireframes móveis importados e bloqueados.
- [x] Tokens importados sem erros.
- [ ] Primeiro checkpoint exportado e registado.
