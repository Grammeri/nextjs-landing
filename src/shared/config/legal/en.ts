export const TERMS_VERSION = '2025-01-01';

export type LegalSection = {
  id: 'terms' | 'privacy' | 'refund' | 'license' | 'liability';
  navLabel: string;
  title: string;
  paragraphs: string[];
};

export type LegalContactInfo = {
  seller: string;
  brand: string;
  mailingAddress: string;
  governingLaw: string;
  supportEmail: string;
  copyright: string;
  tagline: string;
};

export const LEGAL_PAGE_TITLE = 'Legal';

export const LEGAL_PAGE_DESCRIPTION =
  'Terms, privacy, refund, license, and liability information for Software Forge products.';

export const LEGAL_PAGE_INTRO = [
  'These legal terms apply to software products, source code packages, templates, documentation, and related digital materials provided under the Software Forge brand, including but not limited to AuthForge, Next.js Professional Starter, and other developer tools distributed by Software Forge.',
];

export const LEGAL_SECTIONS: LegalSection[] = [
  {
    id: 'terms',
    navLabel: 'Terms',
    title: 'Terms of Service',
    paragraphs: [
      'These Terms of Service govern the purchase, download, access to, and use of any software product, source code package, template, documentation, or related digital materials provided under the Software Forge brand, including but not limited to AuthForge and Next.js Professional Starter ("Product").',
      'By purchasing, downloading, accessing, or using the Product, you agree to these Terms. The Product is licensed, not sold.',
      'The Product is a developer tool and digital software asset intended to be integrated, configured, customized, tested, secured, and deployed by you. You are solely responsible for how the Product is implemented in your own project, service, business workflow, or production environment.',
      'You are responsible for ensuring that your use of the Product, your application logic, your user notices, your privacy and cookie practices, your security settings, your infrastructure choices, and your compliance with applicable laws and regulations are lawful in the jurisdictions where you operate.',
      'Unless expressly stated otherwise on the relevant product page or checkout page, your purchase includes only the license rights expressly described in these Terms and does not include custom development, legal review, implementation services, security certification, managed hosting, compliance services, or ongoing support obligations.',
      'Software Forge may update these Terms from time to time. The version in effect at the time of purchase governs that purchase unless applicable law requires otherwise. Nothing in these Terms excludes, limits, or overrides any rights that cannot be excluded or limited under applicable law.',
    ],
  },
  {
    id: 'license',
    navLabel: 'License',
    title: 'License Agreement',
    paragraphs: [
      'Subject to your compliance with these Terms and payment of the applicable price, you receive a limited, non-exclusive, non-transferable, revocable license to use the Product for the scope stated on the applicable product page or checkout page. If no broader scope is expressly stated, the default license is for one project.',
      'You may download, store, and modify the Product for your own internal use and for your permitted project needs. You may use the Product as part of a larger application or service that you develop.',
      'You may not resell, redistribute, sublicense, publish, share, lease, or transfer the Product itself, whether in original or modified form. You may not make the source code, package files, or original Product materials available to third parties except to contractors working on your behalf under confidentiality obligations and only to the extent necessary for your permitted use.',
      'All intellectual property rights in and to the Product remain reserved.',
    ],
  },
  {
    id: 'refund',
    navLabel: 'Refund',
    title: 'Refund Policy',
    paragraphs: [
      'The Product is digital content supplied electronically. Because digital products are delivered immediately or made available for download shortly after purchase, refunds are not guaranteed after delivery or after access has begun, except where required by applicable law.',
      'If you are a consumer in the European Union or another jurisdiction that provides a statutory right of withdrawal for distance contracts, that right may apply unless a lawful exception applies. Where permitted by applicable law, if you expressly request immediate digital delivery or immediate access before any withdrawal period expires, and you acknowledge that you thereby lose any statutory right of withdrawal once digital supply begins, your withdrawal right will end when digital supply begins.',
      'If applicable law gives you non-waivable consumer rights, including refund, cancellation, withdrawal, or conformity rights, those rights remain unaffected. If no mandatory legal right applies, refund requests may be reviewed on a case-by-case basis at our sole discretion.',
    ],
  },
  {
    id: 'privacy',
    navLabel: 'Privacy',
    title: 'Privacy Policy',
    paragraphs: [
      'We process only the personal data reasonably necessary to sell and deliver the Product, communicate with customers, maintain order and license records, respond to support requests, comply with legal obligations, and protect against fraud, abuse, or unauthorized redistribution.',
      'Depending on the transaction, we may process your name, email address, billing country, order details, invoice or transaction identifiers, product and license records, and communications you send to support. Payments are securely processed by third-party payment providers such as Stripe. We do not store full payment card details.',
      'Where GDPR or similar laws apply, the legal bases for processing are typically the performance of a contract, compliance with legal obligations, and legitimate interests in operating, securing, and enforcing the business. Personal data is retained only for as long as reasonably necessary for product delivery, license administration, support, fraud prevention, recordkeeping, tax, accounting, and legal compliance.',
      'Personal data may be shared only as reasonably necessary with payment processors, hosting, storage, email, analytics, or support service providers, and with advisors or authorities where required by law. If personal data is transferred outside your country, lawful transfer mechanisms will be used where required by applicable law.',
      'Where applicable law grants you rights, you may request access, correction, deletion, restriction, objection, portability, or information about the processing of your personal data by contacting support@software-forge.dev. You may also have the right to lodge a complaint with a competent data protection authority.',
    ],
  },
  {
    id: 'liability',
    navLabel: 'Liability',
    title: 'Disclaimer & Limitation of Liability',
    paragraphs: [
      'The Product is provided on an "as is" and "as available" basis to the maximum extent permitted by law. No warranty is made that the Product will be uninterrupted, error-free, fit for every purpose, compliant with every legal regime, or suitable for your specific business, regulatory, privacy, tax, operational, or security requirements.',
      'You are responsible for testing, reviewing, validating, and adapting the Product before using it in development, staging, or production.',
      'To the maximum extent permitted by law, liability is excluded for indirect, incidental, consequential, special, exemplary, or punitive damages, and for any loss of profits, revenue, business opportunity, goodwill, data, or expected savings arising out of or related to the Product or these Terms.',
      'To the maximum extent permitted by law, total liability arising out of or relating to the Product or these Terms will not exceed the amount you paid for the Product giving rise to the claim. Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law.',
    ],
  },
];

export const LEGAL_CONTACT: LegalContactInfo = {
  seller: 'Dmitry Nikolayev',
  brand: 'Software Forge',
  mailingAddress: '7126 Marble Springs Dr, Katy, TX 77494, USA',
  governingLaw: 'Texas, USA',
  supportEmail: 'support@software-forge.dev',
  copyright: '© 2025 Software Forge',
  tagline: 'Engineered in Texas. Used worldwide.',
};
