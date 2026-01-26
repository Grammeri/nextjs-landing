# 🔗 AuthForge Submodule Workflow

This document describes **how to correctly work with the AuthForge submodule**
in the `nextjs-landing` project.

The document is intended **only for project developers**  
and **must not be published in the browser or marketing docs**.

---

## 🧠 How the repositories are connected

### There are two separate Git repositories:

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

---

## 🔗 What git submodule means in this project

`content/authforge` is **not a copy of files**, but a **pointer to a specific commit**
in the AuthForge repository.

📌 IMPORTANT:

- the landing **does not store AuthForge code**
- it stores the **commit hash** the submodule currently points to
- updating AuthForge = updating the pointer to a new commit

---

## 🔁 Proper workflow (REQUIRED)

### ✅ Step 1. Work in the AuthForge repository

```bash
cd auth-forge


Make changes (docs, code, anything).

Check status:

git status


Commit changes IN AUTHFORGE:

git add .
git commit -m "docs(authforge): update development setup"
git push
```

👉 At this stage AuthForge is fully synced with GitHub.

✅ Step 2. Update the submodule in the landing

Go to the landing project:

```bash
cd nextjs-landing
```

Update the submodule:

```bash
git submodule update --remote content/authforge
```

Git will pull the new AuthForge commit.

🔍 Check
```bash
git status
```

You will see:

```
modified: content/authforge (new commits)
```

👉 This is normal and correct.

It means:

☝️ the submodule pointer was updated and now references the new AuthForge commit

✅ Step 3. Commit the submodule update
```bash
git add content/authforge
git commit -m "chore(submodule): update authforge documentation"
git push
```

🎉 Done.

🧩 Why the submodule is in HEAD detached state

If you enter the submodule:

```bash
cd content/authforge
git status
```

You may see:

```
HEAD detached at ceb1e36
```

❗ This is NOT an error

This is normal git submodule behavior:

the submodule is not on a branch

it is pinned to a specific commit

branches inside the submodule are not used

👉 Nothing needs to be done.

❌ What you must NOT do

🚫 Commit AuthForge files from the landing repo
🚫 Run git checkout main inside the submodule
🚫 Try to edit AuthForge without switching to its repository
🚫 Commit the landing before committing AuthForge

🧪 How to verify everything is synced
In AuthForge:
```bash
git status
git log -1 --oneline
```

Expected:

```
On branch main
Your branch is up to date with 'origin/main'.
```

In the landing:
```bash
git status
```

Expected:

```
nothing to commit, working tree clean
```

🏁 Summary

AuthForge is a separate repository

The landing uses a pointer to an AuthForge commit

HEAD detached in the submodule is normal

Always first:

commit AuthForge

update the submodule

commit the landing

💡 This approach guarantees:

no conflicts

clean git history

predictable CI behavior
