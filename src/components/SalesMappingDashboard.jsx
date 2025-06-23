import React, { useState } from 'react';

const SalesMappingDashboard = () => {
  const [hoveredCountry, setHoveredCountry] = useState(null);

  // Sample data - replace with your actual provider to client data
  const connectionData = {
    'United States': { 
      providers: 25, 
      clients: 850,
      color: '#FF8C00'
    },
    'Brazil': { 
      providers: 8, 
      clients: 240,
      color: '#FF4444'
    },
    'China': { 
      providers: 18, 
      clients: 1200,
      color: '#8B5CF6'
    },
    'Saudi Arabia': { 
      providers: 5, 
      clients: 120,
      color: '#10B981'
    },
    'Indonesia': { 
      providers: 6, 
      clients: 180,
      color: '#10B981'
    },
    'India': { 
      providers: 12, 
      clients: 650,
      color: '#3B82F6'
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Provider to Client Mapping by Country</h2>
      </div>

      <div className="relative bg-gray-100 rounded-lg p-8">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-auto"
          style={{ maxHeight: '500px' }}
        >
          {/* World map background - simplified continents */}
          
          {/* North America */}
          <path
            d="M50 80 Q30 60 10 80 L5 120 Q0 160 20 180 L60 200 Q100 190 130 160 L160 140 Q170 120 150 100 L120 80 Q90 70 50 80 Z"
            fill={hoveredCountry === 'United States' ? connectionData['United States'].color : '#E5E7EB'}
            stroke="#fff"
            strokeWidth="2"
            className="transition-all duration-200 hover:opacity-80 cursor-pointer"
            onMouseEnter={() => setHoveredCountry('United States')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* South America */}
          <path
            d="M120 280 Q100 260 80 280 L70 320 Q60 380 80 420 L120 450 Q160 440 180 400 L190 360 Q185 320 165 300 L140 285 Q130 280 120 280 Z"
            fill={hoveredCountry === 'Brazil' ? connectionData['Brazil'].color : '#E5E7EB'}
            stroke="#fff"
            strokeWidth="2"
            className="transition-all duration-200 hover:opacity-80 cursor-pointer"
            onMouseEnter={() => setHoveredCountry('Brazil')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Europe */}
          <path
            d="M450 120 Q430 100 410 120 L400 140 Q395 160 415 180 L455 200 Q495 190 515 160 L525 140 Q520 120 500 110 L475 105 Q460 110 450 120 Z"
            fill="#E5E7EB"
            stroke="#fff"
            strokeWidth="2"
          />
          
          {/* Africa */}
          <path
            d="M420 200 Q400 180 380 200 L370 240 Q365 300 385 360 L425 400 Q465 390 485 350 L495 310 Q490 270 470 240 L445 215 Q430 205 420 200 Z"
            fill="#E5E7EB"
            stroke="#fff"
            strokeWidth="2"
          />
          
          {/* Middle East */}
          <path
            d="M520 200 Q500 180 480 200 L470 220 Q465 240 485 260 L525 280 Q565 270 585 240 L595 220 Q590 200 570 190 L545 185 Q530 190 520 200 Z"
            fill={hoveredCountry === 'Saudi Arabia' ? connectionData['Saudi Arabia'].color : '#E5E7EB'}
            stroke="#fff"
            strokeWidth="2"
            className="transition-all duration-200 hover:opacity-80 cursor-pointer"
            onMouseEnter={() => setHoveredCountry('Saudi Arabia')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Asia - China */}
          <path
            d="M650 140 Q630 120 610 140 L600 160 Q595 180 615 200 L655 220 Q695 210 715 180 L725 160 Q720 140 700 130 L675 125 Q660 130 650 140 Z"
            fill={hoveredCountry === 'China' ? connectionData['China'].color : '#E5E7EB'}
            stroke="#fff"
            strokeWidth="2"
            className="transition-all duration-200 hover:opacity-80 cursor-pointer"
            onMouseEnter={() => setHoveredCountry('China')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Asia - India */}
          <path
            d="M600 220 Q580 200 560 220 L550 240 Q545 260 565 280 L605 300 Q645 290 665 260 L675 240 Q670 220 650 210 L625 205 Q610 210 600 220 Z"
            fill={hoveredCountry === 'India' ? connectionData['India'].color : '#E5E7EB'}
            stroke="#fff"
            strokeWidth="2"
            className="transition-all duration-200 hover:opacity-80 cursor-pointer"
            onMouseEnter={() => setHoveredCountry('India')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Asia - Indonesia */}
          <path
            d="M700 320 Q680 300 660 320 L650 340 Q645 360 665 380 L705 400 Q745 390 765 360 L775 340 Q770 320 750 310 L725 305 Q710 310 700 320 Z"
            fill={hoveredCountry === 'Indonesia' ? connectionData['Indonesia'].color : '#E5E7EB'}
            stroke="#fff"
            strokeWidth="2"
            className="transition-all duration-200 hover:opacity-80 cursor-pointer"
            onMouseEnter={() => setHoveredCountry('Indonesia')}
            onMouseLeave={() => setHoveredCountry(null)}
          />
          
          {/* Australia */}
          <path
            d="M750 380 Q730 360 710 380 L700 400 Q695 420 715 440 L755 460 Q795 450 815 420 L825 400 Q820 380 800 370 L775 365 Q760 370 750 380 Z"
            fill="#E5E7EB"
            stroke="#fff"
            strokeWidth="2"
          />
          
          {/* Tooltip */}
          {hoveredCountry && connectionData[hoveredCountry] && (
            <g>
              <rect
                x="50"
                y="50"
                width="180"
                height="60"
                fill="white"
                stroke="#D1D5DB"
                strokeWidth="1"
                rx="4"
                className="drop-shadow-lg"
              />
              <text x="60" y="70" fill="#1F2937" fontSize="14" fontWeight="bold">
                {hoveredCountry}
              </text>
              <text x="60" y="90" fill="#6B7280" fontSize="12">
                Providers: {connectionData[hoveredCountry].providers}
              </text>
              <text x="60" y="105" fill="#6B7280" fontSize="12">
                Clients: {connectionData[hoveredCountry].clients}
              </text>
            </g>
          )}
        </svg>
        
        {/* Active countries indicators */}
        {Object.entries(connectionData).map(([country, data]) => {
          const positions = {
            'United States': { x: 80, y: 140 },
            'Brazil': { x: 150, y: 360 },
            'China': { x: 680, y: 180 },
            'Saudi Arabia': { x: 550, y: 240 },
            'Indonesia': { x: 730, y: 360 },
            'India': { x: 630, y: 260 }
          };
          
          const pos = positions[country];
          if (!pos) return null;
          
          return (
            <div
              key={country}
              className="absolute w-3 h-3 rounded-full border-2 border-white shadow-lg animate-pulse"
              style={{
                backgroundColor: data.color,
                left: `${(pos.x / 1000) * 100}%`,
                top: `${(pos.y / 500) * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-6">
          {Object.entries(connectionData).map(([country, data]) => (
            <div key={country} className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: data.color }}
              />
              <span className="text-sm text-gray-700 font-medium">{country}</span>
              <span className="text-xs text-gray-500">
                {data.providers}→{data.clients}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesMappingDashboard;