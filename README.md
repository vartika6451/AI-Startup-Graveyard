# 🪦 Startup Graveyard
### Failure Intelligence & Due Diligence Canvas

> Most startup tools celebrate success stories. This one studies the dead — so you don't join them.

Startup Graveyard is a full-stack analytical platform that evaluates new startup ideas against a database of historical failures. Submit an idea, get back a risk report showing who tried it before, why they failed, recurring failure patterns, market timing analysis, and strategic pivot recommendations.

**Built for:** Investors, founders, and analysts who want brutal honesty before writing a check or quitting their job.

---

## What It Does

| Feature | Description |
|---|---|
| **Failure Intelligence** | Matches your idea against real historical analogues from the failure database |
| **Risk Scoring** | Quantifies risk across dimensions — timing, competition, operations, unit economics |
| **Pattern Recognition** | Surfaces recurring failure themes across similar dead companies |
| **Market Timing Analysis** | Evaluates whether conditions today differ from when prior attempts failed |
| **Pivot Recommendations** | Generates strategic alternatives based on what changed in the market |
| **Analysis History** | Persists all submitted analyses for later review and comparison |

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | File-system routing + serverless API routes in one codebase |
| UI | React 19 | Concurrent rendering, server components, context-driven state |
| Styling | Tailwind CSS v4 | Utility-first, zero config files, native CSS variables |
| Database | PostgreSQL + Prisma ORM | Relational data model with type-safe auto-generated query client |
| Charts | Recharts | SVG-based, React-native chart components |
| Language | TypeScript | Static type safety across DB queries, API contracts, and UI props |

---

## Architecture

```
┌─────────────────────────────────────────┐
│           Client Tier (UI)              │
│  Landing · Dashboard · Idea Canvas      │
│  Database Explorer · Settings           │
└────────────────┬────────────────────────┘
                 │ HTTP / JSON API
┌────────────────▼────────────────────────┐
│         Service Tier (Logic)            │
│  API Routes · Classification Engine     │
│  Risk Evaluator · Pivot Generator       │
└────────────────┬────────────────────────┘
                 │ Prisma ORM
┌────────────────▼────────────────────────┐
│         Database Tier                   │
│  PostgreSQL · Startups · Failures       │
│  Lessons · Market Trends · Analyses     │
└─────────────────────────────────────────┘
```

The analytics engine at the core extracts keyphrase patterns from submitted ideas, queries historical analogues, computes risk percentages using heuristic scoring, and drafts pivot configurations — all server-side before returning a structured report to the client.

---

## Database Schema

Five core models power the platform:

- **`Startup`** — company name, category, funding raised, current status
- **`FailureReason`** — specific causes linked to each startup (one-to-many)
- **`LessonLearned`** — actionable takeaways extracted per failure
- **`MarketTrend`** — industry growth rates used for timing analysis
- **`StartupAnalysis`** — persisted records of user-submitted idea analyses

Cascade deletes are configured throughout — removing a startup cleans up all associated failure reasons and lessons automatically.

---


## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack hot-reload |
| `npm run build` | Compile optimized production bundle |
| `npm run start` | Run the production server |
| `npx prisma db push` | Sync schema changes to database |
| `npx prisma db seed` | Load historical failure seed data |
| `npx prisma studio` | Open visual database explorer |

---

## Project Structure

```
startup-graveyard/
├── prisma/
│   ├── schema.prisma          # Database schema & relationships
│   ├── migrations/            # Auto-generated migration history
│   └── seed.ts                # Historical startup failure data
├── src/
│   ├── app/
│   │   ├── page.tsx           # Landing page
│   │   ├── dashboard/         # Dashboard, explorer, settings
│   │   └── api/               # Serverless API route handlers
│   └── lib/
│       ├── db.ts              # Prisma client + connection pooling
│       ├── services/
│       │   └── analytics.ts   # Risk scoring & classification engine
│       └── context/           # Theme and global state providers
└── .env.example
```

---

## How a Full Analysis Works

1. User submits a startup idea via the Idea Canvas
2. The API route extracts industry signals and keyphrases
3. The analytics engine queries the database for historical analogues
4. Risk scores are computed across dimensions (timing, competition, operations)
5. Failure patterns are surfaced from matching companies
6. A pivot recommendation is generated based on current market conditions
7. The full analysis is returned to the client and persisted in `StartupAnalysis`
8. Recharts renders the risk distribution and failure reason charts

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'add your feature'`
4. Push and open a pull request

When adding new startup failure data to the seed file, please include: company name, founding year, shutdown year, funding raised, failure reasons, and cited sources.

---

## License

MIT — see [LICENSE](LICENSE) for details.
