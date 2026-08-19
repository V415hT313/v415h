---
title: "A Practitioner's Read on 'Responsible AI'"
date: "2025-08-22"
excerpt: "Working through a responsible AI course and writing down the parts that were actually actionable."
---

Most "responsible AI" material I'd read before this was principle shaped: fairness, accountability, transparency, repeat. True, but not something you can put in a pull request. This course was more useful because it kept forcing the question "okay, but what do you actually check for, in code, before shipping."

Things I'm taking directly into how I build:

- **Fairness is a metric choice, not a vibe.** Before arguing about whether a model is "fair," you have to pick which fairness definition you mean equal false positive rates across groups, equal opportunity, demographic parity because they can mathematically conflict with each other. Skipping this step is how teams end up arguing past each other. Concretely, this is the check that usually gets skipped:

  ```python
  # equalized odds: FPR and TPR should match across groups
  def group_rates(y_true, y_pred, group):
      mask = group == g
      tp = ((y_pred[mask] == 1) & (y_true[mask] == 1)).sum()
      fp = ((y_pred[mask] == 1) & (y_true[mask] == 0)).sum()
      fpr = fp / (y_true[mask] == 0).sum()
      tpr = tp / (y_true[mask] == 1).sum()
      return fpr, tpr
  ```
- **Data documentation pays off exactly when you don't expect to need it.** A dataset card that records collection method, known gaps, and consent status is annoying to write and invaluable six months later when someone asks "wait, where did this training data even come from."
- **Human-in-the-loop is a design decision with a cost, not a free safety net.** If the review step is boring or the volume is too high, humans rubber-stamp it, and you've bought the appearance of oversight without the substance. Worth sizing the review queue honestly before claiming a human is "checking."

The gap I still notice in a lot of this material: strong on evaluation frameworks, thin on what to do when the honest answer is "we don't have enough data to know if this is fair yet, and we need to ship anyway." That tradeoff is where the real job lives.
