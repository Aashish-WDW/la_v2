'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, X, Calendar, Video, ChevronDown, ChevronRight, Star, MapPin, DollarSign, Home, Utensils, Wifi, Tv, Snowflake, Dumbbell } from 'lucide-react';
import { properties } from '@/data/dummyData';
import PropertyCard from '@/components/PropertyCard';
import PageLayout from '@/components/PageLayout';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import {
  CalendarDays,
  Tag,
} from 'lucide-react';
import CategoryFilterModal from '@/components/explore_components/CategoryFilterModal';
import ExploreCardGrid from '@/components/explore_components/ExploreCardGrid';
import PriceRangeModal from '@/components/explore_components/PriceRangeModal';
import LocationFilterModal from '@/components/explore_components/LocationFilterModal';
import AvailabilityModal from '@/components/explore_components/AvailabilityModal';

const ExplorePage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [hasVirtualTour, setHasVirtualTour] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [selectedTabs, setSelectedTabs] = useState<string[]>([]);

  // Get unique property types, amenities, and locations from properties
  const propertyTypes = Array.from(new Set(properties.map(p => p.type)));
  const amenities = Array.from(new Set(properties.flatMap(p => p.amenities)));
  const locations = Array.from(new Set(properties.map(p => p.location.city)));

  const toggleFilter = (type: string, value: string) => {
    switch (type) {
      case 'type':
        setSelectedTypes(prev =>
          prev.includes(value)
            ? prev.filter(t => t !== value)
            : [...prev, value]
        );
        break;
      case 'amenity':
        setSelectedAmenities(prev =>
          prev.includes(value)
            ? prev.filter(a => a !== value)
            : [...prev, value]
        );
        break;
      case 'location':
        setSelectedLocations(prev =>
          prev.includes(value)
            ? prev.filter(l => l !== value)
            : [...prev, value]
        );
        break;
    }
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedTypes([]);
    setSelectedAmenities([]);
    setSelectedLocations([]);
    setHasVirtualTour(false);
    setDateRange(undefined);
  };

  const filteredProperties = properties.filter(property => {
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(property.type);
    const matchesAmenities = selectedAmenities.length === 0 ||
      selectedAmenities.every(amenity => property.amenities.includes(amenity));
    const matchesLocation = selectedLocations.length === 0 ||
      selectedLocations.includes(property.location.city);
    const matchesVirtualTour = !hasVirtualTour || property.hasVirtualTour;
    const matchesDates = !dateRange?.from || !dateRange?.to ||
      (property.availableDates?.start && property.availableDates?.end &&
        new Date(property.availableDates.start) <= dateRange.from &&
        new Date(property.availableDates.end) >= dateRange.to);

    return matchesPrice && matchesType && matchesAmenities && matchesLocation && matchesVirtualTour && matchesDates;
  });

  const activeFiltersCount = [
    selectedTypes.length,
    selectedAmenities.length,
    selectedLocations.length,
    hasVirtualTour ? 1 : 0,
    priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0,
    dateRange?.from || dateRange?.to ? 1 : 0
  ].reduce((a, b) => a + b, 0);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [availabilityRange, setAvailabilityRange] = useState<[number, number]>([0, 0]);

  const handleApplyCategoryTabs = (tabs: string[]) => {
    setSelectedTabs(tabs);
    setSelectedTypes(tabs); // Sync with property type filter
  };

  const handleApplyPriceRange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const handleToggleLocation = (location: string) => {
    setSelectedLocations(prev =>
      prev.includes(location)
        ? prev.filter(l => l !== location)
        : [...prev, location]
    );
  };

  const handleApplyAvailability = (range: [number, number]) => {
    setAvailabilityRange(range);
    // Convert the range to actual dates for filtering
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), range[0]);
    const endDate = new Date(today.getFullYear(), today.getMonth(), range[1]);
    setDateRange({ from: startDate, to: endDate });
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="sticky top-16 z-40 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">Explore Properties</h1>
              {/* Fixed Filter Bar - always visible at the top */}
              <div className="max-w-5xl w-full px-2 sm:px-4">
                <div className="flex flex-nowrap sm:flex-wrap justify-center items-center gap-2 py-2 sm:py-3 overflow-x-auto no-scrollbar">
                  {/* Location Filter */}
                  <button
                    onClick={() => setShowLocationModal(true)}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-200 rounded-full shadow-sm text-sm text-gray-700 bg-white/80 hover:border-[#00aeef] hover:bg-[#e6f7fb] transition whitespace-nowrap"
                  >
                    <MapPin size={16} className="text-[#00aeef] flex-shrink-0" />
                    <span className="truncate max-w-[150px] sm:max-w-none">
                      {selectedLocations.length > 0
                        ? `${selectedLocations.slice(0, 2).join(', ')}${selectedLocations.length > 2 ? '…' : ''}`
                        : 'Location'}
                    </span>
                  </button>
                  {/* Category Filter */}
                  <button
                    onClick={() => setShowCategoryModal(true)}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-200 rounded-full shadow-sm text-sm text-gray-700 bg-white/80 hover:border-[#00aeef] hover:bg-[#e6f7fb] transition whitespace-nowrap"
                  >
                    <Tag size={16} className="text-[#00aeef] flex-shrink-0" />
                    <span className="truncate max-w-[150px] sm:max-w-none">
                      {selectedTabs.length > 0
                        ? `${selectedTabs.map((id) => {
                          const tab = [
                            { id: 'villas', label: 'Villas' },
                            { id: 'pgs', label: "PG's" },
                            { id: 'hostels', label: 'Hostels' },
                            { id: 'apartments', label: 'Apartments' },
                            { id: 'rentals', label: 'Rental Properties' },
                            { id: 'sale', label: 'Properties for Sale' },
                          ].find((t) => t.id === id);
                          return tab ? tab.label : id;
                        }).slice(0, 2).join(', ')}${selectedTabs.length > 2 ? '…' : ''}`
                        : 'Category'}
                    </span>
                  </button>
                  {/* Price Filter */}
                  <button
                    onClick={() => setShowPriceModal(true)}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-200 rounded-full shadow-sm text-sm text-gray-700 bg-white/80 hover:border-[#00aeef] hover:bg-[#e6f7fb] transition whitespace-nowrap"
                  >
                    <DollarSign size={16} className="text-[#00aeef] flex-shrink-0" />
                    <span className="truncate max-w-[150px] sm:max-w-none">
                      {priceRange[0] === 0 && priceRange[1] === 500
                        ? 'Price'
                        : `$${priceRange[0]} - $${priceRange[1]}`}
                    </span>
                  </button>
                  {/* Availability Filter */}
                  <button
                    onClick={() => setShowAvailabilityModal(true)}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 border border-gray-200 rounded-full shadow-sm text-sm text-gray-700 bg-white/80 hover:border-[#00aeef] hover:bg-[#e6f7fb] transition whitespace-nowrap"
                  >
                    <CalendarDays size={16} className="text-[#00aeef] flex-shrink-0" />
                    <span className="truncate max-w-[150px] sm:max-w-none">
                      {availabilityRange[0] === 0 && availabilityRange[1] === 0
                        ? 'Availability'
                        : `${availabilityRange[0]} - ${availabilityRange[1]} days`}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex gap-8">

            {/* Property Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProperties.map((property) => (
                  <div key={property.id} className="flex justify-center">
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
              {filteredProperties.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">No properties match your filters.</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-[#FF385C] hover:text-[#E31C5F] font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showCategoryModal && (
        <CategoryFilterModal
          selectedTabs={selectedTabs}
          onToggleTab={() => { }}
          onClose={() => setShowCategoryModal(false)}
          onApply={handleApplyCategoryTabs}
        />
      )}
      {showPriceModal && (
        <PriceRangeModal
          initialRange={priceRange}
          onApply={handleApplyPriceRange}
          onClose={() => setShowPriceModal(false)}
        />
      )}
      {showLocationModal && (
        <LocationFilterModal
          selectedLocations={selectedLocations}
          onToggleLocation={handleToggleLocation}
          onClose={() => setShowLocationModal(false)}
        />
      )}
      {showAvailabilityModal && (
        <AvailabilityModal
          initialRange={availabilityRange}
          onApply={handleApplyAvailability}
          onClose={() => setShowAvailabilityModal(false)}
        />
      )}
    </PageLayout>
  );
};

export default ExplorePage; 