import React, { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface ReviewSectionProps {
    reviews: Review[];
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: 'left' | 'right') => {
        if (scrollRef.current) {
            const width = scrollRef.current.offsetWidth;
            scrollRef.current.scrollBy({
                left: dir === 'left' ? -width : width,
                behavior: 'smooth',
            });
        }
    };

    // Get user details for each review
    const getUserDetails = (userId: string) => {
        // In a real app, you would fetch user details from your user service
        return {
            name: 'Guest User',
            avatar: '/hero.jpg'
        };
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6">Recent reviews</h2>

            {/* Mobile: horizontal scroll with arrows */}
            <div className="relative md:hidden">
                <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow p-1"
                    onClick={() => scroll('left')}
                    aria-label="Scroll left"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-500" />
                </button>
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory"
                >
                    {reviews.map((review, index) => {
                        const user = getUserDetails(review.userId);
                        return (
                            <div
                                key={index}
                                className="min-w-[85vw] max-w-xs bg-white shadow-sm border border-gray-200 rounded-xl p-5 hover:shadow-md transition snap-center"
                            >
                                <div className="flex items-center mb-4">
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-12 h-12 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <div className="font-medium">{user.name}</div>
                                        <div className="text-gray-500 text-sm">{new Date(review.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
                                    </div>
                                </div>

                                <div className="flex items-center text-sm text-gray-800 mb-3">
                                    <Star size={16} className="mr-1 text-yellow-500" />
                                    <span>{review.rating.toFixed(1)}</span>
                                </div>

                                <p className="text-gray-700 text-sm">{review.comment}</p>
                            </div>
                        );
                    })}
                </div>
                <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow p-1"
                    onClick={() => scroll('right')}
                    aria-label="Scroll right"
                >
                    <ChevronRight className="w-6 h-6 text-gray-500" />
                </button>
            </div>

            {/* Desktop: grid layout */}
            <div className="hidden md:grid md:grid-cols-2 gap-6">
                {reviews.map((review, index) => {
                    const user = getUserDetails(review.userId);
                    return (
                        <div
                            key={index}
                            className="bg-white shadow-sm border border-gray-200 rounded-xl p-5 hover:shadow-md transition"
                        >
                            <div className="flex items-center mb-4">
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-12 h-12 rounded-full object-cover mr-4"
                                />
                                <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-gray-500 text-sm">{new Date(review.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
                                </div>
                            </div>

                            <div className="flex items-center text-sm text-gray-800 mb-3">
                                <Star size={16} className="mr-1 text-yellow-500" />
                                <span>{review.rating.toFixed(1)}</span>
                            </div>

                            <p className="text-gray-700 text-sm">{review.comment}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ReviewSection;
