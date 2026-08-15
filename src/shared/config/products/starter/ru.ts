import type { ProductCopy } from '@/shared/config/marketing/types';

export const starterRu: ProductCopy = {
  productId: 'starter',
  name: 'Next.js Professional Starter',
  shortDescription:
    'Готовый шаблон проекта на Next.js для реальных приложений, MVP и тестовых заданий: TypeScript, ESLint, Prettier, Husky, App Router и готовая конфигурация CI',
  hero: {
    trustTitle: 'Создано для быстрой настройки проектов на Next.js',
    trustDescription:
      'Next.js Professional Starter дает готовую настройку проекта на Next.js для реальных приложений, MVP, тестовых заданий и учебных сборок без лишних часов на ручную настройку TypeScript, ESLint, Prettier, Husky и CI.\n\n' +
      'В пакет входят App Router, строгая конфигурация TypeScript, понятная структура папок, форматирование, linting, Git hooks, проверка коммитов и готовая CI-конфигурация.\n\n' +
      'В результате вы получаете готовый шаблон проекта на Next.js, который легко понять в начале и удобно развивать по мере роста задачи.',
  },
  actions: {
    readDocs: 'Читать документацию',
    viewTooling: 'Смотреть инструменты',
    downloadFree: 'Скачать бесплатно',
  },
  audience: {
    title: 'Для кого это подойдет',
    items: [
      'Разработчикам, которые запускают новый проект на Next.js и хотят получить готовую настройку без лишней ручной подготовки',
      'Студентам и разработчикам, которые готовятся к поиску работы и хотят использовать аккуратный шаблон проекта для учебной практики и тестовых заданий',
      'Инженерам, которым нужны заранее настроенные TypeScript, ESLint, Prettier, Git hooks и CI для стабильной и поддерживаемой разработки',
      'Разработчикам, которые изучают Next.js App Router, современную структуру проекта и понятные проектные соглашения',
    ],
  },
  included: {
    title: 'Что включено',
    groups: [
      {
        title: 'Структура проекта',
        items: [
          'Чистая настройка Next.js App Router',
          'Понятная структура папок',
          'Четкое разделение app routes, components, shared UI и libraries',
        ],
      },
      {
        title: 'Инструменты разработки',
        items: [
          'Строгая конфигурация TypeScript',
          'ESLint для контроля качества кода',
          'Prettier для единообразного форматирования',
          'Husky Git hooks',
          'Проверка сообщений коммитов по принятому стандарту',
          'Проверки изменённых файлов перед коммитом: lint-staged',
          'Настройки VS Code и рекомендуемые расширения',
          'Единые правила форматирования: EditorConfig',
        ],
      },
      {
        title: 'Автоматизация',
        items: [
          'Готовая конфигурация CI',
          'Автоматизированные проверки репозитория',
          'Одна команда для проверки проекта: pnpm check',
          'Повторяемый процесс разработки для реальных проектов и тестовых заданий',
        ],
      },
    ],
  },
  howItWorks: {
    title: 'Как это работает',
    items: [
      'Скачайте исходный пакет Next.js Professional Starter',
      'Установите зависимости с помощью pnpm',
      'Проверьте проект одной командой: pnpm check',
      'Изучите структуру App Router и настройку инструментов',
      'Запустите workflow разработки локально',
      'Начните свой проект или техническое задание на чистой основе',
    ],
  },
  tryBeforeYouBuy: {
    title: 'Посмотреть Starter',
    description:
      'Изучите документацию, инструменты и структуру проекта перед скачиванием. Starter полностью бесплатен и готов к использованию в реальных проектах, MVP, тестовых заданиях и учебных сборках.',
    links: [
      { key: 'docs', label: 'Полная документация' },
      { key: 'tooling', label: 'Обзор инструментов' },
      { key: 'structure', label: 'Обзор структуры проекта' },
    ],
    contactPrefix: 'Есть вопросы по Starter?',
    contactLead: 'Свяжитесь с нами:',
  },
  supportEmail: 'support@software-forge.dev',
  pricing: {
    description:
      'Готовая настройка проекта на Next.js: App Router, TypeScript, ESLint, Prettier, Husky, проверка коммитов и CI-конфигурация для реальных приложений и тестовых заданий.',
    price: 'Бесплатно',
    features: [
      'Включает Next.js Professional Starter v1.0.0',
      'Чистая структура проекта App Router',
      'Строгая конфигурация TypeScript',
      'Настройка ESLint + Prettier',
      'Husky Git hooks',
      'Проверка сообщений коммитов по принятому стандарту',
      'Готовый CI workflow',
      'Полезно для реальных проектов и тестовых заданий',
    ],
    footerNote: 'Без оплаты. ZIP-архив доступен сразу.',
    downloadCta: 'Скачать Starter бесплатно',
    downloadNote: 'Без оплаты. ZIP-архив доступен сразу.',
  },
  underDevelopment: {
    title: 'Next.js Professional Starter',
    subtitle: 'Этот продукт сейчас находится в разработке.',
  },
};
