# 13.5 Async AI Architecture

Status: Not started

Write your explanations beneath the topic headings. Reference snippets from the roadmap are retained where present.

## When to use async:

### Model latency > 2-3 seconds

<!-- Add your explanation and an example here. -->

### Processing expensive (PDF analysis, batch jobs)

<!-- Add your explanation and an example here. -->

### User doesn't need immediate response

<!-- Add your explanation and an example here. -->


## Async pattern:

```
Frontend → POST /task → Task ID returned immediately
Worker → processes → updates DB
Frontend → polls GET /task/{id} or receives webhook
```

## My summary


## Practice and examples


## Questions and mistakes


## Resources

- Source: [Original roadmap](https://github.com/PrinceSinghhub/Ultimate-AI-Engineer-Roadmap-2026)

## Revision check

- [ ] Explain the topic without looking at notes.
- [ ] Work through an example.
- [ ] Answer my open questions.
