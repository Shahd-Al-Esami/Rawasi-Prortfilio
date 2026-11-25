import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  ArrowUpLeft,
} from 'lucide-react';
import Heading from '../components/Heading';
import WATERFRONT_BG_URL from '../assets/contact.png';

const COPY = {
  en: {
    eyebrow: 'Private Advisory',
    title: 'The journey begins with a conversation',
    subtitle:
      'Speak directly with a Rawasi advisor to align residential acquisitions, leasing needs, or long-term Gulf investment goals with curated opportunities.',
    channels: [
      {
        id: 'office',
        icon: MapPin,
        label: 'Headquarters',
        value: 'King Abdullah Financial District & Gulf Advisory Desk',
      },
      {
        id: 'phone',
        icon: Phone,
        label: 'Private Line',
        value: '+971 4 000 0000',
      },
      {
        id: 'email',
        icon: Mail,
        label: 'Advisory Desk',
        value: 'advisory@rawasi-realty.com',
      },
      {
        id: 'hours',
        icon: Clock,
        label: 'Consultation Hours',
        value: 'Sun – Thu · 09:00 AM – 07:00 PM',
      },
    ],
    formTitle: 'Schedule Your Consultation',
    goalLabel: 'Advisory Focus',
    goals: [
      { value: 'buy', label: 'Property Purchase' },
      { value: 'rent', label: 'Executive Leasing' },
      { value: 'investment', label: 'Investment Portfolio' },
    ],
    cityLabel: 'Preferred Gulf Destination',
    cities: [
      { value: 'all', label: 'Flexible / Multi-City' },
      { value: 'riyadh', label: 'Riyadh, KSA' },
      { value: 'jeddah', label: 'Jeddah, KSA' },
      { value: 'al-ula', label: 'Al-Ula, KSA' },
      { value: 'dubai', label: 'Dubai, UAE' },
      { value: 'abu-dhabi', label: 'Abu Dhabi, UAE' },
      { value: 'doha', label: 'Doha, Qatar' },
      { value: 'kuwait', label: 'Kuwait City, Kuwait' },
      { value: 'manama', label: 'Manama, Bahrain' },
      { value: 'muscat', label: 'Muscat, Oman' },
    ],
    modeLabel: 'Consultation Format',
    modes: [
      { value: 'video', label: 'Private Video Call' },
      { value: 'in-person', label: 'In-Person Meeting' },
      { value: 'phone', label: 'Phone Briefing' },
    ],
    nameLabel: 'Full Name',
    namePlaceholder: 'Enter your full name',
    emailLabel: 'Email Address',
    emailPlaceholder: 'name@example.com',
    phoneLabel: 'Phone / WhatsApp',
    phonePlaceholder: '+971 50 000 0000',
    notesLabel: 'Requirements & Notes',
    notesPlaceholder:
      'Share preferred property type, budget range, timeline, or investment criteria...',
    submitBtn: 'Request Consultation',
    successTitle: 'Consultation Request Received',
    successDesc:
      'Thank you. A Rawasi senior advisor will contact you shortly to confirm your session.',
    bookAnother: 'Book Another Session',
    errors: {
      nameRequired: 'Please enter your full name.',
      nameTooShort: 'Name must be at least 2 characters.',
      contactRequired: 'Please provide an email address or phone number.',
      invalidEmail: 'Please enter a valid email address (e.g. name@example.com).',
      invalidPhone: 'Please enter a valid phone number (7 to 15 digits).',
    },
  },
  ar: {
    eyebrow: 'استشارات خاصة',
    title: 'ابدأ رحلتك باستشارتنا',
    subtitle:
      'تواصل مباشرة مع مستشار عقاري في رواسي لمواءمة تطلعات التملك أو الإيجار أو بناء محفظة استثمارية في الخليج مع خيارات مدروسة.',
    channels: [
      {
        id: 'office',
        icon: MapPin,
        label: 'المقر الرئيسي',
        value: 'المركز المالي ومكتب الاستشارات الخليجية',
      },
      {
        id: 'phone',
        icon: Phone,
        label: 'الخط المباشر',
        value: '+971 4 000 0000',
      },
      {
        id: 'email',
        icon: Mail,
        label: 'البريد الاستشاري',
        value: 'advisory@rawasi-realty.com',
      },
      {
        id: 'hours',
        icon: Clock,
        label: 'ساعات الاستشارة',
        value: 'الأحد – الخميس · 09:00 ص – 07:00 م',
      },
    ],
    formTitle: 'نموذج حجز الاستشارة',
    goalLabel: 'نوع الاستشارة',
    goals: [
      { value: 'buy', label: 'شراء عقار' },
      { value: 'rent', label: 'استئجار عقار' },
      { value: 'investment', label: 'محفظة استثمارية' },
    ],
    cityLabel: 'المدينة الخليجية المفضّلة',
    cities: [
      { value: 'all', label: 'مرن / أكثر من مدينة' },
      { value: 'riyadh', label: 'الرياض، السعودية' },
      { value: 'jeddah', label: 'جدة، السعودية' },
      { value: 'al-ula', label: 'العلا، السعودية' },
      { value: 'dubai', label: 'دبي، الإمارات' },
      { value: 'abu-dhabi', label: 'أبوظبي، الإمارات' },
      { value: 'doha', label: 'الدوحة، قطر' },
      { value: 'kuwait', label: 'مدينة الكويت، الكويت' },
      { value: 'manama', label: 'المنامة، البحرين' },
      { value: 'muscat', label: 'مسقط، عُمان' },
    ],
    modeLabel: 'طريقة الجلسة الاستشارية',
    modes: [
      { value: 'video', label: 'لقاء مرئي خاص' },
      { value: 'in-person', label: 'حضوري في المقر' },
      { value: 'phone', label: 'اتصال هاتفي' },
    ],
    nameLabel: 'الاسم الكامل',
    namePlaceholder: 'اكتب اسمك الكامل',
    emailLabel: 'البريد الإلكتروني',
    emailPlaceholder: 'name@example.com',
    phoneLabel: 'رقم الهاتف / واتساب',
    phonePlaceholder: '+971 50 000 0000',
    notesLabel: 'التفاصيل والمتطلبات',
    notesPlaceholder:
      'اذكر نوع العقار المفضّل، الميزانية التقريبية، الإطار الزمني، أو أهدافك الاستثمارية...',
    submitBtn: 'إرسال طلب الاستشارة',
    successTitle: 'تم استلام طلب الاستشارة بنجاح',
    successDesc:
      'شكراً لتواصلك مع رواسي. سيتواصل معك أحد مستشارينا قريباً لتأكيد الموعد المناسب.',
    bookAnother: 'حجز استشارة أخرى',
    errors: {
      nameRequired: 'يرجى إدخال الاسم الكامل.',
      nameTooShort: 'يجب أن يتكوّن الاسم من حرفين على الأقل.',
      contactRequired: 'يرجى إدخال البريد الإلكتروني أو رقم الهاتف.',
      invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح (مثال: name@example.com).',
      invalidPhone: 'يرجى إدخال رقم هاتف صحيح (من 7 إلى 15 رقماً).',
    },
  },
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function isValidPhone(rawPhone) {
  const digitsOnly = rawPhone.replace(/\D/g, '');
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
}

export default function ContactConsultation({
  lang = 'en',
  defaultGoal = 'buy',
}) {
  const currentLang = lang === 'ar' ? 'ar' : 'en';
  const isRTL = currentLang === 'ar';
  const t = COPY[currentLang];
  const ArrowIcon = isRTL ? ArrowUpLeft : ArrowUpRight;

  const [goal, setGoal] = useState(defaultGoal);
  const [city, setCity] = useState('all');
  const [mode, setMode] = useState('video');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const revealRef = useRef(null);

  useEffect(() => {
    setGoal(defaultGoal);
  }, [defaultGoal]);

  useEffect(() => {
    const node = revealRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const validateForm = () => {
    const nextErrors = {};
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      nextErrors.fullName = t.errors.nameRequired;
    } else if (trimmedName.length < 2) {
      nextErrors.fullName = t.errors.nameTooShort;
    }

    if (!trimmedEmail && !trimmedPhone) {
      nextErrors.contact = t.errors.contactRequired;
    }

    if (trimmedEmail && !EMAIL_REGEX.test(trimmedEmail)) {
      nextErrors.email = t.errors.invalidEmail;
    }

    if (trimmedPhone && !isValidPhone(trimmedPhone)) {
      nextErrors.phone = t.errors.invalidPhone;
    }

    return nextErrors;
  };

  const clearFieldError = (fieldKeys) => {
    setErrors((prev) => {
      let changed = false;
      const updated = { ...prev };
      fieldKeys.forEach((key) => {
        if (updated[key]) {
          delete updated[key];
          changed = true;
        }
      });
      return changed ? updated : prev;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setErrors({});
    setSubmitted(false);
  };

  const sectionFontStyle = {
    fontFamily: isRTL
      ? "'IBM Plex Sans Arabic', sans-serif"
      : "'Plus Jakarta Sans', sans-serif",
  };


  const getInputClass = (hasError) =>
    `w-full rounded-none bg-[#FAF8F3] text-[#1A110B] placeholder-[#2C1E14]/45 text-xs sm:text-sm px-3.5 py-2.5 border focus:outline-none transition-colors ${
      hasError
        ? 'border-red-600 focus:border-red-700'
        : 'border-[#C5A059]/45 focus:border-[#C5A059]'
    }`;

  return (
    <section
      id="contact"
      dir={isRTL ? 'rtl' : 'ltr'}
      style={sectionFontStyle}
      className="relative bg-[#EFE9DC] text-[#1A110B] py-20 sm:py-24 xl:py-28 border-t border-[#C5A059]/35 overflow-x-clip"
    >
      <div className="relative z-10 max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* العنوان في المنتصف */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-10 sm:mb-12">
       <Heading eyebrow={t.eyebrow}  headingLine1={t.title}  description={t.subtitle} lang={lang} />
       

        
        </div>

        <div ref={revealRef}>
          {/* نموذج حجز الاستشارة فقط في وسط الصورة مع شفافية */}
          <div
            className={`relative rounded-none border border-[#C5A059]/45 bg-[#1A110B] overflow-hidden shadow-lg p-5 sm:p-8 lg:p-12 transition-all duration-1000 ease-out ${
              hasEntered
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* خلفية الصورة بشفافية */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              <img
                src={WATERFRONT_BG_URL}
                alt=""
                className="h-full w-full object-cover object-center opacity-75"
              />
              <div
                style={{
                  backgroundImage:
                    'linear-gradient(to bottom, rgba(26, 17, 11, 0.28), rgba(26, 17, 11, 0.58))',
                }}
                className="absolute inset-0"
              />
            </div>

            {/* البطاقة الوسطية للنموذج */}
            <div className="relative z-10 max-w-3xl mx-auto rounded-none bg-[#F7F3EA]/90 backdrop-blur-xs border border-[#C5A059]/60 p-6 sm:p-8 shadow-xl">
              {submitted ? (
                <div className="py-10 text-center space-y-4 max-w-md mx-auto">
                  <div className="w-12 h-12 mx-auto rounded-none bg-[#1A110B] border border-[#C5A059] flex items-center justify-center text-[#E6C78B]">
                    <CheckCircle2 className="w-6 h-6 text-[#C5A059]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1A110B]">
                    {t.successTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2C1E14]/80 leading-relaxed">
                    {t.successDesc}
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 rounded-none bg-[#1A110B] hover:bg-[#C5A059] text-[#F7F3EA] hover:text-[#1A110B] px-5 py-2.5 text-xs sm:text-sm font-bold border border-[#C5A059]/70 transition-colors cursor-pointer"
                    >
                      <span>{t.bookAnother}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="border-b border-[#C5A059]/25 pb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-[#1A110B]">
                      {t.formTitle}
                    </h3>
                  </div>

                  {/* نوع الاستشارة */}
                  <div className="space-y-2">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A6728]">
                      {t.goalLabel}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {t.goals.map((item) => {
                        const active = goal === item.value;
                        return (
                          <button
                            key={item.value}
                            type="button"
                            onClick={() => setGoal(item.value)}
                            className={`rounded-none px-3.5 py-2.5 text-xs sm:text-sm font-bold border transition-colors cursor-pointer text-center ${
                              active
                                ? 'bg-[#1A110B] text-[#E6C78B] border-[#1A110B]'
                                : 'bg-[#FAF8F3] text-[#1A110B] border-[#C5A059]/45 hover:border-[#C5A059]'
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* المدينة وطريقة الاستشارة */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="consultation-city"
                        className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A6728]"
                      >
                        {t.cityLabel}
                      </label>
                      <select
                        id="consultation-city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full rounded-none bg-[#FAF8F3] text-[#1A110B] text-xs sm:text-sm px-3.5 py-2.5 border border-[#C5A059]/45 focus:border-[#C5A059] focus:outline-none"
                      >
                        {t.cities.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="consultation-mode"
                        className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A6728]"
                      >
                        {t.modeLabel}
                      </label>
                      <select
                        id="consultation-mode"
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className="w-full rounded-none bg-[#FAF8F3] text-[#1A110B] text-xs sm:text-sm px-3.5 py-2.5 border border-[#C5A059]/45 focus:border-[#C5A059] focus:outline-none"
                      >
                        {t.modes.map((m) => (
                          <option key={m.value} value={m.value}>
                            {m.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* الاسم والبريد والهاتف */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="consultation-name"
                        className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A6728]"
                      >
                        {t.nameLabel}
                      </label>
                      <input
                        id="consultation-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          clearFieldError(['fullName']);
                        }}
                        placeholder={t.namePlaceholder}
                        aria-invalid={Boolean(errors.fullName)}
                        className={getInputClass(Boolean(errors.fullName))}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] font-semibold text-red-700">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="consultation-email"
                        className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A6728]"
                      >
                        {t.emailLabel}
                      </label>
                      <input
                        id="consultation-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          clearFieldError(['email', 'contact']);
                        }}
                        placeholder={t.emailPlaceholder}
                        aria-invalid={Boolean(errors.email || errors.contact)}
                        className={getInputClass(
                          Boolean(errors.email || errors.contact)
                        )}
                      />
                      {errors.email && (
                        <p className="text-[11px] font-semibold text-red-700">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="consultation-phone"
                        className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A6728]"
                      >
                        {t.phoneLabel}
                      </label>
                      <input
                        id="consultation-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          clearFieldError(['phone', 'contact']);
                        }}
                        placeholder={t.phonePlaceholder}
                        aria-invalid={Boolean(errors.phone || errors.contact)}
                        className={getInputClass(
                          Boolean(errors.phone || errors.contact)
                        )}
                      />
                      {errors.phone && (
                        <p className="text-[11px] font-semibold text-red-700">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {errors.contact && (
                    <p className="text-xs font-semibold text-red-700 bg-red-50 border border-red-200 px-3.5 py-2">
                      {errors.contact}
                    </p>
                  )}

                  {/* الملاحظات */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="consultation-notes"
                      className="block text-[11px] font-semibold uppercase tracking-wider text-[#8A6728]"
                    >
                      {t.notesLabel}
                    </label>
                    <textarea
                      id="consultation-notes"
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={t.notesPlaceholder}
                      className="w-full rounded-none bg-[#FAF8F3] text-[#1A110B] placeholder-[#2C1E14]/45 text-xs sm:text-sm px-3.5 py-2.5 border border-[#C5A059]/45 focus:border-[#C5A059] focus:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-none bg-[#1A110B] hover:bg-[#C5A059] text-[#F7F3EA] hover:text-[#1A110B] px-6 py-3 text-xs sm:text-sm font-bold border border-[#C5A059]/75 transition-colors cursor-pointer"
                    >
                      <span>{t.submitBtn}</span>
                      <ArrowIcon className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* معلومات الاتصال تحت النموذج */}
          <div
            className={`mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-150 ease-out ${
              hasEntered
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            {t.channels.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-3.5 rounded-none bg-[#1A110B] text-[#F7F3EA] border border-[#C5A059]/45 p-4 shadow-sm"
                >
                  <div className="w-9 h-9 rounded-none bg-[#241810] border border-[#C5A059]/60 flex items-center justify-center shrink-0 mt-0.5">
                    <IconComp className="w-4 h-4 text-[#C5A059]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#D6B77E]">
                      {item.label}
                    </p>
                    <p
                      dir={item.id === 'phone' ? 'ltr' : undefined}
                      className="text-xs sm:text-sm font-medium text-[#F7F3EA] mt-0.5 break-words"
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}