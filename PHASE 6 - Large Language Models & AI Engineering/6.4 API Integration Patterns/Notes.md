# 6.4 API Integration Patterns

Status: Not started

Write your explanations beneath the topic headings. Reference snippets from the roadmap are retained where present.

## Handling Token Limits

### Count tokens before sending (tiktoken, anthropic tokenizer)

<!-- Add your explanation and an example here. -->

### Truncation strategies

<!-- Add your explanation and an example here. -->

### Context window management

<!-- Add your explanation and an example here. -->

### Summarization of old history

<!-- Add your explanation and an example here. -->


## Streaming APIs

### Server-Sent Events (SSE) - streaming text chunks

<!-- Add your explanation and an example here. -->

### Handling partial responses

<!-- Add your explanation and an example here. -->

### Client-side rendering of streaming output

<!-- Add your explanation and an example here. -->

### Benefits: perceived latency reduction

<!-- Add your explanation and an example here. -->


## Rate Limiting & Retries

### Exponential backoff with jitter

<!-- Add your explanation and an example here. -->

### Respect provider quotas

<!-- Add your explanation and an example here. -->

### Queue-based request management

<!-- Add your explanation and an example here. -->

### Circuit breaker pattern

<!-- Add your explanation and an example here. -->


## Cost Control

### Log token usage per user/feature

<!-- Add your explanation and an example here. -->

### GPT-3.5 vs GPT-4 routing by task complexity

<!-- Add your explanation and an example here. -->

### Prompt compression (strip whitespace, summarize context)

<!-- Add your explanation and an example here. -->

### Caching with SHA-256 fingerprinting

<!-- Add your explanation and an example here. -->

### Async pipelines for non-realtime tasks

<!-- Add your explanation and an example here. -->


## Error Handling & Fallback

```
try:
    response = call_gpt4(prompt)
except APIError:
    response = call_gpt35(prompt)  # cheaper fallback
except RateLimitError:
    response = get_cached_response(prompt)
except Exception:
    response = DEFAULT_MESSAGE
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
