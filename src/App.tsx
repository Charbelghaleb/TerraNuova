import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Shield, Palette, Zap, Droplets, CornerDownRight, X, Check, ArrowLeft, Factory, ChevronDown, MapPin, Phone, Mail, Image } from 'lucide-react';
import ContactForm from './components/ContactForm';
import ColorsFinishes from './components/ColorsFinishes';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [currentPage, setCurrentPage] = useState('home');
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isGalleryDropdownOpen, setIsGalleryDropdownOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const galleryDropdownRef = useRef<HTMLDivElement>(null);

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

    // Close dropdowns when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
      if (galleryDropdownRef.current && !galleryDropdownRef.current.contains(event.target as Node)) {
        setIsGalleryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      observerRef.current?.disconnect();
    };
  }, [currentPage]);

  // Scroll to top when changing pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

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
      images: [
        "Chip concrete coating /5c26590e-99de-413d-bbf2-5c24ad82e6ae-960w.jpg",
        "Chip concrete coating /diy-double-broadcast-chip-floor-garage-epoxy-flooring-4__64801.jpg",
        "Chip concrete coating /flake-epoxy-garages-elevate-your-flooring-business-887298.webp"
      ],
      benefits: [
        "Superior durability and longevity",
        "Slip-resistant textured surface",
        "Custom color blending available",
        "Chemical and stain resistant",
        "Easy to clean and maintain"
      ],
      applications: ["Garages", "Showrooms", "Commercial spaces", "Retail floors", "Warehouses"]
    },
    { 
      id: 'quartz-system',
      icon: Shield, 
      title: "Quartz System", 
      shortDesc: "Maximum Strength",
      desc: "Our quartz system is similar to the chip system but has two additional layers (five in total) for added strength. Utilizing both a basecoat and topcoat of polyaspartic floor coating, our system has extreme adhesion, flexibility in changing temperatures, and chemical resistance.", 
      gradient: "from-slate-600 to-slate-400",
      images: [
        "Quartz System /6e922593-bb7f-4bdc-8f41-d1c41d0a2c91.png",
        "Quartz System /6db415a0-4047-4f79-b397-cc552d3164c0.png",
        "Quartz System /56533304-2a9c-479c-aaca-5cf719fb2ebe.png"
      ],
      benefits: [
        "Maximum durability for harsh environments",
        "Superior slip resistance",
        "Chemical and abrasion resistant",
        "Ideal for wet areas",
        "Long-lasting performance"
      ],
      applications: ["Pool decks", "Commercial kitchens", "Industrial facilities", "High-traffic areas", "Outdoor spaces"]
    },
    { 
      id: 'metallic-system',
      icon: Palette, 
      title: "Metallic System", 
      shortDesc: "Stunning Finish",
      desc: `Our floor finishing system utilizes natural pigments to create a 3D marbleized look with a bold pop of color. The eye-catching color movement and high gloss make this flooring system particularly popular for showrooms—or any space requiring that "wow" factor. And if you prefer a subtler appearance, we can swap the glossy topcoat with a high-quality matte one.`, 
      gradient: "from-red-600 to-red-500",
      images: [
        "Mettalic Sysytem/e9ee3dc4-f156-4136-a556-1a8fd86e4879.png",
        "Mettalic Sysytem/a8fdc318-1219-497c-be0a-2ae1ce8acffd.png",
        "Mettalic Sysytem/7c4e15c8-05a2-4351-a72b-dcb6db58641e.png"
      ],
      benefits: [
        "Unique 3D marbleized appearance",
        "High-gloss showroom finish",
        "Natural pigment colors",
        "One-of-a-kind patterns",
        "Stunning visual impact"
      ],
      applications: ["Showrooms", "Retail spaces", "Restaurants", "Lobbies", "Residential floors"]
    },
    { 
      id: 'solid-color-polyurea',
      icon: Zap, 
      title: "Solid Color Polyurea", 
      shortDesc: "Weather Resistant",
      desc: "Our solid color polyurea system withstands freeze-thaw cycles without cracking or splitting. It also has UV and chemical resistance.", 
      gradient: "from-green-600 to-emerald-500",
      images: [
        "Solid color polyurea system/adc08fed-e7ec-48d3-84c7-59483b433f40.png",
        "Solid color polyurea system/86bdf23e-4608-47d3-bf0a-808cefbe2e71.png",
        "Solid color polyurea system/0cfaf0b4-0d53-4b70-bce4-4e0b53cd5440.png"
      ],
      benefits: [
        "Extreme temperature resistance",
        "UV stable - won't fade",
        "Flexible and crack-resistant",
        "Fast curing time",
        "Multiple finish options"
      ],
      applications: ["Outdoor areas", "Industrial facilities", "Cold storage", "High-temperature zones", "UV-exposed surfaces"]
    },
    { 
      id: 'solid-color-epoxy',
      icon: Droplets, 
      title: "Solid Color Epoxy", 
      shortDesc: "Cost Effective",
      desc: "Like the rest of our concrete coatings, our solid color epoxy system has been specially engineered by experienced floor specialists. It fixes the problems common to low-quality epoxies—providing superior impact resistance and dependability at an affordable price.", 
      gradient: "from-[#0066CC] to-cyan-500",
      images: [
        "Solid color epoxy /fe3e0513-0901-4a49-9b4a-ba402b964db4.png",
        "Solid color epoxy /ead33166-8c26-4811-bdf1-d546035aef34.png",
        "Solid color epoxy /7e81ac4e-b072-4a71-bda0-f7e47cce6dc3.png"
      ],
      benefits: [
        "Cost-effective solution",
        "Seamless finish",
        "Chemical resistant",
        "Abrasion resistant",
        "Easy maintenance"
      ],
      applications: ["Large commercial areas", "Warehouses", "Manufacturing facilities", "Parking garages", "Storage areas"]
    },
    { 
      id: 'polyurea-shop-floor-system',
      icon: Factory, 
      title: "Polyurea Shop Floor System", 
      shortDesc: "Industrial Grade",
      desc: "The polyurea shop floor system offers added strength and durability. It also features a textured surface and moisture resistance, making it perfect for the harsh conditions of any workshop or factory.", 
      gradient: "from-indigo-600 to-blue-500",
      images: [
        "Polyurea Shop Floor System/3cd51f64-f1d6-4b48-8899-5706877978e4.png",
        "Polyurea Shop Floor System/488a60cf-000d-4e50-b7cd-430e4519c006.png",
        "Polyurea Shop Floor System/ec9dcc76-0f56-4a4f-9709-dfe85c82130f.png"
      ],
      benefits: [
        "Extreme impact and abrasion resistance",
        "Superior chemical protection",
        "Rapid cure time - minimal downtime",
        "Seamless, non-porous surface",
        "Long-term durability in harsh conditions"
      ],
      applications: ["Manufacturing facilities", "Automotive shops", "Heavy machinery areas", "Industrial warehouses", "Chemical processing plants"]
    },
    { 
      id: 'formcove-system',
      icon: CornerDownRight, 
      title: "Formcove System", 
      shortDesc: "Seamless Transition",
      desc: "Protect the vulnerable spot between your floors and walls with a Formcove system. Our unique cove base system takes one-third of the time of a standard installation and uses only half of the materials—saving you time and money.", 
      gradient: "from-orange-600 to-red-500",
      images: [
        "formcove system/029a9987-698a-4b44-9555-ed936ea5b88f.png",
        "formcove system/1411cd3c-26ec-499b-820b-f8e23de71f33.png",
        "formcove system/278a891e-1f57-42ff-a19e-b26c53a5fb9a.png"
      ],
      benefits: [
        "Seamless floor-to-wall transition",
        "Easy to clean and sanitize",
        "Prevents moisture buildup",
        "Eliminates dirt traps",
        "Professional appearance"
      ],
      applications: ["Commercial kitchens", "Healthcare facilities", "Clean rooms", "Food processing", "Laboratories"]
    }
  ];

  const renderServicePage = (service: any) => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
      {/* Crystalline Geometric Background */}
      <div className="fixed inset-0 z-0 geometric-inspired-background">
        <div className="crystalline-layer-1"></div>
        <div className="crystalline-layer-2"></div>
        <div className="crystalline-layer-3"></div>
        <div className="crystalline-layer-4"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 backdrop-blur-md bg-white/90 border-b border-gray-100">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <img 
              src="/LOGO/Terra_Nuova_Logo_Red_Updated_v2.png" 
              alt="TERRA NUOVA Logo"
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-2xl font-bold text-[#0066CC] tracking-wider">TERRA NUOVA</h1>
          </div>
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center space-x-2 text-gray-600 hover:text-[#0066CC] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </button>
        </div>
      </nav>

      {/* Service Hero Section */}
      <section className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-center lg:text-left">
              <div className={`w-20 h-20 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-8`}>
                <service.icon className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-[#0066CC] mb-6">{service.title}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{service.desc}</p>
            </div>
            
            {/* Right side - Hero Image */}
            {(service.id === 'chip-system' || service.id === 'quartz-system' || service.id === 'metallic-system' || service.id === 'polyurea-shop-floor-system' || service.id === 'solid-color-polyurea' || service.id === 'solid-color-epoxy' || service.id === 'formcove-system') && (
              <div className="flex justify-center lg:justify-end">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl max-w-lg">
                  <img 
                    src={service.id === 'chip-system' 
                      ? "Chip concrete coating /Screen Shot 2025-06-11 at 4.06.52 PM.png"
                      : service.id === 'quartz-system'
                      ? "Quartz System /Screen_Shot_2025-06-12_at_10.59.32_AM.png"
                      : service.id === 'metallic-system'
                      ? "Mettalic Sysytem/Screen_Shot_2025-06-12_at_11.09.22_AM.png"
                      : service.id === 'polyurea-shop-floor-system'
                      ? "Polyurea Shop Floor System/187b9dcc-0fba-494b-89a2-21d158cb7f94.png"
                      : service.id === 'solid-color-polyurea'
                      ? "Solid color polyurea system/b46273d4-82ac-4b70-ab1d-760750b31da3.png"
                      : service.id === 'solid-color-epoxy'
                      ? "Solid color epoxy /Screen_Shot_2025-06-12_at_12.18.28_PM.png"
                      : "formcove system/9b0097ef-e252-47e9-a6f1-56f818ee4bdb.png"
                    }
                    alt={`${service.title} Process Diagram`}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="py-20 px-6 bg-white/80 backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center text-[#0066CC] mb-16">Project Gallery</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {service.images.map((src: string, i: number) => (
              <div key={i} className="group">
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img 
                    src={src}
                    alt={`${service.title} project ${i + 1}`}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Features */}
      <section className="py-20 px-6 bg-gray-50/80 backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Key Benefits */}
            <div>
              <h3 className="text-3xl font-bold text-[#0066CC] mb-8">Key Benefits</h3>
              <ul className="space-y-4">
                {service.benefits.map((benefit: string, i: number) => (
                  <li key={i} className="flex items-start space-x-3">
                    <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications */}
            <div>
              <h3 className="text-3xl font-bold text-[#0066CC] mb-8">Applications</h3>
              <ul className="space-y-4">
                {service.applications.map((app: string, i: number) => (
                  <li key={i} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#0066CC] rounded-full flex-shrink-0 mt-3" />
                    <span className="text-gray-700 font-medium">{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#0066CC] to-red-600 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-black mb-6">Ready to Transform Your Space?</h2>
          <p className="text-xl mb-8 opacity-90">Get a free estimate for your {service.title.toLowerCase()} project today.</p>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-white text-[#0066CC] font-bold py-4 px-8 rounded-full text-lg premium-button-hover"
          >
            Get Free Estimate
          </button>
        </div>
      </section>
    </div>
  );

  // Contact Form Page
  if (currentPage === 'contact') {
    return <ContactForm onBack={() => setCurrentPage('home')} />;
  }

  // Colors & Finishes Page
  if (currentPage === 'colors-finishes') {
    return <ColorsFinishes onBack={() => setCurrentPage('home')} onContactRedirect={() => setCurrentPage('contact')} />;
  }

  if (currentPage !== 'home') {
    const service = services.find(s => s.id === currentPage);
    if (service) {
      return renderServicePage(service);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-x-hidden relative">
      {/* Crystalline Geometric Background - Inspired by the image */}
      <div className="fixed inset-0 z-0 geometric-inspired-background">
        <div className="crystalline-layer-1"></div>
        <div className="crystalline-layer-2"></div>
        <div className="crystalline-layer-3"></div>
        <div className="crystalline-layer-4"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 backdrop-blur-md bg-white/90 border-b border-gray-100">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <img 
              src="/LOGO/Terra_Nuova_Logo_Red_Updated_v2.png" 
              alt="TERRA NUOVA Logo"
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-2xl font-bold text-[#0066CC] tracking-wider">TERRA NUOVA</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-gray-600">
            {/* Services Dropdown */}
            <div className="relative" ref={servicesDropdownRef}>
              <button
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                onMouseEnter={() => setIsServicesDropdownOpen(true)}
                className="flex items-center space-x-1 hover:text-[#0066CC] transition-colors font-medium py-2"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Services Dropdown Menu */}
              <div 
                className={`absolute top-full right-0 mt-2 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                  isServicesDropdownOpen 
                    ? 'opacity-100 visible transform translate-y-0' 
                    : 'opacity-0 invisible transform -translate-y-2'
                }`}
                onMouseLeave={() => setIsServicesDropdownOpen(false)}
              >
                <div className="p-2">
                  {services.map((service, index) => (
                    <button
                      key={service.id}
                      onClick={() => {
                        setCurrentPage(service.id);
                        setIsServicesDropdownOpen(false);
                      }}
                      className="w-full text-left p-4 rounded-xl hover:bg-gradient-to-r hover:from-[#0066CC]/5 hover:to-red-600/5 transition-all duration-200 group"
                      style={{
                        animationDelay: `${index * 50}ms`
                      }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 bg-gradient-to-r ${service.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                          <service.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-[#0066CC] transition-colors text-sm">
                            {service.title}
                          </h3>
                          <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">
                            {service.shortDesc}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* View All Services Footer */}
                <div className="border-t border-gray-100 p-3 bg-gray-50/50">
                  <a 
                    href="#services"
                    onClick={() => setIsServicesDropdownOpen(false)}
                    className="block text-center text-sm font-medium text-[#0066CC] hover:text-red-600 transition-colors"
                  >
                    View All Services →
                  </a>
                </div>
              </div>
            </div>

            {/* Gallery Dropdown */}
            <div className="relative" ref={galleryDropdownRef}>
              <button
                onClick={() => setIsGalleryDropdownOpen(!isGalleryDropdownOpen)}
                onMouseEnter={() => setIsGalleryDropdownOpen(true)}
                className="flex items-center space-x-1 hover:text-[#0066CC] transition-colors font-medium py-2"
              >
                <span>Gallery</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isGalleryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Gallery Dropdown Menu */}
              <div 
                className={`absolute top-full right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                  isGalleryDropdownOpen 
                    ? 'opacity-100 visible transform translate-y-0' 
                    : 'opacity-0 invisible transform -translate-y-2'
                }`}
                onMouseLeave={() => setIsGalleryDropdownOpen(false)}
              >
                <div className="p-2">
                  <button
                    onClick={() => {
                      setCurrentPage('colors-finishes');
                      setIsGalleryDropdownOpen(false);
                    }}
                    className="w-full text-left p-4 rounded-xl hover:bg-gradient-to-r hover:from-[#0066CC]/5 hover:to-red-600/5 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <Palette className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-[#0066CC] transition-colors text-sm">
                          Colors & Finishes
                        </h3>
                        <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">
                          Browse Color Swatches
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setCurrentPage('contact')}
              className="hover:text-[#0066CC] transition-colors font-medium"
            >
              Contact
            </button>

            {/* Phone Number */}
            <a 
              href="tel:+17182004133"
              className="flex items-center space-x-2 hover:text-[#0066CC] transition-colors font-medium group"
            >
              <Phone className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span>(718) 200-4133</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
              className="text-gray-600 hover:text-[#0066CC] transition-colors"
            >
              <ChevronDown className={`w-6 h-6 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div className={`md:hidden mt-4 transition-all duration-300 ${isServicesDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 space-y-2">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  setCurrentPage(service.id);
                  setIsServicesDropdownOpen(false);
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-[#0066CC]/5 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 bg-gradient-to-r ${service.gradient} rounded-lg flex items-center justify-center`}>
                    <service.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">{service.title}</h3>
                    <p className="text-xs text-gray-500">{service.shortDesc}</p>
                  </div>
                </div>
              </button>
            ))}
            <div className="border-t border-gray-200 pt-3 mt-3">
              <button 
                onClick={() => {
                  setCurrentPage('colors-finishes');
                  setIsServicesDropdownOpen(false);
                }}
                className="w-full text-center py-2 text-[#0066CC] font-medium hover:text-red-600 transition-colors"
              >
                Colors & Finishes
              </button>
              <button 
                onClick={() => {
                  setCurrentPage('contact');
                  setIsServicesDropdownOpen(false);
                }}
                className="w-full text-center py-2 text-[#0066CC] font-medium hover:text-red-600 transition-colors"
              >
                Contact Us
              </button>
              <a 
                href="tel:+17182004133"
                className="block w-full text-center py-2 text-[#0066CC] font-medium hover:text-red-600 transition-colors"
                onClick={() => setIsServicesDropdownOpen(false)}
              >
                Call (718) 200-4133
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center relative px-6 pt-20 z-10">
        <div className="text-center space-y-8 max-w-6xl z-20 relative">
          {/* Enhanced Typography with Visual Effects */}
          <div className="hero-text-container">
            <h2 
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-[#0066CC] mb-4 scroll-reveal hero-text-enhanced"
              id="hero-title-1"
              style={getScrollAnimationStyle('hero-title-1', 'slideUp', 0)}
            >
              TIRED OF YOUR
            </h2>
            <h2 
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-4 scroll-reveal hero-text-enhanced"
              id="hero-title-2"
              style={getScrollAnimationStyle('hero-title-2', 'slideUp', 1)}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-700 hero-text-gradient">
                CRACKED STAINED
              </span>
            </h2>
            <h2 
              className="text-4xl md:text-6xl lg:text-7xl font-black text-[#0066CC] leading-tight tracking-tight mb-8 scroll-reveal hero-text-enhanced"
              id="hero-title-3"
              style={getScrollAnimationStyle('hero-title-3', 'slideUp', 2)}
            >
              FLOORS?
            </h2>
          </div>
          
          <div className="mt-12 scroll-reveal" id="hero-subtitle" style={getScrollAnimationStyle('hero-subtitle', 'fadeIn', 3)}>
            <p className="text-2xl md:text-3xl text-gray-700 font-medium">
              We have the <span className="text-[#0066CC] font-bold">solution.</span>
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0066CC] to-red-500 mx-auto mt-6 rounded-full"></div>
          </div>
          <button 
            onClick={() => setCurrentPage('contact')}
            className="mt-12 bg-gradient-to-r from-[#0066CC] to-red-600 text-white font-bold py-4 px-8 rounded-full text-lg scroll-reveal premium-button-hover"
            id="hero-cta"
            style={getScrollAnimationStyle('hero-cta', 'scaleIn', 4)}
          >
            Get Your Free Estimate
          </button>

          {/* Animated Scroll Indicator with Logo */}
          <div 
            className="flex justify-center mt-16 scroll-reveal"
            id="scroll-indicator"
            style={getScrollAnimationStyle('scroll-indicator', 'scaleIn', 5)}
          >
            <div className="flex flex-col items-center">
              {/* Animated Logo */}
              <div className="animate-scroll-bounce">
                <img 
                  src="/LOGO/Terra_Nuova_Logo_Red_Updated_v2.png" 
                  alt="TERRA NUOVA Logo - Scroll Down"
                  className="w-20 h-20 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
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
      <section className="py-20 px-6 relative bg-white/80 backdrop-blur-sm z-10">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 
              className="text-5xl md:text-7xl font-black text-[#0066CC] mb-4 scroll-reveal"
              id="choice-title-1"
              style={getScrollAnimationStyle('choice-title-1', 'slideUp', 0)}
            >
              You Have
            </h2>
            <h2 
              className="text-5xl md:text-7xl font-black scroll-reveal mb-4"
              id="choice-title-2"
              style={getScrollAnimationStyle('choice-title-2', 'slideUp', 1)}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">2 Choices</span>
            </h2>
            <h2 
              className="text-5xl md:text-7xl font-black text-[#0066CC] scroll-reveal"
              id="choice-title-3"
              style={getScrollAnimationStyle('choice-title-3', 'slideUp', 2)}
            >
              for Your Floors
            </h2>
          </div>
          
          {/* Cracked Option */}
          <div className="flex justify-center mb-16">
            <div 
              className="text-center scroll-reveal max-w-lg"
              id="cracked-option"
              style={getScrollAnimationStyle('cracked-option', 'slideLeft', 0)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-8 border border-red-200">
                <img 
                  src="Before after /IMG_8533_2.jpg" 
                  alt="Cracked concrete floor"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-500/30 to-transparent" />
              </div>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <X className="w-8 h-8 text-red-500" />
                <h3 className="text-3xl font-bold text-red-500">Either Cracked or Stained</h3>
              </div>
              <p className="text-gray-600 text-lg font-medium">Damaged, unsightly floors that hurt your business image</p>
            </div>
          </div>

          {/* OR Divider */}
          <div 
            className="text-center scroll-reveal mb-16"
            id="or-divider"
            style={getScrollAnimationStyle('or-divider', 'scaleIn', 1)}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-[#0066CC] to-red-600 rounded-full shadow-lg">
              <span className="text-4xl font-black text-white">OR</span>
            </div>
          </div>

          {/* Stunning Option */}
          <div className="flex justify-center mb-16">
            <div 
              className="text-center scroll-reveal max-w-lg"
              id="seamless-option"
              style={getScrollAnimationStyle('seamless-option', 'slideRight', 2)}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-8 border border-blue-200">
                <img 
                  src="Before after /IMG_8587 (1).jpg" 
                  alt="Beautiful epoxy floor"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 to-transparent" />
              </div>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Check className="w-8 h-8 text-green-500" />
                <h3 className="text-3xl font-bold text-[#0066CC]">Stunning and Seamless</h3>
              </div>
              <p className="text-gray-600 text-lg font-medium">Professional epoxy finish that transforms your space</p>
            </div>
          </div>

          {/* Solution Text */}
          <div className="text-center">
            <h3 
              className="text-4xl md:text-5xl font-black text-[#0066CC] mb-6 scroll-reveal"
              id="solution-title-1"
              style={getScrollAnimationStyle('solution-title-1', 'slideUp', 3)}
            >
              Transform Your Space with
            </h3>
            <h3 
              className="text-4xl md:text-5xl font-black mb-6 scroll-reveal"
              id="solution-title-2"
              style={getScrollAnimationStyle('solution-title-2', 'slideUp', 4)}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066CC] to-red-600">
                Professional Epoxy Coating
              </span>
            </h3>
            <p 
              className="text-xl text-gray-600 font-medium max-w-2xl mx-auto scroll-reveal"
              id="solution-description"
              style={getScrollAnimationStyle('solution-description', 'fadeIn', 5)}
            >
              Durable, stunning, and seamless floors that enhance your business image and last for years
            </p>
          </div>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="py-20 px-6 relative bg-gray-50/80 backdrop-blur-sm z-10">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              "3 photos in the website/1f9d08a5-2982-4f01-b84c-9f911723cde1.png",
              "3 photos in the website/81c8dc22-f0ee-4c4d-a044-8e2d8f26dd1f.png",
              "3 photos in the website/b4e9db81-0386-498d-8c4e-8d2c2acb6cb8.png"
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
                  className="w-full h-48 object-cover rounded-lg shadow-lg border border-[#0066CC]/10"
                />
              </div>
            ))}
          </div>
          
          {/* Get Free Estimate Button */}
          <div 
            className="mt-12 scroll-reveal"
            id="transformation-cta"
            style={getScrollAnimationStyle('transformation-cta', 'scaleIn', 3)}
          >
            <button 
              onClick={() => setCurrentPage('contact')}
              className="bg-gradient-to-r from-[#0066CC] to-red-600 text-white font-bold py-4 px-8 rounded-full text-lg premium-button-hover"
            >
              Get a Free Estimate
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 relative bg-white/80 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 
            className="text-4xl md:text-5xl font-black text-center text-[#0066CC] mb-20 scroll-reveal"
            id="services-title"
            style={getScrollAnimationStyle('services-title', 'slideUp', 0)}
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066CC] to-red-600">Coating Systems</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div 
                key={i}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 scroll-reveal border border-gray-100 hover:border-[#0066CC]/30 cursor-pointer group"
                id={`service-card-${i}`}
                style={getScrollAnimationStyle(`service-card-${i}`, i % 2 === 0 ? 'slideLeft' : 'slideRight', Math.floor(i / 2))}
                onClick={() => setCurrentPage(service.id)}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-[#0066CC] mb-4 group-hover:text-red-600 transition-colors">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                <div className="mt-6 text-[#0066CC] font-semibold group-hover:text-red-600 transition-colors">
                  Learn More →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative bg-gray-50/80 backdrop-blur-sm z-10">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 
            className="text-4xl md:text-5xl font-black mb-8 scroll-reveal text-[#0066CC]"
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
            <button
              onClick={() => setCurrentPage('contact')}
              className="bg-gradient-to-r from-[#0066CC] to-red-600 hover:from-blue-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl premium-button-hover"
            >
              Get a Free Estimate
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 text-white relative overflow-hidden z-10">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Company Info */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-6">
                <img 
                  src="/LOGO/Terra_Nuova_Logo_Red_Updated_v2.png" 
                  alt="TERRA NUOVA Logo"
                  className="w-10 h-10 object-contain"
                />
                <h3 className="text-2xl font-bold text-white tracking-wider">TERRA NUOVA</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Professional industrial floor coating solutions for businesses across Staten Island and the greater New York area.
              </p>
            </div>

            {/* Contact Information */}
            <div className="text-center md:text-left">
              <h4 className="text-xl font-bold text-white mb-6">Contact Information</h4>
              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start justify-center md:justify-start space-x-3 group">
                  <MapPin className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-0.5 group-hover:text-blue-400 transition-colors" />
                  <div>
                    <p className="text-gray-300 font-medium">166 Industrial Loop</p>
                    <p className="text-gray-300">Staten Island, NY 10309</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-center md:justify-start space-x-3 group">
                  <Phone className="w-5 h-5 text-[#0066CC] flex-shrink-0 group-hover:text-blue-400 transition-colors" />
                  <a 
                    href="tel:+17182004133"
                    className="text-gray-300 font-medium hover:text-white transition-colors"
                  >
                    (718) 200-4133
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h4 className="text-xl font-bold text-white mb-6">Quick Links</h4>
              <div className="space-y-3">
                <a 
                  href="#services"
                  className="block text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Our Services
                </a>
                <button 
                  onClick={() => setCurrentPage('colors-finishes')}
                  className="block text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Colors & Finishes
                </button>
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="block text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Get Free Estimate
                </button>
                <a 
                  href="tel:+17182004133"
                  className="block text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 mb-8"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2025 TERRA NUOVA Industrial Floor Coatings. All rights reserved.
            </div>
          </div>

          {/* Company Logo at Bottom */}
          <div className="flex justify-center mt-12">
            <div className="w-32 h-32 opacity-60 hover:opacity-80 transition-opacity duration-300">
              <img 
                src="/LOGO/Terra_Nuova_Logo_Red_Updated_v2.png" 
                alt="TERRA NUOVA Logo"
                className="w-full h-full object-contain filter brightness-110"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;