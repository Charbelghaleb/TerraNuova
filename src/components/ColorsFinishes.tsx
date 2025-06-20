import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Palette, Search, Grid, List } from 'lucide-react';
import ColorPreview from './ColorPreview';

interface ColorsFinishesProps {
  onBack: () => void;
  onContactRedirect: () => void;
}

interface ColorSwatch {
  name: string;
  imagePath: string;
}

interface ColorCategory {
  name: string;
  colors: ColorSwatch[];
}

const ColorsFinishes: React.FC<ColorsFinishesProps> = ({ onBack, onContactRedirect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Evolution');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [selectedColor, setSelectedColor] = useState<ColorSwatch | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(-1);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const colorCategories: ColorCategory[] = [
    {
      name: 'Evolution',
      colors: [
        { name: 'Aztec Beige', imagePath: '/images/colors/evolution/aztec-beige.webp' },
        { name: 'Chestnut', imagePath: '/images/colors/evolution/chestnut.webp' },
        { name: 'Cordwood', imagePath: '/images/colors/evolution/cordwood.webp' },
        { name: 'Domino', imagePath: '/images/colors/evolution/domino.webp' },
        { name: 'Driftwood', imagePath: '/images/colors/evolution/driftwood.webp' },
        { name: 'Mediterranean', imagePath: '/images/colors/evolution/mediterranean.webp' },
        { name: 'Mount Everest', imagePath: '/images/colors/evolution/mount-everest.webp' },
        { name: 'Pebble Beach', imagePath: '/images/colors/evolution/pebble-beach.webp' },
        { name: 'Pecan', imagePath: '/images/colors/evolution/pecan.webp' },
        { name: 'Sandstone', imagePath: '/images/colors/evolution/sandstone.webp' },
        { name: 'Silver Creek', imagePath: '/images/colors/evolution/silver-creek.webp' },
        { name: 'Slate Stone', imagePath: '/images/colors/evolution/slate-stone.webp' },
        { name: 'Smoke', imagePath: '/images/colors/evolution/smoke.webp' },
        { name: 'Tidal Wave', imagePath: '/images/colors/evolution/tidal-wave.webp' }
      ]
    },
    {
      name: 'Enviroflake',
      colors: [
        { name: 'Adobe', imagePath: '/images/colors/enviroflake/adobe.webp' },
        { name: 'Ash', imagePath: '/images/colors/enviroflake/ash.webp' },
        { name: 'Fieldstone', imagePath: '/images/colors/enviroflake/fieldstone.webp' },
        { name: 'Flint', imagePath: '/images/colors/enviroflake/flint.webp' },
        { name: 'Granite', imagePath: '/images/colors/enviroflake/granite.webp' }
      ]
    },
    {
      name: 'Essential',
      colors: [
        { name: 'Martin', imagePath: '/images/colors/essential/martin.webp' },
        { name: 'Mudslide', imagePath: '/images/colors/essential/mudslide.webp' },
        { name: 'North Pole', imagePath: '/images/colors/essential/north-pole.webp' },
        { name: 'Stormy Day', imagePath: '/images/colors/essential/stormy-day.webp' },
        { name: 'Trail Mix', imagePath: '/images/colors/essential/trail-mix.webp' }
      ]
    },
    {
      name: 'Hybrid / Terrazzo',
      colors: [
        { name: 'Anchorage Terrazzo', imagePath: '/images/colors/hybrid-terrazzo/anchorage-terrazzo.webp' },
        { name: 'Armadillo Terrazzo', imagePath: '/images/colors/hybrid-terrazzo/armadillo-terrazzo.webp' },
        { name: 'Claystone Hybrid', imagePath: '/images/colors/hybrid-terrazzo/claystone-hybrid.webp' },
        { name: 'Husky Terrazzo', imagePath: '/images/colors/hybrid-terrazzo/husky-terrazzo.webp' },
        { name: 'Shale Hybrid', imagePath: '/images/colors/hybrid-terrazzo/shale-hybrid.webp' },
        { name: 'Slate Hybrid', imagePath: '/images/colors/hybrid-terrazzo/slate-hybrid.webp' },
        { name: 'Turquoise Hybrid', imagePath: '/images/colors/hybrid-terrazzo/turquoise-hybrid.webp' }
      ]
    },
    {
      name: 'Quartz',
      colors: [
        { name: 'Aqua', imagePath: '/images/colors/quartz/aqua.webp' },
        { name: 'Blizzard', imagePath: '/images/colors/quartz/blizzard.webp' },
        { name: 'Cream', imagePath: '/images/colors/quartz/cream.webp' },
        { name: 'Forge', imagePath: '/images/colors/quartz/forge.webp' },
        { name: 'Hazel', imagePath: '/images/colors/quartz/hazel.webp' },
        { name: 'Lava', imagePath: '/images/colors/quartz/lava.webp' }
      ]
    },
    {
      name: 'Metallic',
      colors: [
        { name: 'Bronze', imagePath: '/images/colors/metallic/bronze.webp' },
        { name: 'Capri', imagePath: '/images/colors/metallic/capri.webp' },
        { name: 'Midnight', imagePath: '/images/colors/metallic/midnight.webp' },
        { name: 'Mocha', imagePath: '/images/colors/metallic/mocha.webp' },
        { name: 'Royal', imagePath: '/images/colors/metallic/royal.webp' },
        { name: 'Ruby', imagePath: '/images/colors/metallic/ruby.webp' },
        { name: 'Scarlett', imagePath: '/images/colors/metallic/scarlett.webp' },
        { name: 'Snow', imagePath: '/images/colors/metallic/snow.webp' },
        { name: 'Steel', imagePath: '/images/colors/metallic/steel.webp' },
        { name: 'Sunburst', imagePath: '/images/colors/metallic/sunburst.webp' }
      ]
    }
  ];

  useEffect(() => {
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

    return () => {
      observerRef.current?.disconnect();
    };
  }, [selectedCategory]);

  const getScrollAnimationStyle = (elementId: string, delay: number = 0) => {
    const isVisible = visibleElements.has(elementId);
    const baseDelay = delay * 100;
    
    if (!isVisible) {
      return {
        opacity: 0,
        transform: 'translateY(20px) scale(0.95)',
        transition: 'none'
      };
    }

    return {
      opacity: 1,
      transform: 'translateY(0) scale(1)',
      transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${baseDelay}ms`
    };
  };

  const filteredColors = colorCategories
    .find(cat => cat.name === selectedCategory)
    ?.colors.filter(color => 
      color.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleColorClick = (color: ColorSwatch, index: number) => {
    setSelectedColor(color);
    setSelectedColorIndex(index);
  };

  const handleNavigateColor = (direction: 'prev' | 'next') => {
    const currentColors = filteredColors;
    let newIndex = selectedColorIndex;
    
    if (direction === 'prev' && newIndex > 0) {
      newIndex = newIndex - 1;
    } else if (direction === 'next' && newIndex < currentColors.length - 1) {
      newIndex = newIndex + 1;
    }
    
    if (newIndex !== selectedColorIndex && currentColors[newIndex]) {
      setSelectedColor(currentColors[newIndex]);
      setSelectedColorIndex(newIndex);
    }
  };

  const getNavigationState = () => {
    return {
      hasPrev: selectedColorIndex > 0,
      hasNext: selectedColorIndex < filteredColors.length - 1
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 backdrop-blur-md bg-white/90 border-b border-gray-100">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/images/logo/terra-nuova-logo.png" 
              alt="TERRA NUOVA Logo"
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-xl md:text-2xl font-bold text-[#0066CC] tracking-wider">TERRA NUOVA</h1>
          </button>
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-[#0066CC] transition-colors min-h-[44px] px-3"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-8 md:pb-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-4 md:mb-6">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-[#0066CC] to-red-600 rounded-full flex items-center justify-center">
              <Palette className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0066CC] mb-4 md:mb-6">Colors & Finishes</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive collection of premium floor coating colors and finishes. 
            From natural earth tones to vibrant metallics, find the perfect color to transform your space.
          </p>
        </div>
      </section>

      {/* Controls Section */}
      <section className="pb-6 md:pb-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search colors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20 focus:border-[#0066CC] transition-colors text-base min-h-[44px]"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  viewMode === 'grid' 
                    ? 'bg-white text-[#0066CC] shadow-sm' 
                    : 'text-gray-600 hover:text-[#0066CC]'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center ${
                  viewMode === 'list' 
                    ? 'bg-white text-[#0066CC] shadow-sm' 
                    : 'text-gray-600 hover:text-[#0066CC]'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="pb-6 md:pb-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {colorCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base min-h-[44px] ${
                  selectedCategory === category.name
                    ? 'bg-gradient-to-r from-[#0066CC] to-red-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 hover:text-[#0066CC] hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Color Swatches Grid */}
      <section className="pb-16 md:pb-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Category Header */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0066CC] mb-3 md:mb-4">{selectedCategory} Collection</h2>
            <p className="text-gray-600 text-base">
              {filteredColors.length} color{filteredColors.length !== 1 ? 's' : ''} available • Click any color for full-screen preview
            </p>
          </div>

          {/* Color Grid */}
          {filteredColors.length > 0 ? (
            <div className={`grid gap-4 md:gap-6 lg:gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {filteredColors.map((color, index) => (
                <div
                  key={color.name}
                  className={`group cursor-pointer scroll-reveal ${
                    viewMode === 'list' ? 'flex items-center space-x-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-lg' : ''
                  }`}
                  id={`color-swatch-${index}`}
                  style={getScrollAnimationStyle(`color-swatch-${index}`, index)}
                  onClick={() => handleColorClick(color, index)}
                >
                  <div className={`relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 ${
                    viewMode === 'list' ? 'w-20 h-20 md:w-24 md:h-24 flex-shrink-0' : 'aspect-square'
                  }`}>
                    <img
                      src={color.imagePath}
                      alt={color.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 md:px-3 py-1">
                        <span className="text-xs md:text-sm font-medium text-gray-900">View Full Screen</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={viewMode === 'list' ? 'flex-1' : 'mt-3 md:mt-4 text-center'}>
                    <h3 className={`font-semibold text-gray-900 group-hover:text-[#0066CC] transition-colors ${
                      viewMode === 'list' ? 'text-base md:text-lg' : 'text-sm md:text-base'
                    }`}>
                      {color.name}
                    </h3>
                    {viewMode === 'list' && (
                      <p className="text-gray-500 text-sm mt-1">{selectedCategory} Collection</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-16">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">No colors found</h3>
              <p className="text-gray-600">Try adjusting your search terms or select a different category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-r from-[#0066CC] to-red-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-black mb-4 md:mb-6">Found Your Perfect Color?</h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90">
            Get a free estimate and see how your chosen color will transform your space.
          </p>
          <button 
            onClick={onContactRedirect}
            className="bg-white text-[#0066CC] font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-base md:text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 min-h-[44px]"
          >
            Get Free Estimate
          </button>
        </div>
      </section>

      {/* Full-Screen Color Preview */}
      {selectedColor && (
        <ColorPreview
          color={selectedColor}
          category={selectedCategory}
          onClose={() => {
            setSelectedColor(null);
            setSelectedColorIndex(-1);
          }}
          onNavigate={handleNavigateColor}
          hasNavigation={getNavigationState()}
          onContactRedirect={onContactRedirect}
        />
      )}
    </div>
  );
};

export default ColorsFinishes;