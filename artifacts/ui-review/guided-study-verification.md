# Focused study redesign

> Superseded by the [Content Index and Reading/Focus update](reading-views-verification.md). This report records the earlier five-question session design.

Implemented using the existing static HTML, shared UI script, and CSS tokens. No framework, chapter URL, lesson content, chapter metadata, or question-bank files changed.

## Changed files

- `index.html`: calmer homepage introduction and a label for the four existing phases.
- `study-ui.js`: compact resume card; on-demand navigation; chapter overview; separate Browse view; one-question Study Mode; five-question sessions; exact-question resume; compatibility with existing review keys and question fragments.
- `study-ui.css`: styles for the new views using the existing palette, typeface, spacing, buttons, and answer formatting.
- `scripts/verify-study.cjs`: repeatable Chromium regression checks. `--targeted` skips the full answer traversal while retaining navigation, persistence, deep-link, and responsive checks.
- `artifacts/ui-review/guided-*.png`: desktop and mobile screenshots of the new interface.

## Behavior

- Chapter URLs open a short overview. Start studying begins at the saved question for that chapter when it is the latest saved location; otherwise it begins at question one.
- `?view=study&question=question-03` opens that question with its answer hidden. Next and Previous update the address and saved position. Previous can also step before the starting question of a resumed session.
- Existing `#question-03` links open the correct question with the answer revealed. In `?view=browse`, fragments open the corresponding catalogue answer and clear conflicting filters.
- `?view=browse` retains search, topic filters, expand/collapse, manual review toggles, question links, and chapter navigation. An open answer also offers Study from here.
- Sessions contain up to five consecutive questions. Finishing offers a pause or another session. Moving forward does not mark a question learned automatically.
- Study Mode uses the original answer DOM, preserving tables, code, formulas, links, and any math rendering. Returning to Browse puts that same answer back in its original place.
- Existing `recall.reviewed.v1` data remains compatible. `recall.last-chapter` is retained; `recall.position.v1` additionally records the exact question. Progress remains browser-local.
- Full navigation and overall progress are available through the menu. Study Mode instead keeps a fixed Exit study link visible.

## Verification results

- Full browser traversal passed for all **26 chapters and 489 answers**. Each answer's markup matched the original catalogue answer after moving into Study Mode.
- Search, topic filters, expand/collapse, and session boundaries passed across all chapters.
- Legacy review data, learned/undo, reload persistence, homepage resume, exact question restoration, and browser Back/Forward passed.
- Fragment links to the final question in every chapter passed; filtered Browse deep links and Study from here also passed.
- Desktop layout and 320px, 390px, and 768px widths passed. Mobile menu opening and Escape dismissal passed.
- Narrow-screen table, code, and formula checks passed without page-wide horizontal overflow.
- External requests were blocked during automated checks. The existing offline math warning remains visible in both Study and Browse when the math CDN cannot load.
- JavaScript syntax checks and `git diff --check` passed. No browser JavaScript errors were observed.

## Remaining limits

No known functional regressions. Browser verification used Chromium; Firefox and Safari were not exercised. Existing external font/math dependencies and browser-only progress storage remain unchanged. Live CDN math rendering was not exercised in the offline test run; the existing answer nodes and math markup are preserved.

## Running the checks

Use an installed Playwright package and compatible Chromium, without adding application dependencies:

```powershell
$env:RECALL_PLAYWRIGHT = '<absolute path to the installed playwright package>'
$env:RECALL_CHROMIUM = '<absolute path to a compatible Chromium executable>'
node scripts/verify-study.cjs
node scripts/verify-study.cjs --targeted
```
