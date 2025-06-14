'use client';

import Image from "next/image";
import { ArrowRight } from "lucide-react";

const discoverData = [
  {
    id: 1,
    title: "Beachfront",
    description: "Stunning ocean views",
    image: "/home.jpg",
    count: "2,000+ stays"
  },
  {
    id: 2,
    title: "Mountain",
    description: "Peaceful retreats",
    image: "/home.jpg",
    count: "1,500+ stays"
  },
  {
    id: 3,
    title: "City",
    description: "Urban escapes",
    image: "/home.jpg",
    count: "3,000+ stays"
  },
  {
    id: 4,
    title: "Countryside",
    description: "Rural getaways",
    image: "/home.jpg",
    count: "1,200+ stays"
  }
];

export default function DiscoverGrid() {
  return (
    <section className="w-full py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-[#222222] mb-2">
            Discover unique places to stay
          </h2>
          <p className="text-[#717171]">
            From cozy cabins to luxury villas, find your perfect stay
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {discoverData.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-white text-xl font-medium mb-1">
                  {item.title}
                </h3>
                <p className="text-white/90 text-sm mb-2">
                  {item.description}
                </p>
                <div className="flex items-center gap-2 text-white/90 text-sm">
                  <span>{item.count}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#DDDDDD] hover:border-[#222222] transition-colors duration-200">
            <span className="font-medium">View all categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
