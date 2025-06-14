'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';

interface Review {
    id: string;
    user: {
        name: string;
        avatar: string;
    };
    rating: number;
    date: string;
    comment: string;
}

interface ReviewsProps {
    reviews: Review[];
    averageRating: number;
    totalReviews: number;
}

export default function Reviews({ reviews, averageRating, totalReviews }: ReviewsProps) {
    return (
        <div className="py-6 border-b">
            <div className="flex items-center gap-2 mb-6">
                <Star size={24} className="fill-current" />
                <h2 className="text-2xl font-semibold">
                    {averageRating.toFixed(1)} · {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                </h2>
            </div>
            <div className="grid gap-8">
                {reviews.map((review) => (
                    <div key={review.id} className="flex gap-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                            <Image
                                src={review.user.avatar}
                                alt={review.user.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium">{review.user.name}</h3>
                                <span className="text-gray-500">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={i < review.rating ? 'fill-current' : 'text-gray-300'}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="mt-6 text-[#00aeef] font-medium hover:underline">
                Show all {totalReviews} reviews
            </button>
        </div>
    );
} 