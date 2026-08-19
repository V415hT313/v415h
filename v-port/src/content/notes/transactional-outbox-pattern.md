---
title: "The Transactional Outbox Pattern"
date: "2024-02-08"
excerpt: "How do you publish a Kafka event and write to your database as one atomic-feeling operation? You don't, you cheat, correctly."
---

The problem sounds small until you've been paged for it: a service writes a row to Postgres, then publishes an event to Kafka about that write. What happens when the write succeeds and the publish fails? Or the reverse? A database transaction can't protect you from that, because Kafka isn't part of it.

- The **outbox pattern** sidesteps the two-system problem by only writing to one system: the row and the "event to publish" go into the same database transaction, in an `outbox` table:

  ```sql
  BEGIN;
    INSERT INTO orders (id, status) VALUES ('o1', 'created');
    INSERT INTO outbox (id, topic, payload, published)
    VALUES ('o1', 'order.created', '{"orderId":"o1"}', false);
  COMMIT;
  ```
- A separate process, a polling job, or better, a **CDC (change data capture) connector like Debezium** reading the database's write-ahead log picks up new outbox rows, publishes them to Kafka, then marks them published.
- This gives you **at-least-once delivery** with real atomicity between "the fact happened" and "the fact will eventually be published," at the cost of consumers needing to handle occasional duplicate events (idempotency keys, not exactly-once fantasies).

The part I underestimated: this pattern is boring, which is exactly why it works. No new consensus protocol just moving the ordering problem somewhere a single ACID transaction can already solve it.
