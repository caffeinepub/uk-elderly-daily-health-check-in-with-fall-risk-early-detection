# Specification

## Summary
**Goal:** Build a UK-focused daily health check-in app for adults 65+ that captures basic fall-risk context, collects daily signals, and returns a transparent rules-based fall-risk result with accessible guidance and history.

**Planned changes:**
- Add Internet Identity sign-in and an onboarding flow to collect and store a minimal fall-risk profile (blocking users under 65 with a clear message).
- Create a once-per-UK-calendar-day check-in form, persist submissions, prevent duplicates, and allow viewing the submitted answers for that day.
- Implement a deterministic, configurable, rules-based fall-risk assessment (score 0–100, Low/Medium/High, contributing factors) and expose it via backend API.
- Show non-alarming, UK-appropriate guidance (GP/NHS 111) with persistent medical disclaimer; add informational pages (About, How it works, Privacy).
- Add a history view to review past check-ins and risk levels (e.g., last 30) with accessible, high-contrast summaries and day detail screens; use React Query with loading/error states.
- Add accessibility-focused UI settings (text size and contrast toggle) persisted locally, plus a consistent theme that avoids a blue & purple primary palette.
- Implement Motoko stable storage and APIs for per-user profile/check-ins with principal-based isolation, validation, and friendly error handling.
- Add generated static branding/usability images as frontend static assets and render them in the UI.

**User-visible outcome:** Users 65+ in the UK can sign in, complete onboarding, submit one daily check-in, see a clear fall-risk score/level with contributing factors and guidance, review past entries, adjust accessibility settings, and read About/How-it-works/Privacy pages.
