# Whaddo?

**Whaddo?** is an activity discovery app designed to help people answer a simple question: *What should I do right now?*

Whether someone has 15 minutes between lectures or an entire afternoon free, Whaddo? aims to suggest activities that fit their available time, environment, and resources.

## The Idea

Whaddo? helps users:

- Find suitable hobbies or productive activities.
- Discover new things to try.
- Spend less time deciding what to do.
- Save interesting activities for later.

## How It Will Work

Users provide basic information about their situation, such as:

- **Activity type:** Hobby or chore
- **Available time:** How much time they have
- **Environment:** Where they are
- **Resources:** Equipment or materials they have available

Whaddo? then recommends activities based on these constraints.

The initial MVP will focus on a curated activity catalog and deterministic recommendations. AI-assisted features are planned as optional enhancements.

## Project Status

**Phase: Frontend initialization, Requirements Engineering & UX Design**

The React + TypeScript + Vite frontend includes an Activity Setup form for choosing Hobby or Chore and entering available time. Valid submissions display a summary; recommendations have not yet been implemented.

## Local Development

Use Node.js 20 or 22+ and npm. A maintained Node.js LTS release is recommended.
The scaffold uses Vite 6 for compatibility with the initial development environment (Node.js 20.2).

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

Available commands:

- `npm run dev` — start the development server with React Fast Refresh.
- `npm run type-check` — check TypeScript without generating files.
- `npm test` — run the automated form interaction tests with Vitest and jsdom.
- `npm run build` — type-check and create a production build in `dist/`.
- `npm run preview` — serve the production build locally after building.

The app starts in `src/main.tsx`, renders the Activity Setup form in `src/App.tsx`, and uses
`src/styles.css` for shared styles. `vite.config.ts` configures the React plugin;
`tsconfig.json` enables strict checks for the app and Vite configuration.

## Documentation

- [User Needs](docs/product/user-needs.md)
- [Functional Requirements](docs/product/requirements-draft.md)
- [User Stories](docs/product/user-stories.md)
- [MVP Scope](docs/product/mvp-scope.md)
- [Recommendation Process — BPMN](docs/diagrams/whaddo-recommendation-process.drawio.png)

## Roadmap

- [x] Define initial user needs and requirements
- [x] Prioritize MVP features
- [x] Model the recommendation process
- [ ] Design wireframes and user flows
- [ ] Implement the first MVP
- [ ] Test with pilot users

## About

Whaddo? is a personal software engineering project exploring product discovery, requirements engineering, UX design, and context-aware activity recommendations.
