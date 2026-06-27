import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Compass,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
} from 'lucide-react';

// ---------- Types ----------
type Lang = 'en' | 'ar';

interface Project {
  id: number;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  descEn: string;
  descAr: string;
  image: string;
  year: string;
}

// ---------- Data ----------
const projects: Project[] = [
  {
    id: 1,
    titleEn: 'The Obsidian Penthouse',
    titleAr: 'البنتهاوس الأوبسيديان',
    categoryEn: 'Residential',
    categoryAr: 'سكني',
    descEn: 'A monolithic study in shadow and light, where matte stone meets brushed brass.',
    descAr: 'دراسة أحادية في الظل والضوء، حيث يلتقي الحجر المطفي بالنحاس المصقول.',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600',
    year: '2024',
  },
  {
    id: 2,
    titleEn: 'Maison Aurelia',
    titleAr: 'دار أوريليا',
    categoryEn: 'Hospitality',
    categoryAr: 'ضيافة',
    descEn: 'A boutique hotel wrapped in travertine, linen, and the quiet hum of gold leaf.',
    descAr: 'فندق بوتيك مكسو بالترافرتين والكتان، مع همسة هادئة من ورق الذهب.',
    image: 'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1600',
    year: '2024',
  },
  {
    id: 3,
    titleEn: 'Atelier No.7',
    titleAr: 'أتيليه رقم ٧',
    categoryEn: 'Commercial',
    categoryAr: 'تجاري',
    descEn: 'A creative workspace carved from concrete and oak, softened by sheer light wells.',
    descAr: 'مساحة عمل إبداعية منحوتة من الخرسانة والبلوط، تلينها آبار الضوء الطبيعي.',
    image: 'https://images.pexels.com/photos/380769/pexels-photo-380769.jpeg?auto=compress&cs=tinysrgb&w=1600',
    year: '2023',
  },
  {
    id: 4,
    titleEn: 'Villa Serenissima',
    titleAr: 'فيلا سيرينيسيما',
    categoryEn: 'Residential',
    categoryAr: 'سكني',
    descEn: 'A coastal retreat where plaster walls breathe beside micro-cement floors.',
    descAr: 'ملاذ ساحلي حيث تتنفس جدران الجص بجانب أرضيات الميكرو سمنت.',
    image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1600',
    year: '2023',
  },
  {
    id: 5,
    titleEn: 'The Gilded Library',
    titleAr: 'المكتبة المذهبة',
    categoryEn: 'Cultural',
    categoryAr: 'ثقافي',
    descEn: 'Floor-to-ceiling walnut shelving anchored by a single suspended brass sculpture.',
    descAr: 'رفوف جوز من الأرض إلى السقف، ترتكز على منحوتة نحاسية معلقة.',
    image: 'https://images.pexels.com/photos/256955/pexels-photo-256955.jpeg?auto=compress&cs=tinysrgb&w=1600',
    year: '2022',
  },
];

const t = {
  en: {
    nav: { home: 'Home', studio: 'Studio', work: 'Work', contact: 'Contact' },
    hero: {
      tag: 'Interior Design Studio — Est. 2014',
      title1: 'Crafting',
      title2: 'Silent Luxury',
      sub: 'We design interiors that speak in whispers — spaces where restraint becomes the ultimate statement.',
      cta: 'WhatsApp Consultation',
      scroll: 'Scroll to explore',
    },
    about: {
      label: 'The Studio',
      title: 'A practice devoted to quiet, enduring design.',
      body: 'Viorn is an interior design studio working at the intersection of architecture, material, and atmosphere. We believe luxury is not loud — it is felt. Every project begins with light and ends with a detail only you will notice.',
      stat1: 'Projects Delivered',
      stat2: 'Years of Practice',
      stat3: 'Design Awards',
    },
    portfolio: {
      label: 'Selected Work',
      title: 'A portfolio of restraint.',
      sub: 'Swipe through a curated selection of recent commissions.',
      view: 'View Project',
    },
    contact: {
      label: 'Begin a Project',
      title: 'Let us design your silence.',
      sub: 'Reach out for a private consultation. We take on a limited number of commissions each year.',
      phone: '+971 4 555 0199',
      email: 'studio@viorn.design',
      address: 'Dubai Design District, UAE',
      cta: 'Start on WhatsApp',
    },
    footer: { rights: 'All rights reserved.', designed: 'Crafted with intention.' },
  },
  ar: {
    nav: { home: 'الرئيسية', studio: 'الاستوديو', work: 'الأعمال', contact: 'تواصل' },
    hero: {
      tag: 'استوديو تصميم داخلي — تأسس ٢٠١٤',
      title1: 'نصنع',
      title2: 'الفخامة الصامتة',
      sub: 'نصمم مساحات تتحدث همساً — حيث يصبح التكبير أقوى تصريح.',
      cta: 'استشارة واتساب',
      scroll: 'مرر للاستكشاف',
    },
    about: {
      label: 'الاستوديو',
      title: 'ممارسة مكرسة لتصميم هادئ ودائم.',
      body: 'فيورن استوديو تصميم داخلي يعمل عند تقاطع العمارة والمادة والأجواء. نؤمن أن الفخامة ليست عالية — بل محسوسة. كل مشروع يبدأ بالضوء وينتهي بتفصيلة لن تلاحظها إلا أنت.',
      stat1: 'مشاريع منجزة',
      stat2: 'سنوات من الممارسة',
      stat3: 'جوائز تصميم',
    },
    portfolio: {
      label: 'أعمال مختارة',
      title: 'بورتفوليو من التكبير.',
      sub: 'مرر عبر مجموعة مختارة من أحدث تكليفاتنا.',
      view: 'عرض المشروع',
    },
    contact: {
      label: 'ابدأ مشروعاً',
      title: 'دعنا نصمم صمتك.',
      sub: 'تواصل معنا لاستشارة خاصة. نتولى عدداً محدوداً من التكليفات كل عام.',
      phone: '+971 4 555 0199',
      email: 'studio@viorn.design',
      address: 'دبي ديزاين ديستريكت، الإمارات',
      cta: 'ابدأ على واتساب',
    },
    footer: { rights: 'جميع الحقوق محفوظة.', designed: 'صُنع بنيّة.' },
  },
};

// ---------- Magnetic Hook ----------
function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const handleLeave = () => {
      el.style.transform = 'translate(0, 0)';
    };
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength]);
  return ref;
}

// ---------- Reveal on Scroll Hook ----------
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ---------- Parallax Hook ----------
function useParallax() {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll<HTMLElement>('[data-parallax]');
      elements.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.3');
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
        const img = el.querySelector('img');
        if (img) {
          img.style.transform = `scale(1.15) translateY(${offset * -0.3}px)`;
        } else {
          el.style.transform = `translateY(${offset * -0.15}px)`;
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}

// ---------- Line Tracker ----------
function LineTracker() {
  const lineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (lineRef.current) {
        lineRef.current.style.transform = `translateX(${e.clientX}px)`;
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  return <div ref={lineRef} className="line-tracker hidden md:block" />;
}

// ---------- Navigation ----------
function Nav({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const tr = t[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: tr.nav.home, href: '#hero' },
    { label: tr.nav.studio, href: '#studio' },
    { label: tr.nav.work, href: '#work' },
    { label: tr.nav.contact, href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass py-3' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full border border-gold/40 flex items-center justify-center overflow-hidden bg-charcoal group-hover:border-gold transition-colors duration-300">
            {/* [UPLOADED_LOGO_HERE] */}
            <img src="/logo.jpeg" alt="Viorn Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-xl tracking-wide text-charcoal">VIORN</span>
            <span className="text-[10px] tracking-[0.25em] text-charcoal/50 uppercase">Interior Design</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-sm tracking-wide text-charcoal/70 hover:text-charcoal transition-colors duration-300 group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* Lang Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-charcoal/15 hover:border-gold transition-colors duration-300 group"
            aria-label="Toggle language"
          >
            <span className={`text-xs font-medium transition-colors ${lang === 'en' ? 'text-charcoal' : 'text-charcoal/40'}`}>EN</span>
            <div className="relative w-8 h-4 rounded-full bg-charcoal/10">
              <div
                className={`absolute top-0.5 w-3 h-3 rounded-full bg-gold transition-all duration-300 ${lang === 'en' ? 'left-0.5' : 'left-4'}`}
              />
            </div>
            <span className={`text-xs font-medium transition-colors ${lang === 'ar' ? 'text-charcoal' : 'text-charcoal/40'}`}>ع</span>
          </button>

          {/* Mobile menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-charcoal"
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass mt-3 mx-6 rounded-2xl p-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-charcoal/80 hover:text-gold transition-colors text-lg font-serif"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ---------- Hero ----------
function Hero({ lang }: { lang: Lang }) {
  const tr = t[lang].hero;
  const waRef = useMagnetic(0.25);
  const isAr = lang === 'ar';

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background compass */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none">
        <Compass size={600} className="compass-spin text-charcoal" strokeWidth={0.5} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Text side */}
        <div className={`flex flex-col gap-8 ${isAr ? 'items-end text-right' : 'items-start'}`} dir={isAr ? 'rtl' : 'ltr'}>
          <div className="flex items-center gap-3">
            <span className="w-10 h-px bg-gold" />
            <span className="text-xs tracking-[0.3em] uppercase text-charcoal/60">{tr.tag}</span>
          </div>

          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.95] text-charcoal">
            {tr.title1}
            <br />
            <span className="italic gold-text">{tr.title2}</span>
          </h1>

          <p className="text-lg text-charcoal/60 max-w-md leading-relaxed font-light">{tr.sub}</p>

          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center mt-4">
            {/* WhatsApp CTA */}
            <div ref={waRef} className="magnetic">
              <a
                href="https://wa.me/97145550199"
                target="_blank"
                rel="noopener noreferrer"
                className="wa-pulse group relative flex items-center gap-3 px-7 py-4 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="relative z-10">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.89-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="font-medium tracking-wide relative z-10">{tr.cta}</span>
              </a>
            </div>

            <a
              href="#work"
              className="group flex items-center gap-2 text-sm text-charcoal/60 hover:text-charcoal transition-colors"
            >
              <span className="w-12 h-px bg-charcoal/30 group-hover:bg-gold transition-colors" />
              {tr.scroll}
            </a>
          </div>
        </div>

        {/* Image side */}
        <div className="relative" data-parallax="0.15">
          <div className="parallax-img frame-gold rounded-sm aspect-[4/5] w-full">
            <img
              src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Hero project"
              className="w-full h-full object-cover scale-110"
            />
          </div>
          {/* Floating label */}
          <div className="absolute -bottom-6 -left-6 glass-dark text-cream px-5 py-3 rounded-sm">
            <div className="text-[10px] tracking-[0.25em] uppercase text-gold/80">Featured</div>
            <div className="font-serif text-lg">The Obsidian Penthouse</div>
          </div>
          {/* Decorative corner */}
          <div className="absolute -top-4 -right-4 w-20 h-20 border-t border-r border-gold/40" />
        </div>
      </div>
    </section>
  );
}

// ---------- About / Studio ----------
function Studio({ lang }: { lang: Lang }) {
  const tr = t[lang].about;
  const isAr = lang === 'ar';
  const stats = [
    { value: '120+', label: tr.stat1 },
    { value: '10', label: tr.stat2 },
    { value: '14', label: tr.stat3 },
  ];

  return (
    <section id="studio" className="py-32 px-6 md:px-10 relative">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <div className="lg:col-span-5 reveal" data-parallax="0.2">
          <div className="parallax-img frame-gold rounded-sm aspect-[3/4]">
            <img
              src="https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1000"
              alt="Studio"
              className="w-full h-full object-cover scale-110"
            />
          </div>
        </div>

        {/* Text */}
        <div className={`lg:col-span-7 flex flex-col gap-8 reveal ${isAr ? 'items-end text-right' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
          <div className="flex items-center gap-3">
            <span className="w-10 h-px bg-gold" />
            <span className="text-xs tracking-[0.3em] uppercase text-charcoal/60">{tr.label}</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-charcoal max-w-2xl">
            {tr.title}
          </h2>
          <p className="text-lg text-charcoal/60 leading-relaxed max-w-xl font-light">{tr.body}</p>

          {/* Stats */}
          <div className={`grid grid-cols-3 gap-8 mt-6 ${isAr ? 'text-right' : ''}`}>
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="font-serif text-4xl md:text-5xl gold-text">{s.value}</span>
                <span className="text-xs tracking-wide uppercase text-charcoal/50">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Portfolio Carousel ----------
function Portfolio({ lang }: { lang: Lang }) {
  const tr = t[lang].portfolio;
  const isAr = lang === 'ar';
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % projects.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + projects.length) % projects.length), []);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') (isAr ? prev : next)();
      if (e.key === 'ArrowLeft') (isAr ? next : prev)();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, isAr]);

  // Touch / drag
  const onTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) prev();
      else next();
    }
    setIsDragging(false);
  };

  return (
    <section id="work" className="py-32 px-6 md:px-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 reveal ${isAr ? 'items-end text-right' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-px bg-gold" />
              <span className="text-xs tracking-[0.3em] uppercase text-charcoal/60">{tr.label}</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal">{tr.title}</h2>
            <p className="text-charcoal/50 max-w-md font-light">{tr.sub}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-charcoal/20 flex items-center justify-center hover:bg-charcoal hover:text-cream hover:border-charcoal transition-all duration-300"
              aria-label="Previous"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-charcoal/20 flex items-center justify-center hover:bg-charcoal hover:text-cream hover:border-charcoal transition-all duration-300"
              aria-label="Next"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            ref={trackRef}
            className="carousel-track flex"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {projects.map((p) => (
              <div key={p.id} className="min-w-full px-1">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Image */}
                  <div className="lg:col-span-8" data-parallax="0.1">
                    <div className="parallax-img frame-gold rounded-sm aspect-[16/10]">
                      <img src={p.image} alt={p.titleEn} className="w-full h-full object-cover scale-110" />
                    </div>
                  </div>
                  {/* Text overlay */}
                  <div className={`lg:col-span-4 flex flex-col gap-5 ${isAr ? 'items-end text-right' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
                    <span className="text-xs tracking-[0.3em] uppercase text-gold">
                      {isAr ? p.categoryAr : p.categoryEn} — {p.year}
                    </span>
                    <h3 className="font-serif text-3xl md:text-4xl text-charcoal leading-tight">
                      {isAr ? p.titleAr : p.titleEn}
                    </h3>
                    <p className="text-charcoal/55 leading-relaxed font-light">
                      {isAr ? p.descAr : p.descEn}
                    </p>
                    <a
                      href="#contact"
                      className="group inline-flex items-center gap-2 text-sm text-charcoal hover:text-gold transition-colors mt-2"
                    >
                      <span className="border-b border-charcoal/30 group-hover:border-gold pb-0.5 transition-colors">
                        {tr.view}
                      </span>
                      <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-500 ${i === current ? 'w-12 bg-gold' : 'w-6 bg-charcoal/20'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Contact ----------
function Contact({ lang }: { lang: Lang }) {
  const tr = t[lang].contact;
  const isAr = lang === 'ar';
  const waRef = useMagnetic(0.2);

  return (
    <section id="contact" className="py-32 px-6 md:px-10 bg-charcoal text-cream relative overflow-hidden noise">
      {/* Compass bg */}
      <div className="absolute -bottom-40 -right-40 opacity-[0.04] pointer-events-none">
        <Compass size={500} className="compass-spin text-cream" strokeWidth={0.5} />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className={`flex flex-col gap-8 reveal ${isAr ? 'items-end text-right' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
          <div className="flex items-center gap-3">
            <span className="w-10 h-px bg-gold" />
            <span className="text-xs tracking-[0.3em] uppercase text-cream/60">{tr.label}</span>
          </div>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight">
            {tr.title}
          </h2>
          <p className="text-lg text-cream/60 max-w-md font-light leading-relaxed">{tr.sub}</p>

          <div ref={waRef} className="magnetic mt-4">
            <a
              href="https://wa.me/97145550199"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-8 py-4 rounded-full border border-gold/40 text-gold hover:bg-gold hover:text-charcoal transition-all duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.89-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="font-medium tracking-wide">{tr.cta}</span>
            </a>
          </div>
        </div>

        {/* Contact details */}
        <div className={`flex flex-col gap-6 reveal ${isAr ? 'items-end text-right' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
          {[
            { icon: Phone, label: tr.phone, href: `tel:${tr.phone.replace(/\s/g, '')}` },
            { icon: Mail, label: tr.email, href: `mailto:${tr.email}` },
            { icon: MapPin, label: tr.address, href: '#' },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="group flex items-center gap-5 text-cream/70 hover:text-gold transition-colors"
            >
              <div className="w-12 h-12 rounded-full border border-cream/15 flex items-center justify-center group-hover:border-gold transition-colors">
                <item.icon size={18} />
              </div>
              <span className="text-lg font-light">{item.label}</span>
            </a>
          ))}

          {/* Socials */}
          <div className="flex items-center gap-4 mt-8">
            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-cream/15 flex items-center justify-center text-cream/60 hover:text-gold hover:border-gold transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Footer ----------
function Footer({ lang }: { lang: Lang }) {
  const tr = t[lang].footer;
  const isAr = lang === 'ar';
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream/50 py-10 px-6 md:px-10 border-t border-cream/10">
      <div className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 ${isAr ? 'md:flex-row-reverse' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center overflow-hidden">
            <img src="/logo.jpeg" alt="Viorn" className="w-full h-full object-cover" />
          </div>
          <span className="font-serif text-lg text-cream">VIORN</span>
        </div>
        <p className="text-xs tracking-wide">© {year} Viorn Interior Design. {tr.rights}</p>
        <p className="text-xs tracking-wide text-cream/30">{tr.designed}</p>
      </div>
    </footer>
  );
}

// ---------- App ----------
export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const isAr = lang === 'ar';

  useReveal();
  useParallax();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  return (
    <div className="min-h-screen bg-cream text-charcoal font-sans">
      <LineTracker />
      <Nav lang={lang} setLang={setLang} />
      <main dir={isAr ? 'rtl' : 'ltr'}>
        <Hero lang={lang} />
        <Studio lang={lang} />
        <Portfolio lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
}
