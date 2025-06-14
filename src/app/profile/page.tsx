'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Calendar, Settings, LogOut } from 'lucide-react';
import { users, bookings, properties } from '@/data/dummyData';
import PageLayout from '@/components/PageLayout';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('trips');
  const user = users[0]; // Using first user as dummy data
  const userBookings = bookings.filter((b) => b.userId === user.id);
  const wishlistProperties = properties.filter((p) =>
    user.wishlist.includes(p.id)
  );

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="border-b pb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full border hover:shadow-md transition-shadow">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full border hover:shadow-md transition-shadow text-red-600">
                <LogOut className="w-4 h-4" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8 mt-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center space-x-4 mb-8">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h2 className="font-semibold">{user.name}</h2>
                  <p className="text-gray-600">Member since {new Date(user.joinDate).getFullYear()}</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('trips')}
                  className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    activeTab === 'trips'
                      ? 'bg-gray-100'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Trips</span>
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    activeTab === 'wishlist'
                      ? 'bg-gray-100'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>Wishlist</span>
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    activeTab === 'reviews'
                      ? 'bg-gray-100'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Star className="w-4 h-4" />
                  <span>Reviews</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'trips' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Your Trips</h2>
                {userBookings.map((booking) => {
                  const property = properties.find(
                    (p) => p.id === booking.propertyId
                  );
                  if (!property) return null;

                  return (
                    <div
                      key={booking.id}
                      className="border rounded-xl overflow-hidden"
                    >
                      <div className="flex">
                        <div className="w-48 h-32">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{property.title}</h3>
                            <span
                              className={`px-2 py-1 rounded-full text-sm ${
                                booking.status === 'confirmed'
                                  ? 'bg-green-100 text-green-800'
                                  : booking.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-gray-600 mt-1">
                            {property.location.city}, {property.location.country}
                          </p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2">
                            <span>
                              {new Date(booking.checkIn).toLocaleDateString()} -{' '}
                              {new Date(booking.checkOut).toLocaleDateString()}
                            </span>
                            <span>·</span>
                            <span>{booking.guests} guests</span>
                          </div>
                          <div className="mt-4">
                            <span className="font-semibold">
                              ${booking.totalPrice}
                            </span>
                            <span className="text-gray-600"> total</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Your Wishlist</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistProperties.map((property) => (
                    <div
                      key={property.id}
                      className="group cursor-pointer"
                    >
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                          <Heart className="w-5 h-5 fill-current" />
                        </button>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{property.title}</h3>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="ml-1">{property.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm mt-1">
                          {property.location.city}, {property.location.country}
                        </p>
                        <p className="mt-2">
                          <span className="font-semibold">${property.price}</span>{' '}
                          night
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4">Your Reviews</h2>
                <div className="text-center py-12">
                  <p className="text-gray-600">You haven't written any reviews yet.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 