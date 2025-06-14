'use client';

import { Bed, Bath, Users, Star } from 'lucide-react';

interface PropertyMetaInfoProps {
    bedrooms: number;
    bathrooms: number;
    maxGuests: number;
    rating: number;
    reviews: number;
}

export default function PropertyMetaInfo({
    bedrooms,
    bathrooms,
    maxGuests,
    rating,
    reviews,
}: PropertyMetaInfoProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-b">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <Bed size={20} className="text-gray-600" />
                    <span className="font-medium">{bedrooms} {bedrooms === 1 ? 'bedroom' : 'bedrooms'}</span>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <Bath size={20} className="text-gray-600" />
                    <span className="font-medium">{bathrooms} {bathrooms === 1 ? 'bathroom' : 'bathrooms'}</span>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <Users size={20} className="text-gray-600" />
                    <span className="font-medium">Up to {maxGuests} {maxGuests === 1 ? 'guest' : 'guests'}</span>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <Star size={20} className="fill-current text-gray-600" />
                    <span className="font-medium">{rating.toFixed(1)} ({reviews} {reviews === 1 ? 'review' : 'reviews'})</span>
                </div>
            </div>
        </div>
    );
} 