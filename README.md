# Tractus Frontend

> **Phase 04 — Effects and Fetch** | Tractus Frontend · Web Dev Bootcamp

`useEffect` and `fetch` replace the hardcoded exercise data with a live call to
the Tractus API.

The hardcoded array in `ExerciseList` was always a stand-in. It let us focus on
props, lists, and state without the complexity of asynchronous data. That
complexity arrives now. A component that fetches data must handle three distinct
states: loading (the request is in flight), error (something went wrong), and
success (data has arrived). Each state needs a UI response. Managing all three
with `useState` and `useEffect` is the pattern you will reach for every time a
component needs external data.

We also take a first step toward separation of concerns: once the fetch is
working inline, we extract it into a service module. The component should not
care how data is fetched — only that it receives an array of exercises. The
service owns the how; the component owns the what to render.

> **A note on scope.** This phase introduces `useEffect` only for data
> fetching on mount — the empty dependency array case. The full behaviour of
> the dependency array and cleanup functions will be explored further as the
> app grows. For now, the focus is on the fetch lifecycle and what the UI must
> do while it waits.

---

## 🗺️ Contents

- [Branch sequence](#-branch-sequence)
- [Resolving the thought pieces](#-resolving-the-thought-pieces)
- [Why inline first, then extract](#-why-inline-first-then-extract)
- [What we built in the previous branch](#-what-we-built-in-the-previous-branch)
- [What we're doing in this branch](#-what-were-doing-in-this-branch)
- [The abstraction we earned](#-the-abstraction-we-earned)
- [Learning goals](#-learning-goals)
- [Key concepts](#-key-concepts)
- [What to notice in the code](#-what-to-notice-in-the-code)
- [What the frontend revealed](#-what-the-frontend-revealed)
- [Running this branch](#-running-this-branch)
- [Challenges for students](#-challenges-for-students)
- [Thought pieces for the next branch](#-thought-pieces-for-the-next-branch)

---

## 📍 Branch sequence

| Branch | What it introduces | Abstraction level |
|---|---|---|
| `main` | Vite + React scaffold, no domain | Scaffold only |
| `phase-01_react_jsx-and-components` | JSX, first component, static render | Static markup |
| `phase-02_react_props-and-lists` | Props, component tree, rendering lists, keys | Hardcoded data |
| `phase-03_react_state-and-events` | `useState`, event handlers, local interactivity | Hardcoded data |
| `📌 phase-04_react_effects-and-fetch` | **`useEffect`, fetch, lifecycle, loading/error state** | Live API data |
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

### State is local — what happens when the user navigates away?

Still deferred — navigation does not exist yet. This becomes concrete in phase
05 when React Router is introduced. At that point, losing state on navigation is
real and the question of where to preserve it is worth discussing properly.

### What should the UI show while data is loading?

We resolve it here. The component holds three pieces of state — `isLoading`,
`error`, and `exercises` — and renders a different UI depending on which is
active. This is the standard pattern for async data in React before any library
abstracts it.

### Threading callbacks through many levels

Still deferred — the component tree is still shallow enough that prop drilling
is not painful. Phase 12 (Redux) is where global state management replaces
threading. Holding the question open until the friction is real is deliberate.

---

## 💡 Why inline first, then extract

Writing the fetch call directly inside `ExerciseList` makes every step visible:
where the effect runs, how state is updated at each stage, what the component
renders in between. Hiding it in a function from the start would obscure the
mechanics at the moment students most need to see them.

Once it is working, extracting the fetch to a service module is a refactor with
a clear motivation — the component should not care how data is fetched, only
that it receives exercises. That separation becomes load-bearing when a second
component needs the same data. Writing the service before that moment would be
premature; writing it after is earned.

---

## ⏮️ What we built in the previous branch

Phase 03 introduced `useState` and event handlers. `ExerciseList` tracks which
exercise is selected; `ExerciseListItem` reports clicks via a callback prop and
highlights itself when selected. The data was still a hardcoded array — the
component tree was interactive but not connected to anything real.

---

## 🎯 What we're doing in this branch

- Replace the hardcoded `exercises` array with `useState` holding `Exercise[]`
- Add `isLoading` and `error` state to `ExerciseList`
- Add a `useEffect` that fires on mount and fetches `GET /exercises`
- Render loading and error states conditionally
- Refactor the fetch call into `src/services/exerciseService.ts`

---

## 🏆 The abstraction we earned

> `useEffect` is the hook that connects a component to the world outside React.
> Without it, a component can only respond to props and state — it has no way
> to reach out to an API, set up a subscription, or do anything that has a
> side effect. Every data-fetching pattern you will encounter — React Query,
> SWR, custom hooks — is built on top of `useEffect`. Understanding what it
> does before a library wraps it is what makes those abstractions legible later.

`useEffect` is the second hook we have used. Like `useState`, it is a function
React provides that gives a component access to something it could not reach as
a plain function — in this case, the component's lifecycle. The empty dependency
array `[]` tells React to run the effect once, after the first render. That is
the mount. We will encounter other dependency array patterns as the app grows.

---

## 🧑🏻‍🏫 Learning goals

### Understand
- **Explain** what a side effect is and why React isolates them inside `useEffect`.
- **Describe** the three states a data-fetching component must handle: loading,
  error, and success.

### Apply
- **Use** `useEffect` with an empty dependency array to fetch data on mount.
- **Update** multiple pieces of state in sequence as a fetch moves through its
  lifecycle.
- **Render** different UI conditionally based on loading and error state.

### Analyze
- **Examine** what the component renders at each stage of the fetch lifecycle —
  before the effect runs, while the request is in flight, and after it settles.
- **Identify** why the fetch cannot be called directly in the component body
  and must live inside `useEffect`.

### Evaluate
- **Assess** the tradeoff between keeping fetch logic inline and extracting it
  to a service — when does the extraction pay off, and when is it premature?

---

## 🔑 Key concepts

| Concept | Plain English |
|---|---|
| **`useEffect`** | A hook that runs code after a component renders. Used for side effects — anything that reaches outside React, like a fetch call, a timer, or a DOM manipulation. |
| **Side effect** | Any operation that affects something outside the component — an API call, a console log, a DOM update. React separates side effects from rendering deliberately. |
| **Dependency array** | The second argument to `useEffect`. Controls when the effect re-runs. An empty array `[]` means run once on mount. Omitting it means run after every render. |
| **Mount** | The moment React first renders a component into the DOM. The empty-array `useEffect` fires once at this point. |
| **Loading state** | A boolean that is `true` while a request is in flight. Used to show a spinner or placeholder so the user knows something is happening. |
| **Error state** | A value that holds an error message (or `null`) after a failed request. Used to show feedback and prevent rendering broken UI. |
| **Service module** | A plain TypeScript file that owns the details of how data is fetched — the URL, the response shape, the error handling. Components import from it without knowing those details. |

---

## 🔍 What to notice in the code

**[`src/components/ExerciseList.tsx`](src/components/ExerciseList.tsx)**
Before the refactor, this file contains the full fetch lifecycle in one place.
Read through it in order: state is declared, the effect fires after mount, state
is updated at each stage, the JSX switches on `isLoading` and `error` before
rendering the list. After the refactor, the effect body shrinks to a single
call into the service — the shape stays the same, the implementation detail
moves out.

**[`src/services/exerciseService.ts`](src/services/exerciseService.ts)**
A plain async function that returns `Promise<Exercise[]>`. No React in here —
just a fetch call, a response check, and a JSON parse. The component does not
know this file exists beyond the import. If the API base URL changed, this is
the only file that would need to update.

---

## 🌐 What the frontend revealed

The browser enforces CORS — a security policy that blocks a script on one origin
from reading a response from a different origin. Our frontend runs on
`http://localhost:5173` and the API runs on `http://localhost:8080`. They are
different origins. Without a CORS header on the API response, the browser will
block the fetch even if the request reaches the server.

> **API LEARNING MOMENT:** The backend needs to allow `http://localhost:5173`
> as a permitted origin. This is configured on the server — the frontend cannot
> work around it. See API repo issue #1 and the corresponding fix branch for
> the backend change required. **Do not spend time fully understanding CORS at
> this stage.** The goal here is to encounter the error, understand that it
> exists for a security reason, and know how to unblock yourself. CORS is
> revisited properly in phase 08 when security becomes the explicit topic.
> For now: the frontend and backend are separate deployments with a boundary
> between them, and the browser enforces that boundary.

---

## ▶️ Running this branch

```bash
npm install
npm run dev
```

**The backend must be running** at `http://localhost:8080`.

To observe the CORS error deliberately:
1. Start the API on branch `phase-12_security_spring-security-jwt` (no CORS config)
2. Load the app — open DevTools > Console and note the error
3. Switch the API to the CORS-fix branch (see API repo issue #1)
4. Reload — the exercises should load

You do not need to fully understand CORS yet. The goal is to see the error,
recognise that the browser is enforcing a security boundary, and know which
knob to turn to unblock it. The full explanation is in phase 08.

App runs at `http://localhost:5173`.

---

## ✏️ Challenges for students

**Challenge 1 — Analytical**
Open the Network tab in DevTools before the page loads. Reload the page and
watch the request to `GET /exercises` appear. What status code does it return?
What does the response body look like? Does the shape match the `Exercise` type
defined in `src/types/exercise.ts`?

**Challenge 2 — Analytical**
Remove the empty dependency array `[]` from the `useEffect` call. What happens?
Open the Network tab — how many requests fire? Read the React error or warning
in the console. What is React telling you, and why does the dependency array
prevent this?

**Challenge 3 — Analytical**
Stop the backend and reload the page. What does the UI show? Find where in the
code the error state is set. What does `response.ok` check, and what kind of
errors would it catch that a try/catch alone would not?

**Challenge 4 — Additive**
The loading state renders a plain text message. Replace it with a simple
skeleton — grey placeholder blocks where the exercise cards will appear. What
does this change about the user experience, and why do production apps prefer
skeletons over spinners for list content?

**Challenge 5 — Additive (stretch)**
Add a retry button to the error state. When clicked, it should re-trigger the
fetch. What state or mechanism would you use to cause `useEffect` to run again
after mount?

---

## 💭 Thought pieces for the next branch

1. The app is a single page — there is no way to navigate to a detail view for
   a selected exercise, or to a different section entirely. If we wanted a URL
   like `/exercises/123` that showed one exercise, what would need to exist in
   the app that does not exist now?
2. The service module is a plain function — it has no memory between calls. If
   two components both called `getExercises()` at the same time, how many
   network requests would fire? Is that the right behaviour?
3. The `fetch` call has no timeout. If the server takes thirty seconds to
   respond, the loading spinner spins for thirty seconds. What should a
   production app do differently, and where would that logic live?

---

*Previous branch: [`phase-03_react_state-and-events`]*
*Next branch: [`phase-05_routing_react-router`]*
