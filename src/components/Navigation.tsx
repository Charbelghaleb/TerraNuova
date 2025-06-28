import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Phone, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isGalleryDropdownOpen, setIsGalleryDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const galleryDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const services = [
    { title: "Chip System", shortDesc: "Durable & Decorative", url: "/services/chip-system", gradient: "from-[#0066CC] to-blue-400" },
    { title: "Quartz System", shortDesc: "Maximum Strength", url: "/services/quartz-system", gradient: "from-slate-600 to-slate-400" },
    { title: "Metallic System", shortDesc: "Stunning Finish", url: "/services/metallic-system", gradient: "from-red-600 to-red-500" },
    { title: "Solid Color Polyurea", shortDesc: "Weather Resistant", url: "/services/solid-color-polyurea", gradient: "from-green-600 to-emerald-500" },
    { title: "Solid Color Epoxy", shortDesc: "Cost Effective", url: "/services/solid-color-epoxy", gradient: "from-[#0066CC] to-cyan-500" },
    { title: "Polyurea Shop Floor System", shortDesc: "Industrial Grade", url: "/services/polyurea-shop-floor-system", gradient: "from-indigo-600 to-blue-500" },
    { title: "Formcove System", shortDesc: "Seamless Transition", url: "/services/formcove-system", gradient: "from-orange-600 to-red-500" }
  ];

  useEffect(() => {
    // Close dropdowns when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target as Node)) {
        setIsServicesDropdownOpen(false);
      }
      if (galleryDropdownRef.current && !galleryDropdownRef.current.contains(event.target as Node)) {
        setIsGalleryDropdownOpen(false);
      }
    };

    // Close mobile menu on route change
    setIsMobileMenuOpen(false);

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [location]);

  // Close mobile menu when clicking on links
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 mobile-nav-backdrop border-b border-gray-100">
      <div className="mobile-container-padding py-4 md:p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity mobile-touch-feedback"
            onClick={handleMobileLinkClick}
          >
            <img 
              src="/images/logo/terra-nuova-logo.png" 
              alt="TERRA NUOVA Logo"
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-lg md:text-2xl font-bold text-[#0066CC] tracking-wider">TERRA NUOVA</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 text-gray-600">
            {/* Services Dropdown */}
            <div className="relative" ref={servicesDropdownRef}>
              <button
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                onMouseEnter={() => setIsServicesDropdownOpen(true)}
                className="flex items-center space-x-1 hover:text-[#0066CC] transition-colors font-medium py-2 min-h-[48px] mobile-focus"
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
                    <Link
                      key={service.url}
                      to={service.url}
                      onClick={() => setIsServicesDropdownOpen(false)}
                      className="w-full text-left p-4 rounded-xl hover:bg-gradient-to-r hover:from-[#0066CC]/5 hover:to-red-600/5 transition-all duration-200 group min-h-[48px] block mobile-focus"
                      style={{
                        animationDelay: `${index * 50}ms`
                      }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 bg-gradient-to-r ${service.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                          <div className="w-5 h-5 bg-white rounded-sm"></div>
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
                    </Link>
                  ))}
                </div>
                
                {/* View All Services Footer */}
                <div className="border-t border-gray-100 p-3 bg-gray-50/50">
                  <Link 
                    to="/#services"
                    onClick={() => setIsServicesDropdownOpen(false)}
                    className="block text-center text-sm font-medium text-[#0066CC] hover:text-red-600 transition-colors min-h-[48px] flex items-center justify-center mobile-focus"
                  >
                    View All Services →
                  </Link>
                </div>
              </div>
            </div>

            {/* Gallery Dropdown */}
            <div className="relative" ref={galleryDropdownRef}>
              <button
                onClick={() => setIsGalleryDropdownOpen(!isGalleryDropdownOpen)}
                onMouseEnter={() => setIsGalleryDropdownOpen(true)}
                className="flex items-center space-x-1 hover:text-[#0066CC] transition-colors font-medium py-2 min-h-[48px] mobile-focus"
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
                  <Link
                    to="/colors-finishes"
                    onClick={() => setIsGalleryDropdownOpen(false)}
                    className="w-full text-left p-4 rounded-xl hover:bg-gradient-to-r hover:from-[#0066CC]/5 hover:to-red-600/5 transition-all duration-200 group min-h-[48px] block mobile-focus"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <div className="w-5 h-5 bg-white rounded-sm"></div>
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
                  </Link>
                </div>
              </div>
            </div>
            
            <Link 
              to="/contact"
              className="hover:text-[#0066CC] transition-colors font-medium min-h-[48px] px-3 flex items-center mobile-focus"
            >
              Contact
            </Link>

            {/* Phone Number */}
            <a 
              href="tel:+17182004133"
              className="flex items-center space-x-2 hover:text-[#0066CC] transition-colors font-medium group min-h-[48px] mobile-focus"
            >
              <Phone className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
              <span>(718) 200-4133</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-[#0066CC] transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center mobile-touch-feedback mobile-focus"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Dropdown */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-[600px] opacity-100 mt-4' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-white/95 backdrop-blur-md rounded-2xl mobile-shadow-lg border border-gray-100 overflow-hidden">
            {/* Services Section */}
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 mb-3 mobile-text-lg">Services</h3>
              <div className="space-y-1">
                {services.map((service) => (
                  <Link
                    key={service.url}
                    to={service.url}
                    onClick={handleMobileLinkClick}
                    className="mobile-nav-item rounded-lg hover:bg-[#0066CC]/5 transition-colors mobile-touch-feedback mobile-focus"
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div className={`w-8 h-8 bg-gradient-to-r ${service.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <div className="w-4 h-4 bg-white rounded-sm"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 mobile-text-base truncate">{service.title}</h4>
                        <p className="mobile-text-sm text-gray-500 truncate">{service.shortDesc}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Quick Links Section */}
            <div className="p-4 space-y-1">
              <Link 
                to="/colors-finishes"
                onClick={handleMobileLinkClick}
                className="mobile-nav-item rounded-lg hover:bg-[#0066CC]/5 transition-colors mobile-touch-feedback mobile-focus"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-500 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                  </div>
                  <span className="font-semibold text-gray-900 mobile-text-base">Colors & Finishes</span>
                </div>
              </Link>
              
              <Link 
                to="/contact"
                onClick={handleMobileLinkClick}
                className="mobile-nav-item rounded-lg hover:bg-[#0066CC]/5 transition-colors mobile-touch-feedback mobile-focus"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-[#0066CC] to-blue-500 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-sm"></div>
                  </div>
                  <span className="font-semibold text-gray-900 mobile-text-base">Contact Us</span>
                </div>
              </Link>
              
              <a 
                href="tel:+17182004133"
                onClick={handleMobileLinkClick}
                className="mobile-nav-item rounded-lg hover:bg-[#0066CC]/5 transition-colors mobile-touch-feedback mobile-focus"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900 mobile-text-base">Call (718) 200-4133</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;