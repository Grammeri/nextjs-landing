# Product Submodule Workflow

This document defines the system-level standard for working with product Git submodules in the Software-Forge platform.

The document belongs to internal developer documentation and defines architectural invariants for working with Git submodules.

This document is read in the IDE.

This document is not intended for public documentation, marketing materials, or onboarding guides.

---

## Purpose

Define a consistent process for:

- integrating product repositories
- updating submodules
- committing submodule pointers

This document applies to all products in the platform.

## Architecture

The platform uses separate Git repositories for each product.

Examples of product repositories:

- AuthForge
- Next.js Professional Starter
- future products

The main platform repository:

`github.com/Grammeri/nextjs-landing`

integrates products as Git submodules.

## Repository Structure

The landing repository contains a `content` directory where product submodules are mounted.

Example structure:

```text
nextjs-landing
│
├ content
│  ├ authforge
│  ├ starter
│  ├ future-products
│
├ src
├ public
```

Each directory inside `content` represents a Git submodule.

Examples:

- `content/authforge`
- `content/starter`

Each submodule is an embedded Git repository and a pointer to a specific commit of the external repository.

## Adding a New Product

A product repository is integrated only once.

Base command:

```bash
git submodule add https://github.com/OWNER/REPOSITORY.git content/{product}
```

Examples:

```bash
git submodule add https://github.com/Grammeri/AuthForge.git content/authforge
git submodule add https://github.com/Grammeri/nextjs-professional-starter.git content/starter
```

After running the command Git:

- creates the `content/{product}` directory
- clones the product repository
- creates the `.gitmodules` file
- records the submodule commit pointer

## Submodule Update Workflow

The workflow always consists of two stages.

First the product repository is updated, then the submodule pointer in the landing repository is updated.

## Updating the Product Repository

Navigate to the product repository and verify its state:

```bash
cd content/{product}
git status
```

Commit the changes and push them to GitHub:

```bash
git add .
git commit -m "docs({product}): update documentation"
git push
```

After this step the product repository is synchronized with GitHub.

## Updating the Submodule Pointer

After updating the product repository the landing repository must update the submodule pointer.

Navigate to the landing repository:

```bash
cd nextjs-landing
```

Update the AuthForge submodule:

```bash
git submodule update --remote content/authforge
```

Update the Starter submodule:

```bash
git submodule update --remote content/starter
```

Generic command for any product:

```bash
git submodule update --remote content/{product}
```

This command fetches the latest commit from the product repository and updates the submodule pointer in the landing repository.

## Verifying Submodule State

Check repository status:

```bash
git status
```

Expected output:

```text
modified: content/{product} (new commits)
```

This means the submodule pointer references a newer commit.

## Committing the Submodule Update

Commit the AuthForge submodule update:

```bash
git add content/authforge
git commit -m "chore(submodule): update authforge documentation"
git push
```

Commit the Starter submodule update:

```bash
git add content/starter
git commit -m "chore(submodule): update starter documentation"
git push
```

## Detached HEAD

Git submodules are typically checked out in a detached HEAD state.

This means the submodule points to a specific commit rather than a branch.

Check the state:

```bash
cd content/{product}
git status
```

Expected output:

```text
HEAD detached at <commit>
```

This is normal and should not be modified.

## Restrictions

The following actions are prohibited:

- committing product files from the landing repository
- running `git checkout main` inside a submodule
- modifying product code without switching to the product repository
- committing the landing repository before committing the product repository

The order of operations must always be respected.

## Verification

### Product verification

```bash
cd content/{product}
git status
git log -1 --oneline
```

Expected output:

```text
On branch main
Your branch is up to date with 'origin/main'.
```

### Landing repository verification

```bash
cd nextjs-landing
git status
```

Expected output:

```text
nothing to commit, working tree clean
```

## Summary

The correct workflow order is always:

1. Commit the product repository
2. Update the submodule pointer
3. Commit the landing repository

This order prevents conflicts and keeps the Git history predictable.