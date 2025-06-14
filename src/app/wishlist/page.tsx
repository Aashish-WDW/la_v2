'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { users, properties } from '@/data/dummyData';
import Footer from '@/components/Footer';
import VerticalCard from '@/components/VerticalCard';

export default function WishlistPage() {
  const [activeTab, setActiveTab] = useState('all');
  const user = users[0]; // Using first user as dummy data
  const wishlistProperties = properties.filter(p => user.wishlist.includes(p.id));

  const collections = [
    { id: '1', name: 'Beach Houses', count: 3 },
    { id: '2', name: 'City Apartments', count: 2 },
    { id: '3', name: 'Mountain Cabins', count: 1 },
  ];

  return (
    <main className="min-h-screen bg-[#f7f7fa]">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'all'
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              All Properties
            </button>
            <button
              onClick={() => setActiveTab('collections')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'collections'
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Collections
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'all' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProperties.map((property) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <VerticalCard property={property} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold">{collection.name}</h2>
                      <p className="text-gray-600">{collection.count} properties</p>
                    </div>
                    <button className="text-gray-600 hover:text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistProperties
                      .slice(0, collection.count)
                      .map((property) => (
                        <motion.div
                          key={property.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <VerticalCard property={property} />
                        </motion.div>
                      ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Create New Collection */}
            <button className="w-full p-6 bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
              <div className="flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="font-medium">Create New Collection</span>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
} 