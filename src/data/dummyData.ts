export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    city: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  images: string[];
  amenities: string[];
  rating: number;
  reviews: number;
  host: {
    id: string;
    name: string;
    avatar: string;
    isSuperhost: boolean;
    joinDate: string;
    rating: number;
    reviews: number;
    joined: string;
  };
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  propertyType: string;
  createdAt: string;
  type: string;
  hasVirtualTour: boolean;
  availableDates?: {
    start: string;
    end: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  isHost: boolean;
  reviews: number;
  wishlist: string[];
  bookings: Booking[];
}

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  guests: number;
  createdAt: string;
}

export interface Review {
  id: string;
  propertyId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    name: string;
    avatar: string;
  };
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  propertyId: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface PropertyDetails {
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  features: string[];
  additionalInfo: string;
  houseRules: string[];
  cancellationPolicy: string;
  nearbyAttractions: Array<{
    name: string;
    distance: string;
  }>;
}

export interface PropertyImage {
  id: string;
  propertyId: string;
  imageUrl: string;
  isMain: boolean;
}

export interface PropertyAmenity {
  id: string;
  name: string;
  icon: string;
}

// Dummy data
export const properties: Property[] = [
  {
    id: '1',
    title: 'Luxury Beachfront Villa',
    description: 'Stunning beachfront villa with panoramic ocean views',
    price: 350,
    location: {
      city: 'Miami',
      country: 'USA',
      coordinates: {
        lat: 25.7617,
        lng: -80.1918
      }
    },
    images: [
      '/properties/beach-villa-1.jpg',
      '/properties/beach-villa-2.jpg',
      '/properties/beach-villa-3.jpg'
    ],
    amenities: ['Pool', 'WiFi', 'Kitchen', 'Parking', 'Air Conditioning'],
    rating: 4.9,
    reviews: 128,
    host: {
      id: '1',
      name: 'John Smith',
      avatar: '/avatars/host-1.jpg',
      isSuperhost: true,
      joinDate: '2020-01-15',
      rating: 4.9,
      reviews: 128,
      joined: '2020-01-15'
    },
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    propertyType: 'Villa',
    createdAt: '2023-01-15',
    type: 'Villa',
    hasVirtualTour: true,
    availableDates: {
      start: '2024-03-01',
      end: '2024-03-20'
    }
  },
  {
    id: '11',
    title: 'Luxury Beachfront Villa',
    description: 'Stunning beachfront villa with private pool and ocean views.',
    price: 850,
    location: {
      city: 'Miami',
      country: 'USA',
      coordinates: { lat: 25.7617, lng: -80.1918 }
    },
    images: [
      '/home.jpg',
      '/home.jpg',
      '/home.jpg',
      '/home.jpg',
    ],
    rating: 4.9,
    reviews: 128,
    host: {
      id: 'h11',
      name: 'Sarah Johnson',
      avatar: '/home.jpg',
      isSuperhost: true,
      joinDate: '2018-03-15',
      rating: 4.9,
      reviews: 245,
      joined: '2018'
    },
    bedrooms: 4,
    bathrooms: 3.5,
    maxGuests: 8,
    amenities: ['Pool', 'Hot Tub', 'Beach Access', 'Air Conditioning', 'WiFi', 'Kitchen', 'Washer', 'Dryer', 'TV', 'BBQ Grill'],
    propertyType: 'Villa',
    createdAt: '2023-01-15',
    type: 'Villa',
    hasVirtualTour: true,
    availableDates: {
      start: '2024-03-01',
      end: '2024-12-31'
    }
  },
  {
    id: '12',
    title: 'Modern Downtown Loft',
    description: 'Stylish loft in the heart of the city with amazing skyline views.',
    price: 250,
    location: {
      city: 'Chicago',
      country: 'USA',
      coordinates: { lat: 41.8781, lng: -87.6298 }
    },
    images: ['/home.jpg', '/home.jpg', '/home.jpg', '/home.jpg',
    ],
    rating: 4.8,
    reviews: 95,
    host: {
      id: 'h12',
      name: 'Michael Chen',
      avatar: '/home.jpg',
      isSuperhost: true,
      joinDate: '2019-06-20',
      rating: 4.8,
      reviews: 178,
      joined: '2019'
    },
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ['Air Conditioning', 'WiFi', 'Kitchen', 'Washer', 'Dryer', 'TV', 'Elevator', 'Gym Access', 'Doorman'],
    propertyType: 'Apartment',
    createdAt: '2023-02-20',
    type: 'Apartment',
    hasVirtualTour: true,
    availableDates: {
      start: '2024-03-01',
      end: '2024-12-31'
    }
  },
  {
    id: '13',
    title: 'Mountain View Cabin',
    description: 'Cozy cabin with breathtaking mountain views and hiking trails.',
    price: 180,
    location: {
      city: 'Denver',
      country: 'USA',
      coordinates: { lat: 39.7392, lng: -104.9903 }
    },
    images: ['/home.jpg', '/home.jpg', '/home.jpg', '/home.jpg',
    ],
    rating: 4.7,
    reviews: 82,
    host: {
      id: 'h13',
      name: 'Emma Wilson',
      avatar: '/home.jpg',
      isSuperhost: false,
      joinDate: '2020-01-10',
      rating: 4.7,
      reviews: 82,
      joined: '2020'
    },
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    amenities: ['Fireplace', 'WiFi', 'Kitchen', 'Washer', 'Dryer', 'TV', 'BBQ Grill', 'Hiking Trails', 'Mountain View'],
    propertyType: 'Cabin',
    createdAt: '2023-03-10',
    type: 'Cabin',
    hasVirtualTour: false,
    availableDates: {
      start: '2024-03-01',
      end: '2024-12-31'
    }
  },
  {
    id: '14',
    title: 'Historic Brownstone',
    description: 'Beautifully restored historic brownstone in a charming neighborhood.',
    price: 400,
    location: {
      city: 'Boston',
      country: 'USA',
      coordinates: { lat: 42.3601, lng: -71.0589 }
    },
    images: ['/home.jpg','/home.jpg','/home.jpg','/home.jpg',
    ],
    rating: 4.9,
    reviews: 156,
    host: {
      id: 'h14',
      name: 'James O\'Connor',
      avatar: '/home.jpg',
      isSuperhost: true,
      joinDate: '2017-09-05',
      rating: 4.9,
      reviews: 312,
      joined: '2017'
    },
    bedrooms: 3,
    bathrooms: 2.5,
    maxGuests: 6,
    amenities: ['Air Conditioning', 'WiFi', 'Kitchen', 'Washer', 'Dryer', 'TV', 'Fireplace', 'Garden', 'Patio'],
    propertyType: 'House',
    createdAt: '2023-04-05',
    type: 'House',
    hasVirtualTour: true,
    availableDates: {
      start: '2024-03-01',
      end: '2024-12-31'
    }
  },
  {
    id: '15',
    title: 'Luxury Penthouse Suite',
    description: 'Stunning penthouse with panoramic city views and premium amenities.',
    price: 1200,
    location: {
      city: 'New York',
      country: 'USA',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    images: ['/home.jpg','/home.jpg','/home.jpg','/home.jpg',
    ],
    rating: 4.9,
    reviews: 89,
    host: {
      id: 'h15',
      name: 'David Kim',
      avatar: '/home.jpg',
      isSuperhost: true,
      joinDate: '2016-11-15',
      rating: 4.9,
      reviews: 445,
      joined: '2016'
    },
    bedrooms: 3,
    bathrooms: 3.5,
    maxGuests: 6,
    amenities: ['Air Conditioning', 'WiFi', 'Kitchen', 'Washer', 'Dryer', 'TV', 'Elevator', 'Gym', 'Pool', 'Doorman', 'Parking', 'Terrace'],
    propertyType: 'Apartment',
    createdAt: '2023-05-20',
    type: 'Apartment',
    hasVirtualTour: true,
    availableDates: {
      start: '2024-03-01',
      end: '2024-12-31'
    }
  },
  {
    id: '16',
    title: 'Seaside Cottage',
    description: 'Charming cottage steps from the beach with ocean views.',
    price: 220,
    location: {
      city: 'San Diego',
      country: 'USA',
      coordinates: { lat: 32.7157, lng: -117.1611 }
    },
    images: ['/home.jpg','/home.jpg','/home.jpg','/home.jpg',
    ],
    rating: 4.8,
    reviews: 112,
    host: {
      id: 'h16',
      name: 'Lisa Martinez',
      avatar: '/hosts/host16.jpg',
      isSuperhost: true,
      joinDate: '2019-04-22',
      rating: 4.8,
      reviews: 224,
      joined: '2019'
    },
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    amenities: ['Air Conditioning', 'WiFi', 'Kitchen', 'Washer', 'Dryer', 'TV', 'Beach Access', 'Patio', 'BBQ Grill'],
    propertyType: 'Cottage',
    createdAt: '2023-06-15',
    type: 'Cottage',
    hasVirtualTour: false,
    availableDates: {
      start: '2024-03-01',
      end: '2024-12-31'
    }
  },
  {
    id: '17',
    title: 'Modern Treehouse',
    description: 'Unique treehouse experience surrounded by nature.',
    price: 150,
    location: {
      city: 'Portland',
      country: 'USA',
      coordinates: { lat: 45.5155, lng: -122.6789 }
    },
    images: [
      '/properties/treehouse1.jpg',
      '/properties/treehouse2.jpg',
      '/properties/treehouse3.jpg',
      '/properties/treehouse4.jpg'
    ],
    rating: 4.9,
    reviews: 78,
    host: {
      id: 'h17',
      name: 'Tom Anderson',
      avatar: '/hosts/host17.jpg',
      isSuperhost: false,
      joinDate: '2021-02-18',
      rating: 4.9,
      reviews: 78,
      joined: '2021'
    },
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    amenities: ['WiFi', 'Kitchen', 'Heating', 'TV', 'Hiking Trails', 'Nature View'],
    propertyType: 'Treehouse',
    createdAt: '2023-07-10',
    type: 'Treehouse',
    hasVirtualTour: true,
    availableDates: {
      start: '2024-03-01',
      end: '2024-12-31'
    }
  },
  {
    id: '18',
    title: 'Luxury Ski Chalet',
    description: 'Ski-in/ski-out chalet with stunning mountain views.',
    price: 600,
    location: {
      city: 'Aspen',
      country: 'USA',
      coordinates: { lat: 39.1911, lng: -106.8175 }
    },
    images: [
      '/properties/chalet1.jpg',
      '/properties/chalet2.jpg',
      '/properties/chalet3.jpg',
      '/properties/chalet4.jpg'
    ],
    rating: 4.9,
    reviews: 92,
    host: {
      id: 'h18',
      name: 'Rachel White',
      avatar: '/hosts/host18.jpg',
      isSuperhost: true,
      joinDate: '2018-08-30',
      rating: 4.9,
      reviews: 184,
      joined: '2018'
    },
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    amenities: ['Air Conditioning', 'WiFi', 'Kitchen', 'Washer', 'Dryer', 'TV', 'Fireplace', 'Hot Tub', 'Ski Storage', 'Boot Warmers'],
    propertyType: 'Chalet',
    createdAt: '2023-08-05',
    type: 'Chalet',
    hasVirtualTour: true,
    availableDates: {
      start: '2024-03-01',
      end: '2024-12-31'
    }
  }
];

export const users: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    avatar: '/avatars/user-1.jpg',
    joinDate: '2020-01-15',
    isHost: true,
    reviews: 45,
    wishlist: ['2', '3'],
    bookings: []
  },
  // Add more users...
];

export const bookings: Booking[] = [
  {
    id: '1',
    propertyId: '1',
    userId: '1',
    checkIn: '2024-03-15',
    checkOut: '2024-03-20',
    totalPrice: 1750,
    status: 'confirmed',
    guests: 4,
    createdAt: '2024-02-15'
  },
  // Add more bookings...
];

export const reviews: Review[] = [
  {
    id: '1',
    propertyId: '1',
    userId: '2',
    rating: 5,
    comment: 'Amazing stay! The view was breathtaking.',
    createdAt: '2024-02-20',
    user: {
      name: 'Sarah Johnson',
      avatar: '/avatars/user-2.jpg'
    }
  },
  // Add more reviews...
];

export const messages: Message[] = [
  {
    id: '1',
    senderId: '1',
    receiverId: '2',
    propertyId: '1',
    content: 'Hi, I\'m interested in your property for next month.',
    createdAt: '2024-02-15T10:30:00Z',
    read: false
  },
  // Add more messages...
];

// Helper functions for property page
export const getPropertyById = (id: string): Property | undefined => {
  return properties.find(p => p.id === id);
};

export const getPropertyDetails = (id: string): PropertyDetails | undefined => {
  // In a real app, this would come from an API
  return {
    location: {
      address: "123 Beach Road",
      city: "Miami",
      state: "Florida",
      country: "USA",
      latitude: 25.7617,
      longitude: -80.1918
    },
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
    features: ["Ocean View", "Private Pool", "Beach Access", "Modern Kitchen"],
    additionalInfo: "This stunning beachfront villa offers breathtaking ocean views and modern amenities.",
    houseRules: [
      "No smoking",
      "No pets allowed",
      "No parties or events",
      "Quiet hours from 10 PM to 7 AM"
    ],
    cancellationPolicy: "Free cancellation up to 7 days before check-in. 50% refund for cancellations made 3-7 days before check-in.",
    nearbyAttractions: [
      { name: "Beach", distance: "2 min walk" },
      { name: "Restaurants", distance: "5 min walk" },
      { name: "Shopping Mall", distance: "10 min drive" },
      { name: "Airport", distance: "20 min drive" }
    ]
  };
};

export const getPropertyImages = (id: string): PropertyImage[] => {
  const property = properties.find(p => p.id === id);
  if (!property) return [];

  return property.images.map((url, index) => ({
    id: `${id}-img-${index}`,
    propertyId: id,
    imageUrl: '/home.jpg',
    isMain: index === 0
  }));
};

export const getPropertyAmenities = (id: string): PropertyAmenity[] => {
  const property = properties.find(p => p.id === id);
  if (!property) return [];

  return property.amenities.map((name, index) => ({
    id: `${id}-amenity-${index}`,
    name,
    icon: "CheckCircle" // In a real app, this would be a proper icon name
  }));
};

export const getReviewsByProperty = (propertyId: string): Review[] => {
  return reviews.filter(r => r.propertyId === propertyId);
}; 