<div align="center">
	<h1>⚽ PredictX</h1>
	<p><strong>AI‑powered football match outcome probability engine.</strong><br/>Generate fast, structured HOME/DRAW/AWAY probability splits using Google Gemini and stable historical factors.</p>
  
	<!-- Badges (replace or remove as desired) -->
	<p>
		<a href="https://nextjs.org"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js" /></a>
		<a href="https://www.typescriptlang.org"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript" /></a>
		<a href="#"><img alt="Status" src="https://img.shields.io/badge/Status-Alpha-gold?style=flat" /></a>
		<a href="#license"><img alt="License" src="https://img.shields.io/badge/License-TBD-lightgrey?style=flat" /></a>
	</p>
</div>

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Architecture](#architecture)
5. [Getting Started](#getting-started)
6. [Environment Variables](#environment-variables)
7. [Project Structure](#project-structure)
8. [API Reference](#api-reference)
9. [Usage Flow](#usage-flow)
10. [Roadmap](#roadmap)
11. [Contributing](#contributing)
12. [Disclaimer](#disclaimer)
13. [Security](#security)
14. [Acknowledgments](#acknowledgments)
15. [License](#license)

## Overview

PredictX computes probability distributions for football (soccer) match outcomes (HOME, DRAW, AWAY) by prompting the **Google Gemini 2.5 Flash** model with a tightly controlled format. It emphasizes historically stable factors (e.g., tactical identity, long‑term squad strength, home advantage) and enforces an exact, machine‑parsable response pattern.

## Features

- 🔮 **AI‑Driven Probabilities**: Structured `HOME:X,DRAW:Y,AWAY:Z` output summing to 100.
- ✅ **Strict Validation Layer**: Rejects malformed or unbalanced AI responses.
- 🧪 **TypeScript Safety**: Fully typed request/response contracts.
- ⚡ **Fast Autocomplete**: Client‑side team search with incremental filtering.
- 🛡️ **Environment Validation**: Fails fast if `GEMINI_API_KEY` is missing.
- 🎨 **Custom UI Theme**: Tailwind + luxury gold styling components.

## Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom design tokens
- **AI Provider**: Google GenAI (Gemini 2.5 Flash)
- **Runtime**: Edge‑friendly serverless API route (Next.js `route.ts`)

## Architecture

| Layer                           | Purpose                                                                     |
| ------------------------------- | --------------------------------------------------------------------------- |
| `src/app/api/predict/route.ts`  | Validates input, constructs prompt, calls Gemini, parses & enforces format. |
| `src/components/TeamSearch.tsx` | Client‑side controlled input with filtered team suggestions.                |
| `src/data/teams.json`           | Source list for autocomplete; can be expanded or replaced.                  |
| `src/lib/env.ts`                | Centralized environment variable access + required variable assertions.     |
| `src/types/index.ts`            | Shared TypeScript interfaces for requests/responses and component props.    |

## Getting Started

Clone and install dependencies:

```powershell
git clone https://github.com/rajveersingh7/predictx.git
cd predictx
npm install
```

Create a local environment file:

```powershell
echo GEMINI_API_KEY=your_google_gemini_key > .env.local
```

Run the dev server:

```powershell
npm run dev
```

Open `http://localhost:3000` in your browser.

## Environment Variables

| Name             | Required | Description                                         |
| ---------------- | -------- | --------------------------------------------------- |
| `GEMINI_API_KEY` | Yes      | API key for Google GenAI (Gemini) model invocation. |

Place variables in `.env.local`. Do not commit real keys.

## Project Structure

```text
predictx/
├─ src/
│  ├─ app/
│  │  ├─ page.tsx              # Landing UI / selection form
│  │  ├─ results/page.tsx      # Results view
│  │  └─ api/predict/route.ts  # Prediction POST endpoint
│  ├─ components/TeamSearch.tsx
│  ├─ data/teams.json
│  ├─ lib/env.ts
│  └─ types/index.ts
├─ public/                     # Static assets
├─ README.md
└─ package.json
```

## API Reference

### POST `/api/predict`

Generate probabilities for a selected home vs away team.

Request Body:

```json
{
  "homeTeam": "Arsenal",
  "awayTeam": "Chelsea"
}
```

Successful Response (`200`):

```json
{
  "homeWin": 41,
  "draw": 34,
  "awayWin": 25,
  "homeTeam": "Arsenal",
  "awayTeam": "Chelsea"
}
```

Validation Errors (`400`):

```json
{"error": "Both teams are required"}
```

Server / Format Errors (`500`):

```json
{"error": "Failed to generate prediction. Please try again."}
```

### Prompt Constraints

The AI must respond EXACTLY in `HOME:X,DRAW:Y,AWAY:Z` format summing to 100. Any deviation triggers rejection & a controlled error response.

## Usage Flow

1. User selects Home & Away teams via autocomplete inputs.
2. Frontend issues POST to `/api/predict` with JSON payload.
3. Backend crafts deterministic prompt & calls Gemini.
4. Response is parsed, validated, and rendered (progress bars / styled cards).

## Roadmap

- Add league context weighting (optional parameter)
- Integrate caching layer for identical matchups
- Provide confidence intervals / volatility hints
- Export CSV / JSON for batch predictions
- Add test suite & CI badges

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`feat/your-feature`)
3. Ensure TypeScript builds (`npm run build`)
4. Open a PR with clear description & screenshots (if UI change)

## Disclaimer

Predictions are generated by an AI language model using generalized historical heuristics. They are NOT guaranteed accurate and must not be treated as financial, betting, or gambling advice. Use responsibly.

## Security

If you discover a vulnerability, please open a private issue or contact the maintainer before public disclosure.

## Acknowledgments

- [Next.js](https://nextjs.org) for the React framework.
- [Google GenAI](https://ai.google.dev/) for Gemini model access.
- Community open data inspiration for team lists.

## License

License is currently **TBD**. Propose one (e.g., MIT) via an issue if needed.

---

Enjoy PredictX? ⭐ Star the repo and share feedback!
