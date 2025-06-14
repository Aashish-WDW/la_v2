'use client';

import { motion } from "framer-motion";
import BookingSection from "@/components/BookingSection";
import DiscoverGrid from "@/components/DiscoverGrid";
import VerticalCard from "@/components/VerticalCard";
import TestimonialCard from "@/components/TestimonialCard";
import ClientsSection from "@/components/ClientsSection";
import Footer from "@/components/Footer";
import WhyUsSection from "@/components/WhyUsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7fa]">
      {/* Hero Section with Gradient Overlay */}
      <section className="relative min-h-[600px] bg-[url('/home.jpg')] bg-cover bg-center">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />

        {/* Centered Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-white max-w-3xl mt-28 sm:mt-32"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-[1.2]">
              Find Your Perfect Stay
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 font-light max-w-xl">
              Discover amazing properties and book your next adventure
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Section */}
      <div className="relative -mt-32 z-10">
        <BookingSection />
      </div>

      {/* Main Content */}
      <div className="relative bg-white pt-16">
        {/* Featured Properties Section */}
        <section className="max-w-7xl mx-auto px-4">
          <VerticalCard />
        </section>

        {/* Discover Section */}
        <section className="max-w-7xl mx-auto px-4">
          <DiscoverGrid />
        </section>

        {/* Why Us Section */}
        <WhyUsSection />

        {/* Testimonials Section */}
        <TestimonialCard />

        {/* Clients Section */}
        <ClientsSection />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}