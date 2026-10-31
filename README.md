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

- `index.html`: profile, technical overview, experience, education, publications, contact.
- `styles.css`: responsive dark palette, typography, and layout.
- `script.js`: optional terminal navigation, help, profile, and command history.
- `assets/Jacob_Ogle_Resume.pdf`: current downloadable résumé. Replace when updated.

The main navigation and all content work without JavaScript. The terminal supports `help`, `whoami`, `work`, `experience`, `skills`, `about`, `contact`, `resume`, and `clear`. Up/down arrows recall commands. User input is rendered as plain text and is never executed.

## Writing technical articles

The homepage's **blog** section supports articles with multiple tags. Articles are
ordinary HTML files, so there is no build step or account to configure.

1. Copy `blog/_template.html` to a descriptive filename, e.g. `blog/parallel-file-scanning.html`.
2. Replace the title (in both `<title>` and `<h1>`), description, date, tags, and
   body. Remove the `<meta name="robots" content="noindex">` line from your copy.
   Use `<h2>` for sections and `<pre><code>` for code; escape `<` as `&lt;`
   and `&` as `&amp;` inside code examples.
3. Add a card inside `#blog-posts` in `index.html`, newest first:

   ```html
   <article data-tags="Python,HPC">
     <time datetime="2026-10-31">October 31, 2026</time>
     <h3><a href="blog/parallel-file-scanning.html">Your article title</a></h3>
     <p>A short summary of the article.</p>
     <ul class="blog-tags" aria-label="Article tags"><li>Python</li><li>HPC</li></ul>
   </article>
   ```

   Keep the visible tags and comma-separated `data-tags` in sync. Tags are
   case-sensitive; reuse consistent spelling. `blog.js` builds tag filter buttons
   automatically from published cards. Article links and content work without JS.
4. Preview locally, then commit and push to `main` to publish through GitHub Pages.

The template is not listed as a published article. Keep it as a starting point
for future posts. There is no browser-based editor; write posts in your code editor.

## Color themes

Dark mode is the default. The header's **Light mode** toggle switches palettes
and remembers the selection in local storage across visits and article pages.
If browser storage is unavailable, the toggle still works for the current page.
`theme.js` restores the choice before the stylesheet loads. New articles copied
from the template include the same toggle automatically.
