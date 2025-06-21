import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <Link
              to="/"
              className="flex items-center justify-center md:justify-start space-x-3 mb-4 md:mb-6 hover:opacity-80 transition-opacity"
            >
              <img 
                src="/images/logo/terra-nuova-logo.png" 
                alt="TERRA NUOVA Logo"
                className="w-10 h-10 object-contain"
              />
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-wider">TERRA NUOVA</h3>
            </Link>
            <p className="text-gray-300 leading-relaxed text-base">
              Professional industrial floor coating solutions for businesses across Staten Island and the greater New York area.
            </p>
          </div>

          {/* Contact Information */}
          <div className="text-center md:text-left">
            <h4 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Contact Information</h4>
            <div className="space-y-3 md:space-y-4">
              {/* Address */}
              <div className="flex items-start justify-center md:justify-start space-x-3 group">
                <MapPin className="w-5 h-5 text-[#0066CC] flex-shrink-0 mt-0.5 group-hover:text-blue-400 transition-colors" />
                <div>
                  <p className="text-gray-300 font-medium text-base">166 Industrial Loop</p>
                  <p className="text-gray-300 text-base">Staten Island, NY 10309</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-center md:justify-start space-x-3 group">
                <Phone className="w-5 h-5 text-[#0066CC] flex-shrink-0 group-hover:text-blue-400 transition-colors" />
                <a 
                  href="tel:+17182004133"
                  className="text-gray-300 font-medium hover:text-white transition-colors text-base min-h-[44px] flex items-center"
                >
                  (718) 200-4133
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Quick Links</h4>
            <div className="space-y-3">
              <a 
                href="/#services"
                className="block text-gray-300 hover:text-white transition-colors font-medium text-base min-h-[44px] flex items-center justify-center md:justify-start"
              >
                Our Services
              </a>
              <Link 
                to="/colors-finishes"
                className="block text-gray-300 hover:text-white transition-colors font-medium text-base min-h-[44px] flex items-center justify-center md:justify-start"
              >
                Colors & Finishes
              </Link>
              <Link 
                to="/contact"
                className="block text-gray-300 hover:text-white transition-colors font-medium text-base min-h-[44px] flex items-center justify-center md:justify-start"
              >
                Get Free Estimate
              </Link>
              <a 
                href="tel:+17182004133"
                className="block text-gray-300 hover:text-white transition-colors font-medium text-base min-h-[44px] flex items-center justify-center md:justify-start"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mb-6 md:mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-gray-400 text-sm text-center md:text-left">
            © 2025 TERRA NUOVA Industrial Floor Coatings. All rights reserved.
          </div>
        </div>

        {/* Company Logo at Bottom */}
        <div className="flex justify-center mt-8 md:mt-12">
          <Link
            to="/"
            className="w-24 h-24 md:w-32 md:h-32 opacity-60 hover:opacity-80 transition-opacity duration-300 block"
          >
            <img 
              src="/images/logo/terra-nuova-logo.png" 
              alt="TERRA NUOVA Logo"
              className="w-full h-full object-contain filter brightness-110"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;