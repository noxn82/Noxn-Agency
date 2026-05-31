# NOXN — Landing Page PRD

## Original problem statement
Build a landing page for a billboard ad agency for businesses and people who want to promote
a small business or product launch. Two main services: ad creation for digital billboards
+ digital billboard ad space. Style: modern, simple, ahead of the curve, innovative —
feel of discovering something new. Colors: orange + navy blue.

## User choices (verbatim)
- Agency name: **NOXN**
- Assessment form (not contact form). CTA "Let's begin". Microcopy "Let's start prepping your campaign".
- Sections: Hero + Services, How it works, Pricing/Packages, FAQ.
- Visual personality: Bold/tech-forward (sharp grotesks, motion-heavy, futuristic).
- No AI integration.

## Architecture
- **Frontend**: React 19 + Tailwind 3 + Shadcn UI + Framer Motion + React Hook Form + Zod + Sonner.
- **Backend**: FastAPI + Motor (MongoDB).
- Single-route SPA at `/`. All sections on one page with hash anchors.

## API surface
| Method | Path                | Purpose                                |
| ------ | ------------------- | -------------------------------------- |
| GET    | /api/                | Health: returns `NOXN API live`        |
| POST   | /api/assessments     | Create multi-step assessment           |
| GET    | /api/assessments     | List assessments (desc by created_at)  |
| GET/POST | /api/status        | Legacy demo endpoint                   |

`Assessment` model fields:
campaign_goal, services[], budget_range, timeline, target_locations,
business_name, contact_name, email, phone?, notes?, id (uuid), created_at (iso utc).

## Implemented (Dec 2025)
- Multi-section landing: Header (sticky glass), Hero (massive type + bg billboard image), Services (bento grid w/ LED + city imagery), Process (4-step animated grid), Pricing (3 tiers, "Signal" recommended w/ glow border), FAQ (Shadcn accordion), Footer (huge NOXN watermark).
- 5-step assessment form (goal → services → budget+timing → location → contact) in a Shadcn Dialog modal. Per-step Zod validation via `trigger()`. Persists to MongoDB on submit. Sonner toast + in-modal success state.
- 6 entry points to the form: header CTA, mobile header CTA, hero primary CTA, 3× pricing CTAs, footer CTA, "Brief us" link in service card.
- Full testid coverage via `/app/frontend/src/constants/testIds/noxn.js`.
- Color tokens migrated in `index.css` (deep navy `#050B14` background, electric orange `#FF5A00` accent). Space Grotesk + Manrope + JetBrains Mono loaded via Google Fonts.

## Verified
- Backend pytest 9/9 pass (`/app/backend/tests/test_assessments.py`).
- Frontend Playwright e2e: all 6 CTAs open modal, multi-step validation blocks Continue when invalid, happy path submits 201 and shows success state.

## Backlog / next
- **P1** — Admin/inbox view at `/admin/assessments` (no auth yet — gate behind Emergent Google Auth when needed).
- **P1** — Email notification on submit (Resend integration) so the team gets a ping in addition to DB write.
- **P2** — Live screen-map page (interactive map of the 14 metro markets).
- **P2** — Cookie-aware analytics + funnel tracking from "open form" → "submit".
- **P2** — Mid-form save-and-resume via localStorage.
- **P3** — Stable slugs for budget/timeline testids (already noted by testing agent).
