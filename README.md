# FastClick — Keyboard Shortcut Trainer

> Monkeytype-style keyboard shortcut trainer: choose an app → see the action → press the combo → get feedback → move on.

**Live demo:** https://open-sourse-fast-click.vercel.app/

---

## Problem & Solution

**Problem:** Most people use only 10–20% of the keyboard shortcuts available in the tools they use daily (VS Code, Figma, Chrome, etc.). Learning them is tedious — documentation is static, there is no feedback loop, and no way to measure progress.

**Solution:** FastClick turns shortcut learning into an interactive, game-like experience. You see an action, you press the keys, you get instant feedback. Same loop as a typing trainer — but for shortcuts.

---

## SDG Alignment

This project supports **UN Sustainable Development Goal 4 — Quality Education** and **SDG 8 — Decent Work and Economic Growth**.

- **SDG 4:** FastClick is a free, open educational tool that improves digital literacy. Anyone can learn to work faster and more effectively, regardless of their background or access to paid training.
- **SDG 8:** Keyboard shortcuts directly increase productivity. Faster workers can focus on higher-value tasks, supporting more decent and efficient work environments.

---

## DPG Justification

FastClick is designed as a **Digital Public Good**:

| DPG Requirement | How FastClick meets it |
|---|---|
| Open source license | MIT License |
| No harmful content | Educational tool only, no user data collected |
| Relevance to SDGs | SDG 4 (Education) + SDG 8 (Work) |
| Open standards | JSON-based shortcut packs, no proprietary formats |
| Privacy by design | No accounts, no tracking, fully client-side |
| Community contribution | Anyone can add shortcut packs via GitHub PR |

---

## Target Users

- Students and junior developers learning professional tools
- Knowledge workers who want to speed up their daily workflow
- Educators teaching digital tools in classrooms
- Open source contributors who want to add shortcut packs for any app

---

## Features

- Choose any supported application
- See action description → press the keyboard combo → get instant visual feedback
- OS switcher: Mac / Windows / Linux
- Progress tracking within a session
- Community-driven shortcut packs (JSON format)

---

## Pages

- **Home** — app cards + search + OS switcher
- **Train** — training screen (action + key visualization + feedback + progress bar)
- **Contribute** — how to add a new JSON pack via GitHub PR

---

## Shortcut Packs

Packs live in `public/shortcuts/` and are plain JSON files — anyone can add one.

```json
{
  "id": "vscode",
  "name": "VS Code",
  "shortcuts": [
    {
      "action": "Open Command Palette",
      "keys": {
        "mac": ["Cmd", "Shift", "P"],
        "windows": ["Ctrl", "Shift", "P"],
        "linux": ["Ctrl", "Shift", "P"]
      }
    }
  ]
}
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full format spec and rules.

---

## How to Use

1. Open the app
2. Select an application (e.g. VS Code, Figma, Chrome)
3. Choose your OS (Mac / Windows / Linux)
4. Press the shown keyboard shortcut
5. Get feedback — correct or wrong — and move to the next one

---

## How to Contribute

We welcome shortcut packs for any app and frontend improvements.

Quick start:
1. Fork the repo
2. Create a branch: `shortcuts/<app-name>` or `feat/<feature>`
3. Add your JSON file to `public/shortcuts/`
4. Open a Pull Request

Full guide: [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## Local Setup

```bash
git clone https://github.com/w0ikid/fastClick.git
cd fastClick
npm install
npm run dev
```

Optional — load shortcuts from a remote GitHub Raw URL:

```bash
VITE_SHORTCUTS_BASE_URL=https://raw.githubusercontent.com/<owner>/<repo>/main/shortcuts/ npm run dev
```

Build for production:

```bash
npm run build
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Routing | React Router 7 |
| Styling | Tailwind CSS 4 |
| Build | Vite 8 |
| Data | JSON shortcut packs |

---

## License

This project is licensed under the **MIT License** — see [LICENSE](./LICENSE) for details.

Free to use, modify, and distribute. Contributions back to the project are always welcome.

---

## Team

| Name | Role |
|---|---|
| Ибрашов Даниал | Team Lead, Project Coordinator — overall direction, task management, GitHub workflow |
| Татаев Шокан | Developer, Ideas & Concepts — feature ideation, frontend implementation |
| Мади Аслан | Developer — Spec Driven Development, API design, shortcut pack structure |

---

## AI Usage Disclosure

AI tools were used during the development of this project:

| Tool | How it was used |
|---|---|
| Claude (Anthropic) | Generating boilerplate React components, reviewing shortcut JSON structure, writing CONTRIBUTING.md and README |
| GitHub Copilot | Autocomplete during frontend development |

All AI-generated content was reviewed, tested, and modified by team members before being committed. No AI tool made architectural decisions — those were made by the team.

---

## Market & Competitor Analysis

| Tool | Type | Shortcoming vs FastClick |
|---|---|---|
| [Shortcutfoo](https://www.shortcutfoo.com) | Paid SaaS | Closed source, paid subscription, limited apps |
| [Keybr](https://www.keybr.com) | Open source | Typing trainer only, no shortcut support |
| App documentation | Static | No interactivity, no feedback, no progress tracking |
| [Monkeytype](https://monkeytype.com) | Open source | Typing only, not shortcuts |

**FastClick advantage:** open source, free forever, community-extensible via JSON packs, works for any OS and any app.

**SWOT:**

| | Positive | Negative |
|---|---|---|
| **Internal** | Open source, zero cost, easy to extend | Early stage, small shortcut library |
| **External** | Growing demand for productivity tools, SDG alignment | Established paid competitors, low awareness |
