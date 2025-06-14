'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

export default function HelpCenter() {
  const [activeCategory, setActiveCategory] = useState('booking');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'booking', name: 'Booking', icon: '📅' },
    { id: 'account', name: 'Account', icon: '👤' },
    { id: 'payment', name: 'Payment', icon: '💳' },
    { id: 'hosting', name: 'Hosting', icon: '🏠' },
    { id: 'safety', name: 'Safety', icon: '🔒' },
  ];

  const faqs = {
    booking: [
      {
        question: 'How do I book a property?',
        answer: 'To book a property, simply search for your desired location and dates, browse through the available properties, and click on the one you like. Then, follow the booking process by selecting your dates, number of guests, and completing the payment.',
      },
      {
        question: 'Can I cancel my booking?',
        answer: 'Yes, you can cancel your booking. The cancellation policy varies by property and is clearly stated in the listing details. Some properties offer free cancellation up to a certain date, while others may have stricter policies.',
      },
      {
        question: 'How do I contact the host?',
        answer: 'You can contact the host through our messaging system. Once you\'ve made a booking or have a question about a property, you\'ll be able to send messages directly to the host through our platform.',
      },
    ],
    account: [
      {
        question: 'How do I create an account?',
        answer: 'Creating an account is easy! Click on the "Sign Up" button in the top right corner, and follow the simple registration process. You can sign up using your email address or connect with your social media accounts.',
      },
      {
        question: 'How do I update my profile?',
        answer: 'To update your profile, go to your account settings by clicking on your profile picture in the top right corner. From there, you can update your personal information, profile picture, and preferences.',
      },
      {
        question: 'How do I reset my password?',
        answer: 'If you\'ve forgotten your password, click on the "Forgot Password" link on the login page. You\'ll receive an email with instructions to reset your password.',
      },
    ],
    payment: [
      {
        question: 'What payment methods are accepted?',
        answer: 'We accept various payment methods including credit cards, debit cards, PayPal, and other local payment options depending on your region.',
      },
      {
        question: 'When will I be charged?',
        answer: 'You\'ll be charged when you make a booking. The full amount will be processed at the time of booking, unless the host has a different payment policy.',
      },
      {
        question: 'How do I get a refund?',
        answer: 'Refunds are processed according to the property\'s cancellation policy. If you\'re eligible for a refund, it will be processed to your original payment method within 5-10 business days.',
      },
    ],
    hosting: [
      {
        question: 'How do I become a host?',
        answer: 'To become a host, click on the "Become a Host" button in the top navigation. You\'ll need to provide some basic information about yourself and your property, and follow our step-by-step process to create your listing.',
      },
      {
        question: 'How much can I earn as a host?',
        answer: 'Your earnings depend on various factors including your property\'s location, size, amenities, and your pricing strategy. You can set your own rates and adjust them based on demand and seasonality.',
      },
      {
        question: 'What are the hosting requirements?',
        answer: 'Hosts must meet basic requirements including providing accurate property information, maintaining high cleanliness standards, and being responsive to guest inquiries. We also require hosts to comply with local laws and regulations.',
      },
    ],
    safety: [
      {
        question: 'How do you verify hosts?',
        answer: 'We verify hosts through various methods including government ID verification, phone number verification, and email confirmation. We also encourage hosts to complete their profile with additional verification steps.',
      },
      {
        question: 'What safety measures are in place?',
        answer: 'We have various safety measures including secure payment processing, host verification, guest reviews, and 24/7 customer support. We also provide safety guidelines for both hosts and guests.',
      },
      {
        question: 'What if I have a safety concern?',
        answer: 'If you have a safety concern, please contact our support team immediately. We have a dedicated team available 24/7 to handle safety-related issues and emergencies.',
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#f7f7fa]">
      {/* Hero Section */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-4">
            How can we help you?
          </h1>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help..."
                className="w-full p-4 pl-12 border rounded-lg"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Categories Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h2 className="font-semibold mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg ${
                      activeCategory === category.id
                        ? 'bg-black text-white'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* FAQ Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-6">
                {categories.find(c => c.id === activeCategory)?.name} FAQs
              </h2>
              <div className="space-y-6">
                {faqs[activeCategory as keyof typeof faqs].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-b last:border-0 pb-6 last:pb-0"
                  >
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-semibold mb-4">Still need help?</h2>
              <p className="text-gray-600 mb-6">
                Our support team is available 24/7 to assist you with any questions
                or concerns.
              </p>
              <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
} 