'use client';

import { FaMapMarkerAlt, FaRegCalendarAlt, FaUser } from 'react-icons/fa';
import CurvedBottomBanner from './svgs/CurvedBottomBanner';

export default function BookingSection() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-4 mt-4">
            <div className="relative w-full flex justify-center">
                {/* Main Booking Box */}
                <div className="relative w-[90vw] max-w-[1400px] bg-white rounded-2xl z-10 shadow-xl border border-gray-100">

                    {/* Content Section */}
                    <div className="px-4 py-3 flex justify-between gap-3 flex-wrap">
                        {/* Destination */}
                        <div className="flex items-center gap-3 flex-1 min-w-[200px] border border-gray-200 rounded-xl px-4 py-2.5 bg-white hover:shadow-md transition">
                            <FaMapMarkerAlt className="text-gray-500 text-lg" />
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold">Where</p>
                                <p className="font-medium text-gray-800">Search destinations</p>
                            </div>
                        </div>

                        {/* Check-in */}
                        <div className="flex items-center gap-3 flex-1 min-w-[200px] border border-gray-200 rounded-xl px-4 py-2.5 bg-white hover:shadow-md transition">
                            <FaRegCalendarAlt className="text-gray-500 text-lg" />
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold">Check-in</p>
                                <p className="font-medium text-gray-800">Add dates</p>
                            </div>
                        </div>

                        {/* Check-out */}
                        <div className="flex items-center gap-3 flex-1 min-w-[200px] border border-gray-200 rounded-xl px-4 py-2.5 bg-white hover:shadow-md transition">
                            <FaRegCalendarAlt className="text-gray-500 text-lg" />
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold">Check-out</p>
                                <p className="font-medium text-gray-800">Add dates</p>
                            </div>
                        </div>

                        {/* Guests */}
                        <div className="flex items-center gap-3 flex-1 min-w-[200px] border border-gray-200 rounded-xl px-4 py-2.5 bg-white hover:shadow-md transition">
                            <FaUser className="text-gray-500 text-lg" />
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold">Guests</p>
                                <p className="font-medium text-gray-800">Add guests</p>
                            </div>
                        </div>
                    </div>

                    {/* Explore Button */}
                    <div className="flex justify-center pb-3">
                        <button className="bg-[#FF385C] text-white px-10 py-2 rounded-full font-semibold hover:bg-[#e11d48] transition duration-200 shadow-md">
                            Explore
                        </button>
                    </div>

                    {/* Bottom Notch */}
                    <div className="absolute left-1/2 -bottom-[10px] z-20 -translate-x-1/2">
                        <CurvedBottomBanner />
                    </div>
                </div>
            </div>
        </section>
    );
}
