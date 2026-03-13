# Product Submodule Workflow

Этот документ описывает системный стандарт работы с продуктовыми Git-сабмодулями платформы Software-Forge.

Документ относится к внутренней разработческой документации и определяет архитектурные инварианты работы с Git-сабмодулями.

Документ читается в IDE.

Документ не используется для публичной документации, маркетинговых материалов или onboarding-гайдов.

---

## Цель

Зафиксировать единый порядок:

- подключения продуктовых репозиториев
- обновления сабмодулей
- фиксации указателей на коммиты

Документ применяется ко всем продуктам платформы.

## Архитектура

В платформе используются отдельные Git-репозитории для каждого продукта.

Примеры продуктовых репозиториев:

- AuthForge
- Next.js Professional Starter
- future products

Основной репозиторий платформы:

`github.com/Grammeri/nextjs-landing`

использует продукты как Git-сабмодули.

## Структура репозитория

В репозитории лендинга используется каталог `content`, в котором размещаются сабмодули продуктов.

Пример структуры:

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

Каждая папка внутри `content` является Git-сабмодулем.

Примеры:

- `content/authforge`
- `content/starter`

Каждый сабмодуль — это встроенный Git-репозиторий и указатель на конкретный коммит внешнего репозитория.

## Подключение нового продукта

Подключение выполняется один раз.

Базовая команда:

```bash
git submodule add https://github.com/OWNER/REPOSITORY.git content/{product}
```

Примеры:

```bash
git submodule add https://github.com/Grammeri/AuthForge.git content/authforge
git submodule add https://github.com/Grammeri/nextjs-professional-starter.git content/starter
```

После выполнения команды Git:

- создаёт каталог `content/{product}`
- клонирует репозиторий продукта
- создаёт файл `.gitmodules`
- фиксирует указатель на текущий коммит продукта

## Рабочий процесс обновления сабмодуля

Работа выполняется в два этапа.

Сначала обновляется продуктовый репозиторий, затем обновляется указатель сабмодуля в лендинге.

## Обновление репозитория продукта

Перейти в репозиторий продукта и проверить состояние:

```bash
cd content/{product}
git status
```

Зафиксировать изменения и отправить их в GitHub:

```bash
git add .
git commit -m "docs({product}): update documentation"
git push
```

После этого изменения продукта синхронизированы с GitHub.

## Обновление указателя сабмодуля

После обновления продукта необходимо обновить указатель сабмодуля в лендинге.

Перейти в репозиторий лендинга:

```bash
cd nextjs-landing
```

Обновить сабмодуль AuthForge:

```bash
git submodule update --remote content/authforge
```

Обновить сабмодуль Starter:

```bash
git submodule update --remote content/starter
```

Универсальная команда для любого продукта:

```bash
git submodule update --remote content/{product}
```

Команда получает последний коммит продуктового репозитория и обновляет указатель сабмодуля в лендинге.

## Проверка состояния сабмодуля

Проверить статус репозитория:

```bash
git status
```

Ожидаемый результат:

```text
modified: content/{product} (new commits)
```

Это означает, что указатель сабмодуля обновлён на новый коммит продукта.

## Фиксация обновления сабмодуля

Зафиксировать обновление сабмодуля AuthForge:

```bash
git add content/authforge
git commit -m "chore(submodule): update authforge documentation"
git push
```

Зафиксировать обновление сабмодуля Starter:

```bash
git add content/starter
git commit -m "chore(submodule): update starter documentation"
git push
```

## Detached HEAD

Git-сабмодули обычно находятся в состоянии detached HEAD.

Это означает, что сабмодуль закреплён на конкретном коммите, а не на ветке.

Проверка состояния:

```bash
cd content/{product}
git status
```

Ожидаемый результат:

```text
HEAD detached at <commit>
```

Это нормальное состояние и его не нужно изменять.

## Ограничения

Запрещены следующие действия:

- коммитить файлы продукта из репозитория лендинга
- выполнять `git checkout main` внутри сабмодуля
- изменять код продукта без перехода в его репозиторий
- коммитить лендинг до коммита продукта

Правильный порядок действий всегда один.

## Проверка

### Проверка продукта

```bash
cd content/{product}
git status
git log -1 --oneline
```

Ожидаемый результат:

```text
On branch main
Your branch is up to date with 'origin/main'.
```

### Проверка лендинга

```bash
cd nextjs-landing
git status
```

Ожидаемый результат:

```text
nothing to commit, working tree clean
```

## Итог

Последовательность действий всегда следующая:

1. Commit product repository
2. Update submodule pointer
3. Commit landing repository

Этот порядок предотвращает конфликты и сохраняет предсказуемую историю Git.