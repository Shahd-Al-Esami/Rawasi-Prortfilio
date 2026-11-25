import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Properties from './sections/Featured Properties.jsx';
import Footer from './components/Footer.jsx';
import TopButton from './components/TopButton.jsx';
import aboutImg from './assets/about1.jpg';
import ContactConsultation from './sections/Contact&Consultation'
import Services from './sections/Services'
import Investments from './sections/Investment.jsx';
import Locations from './sections/Featured Locations.jsx';

export default function App() {
  const [splashFinished, setSplashFinished] = useState(false);
  const [listingType, setListingType] = useState('buy');
  const [lang, setLang] = useState('en');

  // منع التمرير أثناء عرض شاشة البداية
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = splashFinished ? 'auto' : 'hidden';

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [splashFinished]);

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#FAF9F6] text-slate-900 overflow-x-clip"
    >
      {!splashFinished && (
        <SplashScreen onFinish={() => setSplashFinished(true)} />
      )}

      <Navbar lang={lang} onChangeLang={setLang} />

      <main>
        <Hero lang={lang} />
        <About
          lang={lang}
          imageUrl={aboutImg}
          onSelectListingType={setListingType}
        />
        <Services lang={lang}/>

        <Properties
          lang={lang}
          listingType={listingType}
          onChangeListingType={setListingType}
        />
        <TopButton />
        <Investments lang={lang}/>
        <Locations lang={lang}/>
        <ContactConsultation lang={lang}/>
      </main>

      <Footer lang={lang} onChangeListingType={setListingType} />
    </div>
  );
}