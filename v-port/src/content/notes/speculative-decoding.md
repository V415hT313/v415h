---
title: "Speculative Decoding: Making LLMs Faster Without Changing Them"
date: "2025-01-16"
excerpt: "The inference speedup trick that sounds like cheating: use a small model to guess, and the big model to grade."
---

Kept seeing "speculative decoding" cited as a 2-3x inference speedup with no quality loss, which sounded too good to be true until I understood what it's actually exploiting.

- LLM decoding is **memory-bandwidth bound, not compute bound**  generating one token at a time means the big model's weights get streamed through memory once per token, and most of the GPU's compute sits idle waiting on that transfer.
- Speculative decoding uses a small, cheap **draft model** to generate several tokens ahead speculatively, then runs the big model **once**, in parallel, to verify all of those draft tokens in a single forward pass spending compute the big model was going to waste anyway:

  ```python
  draft_tokens = draft_model.generate(prompt, n=k)
  logits = big_model.forward(prompt + draft_tokens)  # one pass, verifies all k

  accepted = []
  for i, tok in enumerate(draft_tokens):
      if sample(logits[i]) == tok:
          accepted.append(tok)
      else:
          accepted.append(sample(logits[i]))  # big model's own token
          break
  ```
- Wherever the draft model's guesses match what the big model would have produced, those tokens are free. Wherever it diverges, decoding falls back to the big model's own token and the draft resumes from there. Output is provably identical to plain autoregressive decoding from the big model this isn't a quality tradeoff, it's a scheduling trick.

The part that reframed how I think about LLM serving: the bottleneck was never "the model doing the work," it was memory bandwidth sitting idle between tokens. Speculative decoding just gives that idle capacity something useful to do.
