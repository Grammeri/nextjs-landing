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

## 🛠 Prerequisites

To generate the project file tree, you need:

- **Node.js 18+**
- **Git**
- A local clone of the repository

No global npm packages or system tools are required.

The formatting script runs locally using Node.js and is not part of CI or build pipelines.

---

## ✅ Step-by-step process

### Open terminal

Open Git Bash or a terminal, then go to the project root (the directory containing `.git`).

### Generate tracked file list

```bash
git ls-files > tree.git.txt
```

What this command does:

- lists only tracked files
- excludes ignored and untracked files
- produces a stable, git-accurate snapshot

### Format tree snapshot

```bash
node make-tree.js
```

What this command does:

- reads `tree.git.txt`
- generates a structured, human-readable tree
- writes the result to `tree.pretty.txt`

Both files are local-only artifacts and are not committed.

---

## 🧾 Git policy

Ignored local artifacts:

- `make-tree.js`
- `tree.git.txt`
- `tree.pretty.txt`

These rules live in `.gitignore`.

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

This document is the structural reference
for internal tooling and workflow documentation.
