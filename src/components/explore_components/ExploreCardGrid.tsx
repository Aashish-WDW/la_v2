'use client';

import React from 'react';
import { Eye } from 'lucide-react';
import Link from 'next/link';

export interface Property {
  id: string;
  title: string;
  location: string;
  rating: number;
  price: number;
  imageUrl: string;
  hasLookAround: boolean;
}

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  return (
    <Link href={`/property-details/${property.id}`} passHref legacyBehavior>
      <a className="group w-full bg-white rounded-3xl shadow-lg p-0 border border-gray-100 hover:border-[#00aeef] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {property.hasLookAround && (
            <div className="absolute top-3 left-3 flex items-center space-x-2 z-10">
              <div className="bg-[#00aeef] rounded-full p-1 shadow-lg flex items-center justify-center">
                <Eye className="text-white" size={18} />
              </div>
              <div className="bg-white text-[#00aeef] text-xs px-3 py-1 rounded-full shadow font-semibold border border-[#00aeef] transition-all duration-300 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap">
                Lookaround Verified
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col justify-between p-5">
          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-lg text-gray-900 truncate max-w-[70%]">{property.title}</h3>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#00aeef]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span className="ml-1 text-sm text-gray-700 font-medium">{property.rating}</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-1">{property.location}</p>
            <p className="text-gray-400 text-xs mb-2">Available dates</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold text-gray-900">${property.price}</span>
            <span className="text-sm text-gray-500">/ night</span>
          </div>
        </div>
      </a>
    </Link>
  );
};

interface ExploreCardGridProps {
  properties: Property[];
}

const ExploreCardGrid: React.FC<ExploreCardGridProps> = ({ properties }) => {
  return (
    <div className="py-10 px-2 sm:px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default ExploreCardGrid;
