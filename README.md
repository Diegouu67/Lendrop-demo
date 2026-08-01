# Lendrop

**Rent what you need. No meetups, no coordination, no guesswork.**

Lendrop is a collaborative economy platform that connects people who want to **rent temporary-use items** with owners who want to monetize them, using a **network of smart lockers** that removes the need for any physical meetup between the two parties.

Initial launch in **El Salvador**, with an architecture designed from day one to expand into other countries without major redesigns.

---

## The problem

Most of what people buy gets used once, or very occasionally: formal wear, sports equipment, specialized tools, cameras, drones, costumes, camping gear. After that single use, it sits unused, generating no value at all.

- Money gets spent on items that will barely be used.
- Those items take up space without producing any benefit to their owner.
- There's no reliable channel to rent them out between individuals — today's alternative is Facebook groups and meetups with strangers, which most people avoid for safety reasons.

## The solution

Lendrop solves this with **fully automated** reservations, payments, and handoffs through a network of smart lockers: the owner drops the item off, the system assigns and delivers it, the renter picks it up and returns it — without either party ever having to coordinate directly with the other.

## Who it's for

| | Renter | Owner |
|---|---|---|
| **Profile** | Alejandra, 27, freelance designer | Carlos, 34, engineer |
| **Need** | Quality items for one-off occasions without buying them | Generate income from items they already own |
| **Current frustration** | Unreliable Facebook groups, coordinating with strangers | Doesn't know what to charge, afraid to lend without guarantees |
| **How Lendrop solves it** | Reserves and pays from the app, picks up at a nearby locker, sees photos and reviews before booking | AI suggests a market price, a security deposit + photo evidence protects them, the locker handles pickup/return without them being present |

## Supported categories

Clothing · tools · cameras · drones · musical instruments · bicycles · sports equipment · electronics · camping gear · luggage · costumes · and any temporary-use item.

---

## MVP features

- [ ] Sign-up and login (renter and owner)
- [ ] Item listing with photos, description, and category
- [ ] Search and filtering by category, location, and availability
- [ ] Availability calendar and reservation system
- [ ] Integrated payment gateway (Wompi)
- [ ] Automatic locker assignment for pickup and return
- [ ] Photo evidence of item condition (before/after)
- [ ] Ratings and reviews system
- [ ] Automated notifications (confirmation, reminder, return)
- [ ] AI-based rental price suggestions
- [ ] AI verification (objects, identity)
- [ ] Admin dashboard for locker and transaction monitoring

## Product flow

1. **List / search** — the owner lists an item, the renter searches and filters.
2. **Reserve and pay** — booking via availability calendar, in-app payment.
3. **Pickup** — the system assigns a locker; the renter opens it with their code.
4. **Return** — return at a locker with photo evidence of item condition.
5. **Rate** — both parties rate each other when the transaction closes.

---

## Tech stack

- **Frontend:** React (JSX) with embedded CSS, animated components (scroll-reveal via `IntersectionObserver`), `prefers-reduced-motion` detection.
- **Payments:** Wompi (integration planned).
- **Architecture, entity-relationship model, and data dictionary:** documented in *Deliverable 3 — System Architecture*.
- **AI:** automatic price suggestions, item/identity verification (see status below — there's currently a gap between what's promised and what's implemented).

## Design system

| Token | Value |
|---|---|
| Deep Purple | `#433075` |
| Lavender | `#A58CF4` |
| Soft White | `#FAFAFA` |
| Jet Black | `#0D0D0D` |
| Display typeface | Space Grotesk |
| Body typeface | Manrope |
| Functional typeface (locker codes) | JetBrains Mono |

Aesthetic: minimalist, futuristic, premium — closer to fintech (Stripe, Revolut) than to a generic marketplace.

## Non-functional requirements

| Category | Requirement |
|---|---|
| Security | User and payment data encrypted following best practices |
| Availability | ≥ 99% uptime, including locker monitoring |
| Usability | Complete a booking in fewer than 5 steps |
| Performance | Search results returned in under 3 seconds |
| Scalability | Support user and locker growth without performance degradation |
| Compatibility | Web and mobile, fully responsive |
| Traceability | Every locker access logged with date, time, user, and image |
| Maintainability | Documented, modular codebase |

---

## Current status

- [x] System architecture documentation (ER model, data dictionary, technologies) — *Deliverable 3*
- [x] Marketing landing page (HTML + React), including the animated `ScanPanel` component
- [x] Roadmap of 26 Figma screens across 3 tiers, with 11 ready-to-use AI prompts (Tier 1 complete)
- [ ] Tier 2 and Tier 3 screen design
- [ ] Actual Wompi integration
- [ ] Backend, database, and locker assignment logic
- [ ] Identity verification with real document capture (currently only a DUI/passport data field, no AI verification)

## Open product decisions

Before moving further into design or development, the team needs to close on:

1. **Physical item intake at the locker** — how does the owner actually hand the item over to the system?
2. **Instant vs. approval-based reservations** — affects conversion UX and owner trust.
3. **In-app messaging between users** — does it exist? It could contradict the core "zero coordination" value proposition.
4. **Identity verification** — real document capture, or just data entry? The marketing claim ("AI verification") needs to match what the product actually does.
5. **Category taxonomy** — the marketing site uses 11 categories, the app's Explore screen uses 5. These need to be unified.

---

## Architecture principles

- Multi-language, multi-currency, and multi-payment-method by data design, even though launch is El Salvador / USD / Wompi only.
- Clear separation between business domain (reservations, items, users, lockers) and infrastructure (payments, notifications, AI), so providers can be swapped without rewriting the core.
- The "zero coordination needed" value proposition is the filter used to evaluate every new feature.

## Contributing

Project under active development by a team of ~8 people. Before opening a PR:

1. Check the open product decisions above — if your change depends on one of them, flag it in the PR.
2. Follow the design system (colors, typefaces) defined in this README.
3. Keep code modular and documented (SOLID, Clean Code).

## License

Proprietary — all rights reserved. See [LICENSE.md](./LICENSE.md).
