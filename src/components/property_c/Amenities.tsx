'use client';

import { Wifi, Tv, Utensils, Car, Waves, AirVent, Snowflake, Coffee } from 'lucide-react';

interface AmenitiesProps {
    amenities: string[];
}

const amenityIcons: { [key: string]: any } = {
    'WiFi': Wifi,
    'TV': Tv,
    'Kitchen': Utensils,
    'Free parking': Car,
    'Pool': Waves,
    'Air conditioning': AirVent,
    'Heating': Snowflake,
    'Coffee maker': Coffee,
};

export default function Amenities({ amenities }: AmenitiesProps) {
    return (
        <div className="py-6 border-b">
            <h2 className="text-2xl font-semibold mb-6">What this place offers</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity, index) => {
                    const Icon = amenityIcons[amenity] || Wifi;
                    return (
                        <div key={index} className="flex items-center gap-3">
                            <Icon size={24} className="text-gray-600" />
                            <span className="text-gray-700">{amenity}</span>
                        </div>
                    );
                })}
            </div>
            <button className="mt-6 text-[#00aeef] font-medium hover:underline">
                Show all {amenities.length} amenities
            </button>
        </div>
    );
} 