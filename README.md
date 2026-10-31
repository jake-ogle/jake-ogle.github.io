# Jacob Ogle — personal site

A dependency-free, terminal/HPC-inspired portfolio built from `~/Desktop/Resume`.

## Preview

Open `index.html` directly in a browser, or serve this directory:

```sh
python3 -m http.server 8000
```

Visit http://localhost:8000. No build step, package install, external fonts, or analytics.

## GitHub Pages

Target repository: https://github.com/jake-ogle/jake-ogle.github.io.git

The workflow in `.github/workflows/pages.yml` publishes on pushes to `main`.
In the repository's **Settings → Pages**, select **GitHub Actions** as the source.
The expected URL is https://jake-ogle.github.io/ once deployment succeeds.

This source was prepared locally because GitHub DNS was unavailable in the authoring session. Existing remote repository contents and settings have not been inspected. Merge these files into the existing checkout before pushing; do not force-push or replace existing history.

## Editing

- `index.html`: profile, projects, experience, education, publications, contact.
- `styles.css`: responsive dark palette, typography, and layout.
- `script.js`: optional terminal navigation, help, profile, and command history.
- `assets/Jacob_Ogle_Resume.pdf`: current downloadable résumé. Replace when updated.

The main navigation and all content work without JavaScript. The terminal supports `help`, `whoami`, `work`, `experience`, `skills`, `about`, `contact`, `resume`, and `clear`. Up/down arrows recall commands. User input is rendered as plain text and is never executed.
