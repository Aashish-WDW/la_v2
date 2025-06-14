'use client';

import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York',
    rating: 5,
    review: 'The virtual tour feature was amazing! I could explore every corner of the property before booking. The host was incredibly responsive and the place was exactly as shown.',
    image: '/testimonial1.jpg',
    stay: 'Luxury Villa in Bali'
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'San Francisco',
    rating: 5,
    review: 'Found my perfect stay for the weekend getaway. The booking process was seamless and the property exceeded my expectations. Will definitely use this platform again!',
    image: '/testimonial2.jpg',
    stay: 'Beach House in Malibu'
  },
  {
    id: 3,
    name: 'Emma Wilson',
    location: 'London',
    rating: 5,
    review: 'The attention to detail in the property was impressive. From the welcome basket to the local recommendations, everything was thoughtfully arranged.',
    image: '/testimonial3.jpg',
    stay: 'Mountain Cabin in Aspen'
  },
  {
    id: 4,
    name: 'David Kim',
    location: 'Seoul',
    rating: 5,
    review: 'The host went above and beyond to make our stay comfortable. The location was perfect and the amenities were exactly as described.',
    image: '/testimonial4.jpg',
    stay: 'City Apartment in Tokyo'
  },
  {
    id: 5,
    name: 'Sophie Martin',
    location: 'Paris',
    rating: 5,
    review: 'What a wonderful experience! The property was beautiful and the host was incredibly helpful. The virtual tour helped me make the right choice.',
    image: '/testimonial5.jpg',
    stay: 'Vineyard Villa in Tuscany'
  }
];

const TestimonialSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = isMobile ? 300 : 400; // Smaller width on mobile
      const gap = 24; // gap-6 = 24px
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
    <section className="w-full py-16 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-[#222222] mb-2">
              What our guests say
            </h2>
            <p className="text-[#717171]">
              Don't just take our word for it - hear from some of our amazing guests
            </p>
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

        {/* Testimonials Slider */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar scroll-smooth"
        >
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex-shrink-0 w-[300px] md:w-[400px] bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="space-y-4">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF385C] text-[#FF385C]" />
                  ))}
                </div>

                {/* Review */}
                <p className="text-[#222222] text-base md:text-lg leading-relaxed">
                  "{item.review}"
                </p>

                {/* Guest Info */}
                <div className="flex items-center gap-4 pt-4">
                  <div className="w-12 h-12 rounded-full bg-[#DDDDDD] flex items-center justify-center text-[#222222] font-medium">
                    {item.name.split(' ').map(word => word[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-medium text-[#222222]">{item.name}</h3>
                    <p className="text-sm text-[#717171]">{item.location}</p>
                    <p className="text-sm text-[#717171]">{item.stay}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
