import { Heart, Star, MapPin, Video, Eye } from 'lucide-react';
import { Property } from '@/data/dummyData';
import Image from 'next/image';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="group flex-shrink-0 w-[300px]">
      {/* Image Container */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-2">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {property.hasVirtualTour && (
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
          <h3 className="font-medium text-[#222222]">{property.title}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{property.rating}</span>
          </div>
        </div>
        
        <p className="text-sm text-[#717171]">{property.location.city}, {property.location.country}</p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-[#717171]">
            <span className="font-medium text-[#222222]">${property.price}</span> night
          </p>
          <p className="text-sm text-[#717171]">
            {property.reviews.toLocaleString()} reviews
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard; 