---
title: "Rubber duck, but the duck is also confused"
date: "2026-01-18"
excerpt: "Some bugs don't survive explanation. This one survived four explanations and a diagram."
---

Rubber duck debugging is supposed to work because explaining the bug out loud forces you to notice the gap in your own logic. Nobody warns you about the bugs where you explain it perfectly, the duck (theoretically) nods along, and the bug is still there, unbothered, at the end.

Spent forty minutes narrating a race condition to an actual desk plant because I didn't have a duck handy. The plant did not help. The bug also did not care that I understood it completely by minute thirty — understanding and fixing turned out to be two different line items, filed under two different kinds of effort.

What actually broke the stalemate wasn't more explaining, it was writing the explanation down instead of saying it out loud. Something about committing the sentence to a page instead of the air made me notice I'd been describing two goroutines as if they always ran in the order I expected them to, which was, of course, the entire bug. The plant gets no credit. The plant did nothing. I have never once seen it acknowledge a single line of code, and yet it remains, somehow, in every debugging story I tell after this one.
