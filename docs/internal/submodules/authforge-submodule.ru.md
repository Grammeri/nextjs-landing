# AuthForge Submodule Workflow

Этот документ описывает системный стандарт работы с сабмодулем AuthForge и относится к внутренней разработческой документации, определяющей архитектурные инварианты. Документ читается в IDE.

Документ не используется для публичной документации, маркетинговых материалов или onboarding-гайдов.

---

## Purpose

Зафиксировать правила работы с сабмодулем AuthForge и порядок обновления указателя на коммит.

## Architecture

В проекте используются два отдельных Git-репозитория.

**AuthForge** (`github.com/Grammeri/AuthForge`, ветка `main`) — самостоятельный проект с кодом и документацией.

**Next.js Landing** (`github.com/Grammeri/nextjs-landing`) — использует AuthForge как git submodule в каталоге `content/authforge`.

`content/authforge` — это встроенный Git-репозиторий и указатель на конкретный коммит AuthForge, а не копия файлов.

### Команда подключения сабмодуля

```bash
git submodule add https://github.com/Grammeri/AuthForge.git content/authforge
```

После выполнения команды Git создал папку `content/authforge`, клонировал репозиторий AuthForge, создал `.gitmodules` в корне лендинга и зафиксировал указатель на конкретный коммит AuthForge.

## Workflow

### Обновить репозиторий AuthForge

```bash
cd content/authforge
git status
git add .
git commit -m "docs(authforge): update development setup"
git push
```

После этого изменения AuthForge синхронизированы с GitHub.

### Обновить указатель сабмодуля в лендинге

```bash
cd nextjs-landing
git submodule update --remote content/authforge
```

### Проверить статус сабмодуля

```bash
git status
```

Ожидаемый результат:

```text
modified: content/authforge (new commits)
```

### Зафиксировать обновление сабмодуля

```bash
git add content/authforge
git commit -m "chore(submodule): update authforge documentation"
git push
```

## Edge cases

### Проверить detached HEAD в сабмодуле

```bash
cd content/authforge
git status
```

Ожидаемый результат:

```text
HEAD detached at ceb1e36
```

Это ожидаемое состояние: сабмодуль закреплён на конкретном коммите, а не на ветке.

## Rules and constraints

Следующие действия явно запрещены: коммитить файлы AuthForge из проекта лендинга, делать `git checkout main` внутри сабмодуля, пытаться править AuthForge без перехода в его репозиторий и коммитить лендинг до коммита AuthForge.

## Verification

### Проверка AuthForge

```bash
git status
git log -1 --oneline
```

Ожидаемый результат:

```text
On branch main
Your branch is up to date with 'origin/main'.
```

### Проверка Next.js Landing

```bash
git status
```

Ожидаемый результат:

```text
nothing to commit, working tree clean
```

## Summary

Сначала коммитится AuthForge, затем обновляется сабмодуль, затем коммитится лендинг. Этот порядок предотвращает конфликты и сохраняет предсказуемую историю Git.
