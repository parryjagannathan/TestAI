# Protiviti — Path to Transformation Quiz

An Angular 17 application for the Protiviti TPR Booth Experience Quiz.

## Features

- **Multi-step quiz flow** matching the Protiviti brand screens
- **5 scenario questions** with a countdown timer per question
- **Auto-advance** when timer expires
- **4 Persona archetypes**: Compass, Accelerator, Beacon, Shield
- **Score-based results** with full persona profiles and leadership insights
- **API-ready submission** (stubbed, replace with real endpoint)
- **Registration** (First Name / Last Name) personalizes the experience
- **Full results page** with executive summary, pressure profile, AI transformation, resilience, and growth sections

## Scoring

| Score | Persona |
|-------|---------|
| 18–20 | 🧭 Compass — See further ahead |
| 14–17 | ⚡ Accelerator — Move faster |
| 10–13 | 💡 Beacon — Stay connected to your team |
| 5–9   | 🛡️ Shield — Absorb hidden risk |

Each question has 4 options (A=4pts, B=3pts, C=2pts, D=1pt). Max score: 20.

## Project Structure

```
src/
├── app/
│   ├── models/
│   │   └── quiz.model.ts          # Questions, personas, scoring logic
│   ├── services/
│   │   └── quiz.service.ts        # State management, API stub
│   └── components/
│       ├── splash/                # Touch-to-start screen
│       ├── intro-slides/          # 3 animated intro slides
│       ├── registration/          # Name entry form
│       ├── welcome/               # Personalized welcome screen
│       ├── question/
│       │   ├── question-context.component.ts   # Scenario display
│       │   └── question-options.component.ts   # Answer choices + timer
│       └── results/               # Full executive summary results
├── assets/images/                 # Screen images from Protiviti zip
└── index.html
```

## Getting Started

```bash
npm install
ng serve
```

App runs at `http://localhost:4200`

## Build for Production

```bash
ng build --configuration production
```

Output goes to `dist/protiviti-quiz/`

## Connecting the API

In `src/app/services/quiz.service.ts`, find the `submitToApi()` method and replace the simulated Observable with a real `HttpClient.post()` call:

```typescript
import { HttpClient } from '@angular/common/http';

submitToApi(result: QuizResult): Observable<any> {
  return this.http.post('https://your-api-endpoint.com/submissions', {
    firstName: result.firstName,
    lastName: result.lastName,
    email: result.email,
    country: result.country,
    score: result.totalScore,
    persona: result.persona.id,
    answers: result.answers,
    completedAt: result.completedAt
  });
}
```

## Screen Flow

```
Splash → Intro Slide 1 → Intro Slide 2 → Intro Slide 3
  → Registration → Welcome
    → Q1 Context → Q1 Options
    → Q2 Context → Q2 Options
    → Q3 Context → Q3 Options
    → Q4 Context → Q4 Options
    → Q5 Context → Q5 Options
    → Results (with email capture + API submission)
```
