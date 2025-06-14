'use client';
import React, { useState } from 'react';
import { Eye, Heart, Share, Star, MapPin, CheckCircle } from 'lucide-react';
import localfont from 'next/font/local';
import BookingSidebar from '@/components/property_c/BookingSidebar';
import HotFeatures from '@/components/property_c/HotFeatures';
import PropertyGallery from '@/components/property_c/PropertyGallery';
import { useRouter, useParams } from 'next/navigation';
import ReviewSection from '@/components/property_c/ReviewSection';
import { getPropertyById, getPropertyDetails, getPropertyImages, getPropertyAmenities, getReviewsByProperty } from '@/data/dummyData';
import Footer from '@/components/Footer';

const nugget = localfont({
    src: [{ path: '../../../../public/fonts/AirbnbCereal_W_Md.otf' }],
    variable: '--font-nugget',
});

function PropertyDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const propertyId = params.id as string;

    // Fetch property data
    const property = getPropertyById(propertyId);
    const propertyDetails = getPropertyDetails(propertyId);
    const propertyImages = getPropertyImages(propertyId);
    const amenities = getPropertyAmenities(propertyId);
    const reviews = getReviewsByProperty(propertyId);

    if (!property || !propertyDetails) {
        return <div>Property not found</div>;
    }

    const handleBookNow = () => {
        router.push(`/confirm-and-pay?propertyId=${property.id}`);
    };

    const onLookAroundClick = () => {
        router.push(`/lookaround/${property.id}`);
    };

    // Calculate average rating
    const averageRating = reviews.length > 0
        ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
        : 0;

    const [showFullDescription, setShowFullDescription] = useState(false);

    return (
        <>
            <section className="max-w-7xl mx-auto px-4 mt-20">
                <div className="min-h-screen bg-white">
                    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
                        {/* Title and Actions */}
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center items-start flex-wrap gap-3 pt-6 pb-4">
                            <div className="flex flex-col gap-1">
                                <h1 className={`text-2xl sm:text-3xl font-semibold ${nugget.className} text-gray-900`}>
                                    {property.title}
                                </h1>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <Star size={16} className="fill-current" />
                                        {averageRating.toFixed(1)}
                                    </span>
                                    <span>·</span>
                                    <span>{reviews.length} reviews</span>
                                    <span>·</span>
                                    <span className="flex items-center gap-1">
                                        <MapPin size={16} />
                                        {propertyDetails.location.city}, {propertyDetails.location.state}
                                    </span>
                                </div>
                            </div>
                            <div className="flex space-x-2 sm:space-x-3 ml-auto sm:ml-0 mt-1 sm:mt-0">
                                <button className="cursor-pointer flex items-center gap-1 text-sm hover:bg-gray-100 rounded-full px-4 py-2 transition border border-gray-200 shadow-sm">
                                    <Share size={16} />
                                    <span className="hidden sm:inline">Share</span>
                                </button>
                                <button className="cursor-pointer flex items-center gap-1 text-sm hover:bg-gray-100 rounded-full px-4 py-2 transition border border-gray-200 shadow-sm">
                                    <Heart size={16} />
                                    <span className="hidden sm:inline">Save</span>
                                </button>
                            </div>
                        </div>

                        {/* Gallery Card */}
                        <div className="rounded-xl overflow-hidden mb-8">
                            <PropertyGallery
                                images={propertyImages.map(img => img.imageUrl)}
                                title={property.title}
                            />
                        </div>

                        {/* Mobile Booking Sidebar (below images) */}
                        <div className="block lg:hidden mb-8">
                            <BookingSidebar
                                price={property.price}
                                rating={averageRating}
                                reviews={reviews.length}
                                onBookNow={handleBookNow}
                                onLookAround={onLookAroundClick}
                            />
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Content */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Property Meta Info Card */}
                                <div className="flex flex-wrap gap-4 items-center text-gray-700 text-base border-b pb-8">
                                    <span className="inline-flex items-center gap-2 bg-[#00aeef]/10 text-[#00aeef] px-3 py-1 rounded-full font-medium">
                                        <Eye size={16} /> Lookaround Verified
                                    </span>
                                    <span className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                                        {propertyDetails.maxGuests} guests · {propertyDetails.bedrooms} bedrooms · {propertyDetails.bathrooms} bathrooms
                                    </span>
                                </div>

                                {/* Host Info */}
                                <div className="flex items-center gap-4 border-b pb-8">
                                    <img
                                        src={property.host.avatar}
                                        alt={property.host.name}
                                        className="w-16 h-16 rounded-full"
                                    />
                                    <div>
                                        <h3 className="font-semibold text-lg">Hosted by {property.host.name}</h3>
                                        <p className="text-gray-600">Joined in {new Date(property.host.joinDate).getFullYear()}</p>
                                    </div>
                                </div>

                                {/* About Section with Show More */}
                                <div className="border-b pb-8">
                                    <h2 className="text-2xl font-semibold mb-4">About this place</h2>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {showFullDescription || property.description.length < 300
                                            ? property.description
                                            : property.description.slice(0, 300) + '...'}
                                    </p>
                                    {property.description.length >= 300 && (
                                        <button
                                            className="mt-2 text-[#00aeef] font-medium hover:underline"
                                            onClick={() => setShowFullDescription((v) => !v)}
                                        >
                                            {showFullDescription ? 'Show less' : 'Show more'}
                                        </button>
                                    )}
                                </div>

                                {/* What this place offers */}
                                <div className="border-b pb-8">
                                    <h2 className="text-2xl font-semibold mb-6">What this place offers</h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {amenities.map((amenity, index) => (
                                            <div key={index} className="flex items-center gap-3 text-gray-700">
                                                <span className="bg-[#00aeef]/10 text-[#00aeef] p-2 rounded-full">
                                                    <CheckCircle size={18} />
                                                </span>
                                                {amenity.name}
                                            </div>
                                        ))}
                                    </div>
                                    <button className="mt-4 text-[#00aeef] font-medium hover:underline">
                                        Show all {amenities.length} amenities
                                    </button>
                                </div>

                                {/* Where you'll be */}
                                <div className="border-b pb-8">
                                    <h2 className="text-2xl font-semibold mb-4">Where you'll be</h2>
                                    <div className="text-gray-700 text-base mb-4">
                                        {propertyDetails.location.address}, {propertyDetails.location.city}, {propertyDetails.location.state}
                                    </div>
                                    <div className="w-full h-[400px] rounded-xl overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
                                        <p className="text-gray-500">Map will be displayed here</p>
                                    </div>
                                    {/* Nearby Attractions */}
                                    <div className="mt-6">
                                        <h3 className="font-semibold mb-4">Nearby attractions</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {propertyDetails.nearbyAttractions.map((attraction, index) => (
                                                <div key={index} className="flex items-center gap-2 text-gray-700">
                                                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                                        {attraction.name} ({attraction.distance})
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* House Rules */}
                                <div className="border-b pb-8">
                                    <h2 className="text-2xl font-semibold mb-4">House rules</h2>
                                    <div className="space-y-3">
                                        {propertyDetails.houseRules.map((rule, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <CheckCircle className="text-[#00aeef] w-5 h-5 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700">{rule}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Cancellation Policy */}
                                <div className="border-b pb-8">
                                    <h2 className="text-2xl font-semibold mb-4">Cancellation policy</h2>
                                    <p className="text-gray-700">{propertyDetails.cancellationPolicy}</p>
                                </div>

                                {/* Reviews */}
                                <div className="pb-8">
                                    <ReviewSection reviews={reviews} />
                                </div>
                            </div>

                            {/* Booking Sidebar (sticky on desktop) */}
                            <div className="hidden lg:block">
                                <div className="sticky top-28">
                                    <BookingSidebar
                                        price={property.price}
                                        rating={averageRating}
                                        reviews={reviews.length}
                                        onBookNow={handleBookNow}
                                        onLookAround={onLookAroundClick}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default PropertyDetailsPage; 