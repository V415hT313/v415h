---
title: "Model Context Protocol (MCP), a Common Interface for Agent Tools"
date: "2026-02-20"
excerpt: "Every agent framework used to wire up tools its own way. MCP is the attempt at a shared protocol, and it's spreading faster than I expected."
---

Watched this go from "some new spec I should probably skim" to "half the tooling I use daily speaks it" in under a year, which is usually a sign something solved a real annoyance.

- Before MCP, connecting an LLM agent to, say, a filesystem, a database, and a search API meant writing three bespoke integrations, one per agent framework, none of them reusable across frameworks.
- **MCP standardizes the interface between an AI application and external tools/data sources** a server exposes "resources," "tools," and "prompts" over a defined protocol (JSON-RPC under the hood), and any MCP compatible client can talk to it without custom glue code per integration:

  ```json
  {
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": { "name": "get_weather", "arguments": { "city": "Hyderabad" } },
    "id": 1
  }
  ```
- The analogy that made it click for me: it's aiming to do for agent-tool connections roughly what **LSP (Language Server Protocol)** did for editor-language integrations instead of every editor writing a plugin for every language, you write one server and every compliant client can use it.

What I'm still watching: whether the security model (a tool server can expose a lot of surface area to an agent that's calling it autonomously) matures as fast as adoption is moving. Standardizing the interface doesn't automatically standardize the guardrails.
