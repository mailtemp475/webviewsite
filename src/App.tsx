import React, { useState } from 'react';
import { BookOpen, Youtube, Download, AArrowDown as Om, Heart, Music, Globe } from 'lucide-react';

function App() {
  const [language, setLanguage] = useState('hi'); // 'hi' for Hindi, 'en' for English

  const content = {
    hi: {
      title: 'सत्संग पोर्टल',
      subtitle: 'दिव्य ज्ञान',
      tagline: 'आध्यात्मिक यात्रा यहाँ से शुरू होती है',
      heroSubtitle: 'सत्संग पोर्टल',
      heroTitle: 'Satsag portl me',
      heroDescription: 'ब्लॉग, वीडियो और डाउनलोड सामग्री के माध्यम से दिव्य ज्ञान की खोज करें। आपकी आध्यात्मिक यात्रा यहाँ से शुरू होती है।',
      ctaTitle: 'आज ही अपनी आध्यात्मिक यात्रा शुरू करें',
      ctaDescription: 'हजारों साधकों के साथ जुड़ें जिन्होंने हमारे प्लेटफॉर्म के माध्यम से शांति, ज्ञान और दिव्य संबंध पाया है।',
      ctaButton: 'खोजना शुरू करें',
      exploreButton: 'अभी देखें',
      footerText: 'अपने दिल की सुनें, अपना रास्ता खोजें',
      madeWithLove: 'प्रेम से बनाया गया',
      copyright: '2025 सत्संग पोर्टल। दिव्य ज्ञान और आध्यात्मिक विकास का प्रसार।',
      features: [
        {
          title: 'सत्संग ब्लॉग',
          description: 'हमारे प्रेरणादायक सत्संग ब्लॉग और शिक्षाओं के संग्रह के माध्यम से आध्यात्मिक ज्ञान का अन्वेषण करें'
        },
        {
          title: 'यूट्यूब चैनल',
          description: 'लाइव सत्संग सत्र, आध्यात्मिक प्रवचन और दिव्य शिक्षाएं देखें'
        },
        {
          title: 'सत्संग डाउनलोड',
          description: 'ऑफलाइन आध्यात्मिक अभ्यास और ध्यान के लिए यूट्यूब सत्संग वीडियो डाउनलोड करें'
        }
      ]
    },
    en: {
      title: 'Satsang Portal',
      subtitle: 'Divine Wisdom',
      tagline: 'Spiritual Journey Begins Here',
      heroTitle: 'Welcome to',
      heroSubtitle: 'Satsang Portal',
      heroDescription: 'Discover divine wisdom through blogs, videos, and downloadable content. Your spiritual journey towards enlightenment starts here.',
      ctaTitle: 'Begin Your Spiritual Journey Today',
      ctaDescription: 'Join thousands of seekers who have found peace, wisdom, and divine connection through our platform.',
      ctaButton: 'Start Exploring',
      exploreButton: 'Explore Now',
      footerText: 'Follow your heart, find your path',
      madeWithLove: 'Made with love',
      copyright: '2025 Satsang Portal. Spreading divine wisdom and spiritual growth.',
      features: [
        {
          title: 'Satsang Blogs',
          description: 'Explore spiritual wisdom through our collection of inspiring Satsang blogs and teachings'
        },
        {
          title: 'YouTube Channel',
          description: 'Watch live Satsang sessions, spiritual discourses, and divine teachings'
        },
        {
          title: 'Download Satsang',
          description: 'Download YouTube Satsang videos for offline spiritual practice and meditation'
        }
      ]
    }
  };

  const currentContent = content[language];

  const features = [
    {
      icon: BookOpen,
      title: currentContent.features[0].title,
      description: currentContent.features[0].description,
      color: 'from-orange-500 to-amber-600',
      bgColor: 'bg-orange-50',
      hoverColor: 'hover:bg-orange-100',
      link: 'https://realkgf.com/blogs',
      openInSameTab: false
    },
    {
      icon: Youtube,
      title: currentContent.features[1].title,
      description: currentContent.features[1].description,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      hoverColor: 'hover:bg-red-100',
      link: 'https://realkgf.com/videos',
      openInSameTab: false
    },
    {
      icon: Download,
      title: currentContent.features[2].title,
      description: currentContent.features[2].description,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100',
      link: 'https://realkgf.com/satsang',
      openInSameTab: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-2 rounded-full">
                <Om className="h-6 w-6 text-white" />
              </div>
              <h1 
                className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-700 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity duration-300"
                onClick={() => window.location.reload()}
              >
                {currentContent.title}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-orange-500" />
              <span className="text-gray-600 font-medium">{currentContent.subtitle}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-6">
              <Music className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">{currentContent.tagline}</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
  {language === 'hi' ? (
    <>
      <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
        सत्संग पोर्टल
      </span>{' '}
      में आपका स्वागत है
    </>
  ) : (
    <>
      {currentContent.heroTitle}{' '}
      <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
        Satsang Portal
      </span>
    </>
  )}
</h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            {currentContent.heroDescription}
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <a
                  href={feature.link}
                  target={feature.openInSameTab ? '_self' : '_blank'}
                  rel={feature.openInSameTab ? undefined : 'noopener noreferrer'}
                  key={index}
                  className={`${feature.bgColor} ${feature.hoverColor} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group border border-white/50`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`bg-gradient-to-r ${feature.color} p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {feature.description}
                    </p>
                    
                    <div className={`bg-gradient-to-r ${feature.color} text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-200 inline-block`}>
                      {currentContent.exploreButton}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {currentContent.ctaTitle}
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            {currentContent.ctaDescription}
          </p>
          <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            {currentContent.ctaButton}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-2 rounded-full">
                <Om className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">{currentContent.title}</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-orange-100 rounded-full p-1">
              <Globe className="h-4 w-4 text-orange-600 ml-2" />
              <button
                onClick={() => setLanguage('hi')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                  language === 'hi'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-orange-600 hover:bg-orange-200'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                  language === 'en'
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'text-orange-600 hover:bg-orange-200'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
