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
        { name: 'Aztec Beige', imagePath: 'Colors/65ce2fcae0c153a96f06404e_65ce2610c8b650526476d822_aztec_beige_1.4.webp' },
        { name: 'Chestnut', imagePath: 'Colors/65ce2fca10c3b80da94bdf50_65ce262e3636a1f1468c6d31_chestnut_1.4.webp' },
        { name: 'Cordwood', imagePath: 'Colors/65ce2fcae7380189d3d7d851_65ce2717599e12858d81469b_cordwood_1.4.webp' },
        { name: 'Domino', imagePath: 'Colors/65ce2fcc6c5d08eb3918379f_65ce272a339e344ef68f7297_domino_1.4.webp' },
        { name: 'Driftwood', imagePath: 'Colors/65ce2fcb29842c034aed4188_65ce27e9b00bbe9661d92895_driftwood_1.4.webp' },
        { name: 'Mediterranean', imagePath: 'Colors/65ce2fcdfb702d1381afe19d_65ce280fdca64435b63c5e8a_mediterranean_1.4.webp' },
        { name: 'Mount Everest', imagePath: 'Colors/65ce2fcd3a121cb5fd6299f9_65ce282bc8161bf672ef5928_mount.everest_1.4.webp' },
        { name: 'Pebble Beach', imagePath: 'Colors/65ce2fcd2b4f26d2798f20b7_65ce28486917a028da801572_pebble_beach_1.4.webp' },
        { name: 'Pecan', imagePath: 'Colors/65ce2fcd840c380acba7a4be_65ce28595fdf6e2046ebeed7_pecan_1.4.webp' },
        { name: 'Sandstone', imagePath: 'Colors/65ce2fcefc54fa98a98f21ea_65ce287410310aacda70a9b9_sandstone_1.4.webp' },
        { name: 'Silver Creek', imagePath: 'Colors/65ce2fcef8e09a0d22f69ccd_65ce2887e56463431942b5b4_silver_creek_1.4.webp' },
        { name: 'Slate Stone', imagePath: 'Colors/65ce2fcea1aa0313049364ac_65ce28aecff599bd37b55274_slate_stone_1.4.webp' },
        { name: 'Smoke', imagePath: 'Colors/65ce2fcf04f611621a7e84c4_65ce28c2cff599bd37b566ab_smoke_1.4.webp' },
        { name: 'Tidal Wave', imagePath: 'Colors/65ce2fcfa90dacef2a72aa1d_65ce28de6083aec8b5529913_tidal_wave_fb-807_1.4.webp' }
      ]
    },
    {
      name: 'Enviroflake',
      colors: [
        { name: 'Adobe', imagePath: 'Colors/65ce2fc95cc7927f225c745f_65ce2409f7c3d70af4f8ffcb_adobe_enviroflake_1.4.webp' },
        { name: 'Ash', imagePath: 'Colors/65ce2fca9e0b851c9b3db2b8_65ce242c60e87177cc8f293d_ash_enviroflake_1.4.webp' },
        { name: 'Fieldstone', imagePath: 'Colors/65ce2fcb9e0b851c9b3db3b2_65ce244583719d6f16a08d5c_fieldstone_enviroflake_1.4.webp' },
        { name: 'Flint', imagePath: 'Colors/65ce2fcc5abd1f3c74770e7e_65ce2461ea998f52a3b5cf8e_flint_enviroflake_1.4.webp' },
        { name: 'Granite', imagePath: 'Colors/65ce2fccac598b3d61b5c191_65ce2478488da137c13f4e11_granite_enviroflake_1.4.webp' }
      ]
    },
    {
      name: 'Essential',
      colors: [
        { name: 'Martin', imagePath: 'Colors/65ce2fcdc1a14a8e78243af8_65ce2519b59954bb22d21fbb_PENNTEK__MARTIN.webp' },
        { name: 'Mudslide', imagePath: 'Colors/65ce2fcdd1e0c49d182bff11_65ce25314a36efbd49ec52e2_PENNTEK__MUDSLIDE.webp' },
        { name: 'North Pole', imagePath: 'Colors/65ce2fcd1bcf1027ba3e24cd_65ce2575c0c9e5c84c94df24_PENNTEK__NORTHPOLE.webp' },
        { name: 'Stormy Day', imagePath: 'Colors/65ce2fcd8925bb2c06339371_65ce2598800485ea84b406e5_PENNTEK__STORMY-DAY.webp' },
        { name: 'Trail Mix', imagePath: 'Colors/65ce2fcd11860aca1d60c2c1_65ce25ac66de6e26cf9da000_PENNTEK__TRAIL-MIX.webp' }
      ]
    },
    {
      name: 'Hybrid / Terrazzo',
      colors: [
        { name: 'Anchorage Terrazzo', imagePath: 'Colors/65ce2fcbe3ce2618026c2962_65ce29806083aec8b5531a25_FB-4204_ANCHORAGE.webp' },
        { name: 'Armadillo Terrazzo', imagePath: 'Colors/65ce2fcb7a11fbe311a3665e_65ce29af249930bedf9f0157_FB-4216_ARMADILLO.webp' },
        { name: 'Claystone Hybrid', imagePath: 'Colors/65ce2fcb1c42533b7ee52d40_65ce295efb1c0bb9290a4f75_FB-4110_CLAYSTONE.webp' },
        { name: 'Husky Terrazzo', imagePath: 'Colors/65ce2fcb80a107d3303f97da_65ce2997ef170aff0873953f_FB-4211_HUSKY.webp' },
        { name: 'Shale Hybrid', imagePath: 'Colors/65ce2fcb89351dcb0a8511c5_65ce2941bc8dd6565aecb5d1_FB-4106_SHALE.webp' },
        { name: 'Slate Hybrid', imagePath: 'Colors/65ce2fcbb808c63fdc986872_65ce292d26ced97139528bfb_FB-4105_SLATE.webp' },
        { name: 'Turquoise Hybrid', imagePath: 'Colors/65ce2fcb0e532b9389e49e28_65ce2917dca64435b63d0f5c_FB-4104_TURQUOISE.webp' }
      ]
    },
    {
      name: 'Quartz',
      colors: [
        { name: 'Aqua', imagePath: 'Colors/65ce2fc98b6264cce1204d69_65ce2b1e37795bc06d114871_Aqua.webp' },
        { name: 'Blizzard', imagePath: 'Colors/65ce2fca71cc076f2c9be26c_65ce2b40eee81fcdb8889ab6_Blizzard.webp' },
        { name: 'Cream', imagePath: 'Colors/65ce2fca73e8569a4d0b3b4a_65ce2b517c0c59fda1efd5bf_Cream-1.webp' },
        { name: 'Forge', imagePath: 'Colors/65ce2fcc9fdd7de1688abb9e_65ce2b76689467ebd02ec6da_Forge.webp' },
        { name: 'Hazel', imagePath: 'Colors/65ce2fcc5d8a5e84a938567c_65ce2b8f978b3b38ab0f88ad_Hazel.webp' },
        { name: 'Lava', imagePath: 'Colors/65ce2fcc3e0eeb9c63e4db62_65ce2bae787a5c282e159ed7_Lava.webp' }
      ]
    },
    {
      name: 'Metallic',
      colors: [
        { name: 'Bronze', imagePath: 'Color mettalic/65ce2fcab65830862b864377_65ce2a1116bddb066e1650a4_Bronze.webp' },
        { name: 'Capri', imagePath: 'Color mettalic/65ce2fca4329c7e0d6c48454_65ce2a30ba6f9756e23372b4_Capri.webp' },
        { name: 'Midnight', imagePath: 'Color mettalic/65ce2fcca9a989cc4e08d260_65ce2a40b189436085c4bb1e_Midnight.webp' },
        { name: 'Mocha', imagePath: 'Color mettalic/65ce2fcd0e532b9389e49f09_65ce2a5eab7f6d4ebffef113_Mocha.webp' },
        { name: 'Royal', imagePath: 'Color mettalic/65ce2fced7a7d7bf15ca4fba_65ce2a6eac57d7bfb974e0d2_Royal.webp' },
        { name: 'Ruby', imagePath: 'Color mettalic/65ce2fce82280fed75e9b442_65ce2a861b858f714cf562e4_Ruby.webp' },
        { name: 'Scarlett', imagePath: 'Color mettalic/65ce2fcebb57a7d5fed13725_65ce2a9b16bddb066e16c3b8_Scarlett.webp' },
        { name: 'Snow', imagePath: 'Color mettalic/65ce2fce361a559082bd1825_65ce2abda9ce7780aca7f4a2_Snow.webp' },
        { name: 'Steel', imagePath: 'Color mettalic/65ce2fcf6d2dd438a61814b2_65ce2acd67ab1b368a2c7bf3_Steel.webp' },
        { name: 'Sunburst', imagePath: 'Color mettalic/65ce2fcf0e532b9389e49f9f_65ce2ae6ab7f6d4ebfff053a_Sunburst.webp' }
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
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-[#0066CC] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-[#0066CC] to-red-600 rounded-full flex items-center justify-center">
              <Palette className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#0066CC] mb-6">Colors & Finishes</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive collection of premium floor coating colors and finishes. 
            From natural earth tones to vibrant metallics, find the perfect color to transform your space.
          </p>
        </div>
      </section>

      {/* Controls Section */}
      <section className="pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search colors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0066CC]/20 focus:border-[#0066CC] transition-colors"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-[#0066CC] shadow-sm' 
                    : 'text-gray-600 hover:text-[#0066CC]'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
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
      <section className="pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {colorCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
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
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Category Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0066CC] mb-4">{selectedCategory} Collection</h2>
            <p className="text-gray-600">
              {filteredColors.length} color{filteredColors.length !== 1 ? 's' : ''} available • Click any color for full-screen preview
            </p>
          </div>

          {/* Color Grid */}
          {filteredColors.length > 0 ? (
            <div className={`grid gap-8 ${
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
                    viewMode === 'list' ? 'w-24 h-24 flex-shrink-0' : 'aspect-square'
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
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-sm font-medium text-gray-900">View Full Screen</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={viewMode === 'list' ? 'flex-1' : 'mt-4 text-center'}>
                    <h3 className={`font-semibold text-gray-900 group-hover:text-[#0066CC] transition-colors ${
                      viewMode === 'list' ? 'text-lg' : 'text-sm'
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
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No colors found</h3>
              <p className="text-gray-600">Try adjusting your search terms or select a different category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#0066CC] to-red-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-black mb-6">Found Your Perfect Color?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get a free estimate and see how your chosen color will transform your space.
          </p>
          <button 
            onClick={onContactRedirect}
            className="bg-white text-[#0066CC] font-bold py-4 px-8 rounded-full text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
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