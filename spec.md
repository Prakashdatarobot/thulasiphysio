# Thulasi Physio — Website Spec

## 1. Overview

A single-page marketing/lead-generation website for a physiotherapy clinic, modeled on the conversion pattern used by [Cloud Physio](https://cloudphysio.co.in/) and [Dev Physio](https://devphysio.in/) (Coimbatore-based physio clinics). Goal: convert visitors into booked consultations via an inline lead form and WhatsApp, while ranking locally for physiotherapy-related search terms.

**Not in scope:** patient login/portal, e-commerce/payments, appointment calendar/scheduling system, CMS admin UI (v1 content is hardcoded in the codebase).

## 2. Tech Stack

- **Next.js 14 (App Router) + TypeScript** — SSG for SEO, fast load times
- **Tailwind CSS + shadcn/ui** — styling and accessible components (accordion, carousel, form controls)
- **Zod** — form validation
- **Google Sheets API (service account)** — lead storage backend
- **Deployment:** Vercel

## 3. Page Structure (Single Page, Anchor Navigation)

All sections live on `/` (home), in this order, each with an `id` for anchor nav:

| # | Section id | Purpose |
|---|-----------|---------|
| 1 | `#top` (header) | Sticky bar: hours, location, phone; nav; Call + WhatsApp CTA buttons |
| 2 | `#home` (hero) | Headline, subheadline, trust badges, star rating, inline booking form |
| 3 | stats strip | Patients treated, Google rating, one-on-one %, flexible timings |
| 4 | `#about` | Clinic story, founder bio/credentials, philosophy |
| 5 | `#services` | Services/conditions grid (6–8 cards) |
| 6 | techniques | Treatment techniques/equipment list |
| 7 | `#approach` | Why Choose Us — differentiator grid |
| 8 | testimonials | Carousel: name, condition treated, quote |
| 9 | gallery | Clinic/treatment photo grid |
| 10 | FAQ | Accordion, 8–10 Q&As |
| 11 | `#contact` | Map, address, timings, areas served, secondary booking form |
| 12 | footer | Address, hours, socials, quick links, privacy policy link |
| — | floating | Fixed WhatsApp button, bottom-right, all viewport states |

Legal: separate `/privacy-policy` page (required — form collects phone number and health condition data).

## 4. Header / Navigation

- Top bar (desktop only, collapses on mobile): clinic hours, area/location, phone number, "Home Visits Available" badge
- Main nav: logo, anchor links (Home / About / Services / Approach / Contact), Call button, WhatsApp button
- Mobile: hamburger menu with same anchor links + sticky Call/WhatsApp buttons

## 5. Hero Section

- Eyebrow: "Best Physiotherapy Clinic in [City]"
- H1: "Get Back to a Pain-Free Life"
- Subheadline: one-line description of services (back pain, knee pain, sports injury, post-surgery recovery)
- Trust badges: "Home Visits Available", star rating + "Trusted by X+ Patients"
- Primary CTAs: **Call Now** (`tel:` link), **WhatsApp** (`https://wa.me/<number>?text=...` prefilled message)
- Inline booking form (see §7)

## 6. Content Sections

### 6.1 Stats strip
4 cards with icon + number + label (e.g. Patients Treated, Google Rating, One-on-One Sessions, Flexible Timings). Values are config-driven constants, not live-fetched.

### 6.2 About
- Clinic description paragraph(s)
- Founder/lead physiotherapist: **Dr. Prabhu Mehanathan**, MPT (Ortho), CMT., MMTFI., MIAFT., MIAP., FOMT (Australia) — Consultant Physiotherapist. Photo placeholder until supplied.
- Optional: "our mission" statement

### 6.3 Services
Confirmed service/condition list (20 items) is too long for a single card grid — split into two presentations:

- **Featured Services grid** (6–8 cards, icon + title + one-line description) — a curated subset covering the main categories:
  Orthopaedics, Neurological Physiotherapy, Post-Surgical Rehabilitation, Geriatric Physiotherapy, Paediatric Physiotherapy, Chiropractor, Hydrotherapy Training, Vestibular Rehabilitation.
- **"Conditions We Treat" tag cloud** below the grid, listing all confirmed items as pill/tag chips:
  Arthritis treatment, Back pain, Balance exercise therapy, Chiropractor, Foot and ankle pain, Geriatric physiotherapy, Heat therapy, Hip pain, Hydrotherapy training, Knee pain, Massage, Neurological physiotherapy, Orthopaedics, Paediatric physiotherapy, Physical therapy, Post-surgery, Post-surgical rehabilitation, Shoulder pain, Spinal injuries, Therapeutic exercise, Vestibular rehabilitation.

The booking form's Condition dropdown (see §7) uses this same 20-item list (plus "Other").

No individual service detail pages in v1 (single-page scope) — cards/tags can deep-link to the booking form pre-filled with that condition via a query param or client state.

### 6.4 Treatment Techniques
Simple tag/list section of equipment and modalities used (e.g. Shockwave Therapy, Traction, Chiropractic Correction, Cupping, Electrotherapy, Ultrasound Therapy, Dry Needling, Manual Therapy, Heat/Cold Therapy).

### 6.5 Why Choose Us
Grid of 6–8 differentiators with short titles + one-sentence descriptions (e.g. Highly Qualified Physiotherapists, Personalized Care, Evidence-Based Approach, Flexible Scheduling, Home Visits, Patient-Centered Approach).

### 6.6 Testimonials
Carousel of patient testimonials: name, condition treated, quote. Data source: `content/testimonials.ts` (static array, hardcoded for v1).

### 6.7 Gallery
Responsive photo grid (clinic interior, equipment, treatment in progress) with lightbox on click.

### 6.8 FAQ
Accordion, 8–10 questions covering: services offered, booking process, home visits, staff experience, first-appointment prep, session length, insurance, expected timeline to improvement.

### 6.9 Location / Contact
- Embedded Google Map iframe
- Address, phone, clinic timings table (weekday/weekend split)
- List of areas/localities served
- Secondary booking form (same component as hero, repeated before footer)

## 7. Booking Form

**Fields:**
- Full Name (required)
- Phone (required, validated as Indian mobile number)
- Condition (required, select dropdown — same list as Services section, plus "Other")
- Preferred Date & Time (required)
- Symptom notes (optional, textarea)

**Validation:** Zod schema, client + server-side. Phone must be a valid 10-digit Indian number (optionally with +91 prefix).

**Submit behavior (dual channel):**
1. Submit to `POST /api/book` → server action writes the lead as a new row to a Google Sheet (see §8).
2. On success, additionally open a `wa.me` deep link in a new tab with a prefilled message summarizing the same booking details (name, condition, preferred time), so the lead also lands in the clinic's WhatsApp inbox for immediate follow-up.
3. Show an inline success state ("Thanks, we'll confirm your slot shortly") — do not navigate away from the page.
4. On Sheet-write failure, still fire the WhatsApp deep link (WhatsApp is the fallback channel) and show a non-blocking warning.

## 8. Lead Backend — Google Sheets

- One Google Sheet, one tab ("Leads"), columns: `Timestamp | Name | Phone | Condition | Preferred Date/Time | Notes | Source Section`
- Auth: Google service account with edit access to the sheet, credentials stored as env vars (`GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`)
- Server-side only (`app/api/book/route.ts`) using `googleapis` npm package — never expose credentials to the client
- Rate-limit/basic bot protection: honeypot field + simple time-on-page check (no CAPTCHA in v1)

## 9. WhatsApp Integration

- Floating WhatsApp button (fixed, bottom-right, all sections) → `https://wa.me/<clinic-number>?text=Hi%2C%20I%27d%20like%20to%20book%20a%20physiotherapy%20consultation.`
- Header WhatsApp CTA → same link
- Booking form success → dynamic `wa.me` link with prefilled name/condition/time (see §7)
- Clinic WhatsApp number stored as a single config constant (`lib/config.ts`)

## 10. SEO

- Per-section metadata not applicable (single page) — set strong `<title>`, meta description, Open Graph/Twitter tags on the root layout
- JSON-LD structured data: `MedicalClinic` / `LocalBusiness` schema with name, address, phone, hours, geo, sameAs (social links)
- `sitemap.xml`, `robots.txt`
- Semantic heading hierarchy (single H1 in hero, H2 per section)
- Image alt text for gallery and treatment photos
- Fast LCP: hero image optimized via `next/image`, fonts self-hosted/subset

## 11. Non-Functional Requirements

- Fully responsive: mobile-first, tested at 375px / 768px / 1280px
- Accessibility: form labels, visible focus states, sufficient color contrast (WCAG AA), keyboard-navigable accordion/carousel
- Performance target: Lighthouse Performance/SEO/Accessibility ≥ 90
- Privacy: booking form collects phone + health-condition text — publish a Privacy Policy page and link it near the form's submit button ("By submitting, you agree to our Privacy Policy")

## 12. Content Inputs Needed From Clinic (before build can be finalized)

**Confirmed:**
- Clinic name: Thulasi Physiotherapy Clinic
- City/service area: Irugur, Coimbatore, Tamil Nadu
- Address (current): 9/46A, Ondipudur Road, Irugur Post, Irugur, Tamil Nadu 641103
  - (Superseded old address: 57, Dhiliban Valaagam, Under Bridge, Ondipudur Road, Irugur, Coimbatore – 641103 — do not use)
- Phone / WhatsApp (same number for both): 09944634491
- Clinic hours: opens 5:30 PM (per live Google Business listing, "Closed · Opens 5:30 pm" at time of check) — closing time and any morning shift still to be confirmed; using 5:30 PM – 9:00 PM as provided
- Founder: Dr. Prabhu Mehanathan, MPT (Ortho), CMT., MMTFI., MIAFT., MIAP., FOMT (Australia) — Consultant Physiotherapist (matches "Dr. Prabhu" referenced in live Google reviews)
- Confirmed services/conditions (20 items, used for both the Services section and booking form dropdown — see §6.3): Arthritis treatment, Back pain, Balance exercise therapy, Chiropractor, Foot and ankle pain, Geriatric physiotherapy, Heat therapy, Hip pain, Hydrotherapy training, Knee pain, Massage, Neurological physiotherapy, Orthopaedics, Paediatric physiotherapy, Physical therapy, Post-surgery, Post-surgical rehabilitation, Shoulder pain, Spinal injuries, Therapeutic exercise, Vestibular rehabilitation
- **Verified Google rating: 5.0 (64 reviews)**, live on Google Business Profile as of 2026-08-07 — use this (not the Justdial 66-rating figure) for the trust badge stat
- Verified address match: Google Business Profile confirms "9/46A, Ondipudur Road, Irugur Post, Irugur, Tamil Nadu 641103" — matches clinic-provided current address
- Google Maps embed link: https://maps.app.goo.gl/xphKT2Nwmf4SPvm96 — resolves directly to the clinic's live Google Business Profile listing (correct place, verified). Usable as-is for the "Get Directions"/"View on Google Maps" link. For the `<iframe>` map embed in §6.9, generate a proper embed src via Google Maps → Share → Embed a Map on this same listing (short links aren't valid iframe `src` values, but the destination is confirmed correct).
- Testimonials/gallery photos: use generic/default placeholders for v1 (per clinic instruction) — swap for real content later. Note: real Google reviews are live and skew toward neck pain, lower back pain (disc bulge), and shoulder pain cases — worth reflecting in placeholder testimonial copy for realism.
- Google Sheets lead-capture credentials: placeholder/test values provided (`test123` for both sheet ID and service-account key) — **not functional**. Build the `/api/book` integration against these as env var placeholders (`GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_KEY`), but the Sheets write will fail until real credentials are supplied — WhatsApp remains the working fallback channel in the meantime (see §7.4).

**Still needed (building with placeholders until provided):**
- Real Google Sheet ID + Google Cloud service account JSON key (with edit access to the sheet) to make lead capture functional
- Founder photo
- Patient count / years in operation (rating is now confirmed — see above)
- Social media links (Instagram, Facebook, YouTube, Google Business)
- Confirmation of exact clinic hours (closing time, any morning shift, days open)

## 13. Build Sequence

1. ✅ Scaffold Next.js + TypeScript + Tailwind + shadcn/ui
2. ✅ Design tokens, shared layout (header/footer), floating WhatsApp button
3. ✅ Hero + booking form UI (no backend yet)
4. ✅ `/api/book` route: Zod validation → Google Sheets write → response
5. ✅ Wire form submit: API call + WhatsApp deep link + success state
6. ✅ Stats strip, About, Services, Techniques, Why Choose Us sections
7. ✅ Testimonials carousel, Gallery, FAQ accordion
8. ✅ Location/Contact section with map + secondary form
9. ✅ Privacy Policy page
10. ✅ SEO pass: metadata, JSON-LD, sitemap, robots.txt
11. ✅ Responsive/accessibility/performance QA pass — verified desktop (1280px) and mobile (375px) layouts, mobile nav, form validation, dropdown, and the WhatsApp deep link flow in-browser; `tsc`, `eslint`, and `next build` all pass clean
12. ⬜ Content swap: replace placeholder copy/images (testimonials, gallery photos, founder photo, techniques list, patient-count stat) with real clinic content once supplied
13. ⬜ Replace placeholder Google Sheets credentials (`test123`/`test123`) with a real Sheet ID + service-account key so `/api/book` actually persists leads (WhatsApp fallback is fully working in the meantime)
14. ⬜ Generate a proper Google Maps **embed** src (Maps → Share → Embed a Map) to replace the interim `output=embed` query-string embed in `lib/config.ts`

### Notable fix made during QA
The booking form originally called `window.open()` for the WhatsApp deep link *after* `await fetch(...)` to the Sheets API. Browsers treat that as breaking the user-gesture chain and silently block it as a popup. Fixed in [booking-form.tsx](src/components/sections/booking-form.tsx) by opening a blank window synchronously on click, then setting its `location.href` once the WhatsApp message is built — before the async Sheets call runs. Verified the fix opens WhatsApp reliably with the correct prefilled message.
