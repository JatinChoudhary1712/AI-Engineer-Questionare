# 13.6 Cost-Aware Architecture

Status: Not started

Write your explanations beneath the topic headings. Reference snippets from the roadmap are retained where present.

## Per-feature model selection:

```
Autocomplete    → GPT-3.5 Turbo ($0.001/1K)
Summarization   → Claude Haiku  ($0.00025/1K)
Complex QA      → GPT-4o        ($0.01/1K)
Embeddings      → text-embedding-3-small ($0.00002/1K)
Classification  → Fine-tuned GPT-3.5 ($0.003/1K)
```

## Cost reduction strategies:

### Prompt compression - remove unnecessary tokens

<!-- Add your explanation and an example here. -->

### Output length limits - `max_tokens` parameter

<!-- Add your explanation and an example here. -->

### Caching (50-70% reduction for typical apps)

<!-- Add your explanation and an example here. -->

### Model downgrade for free tier users

<!-- Add your explanation and an example here. -->

### Async batching - bundle requests

<!-- Add your explanation and an example here. -->

### Context window optimization

<!-- Add your explanation and an example here. -->


## My summary


## Practice and examples


## Questions and mistakes


## Resources

- Source: [Original roadmap](https://github.com/PrinceSinghhub/Ultimate-AI-Engineer-Roadmap-2026)

## Revision check

- [ ] Explain the topic without looking at notes.
- [ ] Work through an example.
- [ ] Answer my open questions.
