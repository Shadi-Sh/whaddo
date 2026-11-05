# Whaddo? — MVP Scope

**Version:** 0.1  
**Status:** Draft — Initial scope agreed, pending user validation

## 1. MVP Goal

The first MVP of Whaddo? aims to help users identify suitable recreational or productive activities based on their available time and current circumstances.

The MVP will validate whether context-based recommendations help users make activity decisions more easily.

## 2. MoSCoW Prioritization

### Must Have

- **F01 — Activity Type:** Choose between hobbies and chores.
- **F02 — Available Time:** Specify the available duration.
- **F03/F04 — Basic Context:** Provide basic information about location and/or available equipment using predefined options, with optional free-text input.
- **F05 — Recommendations:** Receive suitable recommendations from a small, curated activity catalog.
- **F11 — Core Fallback:** Receive recommendations without depending on AI availability.
- **F12 — Activity Selection:** View the relevant details and select an activity.

### Should Have

- **F06 — Save for Later:** Save interesting activities to a personal collection.
- **F07 — Discovery:** Discover activities beyond the user's personal collection.
- **F09 — AI Interpretation:** Interpret free-text contextual information using AI.
- **F10 — Swipe Interface:** Browse activity cards through swipe gestures.
- **Detailed Context Matching:** Improve the interpretation of location and equipment.

### Could Have

- **F08 — Group Activities:** Specify the number of participants and receive group-appropriate recommendations.

### Won't Have — Initial MVP

- Social networking and messaging
- External activity bookings
- Complex project and task management
- Advanced personalization based on user history

## 3. Recommendation Strategy

Whaddo? will use a hybrid recommendation approach.

The initial MVP will use deterministic matching against a small activity catalog. AI-assisted interpretation and generation may be added without making the core experience dependent on an external AI service.

If no activities match, the system should explain the situation and allow users to revise their inputs.

In a later iteration, an optional AI fallback may generate additional suggestions, which must be validated against relevant user constraints before display.

## 4. MVP Acceptance Checklist

The first end-to-end demonstration will be considered successful if a user can:

- [ ] Choose between hobbies and chores.
- [ ] Specify their available time.
- [ ] Provide basic location and/or equipment information.
- [ ] Receive matching activities when suitable catalog entries exist.
- [ ] View the estimated duration and required resources of an activity.
- [ ] Select an activity they want to try.
- [ ] Receive a clear message when no suitable activity is available.
- [ ] Complete the core journey without AI.

## 5. Open Questions

- Which location and equipment categories should the MVP support?
- How should unsupported free-text values be handled without AI?
- How many activities should the initial catalog contain?
- What should happen after a user selects an activity?
- How should recommendation relevance be measured during user testing?

## 6. Validation Status

This scope reflects initial product decisions and has not yet been validated through user interviews or usability tests.

The priorities may change as evidence becomes available.
