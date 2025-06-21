import React from 'react';
import { Palette, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

const MetallicSystemPage: React.FC = () => {
  const benefits = [
    "Unique 3D marbleized appearance",
    "High-gloss showroom finish",
    "Natural pigment colors",
    "One-of-a-kind patterns",
    "Stunning visual impact"
  ];

  const applications = [
    "Showrooms",
    "Retail spaces",
    "Restaurants",
    "Lobbies",
    "Residential floors"
  ];

  const images = [
    "/images/metallic-system/example-1.png",
    "/images/metallic-system/example-2.png",
    "/images/metallic-system/example-3.png"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
      {/* Crystalline Geometric Background */}
      <div className="fixed inset-0 z-0 geometric-inspired-background">
        <div className="crystalline-layer-1"></div>
        <div className="crystalline-layer-2"></div>
        <div className="crystalline-layer-3"></div>
        <div className="crystalline-layer-4"></div>
      </div>

      <Navigation />

      {/* Service Hero Section */}
      <section className="pt-24 md:pt-32 pb-20 px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-center lg:text-left">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6 md:mb-8">
                <Palette className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0066CC] mb-4 md:mb-6 leading-tight">Metallic System</h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Our floor finishing system utilizes natural pigments to create a 3D marbleized look with a bold pop of color. The eye-catching color movement and high gloss make this flooring system particularly popular for showrooms—or any space requiring that "wow" factor. And if you prefer a subtler appearance, we can swap the glossy topcoat with a high-quality matte one.
              </p>
            </div>
            
            {/* Right side - Hero Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl max-w-lg w-full">
                <img 
                  src="/images/metallic-system/process-diagram.png"
                  alt="Metallic System Process Diagram"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-white/80 backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center text-[#0066CC] mb-12 md:mb-16">Project Gallery</h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {images.map((src, i) => (
              <div key={i} className="group">
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img 
                    src={src}
                    alt={`Metallic System project ${i + 1}`}
                    className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Features */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-gray-50/80 backdrop-blur-sm relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Key Benefits */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#0066CC] mb-6 md:mb-8">Key Benefits</h3>
              <ul className="space-y-3 md:space-y-4">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium text-base md:text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#0066CC] mb-6 md:mb-8">Applications</h3>
              <ul className="space-y-3 md:space-y-4">
                {applications.map((app, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#0066CC] rounded-full flex-shrink-0 mt-3" />
                    <span className="text-gray-700 font-medium text-base md:text-lg">{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-r from-[#0066CC] to-red-600 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-black mb-4 md:mb-6">Ready to Transform Your Space?</h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90">Get a free estimate for your metallic system project today.</p>
          <Link 
            to="/contact"
            className="bg-white text-[#0066CC] font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-base md:text-lg premium-button-hover min-h-[44px] inline-block"
          >
            Get Free Estimate
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MetallicSystemPage;