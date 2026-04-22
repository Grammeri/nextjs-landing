import type { ProductCopy } from '@/shared/config/marketing/types';

export const authforgeRu: ProductCopy = {
  productId: 'authforge',
  name: 'AuthForge',
  shortDescription:
    'Production-ready стартер аутентификации для SaaS-приложений с входом по email и паролю, подтверждением email, сбросом пароля, безопасными сессиями, rate limiting и референсной реализацией на Prisma + PostgreSQL',
  cardDescription:
    'Production-ready основа аутентификации с безопасными сессиями, базовой защитой от злоупотреблений и проверенной настройкой для современного SaaS.',
  supportEmail: 'support@software-forge.dev',
  actions: {
    viewDemo: 'Смотреть демо',
    readDocs: 'Читать документацию',
    buyLicense: 'Купить лицензию',
  },
  sectionTitles: {
    audience: 'Для кого AuthForge',
    included: 'Что включено',
    howItWorks: 'Как это работает',
    tryBeforeYouBuy: 'Попробуйте перед покупкой',
  },
  hero: {
    trustTitle: 'Создано для SaaS-команд, которые выпускают реальные продукты',
    trustDescription:
      'AuthForge дает production-ready основу аутентификации без необходимости строить ключевой auth-слой с нуля.\n\n' +
      'Включены сценарии, которые нужны большинству SaaS-продуктов с первого дня: регистрация по email и паролю, подтверждение email, сброс пароля, безопасные серверные сессии, HttpOnly cookies и route-level rate limiting.\n\n' +
      'Архитектура спроектирована так, чтобы оставаться гибкой по мере роста продукта. AuthForge поставляется с референсной реализацией на Prisma + PostgreSQL, сохраняя database-agnostic направление для домена аутентификации.',
  },
  audience: [
    'Основатели SaaS, которым нужна production-ready аутентификация без разработки каждого сценария с нуля',
    'Разработчики, выпускающие MVP, внутренние инструменты и production SaaS-приложения',
    'Команды, которые хотят заранее закрыть безопасные сессии, подтверждение, сброс пароля и защиту от злоупотреблений',
    'Инженеры, изучающие, как современная архитектура аутентификации встраивается в реальный продукт на Next.js',
  ],
  featureGroups: [
    {
      title: 'Аутентификация',
      items: ['Аутентификация по email и паролю', 'Сценарий подтверждения email', 'Сценарий сброса пароля'],
    },
    {
      title: 'Сессии и безопасность',
      items: [
        'Серверные сессии с HttpOnly cookies',
        'Route-level rate limiting для auth endpoints',
        'Проверки скомпрометированных паролей',
        'Runtime-валидация на основе Zod',
      ],
    },
    {
      title: 'Архитектура',
      items: [
        'Production-oriented структура домена аутентификации',
        'Референсная реализация на Prisma + PostgreSQL',
        'Database-agnostic архитектурное направление',
        'Подход к стилям UI на основе токенов',
      ],
    },
  ],
  howItWorks: [
    'Скачайте исходный пакет AuthForge',
    'Настройте переменные окружения для приложения',
    'Подключите PostgreSQL и запустите миграции Prisma',
    'Запустите сценарии аутентификации локально',
    'Расширяйте основу внутри своего SaaS-продукта',
  ],
  tryBeforeYouBuy: {
    description:
      'Перед покупкой вы можете изучить документацию, посмотреть архитектуру и протестировать live demo. Основной путь аутентификации проверен через clean-room onboarding flow, включая регистрацию, вход, выход, сброс пароля, безопасные сессии на cookie и оценку в demo-mode.',
    links: [
      { key: 'demo', label: 'Live demo' },
      { key: 'docs', label: 'Полная документация' },
      { key: 'architecture', label: 'Обзор архитектуры' },
    ],
    contactPrefix: 'Есть вопросы до или после покупки?',
    contactLead: 'Свяжитесь с нами:',
  },
  pricing: {
    description:
      'Production-ready стартер аутентификации для SaaS-приложений с безопасными сессиями, сценариями подтверждения, сбросом пароля, rate limiting и референсной реализацией на Prisma + PostgreSQL.',
    price: '$99 — Разовая лицензия',
    features: [
      'Лицензия на 1 проект',
      'Пожизненный доступ к исходному пакету',
      'Включает AuthForge v1.0.0',
      'Поддержка по email: support@software-forge.dev',
    ],
    footerNote: 'Инструкции для доступа отправляются по email после покупки.',
  },
};
