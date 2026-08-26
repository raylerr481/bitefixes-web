# BiteFixes Web

`bitefixes-web` is the **BiteFixes.com website/frontend** and a web channel for the BiteFixes enterprise ecosystem.

## Product role

BiteFixes is a separate enterprise product connected to the Bitey IA ecosystem. Its business intelligence and authoritative context are provided by `bitefixes-backend`.

```text
                    BITEFIXES
                        │
              ┌─────────┼─────────┐
              │         │         │
       BiteFixes Web  BiteFixes App  WordPress channel
              │         │         │
              └─────────┼─────────┘
                        ↓
               BiteFixes Backend
                        ↓
              Bitey IA Empresarial
```

**BiteFixes Web is not `bitey-web`.** `bitey-web` is the general Bitey IA Supracerebro.

## Bitey IA Empresarial

The floating AI assistant on BiteFixes Web is **Bitey IA Empresarial**. It maintains Bitey IA's architecture and capabilities while operating with authorized BiteFixes context such as CRM, customers, tickets, services, knowledge, conversations and workflows.

This contextual layer is for BiteFixes. It does not limit the general Bitey IA Supracerebro.

## Responsibilities

- Public BiteFixes.com presentation.
- Service catalog and business information.
- Customer navigation and conversion flows.
- Quote/contact entry points.
- Bitey IA Empresarial floating assistant/channel.
- Authentication/account UX where applicable.
- Authorized communication with BiteFixes Backend.
- Responsive web experience.

The frontend must not contain provider keys, authoritative business intelligence, unrestricted private company memory or cross-tenant data.

## AI request flow

```text
Customer
   ↓
BiteFixes Web / floating assistant
   ↓
authorized API
   ↓
BiteFixes Backend
   ↓
Bitey IA Empresarial
   ↓
CRM + customers + tickets + services + knowledge + workflows
   ↓
contextual response / authorized action
```

## Relationship to Bitey IA

Bitey IA is the general Supracerebro. Bitey IA Empresarial is the contextual enterprise manifestation used by authorized BiteFixes flows. The products relate and can exchange authorized, privacy-safe capabilities, but BiteFixes context remains scoped to BiteFixes.

## Security

1. Never expose provider credentials in browser code.
2. Validate and authorize backend requests server-side.
3. Treat client input as untrusted.
4. Enforce tenant and permission boundaries.
5. Keep business-critical decisions in the backend.
6. Do not expose private customer/company data outside authorized context.

## Product principle

**BiteFixes Web is a web channel of BiteFixes. Its floating assistant is Bitey IA Empresarial. Bitey IA Web is the separate general Bitey IA Supracerebro.**
