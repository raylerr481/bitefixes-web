# BiteFixes Web

`bitefixes-web` is the **website/frontend for BiteFixes.com**.

It is part of the BiteFixes enterprise ecosystem and must remain separate from the general Bitey IA product. Its business intelligence and authoritative company context are provided by `bitefixes-backend` through authorized APIs/contracts.

## Product boundary

```text
                    BITEFIXES
                        │
              ┌─────────┼─────────┐
              │         │         │
       BiteFixes Web  BiteFixes App  Bitey AI Plugin
              │         │         │
              └─────────┼─────────┘
                        ↓
               BiteFixes Backend
                        ↓
          BiteFixes enterprise intelligence
```

**BiteFixes Web is not `bitey-web`.**

`bitey-web` is the general Bitey IA supracerebro/web application. `bitefixes-web` is the BiteFixes.com website/frontend.

## Responsibilities

BiteFixes Web is responsible for:

- Public BiteFixes.com presentation.
- Service catalog and business information.
- Customer-facing navigation and conversion flows.
- Quote/contact entry points.
- Authorized Bitey IA enterprise widget/channel integration.
- Authentication and account UX where applicable.
- Communication with authorized BiteFixes Backend APIs.
- Responsive web experience.

It must NOT contain:

- provider API keys;
- the authoritative BiteFixes business brain;
- unrestricted company memory;
- cross-tenant private data;
- a duplicate copy of `bitefixes-backend` intelligence.

## Relationship to Bitey IA

Bitey IA and BiteFixes are separate products.

| Repository | Product | Role |
|---|---|---|
| `bitey-web` | **Bitey IA Web** | General Bitey IA supracerebro and Cloudflare application |
| `bitey-ia-app` | **Bitey IA App** | General Bitey IA Android client |
| `bitey-ai` | **Bitey IA Enterprise WordPress Plugin** | Enterprise WordPress channel |
| `bitefixes-web` | **BiteFixes Web** | This BiteFixes.com website/frontend |
| `bitefixes-app` | **BiteFixes App** | BiteFixes mobile channel |
| `bitefixes-backend` | **BiteFixes Backend** | Specialized enterprise backend/intelligence |

Bitey IA can be integrated into BiteFixes through explicit enterprise contracts, but that integration does not merge the two products or make BiteFixes Backend the general Bitey IA supracerebro.

## Backend contract

```text
Browser / customer
       ↓
BiteFixes Web
       ↓
authorized API
       ↓
BiteFixes Backend
       ↓
company context + services + customers + workflows + authorized AI
```

Authoritative business rules, company memory, permissions and provider credentials remain server-side.

## Security

1. Never expose provider credentials in browser code.
2. Validate and authorize backend requests server-side.
3. Treat all client input as untrusted.
4. Enforce tenant and permission boundaries.
5. Do not embed private company data unnecessarily in the client bundle.
6. Keep business-critical decisions in `bitefixes-backend`.

## Development principle

Keep the frontend focused on presentation, interaction and authorized channel behavior. Changes to business intelligence, memory, workflows or company data belong in `bitefixes-backend` and its explicit API contracts.

## Product principle

**BiteFixes Web is the web channel of BiteFixes.com. Bitey Web is a different product: the general Bitey IA supracerebro.**
