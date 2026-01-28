# 🔗 AuthForge Submodule Workflow

This document explains **how to work with the AuthForge submodule**
in the `nextjs-landing` project.

It is intended **only for project developers**
and **must not be published in the browser or marketing docs**.

---

## 🎯 Goal

Define the rules for working with the AuthForge submodule
and the update flow for the commit pointer in the landing project.

---

## 🧠 Architecture

There are two separate Git repositories:

1. **AuthForge**
   - Repository: `github.com/Grammeri/AuthForge`
   - Branch: `main`
   - This is an **independent project**
   - Its code and documentation live there

2. **Next.js Landing**
   - Repository: `github.com/Grammeri/nextjs-landing`
   - Uses AuthForge as a **git submodule**
   - The submodule lives at:
     ```
     content/authforge
     ```

`content/authforge` is **not a copy of files**, but a **pointer to a specific commit**
in the AuthForge repository.

The submodule was added with a single Git command:

```bash
git submodule add https://github.com/Grammeri/AuthForge content/authforge
```

After running this command, Git automatically:

- created the `content/authforge` directory
- cloned the full AuthForge repository into it
- created the `.gitmodules` file in the landing root
- recorded the submodule pointer to a specific AuthForge commit

AuthForge files are not part of the landing repository.
The landing stores only the commit pointer.

`content/authforge` is an embedded Git repository,
not a regular folder.

Any changes inside it are changes in the AuthForge repository,
not in the landing repository.

---

## 🔁 Workflow

### Step 1. Work in the AuthForge repository

```bash
cd content/authforge
git status
git add .
git commit -m "docs(authforge): update development setup"
git push
```

At this stage AuthForge is synced with GitHub.

### Step 2. Update the submodule in the landing

```bash
cd nextjs-landing
git submodule update --remote content/authforge
```

Git will pull the new AuthForge commit.

Check:

```bash
git status
```

Expected:

```
modified: content/authforge (new commits)
```

### Step 3. Commit the submodule update

```bash
git add content/authforge
git commit -m "chore(submodule): update authforge documentation"
git push
```

---

## 🧠 Edge cases

HEAD detached in the submodule:

```bash
cd content/authforge
git status
```

Expected:

```
HEAD detached at ceb1e36
```

The submodule is not on a branch.
It is pinned to a specific commit.
Branches inside the submodule are not used.

---

## ❌ Rules and constraints

- Commit AuthForge files from the landing repo
- Run `git checkout main` inside the submodule
- Edit AuthForge without switching to its repository
- Commit the landing before committing AuthForge

---

## 🧪 Verification

### AuthForge

```bash
git status
git log -1 --oneline
```

Expected:

```
On branch main
Your branch is up to date with 'origin/main'.
```

### Next.js Landing

```bash
git status
```

Expected:

```
nothing to commit, working tree clean
```

---

## 🏁 Summary

AuthForge is a separate repository.
The landing uses a pointer to an AuthForge commit.
HEAD detached in the submodule is normal.

Always first:

- commit AuthForge
- update the submodule
- commit the landing

This order prevents conflicts,
keeps git history clean,
and ensures predictable CI behavior.
