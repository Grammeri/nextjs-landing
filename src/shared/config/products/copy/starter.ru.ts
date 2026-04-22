import type { ProductCopy } from '@/shared/config/marketing/types';

export const starterRu: ProductCopy = {
  productId: 'starter',
  name: 'Next.js Professional Starter',
  shortDescription:
    'Чистый production-ready стартовый комплект Next.js с App Router, TypeScript, ESLint, Prettier, Husky, conventional commits и готовой к CI структурой проекта',
  cardDescription:
    'Next.js Professional Starter дает аккуратную базу проекта для запуска реальных приложений, технических заданий и учебных сборок без часов на повторную настройку одних и тех же инструментов.\n\n' +
    'Он объединяет чистую настройку App Router, строгую конфигурацию TypeScript, предсказуемую организацию папок, форматирование, linting, Git hooks, проверку коммитов и готовую к CI структуру.\n\n' +
    'В результате получается стартовый комплект, достаточно компактный для понимания и достаточно организованный, чтобы вырасти в серьезный проект.',
  supportEmail: 'support@software-forge.dev',
  actions: {
    readDocs: 'Читать документацию',
    viewTooling: 'Смотреть tooling',
    buyLicense: 'Купить лицензию',
  },
  sectionTitles: {
    audience: 'Для кого этот starter',
    included: 'Что включено',
    howItWorks: 'Как это работает',
    tryBeforeYouBuy: 'Попробуйте перед покупкой',
  },
  hero: {
    trustTitle: 'Создано для чистой основы проектов на Next.js',
    trustDescription:
      'Next.js Professional Starter дает аккуратную базу проекта для запуска реальных приложений, технических заданий и учебных сборок без часов на повторную настройку одних и тех же инструментов.\n\n' +
      'Он объединяет чистую настройку App Router, строгую конфигурацию TypeScript, предсказуемую организацию папок, форматирование, linting, Git hooks, проверку коммитов и готовую к CI структуру.\n\n' +
      'В результате получается стартовый комплект, достаточно компактный для понимания и достаточно организованный, чтобы вырасти в серьезный проект.',
  },
  audience: [
    'Разработчики, начинающие новый проект на Next.js и выбирающие чистую production-ready основу',
    'Студенты и кандидаты, выполняющие технические задания с профессиональной структурой проекта',
    'Инженеры, которым нужны уже организованные TypeScript, linting, форматирование, hooks и CI',
    'Разработчики, изучающие современные инструменты Next.js и поддерживаемые проектные соглашения',
  ],
  featureGroups: [
    {
      title: 'Структура проекта',
      items: [
        'Чистая настройка Next.js App Router',
        'Предсказуемая организация папок',
        'Понятное разделение app routes, components, shared UI и libraries',
      ],
    },
    {
      title: 'Инструменты разработчика',
      items: [
        'Строгая конфигурация TypeScript',
        'ESLint для качества кода',
        'Prettier для единообразного форматирования',
        'Husky Git hooks',
        'Проверка conventional commits',
      ],
    },
    {
      title: 'Автоматизация',
      items: [
        'Готовая к CI структура workflow',
        'Автоматизированные проверки репозитория',
        'Повторяемый процесс разработки для реальных проектов и технических заданий',
      ],
    },
  ],
  howItWorks: [
    'Скачайте исходный пакет Next.js Professional Starter',
    'Установите зависимости через pnpm',
    'Изучите структуру App Router и настройку инструментов',
    'Запустите рабочий процесс разработки локально',
    'Начните строить свой проект или техническое задание на чистой основе',
  ],
  tryBeforeYouBuy: {
    description:
      'Перед покупкой вы можете изучить документацию, посмотреть структуру проекта и понять, какие инструменты включены в starter. Пакет спроектирован так, чтобы его было легко читать, быстро настраивать и практично использовать как в реальных проектах, так и в технических заданиях.',
    links: [
      { key: 'docs', label: 'Документация starter' },
      { key: 'tooling', label: 'Обзор tooling' },
      { key: 'structure', label: 'Обзор структуры проекта' },
    ],
    contactPrefix: 'Есть вопросы до или после покупки?',
    contactLead: 'Свяжитесь с нами:',
  },
  pricing: {
    description:
      'Чистый production-ready стартовый комплект Next.js с App Router, TypeScript, ESLint, Prettier, Husky, conventional commits и готовой к CI структурой проекта',
    price: '$5 — Разовая лицензия',
    features: [
      'Лицензия на 1 проект',
      'Пожизненный доступ к исходному пакету',
      'Включает Next.js Professional Starter v1.0.0',
      'Чистая структура проекта App Router',
      'Строгая конфигурация TypeScript',
      'Настройка ESLint + Prettier',
      'Husky Git hooks',
      'Conventional commits',
      'Готовый CI workflow включен',
      'Полезно для реальных проектов и технических заданий',
    ],
    footerNote: 'Инструкции для доступа отправляются по email после покупки.',
  },
  underDevelopment: {
    title: 'Next.js Professional Starter',
    subtitle: 'Этот продукт сейчас находится в разработке.',
  },
};
