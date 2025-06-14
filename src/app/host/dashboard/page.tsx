'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Home, MessageSquare, Settings, LogOut } from 'lucide-react';
import { properties, bookings, reviews } from '@/data/dummyData';
import PageLayout from '@/components/PageLayout';

export default function HostDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const hostProperties = properties.filter((p) => p.host.id === '1'); // Using first user as host
  const hostBookings = bookings.filter((b) =>
    hostProperties.some((p) => p.id === b.propertyId)
  );
  const hostReviews = reviews.filter((r) =>
    hostProperties.some((p) => p.id === r.propertyId)
  );

  const totalEarnings = hostBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const averageRating =
    hostReviews.reduce((sum, review) => sum + review.rating, 0) / hostReviews.length || 0;

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="border-b pb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Host Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full border hover:shadow-md transition-shadow">
                <MessageSquare className="w-4 h-4" />
                <span>Messages</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full border hover:shadow-md transition-shadow">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-8 mt-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-24">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    activeTab === 'overview'
                      ? 'bg-gray-100'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab('listings')}
                  className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    activeTab === 'listings'
                      ? 'bg-gray-100'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span>Listings</span>
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
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="border rounded-xl p-6">
                    <h3 className="text-gray-600 mb-2">Total Earnings</h3>
                    <p className="text-2xl font-semibold">${totalEarnings}</p>
                  </div>
                  <div className="border rounded-xl p-6">
                    <h3 className="text-gray-600 mb-2">Active Listings</h3>
                    <p className="text-2xl font-semibold">{hostProperties.length}</p>
                  </div>
                  <div className="border rounded-xl p-6">
                    <h3 className="text-gray-600 mb-2">Average Rating</h3>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="text-2xl font-semibold ml-1">
                        {averageRating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recent Bookings */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
                  <div className="space-y-4">
                    {hostBookings.slice(0, 5).map((booking) => {
                      const property = properties.find(
                        (p) => p.id === booking.propertyId
                      );
                      if (!property) return null;

                      return (
                        <div
                          key={booking.id}
                          className="border rounded-xl p-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img
                                src={property.images[0]}
                                alt={property.title}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div>
                                <h3 className="font-medium">{property.title}</h3>
                                <p className="text-gray-600">
                                  {new Date(booking.checkIn).toLocaleDateString()} -{' '}
                                  {new Date(booking.checkOut).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">${booking.totalPrice}</p>
                              <p
                                className={`text-sm ${
                                  booking.status === 'confirmed'
                                    ? 'text-green-600'
                                    : booking.status === 'pending'
                                    ? 'text-yellow-600'
                                    : 'text-red-600'
                                }`}
                              >
                                {booking.status}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'listings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Your Listings</h2>
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    Add New Listing
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {hostProperties.map((property) => (
                    <div
                      key={property.id}
                      className="border rounded-xl overflow-hidden"
                    >
                      <div className="relative aspect-[4/3]">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 flex items-center space-x-2">
                          <button className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                            <Settings className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{property.title}</h3>
                        <p className="text-gray-600 mt-1">
                          {property.location.city}, {property.location.country}
                        </p>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="ml-1">{property.rating}</span>
                          </div>
                          <p className="font-semibold">${property.price} night</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Guest Reviews</h2>
                <div className="space-y-6">
                  {hostReviews.map((review) => {
                    const property = properties.find(
                      (p) => p.id === review.propertyId
                    );
                    if (!property) return null;

                    return (
                      <div key={review.id} className="border-b pb-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <img
                              src={review.user.avatar}
                              alt={review.user.name}
                              className="w-12 h-12 rounded-full"
                            />
                            <div>
                              <h3 className="font-semibold">{review.user.name}</h3>
                              <p className="text-gray-600">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-5 h-5 fill-current" />
                            <span className="ml-1 font-semibold">{review.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                        <div className="mt-4">
                          <p className="text-sm text-gray-500">
                            Review for {property.title}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 