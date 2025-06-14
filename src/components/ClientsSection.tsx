'use client';

import Image from "next/image";
import { motion } from "framer-motion";

const clients = [
  {
    name: "Airbnb",
    logo: "/airbnb-logo.png"
  },
  {
    name: "Booking.com",
    logo: "/booking-logo.png"
  },
  {
    name: "Expedia",
    logo: "/expedia-logo.png"
  },
  {
    name: "TripAdvisor",
    logo: "/tripadvisor-logo.png"
  },
  {
    name: "Hotels.com",
    logo: "/hotels-logo.png"
  }
];

export default function ClientsSection() {
  return (
    <section className="w-full py-16 bg-[#F7F7F7]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-[#222222] mb-2">
            Trusted by leading companies
          </h2>
          <p className="text-[#717171]">
            Join thousands of satisfied customers worldwide
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative h-8 w-32 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={client.logo}
                alt={client.name}
                fill
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}