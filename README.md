# 🔮 FateMeter

**Your future, one decision at a time.**

A psychological game interface that tracks your daily decisions and shows you the consequences — instantly. Every click judges you. Every choice shifts your future.

![Vue 3](https://img.shields.io/badge/Vue-3-42b883?logo=vuedotjs)
![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite)
![Pinia](https://img.shields.io/badge/Pinia-2-ffd859)

---

## The Concept

FateMeter is not a todo app. It's not a habit tracker. It's a **consequence simulator**.

You make a decision:

- **Study Now** → Future brightens
- **Skip** → Pressure builds
- **Focus 10 min** → Slow recovery
- **Got Distracted** → Time lost, regret climbs

The app responds instantly with dramatic feedback — shifting colors, animated meters, and messages that make you *feel* the weight of each choice.

---

## Features

### 🎮 Core Game Loop
- **4 decision types** — Study, Skip, Focus, Distracted
- **Instant feedback** — Every action triggers animations + messages
- **Regret score** (0–100) — Drives everything
- **3 future states** — Stable 😌, Warning 😰, Danger 😵

### 📊 Dashboard
- **Future State Card** — Glowing border shifts color with your state
- **Regret Meter** — Animated bar with smooth color transitions
- **Quick Actions** — 4 large buttons that feel heavy to press
- **Insight Line** — Pattern-based observations ("You usually fail after 2 skips")
- **Stats Row** — Streak, today's decisions, total decisions
- **Daily Reset Banner** — "Today can still be fixed" on first open

### 💥 Decision Screen
- Dramatic icon animation (float or shake based on outcome)
- Color-coded regret change display
- Future state badge
- Recovery prompt for negative choices

### ⚡ Recovery Mode
- 3 mini-missions: Focus 10 min, Complete 1 task, Remove distraction
- Each completion reduces regret by 5
- Progress bar tracks mission completion
- Available when regret > 40

### 📜 History / Timeline
- Decisions grouped by day ("Today", "Yesterday", dates)
- Each entry shows action, time, and regret change
- **Danger point markers** — Highlights where 3 consecutive skips occurred
- "This is where things went wrong" annotation

### 🧠 Pattern Detection
- Detects 3 consecutive actions of the same type
- Warns on repeated skips or distractions
- Celebrates streaks of study/focus
- Dynamic insights based on regret level + history

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Vue 3 (Composition API) |
| Build | Vite 6 |
| State | Pinia |
| Routing | Vue Router 4 |
| Storage | localStorage |
| Styling | Pure CSS (no frameworks) |

---

## Project Structure

```
src/
├── assets/
├── components/
│   ├── FutureStateCard.vue    # Animated state display with glow effects
│   └── RegretMeter.vue        # Animated bar (green→yellow→red)
├── composables/
├── router/
│   └── index.js               # 4 routes with lazy loading
├── stores/
│   └── game.js                # Pinia store + localStorage persistence
├── utils/
│   └── gameLogic.js           # Game rules, patterns, insights
├── views/
│   ├── Dashboard.vue          # Main screen
│   ├── DecisionScreen.vue     # Post-action feedback
│   ├── RecoveryScreen.vue     # Mini missions
│   └── HistoryScreen.vue      # Decision timeline
├── App.vue                    # Nav + page transitions
├── main.js                    # App bootstrap
└── style.css                  # Global dark theme + animations
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install & Run

```bash
cd fatemeter
npm install
npm run dev
```

Opens at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Output goes to `dist/`.

---

## Game Logic

### Regret System

| Action | Regret Change |
|--------|-------------|
| Study Now | -8 |
| Focus 10 min | -5 |
| Got Distracted | +7 |
| Skip | +10 |

Regret is clamped between 0 and 100.

### Future States

| Regret | State | Visual |
|--------|-------|--------|
| 0–29 | Stable 😌 | Green glow |
| 30–59 | Warning 😰 | Yellow glow |
| 60–100 | Danger 😵 | Red glow + pulse |

### Streak System

- Streak increments on consecutive days of positive actions (study/focus)
- Resets to 0 if 3+ skips occur in a single day

### Pattern Detection

Triggers when the last 3 decisions are the same type:
- 3 skips → "3 skips in a row. Your future is crumbling."
- 3 distractions → "3 distractions. You're losing grip."
- 3 studies → "3 studies straight. You're building momentum!"

### Recovery

- Each completed mission reduces regret by 5
- Up to 3 missions available per session
- Accessible when regret > 40

### Daily Reset

- On first app open each day, shows a motivational banner
- Resets daily mission completion counter
- Message adapts to current regret level

---

## Design Philosophy

FateMeter is designed as a **psychological game interface**, not a productivity app.

### Core Principles

1. **Instant judgment** — Every click gets an immediate emotional response
2. **Weight of decisions** — Actions feel consequential through color, animation, and copy
3. **Dark mode only** — The interface is a void you stare into
4. **Neon accents** — Colors mean something: green = safe, red = danger, purple = recovery
5. **No soft language** — "Collapse Imminent", not "Things could be better"

### Animation Strategy

- **Regret meter**: Smooth eased transitions (cubic-bezier) when value changes
- **Future state card**: Glow intensity scales with danger level
- **Decision screen**: Float animation for positive, shake for negative
- **Danger state**: Continuous pulse animation creates urgency
- **Page transitions**: Fade + slide for smooth navigation

---

## Data Persistence

All state is stored in `localStorage` under the key `fatemeter_game`. The persisted object:

```js
{
  regret: 35,           // Current regret score (0-100)
  streak: 3,            // Consecutive positive-action days
  state: 'stable',      // 'stable' | 'warning' | 'danger'
  decisions: [          // Full decision history
    { type: 'study', time: 1711612800000, regretBefore: 40, regretAfter: 32, regretChange: -8 }
  ],
  lastCheckIn: '2026-03-28',
  lastDecision: { ... },
  dailyMissionsCompleted: 1
}
```

No server. No accounts. Everything stays on your device.

---

## Customization

### Adding New Decision Types

1. Add entry to `getActionConfig()` in `src/utils/gameLogic.js`
2. Add button in `src/views/Dashboard.vue`
3. The store handles everything else automatically

### Adjusting Difficulty

Modify regret values in `src/utils/gameLogic.js`:
- Higher skip penalty = harsher game
- Lower study reward = harder to recover
- Adjust state thresholds in `getFutureState()`

---

## License

MIT
