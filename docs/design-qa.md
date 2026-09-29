# Rumo — Personal Atlas visual QA

## Result

- **Status:** passed
- **Reviewed:** 29 September 2026
- **Reference:** selected Personal Atlas option 1 concept
- **Reference size:** 853 × 1844 px, normalized to 390 × 844 px for comparison
- **Implementation capture:** final dashboard review artifact (kept outside the repository)
- **Viewport:** 390 × 844 CSS px at 1× density
- **State:** English dashboard, synthetic Dandara profile

## Comparison record

The first implementation pass preserved the intended route/evidence hierarchy but
was too tall: the greeting wrapped, the route card began roughly 110 px later
than the reference, and the primary action fell below the mobile viewport. The
second pass reduced header, card, route, list, and action spacing while keeping
mobile body copy at 14 px or above. The final 390 × 844 capture shows the route,
evidence states, next action, primary action, and persistent navigation together.

## Surface checks

- **Hierarchy:** one route summary and one dominant next action; secondary content recedes.
- **Typography:** Newsreader carries editorial orientation; Manrope carries controls and evidence.
- **Spacing:** compact mobile rhythm; wider breakpoints expand without changing task order.
- **Colour and tokens:** warm paper, deep ink, Atlantic cobalt, and restrained terracotta remain consistent.
- **Shape:** flat evidence rows and moderate corners replace repeated generic cards and shadows.
- **Copy:** Dandara, Luanda origin, evidence uncertainty, prototype boundary, and bilingual labels are preserved.
- **Assets:** the optional skyline illustration was omitted because the route system already provides orientation.
- **Brand-Off:** route position, evidence markers, editorial type, and origin/destination language remain recognizable without the wordmark.

## Responsive and accessibility evidence

- Captured all eight routes in Portuguese and English at 360 × 800, 390 × 844,
  768 × 1024, and 1440 × 1000.
- No horizontal overflow was detected in the 64 captures.
- Direct English routes restore `lang="en"`; a regression test covers this.
- The complete value-first journey was exercised from landing through onboarding,
  analysis, prototype save, and dashboard.
- Icon-only controls have accessible names; visible focus, 44 px targets, reduced
  motion, non-blocking intro, and session-only profile storage are retained.
- The browser console reported no warnings or errors during the final journey.

## Intentional differences from the reference

The implementation uses a simpler dotted route instead of the reference's curved
map path and does not reproduce its skyline. These are intentional P3 differences,
not release blockers: the production direction prioritizes task clarity and the
existing route mark over decorative fidelity.

No P0, P1, or P2 visual issues remain in this review.
