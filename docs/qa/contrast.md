# Auditoria de contraste

- **Data:** 29 de setembro de 2026
- **Método:** luminância relativa e rácio de contraste WCAG 2.x
- **Limiares:** texto normal 4,5:1; texto grande e elementos não textuais 3:1

| Par | Uso | Cores | Rácio | Limiar | Resultado |
| --- | --- | --- | ---: | ---: | --- |
| ink / canvas | texto | #14251f / #f5f0e7 | 14.08:1 | 4.5:1 | Passa |
| ink / paper | texto | #14251f / #fffdf8 | 15.72:1 | 4.5:1 | Passa |
| ink / mist | texto | #14251f / #e8eee9 | 13.57:1 | 4.5:1 | Passa |
| ink / cream | texto | #14251f / #efe3ce | 12.59:1 | 4.5:1 | Passa |
| muted / canvas | texto | #5d655f / #f5f0e7 | 5.30:1 | 4.5:1 | Passa |
| muted / paper | texto | #5d655f / #fffdf8 | 5.92:1 | 4.5:1 | Passa |
| muted / mist | texto | #5d655f / #e8eee9 | 5.11:1 | 4.5:1 | Passa |
| muted / cream | texto | #5d655f / #efe3ce | 4.74:1 | 4.5:1 | Passa |
| cobalt / canvas | texto e foco | #2755c7 / #f5f0e7 | 5.76:1 | 4.5:1 | Passa |
| cobalt / paper | texto e foco | #2755c7 / #fffdf8 | 6.43:1 | 4.5:1 | Passa |
| white / cobalt | texto | #ffffff / #2755c7 | 6.54:1 | 4.5:1 | Passa |
| white / cobalt dark | texto | #ffffff / #183d99 | 9.69:1 | 4.5:1 | Passa |
| clay / canvas | origem e orientação | #b95332 / #f5f0e7 | 4.26:1 | 3.0:1 | Passa |
| clay / paper | origem e orientação | #b95332 / #fffdf8 | 4.75:1 | 3.0:1 | Passa |
| sun / ink | marca de abertura | #e4a33b / #14251f | 7.31:1 | 3.0:1 | Passa |
| line / canvas | limite de controlo | #7f837d / #f5f0e7 | 3.40:1 | 3.0:1 | Passa |
| line / paper | limite de controlo | #7f837d / #fffdf8 | 3.79:1 | 3.0:1 | Passa |
| line / mist | limite de controlo | #7f837d / #e8eee9 | 3.28:1 | 3.0:1 | Passa |
| line / cream | limite de controlo | #7f837d / #efe3ce | 3.04:1 | 3.0:1 | Passa |
| confirmed / paper | estado não textual | #183d99 / #fffdf8 | 9.54:1 | 3.0:1 | Passa |
| estimated / paper | estado não textual | #2755c7 / #fffdf8 | 6.43:1 | 3.0:1 | Passa |
| to verify / paper | estado não textual | #5d655f / #fffdf8 | 5.92:1 | 3.0:1 | Passa |
| danger / danger surface | erro | #b91c1c / #fef2f2 | 5.91:1 | 4.5:1 | Passa |
| danger / canvas | erro | #b91c1c / #f5f0e7 | 5.70:1 | 4.5:1 | Passa |
| success / success surface | sucesso | #166534 / #f0fdf4 | 6.81:1 | 4.5:1 | Passa |
| success / canvas | sucesso | #166534 / #f5f0e7 | 6.28:1 | 4.5:1 | Passa |

Todos os pares usados passam o limiar aplicável. A terracota fica restrita a origem e orientação; o amarelo da abertura é usado apenas sobre tinta escura.
