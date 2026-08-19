---
title: "I Debugged a Race Condition in a Dream, and the Fix Actually Worked"
date: "2023-09-27"
excerpt: "Half-asleep me apparently has commit access now."
---

Woke up at 4am convinced I knew why two goroutines were writing to the same map without a lock, scribbled the fix into my phone's notes app half-asleep, went back to bed. Checked it against the actual code the next morning, fully expecting nonsense. It was correct — a missing mutex around a shared cache, exactly where dream-me said it would be. I don't know what this says about my subconscious, but it now has commit access.
