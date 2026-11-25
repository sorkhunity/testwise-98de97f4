import { TestScenario, BugReport, SelfHealingItem, PricingPlan, Integration } from '../types';

export const initialScenarios: TestScenario[] = [
  {
    id: 'sc-1',
    title: 'سناریوی ثبت‌نام و احراز هویت ۲ مرحله‌ای',
    status: 'passed',
    date: '۱۴۰۳/۰۸/۲۴ - ۱۰:۱۵',
    author: 'سارا (مدیر فنی)',
    stepsCount: 8,
    duration: '۱.۴ ثانیه',
    successRate: 99.4,
  },
  {
    id: 'sc-2',
    title: 'فرایند پرداخت آنلاین و اتصال به درگاه بانکی',
    status: 'active',
    date: '۱۴۰۳/۰۸/۲۴ - ۰۹:۳۰',
    author: 'سارا (مدیر فنی)',
    stepsCount: 12,
    duration: '۲.۸ ثانیه',
    successRate: 96.8,
  },
  {
    id: 'sc-3',
    title: 'بررسی سبد خرید و اعمال کد تخفیف پویا',
    status: 'failed',
    date: '۱۴۰۳/۰۸/۲۳ - ۱۶:۴۵',
    author: 'رضا (توسعه‌دهنده ارشد)',
    stepsCount: 6,
    duration: '۱.۱ ثانیه',
    successRate: 88.2,
  },
  {
    id: 'sc-4',
    title: 'تست بارگذاری صفحه داشبورد در حالت کند',
    status: 'passed',
    date: '۱۴۰۳/۰۸/۲۳ - ۱۴:۲۰',
    author: 'سارا (مدیر فنی)',
    stepsCount: 5,
    duration: '۳.۲ ثانیه',
    successRate: 100,
  }
];

export const INITIAL_SCENARIOS: TestScenario[] = initialScenarios;

export const initialBugs: BugReport[] = [
  {
    id: 'bug-1',
    title: 'خطای عدم تطابق توکن در بازنشانی رمز عبور',
    description: 'کاربر پس از کلیک روی لینک فراموشی رمز با خطای ۴۰۱ مواجه می‌شود چون هدر Authorization در درخواست آپدیت ارسال نمی‌گردد.',
    screenshotUrl: 'healthcare',
    severity: 'critical',
    date: '۱۴۰۳/۰۸/۲۴ - ۱۱:۱۰',
    module: 'ماژول احراز هویت',
    status: 'open'
  },
  {
    id: 'bug-2',
    title: 'پرش چینش دکمه ثبت سفارش در موبایل',
    description: 'در رزولوشن‌های کمتر از ۳۷۵ پیکسل، دکمه پرداخت نهایی روی منوی پایین‌صفحه قرار می‌گیرد.',
    screenshotUrl: 'commerce',
    severity: 'medium',
    date: '۱۴۰۳/۰۸/۲۳ - ۱۸:۰۰',
    module: 'رابط کاربری سبد خرید',
    status: 'investigating'
  },
  {
    id: 'bug-3',
    title: 'تأخیر ۳ ثانیه‌ای در لود لیست فاکتورهای سازمانی',
    description: 'کوئری دیتابیس بدون اینکس روی ستون created_at باعث کندی شدید در پنل گزارشات شده است.',
    screenshotUrl: 'workplace',
    severity: 'high',
    date: '۱۴۰۳/۰۸/۲۳ - ۱۵:۱۲',
    module: 'گزارش‌های مالی',
    status: 'resolved'
  }
];

export const INITIAL_BUGS: BugReport[] = initialBugs;

export const initialSelfHealing: SelfHealingItem[] = [
  {
    id: 'sh-1',
    testName: 'تست کلید پرداخت نهایی',
    originalSelector: '#checkout-btn-v1',
    newSelector: 'button[data-testid="checkout-submit-v2"]',
    confidence: 98.5,
    status: 'pending',
    date: '۱۴۰۳/۰۸/۲۴ - ۱۱:۳۰',
    domSnippet: '<button class="bg-cyan-500 py-3 px-6 rounded-xl" data-testid="checkout-submit-v2">تایید و پرداخت نهایی</button>'
  },
  {
    id: 'sh-2',
    testName: 'بررسی ورودی ایمیل در پروفایل',
    originalSelector: 'input[name="user_email"]',
    newSelector: 'input#profile-email-input',
    confidence: 94.2,
    status: 'pending',
    date: '۱۴۰۳/۰۸/۲۴ - ۱۰:۰۵',
    domSnippet: '<input id="profile-email-input" class="form-input rounded-lg border-slate-700" type="email" placeholder="sara@testwise.ir" />'
  },
  {
    id: 'sh-3',
    testName: 'منوی کشویی دسته‌بندی محصولات',
    originalSelector: '.dropdown-toggle-old',
    newSelector: '#category-menu-trigger',
    confidence: 91.0,
    status: 'approved',
    date: '۱۴۰۳/۰۸/۲۳ - ۲۲:۱۵',
    domSnippet: '<div id="category-menu-trigger" class="flex items-center gap-2 cursor-pointer text-slate-300">دسته‌بندی‌ها</div>'
  }
];

export const INITIAL_SELF_HEALING: SelfHealingItem[] = initialSelfHealing;

export const initialPricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'رایگان (شروع سریع)',
    price: '۰',
    period: 'همیشه رایگان',
    description: 'مناسب برای استارتاپ‌های نوپا و ارزیابی اولیه قابلیت‌های هوش مصنوعی تست‌وایز',
    features: [
      'تا ۱۰۰ تست خودکار در ماه',
      'تشخیص خودکار خطاهای ساده',
      'پشتیبانی از ۱ پروژه وب',
      'گزارش‌گیری اولیه'
    ],
    ctaText: 'شروع رایگان'
  },
  {
    id: 'team',
    name: 'تیم حرفه‌ای',
    price: '۴۹,۰۰۰',
    period: 'تومان / ماهانه',
    description: 'پیشنهاد ویژه برای تیم‌های چابک و انتشار مداوم محصول بدون دغدغه باگ',
    features: [
      'تست‌های نامحدود خودکار',
      'سیستم Self-Healing هوشمند',
      'تشخیص پیشرفته باگ با AI',
      'اتصال کامل به گیت‌هاب و CI/CD'
    ],
    ctaText: 'انتخاب تیم حرفه‌ای',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'سازمانی (Enterprise)',
    price: '۱۴۹,۰۰۰',
    period: 'تومان / ماهانه',
    description: 'پشتیبانی اختصاصی، امنیت سطح بالا و SLA تضمین‌شده برای سازمان‌های بزرگ',
    features: [
      'سرور اختصاصی ایزوله',
      'مدیر موفقیت مشتری اختصاصی',
      'گزارش‌های انطباق امنیتی',
      'پشتیبانی ۲۴/۷'
    ],
    ctaText: 'تماس با فروش'
  }
];

export const INITIAL_PLANS: PricingPlan[] = initialPricingPlans;
export const initialPlans: PricingPlan[] = initialPricingPlans;

export const initialIntegrations: Integration[] = [
  {
    id: 'int-1',
    name: 'گیت‌هاب (GitHub Actions)',
    type: 'CI/CD',
    status: 'connected',
    description: 'اجرای خودکار تست‌ها با هر Commit و Pull Request'
  },
  {
    id: 'int-2',
    name: 'جیرا (Jira Cloud)',
    type: 'Issue Tracker',
    status: 'connected',
    description: 'ساخت خودکار تیکت باگ هنگام شکست تست'
  },
  {
    id: 'int-3',
    name: 'اسلک (Slack Notifications)',
    type: 'Messenger',
    status: 'disconnected',
    description: 'ارسال هشدار فوری نتایج تست به کانال تیم'
  },
  {
    id: 'int-4',
    name: 'داکر (Docker Registry)',
    type: 'Infrastructure',
    status: 'connected',
    description: 'مدیریت ایمیج‌های ایزوله تست مرورگر'
  }
];

export const INITIAL_INTEGRATIONS: Integration[] = initialIntegrations;
