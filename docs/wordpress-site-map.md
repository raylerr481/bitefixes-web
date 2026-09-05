# BiteFixes Web — WordPress source map

Source site: https://bitefixes.com/

The GitHub frontend is a portable implementation of the public BiteFixes experience. WordPress remains the current source site; this document records the public page structure used to keep the GitHub version coherent.

## Public pages observed

- `/` — main BiteFixes experience
- `/servicos/` — Serviços
- `/desenvolvimento/` — Desenvolvimento
- `/assistencia-tecnica-para-computadores-e-notebooks/` — Assistência Técnica para Computadores e Notebooks
- `/assistencia-tecnica-para-celulares/` — Assistência Técnica para Celulares
- `/redes-e-infraestrutura-de-ti/` — Redes e Infraestrutura de TI
- `/cameras-de-seguranca-e-cftv/` — Câmeras de Segurança e CFTV
- `/impressoras/` — Impressoras
- `/certificacoes/` — Certificações Profissionais
- `/marketing-digital-ia/` — Marketing Digital IA
- `/ia-e-automacao-saas-e-crm/` — IA e Automação, SaaS e CRM
- `/bitefixes-store/` — BiteFixes Store
- `/loja/` — Loja
- `/portal-de-suporte/` — Portal de Suporte BiteFixes
- `/tickets/` — Tickets
- `/sobre-nos/` — Sobre nos
- `/termos-de-uso/` — Termos de uso

## Integration rule

The GitHub frontend may present entry points into Bitey IA, quotes and support, but it must not duplicate the Bitey cognitive backend. Employment requests go to JobIA through Bitey IA routing; market/trading requests go to Bitey SBT; general AI requests stay in Bitey IA.

## Zero-cost rule

No paid AI provider is required by this frontend. Provider credentials must never be shipped to the browser or Android client.
