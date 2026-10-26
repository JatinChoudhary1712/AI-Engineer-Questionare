# 13.2 Classic AI System Designs

Status: Not started

Write your explanations beneath the topic headings. Reference snippets from the roadmap are retained where present.

## AI Chatbot with Memory

```
Frontend (Chat UI) → Backend API → Session Manager (Redis)
→ Context Builder → LLM → Response → Cache → Return
Fallback: if LLM fails → cached response or template
```

## RAG Knowledge Base

```
Documents → Ingestion Pipeline → Chunker → Embedder → Vector DB
User Query → Embed → Retrieve Top-K → Rerank → LLM → Answer
```

## Multi-LLM Recommendation System

```
User Profile → Embedding → Vector DB Similarity
→ GPT scoring → Re-rank → Personalized Results
Feedback loop → Update embeddings
```

## PDF Q&A at Scale (10K users)

```
Upload → Hash check → Queue → Text Extract → Chunk → Embed → Store
Query → Embed → Retrieve → Rerank → GPT → Stream Response
Cache: query-level caching with semantic similarity
```

## AI Customer Support

```
Message → Intent classifier → Router
Low confidence → Human escalation
High confidence → RAG knowledge base → LLM response
Track: session state in Redis, conversation in PostgreSQL
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
