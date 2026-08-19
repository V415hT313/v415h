---
title: "ReAct:  the Pattern Behind Every Agent Loop"
date: "2025-06-11"
excerpt: "Before 'agents' were a product category, there was ReAct: reason, act, observe, repeat. Still the skeleton under most agent frameworks."
---

Every agent framework I've poked at however dressed up with its own vocabulary turns out to be doing some version of the same loop, and that loop has a name and a 2022 paper behind it: ReAct (Reason + Act).

- The pattern interleaves **reasoning traces** (the model thinking out loud about what to do next) with **actions** (calling a tool, running a query, hitting an API) and **observations** (the result that comes back), repeated until the task is done:

  ```
  Thought: I need the current weather in Hyderabad before I can answer.
  Action: get_weather(city="Hyderabad")
  Observation: {"temp_c": 31, "condition": "clear"}
  Thought: I have enough to respond now.
  Final Answer: It's clear and 31°C in Hyderabad.
  ```
- Why interleaving matters over "plan everything up front, then execute": the reasoning step lets the model **replan based on what it actually observed**, instead of committing to a static plan that breaks the moment reality doesn't match assumptions like a search returning zero results, or an API call failing.
- The unglamorous part every real implementation has to solve that the pattern itself doesn't specify: how many loop iterations before giving up, how to avoid re-trying an action that already failed identically, and how to keep the growing thought/action/observation transcript from blowing the context window on a long task.

Useful reframe: an "agent" is mostly this loop plus a tool interface. The interesting engineering is almost entirely in the guardrails around the loop, not the loop itself.
