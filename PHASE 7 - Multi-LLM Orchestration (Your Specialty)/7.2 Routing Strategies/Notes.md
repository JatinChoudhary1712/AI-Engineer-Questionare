# 7.2 Routing Strategies

Status: Not started

Write your explanations beneath the topic headings. Reference snippets from the roadmap are retained where present.

## Task-Based Routing

```
Simple query   → Mistral 7B / GPT-3.5    (cheap, fast)
Reasoning      → GPT-4 / Claude 3 Opus   (expensive, accurate)
Long context   → Claude 3.5 Sonnet       (200K context)
Code           → GPT-4 / CodeLlama       (specialized)
Multimodal     → Gemini Pro / GPT-4V     (vision)
Embeddings     → text-embedding-3-small  (cost-effective)
Fast inference → Groq (LLaMA 3)          (ultra-low latency)
```

## Cost-Based Routing

### User tier check: free → cheap models, premium → GPT-4

<!-- Add your explanation and an example here. -->

### Token budget monitoring

<!-- Add your explanation and an example here. -->

### Dynamic routing based on monthly spend

<!-- Add your explanation and an example here. -->

### Cache hit rate optimization

<!-- Add your explanation and an example here. -->


## Performance-Based Routing

### Track response quality per model per task type

<!-- Add your explanation and an example here. -->

### A/B testing models in production

<!-- Add your explanation and an example here. -->

### Feedback loop - user ratings inform routing

<!-- Add your explanation and an example here. -->

### Latency SLA enforcement

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
