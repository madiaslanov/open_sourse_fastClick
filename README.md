# OpenShortcut Trainer (Frontend)

Monkeytype-style тренажёр горячих клавиш: выбираешь приложение → видишь действие → нажимаешь комбинацию → получаешь фидбек → идёшь дальше по сету.

## Pages

- **Home**: список приложений (карточки) + поиск + переключатель OS (Mac / Windows / Linux)
- **Train**: экран тренировки (action + визуализация клавиш + фидбек + прогресс)
- **Contribute**: как добавить новый JSON-пак через GitHub PR

## Shortcut packs

По умолчанию пакеты лежат локально в `public/shortcuts/` (чтобы приложение работало сразу).

Формат (пример):

```json
{
  "id": "vscode",
  "name": "VS Code",
  "shortcuts": [
    {
      "action": "Open Command Palette",
      "keys": {
        "mac": ["Cmd", "Shift", "P"],
        "windows": ["Ctrl", "Shift", "P"]
      }
    }
  ]
}
```

## GitHub Raw source

Фронтенд может фетчить JSON напрямую из GitHub Raw URL. Для этого выставь переменную окружения:

```bash
VITE_SHORTCUTS_BASE_URL=https://raw.githubusercontent.com/<owner>/<repo>/main/shortcuts/
```

## Dev

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
