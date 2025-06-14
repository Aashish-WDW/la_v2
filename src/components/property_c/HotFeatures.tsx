'use client';
import React from 'react';
import { Wifi, Coffee, Utensils, Dumbbell, Car, Snowflake } from 'lucide-react';

interface HotFeaturesProps {
    features: string[];
}

const HotFeatures: React.FC<HotFeaturesProps> = ({ features }) => {
    const getFeatureIcon = (feature: string) => {
        const lowerFeature = feature.toLowerCase();
        if (lowerFeature.includes('wifi')) return <Wifi className="w-6 h-6" />;
        if (lowerFeature.includes('coffee')) return <Coffee className="w-6 h-6" />;
        if (lowerFeature.includes('kitchen')) return <Utensils className="w-6 h-6" />;
        if (lowerFeature.includes('gym')) return <Dumbbell className="w-6 h-6" />;
        if (lowerFeature.includes('parking')) return <Car className="w-6 h-6" />;
        if (lowerFeature.includes('ac')) return <Snowflake className="w-6 h-6" />;
        return <Wifi className="w-6 h-6" />; // Default icon
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
                >
                    <div className="text-blue-600">
                        {getFeatureIcon(feature)}
                    </div>
                    <div>
                        <h3 className="font-medium text-gray-900">{feature}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HotFeatures;
