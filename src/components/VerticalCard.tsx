'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Heart, Eye, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const cardData = [
  {
    id: 1,
    image: '/home.jpg',
    title: 'Blossom Majesty Hotel',
    location: 'Ooty',
    price: 205,
    rating: 4.7,
    reviews: 1320,
    description: 'Elegant heart in heart on Ooty.',
    hasVirtualTour: true,
  },
  {
    id: 2,
    image: '/home.jpg',
    title: 'Luxury Retreat',
    location: 'Goa',
    price: 310,
    rating: 4.8,
    reviews: 983,
    description: 'Tranquility with a splash of luxury.',
    hasVirtualTour: false,
  },
  {
    id: 3,
    image: '/home.jpg',
    title: 'Blue House Stay',
    location: 'Pondicherry',
    price: 130,
    rating: 4.6,
    reviews: 712,
    description: 'Vintage charm by the sea.',
    hasVirtualTour: true,
  },
  {
    id: 4,
    image: '/home.jpg',
    title: 'Blue House Stay',
    location: 'Pondicherry',
    price: 130,
    rating: 4.6,
    reviews: 712,
    description: 'Vintage charm by the sea.',
    hasVirtualTour: true,
  },
  {
    id: 5,
    image: '/home.jpg',
    title: 'Blue House Stay',
    location: 'Pondicherry',
    price: 130,
    rating: 4.6,
    reviews: 712,
    description: 'Vintage charm by the sea.',
    hasVirtualTour: true,
  },
];

export default function VerticalCard() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = 300; // Width of each card (300px)
      const gap = 24; // Gap between cards (gap-6 = 24px)
      const scrollAmount = cardWidth + gap;
      
      const currentScroll = container.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Top trending spaces</h2>
            <p className="text-sm text-[#717171] mt-1">Most popular choices for travelers</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-[#DDDDDD] hover:border-[#222222] transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-[#DDDDDD] hover:border-[#222222] transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar scroll-smooth"
        >
          {cardData.map((card) => (
            <div key={card.id} className="group flex-shrink-0 w-[300px]">
              {/* Image Container */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-2">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  {card.hasVirtualTour && (
                    <button className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200">
                      <Eye className="w-5 h-5" />
                    </button>
                  )}
                  <button className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-[#222222]">{card.title}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{card.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-[#717171]">{card.location}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#717171]">
                    <span className="font-medium text-[#222222]">${card.price}</span> night
                  </p>
                  <p className="text-sm text-[#717171]">
                    {card.reviews.toLocaleString()} reviews
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
