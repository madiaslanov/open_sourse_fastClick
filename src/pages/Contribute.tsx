import { Panel } from '../ui/Panel'

export function ContributePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-strong md:text-4xl">
          Contribute a shortcut pack
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-white/60">
          Packs are plain JSON files in a public GitHub repo. The frontend fetches them via GitHub
          Raw URLs.
        </p>
      </div>

      <Panel>
        <div className="text-sm text-strong">Repo structure</div>
        <pre className="mt-3 overflow-auto rounded-xl bg-black/30 p-4 text-xs text-white/70 ring-1 ring-white/10">
{`shortcuts/
  index.json      ← list of apps
  vscode.json
  figma.json
  vim.json`}
        </pre>
      </Panel>

      <Panel>
        <div className="text-sm text-strong">Pack format</div>
        <pre className="mt-3 overflow-auto rounded-xl bg-black/30 p-4 text-xs text-white/70 ring-1 ring-white/10">
{`{
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
}`}
        </pre>
        <ul className="mt-4 space-y-2 text-sm text-white/65">
          <li>
            - <span className="text-strong">Add a new JSON file</span> into `shortcuts/`
          </li>
          <li>
            - <span className="text-strong">Update `index.json`</span> to include your app
          </li>
          <li>
            - <span className="text-strong">Open a PR on GitHub</span>
          </li>
        </ul>
      </Panel>

      <Panel className="bg-white/3">
        <div className="text-sm text-strong">Point this frontend to your repo</div>
        <div className="mt-2 text-sm text-white/65">
          Set <code className="rounded bg-black/30 px-1.5 py-0.5 ring-1 ring-white/10">VITE_SHORTCUTS_BASE_URL</code>{' '}
          to your raw base URL, e.g.
        </div>
        <pre className="mt-3 overflow-auto rounded-xl bg-black/30 p-4 text-xs text-white/70 ring-1 ring-white/10">
{`VITE_SHORTCUTS_BASE_URL=https://raw.githubusercontent.com/<owner>/<repo>/main/shortcuts/`}
        </pre>
      </Panel>
    </div>
  )
}

