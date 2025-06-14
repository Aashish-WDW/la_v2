'use client';

import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

type Props = {
  initialRange: [number, number];
  onApply: (range: [number, number]) => void;
  onClose: () => void;
};

const POPULAR_PRICES = [250, 1000, 5000, 10000];

export default function PriceRangeModal({ initialRange, onApply, onClose }: Props) {
  const [price, setPrice] = useState(initialRange[1]);

  useEffect(() => {
    setPrice(initialRange[1]);
  }, [initialRange]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative w-full max-w-md bg-white text-gray-900 rounded-2xl p-6 shadow-xl animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-6 text-center">Select Price Range</h2>

        {/* Selected Price */}
        <div className="text-4xl font-bold text-center mb-4 text-[#00aeef]">
          ${price.toLocaleString()}
        </div>

        {/* Slider */}
        <input
          type="range"
          min={0}
          max={10000}
          step={50}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full accent-[#00aeef]"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>$0</span>
          <span>${price.toLocaleString()}</span>
        </div>

        {/* Popular Buttons */}
        <div className="mt-6">
          <h3 className="text-sm mb-2 font-medium text-gray-800">Popular Price Points</h3>
          <div className="flex flex-wrap gap-2">
            {POPULAR_PRICES.map((p) => (
              <button
                key={p}
                onClick={() => setPrice(p)}
                className={clsx(
                  'px-4 py-2 rounded-full border text-sm transition font-medium',
                  price === p
                    ? 'bg-[#00aeef] text-white border-[#00aeef]'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                )}
              >
                ${p.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={() => {
            onApply([0, price]);
            onClose();
          }}
          className="mt-6 w-full bg-[#00aeef] hover:bg-[#0095cc] text-white py-3 rounded-full font-semibold transition-all duration-200"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
