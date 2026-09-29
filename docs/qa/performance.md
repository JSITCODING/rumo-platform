# Orçamento de fontes e carga inicial

Medição de 29 de setembro de 2026, com `vite build`. A carga inicial soma HTML, CSS, JavaScript principal, runtime de registo do service worker e fontes; JavaScript, CSS e HTML usam o valor gzip do Vite, enquanto `woff2` já é comprimido.

| Métrica | Antes | Depois | Orçamento | Estado |
| --- | ---: | ---: | ---: | --- |
| Fontes | 178,67 KB | 82,92 KB | ≤ 120 KB | Passa |
| JavaScript principal (gzip) | 116,51 KB | 116,51 KB | — | Sem regressão |
| Primeira carga estimada | 307,14 KB | 208,15 KB | ≤ 250 KB | Passa |

## Decisões

- Newsreader e Manrope são servidas localmente como `woff2` variável.
- O subconjunto latino inclui os diacríticos portugueses no intervalo `U+0000–00FF`.
- A aplicação usa apenas pesos 600, 700 e 800; a declaração limita o eixo a `600–800`.
- Ambas as fontes usam `font-display: swap` e são pré-carregadas porque título e interface aparecem acima da dobra.
- As alternativas Arial e Georgia usam métricas ajustadas a partir de uma amostra portuguesa para reduzir mudança de layout.
- O service worker inclui os dois ficheiros de fonte no precache.

Imagens instaláveis e restantes ativos do PWA não entram nesta estimativa de primeira vista.
