# FrontDesk AI

**Live demo:** https://frontdesk-by-ben.vercel.app

An AI front-desk assistant for local service businesses. It answers customer questions from the business's own information, collects job details, and gets the lead to the owner without ever making up a price.

> **Status:** in active development (started Nov 2026). This README doubles as the spec. Items marked *(planned)* aren't built yet.

## The problem

Small service businesses (pressure washing, auto detailing, HVAC, lawn care) lose leads because nobody answers the website chat or phone while the owner is on a job or after hours. Generic chatbots make it worse: they can't answer real questions about the business, or they confidently invent prices and services the business doesn't offer.

## Who it's for

- **Owners** of 1–10 person local service businesses who want more booked jobs without hiring a receptionist.
- **Their website visitors**, who want a fast, accurate answer: Do you serve my area? Roughly what does it cost? When can you come out?

## MVP features

- Answers only from the business's own info: services, service area, hours, price ranges, policies
- Never invents prices or services; anything it can't answer gets an honest "the owner will follow up"
- Embeddable chat widget a business adds to its site with one script tag *(planned)*
- Collects lead details (name, phone, address, service, notes) and saves them *(planned)*
- Emails the owner when a new lead comes in *(planned)*
- Owner dashboard: leads, transcripts, and the questions the bot couldn't answer *(planned)*
- Multi-tenant: each business sees only its own data *(planned)*

## How it's tested

- **Evals:** a golden set of customer questions with expected behavior, including traps (price bait, services the business doesn't offer, prompt injection). *(planned)*
- **End-to-end tests:** Playwright tests for the chat and dashboard, with the AI mocked so they're fast and free. *(planned)*
- **CI:** GitHub Actions blocks a deploy when tests or evals fail. *(planned)*

## Stack

Next.js + TypeScript · Claude API (Anthropic TypeScript SDK) · Supabase (Postgres, auth, pgvector) · Vercel · Resend · Playwright · GitHub Actions

## Out of scope (for now)

- Phone or voice answering
- Taking payment for the customer's job
- Booking appointments without the owner confirming
- Training or fine-tuning models
- Languages other than English

## Roadmap

- [x] Project setup and first Claude API call
- [x] Chat endpoint that answers from a sample business
- [x] Conversation history
- [x] First deployment on Vercel
- [ ] Lead capture with tool use, plus an owner email alert
- [ ] Eval suite and Playwright E2E tests running in CI
- [ ] Owner login, dashboard, and row-level security
- [ ] Embeddable widget, hardening, demo video
- [ ] v2: retrieval (RAG) vs. full context, measured with evals; Stripe billing; photo-based estimates

## Run it locally

Requires Node 20.19 or newer (22 LTS recommended) and a Claude API key.

```bash
git clone https://github.com/benj8902/frontdesk-ai.git
cd frontdesk-ai
npm install
echo "ANTHROPIC_API_KEY=your-key-here" > .env.local
npm run dev
```

Then open http://localhost:3000.
