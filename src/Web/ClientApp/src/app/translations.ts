export interface TranslationDict {
  appTitle: string;
  appSubtitle: string;
  demoTab: string;
  codeTab: string;
  inputPlaceholder: string;
  searchButton: string;
  searchingButton: string;
  quickSearch: string;
  loadingMessage: string;
  errorTitle: string;
  rateLabel: string;
  lastUpdated: string;
  copyCode: string;
  codeCopied: string;
  guideTitle: string;
  guideText1: string;
  guideText2: string;
  guideText3: string;
  footerText: string;
  change24: string;
  systemOnline: string;
  langFa: string;
  langEn: string;
  themeDark: string;
  themeLight: string;
}

export const translations = {
  fa: {
    appTitle: 'سامانه پایش هوشمند نرخ رمزارزها',
    appSubtitle: 'پروژه مانیتورینگ زنده مبتنی بر ادغام سرور-ساید وب API ',
    demoTab: 'نمایش زنده',
    codeTab: 'سورس‌کد سناریو',
    inputPlaceholder: 'کد رمزارز پشتیبانی‌شده را وارد کنید (مثلا: BTC)',
    searchButton: 'جستجوی نرخ ارزها',
    searchingButton: 'در حال دریافت...',
    quickSearch: 'دسترسی و جستجوی سریع:',
    loadingMessage: 'در حال فراخوانی وب‌سرویس و دریافت نرخ تبدیل ارزهای فیات...',
    errorTitle: 'بروز خطا در عملیات جستجو',
    rateLabel: 'نرخ مانیتورینگ ارز:',
    lastUpdated: 'زمان آخرین به‌روزرسانی:',
    copyCode: 'کپی کردن کدهای کاربری',
    codeCopied: 'کد با موفقیت کپی شد!',
    guideTitle: '💡 راهنمای راه‌اندازی سریع در پروژه:',
    guideText1: 'نصب پیش‌نیازها در پوشه پروژه فرانت‌اند: ',
    guideText2: 'ایجاد فایل با مسیر دلخواه و چسباندن (Paste) کدهای کپی شده.',
    guideText3: 'اطمینان حاصل کنید که فایل شما از کلاس‌های Tailwind CSS نسخه ۴ پشتیبانی می‌کند.',
    footerText: 'سامانه پایشگر نرخ رمز ارزهای زنده با وب API  © ۲۰۲۶. کلیه حقوق محفوظ است.',
    change24: '۲۴ ساعت اخیر',
    systemOnline: 'سیستم آنلاین (Axios)',
    langFa: 'فارسی',
    langEn: 'English',
    themeDark: 'تم تیره (هوشمند)',
    themeLight: 'تم روشن (مینیمال)'
  },
  en: {
    appTitle: 'Crypto Rates Monitoring Hub',
    appSubtitle: 'Live monitoring engine powered by Full-Stack Web API',
    demoTab: 'Live Interactive Monitor',
    codeTab: 'Integration Source Code',
    inputPlaceholder: 'Enter a supported crypto ticker (e.g., BTC)',
    searchButton: 'Search Live Rates',
    searchingButton: 'Fetching rates...',
    quickSearch: 'Quick shortcuts:',
    loadingMessage: 'Querying Web API and refreshing real-time fiat exchange rates...',
    errorTitle: 'Error performing search operation',
    rateLabel: 'Equivalent Exchange Rate:',
    lastUpdated: 'Last Updated Timestamp:',
    copyCode: 'Copy Component Code',
    codeCopied: 'Code copied to Clipboard!',
    guideTitle: '💡 Quick Integration Blueprint:',
    guideText1: 'Install prerequisites inside your project folder: ',
    guideText2: 'Create a new component file (e.g., CryptoRateMonitor.jsx) and paste the code.',
    guideText3: 'Configure your React project to use Tailwind CSS utility classes.',
    footerText: 'Live Cryptocurrency Monitoring System © 2026. All rights reserved.',
    change24: 'Last 24 hours',
    systemOnline: 'System Online (Axios)',
    langFa: 'Persian',
    langEn: 'English',
    themeDark: 'Dark Theme (Smart)',
    themeLight: 'Light Theme (Minimal)'
  }
};

export const cryptoTranslations: Record<string, Record<'fa' | 'en', { name: string; description: string }>> = {
  BTC: {
    fa: { name: 'بیت‌کوین (Bitcoin)', description: 'بیت‌کوین اولین و بزرگ‌ترین رمزارز جهان است که به عنوان طلای دیجیتال و ذخیره امن ارزش شناخته می‌شود.' },
    en: { name: 'Bitcoin (BTC)', description: 'Bitcoin is a decentralized digital currency, without a central bank or single administrator, often referred to as digital gold.' }
  },
  ETH: {
    fa: { name: 'اتریوم (Ethereum)', description: 'اتریوم یک بستر غیرمتمرکز برای اجرای قراردادهای هوشمند و ایجاد انواع برنامه‌های کاربردی مالی نوین است.' },
    en: { name: 'Ethereum (ETH)', description: 'Ethereum is a decentralized, open-source blockchain with smart contract functionality, hosting the majority of DeFi and NFTs.' }
  },
  SOL: {
    fa: { name: 'سولانا (Solana)', description: 'سولانا یک پلتفرم بلاکچینی با سرعت تراکنش فوق‌العاده بالا و کارمزدهای به شدت اندک برای برنامه‌های توزیع‌شده است.' },
    en: { name: 'Solana (SOL)', description: 'Solana is a high-performance blockchain platform designed for decentralized applications, offering blazing fast speed and ultra-low fees.' }
  },
  ADA: {
    fa: { name: 'کاردانو (Cardano)', description: 'کاردانو یک پلتفرم بلاکچین مبتنی بر اثبات سهام علمی و دقیق است که با هدف تأمین امنیت و پایداری بالا طراحی شده است.' },
    en: { name: 'Cardano (ADA)', description: 'Cardano is a proof-of-stake blockchain platform that says its goal is to allow changemakers, innovators and visionaries to bring about positive global change.' }
  },
  XRP: {
    fa: { name: 'ریپل (Ripple)', description: 'ریپل یک سیستم پرداخت توزیع‌شده با کارایی بالا برای انجام آسان و کم‌هزینه مبادلات بین‌المللی ارز است.' },
    en: { name: 'Ripple (XRP)', description: 'Ripple is a real-time gross settlement system, currency exchange and remittance network built to facilitate cost-effective global transfers.' }
  },
  DOT: {
    fa: { name: 'پولکادات (Polkadot)', description: 'پولکادات پروتکلی است که بلاکچین‌های مختلف را به هم متصل می‌کند و انتقال داده‌ها را ممکن می‌سازد.' },
    en: { name: 'Polkadot (DOT)', description: 'Polkadot is a sharded multichain protocol that connects and secures a network of specialized blockchains, facilitating cross-chain transfer of any data.' }
  }
};

export const currencyMetadataFa: Record<string, { name: string; symbol: string; colorClass: string; cardBorderClass: string; cardGradient: string }> = {
  USD: { name: 'دلار آمریکا', symbol: '$', colorClass: 'text-emerald-400 group-hover:text-emerald-300', cardBorderClass: 'border-emerald-500/10 hover:border-emerald-500/40 shadow-emerald-500/5', cardGradient: 'from-emerald-500/5 path-transparent to-transparent' },
  EUR: { name: 'یورو اتحادیه اروپا', symbol: '€', colorClass: 'text-blue-400 group-hover:text-blue-300', cardBorderClass: 'border-blue-500/10 hover:border-blue-500/40 shadow-blue-500/5', cardGradient: 'from-blue-500/5 path-transparent to-transparent' },
  BRL: { name: 'رئال برزیل', symbol: 'R$', colorClass: 'text-amber-400 group-hover:text-amber-300', cardBorderClass: 'border-amber-500/10 hover:border-amber-500/40 shadow-amber-500/5', cardGradient: 'from-amber-500/5 path-transparent to-transparent' },
  GBP: { name: 'پوند انگلستان', symbol: '£', colorClass: 'text-purple-400 group-hover:text-purple-300', cardBorderClass: 'border-purple-500/10 hover:border-purple-500/40 shadow-purple-500/5', cardGradient: 'from-purple-500/5 path-transparent to-transparent' },
  AUD: { name: 'دلار استرالیا', symbol: 'A$', colorClass: 'text-cyan-400 group-hover:text-cyan-300', cardBorderClass: 'border-cyan-500/10 hover:border-cyan-500/40 shadow-cyan-500/5', cardGradient: 'from-cyan-500/5 path-transparent to-transparent' }
};

export const currencyMetadataEn: Record<string, { name: string; symbol: string; colorClass: string; cardBorderClass: string; cardGradient: string }> = {
  USD: { name: 'US Dollar', symbol: '$', colorClass: 'text-emerald-400 group-hover:text-emerald-300', cardBorderClass: 'border-emerald-500/10 hover:border-emerald-500/40 shadow-emerald-500/5', cardGradient: 'from-emerald-500/5 path-transparent to-transparent' },
  EUR: { name: 'Euro (EU)', symbol: '€', colorClass: 'text-blue-400 group-hover:text-blue-300', cardBorderClass: 'border-blue-500/10 hover:border-blue-500/40 shadow-blue-500/5', cardGradient: 'from-blue-500/5 path-transparent to-transparent' },
  BRL: { name: 'Brazilian Real', symbol: 'R$', colorClass: 'text-amber-400 group-hover:text-amber-300', cardBorderClass: 'border-amber-500/10 hover:border-amber-500/40 shadow-amber-500/5', cardGradient: 'from-amber-500/5 path-transparent to-transparent' },
  GBP: { name: 'British Pound', symbol: '£', colorClass: 'text-purple-400 group-hover:text-purple-300', cardBorderClass: 'border-purple-500/10 hover:border-purple-500/40 shadow-purple-500/5', cardGradient: 'from-purple-500/5 path-transparent to-transparent' },
  AUD: { name: 'Australian Dollar', symbol: 'A$', colorClass: 'text-cyan-400 group-hover:text-cyan-300', cardBorderClass: 'border-cyan-500/10 hover:border-cyan-500/40 shadow-cyan-500/5', cardGradient: 'from-cyan-500/5 path-transparent to-transparent' }
};
