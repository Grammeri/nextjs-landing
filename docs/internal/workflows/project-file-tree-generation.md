# Project File Tree Generation Workflow

This document defines how to generate a clean and accurate project file tree
for internal documentation, reviews, and technical discussions.

It is intended for developers and maintainers working with this repository.

It is not used for:
- public documentation
- marketing materials
- onboarding guides
- CI or build pipelines

---

## Purpose

The project file tree is generated to:
- document the current repository structure during reviews
- align on architectural changes in discussions
- keep internal documentation accurate and consistent

The process is local-only and intentionally not automated.

## Important note about `pnpm tree`

Do not use `pnpm tree` for this workflow.

`pnpm tree` is a built-in pnpm command that outputs the dependency graph
(`node_modules`). It is not suitable for generating a repository file tree and
will produce large, unreadable output.

This workflow relies on Git, not on pnpm internals.

## Prerequisites

Required tools and environment:
- Node.js 18+
- Git
- A local clone of the repository

The following file must exist in the repository root:
- `make-tree.js` — tracked internal tooling script

This file must not be deleted or moved.

## How to generate the file tree

Open a terminal (Git Bash, PowerShell, or similar) and navigate to the project
root — the directory containing the `.git` folder.

### Generate the tree

```bash
git ls-files > tree.git.txt
node make-tree.js
```

This does the following:
- collects only Git-tracked files
- excludes node_modules, build output, and ignored files
- produces a stable, Git-accurate snapshot
- generates a readable tree representation

## Generated files

During local work, the following files may appear in the project root:
- `make-tree.js` — tracked internal tooling script
- `tree.git.txt` — local artifact (input)
- `tree.pretty.txt` — local artifact (output)

Only `make-tree.js` is tracked in Git.

## Git policy

The following files are explicitly ignored and must never be committed:
- `tree.git.txt`
- `tree.pretty.txt`

These rules are defined in `.gitignore`.

The snapshot files are safe to keep locally and may be deleted at any time.

## Regenerating the tree

If the project structure changes and an updated snapshot is required:

### Remove old artifacts

```bash
rm tree.git.txt tree.pretty.txt
```

### Generate a new snapshot

```bash
git ls-files > tree.git.txt
node make-tree.js
```

## Best practices

- Always regenerate the tree immediately before updating documentation.
- Treat the tree as context, not as a source of truth.
- Never include dependency trees or node_modules.
- Do not automate this workflow in CI.

## Summary

- The file tree is generated locally.
- Git is the source of truth.
- Snapshot files are never committed.
- This document defines the canonical workflow for this repository.
