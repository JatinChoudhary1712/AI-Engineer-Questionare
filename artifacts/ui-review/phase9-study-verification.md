# Phase 9: AI Agents & Agentic Systems

Implemented five complete study chapters using the existing Phase 6 page template and question renderer. The new content uses Recall's shared Reading, Content/Index, Focus, search, topic filtering, and manual review interface.

| Chapter | Questions |
| --- | ---: |
| 9.1 What Are AI Agents | 5 |
| 9.2 Agent Components | 17 |
| 9.3 Function Calling / Tool Use | 14 |
| 9.4 Multi-Agent Systems | 13 |
| 9.5 Agentic AI (AskAI Framework) | 14 |
| Total | 63 |

Each supplied topic has an answered question. Answers follow the earlier phases' introduction, three concrete points, and takeaway format. Examples include a chain/agent comparison table, an illustrative bounded agent loop, a calculator tool, an OpenAI Responses function definition, a Claude tool-result block, and a persisted task-state example.

Official OpenAI, Claude, and LangGraph documentation was checked for tool and workflow contracts. Relevant answers link those references and the original ReAct, Tree of Thoughts, and MRKL papers. AskAI is retained as the roadmap's chapter heading; the answers describe the listed principles without inventing an undocumented SDK contract.

## Changed files

- `.phase9-build.cjs`: answered content and repeatable generation.
- Five Phase 9 chapter `index.html` / `script.js` pairs.
- Phase 9 `questions.json`, shared style imports, and chapter interface script.
- Root and Phase 9 indexes: plain roadmap with chapter and question links.
- `study-data.js`: five new chapter entries; 43 chapters and 673 questions overall.
- `study-ui.js`: Phase 9 navigation label.
- Phase 9 `README.md`: study index and coverage information.
- `scripts/verify-study.cjs`: updated totals and Phase 9 responsive checks.
- `.phase8-build.cjs`: preservation check accepts later phases when rebuilding Phase 8.

Original notes, projects, earlier study content, and existing browser review keys are preserved.

## Verification

- Traversed all 63 new answers and compared their markup between Reading and Focus.
- Verified default Reading, independent disclosure, expand/collapse, search, topic filtering, index jumps, browser Back, and fragment URLs for every new chapter.
- Checked all five new chapter scripts, consolidated metadata, and 70 local outline links.
- Regression checks exercised review/undo, reload persistence, stored positions, legacy view aliases, and menu navigation.
- Captured Phase 9 Reading/Index/Focus screenshots at desktop and phone widths; also checked 320px layouts for page-wide overflow.
- JavaScript syntax and whitespace checks pass. No browser JavaScript errors observed in the new-phase traversal.

Run `node scripts/verify-study.cjs --phase9` for full Phase 9 traversal, or `--targeted` for the smaller cross-library suite. Set `RECALL_PLAYWRIGHT` and `RECALL_CHROMIUM` to installed local browser tooling.

Verification uses Chromium with external requests blocked. Illustrative agent/tool snippets are lesson content, not a live provider-backed agent implementation. Live SDK/provider calls, Firefox/Safari, and live math-CDN loading were not exercised. Progress remains browser-local.
