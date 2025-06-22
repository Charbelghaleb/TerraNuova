import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Shield, Palette, Zap, Droplets, CornerDownRight, X, Check, Factory, ChevronDown, MapPin, Phone, Mail, Image } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import { useScrollToTop } from '../hooks/useScrollToTop';

function HomePage() {
  // Ensure scroll to top on page load/navigation
  useScrollToTop();
  
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Intersection Observer for scroll-triggered animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    // Observe all elements with scroll-reveal class
    const elementsToObserve = document.querySelectorAll('.scroll-reveal');
    elementsToObserve.forEach((el, index) => {
      if (!el.id) {
        el.id = `scroll-element-${index}`;
      }
      observerRef.current?.observe(el);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observerRef.current?.disconnect();
    };
  }, []);

  // Helper function to get scroll-triggered animation styles
  const getScrollAnimationStyle = (elementId: string, animationType: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' = 'fadeIn', delay: number = 0) => {
    const isVisible = visibleElements.has(elementId);
    const baseDelay = delay * 100;
    
    if (!isVisible) {
      switch (animationType) {
        case 'slideUp':
          return {
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'none'
          };
        case 'slideLeft':
          return {
            opacity: 0,
            transform: 'translateX(-30px)',
            transition: 'none'
          };
        case 'slideRight':
          return {
            opacity: 0,
            transform: 'translateX(30px)',
            transition: 'none'
          };
        case 'scaleIn':
          return {
            opacity: 0,
            transform: 'scale(0.95)',
            transition: 'none'
          };
        default:
          return {
            opacity: 0,
            transition: 'none'
          };
      }
    }

    return {
      opacity: 1,
      transform: 'translateY(0) translateX(0) scale(1)',
      transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${baseDelay}ms`
    };
  };

  const services = [
    { 
      id: 'chip-system',
      icon: Sparkles, 
      title: "Chip System", 
      shortDesc: "Durable & Decorative",
      desc: "Built with three layers for lasting strength, our chip system is a popular option for garage floors, schools, locker rooms, and commercial showrooms. This system is made of 99.5% polyurea solids to give it superior durability, including chemical, abrasion, and UV resistance. Best of all, its vinyl chips can be custom-blended into nearly any color you'd like!", 
      gradient: "from-[#0066CC] to-blue-400",
      url: "/services/chip-system"
    },
    { 
      id: 'quartz-system',
      icon: Shield, 
      title: "Quartz System", 
      shortDesc: "Maximum Strength",
      desc: "Our quartz system is similar to the chip system but has two additional layers (five in total) for added strength. Utilizing both a basecoat and topcoat of polyaspartic floor coating, our system has extreme adhesion, flexibility in changing temperatures, and chemical resistance.", 
      gradient: "from-slate-600 to-slate-400",
      url: "/services/quartz-system"
    },
    { 
      id: 'metallic-system',
      icon: Palette, 
      title: "Metallic System", 
      shortDesc: "Stunning Finish",
      desc: `Our floor finishing system utilizes natural pigments to create a 3D marbleized look with a bold pop of color. The eye-catching color movement and high gloss make this flooring system particularly popular for showrooms—or any space requiring that "wow" factor. And if you prefer a subtler appearance, we can swap the glossy topcoat with a high-quality matte one.`, 
      gradient: "from-red-600 to-red-500",
      url: "/services/metallic-system"
    },
    { 
      id: 'solid-color-polyurea',
      icon: Zap, 
      title: "Solid Color Polyurea", 
      shortDesc: "Weather Resistant",
      desc: "Our solid color polyurea system withstands freeze-thaw cycles without cracking or splitting. It also has UV and chemical resistance.", 
      gradient: "from-green-600 to-emerald-500",
      url: "/services/solid-color-polyurea"
    },
    { 
      id: 'solid-color-epoxy',
      icon: Droplets, 
      title: "Solid Color Epoxy", 
      shortDesc: "Cost Effective",
      desc: "Like the rest of our concrete coatings, our solid color epoxy system has been specially engineered by experienced floor specialists. It fixes the problems common to low-quality epoxies—providing superior impact resistance and dependability at an affordable price.", 
      gradient: "from-[#0066CC] to-cyan-500",
      url: "/services/solid-color-epoxy"
    },
    { 
      id: 'polyurea-shop-floor-system',
      icon: Factory, 
      title: "Polyurea Shop Floor System", 
      shortDesc: "Industrial Grade",
      desc: "The polyurea shop floor system offers added strength and durability. It also features a textured surface and moisture resistance, making it perfect for the harsh conditions of any workshop or factory.", 
      gradient: "from-indigo-600 to-blue-500",
      url: "/services/polyurea-shop-floor-system"
    },
    { 
      id: 'formcove-system',
      icon: CornerDownRight, 
      title: "Formcove System", 
      shortDesc: "Seamless Transition",
      desc: "Protect the vulnerable spot between your floors and walls with a Formcove system. Our unique cove base system takes one-third of the time of a standard installation and uses only half of the materials—saving you time and money.", 
      gradient: "from-orange-600 to-red-500",
      url: "/services/formcove-system"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Terra Nuova: Concrete Floor Coatings in NYC</title>
        <meta name="description" content="Professional epoxy floor coatings in NYC by Terra Nuova. Durable, stylish floors for garages, basements, shops & more. Free estimates available." />
        
        {/* LocalBusiness Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Terra Nuova",
            "image": "https://terranuova.us/images/logo/terra-nuova-logo.png",
            "url": "https://terranuova.us",
            "telephone": "+17182004133",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "166 Industrial Loop",
              "addressLocality": "Staten Island",
              "addressRegion": "NY",
              "postalCode": "10309",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 40.519,
              "longitude": -74.220
            },
            "openingHours": "Mo-Fr 09:00-18:00, Sa 09:00-17:00",
            "priceRange": "$$",
            "description": "Terra Nuova installs professional epoxy and polyurea floor coatings for residential, commercial, and industrial properties across NYC. Free estimates available.",
            "areaServed": [
              {
                "@type": "Place",
                "name": "New York"
              },
              {
                "@type": "Place",
                "name": "New Jersey"
              },
              {
                "@type": "Place",
                "name": "Connecticut"
              }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-x-hidden relative">
        {/* Crystalline Geometric Background */}
        <div className="fixed inset-0 z-0 geometric-inspired-background">
          <div className="crystalline-layer-1"></div>
          <div className="crystalline-layer-2"></div>
          <div className="crystalline-layer-3"></div>
          <div className="crystalline-layer-4"></div>
        </div>

        <Navigation />

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center relative px-4 md:px-6 pt-20 z-10">
          <div className="text-center space-y-6 md:space-y-8 max-w-6xl z-20 relative">
            {/* Enhanced Typography with Visual Effects */}
            <div className="hero-text-container">
              <h1 
                className="text-3xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-[#0066CC] mb-4 scroll-reveal hero-text-enhanced"
                id="hero-title-1"
                style={getScrollAnimationStyle('hero-title-1', 'slideUp', 0)}
              >
                TIRED OF YOUR
              </h1>
              <h1 
                className="text-3xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-4 scroll-reveal hero-text-enhanced"
                id="hero-title-2"
                style={getScrollAnimationStyle('hero-title-2', 'slideUp', 1)}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700 hero-text-gradient">
                  CRACKED STAINED
                </span>
              </h1>
              <h1 
                className="text-3xl md:text-6xl lg:text-7xl font-black text-[#0066CC] leading-tight tracking-tight mb-6 md:mb-8 scroll-reveal hero-text-enhanced"
                id="hero-title-3"
                style={getScrollAnimationStyle('hero-title-3', 'slideUp', 2)}
              >
                FLOORS?
              </h1>
            </div>
            
            <div className="mt-8 md:mt-12 scroll-reveal" id="hero-subtitle" style={getScrollAnimationStyle('hero-subtitle', 'fadeIn', 3)}>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-medium">
                We have the <span className="text-[#0066CC] font-bold">solution.</span>
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-[#0066CC] to-red-500 mx-auto mt-6 rounded-full"></div>
            </div>
            <Link 
              to="/contact"
              className="mt-8 md:mt-12 bg-gradient-to-r from-[#0066CC] to-red-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-base md:text-lg scroll-reveal premium-button-hover min-h-[44px] inline-block"
              id="hero-cta"
              style={getScrollAnimationStyle('hero-cta', 'scaleIn', 4)}
            >
              Get Your Free Estimate
            </Link>

            {/* Animated Scroll Indicator with Logo */}
            <div 
              className="flex justify-center mt-12 md:mt-16 scroll-reveal"
              id="scroll-indicator"
              style={getScrollAnimationStyle('scroll-indicator', 'scaleIn', 5)}
            >
              <div className="flex flex-col items-center">
                {/* Animated Logo */}
                <div className="animate-scroll-bounce">
                  <img 
                    src="/images/logo/terra-nuova-logo.png" 
                    alt="TERRA NUOVA Logo - Scroll Down"
                    className="w-16 h-16 md:w-20 md:h-20 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                
                {/* Scroll Text */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500 font-medium animate-pulse">
                    Scroll to explore our solutions
                  </p>
                  <div className="flex justify-center mt-2">
                    <ChevronDown className="w-5 h-5 text-gray-400 animate-bounce" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Choice Section */}
        <section className="py-16 md:py-20 px-4 md:px-6 relative bg-white/80 backdrop-blur-sm z-10">
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16 md:mb-20">
              <h2 
                className="text-3xl md:text-5xl lg:text-7xl font-black text-[#0066CC] mb-4 scroll-reveal"
                id="choice-title-1"
                style={getScrollAnimationStyle('choice-title-1', 'slideUp', 0)}
              >
                You Have
              </h2>
              <h2 
                className="text-3xl md:text-5xl lg:text-7xl font-black scroll-reveal mb-4"
                id="choice-title-2"
                style={getScrollAnimationStyle('choice-title-2', 'slideUp', 1)}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">2 Choices</span>
              </h2>
              <h2 
                className="text-3xl md:text-5xl lg:text-7xl font-black text-[#0066CC] scroll-reveal"
                id="choice-title-3"
                style={getScrollAnimationStyle('choice-title-3', 'slideUp', 2)}
              >
                for Your Floors
              </h2>
            </div>
            
            {/* Cracked Option */}
            <div className="flex justify-center mb-12 md:mb-16">
              <div 
                className="text-center scroll-reveal max-w-lg"
                id="cracked-option"
                style={getScrollAnimationStyle('cracked-option', 'slideLeft', 0)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-6 md:mb-8 border border-red-200">
                  <img 
                    src="/images/before-after/cracked-floor.jpg" 
                    alt="Cracked concrete floor"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-500/30 to-transparent" />
                </div>
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <X className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
                  <h3 className="text-xl md:text-3xl font-bold text-red-500">Either Cracked or Stained</h3>
                </div>
                <p className="text-gray-600 text-base md:text-lg font-medium">Damaged, unsightly floors that hurt your business image</p>
              </div>
            </div>

            {/* OR Divider */}
            <div 
              className="text-center scroll-reveal mb-12 md:mb-16"
              id="or-divider"
              style={getScrollAnimationStyle('or-divider', 'scaleIn', 1)}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-[#0066CC] to-red-600 rounded-full shadow-lg">
                <span className="text-3xl md:text-4xl font-black text-white">OR</span>
              </div>
            </div>

            {/* Stunning Option */}
            <div className="flex justify-center mb-12 md:mb-16">
              <div 
                className="text-center scroll-reveal max-w-lg"
                id="seamless-option"
                style={getScrollAnimationStyle('seamless-option', 'slideRight', 2)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-6 md:mb-8 border border-blue-200">
                  <img 
                    src="/images/before-after/finished-floor.jpg" 
                    alt="Beautiful epoxy floor"
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent" />
                </div>
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <Check className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
                  <h3 className="text-xl md:text-3xl font-bold text-[#0066CC]">Stunning and Seamless</h3>
                </div>
                <p className="text-gray-600 text-base md:text-lg font-medium">Professional epoxy finish that transforms your space</p>
              </div>
            </div>

            {/* Solution Text */}
            <div className="text-center">
              <h3 
                className="text-2xl md:text-4xl lg:text-5xl font-black text-[#0066CC] mb-4 md:mb-6 scroll-reveal"
                id="solution-title-1"
                style={getScrollAnimationStyle('solution-title-1', 'slideUp', 3)}
              >
                The art of
              </h3>
              <h3 
                className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 scroll-reveal"
                id="solution-title-2"
                style={getScrollAnimationStyle('solution-title-2', 'slideUp', 4)}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066CC] to-red-600">
                  Professional Epoxy Coating
                </span>
              </h3>
              <p 
                className="text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto scroll-reveal"
                id="solution-description"
                style={getScrollAnimationStyle('solution-description', 'fadeIn', 5)}
              >
                Durable, stunning, and seamless floors that enhance your business image and last for years
              </p>
            </div>
          </div>
        </section>

        {/* Transformation Section */}
        <section className="py-16 md:py-20 px-4 md:px-6 relative bg-gray-50/80 backdrop-blur-sm z-10">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-12 md:mt-16">
              {[
                "/images/gallery/transformation-1.png",
                "/images/gallery/transformation-2.png",
                "/images/gallery/transformation-3.png"
              ].map((src, i) => (
                <div 
                  key={i}
                  className="scroll-reveal"
                  id={`transformation-image-${i}`}
                  style={getScrollAnimationStyle(`transformation-image-${i}`, 'scaleIn', i)}
                >
                  <img 
                    src={src}
                    alt={`Epoxy floor transformation ${i + 1}`}
                    className="w-full h-40 md:h-48 object-cover rounded-lg shadow-lg border border-[#0066CC]/10"
                  />
                </div>
              ))}
            </div>
            
            {/* Get Free Estimate Button */}
            <div 
              className="mt-8 md:mt-12 scroll-reveal"
              id="transformation-cta"
              style={getScrollAnimationStyle('transformation-cta', 'scaleIn', 3)}
            >
              <Link 
                to="/contact"
                className="bg-gradient-to-r from-[#0066CC] to-red-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-base md:text-lg premium-button-hover min-h-[44px] inline-block"
              >
                Get a Free Estimate
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-20 px-4 md:px-6 relative bg-white/80 backdrop-blur-sm z-10">
          <div className="max-w-7xl mx-auto relative z-10">
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-black text-center text-[#0066CC] mb-16 md:mb-20 scroll-reveal"
              id="services-title"
              style={getScrollAnimationStyle('services-title', 'slideUp', 0)}
            >
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066CC] to-red-600">Coating Systems</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((service, i) => (
                <Link 
                  key={i}
                  to={service.url}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 scroll-reveal border border-gray-100 hover:border-[#0066CC]/30 cursor-pointer group block"
                  id={`service-card-${i}`}
                  style={getScrollAnimationStyle(`service-card-${i}`, i % 2 === 0 ? 'slideLeft' : 'slideRight', Math.floor(i / 2))}
                >
                  <div className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold text-[#0066CC] mb-3 md:mb-4 group-hover:text-red-600 transition-colors">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-base">{service.desc}</p>
                  <div className="mt-4 md:mt-6 text-[#0066CC] font-semibold group-hover:text-red-600 transition-colors">
                    Learn More →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-20 px-4 md:px-6 relative bg-gray-50/80 backdrop-blur-sm z-10">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 md:mb-8 scroll-reveal text-[#0066CC]"
              id="contact-title"
              style={getScrollAnimationStyle('contact-title', 'slideUp', 0)}
            >
              Ready for your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066CC] to-red-600">new floor?</span>
            </h2>
            
            {/* Get Free Estimate Button */}
            <div 
              className="scroll-reveal"
              id="contact-cta"
              style={getScrollAnimationStyle('contact-cta', 'scaleIn', 1)}
            >
              <Link
                to="/contact"
                className="bg-gradient-to-r from-[#0066CC] to-red-600 hover:from-blue-700 hover:to-red-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl premium-button-hover min-h-[44px] inline-block"
              >
                Get a Free Estimate
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default HomePage;