# Content Index, Reading Mode, and Focus Mode

This update supersedes the earlier five-question study-session interface. The implementation stays within the existing static HTML/JavaScript/CSS application.

## Changed files

- `study-ui.js`: three connected chapter views; grouped question-only index; Reading Mode as the default; optional Focus Mode; legacy URL compatibility; shared answer DOM and review storage; exact-question resume and scroll-position tracking.
- `study-ui.css`: compact index groups, view navigation, readable centered layouts, and responsive Focus/Reading styles using the existing blue-and-white tokens and typography.
- `scripts/verify-study.cjs`: regression checks updated for all three views. Pass `--targeted` to compare one answer per chapter while retaining the navigation and persistence checks.
- `artifacts/ui-review/reading-*.png`: desktop/mobile screenshots of all three views.

No lesson content, chapter HTML, question-bank files, chapter metadata, framework, or path-based chapter routes changed in this update. All 26 chapters and 489 questions are retained.

## Views and URLs

| URL | Behavior |
| --- | --- |
| Existing chapter URL | Reading Mode, with answers initially expanded and independently collapsible. |
| `?view=index` | Topic-grouped question links, local search, topic selector, compact counts, and chapter progress. No answers appear in this view. |
| `?view=reading#question-03` | Open Reading Mode, reveal the target answer, and scroll to that question. |
| `?view=focus#question-03` | Show only that question and its existing answer, with Previous/Next and return links. |
| Existing `#question-03` link | Opens the correct answer in Reading Mode. |
| Older `view=browse`, `view=study`, `view=overview` | Remain supported as aliases for Reading, Focus, and Index respectively. Older `question` parameters remain supported. |

The index derives its headings and links from the existing question catalogue. Reading and Focus use the same answer elements, moving an answer temporarily into Focus and restoring it on return. There are no duplicated answer IDs or parallel review records. Index filtering is cleared when entering Reading so it never hides part of the long-form chapter.

Focus no longer stops at five questions. Review marking is optional and never gates navigation. Existing `recall.reviewed.v1` keys remain compatible; `recall.last-chapter` and `recall.position.v1` continue to store the last chapter and question. The homepage Continue learning action resumes in Reading Mode at the saved question. Reading also records the question reached while scrolling.

## Verification

- Traversed all **489 answers across 26 chapters**, comparing original reading markup with Focus markup. Tables, formulas, code, examples, and links are preserved.
- Verified default Reading Mode and all topic headings, including single-topic chapters.
- Verified independent answer collapse, expand/collapse-all, and previous/next chapter links retained in the reader.
- Verified question-only index groups/counts, search, topic filtering, index-to-question jumps, and returning to the index with browser Back.
- Verified existing fragment links in every chapter and compatibility with older query-string views.
- Verified legacy stored review status, undo, reload persistence, Previous/Next, and homepage exact-question resume.
- Verified 1440px, 768px, 390px, and 320px layouts, with narrow-screen table/code/formula checks, menu behavior, and no page-wide horizontal overflow.
- Verified reading scroll position is saved without marking a question reviewed.
- No browser JavaScript errors observed. JavaScript syntax and whitespace checks pass.

Run with an installed Playwright package and compatible Chromium:

```powershell
$env:RECALL_PLAYWRIGHT = '<absolute path to the installed playwright package>'
$env:RECALL_CHROMIUM = '<absolute path to a compatible Chromium executable>'
node scripts/verify-study.cjs
node scripts/verify-study.cjs --targeted
```

## Remaining limits

No known functional regressions. Tests used Chromium, not Firefox or Safari. External requests were blocked for repeatable testing: the existing offline math warning is visible in Reading and Focus, but live CDN math/font loading was not tested. Progress remains browser-local as before. The supplied external image links could not be fetched; visual implementation followed the written requirements and existing Recall screenshots.
