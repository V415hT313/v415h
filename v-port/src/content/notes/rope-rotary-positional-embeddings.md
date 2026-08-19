---
title: "RoPE: Rotary Positional Embeddings"
date: "2024-10-03"
excerpt: "Follow-up to my Attention Is All You Need notes: what actually replaced sinusoidal position encoding, and why it's not just a different lookup table."
---

Said I'd come back to this after the original Transformer notes, where positional encoding felt like the paper's one acknowledged hack. RoPE is the answer most modern LLMs (LLaMA, GPT-NeoX, and others) settled on, and it's a genuinely different idea, not just a better table of numbers.

- Instead of **adding** a position vector to the token embedding (the original approach), RoPE **rotates** the query and key vectors by an angle proportional to their position, in pairs of dimensions treated as 2D planes:

  ```
  # for each 2D pair (x, y) in the embedding, at position m:
  x' = x·cos(mθ) - y·sin(mθ)
  y' = x·sin(mθ) + y·cos(mθ)
  ```
- The elegant consequence: the dot product between a rotated query at position *m* and a rotated key at position *n* depends only on their **relative distance** (*m − n*), not their absolute positions. Relative position falls out of the math instead of being engineered in separately.
- Practically, this is a big part of why RoPE-based models extrapolate to longer contexts more gracefully than absolute positional encoding the relative distance property doesn't break just because you've gone past the sequence length seen in training (though it does degrade, hence all the position-interpolation and NTK-scaling tricks people layer on top).

Small idea, disproportionate impact: nearly every open-weight LLM I can think of uses some variant of this now.
