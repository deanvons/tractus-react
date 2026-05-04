# Tractus Frontend

> **main — project scaffold** | Tractus Frontend · Web Dev Bootcamp

A React + TypeScript SPA that consumes the Tractus personal training API.
This branch is the starting point — a clean Vite scaffold with no domain
code yet. Every subsequent branch builds on this foundation one concept at
a time.

This project is the reference implementation for the frontend module of a
web development bootcamp. The teacher and Claude build it together between
lessons. Students read it between classes and complete their own assignments
separately.

---

## 🗺️ Contents

- [Branch sequence](#-branch-sequence)
- [What this project builds](#-what-this-project-builds)
- [What's in the scaffold](#-whats-in-the-scaffold)
- [Running this branch](#-running-this-branch)
- [Challenges for students](#-challenges-for-students)
- [Thought pieces for next time](#-thought-pieces-for-next-time)

---

## 📍 Branch sequence

| Branch | What it introduces | Abstraction level |
|---|---|---|
| `📌 main` | **Vite + React scaffold, no domain** | Scaffold only |
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

> Phases 01–07 use only the public exercise API — no login required.
> The auth wall arrives in phase 08, once React fundamentals are solid.

---

## 🏋️ What this project builds

The core workflow:

> Browse exercises → create a session → add exercise entries → mark entries done → view history

The exercise library is public. Sessions and entries require a login.
Everything is backed by the Tractus REST API — see [`docs/PRD.md`](docs/PRD.md)
for the full feature scope and user stories.

---

## 🔍 What's in the scaffold

**[`index.html`](index.html)**
The single HTML file the browser loads. There is one `<div id="root">` — this
is the mount point React takes over. Everything rendered by the app lives
inside this element. The browser never navigates to a new HTML file after
this point — that is what makes it a Single Page Application.

**[`src/main.tsx`](src/main.tsx)**
The entry point. `createRoot` hands React control of the `#root` div and
calls `render` with the top-level `<App />` component. `StrictMode` wraps
the whole tree — it runs component lifecycle methods twice in development
to surface bugs caused by side effects. It has no effect in production.

**[`src/App.tsx`](src/App.tsx)**
The default Vite welcome screen. This file will be replaced in phase 01.
For now it is the only component — the entire app is one file.

**[`src/index.css`](src/index.css)** and **[`src/App.css`](src/App.css)**
Global and component-scoped styles from the Vite template. These will be
replaced or stripped down as the project takes shape.

**[`vite.config.ts`](vite.config.ts)**
Vite's build and dev server configuration. The `@vitejs/plugin-react` plugin
enables JSX transformation and React Fast Refresh during development.

**[`tsconfig.app.json`](tsconfig.app.json)**
TypeScript configuration for the application source. `strict: true` is on —
type errors are errors, not warnings. This will matter from phase 01 onward.

---

## ▶️ Running this branch

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`. No backend required on this branch —
there is no API call yet.

---

## ✏️ Challenges for students

**Challenge 1 — Analytical**
Open `index.html`. There is almost nothing in it — one `<div id="root">` and
a script tag. Open the browser DevTools and inspect the DOM after the page
loads. What is now inside `#root`? Where did it come from? Trace the path
from `index.html` → `main.tsx` → `App.tsx` and describe what each file
contributes.

**Challenge 2 — Analytical**
`StrictMode` causes React to call certain functions twice in development.
Add a `console.log('rendered')` to `App.tsx` and run the dev server. How
many times does it log on the first render? Why? What is React trying to
catch by doing this?

**Challenge 3 — Analytical**
This is called a Single Page Application. Open the Network tab in DevTools
and observe the requests as the page loads. How many HTML documents does the
browser request? What does that tell you about how navigation will work once
React Router is introduced in phase 05?

---

## 💭 Thought pieces for next time

1. The `App.tsx` file contains JSX — HTML-like syntax inside a TypeScript
   file. The browser cannot run this directly. What has to happen to it
   before it reaches the browser, and who does that work?
2. React renders a *component tree*. Right now there is only one component:
   `App`. What would it mean to split the UI into smaller components, and
   what problem would that solve?
3. The data we want to display — exercises from the Tractus API — is not in
   any of these files. Where does it live right now, and how will it get
   into the component?

---

*Next branch: [`phase-01_react_jsx-and-components`]*
