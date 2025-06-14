"use client";

import React, { useState } from 'react';
import { Star, Calendar, Users, Eye } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { format } from 'date-fns';

interface BookingSidebarProps {
  price: number;
  rating: number;
  reviews: number;
  onBookNow: () => void;
  onLookAround: () => void;
}

export default function BookingSidebar({
  price,
  rating,
  reviews,
  onBookNow,
  onLookAround,
}: BookingSidebarProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [guests, setGuests] = useState(1);

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const calculateTotal = () => {
    if (!dateRange?.from || !dateRange?.to) return price;
    const nights = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
    return price * nights;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      {/* Price and Rating */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold">${price}</span>
            <span className="text-gray-600">night</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-current" />
            <span className="font-medium">{rating.toFixed(1)}</span>
            <span className="text-gray-600">·</span>
            <span className="text-gray-600 underline">{reviews} reviews</span>
          </div>
        </div>

        {/* Date Selection */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button className="flex flex-col items-start p-3 border rounded-lg hover:border-gray-400 transition">
              <span className="text-xs font-medium text-gray-600">CHECK-IN</span>
              <span className="text-sm">
                {dateRange?.from ? format(dateRange.from, 'MMM d') : 'Add dates'}
              </span>
            </button>
            <button className="flex flex-col items-start p-3 border rounded-lg hover:border-gray-400 transition">
              <span className="text-xs font-medium text-gray-600">CHECKOUT</span>
              <span className="text-sm">
                {dateRange?.to ? format(dateRange.to, 'MMM d') : 'Add dates'}
              </span>
            </button>
          </div>

          {/* Guests */}
          <button className="w-full flex flex-col items-start p-3 border rounded-lg hover:border-gray-400 transition">
            <span className="text-xs font-medium text-gray-600">GUESTS</span>
            <span className="text-sm">{guests} guest{guests !== 1 ? 's' : ''}</span>
          </button>
        </div>

        {/* Book Now Button */}
        <button
          onClick={onBookNow}
          className="w-full mt-4 bg-[#00aeef] hover:bg-[#0095cc] text-white font-semibold py-3 rounded-lg transition"
        >
          Reserve
        </button>

        {/* Total Price */}
        {dateRange?.from && dateRange?.to && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">
                ${price} x {Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))} nights
              </span>
              <span className="font-medium">${calculateTotal()}</span>
            </div>
          </div>
        )}

        {/* Look Around Button */}
        <button
          onClick={onLookAround}
          className="w-full mt-4 flex items-center justify-center gap-2 text-[#00aeef] font-semibold py-3 border border-[#00aeef] rounded-lg hover:bg-[#00aeef]/5 transition"
        >
          <Eye size={20} />
          Look around
        </button>
      </div>

      {/* Additional Info */}
      <div className="p-6 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>You won't be charged yet</span>
          <span className="underline">Report this listing</span>
        </div>
      </div>
    </div>
  );
} 