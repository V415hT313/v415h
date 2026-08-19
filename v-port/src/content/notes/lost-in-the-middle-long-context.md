---
title: "The 'Lost in the Middle' Problem in Long-Context Models"
date: "2025-04-29"
excerpt: "A bigger context window doesn't mean the model reads it evenly. Notes on why what you put in the middle of a long prompt often gets ignored."
---

Assumed for longer than I'd like to admit that a 100k token context window meant the model treats all 100k tokens equally. It doesn't, and the failure mode has a name.

- Multiple studies found that LLM performance on "find the relevant fact" tasks is **U-shaped with respect to position**: information at the very start or very end of a long context gets retrieved reliably, while information buried in the middle is retrieved noticeably worse even though the model is technically capable of attending to it.
- This isn't about context length limits; it shows up well within a model's stated window. It's about **attention allocation**, not capacity.
- Practical consequence for anyone building RAG or long-context tools: **where you place retrieved documents in the prompt matters**. Putting the most important chunk first or last, instead of in the middle of a stack of retrieved passages, measurably changes answer quality re-ranking retrieved chunks by relevance before insertion, not just retrieving them, is doing real work here.

Filed under "things that make me re-check every RAG pipeline I've touched for where the ground-truth chunk actually landed in the prompt." A cheap sanity check I now run on any retriever:

```python
# does answer quality degrade as the ground-truth chunk moves toward the middle?
for position in range(len(retrieved_chunks)):
    prompt = build_prompt(retrieved_chunks, ground_truth_at=position)
    results[position] = eval_answer(model(prompt), expected)
# plot results — a flat line is good, a dip in the middle is the bug
```
