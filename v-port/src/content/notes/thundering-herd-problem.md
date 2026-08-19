---
title: "The Thundering Herd Problem"
date: "2023-03-14"
excerpt: "Why does everything fall over at exactly the same millisecond? Notes on cache stampedes and the fixes nobody mentions until it's too late."
---

Discovered this the hard way before I had a name for it: a cache entry expires, and every one of ten thousand concurrent requests decides, in the same instant, that it's the one responsible for recomputing it. The backend that was serving fine a second ago gets hit with all ten thousand queries at once.

- The classic fix is a **lock or single-flight**: only one request recomputes, everyone else waits on that result instead of duplicating the work. Go's `singleflight` package does this in about thirty lines:

  ```go
  var g singleflight.Group

  func getUser(id string) (*User, error) {
      v, err, _ := g.Do(id, func() (interface{}, error) {
          return fetchUserFromDB(id) // only one caller per key actually runs this
      })
      if err != nil {
          return nil, err
      }
      return v.(*User), nil
  }
  ```
- **Jittered expiry** helps at the edges, if every cache entry expires at exactly TTL, they tend to expire in synchronized waves. Adding random jitter to TTL spreads the recomputation out instead of bunching it.
- The same shape shows up outside caching too: a service restarts and every client reconnects simultaneously, or a scheduled job wakes every node in a cluster at the same cron tick. Anywhere many actors respond identically to the same trigger, you get a herd.

What I want to dig into next: probabilistic early expiration (recomputing slightly before TTL, weighted by how expensive the value was to compute) apparently how some CDNs avoid the stampede without a lock at all.
