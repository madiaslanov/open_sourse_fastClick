# Contributing to FastClick

Thanks for wanting to contribute! This project is a keyboard shortcut trainer (Monkeytype-style). Contributions fall into two categories: **shortcut packs** (JSON files) and **frontend code**.

---

## Table of Contents

- [Branch naming](#branch-naming)
- [Commit style](#commit-style)
- [Adding a shortcut pack](#adding-a-shortcut-pack)
- [Frontend changes](#frontend-changes)
- [Pull Request flow](#pull-request-flow)
- [Local setup](#local-setup)

---

## Branch naming

| Type | Pattern | Example |
|------|---------|---------|
| New shortcut pack | `shortcuts/<app-id>` | `shortcuts/figma` |
| Bug fix | `fix/<short-description>` | `fix/linux-key-display` |
| New feature | `feat/<short-description>` | `feat/dark-mode` |
| Refactor | `refactor/<short-description>` | `refactor/shortcut-loader` |
| Docs | `docs/<short-description>` | `docs/contributing` |

Always branch off `main`.

```bash
git checkout main
git pull origin main
git checkout -b shortcuts/figma
```

---

## Commit style

We use [Conventional Commits](https://www.conventionalcommits.org/).

```
<type>(<scope>): <short summary>
```

**Types:**

| Type | When to use |
|------|------------|
| `feat` | New feature or new shortcut pack |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `refactor` | Code change with no behavior change |
| `style` | Formatting, whitespace |
| `chore` | Build, deps, tooling |

**Examples:**

```
feat(shortcuts): add Figma shortcut pack
fix(train): correct Ctrl+Shift display on Linux
docs: update README with env variable usage
chore: bump vite to 8.1
```

One commit per logical change. Don't bundle unrelated fixes.

---

## Adding a shortcut pack

This is the most common contribution. Shortcut packs live in `public/shortcuts/`.

### 1. Create the JSON file

File name must match the `id` field: `public/shortcuts/<id>.json`

```json
{
  "id": "figma",
  "name": "Figma",
  "icon": "figma",
  "shortcuts": [
    {
      "action": "Open search",
      "keys": {
        "mac": ["Cmd", "P"],
        "windows": ["Ctrl", "P"],
        "linux": ["Ctrl", "P"]
      }
    },
    {
      "action": "Undo",
      "keys": {
        "mac": ["Cmd", "Z"],
        "windows": ["Ctrl", "Z"],
        "linux": ["Ctrl", "Z"]
      }
    }
  ]
}
```

**Rules:**
- `id` — lowercase, no spaces (use hyphens: `vs-code`)
- `keys` — at least `mac` and `windows`; `linux` if it differs
- Key names: `Cmd`, `Ctrl`, `Alt`, `Shift`, `Enter`, `Tab`, `Esc`, letters/numbers as-is
- Minimum **10 shortcuts** per pack
- Verify every shortcut against the official docs before submitting

### 2. Check your JSON is valid

```bash
node -e "JSON.parse(require('fs').readFileSync('public/shortcuts/figma.json', 'utf8')); console.log('OK')"
```

### 3. Open a PR

Branch: `shortcuts/figma`
Title: `feat(shortcuts): add Figma shortcut pack`

---

## Frontend changes

### Setup

```bash
npm install
npm run dev
```

### Before committing

```bash
npm run lint   # must pass with 0 errors
npm run build  # must succeed
```

TypeScript strict mode is on — no `any` without a comment explaining why.

### Key directories

```
src/
  components/   # shared UI components
  pages/        # route-level pages (Home, Train, Contribute)
  hooks/        # custom React hooks
  types/        # shared TypeScript types
public/
  shortcuts/    # JSON shortcut packs
```

---

## Pull Request flow

1. Fork the repo and create your branch from `main`
2. Make your changes
3. Run `npm run lint` and `npm run build` — both must pass
4. Push and open a PR against `main`
5. Fill in the PR description:
   - What does this add/fix?
   - For shortcut packs: which OS versions were verified?
6. A maintainer will review within a few days

**One PR = one concern.** Don't mix a shortcut pack with a UI refactor.

---

## Local setup

```bash
git clone https://github.com/<your-fork>/fastClick.git
cd fastClick
npm install
npm run dev
```

To load shortcuts from a remote GitHub Raw URL instead of `public/`:

```bash
VITE_SHORTCUTS_BASE_URL=https://raw.githubusercontent.com/<owner>/<repo>/main/shortcuts/ npm run dev
```
