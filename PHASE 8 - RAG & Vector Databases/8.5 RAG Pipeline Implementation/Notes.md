# 8.5 RAG Pipeline Implementation

Status: Not started

Write your explanations beneath the topic headings. Reference snippets from the roadmap are retained where present.

## Basic RAG

```
Document → Chunk → Embed → Store in Vector DB
                                    ↓
User Query → Embed → Retrieve Top-K Chunks
                                    ↓
            Chunks + Query → LLM → Answer
```

## Advanced RAG Techniques

### **Hypothetical Document Embeddings (HyDE)** - generate hypothetical answer, embed it for retrieval

<!-- Add your explanation and an example here. -->

### **Query expansion** - generate multiple query variants

<!-- Add your explanation and an example here. -->

### **Reranking** - use a cross-encoder to rerank retrieved chunks (Cohere Rerank, BGE Reranker)

<!-- Add your explanation and an example here. -->

### **Multi-query retrieval** - decompose complex question into sub-queries

<!-- Add your explanation and an example here. -->

### **Self-querying** - LLM generates structured filter from natural language

<!-- Add your explanation and an example here. -->

### **Contextual compression** - compress retrieved context before sending to LLM

<!-- Add your explanation and an example here. -->

### **Parent document retriever** - retrieve small chunks, return parent document

<!-- Add your explanation and an example here. -->

### **Multi-vector retriever** - multiple embeddings per document (summary + full text)

<!-- Add your explanation and an example here. -->


## RAG Evaluation

### Faithfulness - is the answer grounded in retrieved context?

<!-- Add your explanation and an example here. -->

### Answer relevance - does the answer address the question?

<!-- Add your explanation and an example here. -->

### Context precision - are the retrieved chunks relevant?

<!-- Add your explanation and an example here. -->

### Context recall - did we retrieve all necessary information?

<!-- Add your explanation and an example here. -->

### Tools: RAGAs framework, LangSmith, TRULENS

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
