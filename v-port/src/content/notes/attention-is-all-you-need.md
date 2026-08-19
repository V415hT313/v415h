---
title: "Attention Is All You Need"
date: "2025-12-28"
excerpt: "Reading through the paper that started it all, mostly to finally understand what 'attention' means outside of tutorials."
---

Read this properly for the first time instead of relying on the diagram everyone reposts. A few things that clicked:

- **The core trick is comparing every token to every other token directly**, instead of passing information through a chain of recurrent steps. That's the whole pitch no more waiting for state to propagate one step at a time, which is what made RNNs slow to train and bad at long-range dependencies.
- **Query, Key, Value is just a soft lookup table.** The query asks "what am I looking for," the key says "what do I contain," and the dot product between them decides how much of each value gets pulled in. Once I stopped trying to visualize it geometrically and just thought of it as a weighted dictionary lookup, the rest of the paper read a lot faster.
- **Multi-head attention isn't about accuracy so much as vocabulary.** Each head can specialize one tracking syntax, another tracking coreference and concatenating them gives the model several "lenses" instead of one blurry average.
- **Positional encoding is a hack, and the paper is honest about it.** Since attention has no built-in sense of order, they add sinusoidal position vectors to the input embeddings so the model has something to work with. Later papers replace this with learned or rotary embeddings, which apparently work better, but it's worth seeing the original duct tape.

The whole mechanism is one formula once you strip the diagram away:

```
Attention(Q, K, V) = softmax(QKᵀ / √d_k) V
```

The `√d_k` is the part I used to skip over, it's just there to stop the dot products from growing too large as dimensionality increases, which would push softmax into regions with vanishingly small gradients.

Open question I'm still chewing on: the paper motivates self attention partly on parallelization grounds (no sequential dependency during training), but I want a clearer mental model of why that specifically translates into the quality gains, not just the speed gains. Next on the list: the RoPE paper, to see what actually replaced the sinusoidal encoding.
