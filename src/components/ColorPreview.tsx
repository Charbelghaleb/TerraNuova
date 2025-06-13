import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface ColorPreviewProps {
  color: {
    name: string;
    imagePath: string;
  };
  category: string;
  onClose: () => void;
  onNavigate?: (direction: 'prev' | 'next') => void;
  hasNavigation?: {
    hasPrev: boolean;
    hasNext: boolean;
  };
  onContactRedirect: () => void;
}

const ColorPreview: React.FC<ColorPreviewProps> = ({ 
  color, 
  category, 
  onClose, 
  onNavigate,
  hasNavigation,
  onContactRedirect
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasNavigation?.hasPrev && onNavigate) {
            onNavigate('prev');
          }
          break;
        case 'ArrowRight':
          if (hasNavigation?.hasNext && onNavigate) {
            onNavigate('next');
          }
          break;
        case '+':
        case '=':
          handleZoom('in');
          break;
        case '-':
          handleZoom('out');
          break;
        case '0':
          resetView();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNavigate, hasNavigation]);

  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      const newZoom = direction === 'in' ? prev * 1.2 : prev / 1.2;
      return Math.max(0.5, Math.min(3, newZoom));
    });
  };

  const resetView = () => {
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getColorDescription = (colorName: string, categoryName: string) => {
    const descriptions: { [key: string]: string } = {
      // Evolution
      'Aztec Beige': 'A warm, earthy beige with subtle texture variations that bring natural elegance to any space.',
      'Chestnut': 'Rich brown tones reminiscent of polished wood, perfect for creating a warm, inviting atmosphere.',
      'Cordwood': 'Natural wood-inspired finish with organic texture and depth.',
      'Domino': 'Classic black and white contrast with sophisticated geometric patterns.',
      'Driftwood': 'Weathered gray tones that capture the essence of coastal living.',
      'Mediterranean': 'Deep blue-green hues inspired by the crystal-clear waters of the Mediterranean Sea.',
      'Mount Everest': 'Cool gray tones with subtle white highlights, evoking the majesty of snow-capped peaks.',
      'Pebble Beach': 'Soft gray with natural stone-like texture, perfect for modern minimalist designs.',
      'Pecan': 'Warm brown with golden undertones, bringing the richness of natural wood indoors.',
      'Sandstone': 'Neutral beige with natural stone texture and earthy appeal.',
      'Silver Creek': 'Cool silver-gray with metallic highlights that shimmer in changing light.',
      'Slate Stone': 'Deep charcoal gray with natural stone texture and sophisticated appeal.',
      'Smoke': 'Soft gray with subtle blue undertones, creating a calming, contemporary atmosphere.',
      'Tidal Wave': 'Dynamic blue-gray with flowing patterns that mimic ocean waves.',

      // Enviroflake
      'Adobe': 'Warm terracotta tones with natural clay-like texture.',
      'Ash': 'Cool gray with subtle texture variations and modern appeal.',
      'Fieldstone': 'Natural stone appearance with varied earth tones.',
      'Flint': 'Dark gray with metallic highlights and industrial strength.',
      'Granite': 'Speckled gray pattern mimicking natural granite stone.',

      // Essential
      'Martin': 'Rich brown with golden highlights and premium finish.',
      'Mudslide': 'Deep brown with natural earth tones and rustic appeal.',
      'North Pole': 'Pure white with subtle texture for clean, modern spaces.',
      'Stormy Day': 'Dramatic gray with blue undertones and dynamic patterns.',
      'Trail Mix': 'Multi-toned brown with natural variation and outdoor appeal.',

      // Hybrid/Terrazzo
      'Anchorage Terrazzo': 'Sophisticated terrazzo pattern with cool gray base and colorful aggregates.',
      'Armadillo Terrazzo': 'Warm terrazzo finish with earth-toned aggregates and natural appeal.',
      'Claystone Hybrid': 'Hybrid finish combining the durability of epoxy with natural clay aesthetics.',
      'Husky Terrazzo': 'Bold terrazzo pattern with contrasting aggregates and modern appeal.',
      'Shale Hybrid': 'Natural shale-inspired finish with layered texture and depth.',
      'Slate Hybrid': 'Classic slate appearance with enhanced durability and performance.',
      'Turquoise Hybrid': 'Vibrant turquoise with hybrid technology for superior performance.',

      // Quartz
      'Aqua': 'Crystal-clear blue with quartz-like clarity and depth.',
      'Blizzard': 'Pure white with subtle sparkle and premium finish.',
      'Cream': 'Warm cream with smooth, luxurious appearance.',
      'Forge': 'Industrial gray with metallic undertones and strength.',
      'Hazel': 'Warm brown with golden highlights and natural appeal.',
      'Lava': 'Deep black with subtle texture and dramatic presence.',

      // Metallic
      'Bronze': 'Rich bronze with warm metallic finish and timeless elegance.',
      'Capri': 'Vibrant blue metallic with Mediterranean-inspired brilliance.',
      'Midnight': 'Deep black metallic with sophisticated shimmer.',
      'Mocha': 'Warm brown metallic with coffee-inspired richness.',
      'Royal': 'Deep purple metallic with regal sophistication.',
      'Ruby': 'Rich red metallic with gemstone-like brilliance.',
      'Scarlett': 'Vibrant red metallic with bold, dramatic appeal.',
      'Snow': 'Pure white metallic with pristine, reflective finish.',
      'Steel': 'Industrial gray metallic with modern, professional appearance.',
      'Sunburst': 'Golden yellow metallic with radiant, energizing warmth.'
    };

    return descriptions[colorName] || `Premium ${categoryName.toLowerCase()} finish with exceptional durability and stunning visual appeal.`;
  };

  const getApplicationSuggestions = (categoryName: string) => {
    const applications: { [key: string]: string[] } = {
      'Evolution': ['Residential garages', 'Retail showrooms', 'Office spaces', 'Restaurants'],
      'Enviroflake': ['Commercial kitchens', 'Healthcare facilities', 'Schools', 'Warehouses'],
      'Essential': ['Industrial facilities', 'Manufacturing plants', 'Workshops', 'Storage areas'],
      'Hybrid / Terrazzo': ['High-end retail', 'Luxury hotels', 'Corporate lobbies', 'Modern homes'],
      'Quartz': ['Clean rooms', 'Laboratories', 'Medical facilities', 'Food processing'],
      'Metallic': ['Showrooms', 'Galleries', 'Luxury retail', 'Entertainment venues']
    };

    return applications[categoryName] || ['Commercial spaces', 'Industrial facilities', 'Retail environments', 'Residential areas'];
  };

  const handleGetEstimate = () => {
    onClose();
    onContactRedirect();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Color Info */}
          <div className="text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-1">{color.name}</h1>
            <p className="text-white/80 text-sm md:text-base">{category} Collection</p>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Zoom Controls */}
            <div className="hidden md:flex items-center space-x-2 bg-black/30 backdrop-blur-sm rounded-lg p-2">
              <button
                onClick={() => handleZoom('out')}
                disabled={zoomLevel <= 0.5}
                className="p-2 text-white hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Zoom Out (-)"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-white text-sm min-w-[3rem] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => handleZoom('in')}
                disabled={zoomLevel >= 3}
                className="p-2 text-white hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Zoom In (+)"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={resetView}
                className="p-2 text-white hover:text-blue-400 transition-colors"
                title="Reset View (0)"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            {hasNavigation && onNavigate && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onNavigate('prev')}
                  disabled={!hasNavigation.hasPrev}
                  className="p-2 text-white hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Previous Color (←)"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => onNavigate('next')}
                  disabled={!hasNavigation.hasNext}
                  className="p-2 text-white hover:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Next Color (→)"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-white hover:text-red-400 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-full pt-20 pb-6">
        {/* Image Container */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div 
            className="relative max-w-full max-h-full overflow-hidden rounded-lg shadow-2xl cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
              </div>
            )}
            <img
              src={color.imagePath}
              alt={`${color.name} - ${category} Collection`}
              className="max-w-none transition-transform duration-200 select-none"
              style={{
                transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
                maxHeight: '80vh',
                maxWidth: '80vw'
              }}
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
              draggable={false}
            />
          </div>
        </div>

        {/* Info Panel */}
        <div className="hidden lg:block w-96 bg-white/95 backdrop-blur-sm p-8 overflow-y-auto">
          <div className="space-y-6">
            {/* Color Details */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{color.name}</h2>
              <div className="inline-block bg-gradient-to-r from-[#0066CC] to-red-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                {category} Collection
              </div>
              <p className="text-gray-700 leading-relaxed">
                {getColorDescription(color.name, category)}
              </p>
            </div>

            {/* Technical Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Features</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Chemical resistant coating</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Abrasion resistant surface</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>UV stable pigments</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Easy maintenance</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Long-lasting durability</span>
                </li>
              </ul>
            </div>

            {/* Recommended Applications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommended Applications</h3>
              <div className="grid grid-cols-1 gap-2">
                {getApplicationSuggestions(category).map((app, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                    {app}
                  </div>
                ))}
              </div>
            </div>

            {/* Color Matching */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Color Information</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Collection:</span>
                  <span className="font-medium text-gray-900">{category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Finish Type:</span>
                  <span className="font-medium text-gray-900">
                    {category === 'Metallic' ? 'Metallic' : 
                     category === 'Quartz' ? 'Quartz Enhanced' : 
                     'Standard'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sheen Level:</span>
                  <span className="font-medium text-gray-900">
                    {category === 'Metallic' ? 'High Gloss' : 'Satin'}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={handleGetEstimate}
                className="w-full bg-gradient-to-r from-[#0066CC] to-red-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Get Free Estimate with This Color
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Info Panel */}
      <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h3 className="font-semibold text-gray-900 mb-2">{color.name}</h3>
          <p className="text-sm text-gray-600 mb-3">
            {getColorDescription(color.name, category).substring(0, 100)}...
          </p>
          <button
            onClick={handleGetEstimate}
            className="w-full bg-gradient-to-r from-[#0066CC] to-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm"
          >
            Get Free Estimate
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="hidden md:block absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-xs">
        <div className="space-y-1">
          <div>ESC: Close • ←/→: Navigate • +/-: Zoom • 0: Reset</div>
        </div>
      </div>
    </div>
  );
};

export default ColorPreview;