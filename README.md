# Tractus Frontend

> **Phase 01 — JSX and Components** | Tractus Frontend · Web Dev Bootcamp

React applications are built from components — functions that return markup.
This phase introduces JSX, the syntax that makes that possible, and the
concept of a component as the fundamental unit of a React UI.

We build one thing: a static `ExerciseCard` that renders hardcoded exercise
data. No props, no state, no data fetching. The goal is to get the anatomy
of a component completely clear before anything else is layered on top.

---

## 🗺️ Contents

- [Branch sequence](#-branch-sequence)
- [Resolving the thought pieces](#-resolving-the-thought-pieces)
- [Why JSX](#-why-jsx)
- [What we built in the previous branch](#-what-we-built-in-the-previous-branch)
- [What we're doing in this branch](#-what-were-doing-in-this-branch)
- [The abstraction we earned](#-the-abstraction-we-earned)
- [Learning goals](#-learning-goals)
- [Key concepts](#-key-concepts)
- [What to notice in the code](#-what-to-notice-in-the-code)
- [Running this branch](#-running-this-branch)
- [Challenges for students](#-challenges-for-students)
- [Thought pieces for next time](#-thought-pieces-for-next-time)

---

## 📍 Branch sequence

| Branch | What it introduces | Abstraction level |
|---|---|---|
| `main` | Vite + React scaffold, no domain | Scaffold only |
| `📌 phase-01_react_jsx-and-components` | **JSX, first component, static render** | Static markup |
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

---

## ✅ Resolving the thought pieces

### JSX has to be transformed before the browser sees it

JSX is not valid JavaScript. A browser cannot parse `<ExerciseCard />` — it
only understands standard JS. Vite runs a compiler (via `@vitejs/plugin-react`)
that transforms JSX into `React.createElement(...)` calls before the code is
served or bundled. The JSX you write is a convenient authoring format;
what runs in the browser is plain function calls.

### Splitting into components solves the single-file problem

Right now the entire app is `App.tsx`. As the UI grows, one file becomes
unmanageable — hard to read, hard to test, impossible to reuse. A component
is a function with a clear responsibility: render one piece of the UI given
the data it needs. Splitting into components creates boundaries. Each piece
can be understood in isolation.

### The exercise data lives in the API

The Tractus backend exposes a `GET /exercises` endpoint. Right now that data
is not in any of our files — it lives in a database the API sits in front of.
Getting it into a component is a two-step problem: fetch it over HTTP, then
pass it to the component that renders it. Both of those steps come in later
phases. For now we hardcode the data directly in the component so the
component itself is the only new concept.

---

## 💡 Why JSX

Writing UIs as function calls is correct but unreadable:

```js
React.createElement('div', { className: 'card' },
  React.createElement('h2', null, 'Back Squat'),
  React.createElement('p', null, 'Legs')
)
```

JSX is syntactic sugar over exactly this. The component you write:

```jsx
function ExerciseCard() {
  return (
    <div className="card">
      <h2>Back Squat</h2>
      <p>Legs</p>
    </div>
  )
}
```

compiles to the `createElement` calls above. JSX exists to make the structure
of the UI visible at a glance. It is not HTML — it is a notation for
describing a tree of React elements.

---

## ⏮️ What we built in the previous branch

The `main` branch is a Vite + React + TypeScript scaffold. It renders the
default Vite welcome screen from a single `App.tsx` file. No domain code,
no Tractus data, no structure — just a working build pipeline and a mount
point in `index.html`.

---

## 🎯 What we're doing in this branch

- Strip the Vite default content from `App.tsx` and `App.css`
- Write a static `ExerciseCard` component with hardcoded exercise data
- Render `ExerciseCard` from `App`

---

## 🏆 The abstraction we earned

> A component is a function that returns JSX. That is the whole model.
> Everything React does — state, effects, context, routing — is built on top
> of this one idea. Getting it completely clear now means every later concept
> has a solid foundation to attach to.

---

## 🧑🏻‍🏫 Learning goals

### Understand
- **Explain** what JSX is and why it needs to be compiled before reaching the browser.
- **Describe** the relationship between a React component and the DOM element(s) it produces.

### Apply
- **Write** a React function component that returns valid JSX.
- **Render** a component from another component.

### Analyze
- **Identify** the differences between JSX and HTML (className vs class, self-closing tags, expressions in `{}`).
- **Trace** the path from a JSX expression to the DOM node it produces.

---

## 🔑 Key concepts

| Concept | Plain English |
|---|---|
| **JSX** | A syntax extension that lets you write HTML-like markup inside JavaScript. It is compiled to `React.createElement` calls before the browser sees it. |
| **Component** | A function whose name starts with a capital letter and returns JSX. React calls this function to know what to render. |
| **`className`** | The JSX equivalent of HTML's `class` attribute. JSX uses camelCase because `class` is a reserved word in JavaScript. |
| **Expression in `{}`** | Any JavaScript expression inside curly braces is evaluated and its result is rendered. `{2 + 2}` renders `4`. |
| **Single root element** | A component must return a single root element. Use a `<div>` or a Fragment (`<>...</>`) to wrap multiple siblings. |

---

## 🔍 What to notice in the code

**[`src/components/ExerciseCard.tsx`](src/components/ExerciseCard.tsx)**
The component is a plain function — no class, no lifecycle methods, nothing
special. It returns JSX describing one exercise. The data is hardcoded inside
the function body. In phase 02 this hardcoded data will be replaced by props
passed in from the parent — but the component itself will barely change.

**[`src/App.tsx`](src/App.tsx)**
`App` renders `<ExerciseCard />` the same way it would render any HTML element.
The capital letter is how React knows to call the function rather than look for
a built-in HTML tag named `exercisecard`.

---

## ▶️ Running this branch

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`. No backend required — all data is hardcoded.

---

## ✏️ Challenges for students

**Challenge 1 — Analytical**
Open DevTools and inspect the rendered HTML. Find the `ExerciseCard` component
in the DOM. Is there a `<ExerciseCard>` element? What does the browser actually
see? What does this tell you about what React components are?

**Challenge 2 — Analytical**
JSX looks like HTML but it is not. Find three ways JSX differs from HTML in
this codebase. For each one, explain why the difference exists.

**Challenge 3 — Additive**
Create a second component: `ExerciseDetail`. It should display all the fields
an exercise has — name, category, movement pattern, primary muscle, laterality,
and SI risk. Hardcode a different exercise than `ExerciseCard` uses. Render
both components side by side in `App`.

**Challenge 4 — Analytical**
A component must return a single root element. What happens if you try to
return two sibling elements without a wrapper? Fix it using a Fragment
(`<>...</>`) instead of a `<div>` and observe the difference in the rendered
DOM.

---

## 💭 Thought pieces for next time

1. `ExerciseCard` has one exercise hardcoded inside it. If we want to render
   ten different exercises, what would we have to do? Is there a better way?
2. The list of exercises in the UI should match the list in the API. Right now
   there is no connection between the two. What would that connection look like
   in code?
3. Some UI elements appear in every view — a header, a nav bar, a footer. Where
   would those live in a component tree, and how would they relate to components
   like `ExerciseCard`?

---

*Previous branch: [`main`]*
*Next branch: [`phase-02_react_props-and-lists`]*
