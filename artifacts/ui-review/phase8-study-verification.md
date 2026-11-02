# Phase 8: RAG & Vector Databases

Implemented six study chapters using the existing Phase 6 question template and renderer, with the Reading, Content/Index, and Focus views already used throughout Recall.

| Chapter | Questions |
| --- | ---: |
| 8.1 Why RAG Exists | 5 |
| 8.2 Embeddings Deep Dive | 7 |
| 8.3 Chunking Strategies | 7 |
| 8.4 Vector Databases | 15 |
| 8.5 RAG Pipeline Implementation | 14 |
| 8.6 Production RAG Considerations | 6 |
| Total | 54 |

Every supplied topic is covered. The database chapter includes a question for each of the nine tools plus the six database operations. The basic RAG diagram has its own explanatory question. Answers contain an introduction, three concrete points, and a takeaway, supplemented by examples, comparison tables, formulas, illustrative Python, the pipeline diagram, and official references.

The original database comparison is retained in the outline as roadmap shorthand. Answers clarify that FAISS is a search library, database deployment options vary, model IDs/configurations must be compatible, and RAG does not guarantee factual accuracy or authorization. Definitions of faithfulness, relevance, context precision, and context recall remain distinct.

## Files

- `.phase8-build.cjs`: content and repeatable build process.
- Phase 8 chapter `index.html` and `script.js` files: six real question-and-answer pages.
- Phase 8 `questions.json`, shared question styles, and chapter interface files.
- Phase 8 `index.html` and the root `index.html`: plain roadmap with links to lessons and individual questions.
- `study-data.js`: six new chapters; the registry now contains 38 chapters and 610 questions.
- `study-ui.js`: Phase 8 navigation label.
- Phase 8 `README.md`: study index and question count.
- `scripts/verify-study.cjs`: updated registry checks, phase selection, and Phase 8 responsive screenshots.
- `.phase7-build.cjs`: its preservation check now tolerates later phases when rebuilding Phase 7.

Existing notes, projects, earlier study questions, and browser review keys are preserved.

## Verification

- Full Phase 8 traversal compared all 54 answer bodies between Reading and Focus without changes to their content markup.
- New chapters passed default Reading, independent disclosure, expand/collapse, index search, topic filters, question jumps, browser Back, and fragment-link checks.
- Syntax checks covered all six new chapter scripts and the generator.
- Validated the phase outline's 61 local links, nine database table rows, and question metadata.
- Existing manual review/undo, saved location, reload persistence, legacy view aliases, and browser navigation were exercised by the regression suite.
- Tested Phase 8 Reading/Index/Focus at 1440px, 390px, and 320px, with screenshots stored as `phase8-study-*.png`.
- Official embedding model documentation, database documentation, the original HyDE paper, and Ragas metric documentation were consulted and linked in relevant answers.

Use `node scripts/verify-study.cjs --phase8` for the full new-phase traversal, or `--targeted` for a smaller cross-library regression run. Set `RECALL_PLAYWRIGHT` and `RECALL_CHROMIUM` to installed local browser tooling.

Checks use Chromium with external requests blocked. Live provider/SDK calls, embedding quality benchmarks, and live CDN math rendering are outside this static-content verification. Progress remains browser-local.
