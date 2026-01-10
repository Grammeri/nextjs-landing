# Frontend Test Assignment

## Описание проекта

Это проект, реализованный в рамках тестового задания. Разработан на Next.js с использованием TypeScript и современных инструментов разработки.

## Запуск проекта

Установите зависимости:

```bash
pnpm install
```

или

```bash
npm install
```

Запустите dev-сервер:

```bash
pnpm dev
```

или

```bash
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

Для сборки production-версии:

```bash
pnpm build
```

## Стек технологий

- Next.js — фреймворк для React-приложений
- React — библиотека для построения пользовательских интерфейсов
- TypeScript — типизированный JavaScript
- ESLint — инструмент для статического анализа кода
- Prettier — инструмент для форматирования кода

## Структура проекта

Проект организован стандартным для Next.js образом:

- `src/app/` — основной код приложения (страницы, layouts, компоненты)
- `public/` — статические файлы (изображения, иконки)
- `src/app/globals.css` — глобальные стили приложения

Основные конфигурационные файлы:

- `next.config.ts` — конфигурация Next.js
- `tsconfig.json` — настройки TypeScript
- `eslint.config.mjs` — настройки ESLint
- `.prettierrc` — настройки Prettier

## Доступные команды

- `pnpm dev` или `npm run dev` — запуск dev-сервера
- `pnpm build` или `npm run build` — сборка production-версии
- `pnpm start` или `npm run start` — запуск production-сервера (после сборки)
- `pnpm lint` или `npm run lint` — проверка кода с помощью ESLint
- `pnpm format` или `npm run format` — форматирование кода с помощью Prettier

## Примечания

Проект реализован в рамках тестового задания для позиции frontend-разработчика.
