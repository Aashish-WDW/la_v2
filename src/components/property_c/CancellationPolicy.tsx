'use client';

import { Info } from 'lucide-react';

interface CancellationPolicyProps {
    policy: {
        type: 'flexible' | 'moderate' | 'strict';
        description: string;
        details: string[];
    };
}

export default function CancellationPolicy({ policy }: CancellationPolicyProps) {
    const getPolicyColor = (type: string) => {
        switch (type) {
            case 'flexible':
                return 'text-green-600 bg-green-50';
            case 'moderate':
                return 'text-yellow-600 bg-yellow-50';
            case 'strict':
                return 'text-red-600 bg-red-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="py-6 border-b">
            <div className="flex items-start gap-2 mb-6">
                <Info size={24} className="text-gray-600 mt-1" />
                <div>
                    <h2 className="text-2xl font-semibold mb-2">Cancellation policy</h2>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getPolicyColor(policy.type)}`}>
                        {policy.type.charAt(0).toUpperCase() + policy.type.slice(1)}
                    </span>
                </div>
            </div>
            <p className="text-gray-700 mb-4">{policy.description}</p>
            <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium mb-2">Cancellation details:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {policy.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                    ))}
                </ul>
            </div>
            <button className="mt-6 text-[#00aeef] font-medium hover:underline">
                Learn more about cancellation policies
            </button>
        </div>
    );
} 