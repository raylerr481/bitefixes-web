# BiteFixes Web

`bitefixes-web` is the **public BiteFixes.com website/frontend** and a customer Web channel for **Bitey IA Empresarial**.

## Product role

BiteFixes owns the CRM, SaaS, AI-agent implementation and enterprise AI deployments. The Web globe is one customer-facing channel of those deployments.

**Bitey IA Empresarial** is contextual to the business using it: company context, knowledge, memory, business rules, authorized data and tools are tenant-scoped.

**Bitey IA Web** (`raylerr481/bitey-web`) is different: it is the general/integral Bitey IA architecture, comparable conceptually to a general assistant such as ChatGPT. It can coordinate other modules, models, research and tools. This website does not turn into that general brain.

## Customer channels

1. WhatsApp
2. Telegram
3. Configurable Bitey Web widget/globe

```text
Customer
   ↓
BiteFixes Web / Bitey globe
   ↓
BiteFixes Backend
   ↓
Bitey IA Empresarial
   ↓
Authorized CRM / memory / knowledge / automation
```

## CRM boundary

The public site never becomes the CRM. Private CRM operations remain in the authenticated BiteFixes backend/Support Portal. Browser code must never contain provider keys or unrestricted private enterprise data.

## SaaS / tenant model

The globe can be configured per tenant with company name, assistant name, logo, visual identity, language, currency and authorized channel settings. Each tenant remains isolated.

## Responsibilities

- Public BiteFixes presentation.
- Services, contact and quote entry points.
- Web customer channel.
- Configurable Bitey globe.
- Secure communication with BiteFixes Backend.
- Responsive UX and localization.

## Infrastructure and cost policy

BiteFixes/Bitey follows a **free-first, no-surprise-cost architecture**.

- Prefer free services, open-source software, or free tiers without automatic billing risk.
- Do not add providers that require a payment card just to start or can create unexpected entry/egress, API, traffic, storage, or execution charges.
- **Railway is explicitly excluded** from BiteFixes/Bitey infrastructure.
- Cloudflare is allowed when the free tier is sufficient and any later cost occurs only after a clearly defined usage threshold; paid plans and automatic billing must not be enabled without explicit approval.
- Before incorporating a new service, verify pricing, billing behavior, limits, card requirements, and overage behavior.
- If a service can generate costs without an explicit decision first, choose a safer alternative.
- This policy is documentation-only and does not alter existing working integrations.

## Security

1. Never expose provider credentials in browser code.
2. Treat client input as untrusted.
3. Enforce tenant authorization server-side.
4. Do not expose private CRM data to unauthorized clients.
5. Keep business-critical decisions in the backend.

**Principle:** BiteFixes Web is a customer channel for BiteFixes and its contextual Bitey IA Empresarial deployments; it is not the general Bitey IA Web brain and does not own the CRM.
