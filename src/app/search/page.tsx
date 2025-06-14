'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, MapPin, Filter } from 'lucide-react';
import { properties } from '@/data/dummyData';
import PageLayout from '@/components/PageLayout';

export default function SearchPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const propertyTypes = [
    'House',
    'Apartment',
    'Villa',
    'Condo',
    'Cottage',
    'Cabin',
  ];

  const amenities = [
    'WiFi',
    'Kitchen',
    'Washer',
    'Dryer',
    'Air Conditioning',
    'Heating',
    'TV',
    'Pool',
    'Hot Tub',
    'Free Parking',
  ];

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters Button - Mobile */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center space-x-2 px-4 py-2 border rounded-lg mb-4"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </button>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={false}
            animate={{
              width: showFilters ? '300px' : '0px',
              opacity: showFilters ? 1 : 0,
            }}
            className={`md:w-64 md:opacity-100 flex-shrink-0 overflow-hidden ${
              showFilters ? 'block' : 'hidden md:block'
            }`}
          >
            <div className="sticky top-24 space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Property Type</h3>
                <div className="space-y-2">
                  {propertyTypes.map((type) => (
                    <label
                      key={type}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeToggle(type)}
                        className="rounded"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Amenities</h3>
                <div className="space-y-2">
                  {amenities.map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity)}
                        onChange={() => handleAmenityToggle(amenity)}
                        className="rounded"
                      />
                      <span>{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Search Results */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                      <Heart className="w-5 h-5 fill-current" />
                    </button>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{property.title}</h3>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1">{property.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>
                        {property.location.city}, {property.location.country}
                      </span>
                    </div>
                    <p className="mt-2">
                      <span className="font-semibold">${property.price}</span> night
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 