# Phase 7 study questions

Phase 7 now has six HTML study chapters and 67 answered questions, following the question/answer structure and renderer used in Phases 4–6. The previous note-only chapter links now open the study pages.

| Chapter | Questions |
| --- | ---: |
| 7.1 Why Multi-LLM Architecture | 6 |
| 7.2 Routing Strategies | 9 |
| 7.3 Fallback Architecture | 5 |
| 7.4 Model Context Protocol | 9 |
| 7.5 LLM Orchestration Frameworks | 29 |
| 7.6 Building Multi-LLM Systems | 9 |
| Total | 67 |

Every original topic has an answered question. The three roadmap diagrams also have explanatory questions. Answers use an introduction, three concrete points, and a takeaway, with examples, illustrative code, diagrams, and official references where useful. Historical model mappings are identified as examples. Framework API names include version context.

## Implementation

- `.phase7-build.cjs` contains the content and repeatable generation process.
- Each Phase 7 chapter gains `index.html` and `script.js` using the Phase 6 template and renderer.
- Phase 7 gains the same shared question styles and chapter interface as Phase 6, plus a consolidated `questions.json`.
- `study-data.js` registers the six chapters; the full registry now has 32 chapters and 556 questions.
- `study-ui.js` includes Phase 7 in normal chapter navigation instead of the temporary notes-only link.
- The homepage and Phase 7 outline link to the study chapters and individual questions.
- Original notes and project files are preserved. Study content in Phases 4–6 is unchanged.

## Verification

- All 67 new answers were compared between Reading and Focus views; their content markup is preserved.
- Each new chapter passed default Reading, independent disclosure, expand/collapse, index search, topic filtering, question jumps, browser Back, and legacy fragment-link checks.
- Existing review keys, manual undo, reload persistence, saved positions, and compatibility query strings passed regression checks.
- Desktop, tablet, and narrow mobile layouts were exercised; Phase 7 Reading/Index/Focus screenshots are saved as `phase7-study-*.png`.
- New page scripts parse successfully; outline destinations and consolidated metadata were checked.
- Original notes, source diagrams, and chapter coverage were read from the existing Phase 7 roadmap.
- Official MCP, LangChain, LangGraph, and AutoGen references were consulted for framework and version context and linked in relevant answers.

Run `node scripts/verify-study.cjs --phase7` for full Phase 7 answer traversal, or `--targeted` for a smaller cross-library regression run. Set `RECALL_PLAYWRIGHT` and `RECALL_CHROMIUM` to installed browser tooling as documented in that script.

Browser checks use Chromium with external requests blocked; live SDK/provider calls and live CDN math rendering are not exercised. Progress remains browser-local.
