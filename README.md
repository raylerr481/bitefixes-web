# BiteFixes Web

`bitefixes-web` is the **public BiteFixes.com website/frontend** and the Web customer channel for the Bitey IA CRM architecture.

## Product role

BiteFixes is the first production tenant/pilot. Its existing public website is preserved. The private Support Portal is a separate protected area for authorized company personnel; the public website itself does not require Portal authentication.

## Three customer channels

The customer-facing entry points are intentionally simple and unified:

1. WhatsApp
2. Telegram
3. Configurable Bitey web widget/globe

```text
Customer
   │
   ├── WhatsApp ─┐
   ├── Telegram ─┼──> Bitey Conversation Engine
   └── Web globe ┘             │
                               ▼
                         CRM / IA / Memory
```

The web globe is configurable per tenant: company name, assistant name, logo, visual identity, welcome message, language and other presentation settings can vary without creating a new backend.

## Portal boundary

The public site handles presentation, service discovery, contact and customer conversion. It does not expose the private CRM.

The Support Portal is the specialized internal workspace for authenticated BiteFixes personnel:

- owner
- admin
- technician
- worker

Customers do not use the administrative Portal login. Their conversations arrive through the customer channels and are recorded in the backend CRM.

## AI request flow

```text
Customer
   ↓
BiteFixes Web / Bitey globe
   ↓
authorized API
   ↓
BiteFixes Backend
   ↓
Bitey Engine
   ↓
CRM + customer + conversation + service context
   ↓
response / authorized CRM action
```

## SaaS/tenant model

The implementation is additive. BiteFixes remains the reference tenant while the same Web channel becomes configurable for other companies.

A tenant may use a different visible assistant name from the internal Bitey engine. Example: the engine remains Bitey while the customer-facing assistant may be named `Sofia IA` for another company.

The frontend must not contain provider keys, authoritative business intelligence, unrestricted private company memory or cross-tenant data.

## Responsibilities

- Public BiteFixes.com presentation.
- Service catalog and business information.
- Quote/contact entry points.
- Configurable Bitey web widget/globe.
- Customer conversation transport.
- Responsive web experience.
- Authorized communication with the backend.

## Security

1. Never expose provider credentials in browser code.
2. Validate and authorize backend requests server-side.
3. Treat client input as untrusted.
4. Enforce tenant and permission boundaries.
5. Keep business-critical decisions in the backend.
6. Do not expose private customer/company data outside authorized context.

## Product principle

**BiteFixes Web is the public Web channel of the BiteFixes tenant. Its configurable Bitey globe is one of three customer channels; the Support Portal remains a separate authenticated workspace for company personnel.**
