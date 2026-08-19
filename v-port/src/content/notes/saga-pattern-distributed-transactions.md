---
title: "The Saga Pattern for Distributed Transactions"
date: "2023-11-19"
excerpt: "There's no two-phase commit across microservices. Sagas are the pragmatic answer, and the compensating-transaction part is the whole trick."
---

Moved a monolith's checkout flow into three services and immediately hit the question every microservices migration hits eventually: what replaces the database transaction when "the transaction" now spans three services that don't share a database?

- A **saga** is a sequence of local transactions, each in its own service, where every step has a **compensating transaction** that undoes it if a later step fails. Book the flight, reserve the hotel, charge the card if the charge fails, you don't roll back a distributed transaction, you run "cancel hotel" and "cancel flight" as their own explicit operations.
- Two flavors: **choreography**, where each service listens for events and reacts (no central brain, but the flow gets hard to trace), and **orchestration**, where a coordinator service explicitly calls each step and decides what to compensate (easier to reason about, but it's a new single point of complexity):

  ```go
  steps := []Step{bookFlight, reserveHotel, chargeCard}

  for i, step := range steps {
      if err := step.Do(ctx); err != nil {
          for j := i - 1; j >= 0; j-- {
              steps[j].Compensate(ctx) // unwind in reverse order
          }
          return err
      }
  }
  ```
- The part that actually took effort: compensating transactions aren't always a clean inverse. Cancelling a hotel reservation is easy; "uncharging" a card that's already been charged and partially spent by a payout is not sometimes the compensation is a refund workflow, not an undo.

Sagas don't give you atomicity back. They give you a documented, testable way to fail partway through and still end up in a valid state.
