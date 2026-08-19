---
title: "The Confused Deputy Problem, Now With Agents"
date: "2026-05-07"
excerpt: "An old security problem from the 80s is exactly the vulnerability shape hiding inside a lot of agentic tool use."
---

Read an incident writeup about an AI agent that had legitimate access to a system, was tricked by untrusted input into misusing that access, and recognized the shape immediately this is the confused deputy problem, and it's older than I am.

- The classic 1988 formulation: a program (the "deputy") has more authority than the party asking it to act, and gets tricked by that party into misusing its own legitimate authority on their behalf. The deputy isn't compromised it's doing exactly what it was told, with permissions it's genuinely entitled to.
- The agentic version: an AI agent with a tool that can, say, send emails or execute code has **its own credentials**, and if it processes untrusted input (a webpage it fetched, a document it read) that contains an instruction, it can end up using its legitimate authority to do something the input's source wanted, not what the user wanted. This is most of what "prompt injection via tool use" actually is, mechanically.
- The mitigation is the same one the original problem prescribes: **don't let ambient authority get exercised on behalf of untrusted input**. Capability-based security (the tool call itself carries exactly the permission it needs, scoped and explicit) instead of the agent holding a standing credential it applies indiscriminately to whatever it's currently processing:

  ```
  # ambient authority the deputy's own broad credential, reused for everything
  send_email(to, body)  # uses a standing SMTP credential the agent always has

  # capability-based a scoped, single-use token minted per task
  send_email(to, body, capability=mint_token(scope="email:send", ttl="5m"))
  ```

The unsettling part: agent frameworks are re-discovering a 35-year-old access control problem at the exact speed they're being given more autonomous authority to misuse.
