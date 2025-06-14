'use client';

import { MapPin } from 'lucide-react';

interface LocationProps {
    location: {
        address: string;
        city: string;
        state: string;
        country: string;
        coordinates: {
            lat: number;
            lng: number;
        };
    };
}

export default function Location({ location }: LocationProps) {
    return (
        <div className="py-6 border-b">
            <h2 className="text-2xl font-semibold mb-6">Location</h2>
            <div className="flex items-start gap-2 mb-4">
                <MapPin size={20} className="text-gray-600 mt-1" />
                <div>
                    <p className="text-gray-700">{location.address}</p>
                    <p className="text-gray-600">{location.city}, {location.state} {location.country}</p>
                </div>
            </div>
            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden">
                <iframe
                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${location.coordinates.lat},${location.coordinates.lng}&zoom=15`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
            <div className="mt-4">
                <h3 className="font-medium mb-2">Getting around</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-600">Airport</p>
                        <p className="font-medium">20 min drive</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Public transport</p>
                        <p className="font-medium">5 min walk</p>
                    </div>
                </div>
            </div>
        </div>
    );
} 