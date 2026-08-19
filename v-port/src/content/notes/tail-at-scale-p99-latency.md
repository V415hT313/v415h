---
title: "The Tail at Scale, Why p99 Latency Eats Everything"
date: "2024-06-25"
excerpt: "Notes on the classic Dean & Barroso observation: at scale, the slowest response wins, not the average one."
---

Revisited this after staring at a dashboard where our average latency looked great and our p99 looked embarrassing, and realizing those two numbers were describing almost entirely different user experiences.

- The core observation: if a single request fans out to, say, 100 backend calls, and each backend has even a 1% chance of a slow (p99) response, the **probability that the overall request is slow approaches 1** as the fan out grows it only takes one slow leaf to make the whole request slow.
- This is why **average latency is close to meaningless** for any fan out system. The metric that matters is the tail, and the tail gets worse, not better, as you add more parallel calls.
- Mitigations that actually target this, rather than just optimizing the average: **hedged requests** (fire a duplicate request to a second replica after a short delay, take whichever comes back first), **tied requests** (send to multiple replicas, cancel the losers once one wins), and reducing the variance of individual components, not just their mean:

  ```go
  select {
  case res := <-primary:
      return res
  case <-time.After(p95Latency):
      select {
      case res := <-primary:
          return res
      case res := <-hedged: // fired only after the delay
          return res
      }
  }
  ```

The reframe that stuck: at scale, you're not optimizing a single request's latency, you're optimizing the latency of "the slowest of everything that has to happen." Those are different design problems.
