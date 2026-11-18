// Page copy, in the IB's first-person voice. Wingo is always third person.
// Answers marked TODO_CONFIRM are drafts awaiting Wingo compliance sign-off.
// Offer cards, terms and extra FAQs can be replaced per IB from ib.json (offer.cards,
// offer.termsTitle, offer.terms, offer.faqs); the text here is the fallback.
import { ib, offer, type Faq, type OfferCard, type OfferMode } from './config/ib'

type Ctx = { account: string; minDeposit: string; start: string; deadline: string }

export type Fact = { icon: 'account' | 'deposit' | 'deadline' | 'platform'; label: string; value: string }
export type Step = { title: string; body: string }
export type { Faq, OfferCard }

export function getContent(mode: OfferMode, c: Ctx) {
  const both = mode === 'both'
  const bonus = mode !== 'account' // `both` reuses the bonus copy outside the offer section
  return {
    heroCta: both ? 'مشاهده آفرهای ویژه' : bonus ? 'مشاهده پیشنهاد اختصاصی' : 'مشاهده حساب پیشنهادی',

    // `both` mode: these cards replace the single offer card. **…** = bold.
    offers: offer.cards ?? ([
      {
        tag: 'آفر اول',
        title: '۱۰۰٪ بونوس واریز، تا سقف ۱٬۰۰۰ دلار',
        body: 'روی اولین واریز و واریزهای بعدی بین **۱۰۰ تا ۵۰۰ دلار** به حساب‌های Starter، ECN و PRO وینگو مارکتس، **۱۰۰٪ بونوس تا سقف ۱٬۰۰۰ دلار** دریافت کنید و با اعتبار بیشتری وارد مارکت شوید.',
        cta: 'دریافت بونوس ۱۰۰٪',
      },
      {
        tag: 'آفر دوم',
        title: 'حرفه‌ای‌تر ترید کنید، با شرایط ویژه شروع کنید',
        body: 'حساب PRO وینگو مارکتس را با **۷۰٪ تخفیف** در حداقل واریز فعال کنید؛ شروع ترید در حساب PRO، تنها با **۱٬۵۰۰ دلار** واریز اولیه به‌جای ۵٬۰۰۰ دلار.',
        cta: 'فعال‌سازی حساب PRO',
      },
    ] as OfferCard[]),

    offerTitle: bonus
      ? `حساب ${c.account} را با بونوس اختصاصی فعال کنید`
      : `برای شروع، حساب ${c.account} را پیشنهاد می‌کنم`,
    offerQuote: bonus
      ? 'این بونوس ویژه، بخشی از همکاری من با وینگو مارکتس برای شروع یا ادامه ترید شماست. بونوس را وینگو مارکتس ارائه می‌دهد و شرایط آن را هم خودش تعیین می‌کند؛ من فقط آن را به شما معرفی می‌کنم.'
      : `حساب ${c.account} را بر اساس سبک ترید مخاطبانم انتخاب کرده‌ام. شرایط حساب را وینگو مارکتس تعیین می‌کند؛ من فقط آن را به شما معرفی می‌کنم.`, // TODO_CONFIRM
    facts: (bonus
      ? [
          { icon: 'account', label: 'حساب مشمول', value: c.account },
          { icon: 'deposit', label: 'حداقل واریز', value: c.minDeposit },
          { icon: 'deadline', label: 'مهلت استفاده', value: c.deadline },
        ]
      : [
          { icon: 'account', label: 'حساب پیشنهادی', value: c.account },
          { icon: 'deposit', label: 'حداقل واریز', value: c.minDeposit },
          { icon: 'platform', label: 'پلتفرم', value: 'متاتریدر ۵' },
        ]) as Fact[],
    offerCta: bonus ? 'مشاهده شرایط و مراحل فعال‌سازی' : 'مشاهده شرایط و مراحل افتتاح حساب',

    // **…** marks text rendered bold.
    termsTitle: bonus ? (offer.termsTitle ?? `فقط تا ${c.deadline} فرصت دارید این آفر ویژه رو فعال کنید!`) : 'شرایط حساب در یک نگاه',
    termsBody: bonus
      ? (offer.terms ?? [
          `از **${c.start} تا ${c.deadline}** در وینگو مارکتس ثبت‌نام کنید و با افتتاح حساب و واریز وجه، این آفر ویژه رو فعال کنید.`,
          'فرصت رو از دست ندید؛ همین حالا شروع کنید.',
        ])
      : [
          `حساب ${c.account} با حداقل واریز ${c.minDeposit} روی متاتریدر ۵ افتتاح می‌شود.`,
          'اسپرد، کمیسیون و اهرم این حساب را پیش از واریز در صفحه مقایسه حساب‌های وینگو بررسی کنید.', // TODO_CONFIRM
        ],
    termsCta: bonus ? 'ثبت‌نام و فعال‌سازی آفر' : 'ثبت‌نام و افتتاح حساب',

    stepsTitle: both ? 'در ۳ قدم، آفرتون رو فعال کنید' : bonus ? 'در ۳ قدم، بونوس‌تون رو فعال کنید' : 'مراحل افتتاح حساب',
    steps: [
      { title: '۱. ثبت‌نام یا ورود به حساب کاربری', body: 'در وینگو مارکتس ثبت‌نام کنید یا وارد حساب کاربری‌تون بشید.' },
      {
        title: bonus ? '۲. احراز هویت و انتخاب حساب' : `انتخاب حساب ${c.account}`,
        body: 'احراز هویت‌تون رو تکمیل کنید و حساب دلخواهتون رو از بین حساب‌های این آفر انتخاب کنید.',
      },
      bonus
        ? { title: both ? '۳. واریز و فعال‌سازی آفر' : '۳. واریز و فعال‌سازی بونوس', body: 'مبلغ موردنظرتون رو واریز کنید و برای فعال‌سازی بونوس با مدیر حسابتون یا پشتیبانی وینگو مارکتس در ارتباط باشید.' }
        : { title: 'واریز و شروع ترید', body: 'مبلغ موردنیاز را به حساب واریز کنید و از متاتریدر ۵ وارد بازار شوید.' },
    ] as Step[],

    faqs: [
      {
        q: 'اگر درباره حساب، واریز یا برداشت سؤالی داشتم، از چه کسی بپرسم؟',
        a: 'پشتیبانی فارسی وینگو مارکتس آماده‌ست تا درباره حساب، واریز و برداشت راهنمایی‌تون کنه.' +
          (ib.telegram ? ` می‌تونید سؤال‌هاتون رو از طریق پشتیبانی تلگرام خودم (⁦[@${ib.telegram}](https://t.me/${ib.telegram})⁩) هم بپرسید.` : ''),
      },
      ...offer.faqs,
      ...(bonus
        ? [
            {
              q: 'چه کسانی می‌تونن بونوس رو دریافت کنن؟',
              a: 'برای دریافت این بونوس، باید از طریق لینک اختصاصی من در وینگو مارکتس ثبت‌نام کنید. اگر هم از قبل حساب دارید، کافیه IB حسابتون رو به من تغییر بدید تا بتونید از این پیشنهاد استفاده کنید.',
            },
            {
              q: 'آیا کاربران فعلی وینگو می‌توانند از این پیشنهاد استفاده کنند؟',
              a: 'شرایط کاربران فعلی را وینگو مارکتس تعیین می‌کند. پیش از واریز، از پشتیبانی وینگو بپرسید.',
            },
            {
              q: 'بونوس چطور فعال می‌شه و شرایط برداشتش چیه؟',
              a: 'بعد از واریز، برای فعال‌سازی بونوس با مدیر حسابتون یا پشتیبانی وینگو مارکتس در ارتباط باشید. جزئیات شرایط استفاده و برداشت رو هم می‌تونید از مدیر حسابتون بپرسید.',
            },
          ]
        : [
            {
              q: `چرا حساب ${c.account} را پیشنهاد می‌کنید؟`,
              a: 'این حساب با سبک ترید و بازارهایی که در کانالم تحلیل می‌کنم هماهنگ‌تر است. انتخاب نهایی با شماست.', // TODO_CONFIRM per IB
            },
            {
              q: 'آیا بعداً می‌توانم نوع حسابم را عوض کنم؟',
              a: 'می‌توانید از پنل کاربری حساب جدیدی از نوع دیگر باز کنید. شرایط هر حساب را وینگو تعیین می‌کند.',
            },
          ]),
      {
        q: 'برداشت وجه چقدر زمان می‌بره؟',
        a: 'برداشت‌های ریالی طبق سیکل تسویه شبا انجام می‌شن و سایر برداشت‌ها در کمتر از یک ساعت پردازش می‌شن.',
      },
    ] as Faq[],
  }
}
