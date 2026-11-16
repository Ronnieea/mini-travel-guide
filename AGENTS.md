# AGENTS.md — Mini Travel Guide

## 1. Role and project goal
You are a maintainer of **Mini Travel Guide**, a Traditional Chinese static Japan city-guide website. Your job is to add and maintain city content while preserving a consistent design and working GitHub Pages deployment. The project demonstrates a **repeatable AI content-extension workflow**, not a one-off page generation.

## 2. Tech and constraints
- Use only HTML5, CSS3, vanilla JavaScript (ES2020+) and JSON. No build step, framework, backend, database, paid API or secrets.
- Use relative paths so the site works under `https://<username>.github.io/<repo>/`.
- Keep user-facing copy in Traditional Chinese (`zh-Hant`); English city names and small English section labels are allowed.
- Do not use unlicensed photos. Existing emoji illustrations are the default visual treatment.
- All city details are editorial suggestions; do not invent exact business hours, prices, train schedules or guarantees. Verify time-sensitive details before adding them, or omit them.

## 3. File structure
```
index.html           # landing page, search and region filters
city.html            # shared detail page; city selected by ?id=<city-id>
css/style.css        # global visual tokens and responsive styles
js/main.js           # loads JSON, filters and creates city cards
js/city.js           # loads JSON and renders city detail
 data/cities.json    # single source of truth for all city content
AGENTS.md            # AI contributor rules
README.md            # setup, deployment, and user documentation
docs/extension-demo.md # evidence of a repeatable extension workflow
```
No city-specific HTML files are needed. Never duplicate `city.html` for a new city.

## 4. Design system
- Visual style: minimal Japanese travel magazine; calm, airy, editorial.
- Core CSS variables in `:root`: `--ink`, `--muted`, `--cream`, `--white`, `--green`, `--border`, `--orange`.
- Main font: `DM Sans` + `Noto Sans TC`, with system fallbacks.
- Reuse `.city-card`, `.city-art`, `.city-body`, `.city-region`, `.detail-section`, `.info-card`, `.pill` and `.note` classes.
- Cards use a consistent illustration area, heading, tagline and detail link.
- Maintain responsive behavior: 3 columns desktop, 2 columns tablet, 1 column mobile. Avoid horizontal scrolling at 375px width.
- Provide keyboard-operable controls, meaningful accessible labels, visible text, and proper semantic headings. Never use color alone to convey state.

## 5. Content schema — strict requirements
`data/cities.json` MUST be a JSON array. Every city object MUST have exactly these top-level keys, with the types described:
- `id`: string, unique lowercase kebab-case ASCII, regex `^[a-z0-9]+(?:-[a-z0-9]+)*$`.
- `name`: nonempty Traditional Chinese city name string.
- `englishName`: nonempty English name string.
- `region`: one of `kanto`, `kansai`, `hokkaido`, `kyushu`.
- `regionLabel`: corresponding label `關東`, `關西`, `北海道`, `九州`.
- `tagline`: nonempty short Traditional Chinese string, ideally <= 24 characters.
- `description`: nonempty Traditional Chinese paragraph.
- `emoji`: one appropriate emoji string.
- `theme`: one of `tokyo`, `kyoto`, `osaka`, `sapporo` (for a new theme, add a matching `.theme` CSS rule first; alternatively reuse an existing theme).
- `attractions`: array of exactly 3 objects, each with exactly `name` and `description` nonempty strings.
- `foods`: array of exactly 3 nonempty strings.
- `transport`: nonempty Traditional Chinese string.
- `tips`: nonempty Traditional Chinese string.
Do not add arbitrary fields. Do not embed HTML in JSON. Keep entries in a stable order, appending new cities at the end unless instructed otherwise.

## 6. Procedure: adding a city
1. Read `AGENTS.md`, `data/cities.json`, `js/main.js`, `js/city.js` and `css/style.css` before editing.
2. Check whether the requested city ID already exists. If it exists, edit that entry instead of creating a duplicate.
3. Identify the correct region. If it is outside supported regions, first extend the region filter in `index.html`, add the `region`/`regionLabel` mapping to this document, and verify the filter works. Do not misclassify a city to avoid this step.
4. Append a complete city object following the schema, using credible general descriptions; do not fabricate precise details.
5. Reuse an existing theme or add a named gradient class in `css/style.css` and extend the allowed `theme` values above.
6. Do not create a new HTML file or duplicate rendering logic. The city must appear automatically in the homepage grid and at `city.html?id=<id>`.
7. Run validation checks in section 8. Summarize files changed, tests run, and any known limitations.

## 7. Procedure: modifying code or styling
- Inspect existing patterns and reuse them; prefer small focused edits.
- Keep content in JSON, presentation in CSS, rendering and behavior in JS.
- Render user-facing content with `textContent`/DOM APIs, not unsafe `innerHTML` interpolation.
- Do not break existing city IDs, URLs, search, filters, mobile layout or navigation.
- If a new region is added, update filter UI, schema rules and validation together.
- Do not introduce dependencies, external scripts, tracking, API keys or unnecessary features without explicit approval.
- Do not remove city entries unless the user explicitly requests deletion.

## 8. Validation checklist (required for every change)
- [ ] JSON parses successfully and top-level value is an array.
- [ ] City IDs are unique and match kebab-case naming rules.
- [ ] Every city has exactly the required keys and correct field types.
- [ ] Each city has exactly 3 attractions and 3 foods; attractions contain both required fields.
- [ ] Region labels and themes match supported values and CSS.
- [ ] Homepage displays all cities and the search works for Chinese and English names, attractions and foods.
- [ ] Every city detail URL renders its corresponding data; unknown IDs show a safe fallback.
- [ ] Region filters and keyboard interaction work.
- [ ] At desktop/tablet/mobile widths, cards do not overflow.
- [ ] GitHub Pages uses relative URLs and shows no missing resources or console errors.
If you cannot run a browser, explicitly mark browser checks as **not executed**, not passed.

## 9. Definition of done
A change is complete only when content follows the schema, existing pages remain functional, README/docs are updated when needed, and the contributor reports test results truthfully. A new city should normally require **only one JSON entry**; CSS and filter changes are required only when introducing a new theme or region.

## 10. Example AI request
> Read AGENTS.md first. Add a new Japanese city following the existing JSON schema and shared layout. Preserve all existing cities, verify JSON and city URLs, and report changed files and checks.
