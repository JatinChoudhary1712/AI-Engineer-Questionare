# Phase 11: Generative AI (Beyond Text)

Added seven study chapters using Recall's existing page template, question renderer, shared styles, and browser review storage. Phase 10 remains a Coming soon page and stays before Phase 11 in menu order.

| Chapter | Questions |
| --- | ---: |
| 11.1 Variational Autoencoders | 4 |
| 11.2 Generative Adversarial Networks | 6 |
| 11.3 Diffusion Models | 8 |
| 11.4 Text-to-Image APIs | 6 |
| 11.5 Multimodal AI | 7 |
| 11.6 Audio AI | 5 |
| 11.7 Video AI | 4 |
| Total | 40 |

Answers cover every supplied topic with an introduction, three concrete points, and a takeaway. Supporting material includes VAE/GAN/diffusion formulas, reparameterization and frame-sampling illustrations, a latent-diffusion pipeline diagram, a multimodal-task comparison table, and official/research references.

The roadmap's model and product names are preserved. Provider-specific answers include lifecycle context, particularly the official DALL-E 3 and Sora/Videos API shutdown notices, instead of presenting retired endpoints as working recipes. Theoretical answers distinguish training objectives from sampling procedures and explain limits of anomaly detection, guidance, vision, and frame sampling.

## Files

- `.phase11-build.cjs`: content and repeatable generation.
- Seven Phase 11 chapter `index.html` and `script.js` pairs.
- Phase 11 shared style imports, chapter navigation, consolidated `questions.json`, outline index, and README study link.
- Root `index.html`: Phase 11 outline after the Phase 10 placeholder.
- `study-data.js`: seven new chapters; 50 registered chapters and 713 questions overall.
- `study-ui.js`: Phase 11 label and ordered placement of Phase 10's placeholder.
- `scripts/verify-study.cjs`: updated totals, responsive Phase 11 checks, and placeholder-order checks.
- `.phase9-build.cjs`: its preservation check now accepts later phases.

Original notes, projects, earlier study content, existing chapter URLs, and review keys remain intact. Generation uses parsed chapter IDs rather than single-digit slicing so `11.1` through `11.7` remain distinct.

## Verification

- Full Phase 11 traversal compared all 40 answer bodies between Reading and Focus without content changes.
- Every new chapter passed default Reading, independent answer disclosure, expand/collapse, search, topic filtering, index jumps, browser Back, and legacy fragment links.
- Checked seven multi-digit chapter IDs, chapter-script syntax, 49 local outline links, and preservation of the Phase 10 page.
- Regression checks exercise saved reviews and undo, reload persistence, exact-question locations, legacy view query strings, and navigation.
- Phase 11 Reading/Index/Focus layouts were checked at desktop, 390px, and 320px; screenshots are saved as `phase11-study-*.png`.
- The menu test confirms that Phase 10 precedes Phase 11.
- Official product documentation and original papers were consulted and linked in relevant answers.

Run `node scripts/verify-study.cjs --phase11` for all new answers, or `--targeted` for a smaller cross-library regression run. Set `RECALL_PLAYWRIGHT` and `RECALL_CHROMIUM` to installed local browser tooling.

Browser checks use Chromium with external requests blocked. Lesson snippets are illustrative; live training, GPU inference, provider generation calls, and live CDN math rendering are not exercised. Progress remains browser-local.
