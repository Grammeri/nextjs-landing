# 🌳 Project File Tree Generation

This document explains **how to generate a clean file tree**
for internal documentation, reviews, and discussions.

It is **for developers only** and **is not part of build or CI**.

---

## 🎯 Purpose

We generate a file tree to:

- document the current structure during reviews
- align on changes in discussions
- keep internal docs accurate

This process is **local-only** and **not product-facing**.

---

## 🧠 Principles

- the tree is generated locally
- temporary files are ignored via `.gitignore`
- only the final text snapshot is copied into documentation

---

## ✅ Step-by-step process

1. Open Git Bash or a terminal.
2. Go to the project root (the directory with `.git`).
3. Run:

```bash
git ls-files > tree.git.txt
```

What this command does:

- lists only **tracked** files
- excludes ignored and untracked files
- saves the list into `tree.git.txt` locally

---

## 🧩 Tree formatting

You may format `tree.git.txt` into a readable tree using a local script.

Important:

- the formatter script is **local-only**
- it is **not committed**
- any team-preferred formatter is acceptable

The final output is copied into documentation manually.

---

## 🧾 Git policy

Local-only artifacts are intentionally ignored:

- `make-tree.js`
- `tree.git.txt`
- `tree.pretty.txt`

These entries are defined in `.gitignore`.

---

## ✅ Best practices

- regenerate the tree before updating docs
- never rely on outdated snapshots
- treat the tree as **context**, not a source of truth

---

## 🏁 Summary

- generate locally
- keep artifacts uncommitted
- document only the final tree snapshot
