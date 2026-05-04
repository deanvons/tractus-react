# Tractus Frontend — Product Requirements Document

## Overview

Tractus is a personal training web app. The core workflow is:

> Browse exercises → create a session → add exercise entries → mark entries done → view history

That loop is the product. Every feature either supports or extends it.

---

## User role

One user type: **the athlete**. They create sessions, populate them with
exercise entries, and track completion in real time.

The exercise library is public — no login required. Sessions and session
entries require authentication.

---

## User stories

### Exercise library (public — no auth required)

- As an athlete, I want to browse a list of exercises so I can see what is available.
- As an athlete, I want to filter exercises by category, movement pattern, or primary
  muscle so I can find what I am looking for quickly.
- As an athlete, I want to view the details of an exercise (name, category, movement
  pattern, primary muscle, laterality, SI risk) so I know what it involves.

### Sessions (auth required)

- As an athlete, I want to create a training session for a specific date so I have a
  container for today's work.
- As an athlete, I want to view a list of my sessions ordered by date so I can see
  my training history.
- As an athlete, I want to view the details of a session — the date and all its entries —
  so I can review what was planned and what was completed.
- As an athlete, I want to delete a session I created by mistake.

### Session entries (auth required)

- As an athlete, I want to add an exercise entry to a session — specifying the exercise,
  mode, sets, and reps — so the session reflects my intended workload.
- As an athlete, I want to mark an entry as done so I can track progress through the
  session in real time.
- As an athlete, I want to mark an entry as not done if I ticked it by mistake.
- As an athlete, I want to see a progress count (e.g. "3 / 6 done") so I know how far
  through the session I am.

### Authentication

- As an athlete, I want to log in with my Tractus account so my sessions are private
  and persistent.
- As an athlete, I want to be redirected to the login page if I access a protected route
  while unauthenticated.
- As an athlete, I want to log out so my session is cleared on a shared device.

---

## Feature scope

| Feature | In scope |
|---|---|
| Exercise library — browse and filter | Yes |
| Exercise detail view | Yes |
| Session — create, list, detail, delete | Yes |
| Session entries — add, mark done/not done | Yes |
| Session progress indicator | Yes |
| Authentication — login, logout, protected routes | Yes |
| Training weeks | No — out of scope for this phase sequence |
| Exercise creation / admin | No — exercises come from the API |
| Workout plan templates | No — not in the API |
| Progress graphs / analytics | No |
| Social features | No |
| Offline support / PWA | No |

---

## Core data model (from the API)

```
Exercise
  id, name, category, movementPattern, primaryMuscle,
  laterality (bilateral | unilateral | alternating),
  movementPredictability (stable | dynamic | unpredictable),
  siRisk (derived — low | low-medium | medium | high, never stored)

Session
  id, date
  entries[]: SessionEntry

SessionEntry
  id, exerciseId, exerciseName (flattened),
  mode (EMOM | Set Rep | AMRAP | Timed | Grappling),
  done, sets, reps, resistance, resistanceUnit, distanceM, timeMin
```

Session has no `status` or `finishedAt` field in the API. Completion is a
UI-only concept — a session is visually "done" when all entries are marked done.

For this phase sequence, entries default to mode `Set Rep`. Other modes
(EMOM, AMRAP, Timed, Grappling) are out of scope — they are an API learning
moment, not a teaching target.

---

## Key UX flows

### Browse exercises
1. Athlete opens the exercise library.
2. Sees a paginated or scrollable list of exercises.
3. Optionally filters by category, movement pattern, or primary muscle.
4. Taps an exercise to view its detail page.

### Create a session
1. Athlete navigates to sessions (must be logged in).
2. Taps "New session", picks a date.
3. App posts to `POST /sessions`, navigates to the new session detail.

### Build out a session
1. Athlete is on a session detail page.
2. Taps "Add exercise", browses or searches the exercise library.
3. Selects an exercise, enters sets and reps.
4. App posts to `POST /sessions/{id}/entries`.
5. Entry appears in the session checklist.

### Work through a session
1. Athlete sees a checklist of entries (exercise name, sets × reps each).
2. Taps an entry to mark it done — entry visually checks off.
3. Progress count updates ("3 / 6 done").
4. When all entries are done, a completion state is shown.

### View history
1. Athlete opens sessions list.
2. Sees sessions ordered by date, most recent first.
3. Taps a session to see its entries and completion state.

---

## Known API gaps (learning moments)

These are flagged for in-class discussion — they are not bugs to work around,
they are the lesson.

- **No session ownership** — `GET /sessions` returns all sessions with no user
  filter. Once auth is added the backend will need to scope this to the logged-in
  user. Frontend will expose this gap immediately.
- **No session status field** — "finished" is a UI-only concept. A future backend
  phase could add `PATCH /sessions/{id}/finish` and a status enum.
- **Entry mode is required but opaque** — `POST /sessions/{id}/entries` requires
  a `mode` field but the frontend has no basis for the user to choose between
  EMOM, AMRAP, Timed, and Grappling without domain knowledge. We default to
  `Set Rep` and flag this as a form design problem.
- **No pagination on exercises** — `GET /exercises` returns everything. Fine now,
  becomes a problem at scale. Good analytical challenge.

---

## Out of scope

Anything not listed under "In scope" above. If a feature is not in this
document, do not build it.
