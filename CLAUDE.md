# Tractus Frontend — project context for Claude

This file is read by Claude Code at the start of every VS Code session.
It contains all project decisions, architectural context, and teaching
guidelines needed to continue work without re-explaining anything.

---

## Product requirements

See [docs/PRD.md](docs/PRD.md) for the full feature scope, user stories, and data model.
Do not build features not listed in docs/PRD.md.

---

## What this project is

A React frontend for the Tractus personal training API. It is a standalone
teaching project — separate repo, separate deployment, separate lesson track.

The primary teaching goal is **React and SPA framework concepts**. The
Tractus API is the domain — it gives students something real to build
against — but what students are learning is how SPAs work: component
model, state, routing, data fetching, auth flows, deployment.

The frontend consumes the Tractus REST API. It does not care which backend
stack is underneath (Spring Boot, ASP.NET, Qt). The API contract — the
OpenAPI spec — is the only coupling between this project and the backend.

This is also the reference implementation for the frontend module of a web
development bootcamp. The teacher and Claude build it together between
lessons. Students observe and discuss the reference codebase in class and
complete their own assignments separately.

**Scaffolding:** The project is created with `npm create vite@latest` using
the React template. No Create React App, no Next.js — this is a pure SPA
track and SSR is out of scope.

---

## How this project is built

**The teacher and Claude are the only ones editing this codebase.**

Claude Code should generate freely and efficiently. The constraint is not
about how much to generate — it is about staying within the abstraction
level of the current branch. Check the current branch name before
generating anything. Do not use abstractions that have not been introduced
yet in the sequence.

Each branch is a clean, working checkpoint that the teacher steps through
in class. The git history is the course outline. Branch names are lesson
titles.

---

## The teaching philosophy

Abstractions should be earned, not handed out.

Students see plain fetch calls before React hooks. They see component state
before a state library. They see a hardcoded token before an auth flow. By
the time a library does something for them, they understand what it is
replacing and why it exists.

The framing used consistently throughout:
> "This is plumbing. The library is automating tedious repetition.
> Make sure you know what it is doing before you let it."

This same framing applies at every level:
- fetch abstracts raw HTTP sockets
- React abstracts DOM manipulation
- React Router abstracts URL/history management
- A context provider abstracts prop drilling
- An auth library abstracts token lifecycle management

Each reveal is a moment to pause and ask: what would we have to write
if this did not exist?

**One to two topics per phase maximum.** Students can only absorb so much
per lesson. If a feature requires understanding something not yet introduced,
it belongs in a later phase. No payoff in this phase = defer.

---

## The frontend as a teaching tool for the backend

The frontend is not just a UI. It is a lens that exposes:

- **API gaps** — endpoints that seemed complete in Postman feel wrong when
  a real UI has to consume them. Response shapes, error formats, and missing
  endpoints surface here.
- **Design decisions** — pagination, search, filtering. The backend has to
  support what the frontend needs. Many backend decisions are only visible
  once a consumer exists.
- **Security in context** — token storage, refresh flows, CORS, and the
  real OAuth redirect flow only make sense with a frontend in the picture.
  ROPC (used in backend-only phases for Postman testing) disappears here.
  Auth code + PKCE is the only correct flow when a browser is involved.
- **Deployment concerns** — the frontend and backend are separate artifacts
  with separate pipelines. CORS is the first concrete evidence of this.

Use these moments explicitly in class. The friction is the lesson.

### How to flag an API learning moment

When we hit a point where the frontend reveals an API gap or a questionable
design decision, flag it explicitly with this format in the session notes,
README, or a code comment:

```
// API LEARNING MOMENT:
// The frontend needs X but the API currently does/doesn't Y.
// This is worth discussing in class — what would we change and why?
```

In the branch README, include a dedicated callout under a heading like:
**"What the frontend revealed"** — one or two sentences on the gap, why it
matters, and what a better API design might look like.

API gaps also belong in the **Challenges for students** section (section 14
of the README structure). Many challenges are analytical — "what would you
change about this endpoint and why?" is exactly the right level of question
for that section. Use it. A gap that surfaces naturally in the code is a
better analytical prompt than a contrived one.

These moments are first-class teaching content. Do not paper over them with
workarounds without naming what the workaround is and why it exists.

**Known API gaps identified so far:**

- `GET /sessions` returns all sessions with no owner filter — once auth is
  added, the backend will need to scope sessions to the logged-in user.
- Sessions have no `status` field — "finished" is a UI-only concept for now.
  A future backend phase could add a `PATCH /sessions/{id}/finish` endpoint.
- No workout plan / template concept — sessions are standalone. If students
  want reusable templates the backend would need a new resource.

---

## Code comment style

Since students read the reference implementation between classes, comments
are part of the lesson material. Write comments that explain why, not what.
Point forward to what will replace this in a later branch.

**Do this:**
```js
// We are attaching the token manually here — in a later phase
// an auth interceptor will handle this for every request automatically.
// For now we want the pattern visible before it disappears.
```

**Not this:**
```js
// add auth header
headers['Authorization'] = `Bearer ${token}`;
```

---

## API contract

The frontend consumes the Tractus REST API.

- **Backend repo:** Tractus Spring Boot (separate repo)
- **Local backend:** `http://localhost:8080`
- **OpenAPI spec:** `http://localhost:8080/v3/api-docs` (backend must be running)
- **Swagger UI:** `http://localhost:8080/swagger-ui/index.html`

The OpenAPI spec is the contract. The frontend should not know or care about
Spring Boot, JPA, or Postgres. If the backend is swapped for ASP.NET or Qt,
the frontend should not change — only the base URL in config.

**Authentication:** Keycloak at `http://localhost:8081/realms/tractus`
- Client: `tractus-app` (public client, auth code + PKCE in production)
- Dev testing: direct access grants (ROPC) acceptable in Postman only
- Frontend must use auth code + PKCE — never embed credentials in browser code

---

## Branch naming convention

```
phase-[NN]_[topic]_[implementation-detail]
```

---

## Branch sequence

| Branch | What it introduces | Abstraction level |
|---|---|---|
| `main` | Vite + React scaffold, no domain | Scaffold only |
| `phase-01_react_jsx-and-components` | JSX, first component, static render | Static markup |
| `phase-02_react_props-and-lists` | Props, component tree, rendering lists, keys | Hardcoded data |
| `phase-03_react_state-and-events` | `useState`, event handlers, local interactivity | Hardcoded data |
| `phase-04_react_effects-and-fetch` | `useEffect`, fetch, lifecycle, loading/error state | Live API data |
| `phase-05_routing_react-router` | React Router, multi-page SPA, route params, nav | Live API data |
| `phase-06_forms_controlled-inputs` | Controlled inputs, filter form, form submission | Live API data |
| `phase-07_react_hoc-pattern` | Higher-order components, `withLoading` wrapper | Live API data |
| `phase-08_auth_keycloak-pkce` | Keycloak, auth code + PKCE, login/logout | Auth wall |
| `phase-09_auth_protected-routes` | HOC as auth guard, redirect to login, token header | Auth wall |
| `phase-10_sessions_crud` | Create session, session list, session detail | Auth + API |
| `phase-11_sessions_entries-and-done` | Add entries, mark done, progress indicator | Auth + API |
| `phase-12_state_redux` | Redux, global auth state, session state | Redux |

> The public arc (phases 01–07) uses exercise data only — no auth required.
> Auth is introduced in phase 08 once students are fluent in React fundamentals.
> Do not plan beyond phase 12 until the sequence is complete — the frontend
> will reveal gaps that change the plan.

---

## README structure

Every branch README follows the template in [README.template.md](README.template.md).
Do not deviate from it.

Sections in order:
1. Phase title and one-line summary
2. Preamble — what problem this phase solves, max two paragraphs
3. Scope note (optional — only when the phase is narrower than it looks)
4. Table of contents
5. Branch sequence table (full, with current phase marked)
6. Resolving the thought pieces — 2-4 questions from the previous branch, answered here
7. Why we made this decision — key architectural or design choice
8. What we built in the previous branch
9. What we're doing in this branch — bullet list, concrete
10. The abstraction we earned — one paragraph, what the layering bought us
11. Learning goals — Bloom's taxonomy (Understand / Apply / Analyze / Evaluate)
12. Key concepts — table, plain English definitions
13. What to notice in the code — file-by-file callouts with links
14. What the frontend revealed — API gaps and learning moments (omit if none)
15. Running this branch
16. Challenges for students — 3-5, mix of analytical and additive
17. Thought pieces for next time — 2-4 open questions this phase raises
18. Previous / next branch footer

---

## Learning objectives format

Objectives follow Bloom's taxonomy. Verbs indicate the expected cognitive
level: Remember → Understand → Apply → Analyze → Evaluate → Create.
Early phases are heavier on Remember and Understand. Later phases shift
to Analyze and Evaluate.

---

## Challenge solutions

Every branch that has additive challenges must include reference solution commits
before it is pushed. Commit each solution separately so the git history is
readable.

- **Additive challenges** — implement the code and commit it
- **Analytical challenges** — no commit needed; these are class discussion material
- **Mixed challenges** (analytical question + code extension) — implement the
  code part; the analytical part is discussed in class

Solution commits are the first commits on the new branch, before the README
and feature commits. The pattern per branch is: solution commits (previous
phase's challenges) → README → feature commits.

---

## What to avoid

- Do not put code blocks in README files for teaching purposes — use prose and
  point students to the actual files via "What to notice in the code". The only
  acceptable code blocks in a README are operational commands (npm run dev, etc.)
- Do not use abstractions ahead of the current branch
- Do not install a library before showing what it replaces
- Do not commit tokens, secrets, or API keys
- Do not write comments that describe what the code does — explain why
  and point forward to what will replace it in a later branch
- Multiline comments must use block comment style `/* */` so they are
  collapsible in VS Code. Use `// single line` only for one-liners.
  Inside JSX, `{/* */}` is valid but only inside a parent element — never
  at the root of a return statement. Place block comments above the return.
- Do not add packages or patterns before the phase that introduces them
- One to two topics per phase — if you are adding a third, stop and defer

---

## Current status

Update this section at the end of each working session — one sentence
on where you left off and what the next task is.

Not started. Frontend repo does not exist yet. Next step: plan the phase
sequence organically, then scaffold with `npm create vite@latest`.
Primary teaching goal is React and SPA concepts — Tractus API is the domain vehicle.
