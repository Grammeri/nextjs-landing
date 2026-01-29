# AuthForge Submodule Workflow

This document defines the system-level standard for working with the AuthForge submodule and is part of internal developer documentation that specifies architectural invariants. This document is read in the IDE.

It is not used for public documentation, marketing content, or onboarding guides.

---

## Purpose

Define the rules for working with the AuthForge submodule and the update flow for the commit pointer.

## Architecture

The project uses two separate Git repositories.

**AuthForge** (`github.com/Grammeri/AuthForge`, branch `main`) is an independent project with code and documentation.

**Next.js Landing** (`github.com/Grammeri/nextjs-landing`) uses AuthForge as a git submodule in `content/authforge`.

`content/authforge` is an embedded Git repository and a pointer to a specific AuthForge commit, not a copy of files.

### Submodule add command

```bash
git submodule add https://github.com/Grammeri/AuthForge content/authforge
```

After running this command, Git created the `content/authforge` directory, cloned the AuthForge repository, created `.gitmodules` in the landing root, and recorded the submodule pointer to a specific AuthForge commit.

## Workflow

### Update the AuthForge repository

```bash
cd content/authforge
git status
git add .
git commit -m "docs(authforge): update development setup"
git push
```

After this step, AuthForge is synced with GitHub.

### Update the submodule pointer in the landing

```bash
cd nextjs-landing
git submodule update --remote content/authforge
```

### Check submodule status

```bash
git status
```

Expected result:

```text
modified: content/authforge (new commits)
```

### Commit the submodule update

```bash
git add content/authforge
git commit -m "chore(submodule): update authforge documentation"
git push
```

## Edge cases

### Check detached HEAD in the submodule

```bash
cd content/authforge
git status
```

Expected result:

```text
HEAD detached at ceb1e36
```

This is expected: the submodule is pinned to a specific commit, not a branch.

## Rules and constraints

The following actions are explicitly prohibited: commit AuthForge files from the landing repo, run `git checkout main` inside the submodule, edit AuthForge without switching to its repository, and commit the landing before committing AuthForge.

## Verification

### AuthForge verification

```bash
git status
git log -1 --oneline
```

Expected result:

```text
On branch main
Your branch is up to date with 'origin/main'.
```

### Next.js Landing verification

```bash
git status
```

Expected result:

```text
nothing to commit, working tree clean
```

## Summary

Commit AuthForge first, update the submodule, and commit the landing. This order prevents conflicts and keeps Git history predictable.
