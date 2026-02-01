# Project File Tree Generation Workflow

This document defines how to generate a clean file tree for internal documentation, reviews, and discussions.

It is intended for developers and maintainers who produce internal artifacts in this repository.

It is not used for public documentation, marketing content, or onboarding guides.

---

## Purpose

The file tree is generated to document the current structure during reviews, align on changes in discussions, and keep internal documentation accurate.

The process is local-only and is not part of build or CI.

## Prerequisites

Required tools and environment:

- Node.js 18+
- Git
- A local clone of the repository
- The `pnpm` package manager

The file `make-tree.js` must exist in the repository root.
It is a tracked internal tooling script and must not be deleted.

No global npm packages or additional system tools are required.

The file tree generation runs locally using Node.js and is not part of build or CI pipelines.

## Step-by-step process

### Open terminal

Open Git Bash or a terminal, then go to the project root (the directory containing `.git`).

### Generate tracked file list

```bash
pnpm tree
```
This command is the canonical way to generate a project file tree.

It internally:

- collects tracked files using Git
- formats them into a readable tree
- produces `tree.git.txt` and `tree.pretty.txt` as local artifacts

The result is a stable, git-accurate snapshot of the current repository structure.

### Manual execution (advanced or debugging)

If needed for debugging or inspection, the process may be executed manually:

```bash
git ls-files > tree.git.txt
```

### Format tree snapshot

```bash
node make-tree.js
```

The script reads `tree.git.txt` and generates a structured, human-readable tree in `tree.pretty.txt`.

Both files are local-only artifacts and are not committed.

## Git policy

Ignored local artifacts:

- `tree.git.txt`
- `tree.pretty.txt`

These rules live in `.gitignore`.

## Local file artifacts

The following files may appear in the project root during local work:

- `make-tree.js` — tracked internal tooling file, executed via `pnpm tree`
- `tree.git.txt` — local artifact
- `tree.pretty.txt` — local artifact

Only snapshot files are excluded from the repository and listed in `.gitignore`.

They are safe to keep locally and do not need to be deleted after generation.

If the project file structure changes and an updated snapshot is required, delete `tree.git.txt` and `tree.pretty.txt`, then regenerate them by following the steps described in this document.

The generated snapshot files are local artifacts and are never part of version control history.

## Best practices

Always regenerate the tree using `pnpm tree` before updating docs.

Do not rely on outdated snapshots, and treat the tree as context rather than a source of truth.

## Summary

Generate locally using `pnpm tree`, keep artifacts uncommitted, and document only the final tree snapshot.

This document is the structural reference for internal tooling and workflow documentation.
