# Recall redesign

Implemented November 4, 2026 using HTML, CSS, and vanilla JavaScript. Open `index.html` using a local static server or directly in a browser. No application packages or build step are required to run the site.

## Content and hierarchy

| Measure | Before | After |
| --- | ---: | ---: |
| Learning sheets | 50 | 50 |
| Questions and answers | 713 | 713 |
| Unique question review keys | 713 | 713 |
| Available phases | 8 | 8 |
| Roadmap phases represented | 9 | 18 + Capstone |

The 50 original `script.js` content sources are unchanged, verified against Git HEAD with normalized line endings. All original chapter IDs, numbered question anchors, answers, explanations, and sheet URLs remain intact. Source fingerprints, per-phase counts, and all 453 topic-group mappings are in `content-audit.json`.

The complete upstream README is saved in `canonical-roadmap.md`, retrieved from https://github.com/PrinceSinghhub/Ultimate-AI-Engineer-Roadmap-2026 on November 4, 2026. Its phase titles, numbered chapters, unnumbered Phase 0 sections, subheadings, bullet points, tables, code examples, projects, and Capstone drive `roadmap-data.js`.

All 50 sheets map to their canonical chapters. 711 questions map to canonical topics/points. Two single-question groups remain attached to the correct chapter as additional material, with a visible mapping-review label:

- **5.7 / Model comparison**: compares multiple pretrained models rather than one specific model row.
- **7.3 / Fallback Architecture**: covers the chapter's fallback-chain diagram rather than a numbered learning point or the Circuit Breaker Pattern subheading.

No questions were discarded, duplicated, or fabricated for empty sections. These two questions remain searchable, reviewable, bookmarkable, and accessible in their original sheets. The mapping report explicitly flags them rather than inventing canonical headings.

The upstream README advertises 51 phase projects but actually defines **48**: three each for phases 1–16, none for phases 0 and 17. Recall includes all 48 defined projects plus the separate Capstone project, preserving difficulty and descriptions.

## Product changes

- Screenshot-based dashboard, fixed sidebar, functional global search with Ctrl/Cmd+K, user avatar, mobile drawer, and theme selector.
- Separate Overview, Roadmap, Question Bank, Revision, Bookmarks, and Projects views, using query-string URLs with browser history.
- Expandable phases, chapters, topics, and learning points; availability and progress derived from indexed questions. Coming Soon sections show an explanatory placeholder and never add to progress totals.
- Filters for phase, chapter, topic, and review status; incremental question-list rendering.
- Existing index, continuous reading, and focus views retained, including chapter search, topic filtering, expand/collapse, mathematical content, previous/next controls, deep links, aliases, and scroll-based resume.
- Reader chapter navigation, a wide-screen table of contents, bookmarks, and the shared product shell.
- Light default, persistent dark preference, responsive layout, visible focus states, keyboard search results, drawer focus containment, reduced-motion support, and light print output.

## Persistence

Preserved without migration or deletion:

- `recall.reviewed.v1`: original chapter ID plus FNV question-text hash.
- `recall.last-chapter`.
- `recall.position.v1`: chapter ID, numbered question anchor, question, and topic.
- `recall.theme.v1`: existing saved light/dark choices remain honored.

Added `recall.bookmarks.v1` and `recall.projects.v1`. Projects start as Not started and change only through user input. Invalid or blocked storage falls back safely to the current session. Reviewed-question counts ignore stale or nonexistent question keys.

## Files

- `index.html`: new dashboard entry point.
- `recall-app.js`, `recall-app.css`: product behavior, shared shell, design tokens, and responsive styling.
- `roadmap-data.js`: generated canonical hierarchy and question search index; original answers stay in their source sheets.
- `theme.js`: light default while preserving saved preferences.
- 59 existing phase/sheet HTML entry points: load the new shared assets after the original reader assets.
- `scripts/build-roadmap.cjs`: validates and generates the index, mappings, and fingerprints.
- `scripts/wire-recall.cjs`: idempotently adds shared assets to existing HTML entry points.
- `scripts/verify-redesign.cjs`: new product/content browser checks.
- `scripts/verify-study.cjs`, `scripts/verify-theme.cjs`: retained regression suites updated to the redesigned navigation and selector.
- `artifacts/legacy-roadmap.html`: original root hierarchy retained as mapping evidence; not used by the running application.
- `artifacts/ui-review/recall-*.png`: desktop, mobile, reader, and dark screenshots.

## Maintenance and checks

After adding real sheets/questions, update the existing metadata and run:

```powershell
node scripts/build-roadmap.cjs
node scripts/wire-recall.cjs
```

Availability follows the generated question mappings automatically; there are no separately maintained status flags. The builder deliberately asserts the current 50/713 baseline: update those expectations intentionally when new source content is added.

Browser checks use Playwright and Chromium; existing environment variables `RECALL_PLAYWRIGHT` and `RECALL_CHROMIUM` can point to local installations.

```powershell
node scripts/verify-redesign.cjs
node scripts/verify-study.cjs
node scripts/verify-theme.cjs
```

The redesign suite checks original source integrity, all 713 IDs/keys, 50 reader pages and all three study views, 19 roadmap roots, empty sections, search/no-results/shortcut, seeded legacy progress and exact resume, bookmarks, revision counts, project persistence, themes, and responsive overflow. The study suite additionally compares answer HTML across reading/focus transitions and checks history, aliases, rich content, and scroll resume. The theme suite checks all 50 dark readers, contrast, keyboard changes, persistence, cross-tab updates, unavailable storage, responsive views, and print.

Final results: all three suites passed. The study suite compared all 713 answers across all 50 chapters. Additional layout checks passed for every product view at 320, 375, 768, 1024, and 1536 pixels. No browser page errors were reported. JavaScript syntax checks and `git diff --check` passed. Existing regression screenshots were refreshed alongside the new `recall-*.png` screenshots.

UI/UX Pro Max's instructions were read and applied. Its Python search could not run because no Python interpreter is installed; documented general guidance and the supplied screenshot determined the design.
