import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, Eye } from 'lucide-react';

interface PropertyGalleryProps {
    images?: string[];
    title?: string;
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images = [], title = '' }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAllImages, setShowAllImages] = useState(false);
    const [showVirtualTour, setShowVirtualTour] = useState(false);
    const [showReturnButton, setShowReturnButton] = useState(false);

    const imageData = images.map((src, i) => ({ src, title: `Photo ${i + 1}` }));

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const toggleShowAll = () => setShowAllImages(!showAllImages);

    const toggleVirtualTour = () => {
        setShowVirtualTour(!showVirtualTour);
        if (!showVirtualTour) setShowReturnButton(false); // reset button state
    };

    useEffect(() => {
        if (showVirtualTour) {
            const timer = setTimeout(() => {
                setShowReturnButton(true);
            }, 4000); // delay in milliseconds
            return () => clearTimeout(timer);
        }
    }, [showVirtualTour]);

    const galleryGrid = (
        <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 md:gap-2 md:h-[380px]">
            <div className="col-span-2 row-span-2 relative">
                <img src={images[0]} alt="main" className="h-full w-full object-cover rounded-l-xl" />
            </div>
            <div className="col-span-1 row-span-1">
                <img src={images[1]} alt="view 2" className="h-full w-full object-cover" />
            </div>
            <div className="col-span-1 row-span-1">
                <img src={images[2]} alt="view 3" className="h-full w-full object-cover rounded-tr-xl" />
            </div>
            <div className="col-span-1 row-span-1">
                <img src={images[3]} alt="view 4" className="h-full w-full object-cover" />
            </div>
            <div className="col-span-1 row-span-1 relative">
                <img src={images[4]} alt="view 5" className="h-full w-full object-cover rounded-br-xl" />

                <div className="absolute bottom-3 right-3 flex space-x-2">
                    <button
                        onClick={toggleVirtualTour}
                        className="cursor-pointer flex items-center bg-gradient-to-r from-[#00aeef] to-blue-600 text-white text-sm font-medium px-3 py-1.5 rounded-lg shadow-lg"
                    >
                        <Eye size={16} className="mr-1" />
                        Virtual Tour
                    </button>

                    <button
                        onClick={toggleShowAll}
                        className="cursor-pointer flex items-center bg-white rounded-lg px-3 py-1.5 text-sm font-medium shadow-md hover:bg-gray-100 transition-colors duration-200"
                    >
                        <Expand size={16} className="mr-1" />
                        Show all photos
                    </button>
                </div>
            </div>
        </div>
    );

    const mobileGallery = (
        <div className="md:hidden relative">
            <div className="relative aspect-[16/9]">
                <img
                    src={images[currentIndex]}
                    alt={`view ${currentIndex + 1}`}
                    className="h-full w-full object-cover rounded-xl"
                />
                <div className="absolute bottom-3 right-3 bg-black bg-opacity-60 text-white rounded-lg px-3 py-1 text-sm">
                    {currentIndex + 1}/{images.length}
                </div>
            </div>
            <button
                onClick={handlePrev}
                className="cursor-pointer absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-1.5 shadow-md"
            >
                <ChevronLeft size={18} />
            </button>
            <button
                onClick={handleNext}
                className="cursor-pointer absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-1.5 shadow-md"
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );

    const fullGallery = showAllImages && (
        <div ref={scrollContainerRef} className="fixed inset-0 bg-white z-50 overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white p-4 flex justify-between items-center border-b">
                <button
                    onClick={toggleShowAll}
                    className="cursor-pointer text-black hover:bg-gray-100 p-2 rounded-full transition-colors duration-200"
                >
                    ✕
                </button>
                <h2 className="text-lg font-medium">Photo tour</h2>
                <div className="w-10" />
            </div>

            {/* Hotspot Thumbnails */}
            <div className="max-w-5xl mx-auto px-4 py-4 overflow-x-auto">
                <div className="flex space-x-4">
                    {imageData.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setTimeout(() => {
                                    const element = document.getElementById(`section-${index}`);
                                    const container = scrollContainerRef.current;
                                    if (element && container) {
                                        const elementTop = element.offsetTop;
                                        container.scrollTo({
                                            top: elementTop - 80, // 80px offset for sticky header
                                            behavior: 'smooth',
                                        });
                                    }

                                }, 50); // small delay ensures DOM is ready
                            }}
                            className="cursor-pointer flex flex-col items-center space-y-1 hover:opacity-80 transition"
                        >

                            <img
                                src={img.src}
                                alt={img.title}
                                className="w-28 h-20 object-cover rounded-md shadow-sm"
                            />
                            <span className="text-sm text-gray-700 font-medium">{img.title}</span>
                        </button>

                    ))}
                </div>
            </div>

            {/* Full Images Section */}
            <div className="max-w-5xl mx-auto px-4 pb-20 space-y-16">
                {imageData.map((img, index) => (
                    <div
                        key={index}
                        id={`section-${index}`}
                        className="flex flex-col md:flex-row md:items-center gap-6 scroll-mt-28 transition-all duration-500"
                    >
                        <div className="md:w-1/3 text-center md:text-left">
                            <h3 className="text-2xl font-semibold text-gray-900">{img.title}</h3>
                        </div>
                        <div className="md:w-2/3">
                            <img
                                src={img.src}
                                alt={img.title}
                                className="w-full rounded-xl shadow-md transition-transform duration-500 hover:scale-[1.01]"
                            />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );

    const virtualTourModal = showVirtualTour && (
        <div className="fixed inset-0 bg-black z-50">
            {showReturnButton && (
                <div className="absolute top-4 left-0 right-0 flex justify-center z-10">
                    <button
                        onClick={toggleVirtualTour}
                        className="cursor-pointer backdrop-transparent bg-black/10 text-white/30 font-medium px-4 py-1 rounded-full shadow-lg hover:bg-white/10 transition-colors duration-200 border border-white/30"
                    >
                        Return Back to Home
                    </button>
                </div>
            )}
            <iframe
                src="https://realsee.ai/bbEER7Pa"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
            ></iframe>
        </div>
    );

    return (
        <div className="relative mb-8">
            {galleryGrid}
            {mobileGallery}
            {fullGallery}
            {virtualTourModal}
        </div>
    );
};

export default PropertyGallery;
