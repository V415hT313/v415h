---
title: "CRDTs (Conflict-free Replicated Data Types)"
date: "2023-07-02"
excerpt: "Data structures that merge without coordination. Read this after one too many arguments about eventual consistency."
---

Kept hearing "CRDT" thrown around in distributed systems conversations without a clear picture of what made them different from just replicating data and hoping for the best. The actual idea is narrower and more elegant than I expected.

- A CRDT is a data structure designed so that **replicas can be updated independently, without coordination, and still converge to the same state** when their updates are merged no consensus round, no locking.
- The trick is mathematical, not clever engineering: operations have to be commutative, associative, and idempotent (or the state has to form a semilattice with a well defined merge). A grow only counter where you only ever add is trivially a CRDT; a counter that also decrements needs two grow only counters under the hood (a PN-Counter) to stay conflict-free:

  ```
  # PN-Counter: value = sum(P) - sum(N)
  increment(replica): P[replica] += 1
  decrement(replica): N[replica] += 1
  merge(a, b):        P[i] = max(a.P[i], b.P[i])  for all i
                       N[i] = max(a.N[i], b.N[i])  for all i
  ```

  Merge only ever takes the max per replica slot, so applying it twice (or out of order) doesn't change the outcome that's the idempotence the whole approach depends on.
- Real systems using them: Redis's CRDT based Active-Active, Riak, and the collaborative editing engines behind tools like Figma (for the parts that aren't OT-based).

The tradeoff nobody puts on the marketing slide: CRDTs sidestep coordination by giving up the ability to express arbitrary invariants across replicas. "Never let the balance go negative" is not a CRDT friendly constraint.
