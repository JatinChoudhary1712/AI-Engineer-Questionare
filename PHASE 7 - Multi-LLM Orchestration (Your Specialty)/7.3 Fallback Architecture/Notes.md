# 7.3 Fallback Architecture

Status: Not started

Write your explanations beneath the topic headings. Reference snippets from the roadmap are retained where present.

```
Primary:   GPT-4o           (preferred, best quality)
    ↓ fail
Secondary: Claude 3.5 Sonnet (similar quality)
    ↓ fail
Tertiary:  GPT-3.5 Turbo    (cheaper, still capable)
    ↓ fail
Cache:     Last known response (stale but something)
    ↓ miss
Default:   Static template response
```

## Circuit Breaker Pattern

### Track failure rate per provider

<!-- Add your explanation and an example here. -->

### Open circuit after N failures in M seconds

<!-- Add your explanation and an example here. -->

### Half-open state - test with single request

<!-- Add your explanation and an example here. -->

### Close circuit on success

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
